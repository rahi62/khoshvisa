"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { id: string; label: string; url: string };

export function MobileNav({ items, mobile, cta }: { items: Item[]; mobile: string; cta: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menuOpen", open);
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("menuOpen");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return <div className="mobileNav">
    <button className="menuToggle" type="button" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "بستن منو" : "بازکردن منو"} onClick={() => setOpen((value) => !value)}><span /><span /><span /></button>
    {open && <button className="menuBackdrop" type="button" aria-label="بستن منو" onClick={() => setOpen(false)} />}
    <div id="mobile-menu" className={`mobileMenuPanel${open ? " isOpen" : ""}`} aria-hidden={!open}>
      <div className="mobileMenuHead"><strong>منوی خوش ویزا</strong><button type="button" aria-label="بستن منو" onClick={() => setOpen(false)}>×</button></div>
      <nav aria-label="منوی موبایل"><Link href="/" onClick={() => setOpen(false)}>صفحه اصلی</Link>{items.map((item) => <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>{item.label}<span>‹</span></Link>)}</nav>
      <a className="button mobileMenuCta" href={`tel:${mobile}`}>{cta}: <span dir="ltr">{mobile}</span></a>
    </div>
  </div>;
}
