import test from "node:test";
import assert from "node:assert/strict";
import {DEFAULT_SITE_SETTINGS,cleanSettingsForm,normalizePhone,normalizeWhatsApp,validateSettings,phoneHref} from "../lib/site-settings";

function form(overrides:Record<string,string>={}){
 const result=new FormData();
 for(const [name,val] of Object.entries(DEFAULT_SITE_SETTINGS)){
  if(name==="version"||name==="updatedAt")continue;
  if(typeof val==="string")result.set(name,overrides[name]??val);
 }
 if(overrides.whatsappEnabled==="yes")result.set("whatsappEnabled","yes");
 return result;
}
test("normalizes Persian/Arabic digits and Iranian prefixes",()=>{
 assert.equal(normalizePhone("۰۹۳۵ ۱۳۰۰۵۰۲"),"09351300502");
 assert.equal(normalizePhone("+98 935 1300502"),"09351300502");
 assert.equal(normalizePhone("٠٢١-٤٦٠١٠٧٨٨"),"02146010788");
 assert.equal(normalizeWhatsApp("۰۹۳۵۱۳۰۰۵۰۲"),"989351300502");
 assert.equal(normalizeWhatsApp("0098 935 1300502"),"989351300502");
 assert.equal(normalizeWhatsApp("abc"),"");
 assert.equal(phoneHref("02146010788"),"tel:+982146010788");
});
test("accepts complete standalone site settings",()=>{
 const parsed=cleanSettingsForm(form());
 assert.ok(parsed);
 assert.equal(parsed.supportMobile,"09351300502");
 assert.equal(parsed.whatsappEnabled,false);
});
test("rejects invalid URLs, phone, and injected control characters",()=>{
 assert.equal(cleanSettingsForm(form({logoUrl:"javascript:alert(1)"})),null);
 assert.equal(cleanSettingsForm(form({instagramUrl:"http://example.com"})),null);
 assert.equal(cleanSettingsForm(form({supportMobile:"invalid"})),null);
 assert.equal(cleanSettingsForm(form({brandName:"bad\nname"})),null);
 assert.equal(cleanSettingsForm(form({supportMobile:"",supportLandline:""})),null);
});
test("WhatsApp cannot be activated without its own validated recipient",()=>{
 assert.equal(cleanSettingsForm(form({whatsappEnabled:"yes"})),null);
 const good=cleanSettingsForm(form({whatsappEnabled:"yes",whatsappNumber:"+98 935 1300502"}));
 assert.ok(good);
 assert.equal(good.whatsappEnabled,true);
 assert.equal(good.whatsappNumber,"989351300502");
 assert.equal(validateSettings({...good,whatsappNumber:"invalid"}),false);
});
