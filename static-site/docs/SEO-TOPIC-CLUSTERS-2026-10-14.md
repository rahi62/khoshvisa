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

## Mandatory 10-SERP-Link Read, Gap Analysis, Original Synthesis and Humanize (2026-10-14)

**Goal:** Study around ten relevant, discoverable organic-result pages **as actual competing content** for each primary Persian search intent. This is not a requirement to buy a ranking API or capture absolute Google positions 1–10. Ranking can vary by location, personalization and date.

**Method:**
1. Record the Persian focus query, related user questions, Iran-specific audience, intended Money Page and date of research.
2. Search for the query (and close variants) and collect **ten useful SERP URLs**. Prefer original organic articles/pages, not ads, duplicate syndication, forum noise, unrelated jurisdictions or sponsored placements. Record URL and topical relevance; exact rank is optional, never invented.
3. **Open and read each page** when accessible. Examine its body copy, headings, supporting examples, comparison tables, FAQ, UX, source quality, revision date where visible, and how closely it answers the searcher's question. Search-result snippets alone are insufficient to assert that a page was fully read. If loading fails, explicitly mark that URL as `not opened — indexed excerpt only` and do not count it as a complete body review; fetch again in a working browser before claiming a complete ten-page reading.
4. Make a *gap table*: which problems recur, which questions remain unanswered, what is copied or generic across competitors, which country-specific rules have been generalized incorrectly, and which practical aids a Persian-speaking traveller really needs.
5. Combine **useful topics and confirmed facts**, not rivals' words, distinctive structures, individual examples or imagery. Independently check immigration rules, fees, document requirements and processes against current primary government sources. Treat rivals as research subjects, never legal authorities.
6. Write an original article that solves more of the user's concrete problems than typical alternatives: clear answer at the top, coherent H2 order, verified country differences, scenario walkthroughs, realistic decision paths, frequently misunderstood edge cases, internal links to fitting Money Pages, and honest limitations.
7. **Humanize:** choose fluent, varied Persian instead of robotic filler; shorten overlong sentences, explain jargon, include Iran-relevant but unmistakably hypothetical scenarios, minimize repeated stock disclaimers, avoid exaggerated SEO phrases, and never claim invented personal experience or qualifications.
8. Verify source and factual consistency, unique intent to prevent cannibalization, accessible server-rendered content, responsive RTL, Article/WebPage/Breadcrumb metadata and relevant contextual links; run TypeScript + build + HTML assertions.
9. Release report distinguishes `full body opened/read`, `indexed body excerpt examined`, and `not accessible`. Do not equate search-index excerpts with full webpage review, or pretend any article is provably "the best" on Google.

**Editorial gate:** Before calling the ten-page competitor *review completed*, the actual page bodies must be accessed. If a source cannot be fetched, replace it with another relevant page or mark the review incomplete. This limitation does not prevent describing truthful partial work or preserving changes on a feature branch for subsequent QA.

Checklist: Is the answer directly useful to an Iranian applicant? Is every heading purposeful? Are figures and dates sourced? Are country rules distinguished? Is there at least one concrete insight absent or poorly explained in comparison sources? Are links descriptive and context-based? Does it sound like original Persian written for a person rather than a search engine?
