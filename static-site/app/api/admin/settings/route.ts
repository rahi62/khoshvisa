import {NextRequest,NextResponse} from "next/server";
import {adminRedirect,isAdmin,safeOrigin} from "@/lib/crm-auth";
import {transaction} from "@/lib/crm-db";
import {LANDLINE_RE,MOBILE_RE,normalizeIranWhatsApp,validateContactInput,type PublicContactSettings} from "@/lib/contact-settings";
export const runtime="nodejs";
const clean=(form:FormData,key:string,max:number)=>{
 const value=form.get(key);
 return typeof value==="string"?value.trim().slice(0,max):"";
};
const back=(error:string)=>NextResponse.redirect(adminRedirect("/admin/settings?error="+encodeURIComponent(error)),303);
export async function POST(req:NextRequest){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 if(!await isAdmin())return NextResponse.redirect(adminRedirect("/admin/login"),303);
 let form:FormData;
 try{form=await req.formData()}catch{return back("invalid")}
 const mobile=clean(form,"mobile",24),landline=clean(form,"landline",24);
 const rawWa=clean(form,"whatsapp_number",30);
 const whatsappEnabled=form.get("whatsapp_enabled")==="yes";
 const whatsappNumber=rawWa?normalizeIranWhatsApp(rawWa):"";
 const version=Number(form.get("version"));
 const settings:PublicContactSettings={mobile,landline,whatsappNumber,whatsappEnabled};
 if(!Number.isSafeInteger(version)||version<0)return back("invalid");
 if(whatsappEnabled&&!whatsappNumber)return back("wa_required");
 if(rawWa&&!whatsappNumber)return back("invalid");
 if(!validateContactInput(settings)||mobile!==""&&!MOBILE_RE.test(mobile)||landline!==""&&!LANDLINE_RE.test(landline))return back("invalid");
 try{
  const result=await transaction(async client=>{
   const rows=await client.query("SELECT * FROM site_contact_settings WHERE id=1 FOR UPDATE");
   if(!rows.rows.length)return "unavailable";
   const old=rows.rows[0];
   if(Number(old.version)!==version)return "conflict";
   const before={mobile:old.mobile,landline:old.landline,whatsappNumber:old.whatsapp_number,whatsappEnabled:old.whatsapp_enabled};
   if(Object.entries(settings).every(([k,v])=>before[k as keyof PublicContactSettings]===v))return "saved";
   await client.query("UPDATE site_contact_settings SET mobile=$1,landline=$2,whatsapp_number=$3,whatsapp_enabled=$4,version=version+1,updated_at=now() WHERE id=1",
    [mobile,landline,whatsappNumber,whatsappEnabled]);
   await client.query("INSERT INTO site_contact_settings_audit(actor,previous,current) VALUES('admin',$1::jsonb,$2::jsonb)",
    [JSON.stringify(before),JSON.stringify(settings)]);
   return "saved";
  });
  return result==="saved"?NextResponse.redirect(adminRedirect("/admin/settings?saved=1"),303):back(result);
 }catch(e){
  console.error("Failed to save site settings",e instanceof Error?e.name:"Error");
  return back("unavailable");
 }
}
