import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "@/lib/api";
import "./globals.css";
import "./dynamic.css";
import "./v2.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://khoshvisa.ir"),
    title: { default: settings?.default_meta_title ?? "Ø®ÙØ´ ÙÛØ²Ø§ | Ø®Ø¯ÙØ§Øª ÙÛØ²Ø§ Ù ØªÙØ±ÙØ§Û Ø®Ø§Ø±Ø¬Û", template: "%s | Ø®ÙØ´ ÙÛØ²Ø§" },
    description: settings?.default_meta_description ?? "Ø®Ø¯ÙØ§Øª Ø¨Ø±Ø±Ø³Û Ù ØªÚ©ÙÛÙ Ù¾Ø±ÙÙØ¯Ù ÙÛØ²Ø§ Ù Ø±Ø²Ø±Ù ØªÙØ±ÙØ§Û Ø®Ø§Ø±Ø¬Û Ø¯Ø± Ø®ÙØ´ ÙÛØ²Ø§.",
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
        {(settings?.mobile_sticky_call_enabled ?? true) && <Link className="mobileCall" href={`tel:${mobile}`}>{settings?.primary_cta_text ?? "ØªÙØ§Ø³ Ù ÙØ´Ø§ÙØ±Ù"}</Link>}
      </body>
    </html>
  );
}
