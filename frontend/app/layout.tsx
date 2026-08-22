import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://khoshvisa.ir"),
  title: { default: "خوش ویزا | خدمات ویزا و تورهای خارجی", template: "%s | خوش ویزا" },
  description: "خدمات بررسی و تکمیل پرونده ویزا و رزرو تورهای خارجی از دو دفتر فروش خوش ویزا در تهران.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <Header />
        {children}
        <footer id="offices">
          <div className="container footerGrid">
            <div><strong>خوش ویزا</strong><p>مشاوره و خدمات تور و ویزا، بدون ادعای صدور تضمینی.</p></div>
            <div><strong>دفتر شمال تهران</strong><p>قبل از پارک‌وی، روبه‌روی هتل استقلال</p></div>
            <div><strong>دفتر غرب تهران</strong><p>جنت‌آباد مرکزی، بلوار بعثت</p></div>
            <div><a href="tel:02146010788">۰۲۱۴۶۰۱۰۷۸۸</a><br /><a href="tel:09124175574">۰۹۱۲۴۱۷۵۵۷۴</a></div>
          </div>
        </footer>
        <Link className="mobileCall" href="tel:09124175574">تماس و مشاوره</Link>
      </body>
    </html>
  );
}

