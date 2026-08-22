import Link from "next/link";
import { getMainMenu, getSiteSettings } from "@/lib/api";

export async function Header() {
  const [settings, menu] = await Promise.all([getSiteSettings(), getMainMenu()]);
  const brand = settings?.brand_name ?? "خوش ویزا";
  const mobile = settings?.mobile ?? "09124175574";
  const cta = settings?.primary_cta_text ?? "مشاوره";
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link className="brand" href="/">{settings?.logo ? <img src={settings.logo} alt={brand} /> : brand}</Link>
        <nav aria-label="منوی اصلی">
          {(menu.length ? menu.filter((item) => item.url !== "/") : [
            { id: "visa", label: "خدمات ویزا", url: "/visa", is_external: false, sort_order: 1, children: [] },
            { id: "tours", label: "تورهای خارجی", url: "/tours", is_external: false, sort_order: 2, children: [] },
            { id: "offices", label: "دفاتر فروش", url: "/#offices", is_external: false, sort_order: 3, children: [] },
          ]).map((item) => <Link href={item.url} key={item.id}>{item.label}</Link>)}
        </nav>
        <a className="button small" href={`tel:${mobile}`}>{cta}: {mobile}</a>
      </div>
    </header>
  );
}
