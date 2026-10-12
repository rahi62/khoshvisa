import test from "node:test";
import assert from "node:assert/strict";
import {createHmac} from "node:crypto";
import {parseInbound,validSignature} from "../lib/whatsapp";

const phoneId="123456789012345",number="989121234567";
const txt=[
 "سلام، از سایت خوش‌ویزا برای راهنمایی ویزا پیام می‌دهم.",
 "مقصد: کانادا",
 "هدف سفر: گردشگری",
 "زمان تقریبی سفر: ۳ تا ۶ ماه آینده",
 "نام: کاربر نمونه",
 "صفحه ورود: /canada-tourist-visa/",
 "کد پیگیری: KV-0123456789ABCDEFABCD"
].join("\n");
function payload(message=txt,phone=phoneId){
 return {object:"whatsapp_business_account",entry:[{changes:[{field:"messages",value:{
  metadata:{phone_number_id:phone},
  contacts:[{wa_id:number,profile:{name:"نام در واتساپ"}}],
  messages:[{id:"wamid.test-1",from:number,type:"text",text:{body:message}}]
 }}]}]};
}
test("validates Meta HMAC-SHA256 against exact raw body",()=>{
 const raw=Buffer.from(JSON.stringify(payload()));
 const secret="unique-test-app-secret";
 const signature="sha256="+createHmac("sha256",secret).update(raw).digest("hex");
 assert.equal(validSignature(raw,signature,secret),true);
 assert.equal(validSignature(Buffer.concat([raw,Buffer.from(" ")]),signature,secret),false);
 assert.equal(validSignature(raw,"sha256="+"0".repeat(64),secret),false);
 assert.equal(validSignature(raw,null,secret),false);
 assert.equal(validSignature(raw,signature,""),false);
});
test("extracts only expected user-provided fields and random tracking reference",()=>{
 const [m]=parseInbound(payload(),phoneId);
 assert.ok(m);
 assert.equal(m.waId,number);
 assert.equal(m.kind,"text");
 assert.equal(m.destination,"کانادا");
 assert.equal(m.purpose,"گردشگری");
 assert.equal(m.travelWindow,"۳ تا ۶ ماه آینده");
 assert.equal(m.name,"کاربر نمونه");
 assert.equal(m.trackingReference,"KV-0123456789ABCDEFABCD");
 assert.equal(m.landingPath,"/canada-tourist-visa/");
 assert.equal(Object.keys(m).includes("textBody"),false);
});
test("wrong Meta phone number is ignored",()=>{
 assert.equal(parseInbound(payload(txt,"OTHER"),phoneId).length,0);
});
test("malformed webhooks and non-arrays fail closed",()=>{
 assert.deepEqual(parseInbound(null,phoneId),[]);
 assert.deepEqual(parseInbound({object:"whatsapp_business_account",entry:{}},phoneId),[]);
 assert.deepEqual(parseInbound({object:"whatsapp_business_account",entry:[{changes:[{field:"messages",value:{metadata:{phone_number_id:phoneId},messages:{}}}]}]},phoneId),[]);
});
test("message without full formatted intake still identifies incoming business chat",()=>{
 const [m]=parseInbound(payload("سلام، سوالی درباره ویزا داشتم"),phoneId);
 assert.equal(m.destination,"");
 assert.equal(m.trackingReference,"");
 assert.equal(m.name,"نام در واتساپ");
});
test("invalid source path and reference are not accepted",()=>{
 const dirty=txt.replace("/canada-tourist-visa/","https://malicious.example/private").replace("KV-0123456789ABCDEFABCD","fake");
 const [m]=parseInbound(payload(dirty),phoneId);
 assert.equal(m.landingPath,"");
 assert.equal(m.trackingReference,"");
});
test("unrecognized sender is not accepted",()=>{
 const p=payload();p.entry[0].changes[0].value.messages[0].from="bad-number";
 assert.deepEqual(parseInbound(p,phoneId),[]);
});
