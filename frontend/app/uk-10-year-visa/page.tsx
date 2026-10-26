import type { Metadata } from "next";
import Link from "next/link";
import styles from "./landing.module.css";

const phoneMobile = "09351300502";
const phoneOffice = "02146010788";

export const metadata: Metadata = {
  title: "ویزای ۱۰ ساله انگلیس ویژه پزشکان | شرایط و تضمین عودت وجه",
  description: "آشنایی با خدمات درخواست ویزای بلندمدت ۱۰ ساله انگلیس ویژه پزشکان و شرایط تضمین عودت وجه خدمات. برای اطلاع از جزئیات تماس بگیرید.",
  alternates: { canonical: "/uk-10-year-visa/" },
  openGraph: {
    title: "ویزای ۱۰ ساله انگلیس ویژه پزشکان | خوش‌ویزا",
    description: "شرایط ویژه درخواست ویزای بلندمدت انگلیس و اطلاع از جزئیات عودت وجه با تماس مستقیم.",
    type: "website",
  },
};

const faq = [
  { q: "آیا ویزای ۱۰ ساله انگلیس مخصوص پزشکان است؟", a: "خیر. ویزای بلندمدت بازدیدکننده انگلیس برای گروه‌های مختلف متقاضیان وجود دارد. این صفحه به معرفی خدمات ویژه مخاطبان پزشک اختصاص دارد." },
  { q: "با ویزای ۱۰ ساله چه مدت می‌توان در انگلیس ماند؟", a: "اعتبار ۱۰ساله به معنی اقامت پیوسته ۱۰ سال نیست؛ اقامت در هر نوبت معمولاً حداکثر شش ماه است و رعایت شرایط ویزا الزامی است." },
  { q: "تضمین عودت وجه شامل چه مواردی می‌شود؟", a: "دامنه، شرایط و استثناهای عودت وجه در قرارداد خدمات مشخص می‌شود. برای دریافت توضیحات دقیق پیش از اقدام با ما تماس بگیرید." },
  { q: "آیا دریافت ویزا تضمینی است؟", a: "خیر. تصمیم درباره صدور و مدت اعتبار ویزا تنها با مراجع رسمی بریتانیا است." },
];

export default function UkTenYearDoctorsPage() {
  return (
    <main className={styles.root}>
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <span className={styles.eyebrow}>خوش‌ویزا | خدمات ویژه متقاضیان پزشک</span>
            <h1 className={styles.heading}>ویزای ۱۰ ساله انگلیس <span className={styles.highlight}>ویژه پزشکان</span></h1>
            <p className={styles.lead}>برای سفرهای متعدد به بریتانیا برنامه دارید؟ شرایط درخواست ویزای بلندمدت انگلیس و خدمات اختصاصی ویژه پزشکان را بررسی کنید.</p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href={`tel:${phoneMobile}`}>تماس و دریافت شرایط ویژه</a>
              <a className={styles.secondary} href={`tel:${phoneOffice}`}>تماس با دفتر</a>
            </div>
            <p className={styles.micro}>اطلاع از جزئیات طرح و شرایط قرارداد از طریق تماس مستقیم</p>
          </div>
          <aside className={styles.offer} aria-label="شرایط عودت وجه">
            <span className={styles.offerIcon} aria-hidden="true">✓</span>
            <h2>با تضمین عودت وجه*</h2>
            <p>جزئیات شرایط اختصاصی خدمات و ضمانت بازگشت وجه را پیش از ثبت درخواست، تلفنی دریافت کنید.</p>
            <div className={styles.rule} />
            <strong>چطور شامل این طرح می‌شوید؟</strong>
            <p>برای اطلاع از شرایط و جزئیات قرارداد با خوش‌ویزا تماس بگیرید.</p>
            <a href={`tel:${phoneMobile}`} className={styles.primary}>استعلام تلفنی شرایط</a>
            <p className={styles.micro}>*تضمین عودت وجه، مشروط به مفاد قرارداد خدمات و دامنه تعهدات ارائه‌دهنده است؛ صدور ویزا تضمین نمی‌شود.</p>
          </aside>
        </div>
      </section>
      <section className={`${styles.section} ${styles.wrap}`}>
        <span className={styles.eyebrow}>خدمات هدفمند برای پزشکان</span>
        <h2 className={styles.sectionTitle}>یک مسیر روشن برای شروع درخواست</h2>
        <p className={styles.intro}>خدمات این کمپین برای پزشکان متقاضی سفر بلندمدت و چندباره به بریتانیا معرفی شده است. شرایط هر پرونده، مدارک و تناسب نوع ویزا باید به‌صورت جداگانه بررسی شود.</p>
        <div className={styles.cards}>
          <article className={styles.card}><span className={styles.number}>۰۱</span><b>بررسی اولیه شرایط</b><p>بررسی هدف سفر و پیش‌نیازهای درخواست ویزای بلندمدت متناسب با موقعیت متقاضی.</p></article>
          <article className={styles.card}><span className={styles.number}>۰۲</span><b>اطلاع از خدمات ویژه</b><p>دریافت توضیح درباره فرایند خدمات، مدارک موردنیاز و مراحل اقدام.</p></article>
          <article className={styles.card}><span className={styles.number}>۰۳</span><b>شفاف‌سازی عودت وجه</b><p>اطلاع از جزئیات تضمین عودت وجه و مفاد قرارداد پیش از شروع همکاری.</p></article>
        </div>
      </section>
      <section className={styles.band}>
        <div className={`${styles.wrap} ${styles.twoCol}`}>
          <div>
            <span className={styles.eyebrow}>ویزای بلندمدت بازدیدکننده</span>
            <h2 className={styles.sectionTitle}>برای سفرهای چندباره، نه اقامت دائم</h2>
            <p className={styles.intro}>ویزای Long-term Standard Visitor بریتانیا ممکن است با اعتبار ۲، ۵ یا ۱۰ سال صادر شود. درخواست اعتبار ۱۰ساله به معنی تضمین صدور همان اعتبار نیست.</p>
            <ul className={styles.list}><li>قابل استفاده برای سفرهای مکرر در دوره اعتبار ویزا</li><li>اقامت در هر سفر معمولاً تا ۶ ماه</li><li>بررسی درخواست و تصمیم نهایی توسط مراجع بریتانیا</li></ul>
          </div>
          <div className={styles.ctaPanel}>
            <h2>شرایط ویژه پزشکان را استعلام بگیرید</h2>
            <p className={styles.intro}>برای اطلاع از جزئیات خدمات و تضمین عودت وجه، مستقیم تماس بگیرید.</p>
            <a className={styles.primary} href={`tel:${phoneMobile}`}>تماس با {phoneMobile}</a>
            <p>شماره ثابت: <a href={`tel:${phoneOffice}`}>{phoneOffice}</a></p>
          </div>
        </div>
      </section>
      <section className={`${styles.section} ${styles.wrap}`}>
        <div className={styles.faq}>
          <h2 className={styles.sectionTitle}>پرسش‌های پرتکرار</h2>
          {faq.map(({ q, a }) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          <p className={styles.legal}>اطلاعات این صفحه صرفاً برای معرفی خدمات است. پرداخت هزینه‌های دولتی ویزا از تعهدات تجاری عودت وجهِ ارائه‌دهنده خدمات متمایز است؛ پوشش دقیق هر پرداخت باید در قرارداد تصریح شود. <a href="https://www.gov.uk/standard-visitor/apply-standard-visitor-visa" target="_blank" rel="noopener noreferrer">مشاهده راهنمای رسمی دولت بریتانیا</a></p>
          <p><Link href="/visa">مشاهده سایر خدمات ویزا</Link></p>
        </div>
      </section>
      <a className={styles.mobileCTA} href={`tel:${phoneMobile}`}>تماس فوری | استعلام شرایط ویژه</a>
    </main>
  );
}
