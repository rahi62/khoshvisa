# KhoshVisa — Static Experience

Premium Persian RTL tourism visa website, built with Next.js App Router and TypeScript. Public SEO pages are prerendered; CRM and webhook routes use hybrid Vercel serverless runtime.

## Deploy on Vercel
- Git branch: static
- Root Directory: static-site
- Framework: Next.js
- Build: npm run build
- Public content stays static; optional serverless CRM uses PostgreSQL. The WhatsApp consultation form runs fully in the visitor browser.

## Architecture
- 8 destination Money Pages and 13 editorial guides (3 original + 6 published in PR #24 + 4 staged in the next batch), destination search and region filters
- Mobile menu, mobile consultation/destination dock, responsive layouts
- Static metadata, canonical routes, robots.txt and sitemap.xml
- Official visa references and transparent no-guarantee disclosures

## Launch blockers
1. Replace externally hosted travel images with licensed optimized local assets.
2. Verify WhatsApp is active on the supplied response mobile +98 935 130 0502, and confirm the actual recipient after deployment. To override, set NEXT_PUBLIC_KHOSHVISA_WHATSAPP_NUMBER in Vercel and rebuild. The consultation form prepares the message locally and does not claim delivery; inbound CRM automation requires separate official Meta webhook setup.
3. Perform detailed competitor research and expand service content before expecting search rankings.
4. QA build, real devices, accessibility, Core Web Vitals, sitemap and indexing in Search Console.

Never represent visa approvals as guaranteed. Existing main branch and CMS remain untouched.

## Editorial source of truth
- Production branch: `static`; feature branches + explicit manager approval to merge.
- Content creation and post-edit QA: [SEO-TOPIC-CLUSTERS-2026-10-14.md](docs/SEO-TOPIC-CLUSTERS-2026-10-14.md) includes mandatory Google Top-10 organic research, gap analysis, original synthesis, fact-checking and humanization. If Google top-10 cannot be directly verified, do not mark the SERP audit as complete.
- Public [editorial policy](/editorial-policy/) should remain consistent with the editorial SOP.
