import "server-only";
import {database,transaction} from "@/lib/crm-db";
import {DEFAULT_SITE_SETTINGS,type SiteSettings,type SiteSettingsData} from "@/lib/site-settings";

type Row={
 brand_name:string;brand_name_en:string;tagline:string;footer_description:string;
 logo_url:string;favicon_url:string;support_mobile:string;support_landline:string;
 whatsapp_number:string;whatsapp_enabled:boolean;email:string;instagram_url:string;
 telegram_url:string;default_meta_title:string;default_meta_description:string;
 default_og_image_url:string;version:number;updated_at:Date;
};
const SELECT="SELECT * FROM site_settings WHERE id=1";
const toSettings=(r:Row):SiteSettings=>({
 brandName:r.brand_name,brandNameEn:r.brand_name_en,tagline:r.tagline,
 footerDescription:r.footer_description,logoUrl:r.logo_url,faviconUrl:r.favicon_url,
 supportMobile:r.support_mobile,supportLandline:r.support_landline,
 whatsappNumber:r.whatsapp_number,whatsappEnabled:r.whatsapp_enabled,
 email:r.email,instagramUrl:r.instagram_url,telegramUrl:r.telegram_url,
 defaultMetaTitle:r.default_meta_title,defaultMetaDescription:r.default_meta_description,
 defaultOgImageUrl:r.default_og_image_url,version:r.version,
 updatedAt:r.updated_at?.toISOString()??null
});
export function publicSiteSettings(s:SiteSettings){
 return {
  brandName:s.brandName,brandNameEn:s.brandNameEn,tagline:s.tagline,
  footerDescription:s.footerDescription,logoUrl:s.logoUrl,faviconUrl:s.faviconUrl,
  supportMobile:s.supportMobile,supportLandline:s.supportLandline,
  whatsappNumber:s.whatsappEnabled?s.whatsappNumber:"",
  whatsappEnabled:s.whatsappEnabled,
  email:s.email,instagramUrl:s.instagramUrl,telegramUrl:s.telegramUrl
 };
}
export async function readSiteSettings():Promise<{settings:SiteSettings;ready:boolean}>{
 try{
  const rows=await database().query<Row>(SELECT);
  if(!rows.rows[0])return {settings:DEFAULT_SITE_SETTINGS,ready:false};
  return {settings:toSettings(rows.rows[0]),ready:true};
 }catch(error){
  console.error("Site settings read failed",error instanceof Error?error.name:"UnknownError");
  return {settings:DEFAULT_SITE_SETTINGS,ready:false};
 }
}
export type SaveResult="saved"|"conflict"|"unavailable";
export async function saveSiteSettings(data:SiteSettingsData,version:number):Promise<SaveResult>{
 return transaction(async client=>{
  const existing=await client.query<Row>(SELECT+" FOR UPDATE");
  if(!existing.rows[0])return "unavailable";
  const old=toSettings(existing.rows[0]);
  if(old.version!==version)return "conflict";
  const previous:SiteSettingsData={
   brandName:old.brandName,brandNameEn:old.brandNameEn,tagline:old.tagline,
   footerDescription:old.footerDescription,logoUrl:old.logoUrl,faviconUrl:old.faviconUrl,
   supportMobile:old.supportMobile,supportLandline:old.supportLandline,
   whatsappNumber:old.whatsappNumber,whatsappEnabled:old.whatsappEnabled,
   email:old.email,instagramUrl:old.instagramUrl,telegramUrl:old.telegramUrl,
   defaultMetaTitle:old.defaultMetaTitle,defaultMetaDescription:old.defaultMetaDescription,
   defaultOgImageUrl:old.defaultOgImageUrl
  };
  if(JSON.stringify(previous)===JSON.stringify(data))return "saved";
  await client.query(
    "UPDATE site_settings SET brand_name=$1,brand_name_en=$2,tagline=$3,footer_description=$4,logo_url=$5,favicon_url=$6,support_mobile=$7,support_landline=$8,whatsapp_number=$9,whatsapp_enabled=$10,email=$11,instagram_url=$12,telegram_url=$13,default_meta_title=$14,default_meta_description=$15,default_og_image_url=$16,version=version+1,updated_at=now() WHERE id=1",
    [data.brandName,data.brandNameEn,data.tagline,data.footerDescription,data.logoUrl,
    data.faviconUrl,data.supportMobile,data.supportLandline,data.whatsappNumber,
    data.whatsappEnabled,data.email,data.instagramUrl,data.telegramUrl,
    data.defaultMetaTitle,data.defaultMetaDescription,data.defaultOgImageUrl]
  );
  await client.query(
    "INSERT INTO site_settings_audit (actor,old_settings,new_settings) VALUES ('owner',$1::jsonb,$2::jsonb)",
    [JSON.stringify(previous),JSON.stringify(data)]
  );
  return "saved";
 });
}
