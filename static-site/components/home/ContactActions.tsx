"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import {
  CONTACT_MOBILE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
} from "@/lib/contact-links";

function Icon({ kind }: { kind: "contact" | "phone" | "whatsapp" | "chevron" }) {
  if (kind === "whatsapp") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.5 7.5L3 20.5l1.5-4.7a8.5 8.5 0 1 1 16-4.1Z" />
      <path d="m8 8.2 1.6-.3 1.3 2-.9 1.2c.7 1.3 1.6 2.2 2.9 2.9l1.2-.9 2 1.3-.3 1.6c-.2.7-1.3 1.1-2.1.8-3.1-.9-5.8-3.6-6.7-6.7-.3-.8.1-1.9 1-1.9Z"/>
    </svg>
  );
  if (kind === "phone") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h3l1.4 4.2-2 1.6a15 15 0 0 0 6.8 6.8l1.6-2L21 15v3a3 3 0 0 1-3.3 3A17 17 0 0 1 3 6.3 3 3 0 0 1 6 3Z"/>
    </svg>
  );
  if (kind === "chevron") return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 14 6-6 6 6"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11.5a8 8 0 0 1-8.5 8L5 21l1.6-4.3A8 8 0 1 1 20 11.5Z"/>
      <path d="M8 11.5h8M12 7.5v8"/>
    </svg>
  );
}

function ContactMenu({ variant }: { variant: "mobile" | "desktop" }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div ref={root} className={"kv-contact-menu kv-contact-menu--" + variant}>
      <div id={id} className={"kv-contact-options" + (open ? " is-open" : "")}
        role="group" aria-label="روش‌های ارتباط با خوش‌ویزا" aria-hidden={!open} inert={!open}>
        <a className="kv-contact-choice kv-contact-choice--phone"
          href={CONTACT_PHONE_HREF} onClick={() => setOpen(false)}>
          <span className="kv-contact-choice-icon"><Icon kind="phone" /></span>
          <span className="kv-contact-choice-copy"><strong>تماس تلفنی</strong><small dir="ltr">{CONTACT_MOBILE_DISPLAY}</small></span>
          <span className="kv-contact-choice-arrow" aria-hidden="true">←</span>
        </a>
        <a className="kv-contact-choice kv-contact-choice--whatsapp"
          href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
          <span className="kv-contact-choice-icon"><Icon kind="whatsapp" /></span>
          <span className="kv-contact-choice-copy"><strong>اتصال به واتساپ</strong><small>ارسال پیام در واتساپ</small></span>
          <span className="kv-contact-choice-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
      <button ref={trigger} type="button" className="kv-contact-trigger"
        aria-expanded={open} aria-controls={id}
        aria-label={"ارتباط با ما، شماره " + CONTACT_MOBILE_DISPLAY + "؛ نمایش روش‌های ارتباط"}
        onClick={() => setOpen(value => !value)}>
        <span className="kv-contact-trigger-icon"><Icon kind="contact" /></span>
        <span className="kv-contact-trigger-copy"><span>ارتباط با ما</span><b dir="ltr">{CONTACT_MOBILE_DISPLAY}</b></span>
        <span className={"kv-contact-trigger-chevron" + (open ? " is-open" : "")}><Icon kind="chevron" /></span>
      </button>
    </div>
  );
}

export default function ContactActions() {
  return (
    <>
      <div className="kv-contact-desktop" aria-label="ارتباط با خوش‌ویزا"><ContactMenu variant="desktop" /></div>
      <div className="bar kv-contact-mobile">
        <Link className="btn btn-primary kv-contact-apply" href="/consultation/">ثبت درخواست ویزا</Link>
        <ContactMenu variant="mobile" />
      </div>
    </>
  );
}
