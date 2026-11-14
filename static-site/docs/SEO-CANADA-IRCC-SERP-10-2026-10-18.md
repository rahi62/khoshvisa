# C06 — IRCC Portal competitor/source audit | 2026-10-18

**Query A:** آموزش ثبت درخواست ویزای توریستی کانادا IRCC Portal مراحل 2026. **Query B:** آموزش ircc portal new version ویزای کانادا تفاوت gc key سایت فارسی. Search provider order is not a verified location-personalized Google rank. Here are the first ten returned items for **Query B**, not ten hand-selected competitor pages. Some are official or duplicate commercial pages.

| Observed # | Source | Classification | Readability / content |
|---|---|---|---|
| 1 | canada.ca/en/immigration-refugees-citizenship/services/application/ircc-accounts.html | Government | Full page: three visitor visa account types |
| 2 | canada.ca/en/immigration-refugees-citizenship/services/application/online-account.html | Government | Full page: New version four eligibility conditions |
| 3 | canada.ca/en/immigration-refugees-citizenship/services/application/check-status.html?s=8 | Government | Full page: identify original account by GCKey vs email |
| 4 | paxlaw.ca/fa/blog/farsi-blog/fa-gckey-vs-ircc-portal/ | Commercial publisher | Full body: legal explanation, table, login risk; not end-to-end New version application |
| 5 | ircc.com/news/permanent-resident-portal-vs-ircc-secure-account | Third-party publication | Full body: PR portal, not temporary visitor visa; intent mismatch |
| 6 | canada.ca/en/immigration-refugees-citizenship/services/visit-canada/portal-application-process.html | Government | Full body: Portal invitation code, documents and payment |
| 7 | paxlaw.ca/fa/blog/immigraion-refugee-law-fa/fa-gckey-vs-ircc-portal/ | Same publisher as #4 | Full body: duplicate topical theme; do not count separately as independent competitor |
| 8 | canada.ca/en/immigration-refugees-citizenship/services/application/account.html | Government | Full body: secure account, GCKey and programs |
| 9 | ircc.com/news/link-application-to-ircc-account | Third-party publication | Full body: linking older paper/GCKey applications; related, not direct onboarding |
| 10 | canada.ca/fr/immigration-refugies-citoyennete/services/demande/comptes-ircc.html | Government | Full body: French language duplicate official account index |

**Distinctive content gap:** current Persian competitor discusses GCKey vs Portal extensively but does not foreground Portal–New version's four precise official eligibility gates in a family/solo decision narrative. Government accounts landing page also now lists **three account types**, so avoid casually calling every IRCC login “the portal.” The end-user needs “which account for my actual visa?” and “upload vs final submission?” guidance.

**Official checks:** 
- https://www.canada.ca/en/immigration-refugees-citizenship/services/application/ircc-accounts.html
- https://www.canada.ca/en/immigration-refugees-citizenship/services/application/online-account.html
- https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/portal-application-process.html
- https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html

**Applied humanization:** practical married-couple scenario, clear distinction among the three accounts, IRCC four New-version requirements, invite code, final submission vs uploading, fees separated. Commit `abbc1e7bc50d8d71f3587cfbe7964ff131e227ce`.

**Status:** Query B first ten **search-provider results reviewed** with bodies accessible. Exact Google Iran positions and mobile rendered QA unverified. Not a statement that ten independent commercial competitors were analyzed. PR stays Draft.
