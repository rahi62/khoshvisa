import test from "node:test";
import assert from "node:assert/strict";
import {visas} from "../lib/content";
import {whatsappContactHref} from "../lib/whatsapp-contact-link";

test("bottom CTA opens the consultation form from every public section",()=>{
 for(const path of ["/","/about/","/contact/","/destinations/","/visa-guides/","/privacy/","/visa-readiness/"]){
   assert.equal(whatsappContactHref(path),"/consultation/");
 }
});

test("bottom CTA retains each valid visa destination",()=>{
 for(const visa of visas){
   const expected="/consultation/?destination="+encodeURIComponent(visa.slug);
   assert.equal(whatsappContactHref("/"+visa.slug+"/"),expected);
   assert.equal(whatsappContactHref("/"+visa.slug),expected);
 }
});

test("on consultation page bottom CTA jumps to the form rather than rerouting",()=>{
 assert.equal(whatsappContactHref("/consultation/"),"#kv-wa-form");
 assert.equal(whatsappContactHref("/consultation"),"#kv-wa-form");
});

test("unknown or nested routes do not leak arbitrary destination slugs",()=>{
 for(const path of ["/unknown-visa/","/admin/leads/","/visa-guides/guide-slug/","/schengen-visa/more/"]){
   assert.equal(whatsappContactHref(path),"/consultation/");
 }
});
