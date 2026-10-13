/** Public, non-sensitive contact details only. WhatsApp Business is configured separately. */
export type ContactSettings={
 supportMobile:string;
 supportLandline:string;
 version:number;
 updatedAt:Date|null;
};
export const DEFAULT_CONTACT_SETTINGS:ContactSettings={
 supportMobile:"09351300502",
 supportLandline:"02146010788",
 version:0,
 updatedAt:null
};
export function normalizePhone(input:string):string{
 return input.replace(/[۰-۹]/g,x=>String(x.charCodeAt(0)-1776))
   .replace(/[٠-٩]/g,x=>String(x.charCodeAt(0)-1632))
   .trim().replace(/[\s\-().]/g,"")
   .replace(/^\+98/,"0").replace(/^0098/,"0");
}
export function validMobile(input:string):boolean{return /^09[0-9]{9}$/.test(input)}
export function validLandline(input:string):boolean{return /^0[1-8][0-9]{9}$/.test(input)}
export function phoneHref(input:string):string{return "tel:+98"+input.slice(1)}
