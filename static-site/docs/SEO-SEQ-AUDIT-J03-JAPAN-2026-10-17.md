# SEO sequential audit J03 — Japan JVAC Iran | 2026-10-17

## Method and status
Article: `/visa-guides/japan-jvac-iran-process/`. **Competitor FULL_BODY_READ 1 in this pass; many official source reads do NOT count as competitor reads.** Do not mark the 10 independent competitor gate as passed.

### Actual competitor page read
**Visaland — https://visaland.org/japan-embassy/**. FULL_BODY_OPEN (body, sections, FAQs). Strengths: Persian-language sections on embassy contacts, admission, paperwork, rejections, FAQs and prominent CTA. Major weakness: its body states the embassy works with no outsourced agent and advises direct embassy submission, while a separate dated notice acknowledges JVAC commenced 16 August 2026. It also describes the old 08:30–10:30 embassy submissions and old passport pickup route. These should **not** be repeated for ordinary current applicants. The official 3 August announcement expressly routes ordinary intake and passport return to JVAC.

**Ofoghomid — https://ofoghomid.com/countries/japan/**: search result body extract indicates walk-in JVAC since 16 August 2026, but direct open returned Internal Error. Mark **INDEXED_ONLY**, not FULL_BODY_READ. Organizational connection to VFS requires independent validation; don't count as an independent competitor uncritically.

### Official sources (not competitor entries)
- Embassy of Japan dated Aug 3 2026: https://www.ir.emb-japan.go.jp/itpr_ja/11_000001_01140.html . Opening 16 Aug, Heravi Centre floor 5, Sun–Thu submission 08–15, walk-in for ordinary applicants, passport retrieval, exceptions for diplomatic/official, humanitarian urgency and embassy-defined cases; JVAC cannot decide visas.
- Embassy generic visa page https://www.ir.emb-japan.go.jp/itpr_fa/visa.html carries older direct-embassy submission instructions alongside a link to JVAC; newer subject-specific JVAC announcement controls the operational interpretation.
- VFS Japan Iran page https://visa.vfsglobal.com/irn/en/jpn/attend-centre/ currently displays general centre opening hours 08–16; this is not the same as embassy-stated *document submission* window 08–15. Distinguish working hours and submission hours.
- MOFA Japan eVISA https://www.mofa.go.jp/j_info/visit/visa/visaonline.html lists eligible countries of residence; do not assume Iranian residents can switch to eVISA merely because Japan operates one globally.

### Actual improvement committed
`static-site/lib/visa-cluster-japan-jvac-iran-process.ts`: humanized lead with a real-world confusing itinerary scenario, changed “before booking appointment” to “before walk-in”, distinguished old direct embassy information from new dated JVAC process, and specified narrow exception categories. Commit `9db25ce5b1fc65cff640f83e374f7f15e8f48ad2`.

### Next release gate
Still need ~9 additional genuinely accessible, independent directly comparable full-body competitor pages, claim-to-source audit for the whole article, precise fee verification from current VFS fee page, and fresh CI after updates. Keep PR #29 Draft.
