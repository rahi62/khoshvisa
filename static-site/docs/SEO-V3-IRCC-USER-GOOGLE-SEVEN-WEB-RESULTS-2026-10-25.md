# IRCC V3 — User-supplied Google first-page content audit (2026-10-25)

**Source of result ordering:** User manually copied these URLs from their own Google results for «آموزش ثبت نام ویزای توریستی کانادا IRCC Portal». They reported that three preceding results were YouTube videos and explicitly asked to exclude videos. Accordingly these **seven links correspond to the seven web results supplied, in user order**, not independently revalidated Google rankings. Do not substitute alternative domains.

| Result in supplied order | Website | Readability | Content assessment |
|---|---|---|---|
| 1 (after three videos) | https://www.tehranpayment.com/blog/online-registration-of-canada-visa/ | Full text readable | Image-led online registration guidance and payment angle; strength: practical step visuals; weakness: many legacy UI/portal assumptions need checking against IRCC today. |
| 2 | https://visa724.com/آموزش-مراحل-ثبت-نام-آنلاین-ویزای-توریستی-کانادا/ | Full text readable | Describes self-application with numbered steps and agency alternative; cites Iranian temporary work-permit program with February 2024 dates; clearly outdated as an ongoing visitor-visa benefit. |
| 3 | https://www.abrangsafar.com/ثبت-نام-آنلاین-ویزای-کانادا-راهنمای-کا/ | Full text readable | Step-by-step tutorial dated 1402, account and application creation; strong beginner walkthrough but screenshots and account path should not be copied blindly into present Portal. |
| 4 | https://parmismohajer.com/create-a-canada-ircc-account/ | Timeout | Account creation intent clear from URL only; **body not reviewed**, no invented assertions about headings or quality. |
| 5 | https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html | Full text readable | **Official IRCC primary source**, not a commercial competitor. Source of eligibility, portal distinctions, checklist, recommended six-month passport validity, family fees, BIL. |
| 6 | https://canpars.ca/ircc-webform/ | Full text readable | Narrow post-submission Webform intent, practical instructions; complement rather than replace full application/registration tutorial. |
| 7 | https://crestattorneys.ca/fa/ویزای-توریستی/ | Full text readable | Broad lawyer-written visitor-visa guide, prominent FAQ about visa validity, visitor record, refusal and processing time; scope overlaps but is broader than procedural IRCC Portal intent. |

## Decision and changes
- **Primary exact-match intent:** account choice -> registration -> digital checklist -> submit -> BIL/VAC -> follow-up/PPR, not general immigration or guaranteed success.
- **Useful differentiator:** modern IRCC account selection (GCKey secure account vs regular Portal vs New version), screenshot-independent UI directions, account-specific supplementary upload paths, family fee caps and status tracking. Previous V3 edits cover these.
- **New gaps filled:** applicant in Iran needs to identify valid international VAC and wait for BIL; avoid asserting a fixed appointment/decision time. Official IRCC now recommends six months passport validity from planned travel; online approval alone does not authorize travel until requested passport and visa stamping steps.
- **Avoid overclaim:** no automatic visa-to-work conversion based on temporary 2024 measures; no invented Tehran VAC, guaranteed visa times or prices.
- **No claim of reviewing YouTube content**, per user's explicit instruction.
- **No claim of reviewing inaccessible Parmis body**.

Implementation: `static-site/lib/visa-cluster-canada-ircc-portal-guide.ts`, commit `08c202cd` on PR #43 Draft. Status: review CI and render before merge; user has **not** authorized merging PR #43.
