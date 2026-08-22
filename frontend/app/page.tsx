import Link from "next/link";
import { LeadForm } from "@/components/LeadForm";
import { getFAQs, getSiteSettings, getTestimonials, getTrustItems } from "@/lib/api";

const agencySchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Ø®ÙØ´ ÙÛØ²Ø§",
  telephone: ["+982146010788", "+989124175574"],
  areaServed: "Tehran",
  address: [
    { "@type": "PostalAddress", streetAddress: "ÙØ¨Ù Ø§Ø² Ù¾Ø§Ø±Ú©âÙÛØ Ø±ÙØ¨ÙâØ±ÙÛ ÙØªÙ Ø§Ø³ØªÙÙØ§Ù", addressLocality: "ØªÙØ±Ø§Ù", addressCountry: "IR" },
    { "@type": "PostalAddress", streetAddress: "Ø¬ÙØªâØ¢Ø¨Ø§Ø¯ ÙØ±Ú©Ø²ÛØ Ø¨ÙÙØ§Ø± Ø¨Ø¹Ø«Øª", addressLocality: "ØªÙØ±Ø§Ù", addressCountry: "IR" },
  ],
};

export default async function Home() {
  const [settings, faqs, testimonials, trustItems] = await Promise.all([getSiteSettings(), getFAQs(), getTestimonials(), getTrustItems()]);
  const disclaimer = settings?.visa_disclaimer ?? "ØªØµÙÛÙ ÙÙØ§ÛÛ ØµØ¯ÙØ± ÙÛØ²Ø§ Ø¨Ø§ Ø³ÙØ§Ø±Øª Ø§Ø³Øª.";
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }} />
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy"><span className="eyebrow">{settings?.hero_eyebrow ?? "ÙØ´Ø§ÙØ±Ù ØªØ®ØµØµÛ Ø³ÙØ±"}</span><h1>{settings?.hero_title ?? "ÙØ³ÛØ± Ø³ÙØ± Ø®Ø§Ø±Ø¬Û Ø±Ø§ ÙØ·ÙØ¦ÙâØªØ± Ù Ø´ÙØ§ÙâØªØ± Ø´Ø±ÙØ¹ Ú©ÙÛØ¯"}</h1><p>{settings?.hero_description ?? "Ø§Ø² Ø§Ø±Ø²ÛØ§Ø¨Û Ø´Ø±Ø§ÛØ· ÙÛØ²Ø§ ØªØ§ Ø§ÙØªØ®Ø§Ø¨ Ù¾Ø±ÙØ§Ø²Ø ÙØªÙ Ù Ø¨Ø±ÙØ§ÙÙ Ø³ÙØ±Ø ÙØ¨Ù Ø§Ø² ÙØ± Ù¾Ø±Ø¯Ø§Ø®ØªØ Ø§Ø·ÙØ§Ø¹Ø§Øª ÙØ§Ø²Ù Ø±Ø§ Ø±ÙØ´Ù Ù ÙØ§Ø¨ÙâÙÙÙ Ø¯Ø±ÛØ§ÙØª ÙÛâÚ©ÙÛØ¯."}</p><div className="actions"><Link className="button" href="/visa">Ø§Ø±Ø²ÛØ§Ø¨Û Ø´Ø±Ø§ÛØ· ÙÛØ²Ø§</Link><Link className="button ghost" href="/tours">ÙØ´Ø§ÙØ¯Ù ÙÙØµØ¯ÙØ§</Link></div><div className="heroTrust"><span>â Ø¨Ø±Ø±Ø³Û Ø§Ø®ØªØµØ§ØµÛ Ù¾Ø±ÙÙØ¯Ù</span><span>â Ø§Ø¹ÙØ§Ù Ø´ÙØ§Ù ÙØ±Ø§Ø­Ù</span><span>â Ø¨Ø¯ÙÙ ÙØ¹Ø¯Ù ÙÛØ²Ø§Û ØªØ¶ÙÛÙÛ</span></div></div>
          <div className="formCard"><h2>Ø¯Ø±Ø®ÙØ§Ø³Øª ÙØ´Ø§ÙØ±Ù Ø§ÙÙÛÙ</h2><LeadForm /></div>
        </div>
      </section>
      <section className="quickFacts"><div className="container factsGrid"><div><strong>ÙÛØ²Ø§Û Ø´ÛÙÚ¯Ù</strong><span>Ø§Ø±Ø²ÛØ§Ø¨Û ÙØ¯Ø§Ø±Ú© Ù Ø³Ø§Ø¨ÙÙ Ø³ÙØ±</span></div><div><strong>ØªÙØ±ÙØ§Û Ø®Ø§Ø±Ø¬Û</strong><span>Ø§ÙØªØ®Ø§Ø¨ ÙØªÙØ§Ø³Ø¨ Ø¨Ø§ Ø¨ÙØ¯Ø¬Ù</span></div><div><strong>Ù¾Ø´ØªÛØ¨Ø§ÙÛ Ø§ÙØ³Ø§ÙÛ</strong><span>Ø§Ø² ÙØ´Ø§ÙØ±Ù ØªØ§ Ø´Ø±ÙØ¹ Ø³ÙØ±</span></div><div><strong>Ø§Ø·ÙØ§Ø¹Ø§Øª Ø¨ÙâØ±ÙØ²</strong><span>ÙÙØ§ÙÛÙØ ÙØ¯Ø§Ø±Ú© Ù Ø¸Ø±ÙÛØªâÙØ§</span></div></div></section>
      {(settings?.home_services_enabled ?? true) && <section className="container section"><div className="sectionHeading"><span className="eyebrow">ÙØ³ÛØ±ÙØ§Û Ø§ØµÙÛ</span><h2>Ø®Ø¯ÙØ§Øª {settings?.brand_name ?? "Ø®ÙØ´ ÙÛØ²Ø§"}</h2></div><div className="cards"><Link className="card" href="/visa/schengen"><h3>ÙÛØ²Ø§Û Ø´ÛÙÚ¯Ù</h3><p>Ø¨Ø±Ø±Ø³Û Ø´Ø±Ø§ÛØ·Ø ÙØ¯Ø§Ø±Ú©Ø ÙÙØª Ø³ÙØ§Ø±Øª Ù Ø¢ÙØ§Ø¯ÙâØ³Ø§Ø²Û Ù¾Ø±ÙÙØ¯Ù.</p></Link><Link className="card" href="/visa/france"><h3>ÙÛØ²Ø§Û ÙØ±Ø§ÙØ³Ù</h3><p>Ø±Ø§ÙÙÙØ§Û Ø§Ø®ØªØµØ§ØµÛ Ø¯Ø±Ø®ÙØ§Ø³Øª ÙÛØ²Ø§Û ØªÙØ±ÛØ³ØªÛ ÙØ±Ø§ÙØ³Ù.</p></Link><Link className="card" href="/tours/dubai"><h3>ØªÙØ± Ø¯Ø¨Û</h3><p>Ø§Ø³ØªØ¹ÙØ§Ù Ù¾Ú©ÛØ¬ Ø¨Ø± Ø§Ø³Ø§Ø³ ØªØ§Ø±ÛØ®Ø Ù¾Ø±ÙØ§Ø² Ù ÙØªÙ Ø¯ÙØ®ÙØ§Ù.</p></Link></div></section>}
      <section className="journeySection"><div className="container section"><div className="sectionHeading"><span className="eyebrow">ÙØ±Ø¢ÛÙØ¯ ÙÙÚ©Ø§Ø±Û</span><h2>Ø§Ø² ØªØµÙÛÙ Ø§ÙÙÛÙ ØªØ§ Ø¢ÙØ§Ø¯ÙâØ´Ø¯Ù Ø¨Ø±Ø§Û Ø³ÙØ±</h2><p>ÙØ±Ø¢ÛÙØ¯ Ø±Ø§ Ú©ÙØªØ§ÙØ Ø´ÙØ§Ù Ù ÙØ§Ø¨Ù Ù¾ÛÚ¯ÛØ±Û ÙÚ¯Ù ÙÛâØ¯Ø§Ø±ÛÙ.</p></div><div className="stepsGrid"><article><b>Û±</b><h3>Ø´ÙØ§Ø®Øª ÙÛØ§Ø² Ø´ÙØ§</h3><p>ÙÙØµØ¯Ø ØªØ§Ø±ÛØ®Ø Ø¨ÙØ¯Ø¬Ù Ù Ø³Ø§Ø¨ÙÙ Ø³ÙØ± Ø¨Ø±Ø±Ø³Û ÙÛâØ´ÙØ¯.</p></article><article><b>Û²</b><h3>Ø§Ø±Ø²ÛØ§Ø¨Û Ù Ù¾ÛØ´ÙÙØ§Ø¯</h3><p>Ø±ÛØ³Ú©âÙØ§Ø ÙØ¯Ø§Ø±Ú© Ù Ú¯Ø²ÛÙÙâÙØ§Û ÙÙØ§Ø³Ø¨ Ø´ÙØ§Ù Ø§Ø¹ÙØ§Ù ÙÛâØ´ÙÙØ¯.</p></article><article><b>Û³</b><h3>ØªÚ©ÙÛÙ Ù Ú©ÙØªØ±Ù</h3><p>ÙØ¯Ø§Ø±Ú© ÛØ§ Ø¬Ø²Ø¦ÛØ§Øª Ù¾Ú©ÛØ¬ ÙØ¨Ù Ø§Ø² Ø§ÙØ¯Ø§Ù ÙÙØ§ÛÛ Ú©ÙØªØ±Ù ÙÛâØ´ÙÙØ¯.</p></article><article><b>Û´</b><h3>ÙÙØ±Ø§ÙÛ ØªØ§ Ø³ÙØ±</h3><p>Ù¾Ø§Ø³Ø® Ù¾Ø±Ø³Ø´âÙØ§ Ù ÙÙØ§ÙÙÚ¯ÛâÙØ§Û ÙØ§Ø²Ù ØªØ§ Ø´Ø±ÙØ¹ Ø³ÙØ± Ø§Ø¯Ø§ÙÙ Ø¯Ø§Ø±Ø¯.</p></article></div></div></section>
      <section className="container section destinationShowcase"><div className="sectionHeading"><span className="eyebrow">ÙÙØµØ¯ÙØ§Û ÙØ­Ø¨ÙØ¨</span><h2>Ø¨Ø±Ø§Û ÙØ± ÙÙØµØ¯Ø ÙØ³ÛØ± Ø¬Ø¯Ø§Ú¯Ø§ÙÙ Ù Ø¯ÙÛÙ</h2></div><div className="destinationGrid"><Link href="/visa/france"><span>ÙØ±Ø§ÙØ³Ù</span><strong>ÙÛØ²Ø§Û ÙØ±Ø§ÙØ³Ù</strong><small>Ø´Ø±Ø§ÛØ·Ø ÙØ¯Ø§Ø±Ú© Ù ÙØ±Ø§Ø­Ù</small></Link><Link href="/visa/italy"><span>Ø§ÛØªØ§ÙÛØ§</span><strong>ÙÛØ²Ø§Û Ø§ÛØªØ§ÙÛØ§</strong><small>Ø§Ø±Ø²ÛØ§Ø¨Û Ù¾Ø±ÙÙØ¯Ù ØªÙØ±ÛØ³ØªÛ</small></Link><Link href="/tours/istanbul"><span>ØªØ±Ú©ÛÙ</span><strong>ØªÙØ± Ø§Ø³ØªØ§ÙØ¨ÙÙ</strong><small>Ù¾Ø±ÙØ§Ø² Ù ÙØªÙ ÙØªÙØ§Ø³Ø¨</small></Link><Link href="/tours/dubai"><span>Ø§ÙØ§Ø±Ø§Øª</span><strong>ØªÙØ± Ø¯Ø¨Û</strong><small>Ø§Ø³ØªØ¹ÙØ§Ù Ù¾Ú©ÛØ¬ Ø³ÙØ±</small></Link></div></section>
      {(settings?.home_trust_enabled ?? true) && trustItems.length > 0 && <section className="container section"><div className="sectionHeading"><h2>ÙØ¬ÙØ²ÙØ§ Ù ÙØ´Ø§ÙÙâÙØ§Û Ø§Ø¹ØªÙØ§Ø¯</h2></div><div className="cards">{trustItems.map((item) => <article className="card" key={item.id}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div></section>}
      {(settings?.home_testimonials_enabled ?? true) && testimonials.length > 0 && <section className="container section softSection"><div className="sectionHeading"><h2>ØªØ¬Ø±Ø¨Ù ÙØ³Ø§ÙØ±Ø§Ù</h2></div><div className="cards">{testimonials.map((item) => <blockquote className="card" key={item.id}><p>{item.text}</p><footer>{item.customer_name}{item.customer_role ? `Ø ${item.customer_role}` : ""} â {"â".repeat(Math.min(item.rating, 5))}</footer></blockquote>)}</div></section>}
      {(settings?.home_faq_enabled ?? true) && faqs.length > 0 && <section className="container section"><div className="sectionHeading"><h2>Ø³Ø¤Ø§ÙØ§Øª ÙØªØ¯Ø§ÙÙ</h2></div><div className="faqList">{faqs.map((item) => <details key={item.id}><summary>{item.question}</sumary><p>{item.answer}</p></details>)}</div></section>}
      <section className="notice"><div className="container"><h2>Ø§Ø±Ø²ÛØ§Ø¨Û ÙØ§ÙØ¹Ù, ÙÙ ÙØ¹Ø¯Ù ÙÛØ²Ø§Û ØªØ¶ÙÛÙÛ</h2><p>{disclaimer}</p></div></section>
    </main>
  );
}
