import type { Metadata } from "next";
import "./style.css";
import "./reference.css";
import "./cinematic.css";
import "./cinematic-v2.css";
import "./kv3.css";
import "./visa-pillar.css";
import "./whatsapp.css";
import "./destination-fixes.css";
import "./brand.css";
import "../styles/home.css";
import "./editorial-site.css";
import SiteChrome from "../components/SiteChrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://khoshvisa.ir"),
  title: { default: "خوش‌ویزا | ثبت درخواست ویزای توریستی", template: "%s | خوش‌ویزا" },
  description: "ثبت درخواست ویزای توریستی شینگن، کانادا، انگلیس، ژاپن و دیگر مقصدها؛ بررسی شرایط و مدارک و هماهنگی مراحل درخواست.",
  openGraph: { type: "website", locale: "fa_IR", siteName: "خوش‌ویزا" },
  icons: { icon: [{ url: "/icon.svg?v=2", type: "image/svg+xml" }], shortcut: ["/icon.svg?v=2"] },
  robots: { index: true, follow: true },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fa" dir="rtl"><body><SiteChrome>{children}</SiteChrome></body></html>;
}
