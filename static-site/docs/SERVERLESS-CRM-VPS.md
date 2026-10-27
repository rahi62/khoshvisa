# KhoshVisa — Vercel Next.js Admin + VPS PostgreSQL

**Architecture:** One public Next.js App Router app in \`static-site/\` deployed as a **hybrid** Vercel project. Prerendered visa/money pages remain SEO-friendly. \`/admin\`, session/authenticated routes and \`/api\` are Vercel Node.js Functions. PostgreSQL is hosted **only** on the owner's self-managed Coolify/VPS, in a separate database.

## Public URLs

- Website: \`https://khoshvisa.ir/\`
- Admin sign-in: \`https://khoshvisa.ir/admin/login\`
- Admin dashboard: \`https://khoshvisa.ir/admin\`
- WhatsApp Meta webhook: \`https://khoshvisa.ir/api/whatsapp/webhook\`
- Database check: \`https://khoshvisa.ir/api/health\` (returns 503 until DB is configured).

**There is no backend subdomain** and no second Next.js service on the VPS in this architecture. The previous standalone \`lead-api/\` PR is superseded and should never be merged together with this one.

## Why Vercel Functions + a VPS database needs network planning

Vercel functions do not run on your VPS. A PostgreSQL container listening on the VPS localhost/private Docker network cannot be reached directly from a Vercel function. A functional and safe connection requires all of:

1. Dedicated PostgreSQL database and least-privilege \`khoshvisa_leads\` role (not Cafino's or any other project's database).
2. A **restricted** routable network path between Vercel and PostgreSQL; **do not publish 5432 to arbitrary internet clients**.
3. PostgreSQL TLS with *verified server certificate*, matching DNS hostname and optional CA trust supplied via Vercel secret \`PG_TLS_CA_PEM\`.
4. A way to restrict inbound source traffic — for example **Vercel Static IPs** with VPS firewall allowlist or Vercel Secure Compute if eligible. Vercel's ordinary outbound IP addresses are dynamic; they cannot safely be assumed as a stable single-IP allowlist.
5. PostgreSQL connection limits / pooling (e.g. PgBouncer on the VPS) suitable for ephemeral function scaling. Our per-instance \`pg\` Pool is bounded to 2 connections, but aggregate serverless concurrency still needs a global limit.

If you do not have eligible static egress/private connectivity, keep PostgreSQL isolated on the VPS and put a small, authenticated **HTTPS data gateway** beside it. In that case Vercel Functions call the HTTPS gateway (not the PostgreSQL TCP port), and the gateway uses a private DB connection. **That gateway is an alternative that requires separate implementation**, not something already enabled by this PR.

## Coolify database: your action

1. Create a PostgreSQL 15/16+ instance in Coolify; use a named volume/backups, dedicated database \`khoshvisa_leads\`, and app user.
2. Store the app user's password in Coolify; never commit it and never place it under a \`NEXT_PUBLIC_\` prefix.
3. Do **not** deploy the database with a public Docker port mapping unless the TLS + firewall network plan above is prepared and verified.
4. Load \`static-site/db/migrations/0001_initial.sql\` into the dedicated database from its **private** network/admin console, or run \`node scripts/migrate-leads.mjs\` in a secure operator environment where \`DATABASE_URL\` reaches the database. No migration is run automatically on a Vercel build.
5. Set encrypted/regular backups with retention, and verify restoration before production.
6. Keep staging/test and production databases separate.

## Vercel change: public site stays on same domain

On the existing Vercel Project:

- Root Directory: \`static-site\`
- Framework: Next.js
- Build Command: \`npm run build\`
- Output Directory: use **Next.js default**, NOT \`out\`. Remove any custom static-export output override.
- This branch removes \`output:'export'\` from \`next.config.mjs\`; all required dynamic routes become server-side Functions.
- Public SEO routes continue to prerender at build time; the postbuild smoke test checks that they didn't disappear.
- Set \`PUBLIC_ORIGIN=https://khoshvisa.ir\` and the server-only environment variables in \`.env.example\`. DO NOT enter an example password or database URL as live values.
- Set strong \`ADMIN_EMAIL\`, \`ADMIN_PASSWORD_SCRYPT\`, \`SESSION_SECRET\` secrets; the Scrypt hash is generated with \`node scripts/hash-admin-password.mjs\` in a private terminal.
- Set the already-confirmed public business WhatsApp number as \`NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER\` in Vercel; this requires a redeploy because public values are baked at build time.
- Vercel Functions must be configured for a compatible Node runtime and region suitable to your VPS network. Do not enable caching of \`/admin\` responses.

## WhatsApp/lead behavior

1. A visitor initiates a contact via \`khoshvisa.ir/consultation\`, consents, and deliberately sends the message in WhatsApp.
2. Opening a WhatsApp tab **is not** a successful lead. A real incoming message via Meta's WhatsApp Business Cloud API \`messages\` webhook is required to create an automatic lead.
3. The Vercel handler validates the HMAC-SHA256 signature from Meta, checks the expected phone-number ID, deduplicates repeated message IDs, and saves minimal fields to private PostgreSQL. No full messages/media/passport scans are stored.
4. If you use only the WhatsApp Business App, manual intake via \`/admin\` is supported after confirming a real chat. No Cloud API means no automatic intake.
5. Admin login uses HMAC-signed HttpOnly eight-hour cookies, verified POST Origin and database-backed login throttling. A compromised browser session remains valid for up to its 8-hour expiry; use device protection and avoid shared computers.
6. Managers can log contact stages, due-date follow-ups, actual referrals and evidence of **separate informed consent** before data is transferred to an independent provider. The site **never auto-forwards** the lead data to that provider.
7. No public identity/commission details need be described in marketing copy; however, a person's personal data cannot be passed to an independent provider without appropriate prior disclosure/permission.

## Migrations and testing

From \`static-site/\`:

\`\`\`bash
npm install
npm run test:crm
npx tsc --noEmit
npm run build
# Operator environment with private DB access:
npm run db:migrate
\`\`\`

Build success alone does NOT confirm live PostgreSQL connectivity. Do staging tests with a real database, HTTPS/TLS and firewall verification. Test admin login, invalid Origin, session timeout, staged lead capture, replayed Meta message deduplication, and consent gating.

## Production acceptance gates

- [ ] Hybrid Next.js Build and smoke test success on Vercel
- [ ] Clean production hostname stays \`khoshvisa.ir\`, not another subdomain
- [ ] Static visa pages remain indexed and have unchanged Canonical and sitemap URLs
- [ ] Dedicated PostgreSQL instance and backup restore verified
- [ ] Restricted network path and full TLS certificate verification
- [ ] Runtime Vercel server-only secrets configured, with no database password in client bundles
- [ ] Manual lead CRUD/status and follow-up end-to-end QA against staging
- [ ] Meta webhook HMAC, duplicate handling and source ID matching verified with actual WhatsApp Business Platform
- [ ] No automatic third-party data forwarding; informed-consent evidence recorded

**Until these checks pass, PR stays unmerged and no one should call this a live CRM.**
