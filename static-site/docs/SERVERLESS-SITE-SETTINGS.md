# KhoshVisa — site settings on Next.js / Vercel

Target branch: static. Implementation branch: feature/site-settings-serverless-20261013.

## Scope

Only public site settings are editable via /admin/settings (brand, logo URLs, contact,
WhatsApp opt-in, footer, social links, future SEO defaults). Django is not used.

No separate CMS or content tables are introduced. Existing visa guides, sitemap and
SEO metadata remain static; **site-wide SEO defaults are stored for later use and
do not silently override published page-level metadata**.

## Environment (server only)

- DATABASE_URL: dedicated PostgreSQL on Coolify; never expose as NEXT_PUBLIC_.
- PG_TLS_CA_PEM: verified CA certificate for non-public/trusted TLS path as needed.
- ADMIN_EMAIL, ADMIN_PASSWORD_SCRYPT, SESSION_SECRET, PUBLIC_ORIGIN: existing login variables.
- Vercel serverless cannot access Coolify's private container hostname. Establish a
  vetted secure network path with verified PostgreSQL TLS, least-privilege credentials
  and restrictive firewall / Vercel egress allowlisting or private networking first.
- Do not print or paste the database password into code, git, logs or chat.

## Before rollout

1. Back up the database and verify recovery procedures.
2. Run **only** site settings migrations from a trusted host that can reach the DB:
   cd static-site && npm run db:settings:migrate
   (NOT npm run db:migrate, which applies the existing CRM migrations.)
3. This creates site_settings, site_settings_audit, admin_login_attempts and
   site_settings_schema_migrations, without creating leads/CRM tables.
4. Configure secure DATABASE_URL for Vercel serverless and the existing admin secrets.
5. Confirm /admin/login?next=/admin/settings authenticates and opens /admin/settings.
6. Save a phone change and verify /contact server HTML and the footer after hydration.
7. Confirm /api/public/site-settings returns only allowed public fields with no-store,
   and returns 503 if the DB cannot be reached (no fake success).
8. Confirm WhatsApp remains disabled until a separately verified business recipient
   is configured and enabled. The WhatsApp form now reads this public runtime setting.
   Enabling the link does not configure the Meta webhook.
9. Verify static destination/guide pages, sitemap, canonical and SEO still prerender.
10. Test scripts: npm run test:crm, npx tsc --noEmit, npm run build.

## Security

Admin POST checks session and exact Origin, validates each field, uses parametrized
SQL inside a transaction with row locking + optimistic version, and audits changes.
Public API never exposes admin secrets or audit log. HTTPS-only external URLs.
Existing admin login rate limiting works without CRM migrations.

## Caveats

- Existing /admin dashboard is CRM and expects the separate leads migration;
  use /admin/login?next=/admin/settings when only site settings are deployed.
- The footer is a client-side enhancement to keep static visa pages static, so
  first HTML response contains previously confirmed default contact details.
  Contact page /contact is dynamic SSR and shows latest database settings.
- Uploaded media are not stored in PostgreSQL; logo/favicon fields accept HTTPS URLs.
- PR #16/#17 modify overlapping settings/contact files. Do not merge those PRs
  together with this branch without an explicit reconciliation review.
