import {NextResponse} from "next/server";
import {database} from "@/lib/crm-db";
import {type PublicContactSettings} from "@/lib/contact-settings";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store, max-age=0","X-Content-Type-Options":"nosniff"};
export async function GET(){
 try{
  const result=await database().query<{
   mobile:string;landline:string;whatsapp_number:string;whatsapp_enabled:boolean
  }>("SELECT mobile,landline,whatsapp_number,whatsapp_enabled FROM site_contact_settings WHERE id=1");
  if(!result.rowCount)return NextResponse.json({error:"not_configured"},{status:503,headers});
  const row=result.rows[0];
  const publicSettings:PublicContactSettings={
   mobile:row.mobile,
   landline:row.landline,
   whatsappNumber:row.whatsapp_enabled?row.whatsapp_number:"",
   whatsappEnabled:row.whatsapp_enabled
  };
  return NextResponse.json(publicSettings,{headers});
 }catch(e){
  console.error("Public contact settings unavailable",e instanceof Error?e.name:"Error");
  return NextResponse.json({error:"unavailable"},{status:503,headers});
 }
}
