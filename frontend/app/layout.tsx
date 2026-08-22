import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteSettings } from "@/lib/api";
import "./globals.css";
import "./dynamic.css";

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
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        {children}
        <Footer />
        {(settings?.mobile_sticky_call_enabled ?? true) && <Link className="mobileCall" href={`tel:${mobile}`}>{settings?.primary_cta_text ?? "تماس و مشاوره"}</Link>}
      </body>
    </html>
  );
}
