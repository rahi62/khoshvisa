import Link from "next/link";
import Image from "next/image";
import { destinations, GUIDE_COUNT } from "@/lib/home-data";
import DestinationChecker from "./DestinationChecker";

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
          <Link href="/visa-guides/">مجله</Link>
          <Link href="/editorial-policy/">روش بررسی محتوا</Link>
          <Link href="/about/">درباره ما</Link>
        </nav>
        <Link className="btn btn-ghost" href="/contact/">ارتباط با ما</Link>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <h1 id="hero-title">ویزای توریستی را با منبع رسمی و قدم‌به‌قدم بشناس</h1>
          <p className="lead">
            مدارک، هزینه و مسیر درخواست ویزای هشت مقصد پرمراجعه برای ایرانیان؛ هر مطلب با پیوند به مرجع رسمی همان کشور.
          </p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/visa-readiness/">شروع بررسی اولیه</Link>
            <Link className="btn btn-ghost" href="/visa-explorer/">مقایسه مقصدها</Link>
          </div>
          <div className="facts">
            <span><b>{fa(destinations.length)}</b> مقصد</span>
            <span><b>{fa(GUIDE_COUNT)}</b> راهنمای مستند</span>
            <span>لینک مستقیم به مراجع رسمی</span>
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
            <h2 id="directory-title">راهنمای ویزای همه مقصدها</h2>
            <p className="muted">هر کشور مدارک و مسیر اختصاصی دارد. مقصد را انتخاب کن و راهنمایش را بخوان.</p>
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
        <h2 id="trust-title" style={{ marginBottom: 32 }}>چرا می‌شود به این راهنماها تکیه کرد؟</h2>
        <div className="g">
          <div>
            <h3>منبع رسمی در هر مطلب</h3>
            <p>هزینه‌ها و مدارک از سایت سفارت یا مرکز رسمی همان کشور گرفته می‌شود و پیوند آن در مطلب هست.</p>
          </div>
          <div>
            <h3>روش بررسی شفاف</h3>
            <p>نحوه جمع‌آوری، بازبینی و بروزرسانی محتوا در صفحه «روش بررسی محتوا» توضیح داده شده است.</p>
          </div>
          <div>
            <h3>مرز مشخص با سفارت</h3>
            <p>خوش‌ویزا نماینده سفارت یا صادرکننده ویزا نیست و نتیجه‌ای را تضمین نمی‌کند.</p>
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
          <h2 id="consult-title">سؤال داری؟ از همین‌جا شروع کن.</h2>
          <p className="muted" style={{ marginTop: 8 }}>پیش از هر اقدام، وضعیتت را با ما در میان بگذار.</p>
        </div>
        <Link className="btn btn-primary" href="/consultation/">شروع ارتباط با خوش‌ویزا</Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div>
          خوش‌ویزا — پلتفرم مستقل اطلاعات ویزای توریستی
          <br />
          ۰۹۳۵۱۳۰۰۵۰۲ · ۰۲۱۴۶۰۱۰۷۸۸
        </div>
        <nav aria-label="پیوندهای پایین صفحه">
          <Link href="/about/">درباره ما</Link>
          <Link href="/contact/">ارتباط با ما</Link>
          <Link href="/privacy/">حریم خصوصی</Link>
          <Link href="/editorial-policy/">روش بررسی محتوا</Link>
        </nav>
      </div>
    </footer>
  );
}

export function StickyBar() {
  return (
    <div className="bar">
      <Link className="btn btn-primary" href="/visa-readiness/">بررسی اولیه</Link>
      <Link className="btn btn-ghost" href="/consultation/">ارتباط با ما</Link>
    </div>
  );
}
