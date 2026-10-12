# Deployment plan — KhoshVisa Next.js API on own VPS

Precondition: the owner will provision a dedicated PostgreSQL database. Do not provision against the production DB of any other app.

## Topology

\`\`\`
khoshvisa.ir (Vercel, Next.js static export; SEO)
       ↓ user opens wa.me and presses Send
WhatsApp Business Platform
       ↓ signed HTTPS events (only if Meta Cloud API is connected)
leads.khoshvisa.ir (VPS, Next.js API + protected admin; Node port 3084)
       ↓ private loopback/VPS network
PostgreSQL / khoshvisa_leads (not publicly exposed)
\`\`\`

The domain \`leads.khoshvisa.ir\` is a **proposal**, not a configured DNS record. Confirm hostname, available port, and whether Coolify or systemd is the approved deployment target before creating DNS/proxy resources. Avoid changing the existing \`api.khoshvisa.ir\` or any other project's routing unless its current use has been verified.

## Database

Prefer an independently managed dedicated PostgreSQL resource/role with least privileges. Verify Pg version supports \`gen_random_uuid()\` (PostgreSQL 13+). Bind loopback or a private network and restrict pg_hba. If DB runs separately over the network, require TLS with certificate verification.

Before first migration:

- Make a database backup / restore test plan, even if fresh.
- Store DATABASE_URL in the service's runtime-only environment.
- Apply \`npm run migrate\` after explicit go-live approval; migrations use a database advisory lock and a \`schema_migrations\` ledger.

## Process manager

Use an isolated Coolify Node service with base directory \`lead-api\` **or** a locked-down systemd user. Never deploy the Next API into the Vercel static export app. If using systemd, keep secrets in an OS-protected EnvironmentFile and do not run as root. Set restart-on-failure and a real Node runtime health check.

Suggested endpoint checks: \`GET /api/health\` (DB connectivity 200/503) and \`GET /admin/login\` (HTML rendered). \`POST /api/whatsapp/webhook\` without an HMAC must return 403 after Meta credentials are configured.

## Admin account and firewall

- Configure ADMIN_EMAIL, scrypt-hashed ADMIN_PASSWORD_SCRYPT and random SESSION_SECRET.
- Configure \`PUBLIC_ORIGIN\` with the **exact HTTPS origin**.
- Reverse proxy must strip untrusted forwarding headers, set trusted \`X-Real-IP\`, \`X-Forwarded-Proto\`, forward real host and serve valid TLS.
- If feasible, protect \`/admin/\` with VPN/access policy or IP allow-list. Meta must access \`/api/whatsapp/webhook\` publicly; don't block it with the admin-only policy.
- Strict HttpOnly cookies and origin validation guard browser mutations. Admin credentials are not sent to Vercel.
- Don't expose port 3084 or database port 5432 directly to the public network.

## WhatsApp

- Frontend public number configured separately in Vercel.
- For **automatic intake**: Meta Business Platform App Secret, callback verify token, phone-number ID configured server-side; subscribe to \`messages\`.
- For **manual intake**, staff verify that a real WhatsApp Business App message was received, then manually add the lead in /admin. Backend runs even without Meta secret, but POST webhook returns 503 until configured. The contact website button remains disabled until a verified WhatsApp number is supplied.

## Consent

Sending a message to KhoshVisa permits communication with KhoshVisa; it is not sufficient for data transfer to a separate provider. Obtain separate consent naming the recipient, purpose and scope before sharing, record evidence and actual transmission. Partner referral is **manual** and not automated.

## Final acceptance gate

1. Next.js \`npm run check && npm test && npm run build\` succeeds in deployment environment.
2. PostgreSQL migration, rollback-from-backup and health test pass in staging.
3. Admin login, brute-force throttling, session expiry and CSRF tests pass through HTTPS proxy.
4. Manual lead intake, due-date status, recorded consent and block-on-no-consent behavior pass.
5. A signed live Meta webhook creates exactly one inbound lead, duplicate delivery does not increment count, invalid signature rejects.
6. Test all three areas: mobile wa.me, static site consent text, and manager's lead dashboard.
7. Only then enable production traffic and declare automated WhatsApp capture functional.

## Deletion requests

\`node scripts/erase-lead.mjs --id <uuid>\` previews a lead; \`--apply\` removes local DB data following verified identity and legal review. Downstream providers must separately honor any applicable data requests; local deletion does not retract previously delivered messages.
