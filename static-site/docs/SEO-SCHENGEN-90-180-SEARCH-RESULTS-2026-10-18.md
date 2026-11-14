# SEO — 90/180 Schengen observed-result audit (2026-10-18)

**Query:** `schengen 90 180 day rule examples calculator rolling window`. These are **ten retrieved organic-looking results in the search provider's order**, selected from that query response as the first ten *non-government guide/calculator results*. The live Google Iran results for a Persian query were NOT independently verified. Official European Commission source was excluded from competitor count but preserved as a source-of-truth; if a fixed raw first-ten including official sources is required, this is not that exact set. Do not claim these are the top ten Google results.

| Observed competitor order | Source | URL | Access | Topics / UX |
|---:|---|---|---|---|
| 1 | out90.com | https://out90.com/calculator | FULL_BODY | Calculator and concise guide |
| 2 | SchengenTrack | https://schengentrack.com/90-180-rule-examples/ | FULL_BODY | Six worked examples; shows rolling expiring dates |
| 3 | SchengenClock | https://schengenclock.com/ | FULL_BODY | Calculator and reference to visa-exempt travelers |
| 4 | Do a Stretch | https://doastretch.com/tools/schengen-90-180-calculator/ | FULL_BODY | Distinguishes days left from longest legal stay |
| 5 | VISAPrep | https://visaprep.net/schengen-90-180-day-calculator/ | FULL_BODY | Rolling window; examples and day reports |
| 6 | MoneyDeck | https://moneydeck.io/tools/schengen-calculator | FULL_BODY | 45 days used vs 60-day feasible continuous stay worked example |
| 7 | MoveMap EU | https://www.movemapeu.com/schengen-calculator | FULL_BODY | Continuous-stay planning with real entry/exit dates |
| 8 | calculator.name | https://calculator.name/schengen-calculator | FULL_BODY | Illustrates each day's expiry in rolling window |
| 9 | VisaChecker | https://visachecker.org/schengen-calculator | FULL_BODY | Separate long-stay and residence permit exception |
| 10 | SchengenClock article | https://schengenclock.com/90-180-rule | FULL_BODY | Extended full text; not independent publisher from SchengenClock calculator |

## Genuine content advantages / gaps
- Several accessible sources provide actual **calculator functionality**, a useful experience advantage over prose. A prose-only KhoshVisa article must not claim it surpasses them as a calculating tool; point to the official EU calculator rather than invent an untested implementation.
- Strong competitor pages explain a nonintuitive fact: the "days remaining today" display differs from possible **consecutive stay length** because previously used days expire as a new journey progresses.
- Their dominant framing is for visa-exempt travelers. For Iranian visa applicants, explaining independently **visa sticker validity / Duration of Stay / Number of Entries** is critical additional value.
- Be careful: some competitors describe departure timing loosely. Count entry and exit dates inclusively and always double-check arithmetic.

## Primary source
European Commission short-stay calculator: https://home-affairs.ec.europa.eu/policies/schengen/border-crossing/short-stay-calculator_en. Official user manual: https://home-affairs.ec.europa.eu/document/download/c6b8be91-871c-4e5a-bf11-d260d4488020_en?filename=short_stay_schengen_calculator_user_manual_en.pdf.

## Implemented
Expanded the three-trip example explanation with the distinction between remaining days and maximum continuous future stay, including practical Planning-mode and sticker-limits advice. Code commit `65135dffbad481d2fc788e9245c84772dcbbe8e1`.

## Status
**RESULT-SET-REVIEWED / CONTENT-UPDATED.** Not verified as live Google Iran #1–#10, and a competitor list contains two pages from SchengenClock. Mobile rendered QA and post-commit CI are still separate publication gates. PR #29 stays Draft.
