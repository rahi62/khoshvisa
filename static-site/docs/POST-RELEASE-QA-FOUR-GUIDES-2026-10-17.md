# KhoshVisa — Post-release QA on four visa guides (2026-10-17)

Scope: deployed `static` head `9dbf6f6aeca2b651b1b7016b3d335385ea56df47` and four new routes:
- `/visa-guides/visa-biometrics/`
- `/visa-guides/schengen-travel-insurance/`
- `/visa-guides/visa-flight-hotel-reservations/`
- `/visa-guides/visa-application-form-mistakes/`

## Findings

- Source checks: each of four has 10 distinct H2 sections, 7 FAQs, 4-step decision aid, 4 destination rows and 3–8 primary links, all section citations declared in source list. Metadata and schema produced by centralized article page component (`Article`, `WebPage`, `BreadcrumbList`, `canonical`, OpenGraph).
- Internal routing: all four guide URLs generated from `content.ts` by `generateStaticParams`; Sitemap uses that guide registry; `guide-cluster-links.ts` refers only to existing country/article slugs. Tested in green GitHub PR #26 CI for TypeScript and Next.js build.
- Responsive implementation: mobile RTL HTML root; CSS table container horizontal scroll; guide area becomes single column under 900px; decision aid collapses at 680px. Actual viewport visual QA remains unverified.
- Direct live access: site, individual pages, sitemap and robots unavailable in this session's remote web and DNS resolution environments. This limitation is NOT evidence of downtime or a failed deployment. Operator confirmed production deployment success.
- **Editorial source correction:** UK form-update paragraph previously relied on a VFS Global FAQ page that did not return verifiable content to the tool, and asserted unsupported specific pre-/post-biometric handling. Updated paragraph and comparison row to state accurately that after submitting a Standard Visitor application, applicants should contact UKVI; refund on cancellation only if UKVI has not begun processing. Source: https://www.gov.uk/standard-visitor/apply-standard-visitor-visa .
- Other primary government documents sampled: EU VIS (5 years), IRCC visitor biometrics validity (10 years), biometrics appointment and fees, Schengen insurance minimum EUR 30,000 and first trip for multiple entry (Visa Code Article 15), official UK guidance on low-value hotel/flight bookings, IRCC guidance for application errors, and Australian Home Affairs ImmiAccount incorrect answers.
- Direct 200/301/404 response and canonical rendering, third-party HTTP availability, mobile visual screenshots, interactive WhatsApp behavior, Lighthouse and accessibility tooling remain unverified, not passed.

## Release

This is a small, targeted editorial accuracy feature PR. The production `static` branch and `main` are unchanged. Merge only by owner approval; bundle with the next authorized release if reducing Vercel production builds is preferred.
