# KhoshVisa UK Standard Visitor — 2026-10-18 SERP content review

**Target query:** «آموزش پر کردن فرم آنلاین ویزای انگلیس UKVI ایرانیان»; secondary «ویزای توریستی انگلیس ثبت نام آنلاین فرم سفارت مرحله به مرحله». Source: search-provider ranked results, not validated live Google Iran top-ten.

## Observed search results / content
Primary query returned ten results in provider display order:
1. GOV.UK `/standard-visitor/apply-standard-visitor-visa` — FULL_BODY, official; updated fee £135, earliest application **3 months before travel**, personal application/fee per family member, passport for entire visit, certified English/Welsh translation, eVisa.
2. Same GOV.UK page with alternate query parameter — DUPLICATE official URL.
3. Visaland `/british-tourist-visa/` — substantive Persian competitor; high-level steps, current Tehran VAC restart mention and eVisa, commercial services, not a screen-by-screen UKVI tutorial.
4. Same GOV.UK page with alternate query parameter — DUPLICATE official URL.
5. Nilgam `/tourist-visa/england/` — substantive Persian competitor; thorough documents/fees, but says `حداقل 3ماه` before travel in text. GOV.UK says **earliest** 3 months, so the meaning is reversed. Elsewhere discusses passport vignette/pickup which may be out of date with UKVI eVisa journey.
6. VFS Global Iran `/irn/fa/gbr/apply-visa` — FULL_BODY official operator, UKVI first then VFS; eVisa access.
7. Visaland `/application-form/` — related competitor, brief link to UK online form, not walkthrough.
8. Nilgam `/blog/uk-tourist-visa-appointment-guide/` — substantive Persian competitor; lists forms and visa appointments, still lists old Mega Pars Tehran VAC location. Do not repeat location without current VFS confirmation.
9. GOV.UK `/visa-to-study-english/apply` — official but short-term study visa intent, not target.
10. GOV.UK `/world/coming-to-the-uk-iran` — official Iran country hub, not tutorial.

**Content gaps worth filling in KhoshVisa**: distinguish earliest three months vs recommended submission lead time; explain UKVI form completion vs VFS biometrics; personal forms for children/partners; eVisa and linking UKVI account after decision; don't import old UK sticker pickup instructions as universally current. Commercial pages are broader Money Pages rather than focused error-resistant form guidance.

**Official reference:** https://www.gov.uk/standard-visitor/apply-standard-visitor-visa — £135, 6 months, family applications, three months earliest, certified translations and eVisa after successful decision; https://visa.vfsglobal.com/irn/fa/gbr/apply-visa — operator eVisa and submission.

**Actual code edit:** strengthened notice with UK visitor fee/date correctly framed and next-step eVisa account check in `static-site/lib/visa-cluster-uk-standard-visitor-online-application.ts`. Commit `f48795cab529d345792955319a4630c17787f2a9`.

**Status:** 10 observed search-provider results examined; duplicate/official/nonmatching hits counted transparently, not transformed into ten independent competitors. Google Iran precise rank unconfirmed. PR #29 remains draft; CI after last code commit is pending.
