import test from "node:test";
import assert from "node:assert/strict";
import {normalizeIranWhatsApp,validateContactInput,isPublicContactSettings} from "../lib/contact-settings";
test("Iranian mobile number can be normalized for an approved WhatsApp configuration",()=>{
 assert.equal(normalizeIranWhatsApp("09351300502"),"989351300502");
 assert.equal(normalizeIranWhatsApp("+98 935 130 0502"),"989351300502");
 assert.equal(normalizeIranWhatsApp("00989351300502"),"989351300502");
 assert.equal(normalizeIranWhatsApp("02146010788"),"");
 assert.equal(normalizeIranWhatsApp("https://evil.test"),"");
});
test("WhatsApp remains disabled without an explicit approved number",()=>{
 const contact={mobile:"09351300502",landline:"02146010788",whatsappEnabled:false,whatsappNumber:""};
 assert.equal(validateContactInput(contact),true);
 assert.equal(validateContactInput({...contact,whatsappEnabled:true}),false);
 assert.equal(validateContactInput({...contact,whatsappEnabled:true,whatsappNumber:"989351300502"}),true);
});
test("cannot disable all phone channels or serve malformed public settings",()=>{
 const contact={mobile:"",landline:"",whatsappEnabled:false,whatsappNumber:""};
 assert.equal(validateContactInput(contact),false);
 assert.equal(isPublicContactSettings({...contact,mobile:"09123456789"}),true);
 assert.equal(isPublicContactSettings({mobile:"09123456789",landline:"",whatsappNumber:"",whatsappEnabled:"yes"}),false);
 assert.equal(isPublicContactSettings(null),false);
});

import {normalizeLeadPhone} from "../lib/lead-phone";
test("phone contacts can be logged as phone leads, never as an assumed WhatsApp account",()=>{
 assert.equal(normalizeLeadPhone("09351300502"),"989351300502");
 assert.equal(normalizeLeadPhone("02146010788"),"982146010788");
 assert.equal(normalizeLeadPhone("+98 935 130 0502"),"989351300502");
 assert.equal(normalizeLeadPhone("00000000"),"");
 assert.equal(normalizeLeadPhone("javascript:alert(1)"),"");
});
