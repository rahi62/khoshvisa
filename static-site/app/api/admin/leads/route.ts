import {NextRequest,NextResponse} from "next/server";
import {adminRedirect,isAdmin,safeOrigin} from "@/lib/crm-auth";
import {transaction} from "@/lib/crm-db";
import {normalizeLeadPhone} from "@/lib/lead-phone";
const clean=(x:FormDataEntryValue|null,max:number)=>typeof x==="string"?x.trim().replace(/[\r\n\t]+/g," ").slice(0,max):"";
export const runtime="nodejs";
export async function POST(req:NextRequest){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 if(!await isAdmin())return NextResponse.redirect(adminRedirect("/admin/login"),303);
 const form=await req.formData();
 if(form.get("confirmed_contact")!=="yes")return NextResponse.redirect(adminRedirect("/admin?error=not_confirmed"),303);
 const channel=clean(form.get("channel"),24);
 if(channel!=="whatsapp_manual"&&channel!=="phone_manual")return NextResponse.redirect(adminRedirect("/admin?error=invalid_channel"),303);
 const waId=normalizeLeadPhone(clean(form.get("wa_id"),30));
 const name=clean(form.get("name"),120),destination=clean(form.get("destination"),80);
 const reference=clean(form.get("tracking_reference"),32).toUpperCase();
 if(!waId)return NextResponse.redirect(adminRedirect("/admin?error=invalid_phone"),303);
 if(reference&&!/^KV-[0-9A-F]{20}$/.test(reference))return NextResponse.redirect(adminRedirect("/admin?error=invalid_reference"),303);
 try{
 const id=await transaction(async db=>{
  const q=await db.query<{id:string}>(`
   INSERT INTO leads(wa_id,name,source,destination,tracking_reference)
   VALUES($1,$2,$3,$4,$5)
   ON CONFLICT (wa_id) DO NOTHING RETURNING id
  `,[waId,name,channel,destination,reference]);
  if(!q.rows.length)return '';
  await db.query("INSERT INTO lead_audit(lead_id,actor,action,new_stage) VALUES($1,'admin','manual_verified','new')",[q.rows[0].id]);
  return q.rows[0].id;
 });
 if(!id)return NextResponse.redirect(adminRedirect('/admin?error=already_exists'),303);
 return NextResponse.redirect(adminRedirect('/admin/leads/'+id),303);
 }catch(e){console.error("Manual lead failed",e instanceof Error?e.name:"UnknownError");return NextResponse.redirect(adminRedirect("/admin?error=unavailable"),303)}
}
