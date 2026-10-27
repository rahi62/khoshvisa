# SEO V2 consolidated audit — six remaining guides — 2026-10-18

## Scope and honest evidence classification
The owner instructed that all 10 guides be processed without between-article approvals, but all changes should stay on one shared branch and deploy once. This pass improves guide S05–S10. **It is NOT true that ten exact Google Iran organic positions have been captured and all competitor bodies read for these six guides.** Search queries were run for all six; the retriever returned a strong proportion of government sources and duplicates, especially IRCC and Australian Home Affairs. No fabricated competitor slots, ranks, or quotations.

| Guide | Query sampled | Source checking and observed content gap | Applied change |
|---|---|---|---|
| S05 Germany VIDEX | `آموزش فرم ویدکس آلمان videx ویزای شینگن TLScontact` | Schengen C vs National D VIDEX confusion is material. Official TLS Iran procedure and Foreign Office VIDEX form control the answer. Prior S05 report already noted commercial D visa tutorials. | Distinguish correct Schengen VIDEX in intro; commit `1b198b5` |
| S06 Canada IRCC | `آموزش IRCC Portal کانادا GCKey نسخه جدید ویزای توریستی` | IRCC lists **three** visitor visa account pathways (secure/GCKey, Portal, Portal–New version). https://www.canada.ca/en/immigration-refugees-citizenship/services/application/ircc-accounts.html ; restriction on Portal New version https://www.canada.ca/en/immigration-refugees-citizenship/services/application/online-account.html | Clarify three-account split in introduction; commit `4c2a55e` |
| S07 UK Standard Visitor | `آموزش فرم ویزای توریستی انگلیس UKVI استاندارد visitor` | Online form is distinct from identity/VAC and decision; digital eVisa account journey should not be generalized as physical sticker pickup. Refer to https://www.gov.uk/standard-visitor/apply-standard-visitor-visa. | Clarified step separation and possible digital result; commit `efb97ce` |
| S08 Italy VisaMetric | `وقت سفارت ایتالیا ویزامتریک ودیعه نوبت ۱۴۰۵` | Up-front refundable-condition appointment deposit must not be confused with government visa fee, VFS/VisaMetric service fee or guaranteed appointment. Check https://www.visametric.com/iran/Italy/en/p/book-an-appointment on action date. | Clarified deposit is not purchased confirmed slot; commit `f47bb71` |
| S09 Australia Visitor 600 offshore | `ویزای توریستی استرالیا 600 خارج از استرالیا مدارک` | Official Home Affairs page explains ImmiAccount, linked family submissions, and fee-before-processing. https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas | Added actual digital submission and payment ordering; commit `7be51c7` |
| S10 freelancer/self-employed | `ویزای توریستی فریلنسر خوداشتغال مدارک ویزا` | No universal freelance traveller evidence checklist across jurisdictions. UK visitor supporting docs suggests business registration/recent invoices, German Iran checklist differs. https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents/guide-to-supporting-documents-visiting-the-uk | Clarified real funds chain, country-specific evidence; commit `7e78214` |

## Quality gate
- S01–S04 had dedicated V2 SERP/provider reports. S05–S10 had prior V1 competitor/source reports; in this pass these were **targeted re-audits**, not full live first-page Google competitor audits.
- No assertion that each of ten guides is comprehensively superior to every Google first-page rival. Quality changes are evidence-based small corrections; not padding for article length.
- Pending: site visual/mobile/browser QA, outbound live-link validator, and CI for final HEAD.
- One shared branch `content/seo-v2-ten-guides-20261018`, PR #30 to `static`, no merge or deploy without final consolidated quality decision.
