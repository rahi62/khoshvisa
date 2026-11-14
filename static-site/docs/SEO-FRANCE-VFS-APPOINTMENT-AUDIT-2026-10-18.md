# France-Visas Iran — targeted content QA, 2026-10-18

**Search queries:** آموزش ثبت نام سایت france visas فرانسه ایران مراحل فرم وقت سفارت; فرانس ویزا مراحل ثبت درخواست ایران VFS مدارک. Search-provider results predominantly official France-Visas and VFS pages, including language variants and old cached pages. **Not a proven ten-position Google Iran SERP or ten independently read competitors.**

## Official content verification
- https://visa.vfsglobal.com/irn/fr/fra/interim (VFS official): **must register application in France-Visas before appointment**; incorrect appointment category may lead to refusal to accept file **and prepaid service fee nonrefundable**.
- https://visa.vfsglobal.com/irn/fa/fra/attend-centre/what-happens-at-centre: be there 15 minutes early; bring printed application, barcode pages, copies and originals.
- https://france-visas.gouv.fr/ar/web/france-visas/iran: VFS location Heravi Centre floor 4 and embassy direct booking-by-appointment possibility.
- https://visa.vfsglobal.com/irn/fa/fra/: confirms relocation to Heravi Centre (news 28 May 2026). A separate indexed France-Visas URL https://www.france-visas.gouv.fr/iran still shows old Mega Pars floor 14; this is a **real index/document freshness conflict**, not proof of different valid concurrent sites.
- https://visa.vfsglobal.com/irn/fa/fra/fees: EUR26.5 in cash euros per case, distinct from consular fee, source is volatile.
- https://www.france-visas.gouv.fr/en/la-demarche: five-stage workflow, separate online filing and appointment.

## Implemented
Added explicit warning in section "نوبت VFS Global تهران چگونه به فرم مرتبط است؟" on appointment category mismatches and nonrefundable prepaid service charge after refusal to receive mismatched applications. Code commit `e11dc3d79428a54b65a20e8f04b3813216d2db94`.

## Limitations and publication gate
No verified live Google 10-position snapshot for this Iranian query; search returned mostly primary sources and duplicate language variants. Rendered mobile QA still unverified. Keep PR #29 Draft pending actual release decision and CI.
