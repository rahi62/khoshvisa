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

The static build intentionally shows a **disabled but informative** button if the number is unset, blank, or invalid. Next.js static export does not support server API routes, so this is a browser-to-WhatsApp handoff and not a server submission.

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
- Valid env + missing destination/unchecked consent => no navigation.
- Valid env + complete selection/consent => actual \`https://wa.me/\` opens in a new tab, prefilling selected fields and reference.
- Destination passed as \`?destination=canada-tourist-visa\` is preselected.
- Mobile WhatsApp and desktop WhatsApp Web work with the same international business number.
- No fake success after click; user is reminded to press **Send** inside WhatsApp.
- After optional webhook activation: verify one inbound message creates one lead and repeating the provider's webhook doesn't duplicate it.

See the independent Django/backend feature branch and deployment notes for webhook setup and manual lead tracking.
