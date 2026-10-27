/** Verified public response line provided by the KhoshVisa site operator. */
export const CONTACT_MOBILE_DISPLAY = "09351300502";
export const CONTACT_MOBILE_E164 = "+989351300502";
export const CONTACT_PHONE_HREF = "tel:" + CONTACT_MOBILE_E164;

/**
 * Opens a WhatsApp draft only after an explicit visitor click.
 * Opening a conversation is not evidence that the visitor has sent a message.
 */
export const CONTACT_WHATSAPP_MESSAGE = "سلام، از سایت خوش‌ویزا برای درخواست ویزای توریستی پیام می‌دهم.";
export const CONTACT_WHATSAPP_HREF =
  "https://wa.me/989351300502?text=" + encodeURIComponent(CONTACT_WHATSAPP_MESSAGE);
