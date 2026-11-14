# KhoshVisa — PR #29 ten-guide cross-cutting QA checkpoint (2026-10-17)

**Scope:** all ten changed guide modules in `static-site/lib/visa-cluster-*.ts`; shared dynamic article renderer; curated Money Page crosslinks; recent 8-guide official-source corrections. **Status: TECHNICAL_CI_PASS / SOURCE_SPOT_CHECKED / SERP_FULL_AUDIT_INCOMPLETE / NOT_RELEASE_SIGNED_OFF.**

## CI evidence
GitHub Actions **KhoshVisa Hybrid Next QA**, run **39022597640**, commit `b2d3ab76068df9781261481cce44bfbb51a2edf7`, completed **success**: Install, WhatsApp parser/HMAC tests, Typecheck, Next Build. This is a build check, *not* a screenshot/mobile/complete external-link audit.

## All ten guide source structure review

| Slug | Main sections | FAQ items | Section citation lists | Contextual links |
|---|---:|---:|---:|---:|
| schengen-main-destination | 12 | 6 | 12 | 1 |
| schengen-90-180-day-rule | 12 | 6 | 12 | 1 |
| japan-jvac-iran-process | 13 | 6 | 13 | 1 |
| france-visas-iran-application | 14 | 6 | 14 | 1 |
| germany-videx-form-guide | 12 | 6 | 12 | 1 |
| canada-ircc-portal-guide | 13 | 6 | 13 | 1 |
| uk-standard-visitor-online-application | 13 | 6 | 13 | 1 |
| italy-visametric-iran-appointment | 13 | 6 | 13 | 1 |
| australia-visitor-600-offshore-guide | 13 | 6 | 13 | 1 |
| freelancer-self-employed-tourist-visa | 13 | 6 | 13 | 1 |

Every module declares a dedicated intro, meta description, updatedISO, decision aid and FAQ. This confirms *structure*, not full correctness or independent competitor analysis.

## Shared rendering / discoverability
- `app/visa-guides/[slug]/page.tsx`: static params, unique guide title/description, canonical URL, OpenGraph, Twitter, exactly one article H1 in expanded branch; JSON-LD graph `BreadcrumbList`, `WebPage`, `Article`, organizational author/publisher, source citations and `dateModified`. Validity of deployed markup and rich result eligibility was not externally tested.
- `guide-cluster-links.ts` maps the new guide clusters from the eight Money Pages and older related guides. The separate target-specific contextualLinks are sparse (one per new article), so inline semantic linking should be expanded where editorially justified; avoid sitewide uniform link stuffing.
- Editorial UX concern: all ten modules follow an almost identical number of sections, exactly six FAQs and a four-step decision aid. The topics do differ, but this mechanical layout risks formulaic presentation. Favor purpose-built examples and decision tables rather than repeated blocks.
- Metadata/sitemap compile paths successfully within CI; public live canonical/indexability status must still be verified separately.

## Research observations and evidence limits
- A real independently accessible competitor page **Visaland Japan Embassy** (`https://visaland.org/japan-embassy/`) simultaneously carries updated JVAC instructions (2026-08-16) and a stale statement saying all applications are still accepted directly at the embassy. **Content gap:** articulate the dated change unambiguously and anchor it to Embassy of Japan.
- Visaland Schengen pages mention 90/180 and multiple-entry, but the visible explanations can oversimplify day-count and visa-sticker terms. An audit of specific passages cannot be extrapolated to ten competitors for each query.
- Official rechecks: France-Visas Iran `https://www.france-visas.gouv.fr/iran` (VFS appointment and application separation, at least 15 days planning, up to six months); IRCC `https://www.canada.ca/en/immigration-refugees-citizenship/services/application/online-account.html` (four eligibility conditions for Portal–New version); Australian Home Affairs offshore `https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas` (must be outside at application and decision, individual family application, no work); TLScontact `https://visas-de.tlscontact.com/en-us/country/ir/vac/ir/application-process` (separate VIDEX and TLS workflow).
- **Not demonstrated:** 10 fully accessible independent competitor bodies per topic (100 reviews), quantitative keyword volume, all official URL responses, complete factual check of every paragraph, live rendered mobile, GA/GSC improvements or indexation.
- Record competitor audits as FULL_READ only when the actual article body opens, INDEXED_ONLY for search summaries, UNAVAILABLE otherwise. Do not claim 100 full reads from lists or snippets.

## Release decisions
1. **Pass**: source existence, high-level structured SEO, CI TypeScript + build, 8 targeted official-rule corrections.
2. **Conditional**: humanized flow, citations relevance to each claim, country-specific operational dates, linking improvements and topical uniqueness.
3. **Block**: the project's explicitly required complete independent SERP full-read evidence per article and production-like accessibility/mobile/source-link verification.
4. PR #29 remains **Draft**, not merged to `static`; `main` remains untouched. Do not conflate a successful CI build with editorial publication readiness.
