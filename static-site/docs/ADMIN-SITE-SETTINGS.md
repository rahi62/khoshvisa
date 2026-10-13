# KhoshVisa — Admin contact settings

Scope: staff-editable public customer-service numbers only. The WhatsApp Business recipient number remains the independently configured `NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER` setting. Neither phone entry is automatically treated as a WhatsApp Business account.

## Deployment and migration

- Deploy this change only after `static-site/db/migrations/0002_contact_settings.sql` has been applied to the dedicated PostgreSQL database using `npm run db:migrate`.
- The migration seeds support numbers `09351300502` and `02146010788` once, without overwriting subsequent edits.
- Log in to `/admin` and follow **شماره‌های پاسخگویی** to `/admin/settings`.
- Admin POST requires a valid session, matching Origin, strict phone validation, optimistic version check, parameterized SQL, and an audit record for modified numbers.
- `/contact` renders updated numbers on the server. It is a dynamic SSR page; other public SEO/pillar guides stay prerendered.
- If settings storage is unreachable, the public contact page falls back to the confirmed initial numbers. The admin page shows a warning and disables saving instead of displaying a false success.

## Acceptance checklist

- [ ] Database migration run, backup confirmed, and admin settings reachable
- [ ] Persian/Arabic and international forms normalized correctly
- [ ] Bad inputs and stale edit versions rejected
- [ ] Existing login/session/Origin protection continues to work
- [ ] Public /contact shows correct mobile/landline on first server response
- [ ] Public SEO pages and canonical/sitemap routes remain unchanged
- [ ] WhatsApp number not modified by editing phone settings
- [ ] Changes audited; failed requests do not claim success
