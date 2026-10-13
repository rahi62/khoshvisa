"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import type {ReactNode} from "react";
import {whatsappContactHref} from "../lib/whatsapp-contact-link";

function WhatsAppIcon(){
 return <svg className="kv-wa-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M20.7 11.5a8.7 8.7 0 0 1-12.8 7.7L3 20.5l1.5-4.6a8.7 8.7 0 1 1 16.2-4.4Z"/>
  <path d="M8.1 8.1c.2-.4.7-.4 1-.1l1.2 1.2c.3.3.3.7.1 1l-.5.7c.7 1.3 1.8 2.4 3.1 3.1l.7-.5c.3-.2.7-.2 1 .1l1.2 1.2c.3.3.3.8-.1 1-1.1.7-2.3.4-3.8-.3-2.4-1.2-4.2-3-5.2-5.3-.4-.9-.2-1.6.3-2.1Z"/>
 </svg>;
}

/** All public routes share the contact CTA; the private CRM has its own interface. */
export default function SiteChrome({header,footer,children}:{header:ReactNode;footer:ReactNode;children:ReactNode}){
 const path=usePathname();
 const isAdmin=path==="/admin"||path.startsWith("/admin/");
 if(isAdmin)return <>{children}</>;

 const href=whatsappContactHref(path);
 return <>{header}{children}{footer}
  <nav className="mobileDock" aria-label="دسترسی سریع">
   <Link href="/destinations/">⌕ <span>مقصدها</span></Link>
   <Link href={href} className="kv-wa-dock-link"><WhatsAppIcon/><span>ارتباط واتساپ</span></Link>
  </nav>
  <Link href={href} className="kv-wa-floating"><WhatsAppIcon/><span>ارتباط واتساپ</span></Link>
 </>;
}
