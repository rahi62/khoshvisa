"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header, Footer, StickyBar } from "./home/sections";

/** A single brand-consistent header and footer for every public route. Admin remains independent. */
export default function SiteChrome({ children }: { children: ReactNode }) {
  const path = usePathname();
  const isAdmin = path === "/admin" || path.startsWith("/admin/");
  if (isAdmin) return <>{children}</>;

  return (
    <>
      <div className="kvh kvh-shared-header" dir="rtl"><Header /></div>
      {children}
      <div className="kvh kvh-shared-footer" dir="rtl"><Footer /><StickyBar /></div>
    </>
  );
}
