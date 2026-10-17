# KhoshVisa — Sequential competitor audit S01: Schengen main destination (2026-10-17)

**Article:** `/visa-guides/schengen-main-destination/`  
**Status:** PARTIAL_COMPETITOR_AUDIT; **full-body audit target not met.**  
**Primary official rule:** Visa Code Article 5(1), https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX%3A02009R0810-20240611

## Ten competitor URLs actively opened in this pass

| URL | Direct open result | Notes |
|---|---|---|
| https://switzerlandvisacenter.ir/main-destination-vs-first-entry | INDEXED_ONLY — open cache miss | Search text covers main destination vs first entry; complete body unavailable |
| https://switzerlandvisacenter.ir/equal-stay-schengen-country-rule | INDEXED_ONLY — open cache miss | Equal-stay case; cannot claim complete review |
| https://www.europevisacentre.co.uk/blog/which-consulate-should-you-apply-to | INDEXED_ONLY — open cache miss | Clear decision hierarchy in search extract; body unavailable |
| https://germanyvisacenter.ir/main-destination-germany-schengen-visa | INDEXED_ONLY — open cache miss | Simplifies equal-stay first entry; check purpose nuance |
| https://schengenvisapro.com/first-entry-rules | FULL_BODY | Opened main guide text and worked examples; oversimplifies equal stay without considering dominant purpose, and loosely claims changing destination post-issue is always allowed |
| https://spainvisacenter.ir/first-entry-rule-spain | INDEXED_ONLY — open cache miss | Focus on entry flexibility |
| https://germanyvisacenter.ir/main-schengen-destination-germany-france | INDEXED_ONLY — open cache miss | Competitor for Germany/France itinerary |
| https://schengenstatus.in/guides/schengen-first-entry-vs-main-destination/ | INDEXED_ONLY — open cache miss | More nuanced search extract, body unavailable |
| https://afghanschengen.ir/schengen-entry-country-vs-main-destination | INDEXED_ONLY — open cache miss | Focus on Afghan applicants; not perfectly aligned to Iran |
| https://visaassess.com/blog/schengen-which-consulate/ | INDEXED_ONLY — open cache miss | Search text understands purpose vs duration, body unavailable |

**Verified count for this batch: 10 attempted, 1 full-body opened, 9 indexed-only.** Sites do not necessarily represent ten independent publishers: multiple domain names can be operationally related and should not be assumed independent without evidence. Earlier full-body checks on Visaland Schengen pages are separate historical records, not recounted here.

## Verified gap and improvement
Visa Code Article 5 says: sole destination, then principal destination according to days **or purpose**, and first external crossing only when no principal destination can be identified. Competitor `Schengen Visa Pro` presents equal nights => first entry automatically, without qualifying purpose. This can confuse Iranian travelers with important events in one country and equal-length stays.

**Applied humanized correction in PR #29:** replaced generic equal-stay statement with a concrete hypothetical four days in Germany / four days in France, where an independently documented family event makes purpose material, explicitly cautioning against an automatic first-entry decision. No case outcome is guaranteed; actual consular judgment depends on records. Commit `95c2293fe2921e3f5f99267c5d620bc6c08d2a2d`.

## Remaining requirements
- Find further independent, *actually readable* competitor bodies to reach approximately ten per topic.
- Audit every target page's headings/FAQ/examples/UX/CTA and real deficiencies, not just snippets.
- Run CI on the correction commit, then check rendered HTML, mobile and actual CTA before marking publish-ready.
- Keep PR #29 Draft; no merge to production.
