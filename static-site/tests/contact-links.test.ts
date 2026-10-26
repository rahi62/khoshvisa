import test from "node:test";
import assert from "node:assert/strict";
import {
  CONTACT_MOBILE_DISPLAY,
  CONTACT_MOBILE_E164,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
  CONTACT_WHATSAPP_MESSAGE,
} from "../lib/contact-links";

test("phone option dials the same response number displayed in the contact menu", () => {
  assert.equal(CONTACT_MOBILE_DISPLAY, "09351300502");
  assert.equal(CONTACT_MOBILE_E164, "+989351300502");
  assert.equal(CONTACT_PHONE_HREF, "tel:+989351300502");
});

test("WhatsApp option opens an explicit user-controlled draft to the same number", () => {
  const parsed = new URL(CONTACT_WHATSAPP_HREF);
  assert.equal(parsed.protocol, "https:");
  assert.equal(parsed.hostname, "wa.me");
  assert.equal(parsed.pathname, "/989351300502");
  assert.equal(parsed.searchParams.get("text"), CONTACT_WHATSAPP_MESSAGE);
  assert.match(CONTACT_WHATSAPP_MESSAGE, /خوش‌ویزا/);
});
