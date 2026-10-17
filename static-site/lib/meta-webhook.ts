import {createHmac,timingSafeEqual} from "node:crypto";
const ID=/^[1-9][0-9]{7,14}$/;
const REF=/^KV-[A-F0-9]{20}$/;
const LANDING=/^\/[a-z0-9/-]{0,180}$/;
export type Inbound={
 messageId:string;waId:string;kind:string;name:string;destination:string;
 purpose:string;travelWindow:string;trackingReference:string;landingPath:string;
};
function clean(s:unknown,max:number):string{return typeof s==="string"?s.normalize("NFC").replace(/[\u0000-\u001f]+/g," ").replace(/\s+/g," ").trim().slice(0,max):""}
function line(s:string,label:string,max:number){
 const raw=s.split(/\r?\n/).slice(0,20).find(x=>x.startsWith(label+":"));
 return raw?clean(raw.slice(label.length+1),max):"";
}
export function validSignature(raw:Buffer,header:string|null,secret:string):boolean{
 if(!secret||!header||!/^sha256=[a-f0-9]{64}$/.test(header))return false;
 const correct="sha256="+createHmac("sha256",secret).update(raw).digest("hex");
 const a=Buffer.from(header),b=Buffer.from(correct);
 return a.length===b.length&&timingSafeEqual(a,b);
}
export function parseInbound(body:unknown,phoneNumberId:string):Inbound[]{
 if(typeof body!=="object"||!body||Array.isArray(body))return[];
 const root=body as Record<string,unknown>;
 if(root.object!=="whatsapp_business_account"||!Array.isArray(root.entry))return[];
 const result:Inbound[]=[];
 for(const entry of root.entry.slice(0,10)){
   if(!entry||typeof entry!=="object"||!Array.isArray(entry.changes))continue;
   for(const change of entry.changes.slice(0,10)){
     if(!change||change.field!=="messages"||!change.value||typeof change.value!=="object")continue;
     const value=change.value as Record<string,unknown>;
     const meta=value.metadata as Record<string,unknown>|undefined;
     if(!meta||String(meta.phone_number_id)!==phoneNumberId)continue;
     const names=new Map<string,string>();
     if(Array.isArray(value.contacts))for(const c of value.contacts.slice(0,25)){
       if(c&&typeof c==="object"&&typeof c.wa_id==="string"&&c.profile&&typeof c.profile==="object")
         names.set(c.wa_id,clean(c.profile.name,120));
     }
     if(!Array.isArray(value.messages))continue;
     for(const msg of value.messages.slice(0,25)){
       if(!msg||typeof msg!=="object")continue;
       const mid=clean(msg.id,190),waId=clean(msg.from,20),kind=clean(msg.type,32);
       if(!mid||!ID.test(waId))continue;
       const text=kind==="text"&&msg.text&&typeof msg.text==="object"&&typeof msg.text.body==="string"?msg.text.body.slice(0,4000):"";
       let trackingReference=line(text,"کد پیگیری",32).toUpperCase();
       if(!REF.test(trackingReference))trackingReference="";
       let landingPath=line(text,"صفحه ورود",200);
       if(!LANDING.test(landingPath))landingPath="";
       if(result.length>=50)return result;
       result.push({messageId:mid,waId,kind,name:line(text,"نام",120)||names.get(waId)||"",
         destination:line(text,"مقصد",80),purpose:line(text,"هدف سفر",80),
         travelWindow:line(text,"زمان تقریبی سفر",80),trackingReference,landingPath});
     }
   }
 }
 return result;
}
