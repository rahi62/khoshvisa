/** Public configuration only. Keep login credentials, vendor identities and CRM data out. */
export type SiteSettingsData={
  brandName:string; brandNameEn:string; tagline:string; footerDescription:string;
  logoUrl:string; faviconUrl:string; supportMobile:string; supportLandline:string;
  whatsappNumber:string; whatsappEnabled:boolean; email:string;
  instagramUrl:string; telegramUrl:string; defaultMetaTitle:string;
  defaultMetaDescription:string; defaultOgImageUrl:string;
};
export type SiteSettings=SiteSettingsData & {version:number;updatedAt:string|null};
export const DEFAULT_SITE_SETTINGS:SiteSettings={
  brandName:"خوش‌ویزا",brandNameEn:"KhoshVisa",tagline:"راهنمای فارسی ویزای توریستی",
  footerDescription:"راهنمای فارسی ویزای توریستی؛ برای تصمیم‌گیری آگاهانه، برنامه‌ریزی دقیق و سفرهای خاطره‌انگیز.",
  logoUrl:"",faviconUrl:"",supportMobile:"09351300502",supportLandline:"02146010788",
  whatsappNumber:"",whatsappEnabled:false,email:"",instagramUrl:"",telegramUrl:"",
  defaultMetaTitle:"خوش‌ویزا | ویزای توریستی و راهنمای سفر",
  defaultMetaDescription:"راهنمای تخصصی ویزای توریستی شینگن، کانادا، انگلیس، ژاپن و دیگر مقصدها؛ شرایط، مدارک، هزینه‌ها و مسیر درخواست.",
  defaultOgImageUrl:"",version:0,updatedAt:null
};
export const SETTINGS_FIELDS={
  brandName:120,brandNameEn:120,tagline:220,footerDescription:600,
  logoUrl:2048,faviconUrl:2048,supportMobile:24,supportLandline:24,
  whatsappNumber:26,email:254,instagramUrl:2048,telegramUrl:2048,
  defaultMetaTitle:180,defaultMetaDescription:320,defaultOgImageUrl:2048
} as const;
export type TextSettingField=keyof typeof SETTINGS_FIELDS;
const persianDigits=(s:string)=>s.replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776))
  .replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632));
export const normalizePhone=(s:string)=>persianDigits(s).trim().replace(/[\s\-().]/g,"")
  .replace(/^\+98/,"0").replace(/^0098/,"0");
export function normalizeWhatsApp(input:string):string{
 const raw=persianDigits(input).trim().replace(/[\s\-().]/g,"");
 const local=normalizePhone(raw);
 if(/^09[0-9]{9}$/.test(local))return "98"+local.slice(1);
 return /^989[0-9]{9}$/.test(raw)?raw:"";
}
export const validMobile=(s:string)=>s===""||/^09[0-9]{9}$/.test(s);
export const validLandline=(s:string)=>s===""||/^0[1-8][0-9]{9}$/.test(s);
export const phoneHref=(s:string)=>"tel:+98"+s.slice(1);
const secureUrl=(s:string)=>{
 if(!s)return true;
 try{const u=new URL(s);return u.protocol==="https:"&&Boolean(u.hostname)&&!u.username&&!u.password}catch{return false}
};
const validEmail=(s:string)=>!s||(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<=254);
export function validateSettings(s:SiteSettingsData):boolean{
 for(const [field,max] of Object.entries(SETTINGS_FIELDS) as [TextSettingField,number][]){
  const value=s[field];
  if(typeof value!=="string"||value.length>max||/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)||
     (field!=="footerDescription"&&/[\r\n]/.test(value)))return false;
 }
 if(!s.brandName||!s.brandNameEn||!s.defaultMetaTitle||!s.defaultMetaDescription)return false;
 if(!validMobile(s.supportMobile)||!validLandline(s.supportLandline)||(!s.supportMobile&&!s.supportLandline))return false;
 if(!validEmail(s.email))return false;
 if(![s.logoUrl,s.faviconUrl,s.instagramUrl,s.telegramUrl,s.defaultOgImageUrl].every(secureUrl))return false;
 if(s.whatsappNumber&&!/^989[0-9]{9}$/.test(s.whatsappNumber))return false;
 return typeof s.whatsappEnabled==="boolean"&&(!s.whatsappEnabled||!!s.whatsappNumber);
}
export function cleanSettingsForm(form:FormData):SiteSettingsData|null{
 const data={} as Record<keyof SiteSettingsData,string|boolean>;
 for(const field of Object.keys(SETTINGS_FIELDS) as TextSettingField[]){
  const v=form.get(field);
  if(typeof v!=="string"||v.length>SETTINGS_FIELDS[field]+20)return null;
  data[field]=v.trim().normalize("NFC");
 }
 data.supportMobile=normalizePhone(data.supportMobile as string);
 data.supportLandline=normalizePhone(data.supportLandline as string);
 const rawWa=data.whatsappNumber as string;
 data.whatsappNumber=rawWa?normalizeWhatsApp(rawWa):"";
 data.whatsappEnabled=form.get("whatsappEnabled")==="yes";
 const parsed=data as unknown as SiteSettingsData;
 if(rawWa&&!parsed.whatsappNumber)return null;
 return validateSettings(parsed)?parsed:null;
}
