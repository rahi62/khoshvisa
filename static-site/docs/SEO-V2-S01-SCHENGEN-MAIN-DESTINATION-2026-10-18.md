# SEO V2 — S01 Schengen main destination (18 October 2026)

**Primary query:** «ویزای شینگن کشور مقصد اصلی یا اولین ورود اقامت برابر هدف سفر ماده 5». Source: search-provider results as observed, NOT a verified local Google top-ten screenshot or fixed-rank export.

## Results and substantive review
| Observed result | Source | Readable? | Content assessment |
|---|---|---|---|
| 1 | EUR-Lex Article 5, https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02009R0810-20240628 | Yes | Legal authority, sole/main/first-border priority; not a commercial competitor |
| 2 | Switzerland Visa Center, https://switzerlandvisacenter.ir/main-destination-vs-first-entry | Yes | Defines destination vs entry, worked equal-duration example with event purpose; same-page framing useful |
| 3 | Switzerland Visa Center, https://switzerlandvisacenter.ir/switzerland-first-entry-multi-country-trip | Yes | Rich country-specific scenarios, but risk simplified equal-nights heuristic |
| 4 | Italy Visa Center, https://italyvisacenter.ir/first-entry-vs-main-destination-schengen | Yes, partial displayed | Destination/entry differentiation, limited detail in retrieved view |
| 5 | Switzerland Visa Center, https://switzerlandvisacenter.ir/equal-stay-schengen-country-rule | Yes | Qualifies first-entry rule if no discernible main purpose; first sentence too categorical |
| 6 | Lithuania Visa Center, https://lithuaniavisacenter.ir/main-destination-vs-first-entry-schengen | Yes | Equal-nights heuristic, country-specific framing |
| 7 | Afghan Schengen, https://afghanschengen.ir/schengen-entry-country-vs-main-destination | Yes | Main destination/first-entry distinction, overly broad equal stay rule |
| 8 | Germany Visa Center, https://germanyvisacenter.ir/main-schengen-destination-germany-france | Yes | Main destination framing, simplifies equal durations to first entry |
| 9 | EUR-Lex original, https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX%3A32009R0810 | Yes | Legal authority older text, not competitor |
| 10 | UK legislation copy, https://www.legislation.gov.uk/eur/2009/810/article/5?view=plain | Yes | Article 5 source copy, not competitor |

## Source priority and findings
- Controlling law: Article 5 of Visa Code: member state of sole destination, or main destination by length **or purpose**, else first **external border** of Schengen entry.
- FAQ from EEAS https://www.eeas.europa.eu/sites/default/files/faq_visa_en.pdf summarizes equal-length stays by first entry, but should be read with legal Article 5 as to a discernible primary purpose.
- Content gap targeted: many commercial pages collapse a country eligible to evaluate the application with physical country of application. Eligibility to examine visa and jurisdiction of consulate where the applicant **legally resides** are separate questions. Added clearer two-step applicant decision narrative in `static-site/lib/visa-cluster-schengen-main-destination.ts`.
- Existing paired equal-duration family-event versus tourism scenarios were already present in V1; avoid duplicative text expansions.

**Code commit:** `a8abec5e2d77667b59a071f014cd247960081240`.

**Gate:** This is *ten observed results of this provider query*, three are legal references and two pages belong to the same publisher. The audit does not claim ten **independent commercial** rivals nor actual Google Iran positions. Other nine article audits pending. All updates on branch `content/seo-v2-ten-guides-20261018`, PR #30, no merge.
