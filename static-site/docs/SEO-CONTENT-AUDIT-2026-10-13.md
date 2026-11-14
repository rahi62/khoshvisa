# KHOSHVISA — SEO & Editorial Audit
Date: 2026-10-13 | Repository: rahi62/khoshvisa | Target branch: static
Scope: 8 destination money pages + 3 visa guides. No ranking, conversion, click or indexing results are claimed.

## Method and limits
- Reviewed source on `static` (Next.js App Router, generated metadata, schema, sitemap, article structure, internal links and tests).
- Compared high-risk rules with primary sources on 2026-10-13: European Commission Schengen, GOV.UK fee table (8 October 2026), IRCC fees, Home Affairs Visitor 600, France-Visas Iran, Italy embassy August update and Japan embassy JVAC opening/fee pages.
- These are *editorial candidate queries*, **not** a GSC keyword dataset or quantitatively validated search volumes.
- Cannot independently confirm public khoshvisa.ir HTML/sitemap/HTTP status in the current web environment. GitHub CI is not a substitute for live crawling.
- No credentials to Search Console or live CWV field metrics were available for this audit.

## Editorial keyword and page-intent map
| Canonical path | Primary intent and candidate query | Supporting topics | Guardrail |
|---|---|---|---|
| /schengen-visa/ | ویزای شینگن برای ایرانیان | هزینه ۹۰ یورو، مدارک، مقصد اصلی، وقت | General Schengen hub; avoid duplicating specific French/German/Italian application processes |
| /canada-tourist-visa/ | ویزای توریستی کانادا | IRCC، تمکن، بیومتریک، هزینه | Do not promise approval or quote fixed processing times |
| /uk-tourist-visa/ | ویزای توریستی انگلیس | Standard Visitor، genuine visitor، ترجمه | Keep distinct from Schengen rules |
| /france-tourist-visa/ | ویزای فرانسه برای ایرانیان | France-Visas، وقت VFS تهران، کارمزد ۲۶٫۵۰ یورو | Source current VFS operation from France-Visas Iran |
| /germany-tourist-visa/ | ویزای آلمان برای ایرانیان | VIDEX، TLScontact، وضعیت پذیرش | Recheck operational status before publication/appointment claims |
| /italy-tourist-visa/ | ویزای ایتالیا برای ایرانیان | VisaMetric، ودیعه رزرو وقت، مدارک | Refundable deposit is not a visa fee |
| /japan-tourist-visa/ | ویزای ژاپن برای ایرانیان | JVAC تهران، مدارک، نرخ ریالی | VFS service charge is separate and JVAC does not decide visa outcome |
| /australia-tourist-visa/ | ویزای استرالیا Visitor 600 | ImmiAccount، بیومتریک، Tourist stream | Do not conflate offshore/onsite application streams |
| /visa-guides/visa-documents/ | مدارک ویزای توریستی | مالی، شغلی، ترجمه، مقصدها | Cross-country checklist only; destination pages own specific rules |
| /visa-guides/visa-rejection/ | ریجکتی ویزا | اعتراض، درخواست مجدد، پاسخ نامه تصمیم | No generic appeal deadline or guarantee; legal advice requires licensed professional |
| /visa-guides/visa-fees/ | هزینه ویزای توریستی | government fees, biometric, centre services | Time-stamp all fees; never merge mandatory and optional costs |

## Findings and work included in this PR
1. All eight country pages had largely formulaic title/description metadata. Add individual editorial metadata matched to destination query intent; keep URL and canonical fixed.
2. Country pages had a long introduction but no concise country-specific, directly attributable answer. Add a unique short answer in visible HTML with a primary-source link; no new FAQPage markup or speculative star ratings.
3. Fees guide did not contain the verified France-Visas Tehran VFS €26.50 service fee in its France comparison, and the mandatory Japanese JVAC service charge was not clear. Correct both with primary links; do not invent JVAC amount.
4. Strengthen Organization authorship link to the real /about/ page for educational Article schema, with no invented individual expert profile.
5. Add post-build country-content assertions to catch lost answer boxes and missing WebPage/BreadcrumbList/canonical.

## Remaining QA (do not claim done)
- GSC: submit/cross-check sitemap; inspect selected canonical and indexed status of all 11 URLs; Performance report needs actual impressions/queries before prioritizing new supporting pages.
- Live QA: actual HTTP 200/301/404, redirect chains, rendered title, meta, JSON-LD, and loadable references.
- CWV: mobile LCP/INP/CLS using PageSpeed Insights / Chrome UX Report when field data exists; independently measure external Unsplash hero and WebGL motion impact.
- Evidence: business legal identity, editorial reviewer credentials if verifiable, accessibility/manual mobile verification and permission to use external imagery.
- Refresh policy: review official fee/visa-centre pages as they change and update affected paragraph, reviewed date, and sitemap lastmod only after real significant changes.
- No unverified testimonial, approval count, misleading embassy affiliation, or percentage of success should be published.

## Official references checked
- https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en
- https://www.gov.uk/government/publications/visa-regulations-revised-table/home-office-immigration-and-nationality-fees-8-october-2026
- https://www.ircc.canada.ca/english/information/fees/fees.asp
- https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas
- https://france-visas.gouv.fr/en/iran
- https://www.ir.emb-japan.go.jp/itpr_fa/visa.html
- https://www.ir.emb-japan.go.jp/itpr_ja/11_000001_01140.html
- https://ambteheran.esteri.it/it/news/dall_ambasciata/2026/08/lambasciata-ditalia-comunica-la-ripresa-delle-attivita-a-teheran-a-partire-dal-19-giugno-2026/
