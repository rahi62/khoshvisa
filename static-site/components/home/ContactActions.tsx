"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
} from "@/lib/contact-links";

function ContactIcon({ kind }: { kind: "phone" | "whatsapp" }) {
  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 3h3l1.4 4.2-2 1.6a15 15 0 0 0 6.8 6.8l1.6-2L21 15v3a3 3 0 0 1-3.3 3A17 17 0 0 1 3 6.3 3 3 0 0 1 6 3Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.5 7.5L3 20.5l1.5-4.7a8.5 8.5 0 1 1 16-4.1Z" />
      <path d="m8 8.2 1.6-.3 1.3 2-.9 1.2c.7 1.3 1.6 2.2 2.9 2.9l1.2-.9 2 1.3-.3 1.6c-.2.7-1.3 1.1-2.1 1.9Z" />
    </svg>
  );
}

/** The existing mobile "ارتباط با ما" button expands two circular quick actions. */
export default function ContactActions() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="bar kv-contact-mobile" aria-label="دسترسی سریع موبایل">
      <Link className="btn btn-primary" href="/consultation/">درخواست ویزا</Link>
      <div ref={root} className="kv-contact-menu">
        <div id={menuId}
          className={"kv-contact-bubbles" + (open ? " is-open" : "")}
          role="group" aria-label="روش‌های ارتباط با خوش‌ویزا"
          aria-hidden={!open} inert={!open}>
          <a className="kv-contact-bubble kv-contact-bubble--phone"
            href={CONTACT_PHONE_HREF} aria-label="تماس تلفنی با شماره ۰۹۳۵۱۳۰۰۵۰۲"
            onClick={() => setOpen(false)}>
            <ContactIcon kind="phone" />
            <span>تماس تلفنی</span>
          </a>
          <a className="kv-contact-bubble kv-contact-bubble--whatsapp"
            href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer"
            aria-label="ورود به واتساپ خوش‌ویزا"
            onClick={() => setOpen(false)}>
            <ContactIcon kind="whatsapp" />
            <span>واتساپ</span>
          </a>
        </div>
        <button ref={trigger} type="button"
          className="btn btn-ghost kv-contact-trigger"
          aria-expanded={open} aria-controls={menuId}
          onClick={() => setOpen(value => !value)}>
          ارتباط با ما
        </button>
      </div>
    </div>
  );
}
