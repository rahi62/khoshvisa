import {visas} from "./content";

/**
 * The persistent public CTA always opens the local consent-based form,
 * never an unsolicited direct WhatsApp message.
 */
export function whatsappContactHref(pathname:string):string{
 const path=(pathname.split(/[?#]/,1)[0]||"/").replace(/\/+$/,"")||"/";
 if(path==="/consultation")return "#kv-wa-form";
 const visa=visas.find(item=>path==="/"+item.slug);
 if(visa)return "/consultation/?destination="+encodeURIComponent(visa.slug);
 return "/consultation/";
}
