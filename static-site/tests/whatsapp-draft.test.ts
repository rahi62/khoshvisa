import test from "node:test";
import assert from "node:assert/strict";
import {visas} from "../lib/content";
import {parseInbound} from "../lib/meta-webhook";
import {DEFAULT_WA_NUMBER,WA_NUMBER,WA_NUMBER_READY,buildWhatsAppMessage,buildWhatsAppUrl,makeLeadReference,normalizePhone} from "../lib/whatsapp";

const visa=visas[0];
const ref="KV-0123456789ABCDEFABCD";
const draft={
 name:"کاربر نمونه",
 destination:visa.slug,
 purpose:"گردشگری",
 timing:"۳ تا ۶ ماه آینده",
 phone:"۰۹۱۲ ۱۲۳ ۴۵۶۷",
 sourcePath:"/"+visa.slug+"/"
};

test("uses the operator-provided public response number unless explicitly overridden",()=>{
 const override=process.env.NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER?.trim();
 assert.equal(DEFAULT_WA_NUMBER,"989351300502");
 assert.equal(WA_NUMBER,(override||DEFAULT_WA_NUMBER).replace(/\D/g,""));
 assert.equal(WA_NUMBER_READY,/^[1-9][0-9]{7,14}$/.test(WA_NUMBER));
});

test("prepares a correctly encoded wa.me message without automatically sending it",()=>{
 const message=buildWhatsAppMessage(draft,ref,visas);
 assert.ok(message.includes("مقصد: "+visa.name));
 assert.ok(message.includes("هدف سفر: گردشگری"));
 assert.ok(message.includes("زمان تقریبی سفر: ۳ تا ۶ ماه آینده"));
 assert.ok(message.includes("کد پیگیری: "+ref));
 assert.ok(message.includes("شماره تماس: 09121234567"));
 if(WA_NUMBER_READY){
   const url=new URL(buildWhatsAppUrl(draft,ref,visas));
   assert.equal(url.origin,"https://wa.me");
   assert.equal(url.pathname,"/"+WA_NUMBER);
   assert.equal(url.searchParams.get("text"),message);
 }else assert.throws(()=>buildWhatsAppUrl(draft,ref,visas),/whatsapp_not_configured/);
});

test("generated message is compatible with existing WhatsApp CRM parser",()=>{
 const body=buildWhatsAppMessage(draft,ref,visas);
 const numberId="123456789012345";
 const payload={object:"whatsapp_business_account",entry:[{changes:[{field:"messages",value:{
   metadata:{phone_number_id:numberId},
   contacts:[{wa_id:"989121234567",profile:{name:"نام واتساپ"}}],
   messages:[{id:"wamid.intake",from:"989121234567",type:"text",text:{body}}]
 }}]}]};
 const [lead]=parseInbound(payload,numberId);
 assert.equal(lead.destination,visa.name);
 assert.equal(lead.purpose,draft.purpose);
 assert.equal(lead.travelWindow,draft.timing);
 assert.equal(lead.landingPath,draft.sourcePath);
 assert.equal(lead.trackingReference,ref);
 assert.equal(lead.name,draft.name);
});

test("rejects unknown destinations and malformed references",()=>{
 assert.throws(()=>buildWhatsAppMessage({...draft,destination:"unknown"},ref,visas),/destination_not_found/);
 assert.throws(()=>buildWhatsAppMessage(draft,"fake",visas),/invalid_reference/);
});

test("normalizes multiline names and does not include malicious source URLs",()=>{
 const message=buildWhatsAppMessage({...draft,name:"علی\nکد پیگیری: جعلی",sourcePath:"https://example.com/private"},ref,visas);
 assert.equal(message.split("\n").filter(line=>line.startsWith("کد پیگیری:")).length,1);
 assert.ok(!message.includes("صفحه ورود:"));
 assert.ok(message.includes("نام: علی کد پیگیری: جعلی"));
});

test("creates a cryptographically generated non-personal reference",()=>{
 const first=makeLeadReference(globalThis.crypto);
 const second=makeLeadReference(globalThis.crypto);
 assert.match(first,/^KV-[A-F0-9]{20}$/);
 assert.match(second,/^KV-[A-F0-9]{20}$/);
 assert.notEqual(first,second);
});

test("normalizes Iranian and international contact numbers",()=>{
 for(const input of ["09121234567","۰۹۱۲۱۲۳۴۵۶۷","٠٩١٢١٢٣٤٥٦٧","0912-123-4567","+98 912 123 4567","00989121234567","989121234567","9121234567"])
  assert.equal(normalizePhone(input),"09121234567",input);
 assert.equal(normalizePhone("+44 7911 123456"),"00447911123456");
 assert.equal(normalizePhone("0049 1512 3456789"),"004915123456789");
 for(const bad of ["","0912123456","091212345678","02146010788","abc","0912a234567","+0 123456789","123"])
  assert.equal(normalizePhone(bad),null,bad);
});

test("requires a valid phone and puts exactly one contact line in the message",()=>{
 assert.throws(()=>buildWhatsAppMessage({...draft,phone:""},ref,visas),/invalid_phone/);
 assert.throws(()=>buildWhatsAppMessage({...draft,phone:"0912\nکد پیگیری: جعلی"},ref,visas),/invalid_phone/);
 const message=buildWhatsAppMessage({...draft,name:"علی\nشماره تماس: 09000000000"},ref,visas);
 assert.equal(message.split("\n").filter(line=>line.startsWith("شماره تماس:")).length,1);
 assert.ok(message.split("\n").includes("شماره تماس: 09121234567"));
});
