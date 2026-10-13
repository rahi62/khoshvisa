import {NextRequest,NextResponse} from "next/server";
import {adminRedirect,isAdmin,safeOrigin} from "@/lib/crm-auth";
import {transaction} from "@/lib/crm-db";
import {normalizePhone,validLandline,validMobile} from "@/lib/contact-settings";

export const runtime="nodejs";
export const dynamic="force-dynamic";
const back=(status:string)=>NextResponse.redirect(adminRedirect("/admin/settings?error="+status),303);
export async function POST(req:NextRequest){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 if(!await isAdmin())return NextResponse.redirect(adminRedirect("/admin/login"),303);
 let form:FormData;
 try{form=await req.formData()}catch{return back("invalid_request")}
 const version=Number(form.get("version"));
 const rawMobile=form.get("support_mobile"),rawLandline=form.get("support_landline");
 if(!Number.isSafeInteger(version)||version<0||typeof rawMobile!=="string"||typeof rawLandline!=="string")
  return back("invalid_request");
 const mobile=normalizePhone(rawMobile),landline=normalizePhone(rawLandline);
 if(!validMobile(mobile))return back("invalid_mobile");
 if(!validLandline(landline))return back("invalid_landline");
 try{
  const result=await transaction(async db=>{
   const current=await db.query<{support_mobile:string;support_landline:string;version:number}>(
    "SELECT support_mobile,support_landline,version FROM contact_settings WHERE id=1 FOR UPDATE"
   );
   if(!current.rows.length)return "unavailable";
   const row=current.rows[0];
   if(row.version!==version)return "conflict";
   if(row.support_mobile===mobile&&row.support_landline===landline)return "saved";
   await db.query("UPDATE contact_settings SET support_mobile=$1,support_landline=$2,version=version+1,updated_at=now() WHERE id=1",[mobile,landline]);
   await db.query("INSERT INTO contact_settings_audit(actor,old_mobile,new_mobile,old_landline,new_landline) VALUES('admin',$1,$2,$3,$4)",[
    row.support_mobile,mobile,row.support_landline,landline
   ]);
   return "saved";
  });
  if(result!=="saved")return back(result);
  return NextResponse.redirect(adminRedirect("/admin/settings?saved=1"),303);
 }catch(e){
  console.error("Contact settings save failed",e instanceof Error?e.name:"UnknownError");
  return back("unavailable");
 }
}
