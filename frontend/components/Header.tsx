import Link from "next/link";

export function Header() {
  return (
    <header className="siteHeader">
      <div className="container headerInner">
        <Link className="brand" href="/">خوش ویزا</Link>
        <nav aria-label="منوی اصلی">
          <Link href="/visa">خدمات ویزا</Link>
          <Link href="/tours">تورهای خارجی</Link>
          <Link href="/#offices">دفاتر فروش</Link>
        </nav>
        <a className="button small" href="tel:09124175574">مشاوره: ۰۹۱۲۴۱۷۵۵۷۴</a>
      </div>
    </header>
  );
}

