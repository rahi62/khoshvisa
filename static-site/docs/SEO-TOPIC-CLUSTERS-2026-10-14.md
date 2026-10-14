# KHOSHVISA — Topic Cluster Editorial Release (2026-10-14)

## Scope and publication policy
- Production branch: `static`; `main` stays unchanged.
- Six new informational guides in `/visa-guides/<slug>/`. All are data-backed **static Next.js pages**; they do not require a new CMS or database migration.
- Existing 8 Money Pages retain their URLs, canonical and intent. `/destinations/` is the discovery hub and `/schengen-visa/` is a sub-pillar for France, Germany and Italy.
- **Do not claim** GSC impressions, traffic, ranks, difficulty, search volume, successful visas, partnership, author qualifications or indexed status. These are candidate keywords and intent mappings based on qualitative SERP sampling and sources.
- References last reviewed 2026-10-14. Recheck highly volatile appointment/fee statements immediately before material site updates; do not change `dateModified` just to simulate freshness.

## Candidate primary intent and independent article boundaries

| Article | User's main problem | Money Pages (internal links) | Exclude to avoid cannibalization |
|---|---|---|---|
| `visa-proof-of-funds` | How do I substantiate financial capacity / transactions? | Schengen, Canada, UK, Australia | Don't present destination-specific full visa package or invent minimum amounts |
| `visa-without-travel-history` | Can a first-time international traveller apply? | Schengen, Canada, UK, Australia | Don't claim probability of approval or make up travel history |
| `visa-appointment` | Where/how to book a legitimate visa appointment? | Schengen, France, Germany, Italy (+ other destinations in comparison) | No live appointment/availability claim or automatic booking |
| `visa-document-translation` | Which translations and attestations are required? | UK, Canada, Australia, Japan | Not a duplicated universal checklist; country-specific rules govern |
| `visa-invitation-letter` | When does a real host letter/support matter? | Canada, UK, Schengen, Australia | No fake invitation service or guarantee |
| `single-vs-multiple-entry-visa` | Difference between entries, visa validity and stay? | Schengen, Canada, UK, Australia | No prediction of multiple-entry decision |

## Quality contract for each guide
1. Unique search intent, short answer in the server-rendered article, clear Persian H1/H2, scoped table of country differences when useful.
2. Original practical explanation, examples **marked hypothetical**, actions/checklists and distinct FAQs, not large-scale duplicated templating.
3. Source links next to relevant paragraphs and in reference list; date of editorial review and transparent organizational authorship.
4. Normal `Article` / `BreadcrumbList` / `WebPage` markup, never artificial `Review`, `Rating` or FAQ rich-result promises.
5. Relevant Money Page links in the article and selectively chosen reverse links from each Money Page. The articles do **not** all link to each other.
6. Keep identity as an independent informative/coordination platform; no claim to be an embassy, visa authority, partner agency, legal adviser or guaranteed outcome.

## SERP sampling caveat
Qualitative exploration of Persian-language search results showed that related articles exist for single/multiple-entry visas and visa finance. Some results made broad claims about approval chances, entry validity or paperwork. We prioritize official definitions and country-specific clarification instead. This was **not** an exhaustive SERP scrape or a validated volume/competition estimate.

## Primary references
- European Commission Schengen: https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en
- France-Visas Iran: https://france-visas.gouv.fr/en/iran
- Embassy of Italy 11 Aug 2026: https://ambteheran.esteri.it/it/news/dall_ambasciata/2026/08/lambasciata-ditalia-comunica-la-ripresa-delle-attivita-a-teheran-a-partire-dal-19-giugno-2026/
- GOV.UK supporting docs: https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents/guide-to-supporting-documents-visiting-the-uk
- GOV.UK visitor rules: https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-v-visitor
- IRCC eligibility: https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eligibility.html
- IRCC invitation: https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/letter-invitation.html
- IRCC single/multiple: https://www.ircc.canada.ca/english/helpcentre/answer.asp?qnum=417
- IRCC translation: https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/guide-5256-applying-visitor-visa-temporary-resident-visa.html
- Home Affairs offshore Visitor 600: https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas
- Japanese MOFA visa validity: https://www.mofa.go.jp/j_info/visit/visa/procedure/validity.html
- Embassy of Japan Iran: https://www.ir.emb-japan.go.jp/itpr_fa/visa.html

## Release QA and post-deploy review
- CI must pass `npm run test:crm`, `npx tsc --noEmit`, Next build, and generated HTML SEO tests.
- After a single manager-approved merge to `static`, verify all six 200 URLs, canonical, mobile text/RTL, 9 guide entries in sitemap, and critical first-party contact links. This should not create more PRs unnecessarily.
- GSC analysis is intentionally deferred until meaningful data exists. No index or performance claim at this early project stage.
