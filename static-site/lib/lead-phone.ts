/** Normalize callback identifiers. Never infer the messaging channel from a phone number. */
export function normalizeLeadPhone(value:string):string{
 const raw=value.trim();
 if(!/^[+()\d\s-]{8,30}$/.test(raw))return "";
 let digits=raw.replace(/\D/g,"");
 if(digits.startsWith("0098"))digits=digits.slice(2);
 else if(/^0(?:9\d{9}|[1-8]\d{9})$/.test(digits))digits="98"+digits.slice(1);
 return /^[1-9][0-9]{7,14}$/.test(digits)?digits:"";
}
