# PR #29 — publication acceleration audit checkpoint — 2026-10-17

## Ground rules
- User-approved criterion: review first 10 *observed* results for each target query. Read bodies where accessible; do not hunt 10 readable pages or add substitutions beyond position 10. Search tool SERP is NOT a verifiable Google Iran ranking; mark source-order only.
- Primary sources validate volatile consular claims, not commercial competitors.
- No publication or merge to static until technical and editorial signoff.

## Source verification completed in this pass
- France-Visas official Iran source https://france-visas.gouv.fr/ar/web/france-visas/iran ; also https://www.france-visas.gouv.fr/iran has stale conflicting Heravi vs Mega Pars address in indexed snapshots. The fresh site shows Heravi Centre level 4 but recheck right before travel. VFS usually receives application, direct embassy channel by prior appointment remains.
- France-Visas 5-step process https://www.france-visas.gouv.fr/en/web/france-visas/la-demarche supports difference among online application, separate appointment, biometric submission, tracking.
- GOV.UK https://www.gov.uk/standard-visitor/apply-standard-visitor-visa confirms online application, visa centre appointment, independent family application/payment, 3 months earliest, public £135 6-month application fee (volatile).
- IRCC https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/portal-application-process.html describes regular Portal invite code and submission. https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html differentiates the restricted New version and regular Portal, visitor fee vs biometric fee.
- Australia https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600/tourist-stream-overseas confirms offshore stream exists, up-to-12-month case-dependent stay, may not work.

## Source-informed humanization applied
1. `france-visas-iran-application`: user scenario demonstrating completed form != appointment != receipt; maintain exception for direct embassy appointment. Commit `9e9a98d`.
2. `uk-standard-visitor-online-application`: included per-person family applications and fees; clarified digital save-and-return. Commit `a335f57`.
3. `canada-ircc-portal-guide`: regular Portal first-use invitation code and separate biometrics fee category, not falsely conflating Portal–New version. Commit `f4c1c92`.

## Ten-guide publication gate status
| Article | Competition SERP top-ten audited on genuinely observed positions? | Officials sampled? | Edited in PR history? |
|---|---|---|---|
| schengen-main-destination | search-provider top-ten sample, exact Google ranking unconfirmed | yes, EU Article 5 | yes |
| schengen-90-180-day-rule | partial competitor retrieval; not complete | yes, EU calculator | yes |
| japan-jvac-iran-process | partial competitor retrieval; not complete | yes, Japanese embassy/VFS | yes |
| france-visas-iran-application | partial; no verified ten-result Google Iran export | yes, France-Visas | yes in this pass |
| germany-videx-form-guide | no confirmed top-ten competitor audit | yes in earlier targeted audit | yes earlier |
| canada-ircc-portal-guide | no confirmed top-ten competitor audit | yes, IRCC | yes in this pass |
| uk-standard-visitor-online-application | no confirmed top-ten competitor audit | yes, GOV.UK | yes in this pass |
| italy-visametric-iran-appointment | no confirmed top-ten competitor audit | yes, VisaMetric earlier | yes earlier |
| australia-visitor-600-offshore-guide | no confirmed top-ten competitor audit | yes, Home Affairs | yes earlier |
| freelancer-self-employed-tourist-visa | no confirmed top-ten competitor audit | yes, jurisdiction caveats earlier | yes earlier |

**Do not relabel this report as full 10-article completed audit.** Search results for 9 topics were sampled in batches, but returned mixed official/nearby topics and insufficient direct ten organic entries for an honest locked SERP. Official QA remains stronger than competitor QA. No merge without explicitly requested merge approval.
