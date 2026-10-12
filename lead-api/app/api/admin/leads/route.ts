import {NextRequest,NextResponse} from "next/server";
import {adminRedirect,isAdmin,safeOrigin} from "@/lib/auth";
import {database} from "@/lib/db";
const clean=(x:FormDataEntryValue|null,max:number)=>typeof x==="string"?x.trim().replace(/[\r\n\t]+/g," ").slice(0,max):"";
export const runtime="nodejs";
export async function POST(req:NextRequest){
 if(!safeOrigin(req))return NextResponse.json({error:"origin_forbidden"},{status:403});
 if(!await isAdmin())return NextResponse.redirect(adminRedirect("/admin/login"),303);
 const form=await req.formData();
 if(form.get("confirmed_in_whatsapp")!=="yes")return NextResponse.redirect(adminRedirect("/admin?error=not_confirmed"),303);
 const waId=clean(form.get("wa_id"),20).replace(/^\+/,"");
 const name=clean(form.get("name"),120),destination=clean(form.get("destination"),80);
 const reference=clean(form.get("tracking_reference"),32).toUpperCase();
 if(!/^[1-9][0-9]{7,14}$/.test(waId))return NextResponse.redirect(adminRedirect("/admin?error=invalid_phone"),303);
 if(reference&&!/^KV-[0-9A-F]{20}$/.test(reference))return NextResponse.redirect(adminRedirect("/admin?error=invalid_reference"),303);
 try{
 const q=await database().query<{id:string}>(\`
   INSERT INTO leads(wa_id,name,source,destination,tracking_reference)
   VALUES($1,$2,'whatsapp_manual',$3,$4)
   ON CONFLICT (wa_id) DO NOTHING RETURNING id
 \`,[waId,name,destination,reference]);
 if(!q.rows.length)return NextResponse.redirect(adminRedirect("/admin?error=already_exists"),303);
 await database().query("INSERT INTO lead_audit(lead_id,actor,action,new_stage) VALUES($1,'admin','manual_verified','new')",[q.rows[0].id]);
 return NextResponse.redirect(adminRedirect("/admin/leads/"+q.rows[0].id),303);
 }catch(e){console.error("Manual lead failed",e instanceof Error?e.name:"UnknownError");return NextResponse.redirect(adminRedirect("/admin?error=unavailable"),303)}
}
