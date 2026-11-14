# VIDEX Germany — search-results and competitor content audit (2026-10-25)

Query tested: «آموزش تکمیل فرم ویدکس آلمان VIDEX شینگن» and «فرم ویدکس آلمان نحوه پر کردن VIDEX راهنما».

**Accuracy note:** Results below are the first **10 website results returned by the search provider for the first query** (excluding the YouTube result). This is **not** a direct verified Google.com Google Iran organic top-ten for Tehran, a particular browser or device. Search tools cannot establish such a ranking. We explicitly avoid claiming that limitation is solved.

| Observed provider order | Page | Accessible content / assessment |
|---|---|---|
| 1 | [TLScontact application process](https://visas-de.tlscontact.com/fa-ir/country/ir/vac/irTHR2de/application-process) | Full text read. Iranian Schengen official operation, caps, black-ink signature, representative conditions. Essential primary source, not competitor. |
| 2 | [German Tehran tourist checklist](https://teheran.diplo.de/ir-fa/2708230-2708230) | Text read. Signed VIDEX and Section 54 legal acknowledgment; crucial missing topic in many commercial sites. Official, not competitor. |
| 3 | [German Tehran medical checklist](https://teheran.diplo.de/ir-fa/2647874-2647874) | Text read. Same signed forms but **different search intent** (medical). Official, not competitor. |
| 4 | [German Tehran family visit checklist](https://teheran.diplo.de/ir-fa/2643396-2643396) | Text read. Schengen family-purpose paperwork. Official, not competitor. |
| 5 | [German Foreign Office VIDEX guidance](https://www.germany.info/us-en/service/visa/visa-form-instructions-968992) | Full guidance read; character rules, pre-fill, old UI caveats; cross-check against newer instructions. Official. |
| 6 | [German Tehran truck driver checklist](https://teheran.diplo.de/ir-fa/2656378-2656378) | Text read. Different intent; do not imitate for tourist article. Official. |
| 7 | [German Tehran self-employment](https://teheran.diplo.de/ir-fa/2641724-2641724) | Text read. National visa/entrepreneurship vs tourism, avoid conflation. Official. |
| 8 | [TLScontact Tehran canonical](https://visas-de.tlscontact.com/fa-ir/country/ir/vac/irTHR2de/application-process) | Same website as #1 under another returned URL variant; **duplicate, not independent competitor**. |
| 9 | [German Foreign Office VIDEX leaflet](https://jaunde.diplo.de/cm-de/service/2570788-2570788) | Text read. National vs Schengen versions and printouts. Official. |
| 10 | [HelloGermany Persian VIDEX walkthrough](https://hellogermany.ir/rahnmay-pr-krdn-frm-vydks-alman) | Full article read; sections: personal data, work, travel, finance and rejection prevention. Main intent is national long-stay application; useful sectional structure but should not merge with Schengen use case. |

## Additional accessible competitor pages (NOT claimed within initial top ten)
- [HelloGermany illustrated walkthrough](https://hellogermany.ir/frm-anlayn-vydks-alman): read body; mixes national and tourist intent, has generic step walkthrough.
- [tlskontakt independent VIDEX guide](https://www.tlskontakt.com/videx-guide): read body; distinguishes Schengen/National, mentions locally saved forms and generated barcode PDF; explicitly **not official TLScontact** despite similar-looking domain.
- [Visatermin VIDEX](https://www.visatermin.de/videx): read body; user workflow broadly described, but outdated VisaMetric booking reference, so cannot be used for current Iranian appointment instructions.
- [Official German Foreign Office 2026 VIDEX instruction](https://nigeria.diplo.de/ng-en/2756498-2756498): granular fields, import of saved data, validation, dates DD.MM.YYYY; forms may change, Tehran directions prevail.

## Content gap and implementation
- For short-stay tourist visa, separate VIDEX Schengen versus VIDEX National, avoiding high-ranking national-visa content confusion.
- Show example differentiating first Schengen entry from competent main destination and how to treat sponsor-funded expenses.
- Explain printed barcode, signatures and all official form output pages, and how to save/import data before reprinting.
- V3 changes: earlier commits `55577091`; next `c7fdd6b`.
- No factual claims that a completed form guarantees visa approval.

**Outstanding:** Direct Google Iran SERP rank order is not verifiable by the available search provider; this list is a provider-ranked sample. Verify CI and visible render before merge; no silent publication.
