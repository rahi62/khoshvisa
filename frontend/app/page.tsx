import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";

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

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }} />
      <section className="hero">
        <div className="container heroGrid">
          <div><span className="eyebrow">مشاوره تخصصی سفر</span><h1>برای ویزا و تور، با اطلاعات شفاف تصمیم بگیرید</h1><p>پرونده ویزای شما را ارزیابی می‌کنیم و برای سفر خارجی، پکیجی متناسب با بودجه و اولویت‌هایتان پیشنهاد می‌دهیم.</p><div className="actions"><Link className="button" href="/visa">خدمات ویزا</Link><Link className="button ghost" href="/tours">مشاهده تورها</Link></div></div>
          <div className="formCard"><h2>درخواست مشاوره اولیه</h2><LeadForm /></div>
        </div>
      </section>
      <section className="container section"><div className="sectionHeading"><span className="eyebrow">مسیرهای اصلی</span><h2>خدمات خوش ویزا</h2></div><div className="cards"><Link className="card" href="/visa/schengen"><h3>ویزای شینگن</h3><p>بررسی شرایط، مدارک، وقت سفارت و آماده‌سازی پرونده.</p></Link><Link className="card" href="/visa/france"><h3>ویزای فرانسه</h3><p>راهنمای اختصاصی درخواست ویزای توریستی فرانسه.</p></Link><Link className="card" href="/tours/dubai"><h3>تور دبی</h3><p>استعلام پکیج بر اساس تاریخ، پرواز و هتل دلخواه.</p></Link></div></section>
      <section className="notice"><div className="container"><h2>ارزیابی واقعی، نه وعده ویزای تضمینی</h2><p>تصمیم نهایی صدور ویزا با سفارت است. ما روی کیفیت مدارک، شفافیت فرایند و کاهش خطاهای پرونده تمرکز می‌کنیم.</p></div></section>
    </main>
  );
}

