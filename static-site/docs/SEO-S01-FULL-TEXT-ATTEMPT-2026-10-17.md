# S01 — Main destination / first entry: fresh competitor body validation, 2026-10-17

### Source method
Search discovery is not equivalent to independent full-text competitor reading. This round searched three variants (Persian and English) and attempted to open twelve non-official competitor URLs. **One full page genuinely accessible:** Schengen Visa Pro (`https://schengenvisapro.com/first-entry-rules`), with all major sections, examples and CTA. Eleven others returned cache miss or timeout. Official EU regulation / FAQ are fact-check references, not competitors.

| Competitor candidate | Full body accessible? | Finding and evidence status |
|---|---|---|
| Schengen Visa Pro | YES | First-entry myth, 2 tests, main-destination, scenarios and wizard CTA; simplifies equal-length to first entry with no dominant-purpose condition. FULL READ. |
| Switzerland Visa Center /main-destination-vs-first-entry | NO | indexed extract only |
| VisaAssess /blog/schengen-which-consulate | NO | indexed extract only; excerpt itself correctly says purpose is essential |
| Europe Visa Centre /blog/which-consulate-should-you-apply-to | NO | indexed extract only; stronger direct competitor, no full body |
| Switzerland Visa Center /equal-stay-schengen-country-rule | NO | indexed extract only |
| Afghan Schengen /schengen-entry-country-vs-main-destination | NO | indexed extract only |
| SureshotTravel /blog/schengen-main-destination-rule | NO | indexed extract only |
| Germany Visa Center /main-schengen-destination-germany-france | NO | indexed extract only |
| NAC Travel /which-consulate-should-you-apply-to-and-what-counts-as-visa-shopping | NO | timeout; indexed extract only |
| Germany Visa Center /main-destination-germany-schengen-visa | NO | indexed extract only |
| Afghan Schengen /schengen-main-destination-country | NO | indexed extract only |
| Lithuania Visa Center /main-destination-vs-first-entry-schengen | NO | indexed extract only |

### EU evidence
Official consolidated Article 5: `https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1774057492850&uri=CELEX%3A02009R0810-20240628`. Competence: single state; otherwise main destination by days *or purpose*; only in its absence first external Schengen crossing. Official FAQ `https://home-affairs.ec.europa.eu/document/download/dae5e071-1564-4a5d-9714-2147f7641781_en?filename=FAQs.pdf` gives an equal-duration general simplification; this does not erase purpose where a principal purpose is evidenced. Germany foreign office in Persian `https://teheran.diplo.de/ir-fa/2643090-2643090` explicitly uses length OR main purpose.

### Applied content edit
Rewrote equal-days second paragraph in `static-site/lib/visa-cluster-schengen-main-destination.ts` to explicitly ask reader to compare the itinerary with invitation/event evidence before applying first entry as fallback. Commit `5f6ad62496e76c51ec6e38c2dee51ef7256acf62`.

### Gate
**NOT COMPLETE.** Only one full competitor page in current batch, a previously read Visaland Schengen page in earlier round is topical but not identical query; no claim that 10 independent full-body competitor reviews were achieved. PR #29 remains Draft.
