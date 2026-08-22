import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { getFAQs, getSiteSettings, getTestimonials, getTrustItems } from "@/lib/api";

const agencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "خوش ویزا",
  telephone: ["+982146010788", "+989124175574"],
  areaServed: "Tehran",
  address: [
    { "@type": "PostalAddress", streetAddress: "قبل از پارک‌وی، روبه‌روی هتل استقلال", addressLocality: "تهران", addressCountry: "IR" },
    { "@type": "PostalAddress", streetAddress: "جنت‌آباد مرکزی، بلوار بعثت", addressLocality: "تهران", addressCountry: "IR" },
  ],
};

export default async function Home() {
  const [settings, faqs, testimonials, trustItems] = await Promise.all([getSiteSettings(), getFAQs(), getTestimonials(), getTrustItems()]);
  const disclaimer = settings?.visa_disclaimer ?? "تصمیم نهایی صدور ویزا با سفارت است.";
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }} />
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy"><span className="eyebrow">{settings?.hero_eyebrow ?? "مشاوره تخصصی سفر"}</span><h1>{settings?.hero_title ?? "مسیر سفر خارجی را مطمئن‌تر و شفاف‌تر شروع کنید"}</h1><p>{settings?.hero_description ?? "از ارزیابی شرایط ویزا تا انتخاب پرواز، هتل و برنامه سفر؛ قبل از هر پرداخت، اطلاعات لازم را روشن و قابل‌فهم دریافت می‌کنید."}</p><div className="actions"><Link className="button" href="/visa">ارزیابی شرایط ویزا</Link><Link className="button ghost" href="/tours">مشاهده مقصدها</Link></div><div className="heroTrust"><span>✓ بررسی اختصاصی پرونده</span><span>✓ اعلام شفاف مراحل</span><span>✓ بدون وعده ویزای تضمینی</span></div></div>
          <div className="formCard"><h2>درخواست مشاوره اولیه</h2><LeadForm /></div>
        </div>
      </section>
      <section className="quickFacts"><div className="container factsGrid"><div><strong>ویزای شینگن</strong><span>ارزیابی مدارک و سابقه سفر</span></div><div><strong>تورهای خارجی</strong><span>انتخاب متناسب با بودجه</span></div><div><strong>پشتیبانی انسانی</strong><span>از مشاوره تا شروع سفر</span></div><div><strong>اطلاعات به‌روز</strong><span>قوانین، مدارک و ظرفیت‌ها</span></div></div></section>
      {(settings?.home_services_enabled ?? true) && <section className="container section"><div className="sectionHeading"><span className="eyebrow">مسیرهای اصلی</span><h2>خدمات {settings?.brand_name ?? "خوش ویزا"}</h2></div><div className="cards"><Link className="card" href="/visa/schengen"><h3>ویزای شینگن</h3><p>بررسی شرایط، مدارک، وقت سفارت و آماده‌سازی پرونده.</p></Link><Link className="card" href="/visa/france"><h3>ویزای فرانسه</h3><p>راهنمای اختصاصی درخواست ویزای توریستی فرانسه.</p></Link><Link className="card" href="/tours/dubai"><h3>تور دبی</h3><p>استعلام پکیج بر اساس تاریخ، پرواز و هتل دلخواه.</p></Link></div></section>}
      <section className="journeySection"><div className="container section"><div className="sectionHeading"><span className="eyebrow">فرآیند همکاری</span><h2>از تصمیم اولیه تا آماده‌شدن برای سفر</h2><p>فرآیند را کوتاه، شفاف و قابل پیگیری نگه می‌داریم.</p></div><div className="stepsGrid"><article><b>۱</b><h3>شناخت نیاز شما</h3><p>مقصد، تاریخ، بودجه و سابقه سفر بررسی می‌شود.</p></article><article><b>۲</b><h3>ارزیابی و پیشنهاد</h3><p>ریسک‌ها، مدارک و گزینه‌های مناسب شفاف اعلام می‌شوند.</p></article><article><b>۳</b><h3>تکمیل و کنترل</h3><p>مدارک یا جزئیات پکیج قبل از اقدام نهایی کنترل می‌شوند.</p></article><article><b>۴</b><h3>همراهی تا سفر</h3><p>پاسخ پرسش‌ها و هماهنگی‌های لازم تا شروع سفر ادامه دارد.</p></article></div></div></section>
      <section className="container section destinationShowcase"><div className="sectionHeading"><span className="eyebrow">مقصدهای محبوب</span><h2>برای هر مقصد، مسیر جداگانه و دقیق</h2></div><div className="destinationGrid"><Link href="/visa/france"><span>فرانسه</span><strong>ویزای فرانسه</strong><small>شرایط، مدارک و مراحل</small></Link><Link href="/visa/italy"><span>ایتالیا</span><strong>ویزای ایتالیا</strong><small>ارزیابی پرونده توریستی</small></Link><Link href="/tours/istanbul"><span>ترکیه</span><strong>تور استانبول</strong><small>پرواز و هتل متناسب</small></Link><Link href="/tours/dubai"><span>امارات</span><strong>تور دبی</strong><small>استعلام پکیج سفر</small></Link></div></section>
      {(settings?.home_trust_enabled ?? true) && trustItems.length > 0 && <section className="container section"><div className="sectionHeading"><h2>مجوزها و نشانه‌های اعتماد</h2></div><div className="cards">{trustItems.map((item) => <article className="card" key={item.id}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>}
      {(settings?.home_testimonials_enabled ?? true) && testimonials.length > 0 && <section className="container section softSection"><div className="sectionHeading"><h2>تجربه مسافران</h2></div><div className="cards">{testimonials.map((item) => <blockquote className="card" key={item.id}><p>{item.text}</p><footer>{item.customer_name}{item.customer_role ? `، ${item.customer_role}` : ""} — {"★".repeat(Math.min(item.rating, 5))}</footer></blockquote>)}</div></section>}
      {(settings?.home_faq_enabled ?? true) && faqs.length > 0 && <section className="container section"><div className="sectionHeading"><h2>سؤالات متداول</h2></div><div className="faqList">{faqs.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>}
      <section className="notice"><div className="container"><h2>ارزیابی واقعی، نه وعده ویزای تضمینی</h2><p>{disclaimer}</p></div></section>
    </main>
  );
}
