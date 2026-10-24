# KhoshVisa WhatsApp-first intake — frontend

## Operating model

1. A user visits a country money page and chooses **درخواست راهنمایی در واتساپ**.
2. The form prepares only the selected country, purpose, travel window, optional name, source path and a cryptographically random **KV-...** reference in the browser.
3. The user explicitly accepts the WhatsApp handoff and privacy notice.
4. An official \`wa.me/<business-number>?text=<encoded-message>\` link opens; the **user must tap Send in WhatsApp**. Opening a tab never means the message was delivered or registered.
5. When the Meta WhatsApp Business Platform **messages** webhook for the same business number is configured, the existing Django CRM records *real inbound* messages only, deduplicated on WhatsApp's message ID.
6. Until then, follow incoming chats in WhatsApp Business App (labels) and optionally enter leads manually in Django Admin. Automatic CRM tracking is **not active** without Cloud API webhook connectivity.

## Environment / activation

Set \`NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER\` for the \`static-site\` **Vercel build** with verified international digits, without \`+\`. Example pattern for Iran: \`98xxxxxxxxxx\`. Never invent a number.

An absent or empty override uses the default response number; an explicitly set but invalid override disables the action and shows a warning. The contact form remains a browser-to-WhatsApp handoff and is **not** a server submission. Current Next.js deployment is hybrid (prerendered SEO pages with serverless `/admin` and `/api` routes); this does not change the form privacy behavior.

After setting the variable, trigger a new Production deployment. Verify the production branch is \`static\` and that the Vercel custom domain points to the intended deployment.

## Privacy and tracking semantics

- No form fields are POSTed to a site server or saved in localStorage/cookies by this component.
- There is no sensitive passport number, phone input, financial upload, or automatic forwarding to independent providers.
- The visitor can edit the drafted WhatsApp text before sending.
- The website event \`khoshvisa:whatsapp_opened\` is deliberately **not a successful lead**; it contains only destination and a generic source, no name/phone/reference.
- The \`KV-<20 hex chars>\` reference is a correlation ID only, **not an authentication credential**.
- Existing Django Admin leads track \`new\`, \`contacted\`, \`follow_up\`, \`qualified\`, \`referred\` (after separate consent), \`converted\`, \`closed\`, and \`invalid\`.
- Before any personally identifiable lead data is transferred to a separate service provider, record explicit and evidenced consent. Never assume sending a WhatsApp message is permission for that separate disclosure.

## Test checklist

- Missing/invalid env => action stays disabled and no artificial success.
- Default response number (or valid env override) + missing destination/unchecked consent => submit stays disabled; Enter and touch cannot bypass the gate.
- Valid env + complete selection/consent => actual \`https://wa.me/\` opens in a new tab, prefilling selected fields and reference.
- Destination passed as \`?destination=canada-tourist-visa\` is preselected.
- Validate handoff on an actual Android/iOS phone and desktop WhatsApp Web with the confirmed WhatsApp response number. Verify the receiving inbox actually receives a message after the visitor presses Send.
- No fake success after click; user is reminded to press **Send** inside WhatsApp.
- After optional webhook activation: verify one inbound message creates one lead and repeating the provider's webhook doesn't duplicate it.

See the independent Django/backend feature branch and deployment notes for webhook setup and manual lead tracking.
