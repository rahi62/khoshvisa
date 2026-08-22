import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "@/lib/api";
import "./globals.css";
import "./dynamic.css";
import "./v2.css";
import "./mobile-nav-fix.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://khoshvisa.ir"),
    title: { default: settings?.default_meta_title ?? "خوش ویزا | خدمات ویزا و تورهای خارجی", template: "%s | خوش ویزا" },
    description: settings?.default_meta_description ?? "خدمات بررسی و تکمیل پرونده ویزا و رزرو تورهای خارجی در خوش ویزا.",
    verification: settings?.google_site_verification ? { google: settings.google_site_verification } : undefined,
    icons: settings?.favicon ? { icon: settings.favicon } : undefined,
    openGraph: settings?.default_og_image ? { images: [settings.default_og_image] } : undefined,
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings();
  const mobile = settings?.mobile ?? "09124175574";
  const localFont = settings?.font_file;
  const fontName = settings?.font_family_name || "KhoshVisaFont";
  const fontWeight = settings?.font_weight || "100 900";
  const googleFont = !localFont ? settings?.google_font_url : undefined;
  return (
    <html lang="fa" dir="rtl">
      <head>
        {googleFont && <link rel="stylesheet" href={googleFont} />}
        {localFont && <style dangerouslySetInnerHTML={{ __html: `@font-face{font-family:'${fontName.replaceAll("'", "")}';src:url('${localFont}') format('woff2');font-style:normal;font-weight:${fontWeight};font-display:swap}:root{--site-font:'${fontName.replaceAll("'", "")}'}` }} />}
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        {(settings?.mobile_sticky_call_enabled ?? true) && <Link className="mobileCall" href={`tel:${mobile}`}>{settings?.primary_cta_text ?? "تماس و مشاوره"}</Link>}
      </body>
    </html>
  );
}
