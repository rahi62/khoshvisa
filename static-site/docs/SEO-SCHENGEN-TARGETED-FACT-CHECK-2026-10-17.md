# KhoshVisa — targeted Schengen editorial verification (2026-10-17)

**PR:** #29; **scope:** `schengen-main-destination` and `schengen-90-180-day-rule`; **status:** PARTIAL FACT CHECK. This is NOT a 10-competitor full-body SERP audit, QA signoff, or deployment approval.

## Sources independently checked
1. EUR-Lex, Visa Code Article 5: https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=+celex%3A32009R0810 — sole destination; main destination by duration/purpose; first external border only when no main destination can be determined.
2. European Commission, applying for a Schengen visa: https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en — public applicant guide.
3. European Commission, short-stay calculator: https://home-affairs.ec.europa.eu/policies/schengen/border-crossing/short-stay-calculator_en — 90 days in any moving 180-day window; visa sticker's shorter authorised duration prevails over calculator suggestions.
4. Official short-stay calculation tool: https://ec.europa.eu/assets/home/visa-calculator/calculator.htm — planning/control aid; not an enforceable entitlement.
5. Italian Embassy in Tehran, visa service: https://ambteheran.esteri.it/fa/servizi-consolari-e-visti/servizi-per-il-cittadino-straniero/visti/ — confirms Italy must be the sole/main destination for an Italian short-stay application.

## Source-to-claim verification
| Claim in article | Result | Follow-up |
|---|---|---|
| First-entry is not the universal embassy rule | Consistent with Article 5 | Preserve. |
| Equal nights do not invariably mean first-entry | Consistent: purpose must also be considered | Preserve caveat; don't offer categorical legal determination for ambiguous itineraries. |
| The external-border rule applies only without identifiable main destination | Consistent with Article 5 | Preserve. |
| 90/180 uses rolling days, not fixed calendar semesters | Consistent with EC calculator | Preserve. |
| 10 Jan–20 Jan counted inclusively = 11 days | Verified arithmetic | Preserve. |
| 1–10 March = 10, 1–20 May = 20, 1–30 July = 30 days | Verified inclusive arithmetic | Note these 60 days count together only at relevant control dates; do not imply an unconditional 60-day sum for any date. |
| A visa sticker permitting <90 days is not expanded by the calculator | Explicitly confirmed by EC | Preserve. |
| Every Schengen country has a separate 90-day allowance | False; article correctly rejects | Preserve. |

## Editorial issues identified
- **Medium — example precision:** `schengen-main-destination` gives “10 nights in France, only transit through Rome airport” without saying whether Rome is an internal-Schengen connection or an actual first external entry. Rephrase scenario to specify border/connection and avoid suggesting the first airport is always an external border.
- **Medium — topical contextual link:** `schengen-main-destination` section on Article 5 links to `single-vs-multiple-entry-visa` as a guide to visa validity and entry count; that is not the most relevant supporting link for determining the competent consulate. Consider a direct link to the 90/180 article only when the paragraph truly discusses stay duration, or remove this link and rely on the country Money Pages.
- **Low — repeated sections:** `schengen-90-180-day-rule` repeats the three visa-sticker restrictions in two standalone sections. Condense or distinguish them with a worked sticker example to increase information gain, while preserving the legally important caveat.
- **Editorial release gate remains BLOCKED:** current recorded competitor review is partial. These source checks are not a replacement for approximately 10 independently accessible competitor article bodies per topic, full RTL/mobile QA, or preview HTML/metadata checks.

## Git and release discipline
Keep PR #29 Draft, and do not merge to `static` or touch `main` until full editorial QA and explicit owner approval. No changes in this verification report alter public site content.

## Applied editorial fixes (same Draft PR, 2026-10-17)
- Updated `visa-cluster-schengen-main-destination.ts`: scenario 1 now explicitly identifies arrival into Schengen via Rome followed by 10 nights in France, eliminating ambiguity between airport transit and first external-border entry.
- Replaced an off-topic article contextual link in the main-destination guide with a topical 90/180 link within the section discussing travel-day calculation. The two legal questions are explicitly distinguished.
- Updated `visa-cluster-schengen-90-180-day-rule.ts`: replaced a repetitive second visa-sticker explanation with a concrete hypothetical single-entry sticker (1 June–31 August validity / 20 authorised days) and a caveat distinguishing dates from stay rights.
- Additional web checks found competitor search excerpts, but direct opening of two candidate article bodies failed (cache miss). They remain **INDEXED_ONLY**, not FULL_READ. The full independent competitor-audit gate remains incomplete.
- CI/Next build, complete HTML output, actual mobile review, and full ten-guide fact audit have **not** been executed in this pass; do not claim completion.
