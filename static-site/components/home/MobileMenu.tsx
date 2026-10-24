"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

const links = [
  { href: "/destinations/", label: "مقصدهای ویزا", icon: "✈" },
  { href: "/visa-guides/", label: "راهنمای ویزا", icon: "▤" },
  { href: "/about/", label: "درباره خوش‌ویزا", icon: "◈" },
  { href: "/contact/", label: "تماس با ما", icon: "☎" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="kv-mobile-menu">
      <button ref={buttonRef} type="button" className={"kv-menu-trigger" + (open ? " is-open" : "")}
        aria-label={open ? "بستن منوی موبایل" : "باز کردن منوی موبایل"}
        aria-expanded={open} aria-controls={id}
        onClick={() => setOpen(value => !value)}>
        <span className="kv-menu-lines" aria-hidden="true"><span/><span/><span/></span>
        <span>منو</span>
      </button>
      {open && <button type="button" className="kv-menu-backdrop" tabIndex={-1}
        aria-label="بستن منو" onClick={() => setOpen(false)} />}
      <nav id={id} className={"kv-mobile-panel" + (open ? " is-open" : "")}
        aria-label="منوی موبایل خوش‌ویزا" aria-hidden={!open} inert={!open}>
        <div className="kv-mobile-panel-heading">
          <strong>سفر بعدی از اینجا شروع می‌شود</strong>
          <span>مقصدت را انتخاب کن یا درخواستت را ثبت کن.</span>
        </div>
        <div className="kv-mobile-links">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span className="kv-mobile-link-icon" aria-hidden="true">{link.icon}</span>
              <span>{link.label}</span><span className="kv-mobile-link-arrow" aria-hidden="true">←</span>
            </Link>
          ))}
        </div>
        <Link className="kv-mobile-action" href="/consultation/" onClick={() => setOpen(false)}>
          ثبت درخواست ویزای توریستی <span aria-hidden="true">←</span>
        </Link>
        <a className="kv-mobile-phone" href="tel:+989351300502" onClick={() => setOpen(false)}>
          تماس مستقیم: ۰۹۳۵۱۳۰۰۵۰۲
        </a>
      </nav>
    </div>
  );
}
