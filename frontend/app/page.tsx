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
          <div><span className="eyebrow">{settings?.hero_eyebrow ?? "مشاوره تخصصی سفر"}</span><h1>{settings?.hero_title ?? "برای ویزا و تور، با اطلاعات شفاف تصمیم بگیرید"}</h1><p>{settings?.hero_description ?? "پرونده ویزای شما را ارزیابی می‌کنیم و برای سفر خارجی، پکیجی متناسب با بودجه و اولویت‌هایتان پیشنهاد می‌دهیم."}</p><div className="actions"><Link className="button" href="/visa">خدمات ویزا</Link><Link className="button ghost" href="/tours">مشاهده تورها</Link></div></div>
          <div className="formCard"><h2>درخواست مشاوره اولیه</h2><LeadForm /></div>
        </div>
      </section>
      {(settings?.home_services_enabled ?? true) && <section className="container section"><div className="sectionHeading"><span className="eyebrow">مسیرهای اصلی</span><h2>خدمات {settings?.brand_name ?? "خوش ویزا"}</h2></div><div className="cards"><Link className="card" href="/visa/schengen"><h3>ویزای شینگن</h3><p>بررسی شرایط، مدارک، وقت سفارت و آماده‌سازی پرونده.</p></Link><Link className="card" href="/visa/france"><h3>ویزای فرانسه</h3><p>راهنمای اختصاصی درخواست ویزای توریستی فرانسه.</p></Link><Link className="card" href="/tours/dubai"><h3>تور دبی</h3><p>استعلام پکیج بر اساس تاریخ، پرواز و هتل دلخواه.</p></Link></div></section>}
      {(settings?.home_trust_enabled ?? true) && trustItems.length > 0 && <section className="container section"><div className="sectionHeading"><h2>مجوزها و نشانه‌های اعتماد</h2></div><div className="cards">{trustItems.map((item) => <article className="card" key={item.id}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>}
      {(settings?.home_testimonials_enabled ?? true) && testimonials.length > 0 && <section className="container section softSection"><div className="sectionHeading"><h2>تجربه مسافران</h2></div><div className="cards">{testimonials.map((item) => <blockquote className="card" key={item.id}><p>{item.text}</p><footer>{item.customer_name}{item.customer_role ? `، ${item.customer_role}` : ""} — {"★".repeat(Math.min(item.rating, 5))}</footer></blockquote>)}</div></section>}
      {(settings?.home_faq_enabled ?? true) && faqs.length > 0 && <section className="container section"><div className="sectionHeading"><h2>سؤالات متداول</h2></div><div className="faqList">{faqs.map((item) => <details key={item.id}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></section>}
      <section className="notice"><div className="container"><h2>ارزیابی واقعی، نه وعده ویزای تضمینی</h2><p>{disclaimer}</p></div></section>
    </main>
  );
}
