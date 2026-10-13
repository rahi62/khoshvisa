/** Shared public-only contact shape. Never place CRM notes or partner details here. */
export type PublicContactSettings={
 mobile:string;
 landline:string;
 whatsappNumber:string;
 whatsappEnabled:boolean;
};
export type ContactSettingsRow=PublicContactSettings & {version:number;updated_at:Date};
export const MOBILE_RE=/^09[0-9]{9}$/;
export const LANDLINE_RE=/^0[1-8][0-9]{9}$/;
export const WA_RE=/^989[0-9]{9}$/;
export function normalizeIranWhatsApp(value:string):string{
 const digits=value.replace(/[\s()+-]/g,"");
 if(MOBILE_RE.test(digits))return "98"+digits.slice(1);
 if(/^00989[0-9]{9}$/.test(digits))return digits.slice(2);
 return WA_RE.test(digits)?digits:"";
}
export function validateContactInput(data:PublicContactSettings):boolean{
 return (data.mobile===""||MOBILE_RE.test(data.mobile)) &&
  (data.landline===""||LANDLINE_RE.test(data.landline)) &&
  (data.mobile!==""||data.landline!=="") &&
  (data.whatsappNumber===""||WA_RE.test(data.whatsappNumber)) &&
  (!data.whatsappEnabled||!!data.whatsappNumber);
}
export function isPublicContactSettings(value:unknown):value is PublicContactSettings{
 if(!value||typeof value!=="object")return false;
 const v=value as Record<string,unknown>;
 return typeof v.mobile==="string"&&typeof v.landline==="string"&&
  typeof v.whatsappNumber==="string"&&typeof v.whatsappEnabled==="boolean"&&
  validateContactInput({mobile:v.mobile,landline:v.landline,whatsappNumber:v.whatsappNumber,whatsappEnabled:v.whatsappEnabled});
}
