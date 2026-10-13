import type {Visa} from "./content";

/**
 * No phone number or user-supplied data is persisted by this static site.
 * The hand-off happens only after an explicit browser click and WhatsApp send.
 */
export type WhatsAppDraft={
  name:string;
  destination:string;
  purpose:string;
  timing:string;
  sourcePath:string;
};
// Public response number provided by the site operator (09351300502). The Vercel variable may override it.\nexport const DEFAULT_WA_NUMBER="989351300502";\nexport const WA_NUMBER=(process.env.NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER?.trim()||DEFAULT_WA_NUMBER).replace(/\D/g,"");
export const WA_NUMBER_READY=/^[1-9][0-9]{7,14}$/.test(WA_NUMBER);

const compact=(s:string,max:number)=>s.normalize("NFC").replace(/[\r\n\t]+/g," ").replace(/\s+/g," ").trim().slice(0,max);

/** Only crypto-secure randomness; no personal information is encoded in this reference. */
export function makeLeadReference(cryptoApi:Pick<Crypto,"getRandomValues">):string{
  const bytes=new Uint8Array(10);
  cryptoApi.getRandomValues(bytes);
  return "KV-"+Array.from(bytes,b=>b.toString(16).padStart(2,"0")).join("").toUpperCase();
}
export function buildWhatsAppMessage(draft:WhatsAppDraft,ref:string,visas:Visa[]):string{
  const v=visas.find(x=>x.slug===draft.destination);
  if(!v)throw new Error("destination_not_found");
  if(!/^KV-[A-F0-9]{20}$/.test(ref))throw new Error("invalid_reference");
  const parts=[
    "سلام، از سایت خوش‌ویزا برای راهنمایی ویزا پیام می‌دهم.",
    "مقصد: "+compact(v.name,60),
    "هدف سفر: "+compact(draft.purpose,60),
    "زمان تقریبی سفر: "+compact(draft.timing,60),
  ];
  if(compact(draft.name,80))parts.push("نام: "+compact(draft.name,80));
  const clean=compact(draft.sourcePath,160);
  if(/^\/[a-z0-9/-]*\/?$/.test(clean))parts.push("صفحه ورود: "+clean);
  parts.push("کد پیگیری: "+ref);
  return parts.join("\n");
}
export function buildWhatsAppUrl(draft:WhatsAppDraft,reference:string,visas:Visa[]):string{
  if(!WA_NUMBER_READY)throw new Error("whatsapp_not_configured");
  const text=buildWhatsAppMessage(draft,reference,visas);
  return "https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(text);
}
