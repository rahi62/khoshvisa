# SEO V2 — S04 France-Visas Iran — 2026-10-18

## Query and actual retrieved results

Primary query: `آموزش ثبت نام فرانس ویزا France Visas وقت سفارت فرانسه VFS ایران مراحل درخواست`. Additional query: `فرم france visas آموزش قدم به قدم ایران نوبت VFS`. A supplementary search was run for Persian guides but predominantly returned **official France-Visas pages**, several duplicate language routes. The search provider's ordered hits are **not verified Google Iran top ten**.

The first ten displayed provider hits from the primary batch were:

1. France-Visas Iran current — https://france-visas.gouv.fr/ar/web/france-visas/iran — full official page. New Heravi Centre 4th-floor address and direct embassy submission by appointment.
2. France-Visas Iran legacy — https://www.france-visas.gouv.fr/iran — full official page, but **OLD Mega Pars address**; search result is stale.
3. France-Visas online application — https://www.france-visas.gouv.fr/web/france-visas/demande-de-visa — official form route, passport/original copies/2 photos.
4. France-Visas Iran locale with query parameter — same primary government entity; not independent competitor. Full body.
5. France-Visas online application alternate URL — duplicate government route.
6. France-Visas online application Arabic — duplicate government language variant.
7. France-Visas Iran Russian — duplicate government country page.
8. France-Visas homepage — https://www.france-visas.gouv.fr/ — official five-step journey: determine, fill, appointment, submit, track.
9. France-Visas online application Russian — duplicate government language variant.
10. France-Visas online application English — duplicate government language variant.

**Critical ranking caveat:** this is a search-tool observed batch, NOT a geo/device-verified first-ten Google organic ranking. No claim of reading ten commercial competitor bodies; in this sample there are zero independent commercial competitor pages. The extra Persian search predominantly retrieved further France-Visas duplicates and a **humanitarian/asylum form video**, which should not be treated as a competitor for tourist visa form intent.

## Competitor/content insights, factual source controls
- Existing guide correctly separates France-Visas registration, VFS booking, submission/biometrics, embassy decision. This is the most important task flow.
- Unlike an ordinary generic visa landing page, users need **printed final CERFA and France-Visas receipt** as well as VFS appointment letter. Current government homepage explicitly states final paper CERFA and receipt must be presented.
- The **current** France-Visas Iran page shows **Heravi Centre 4th floor**, while another government indexed version still shows **Mega Pars 14th floor**. Outdated or duplicate official URLs are a bigger discoverability trap than a supposedly authoritative old competitor article. Explicitly explain old-vs-new, check confirmation and VFS.
- Iran guidance lists EUR26.5 VFS service fee per application in cash, nonrefundable, and direct embassy submissions by prior appointment; not a live appointment inventory.
- Check completeness of individual family appointments, applicable biometric exemption and separate appointment notice; do not conflate ordinary tourist visa with asylum/student application tutorials.

## Actual applied code edit
In `static-site/lib/visa-cluster-france-visas-iran-application.ts`:
1. Updated location conflict paragraph to acknowledge **current official Heravi address** and continued legacy Mega Pars listing.
2. Specified printing **final CERFA + France-Visas receipt** and appointment confirmation.
3. Clarified per-person appointment for families.
4. Updated `updatedISO` to 2026-10-18.

Commit: `f133be770e0b970e9aee2f0bc400ee968235efd1`.

## Gate
SERP provider's first 10 documented, but duplicate official pages dominate; cannot claim independent competitor analysis or exact local Google first page. Further commercial content can be audited if it appears in a genuine captured Google SERP; don't manufacture replacements to reach a target. Shared V2 branch, PR #30; no merge or production deploy yet.
