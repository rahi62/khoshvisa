import "server-only";
import {database} from "@/lib/crm-db";
import {DEFAULT_CONTACT_SETTINGS,type ContactSettings} from "@/lib/contact-settings";

type ContactRow={support_mobile:string;support_landline:string;version:number;updated_at:Date};
export async function readContactSettings():Promise<{settings:ContactSettings;storeReady:boolean}>{
 try{
  const r=await database().query<ContactRow>("SELECT support_mobile,support_landline,version,updated_at FROM contact_settings WHERE id=1");
  const row=r.rows[0];
  if(!row)return {settings:DEFAULT_CONTACT_SETTINGS,storeReady:false};
  return {settings:{
   supportMobile:row.support_mobile,
   supportLandline:row.support_landline,
   version:row.version,
   updatedAt:row.updated_at
  },storeReady:true};
 }catch(e){
  console.error("Contact settings unavailable",e instanceof Error?e.name:"UnknownError");
  return {settings:DEFAULT_CONTACT_SETTINGS,storeReady:false};
 }
}
