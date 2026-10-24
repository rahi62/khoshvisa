# KhoshVisa — 8-guide editorial / official-source audit | 2026-10-17

Branch: `content/ten-guide-release-20261017` | PR #29 | Status: **SOURCE-REVIEWED / SOURCE-CORRECTIONS COMMITTED / RELEASE QA INCOMPLETE**.

## Audit and committed content corrections

| Slug | Primary-source comparison | Correction committed | Remaining release gate |
|---|---|---|---|
| japan-jvac-iran-process | Embassy of Japan Tehran official JVAC notice dated 2026-08-03 | Walk-in availability, official Heravi Centre floor 5, submission hours 08:00–15:00 and mandatory distinct JVAC fee; no JVAC decision authority | Check latest VFS operational notices and all article source links |
| france-visas-iran-application | France-Visas Iran country page and VFS current listing | Removed inaccurate notice alleging France-Visas still showed a different address; confirms Heravi Centre floor 4 and links to live official verification | Recheck the full body for contradictory old-address references and application-time windows |
| germany-videx-form-guide | TLScontact official Iran application procedure | Clearly distinguishes applicant's VIDEX signature from eligible representative document submission; correct VIDEX and appointment separation | Check exceptions and current appointment mechanics |
| canada-ircc-portal-guide | IRCC visitor visa portals and New version eligibility | Added all four IRCC New-version criteria; no visitor approval guarantee | Recheck BIL, translation and account-specific steps |
| uk-standard-visitor-online-application | GOV.UK application process and supporting documents | Clarified post-submission change/cancel, passport validity, and possibility of eVisa | Check latest form-specific electronic visa instructions |
| italy-visametric-iran-appointment | VisaMetric Italy Iran official appointment page | Distinguished refundable 50m IRR reservation fee from visa fees; clarified no-show, post-allocation cancellation and bank restrictions | Reconfirm payment instructions on publication day |
| australia-visitor-600-offshore-guide | Home Affairs official subclass 600 Tourist offshore | Clarified outside-Australia at application and decision, prohibition on work, case-specific stay and individual family applications | Check latest fees, biometrics and process |
| freelancer-self-employed-tourist-visa | GOV.UK supporting documents, EC Schengen, IRCC and Home Affairs visitor requirements | Makes income-document examples non-universal, and states tourist status does not automatically authorise paid/remote work | Apply destination-specific permitted-activity caveats to each jurisdiction |

## Source URLs used for substantive checks
- Japan: https://www.ir.emb-japan.go.jp/itpr_ja/11_000001_01140.html
- France: https://france-visas.gouv.fr/en/web/france-visas/iran
- Germany: https://visas-de.tlscontact.com/en-us/country/ir/vac/ir/application-process
- Canada: https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html and https://www.canada.ca/en/immigration-refugees-citizenship/services/application/online-account.html
- UK: https://www.gov.uk/standard-visitor/apply-standard-visitor-visa
- Italy: https://www.visametric.com/iran/Italy/en/p/book-an-appointment
- Australia: https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas
- Freelance, cross-country: https://www.gov.uk/government/publications/visitor-visa-guide-to-supporting-documents/guide-to-supporting-documents-visiting-the-uk

## Editorial assessment / release blockers
This review inspected the eight existing guide modules, their introductory claims, section headings, first paragraphs in each section and declared official source links. It checked high-impact official claims and committed a targeted correction to the notice paragraph in **each of the eight files**. It did **not** complete approximately 10 independently opened competitor article bodies per guide; did **not** verify every paragraph and source URL exhaustively; and did **not** run TypeScript, Next build, prerender HTML, accessibility or mobile testing. Do not label this `SERP_FULL_AUDITED` or `RELEASE_READY` until those checks are complete.

Next technical checks: `npm run test:crm`, `npx tsc --noEmit`, `npm run build`, `node scripts/verify-hybrid.mjs` (adjust package cwd), route/meta/JSON-LD checks for all 10 guides, reciprocal links to Money Pages, no false authorship, production-like RTL/mobile checks. Then verify CI status and explicit release approval.

**Git discipline:** PR #29 remains Draft; no merge to `static` or changes to `main` are performed by this audit.
