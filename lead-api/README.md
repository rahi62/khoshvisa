# KhoshVisa Lead API — Next.js 15 + PostgreSQL

This is **not** a static export and does **not** use Django. It's an independent server-side Next.js App Router service located in \`lead-api/\`, designed to run on the owner's VPS behind HTTPS reverse proxy (Nginx / approved Coolify environment).

The customer-facing SEO site continues to build from \`static-site/\` on Vercel. It must **not** be switched from \`output: 'export'\` to a server deployment.

## Main surfaces

| Path | Responsibility |
| --- | --- |
| \`/api/health\` | Database-aware liveness/health status |
| \`GET /api/whatsapp/webhook\` | Meta WhatsApp subscription verification |
| \`POST /api/whatsapp/webhook\` | Verify raw signature, parse bounded metadata, dedupe inbound real messages, persist lead |
| \`/admin/login\` | Owner sign-in with scrypt hashed credential, HMAC-protected HttpOnly session, DB throttling |
| \`/admin\` | Authenticated, paginated RTL lead list, stage filters, overdue follow-up counts and manual intake |
| \`/admin/leads/:id\` | Stage / due date / internal notes, separate consent evidence, actual referral record and audit trail |
| \`scripts/migrate.mjs\` | Transactional version-tracked SQL migrations |
| \`scripts/retention.mjs\` | Dry-run-first data retention maintenance |

## Security and consent rules

1. Opening \`wa.me\` on the public website is **not** a successful lead. The user sends the actual message in WhatsApp.
2. Automatic intake is available only after enabling the official **Meta WhatsApp Business Cloud API** \`messages\` webhook for the same business phone. A standalone WhatsApp Business App is not a webhook integration.
3. The webhook verifies \`X-Hub-Signature-256\` on the **raw body** using Meta App Secret. The configured Meta business Phone Number ID must match.
4. The database stores only a sender account number and compact contact metadata. No inbound message text, document images or passport/financial scans are persisted. A unique provider message ID deduplicates retries.
5. Clicking or sending a message to KhoshVisa is **not** consent for third-party transfer. Recording a referral requires evidence of separate informed permission, the named independent receiving organization, agreed data scope and staff confirmation of actual delivery. The system does **not** automatically forward customer data.
6. The admin cookie is HttpOnly, SameSite Strict, Secure in production, 8-hour HMAC-signed. Mutating routes require exact HTTPS \`Origin\` matching \`PUBLIC_ORIGIN\`. Throttling uses IP hash in PostgreSQL. Staff users must sign in with a strong scrypt-hashed password.
7. No database secrets or Meta App Secret are ever exposed to \`NEXT_PUBLIC_\` variables or bundled into the Vercel site.
8. Live customer phone numbers and internal notes appear only in authenticated admin views. Do not enable caching or analytics there.
9. A deleted lead also removes the associated webhook event and status audit rows. Retention is **never automatic** until an operator explicitly installs an approved cron job.

## PostgreSQL: dedicated DB, not Cafino's

On the personal server, provision **separate database** \`khoshvisa_leads\` and an application user, with a random strong password and least-privilege schema access. Bind PostgreSQL to \`127.0.0.1\` or a private app network. Never open database port 5432 to the public internet. Back up before migrations and schedule encrypted backups with tested restore. Keep \`DATABASE_URL\` in server-side secret settings; don't commit \`.env\`.

Operators can use Coolify's independently managed PostgreSQL resource or an existing OS PostgreSQL installation. Do not reuse or modify unrelated application databases.

## Install/build/deploy

A supported Node 22 LTS runtime is recommended (compatible with Next 15).

1. Add deployment app for \`lead-api/\` using Node/Nixpacks or an approved systemd service, separate from \`static-site/\`.
2. Configure server secrets following \`.env.example\`.
3. Set DNS for a dedicated hostname, e.g. **\`leads.khoshvisa.ir\`**, pointing at VPS. Confirm that the hostname isn't already used elsewhere and enable trusted HTTPS with Nginx or your deployment manager.
4. Set \`PUBLIC_ORIGIN=https://leads.khoshvisa.ir\` (must exactly match browser origin). Reverse proxy should overwrite client-supplied \`X-Real-IP\`, set \`X-Forwarded-Proto\`, and forward only trusted headers. Protect the admin route further using VPN/IP allowlist when possible.
5. From \`lead-api/\`: \`npm ci\` (requires lockfile generation in a networked development environment), \`npm run check\`, \`npm test\`, \`npm run build\`. **If lockfile is absent, use \`npm install\` first, commit the lockfile and then deploy with \`npm ci\`.**
6. Apply migrations against the **new** database: \`npm run migrate\`.
7. Start with \`npm run start\` on private port 3084, or use the Next.js standalone output with server-supervised Node process. Test \`GET /api/health\` locally.
8. Register \`https://leads.khoshvisa.ir/api/whatsapp/webhook\` in Meta Developers, with \`META_VERIFY_TOKEN\` and the app's **messages** subscription. Server-only credentials: \`META_APP_SECRET\` and \`META_PHONE_NUMBER_ID\`.
9. Configure the verified business public WhatsApp number separately in Vercel using \`NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER\` and **redeploy static-site**. Confirm it matches the Meta business number.
10. Send a **real** message from a separate WhatsApp account. Confirm one and only one lead arrives; replay the same signed webhook and verify idempotency. Also verify cookie, stage updates, due dates and partner consent restrictions.

### Administrator password hash

Run \`node scripts/hash-password.mjs\` in a **private local terminal**, then store the generated scrypt value in \`ADMIN_PASSWORD_SCRYPT\`. Password minimum length 16. Store an independent cryptographically random \`SESSION_SECRET\` with at least 32 characters. No default admin credentials are shipped.

### Manual mode before Meta Cloud API

Use the real WhatsApp Business App to see incoming conversations. In \`/admin\`, manually create a lead only **after checking the actual chat**, checking the confirmation checkbox. It is marked \`whatsapp_manual\`; it is **not represented as a webhook-confirmed message**. This provides structured follow-up even while waiting for the Meta integration.

### Follow-ups and referrals

- **new** → **contacted** → **follow_up** (requires a due date) → **qualified**.
- To refer: inform the person which independent service provider would receive what data and for what purpose; obtain separate informed consent; enter provider name, agreed data scope and evidence of actual consent (e.g. consent message ID). Only after personally performing the permitted transfer may an operator confirm actual transfer and mark stage **referred**. There is **no automated partner forwarding**.
- Mark outcome \`converted\`/\`closed\` or \`invalid\`, as supported by real evidence.

### Retention

\`npm run retention:dry\` previews records in \`closed\` or \`invalid\` state older than \`RETENTION_DAYS\` (default 180 days). \`npm run retention:apply\` deletes only those eligible records. Do not schedule destructive retention until legal and backup review.

## Validation status

Unit tests for Meta signature, parsing, malformed payloads, phone-ID matching and data minimization are included. DB integration, actual WhatsApp delivery, HTTPS proxy, restore drills and admin UI browser QA must be tested **on a staging VPS database** before any production go-live. The user's live WhatsApp number and Meta credentials are not available; nothing is auto-activated without them.
