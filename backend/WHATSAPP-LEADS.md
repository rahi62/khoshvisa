# WhatsApp Business intake + existing Django Lead CRM

**Implementation:** additive Django app \`whatsapp_leads\` on a branch based on \`main\`. No existing records are deleted or overwritten by migrations.

## What it does

- Verifies Meta's GET subscription challenge with \`WHATSAPP_WEBHOOK_VERIFY_TOKEN\`.
- Verifies all POST bodies with \`X-Hub-Signature-256\` / HMAC-SHA256 using \`WHATSAPP_APP_SECRET\`; unsigned/altered payloads are rejected.
- Accepts messages only for \`WHATSAPP_PHONE_NUMBER_ID\` (the KhoshVisa business phone number ID).
- Persists a CRM lead **only after a real inbound WhatsApp message**, never when a user opens \`wa.me\`.
- Uses \`WhatsAppInboundEvent.message_id\` as a database uniqueness gate for webhook retries.
- Extracts destination, purpose, timing and non-secret \`KV-\` tracking reference from the user's voluntary message.
- Stores **no raw message body**, files, images, or passport/financial documents.
- Makes each new contact available in Django Admin, reusing the existing \`content.Lead\` status and notes.
- Tracks status changes in \`LeadStatusHistory\` when staff edits a WhatsApp lead in Django Admin.
- Records separate, evidenced consent for optional subsequent disclosure to an independent service provider; no automatic referral/forwarding exists.
- Supplies opt-in-only purge and verified-erasure management commands.

## Dependencies / operational requirements

Requires a configured **Meta WhatsApp Business Platform Cloud API** app and a phone number connected to that app. A normal \`wa.me\` link, personal WhatsApp account, or standalone WhatsApp Business App does **not** by itself supply signed webhook messages. Some numbers may support WhatsApp Business App/Platform coexistence depending on Meta eligibility; do not assume it.

The frontend number \`NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER\` is **public**. It must correspond to the actual business number connected to the Meta webhook's \`WHATSAPP_PHONE_NUMBER_ID\` (a separate opaque Meta identifier). The server-only Meta App Secret and verify token must never be committed or embedded in Next.js.

## Setup on a Django API service

1. Review / merge the dedicated backend PR to \`main\` **only with separate deployment approval** and a database backup plan.
2. Configure HTTPS on the API service \`api.khoshvisa.ir\`; protect Django Admin with staff auth and network access controls. Verify \`ALLOWED_HOSTS\`, reverse-proxy headers and PostgreSQL credentials. Disable Django DEBUG in production.
3. Add server-only env vars, all with real values:

   \`\`\`env
   WHATSAPP_WEBHOOK_VERIFY_TOKEN=<random-long-secret>
   WHATSAPP_APP_SECRET=<Meta-application-secret>
   WHATSAPP_PHONE_NUMBER_ID=<Meta-WhatsApp-business-phone-number-ID>
   WHATSAPP_RETENTION_DAYS=180
   \`\`\`

4. After backing up the database, from the existing Django backend environment run:

   \`\`\`bash
   python manage.py check --deploy
   python manage.py migrate
   python manage.py test whatsapp_leads
   \`\`\`

5. Restart the API service and confirm GET \`/health/\` succeeds.
6. In **Meta Developers → WhatsApp → Configuration**, use:

   - Callback URL: \`https://api.khoshvisa.ir/api/whatsapp/webhook/\`
   - Verify token: exactly the server-only \`WHATSAPP_WEBHOOK_VERIFY_TOKEN\`
   - Subscribe to the **messages** field.

7. Send a **real** test message from a different WhatsApp account. Confirm the callback POST succeeds, and \`/admin/\` shows one \`WhatsAppContact\` associated with one \`Lead\` with \`source=whatsapp\` and status \`new\`. Re-delivering the same signed payload must not create a second lead. Check log output without printing message body.

8. Configure frontend business phone separately in the Vercel static project. The website only opens a WhatsApp draft and never asserts successful delivery.

## Operator workflow

1. Real inbound message → new CRM lead, status **new**.
2. Staff replies in WhatsApp, updates Lead in Django Admin to **contacted**.
3. Needs later answer → **follow_up**; record the due date in internal admin notes (not visible to website visitors).
4. After review → **qualified** or **invalid**.
5. **Never auto-send the individual's data to another business.** If service delivery requires an independent provider, tell the individual what categories of data will be shared with whom and why, obtain their separate informed permission and record evidence in the WhatsApp Contact admin.
6. Only then manually send the permitted data using an approved channel, record the provider identifier/date and set Lead status to **referred**; model validation blocks \`referred\` on WhatsApp leads without the separate permission.
7. Track actual outcome with **converted** / **closed** as appropriate.

All referral commission/business terms stay inside the company; however users must not be deceived about who will receive their personal information.

## If Meta Cloud API is not connected yet

Continue to communicate via an operator-controlled WhatsApp Business App. Use its labels for **new**, **contacted**, **follow-up**, **qualified** and **closed**, and, if necessary, manually create a new entry in the existing Django **Lead Admin**, using source \`whatsapp-manual\`. This is manual tracking, **not provider-confirmed automatic intake**. No automatic webhook-based lead counts are available until the Meta connection is operational.

## Data safety

- \`WhatsAppContact.partner_share_consent=False\` by default.
- An admin cannot mark a WhatsApp Lead as **referred** until contact-specific evidenced consent is recorded.
- Consent flags are separate: a message voluntarily sent to KhoshVisa is permission to communicate with KhoshVisa, **not** permission to disclose to a third party.
- A source website form does not store phone, passport or other sensitive documents.
- Event IDs (not full raw messages) are retained to deduplicate provider retries.
- Use role-limited staff accounts and encrypted database backups. Do not export unrestricted CRM spreadsheets.

### Retention and deletion

Dry-run by default, deleting only closed/invalid provider-confirmed WhatsApp conversations older than the retention period:

\`\`\`bash
python manage.py purge_whatsapp_leads
python manage.py purge_whatsapp_leads --apply
\`\`\`

For a person's deletion request, first **verify identity** using the original conversation channel, then:

\`\`\`bash
python manage.py erase_whatsapp_contact --wa-id <digits>
python manage.py erase_whatsapp_contact --wa-id <digits> --apply
\`\`\`

Both commands intentionally require \`--apply\` for destructive operation. Consider statutory retention obligations separately before deleting records.

## Tests and limits

Run \`python manage.py test whatsapp_leads\`: it covers challenge verification, HMAC rejection, incoming lead creation, webhook idempotency, sender status preservation, number filtering, payload bounds, and separate transfer consent.

**Not implemented:** automated reply sending, automatic partner handoff, WhatsApp message templates, WhatsApp Business API registration, Meta account verification, a live deployed webhook, a live encrypted CRM backup pipeline, email/SMS fallback or actual submission success claims. These require the business number, Meta platform credentials and approved server deployment.
