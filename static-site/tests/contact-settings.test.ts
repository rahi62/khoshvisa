import test from "node:test";
import assert from "node:assert/strict";
import {DEFAULT_CONTACT_SETTINGS,normalizePhone,validLandline,validMobile,phoneHref} from "../lib/contact-settings";

test("approved response numbers are valid and international tel links are correct",()=>{
 assert.equal(validMobile(DEFAULT_CONTACT_SETTINGS.supportMobile),true);
 assert.equal(validLandline(DEFAULT_CONTACT_SETTINGS.supportLandline),true);
 assert.equal(phoneHref(DEFAULT_CONTACT_SETTINGS.supportMobile),"tel:+989351300502");
 assert.equal(phoneHref(DEFAULT_CONTACT_SETTINGS.supportLandline),"tel:+982146010788");
});
test("normalizes Persian, Arabic, and international numbers without guessing WhatsApp routing",()=>{
 assert.equal(normalizePhone("۰۹۳۵ ۱۳۰۰ ۵۰۲"),"09351300502");
 assert.equal(normalizePhone("٠٢١-٤٦٠١٠٧٨٨"),"02146010788");
 assert.equal(normalizePhone("+98 (935) 1300502"),"09351300502");
 assert.equal(normalizePhone("0098 21 46010788"),"02146010788");
});
test("rejects malformed or unrelated contact values",()=>{
 assert.equal(validMobile(normalizePhone("02146010788")),false);
 assert.equal(validLandline(normalizePhone("09351300502")),false);
 assert.equal(validMobile(normalizePhone("09351300abc")),false);
 assert.equal(validLandline(normalizePhone("12345678901")),false);
 assert.equal(validMobile(normalizePhone("0098 935 13005021")),false);
});
