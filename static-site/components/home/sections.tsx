import Link from "next/link";
import Image from "next/image";
import { destinations, GUIDE_COUNT } from "@/lib/home-data";
import DestinationChecker from "./DestinationChecker";
import MobileMenu from "./MobileMenu";
import ContactActions from "./ContactActions";

const fa = (n: number) => n.toLocaleString("fa-IR");

export function Header() {
  return (
    <header className="top">
      <div className="wrap">
        <Link className="logo" href="/" aria-label="خوش‌ویزا، صفحه اصلی">
          <Image
            src="/khoshvisa-visa-seal.svg"
            alt="لوگوی خوش‌ویزا"
            width={104}
            height={78}
            priority
            unoptimized
            className="kvh-brand-logo"
          />
        </Link>
        <nav className="nav" aria-label="منوی اصلی">
          <Link href="/destinations/">مقصدها</Link>
          <Link href="/visa-guides/">راهنمای ویزا</Link>
          <Link href="/about/">درباره ما</Link>
        </nav>
        <div className="kv-header-actions"><Link className="btn btn-ghost kv-desktop-contact" href="/consultation/">درخواست ویزا</Link><MobileMenu /></div>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <h1 id="hero-title">برای اخذ ویزای توریستی مقصدت اقدام کن</h1>
          <p className="lead">
            برای ویزای شینگن، کانادا، انگلیس، ژاپن و دیگر مقصدها درخواستت را ثبت کن. شرایط و مدارک اولیه را بررسی می‌کنیم و برای مراحل بعدی با تو هماهنگ می‌شویم.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/consultation/">ثبت درخواست ویزا</Link>
            <Link className="btn btn-ghost" href="/visa-explorer/">مقایسه مقصدها</Link>
          </div>
          <div className="facts">
            <span><b>{fa(destinations.length)}</b> مقصد</span>
            <span><b>{fa(GUIDE_COUNT)}</b> راهنمای کاربردی ویزا</span>
            <span><a href="tel:+989351300502">تماس: ۰۹۳۵۱۳۰۰۵۰۲</a></span>
          </div>
        </div>
        <DestinationChecker />
      </div>
    </section>
  );
}

export function Directory() {
  return (
    <section id="destinations" aria-labelledby="directory-title" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <h2 id="directory-title">خدمات درخواست ویزای توریستی</h2>
            <p className="muted">مقصد سفرت را انتخاب کن، شرایط اولیه را ببین و برای شروع درخواست با ما تماس بگیر.</p>
          </div>
          <Link className="more" href="/destinations/">همه مقصدها</Link>
        </div>
        <div className="dir">
          {destinations.map((d) => (
            <Link key={d.href} href={d.href}>
              <span className="c">{d.name}</span>
              <span className="r">{d.route}</span>
              <span className="go">راهنما</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  ["انتخاب مقصد", "نوع ویزا و هدف سفر را مشخص کن."],
  ["آماده‌سازی مدارک", "مدارک مالی، شغلی و ترجمه را جمع کن."],
  ["ثبت درخواست", "فرم رسمی همان کشور را آنلاین پر کن."],
  ["ارائه اطلاعات", "بیومتریک و تحویل پرونده با وقت قبلی."],
  ["پیگیری رسمی", "وضعیت را فقط از مرجع رسمی دنبال کن."],
] as const;

export function Process() {
  return (
    <section aria-labelledby="process-title" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="head">
          <div>
            <h2 id="process-title">مسیر درخواست در پنج گام</h2>
            <p className="muted">ترتیب کلی برای همه مقصدها یکی است؛ جزئیات هر گام در راهنمای همان کشور آمده.</p>
          </div>
        </div>
        <ol className="steps">
          {steps.map(([title, text]) => (
            <li key={title}>
              <b>{title}</b>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="band" aria-labelledby="trust-title">
      <div className="wrap">
        <h2 id="trust-title" style={{ marginBottom: 32 }}>چرا درخواست ویزایت را با خوش‌ویزا شروع کنی؟</h2>
        <div className="g">
          <div>
            <h3>بررسی شرایط متناسب با مقصد</h3>
            <p>اطلاعات و مدارک موردنیاز را بر اساس مقصد و شرایط اولیه درخواست بررسی می‌کنیم.</p>
          </div>
          <div>
            <h3>ارتباط و پیگیری درخواست</h3>
            <p>با ثبت درخواست، مسیر هماهنگی اولیه و گام‌های بعدی برایت روشن می‌شود.</p>
          </div>
          <div>
            <h3>اطلاع‌رسانی شفاف</h3>
            <p>شرایط و الزامات هر مقصد را شفاف توضیح می‌دهیم؛ تصمیم صدور ویزا با مرجع رسمی است.</p>
          </div>
        </div>
        <p className="note">
          تصمیم نهایی همیشه با مرجع رسمی کشور مقصد است؛ پیش از پرداخت، آخرین مقررات را همان‌جا بررسی کن.
        </p>
      </div>
    </section>
  );
}

export function Consult() {
  return (
    <section aria-labelledby="consult-title">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <div>
          <h2 id="consult-title">برای درخواست ویزا آماده‌ای؟</h2>
          <p className="muted" style={{ marginTop: 8 }}>مقصد و زمان سفرت را ثبت کن تا برای شروع فرآیند هماهنگی کنیم.</p>
        </div>
        <Link className="btn btn-primary" href="/consultation/">ثبت درخواست اخذ ویزا</Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div>
          خوش‌ویزا — ثبت درخواست و هماهنگی خدمات ویزای توریستی
          <br />
          <a href="tel:+989351300502" dir="ltr">۰۹۳۵۱۳۰۰۵۰۲</a>{" · "}<a href="tel:+982146010788" dir="ltr">۰۲۱۴۶۰۱۰۷۸۸</a>
        </div>
        <nav aria-label="پیوندهای پایین صفحه">
          <Link href="/about/">درباره ما</Link>
          <Link href="/contact/">ارتباط با ما</Link>
          <Link href="/privacy/">حریم خصوصی</Link>
        </nav>
      </div>
    </footer>
  );
}

export function StickyBar() {
  return <ContactActions />;
}
