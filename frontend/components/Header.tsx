import Link from "next/link";
import { getMainMenu, getSiteSettings } from "@/lib/api";
import { MobileNav } from "@/components/MobileNav";

export async function Header() {
  const [settings, menu] = await Promise.all([getSiteSettings(), getMainMenu()]);
  const brand = settings?.brand_name ?? "خوش ویزا";
  const mobile = settings?.mobile ?? "09124175574";
  const cta = settings?.primary_cta_text ?? "مشاوره";
  const items = menu.length ? menu.filter((item) => item.url !== "/") : [
    { id: "visa", label: "خدمات ویزا", url: "/visa", is_external: false, sort_order: 1, children: [] },
    { id: "tours", label: "تورهای خارجی", url: "/tours", is_external: false, sort_order: 2, children: [] },
    { id: "offices", label: "دفاتر فروش", url: "/#offices", is_external: false, sort_order: 3, children: [] },
  ];
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link className="brand" href="/">{settings?.logo ? <img src={settings.logo} alt={brand} /> : brand}</Link>
        <nav className="desktopNav" aria-label="منوی اصلی">
          {items.map((item) => <Link href={item.url} key={item.id}>{item.label}</Link>)}
        </nav>
        <a className="button small headerCta" href={`tel:${mobile}`}>{cta}: {mobile}</a>
        <MobileNav items={items.map(({ id, label, url }) => ({ id: String(id), label, url }))} mobile={mobile} cta={cta} />
      </div>
    </header>
  );
}
