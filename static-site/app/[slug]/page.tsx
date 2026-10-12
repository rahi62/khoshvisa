import Link from "next/link";
import {notFound} from "next/navigation";
import {visas} from "../../lib/content";
import {AnimatedSteps} from "../../components/KV3Journey";
import {Reveal} from "../../components/CinematicMotion";
export function generateStaticParams(){return visas.map(v=>({slug:v.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const v=visas.find(x=>x.slug===slug);return {title:v?"ویزای توریستی "+v.name+" | شرایط، مدارک و مراحل":"ویزای توریستی",description:v?.summary,alternates:{canonical:"/"+slug+"/"}}}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const visa=visas.find(v=>v.slug===slug);if(!visa)notFound();
 return <main className="kv3-visa-page">
 <section className="kv3-visa-hero" style={{backgroundImage:"linear-gradient(270deg,#061a2cf0,#061a2c9d 55%,#061a2c35),url('"+visa.photo+"')",viewTransitionName:"kv-visa-"+visa.slug}}>
 <div className="kv3-container kv3-visa-intro"><div className="kv3-visa-crumb"><Link href="/">خوش‌ویزا</Link><span> / </span><Link href="/destinations/">مقصدها</Link><span> / </span>{visa.name}</div><span className="kv3-eyebrow">VISAS & DESTINATIONS • {visa.region}</span><h1>ویزای توریستی<br/><em>{visa.name}</em></h1><p>{visa.intro}</p><div className="kv3-visa-hero-actions"><Link href="/visa-readiness/" className="kv3-button kv3-button-gold">بررسی اولیه مسیر ویزا ↗</Link><a href={visa.source} target="_blank" rel="noopener noreferrer" className="kv3-button kv3-button-outline">اطلاعات مرجع رسمی ↗</a></div></div><span className="kv3-visa-hero-number" aria-hidden="true">{visa.flag}</span></section>
 <nav className="kv3-visa-subnav" aria-label="بخش‌های راهنمای ویزا"><div className="kv3-container"><a href="#requirements">معرفی و شرایط</a><a href="#documents">مدارک لازم</a><a href="#steps">مراحل اقدام</a><a href="#fees">هزینه‌ها</a><a href="#faq">سؤالات متداول</a></div></nav>
 <div className="kv3-container kv3-visa-columns"><article className="kv3-visa-content">
 <div className="kv3-visa-disclaimer">راهنمای عمومی و غیرتضمینی • برای مقررات به‌روز به مرجع رسمی کشور مقصد رجوع کنید.</div>
 <section id="requirements"><Reveal><span className="kv3-eyebrow">01 — REQUIREMENTS</span><h2>شرایط ویزای توریستی {visa.name}</h2></Reveal><p>{visa.summary}</p></section>
 <section id="documents"><Reveal><span className="kv3-eyebrow">02 — DOCUMENTS</span><h2>مدارک مورد نیاز</h2></Reveal><p>فهرست زیر مقدماتی است. مدارک دقیق بر اساس هدف سفر، شرایط فردی و دستورالعمل مرجع رسمی مشخص می‌شوند.</p><div className="kv3-visa-docs">{visa.documents.map((doc,i)=><div key={doc}><span>{new Intl.NumberFormat("fa-IR",{minimumIntegerDigits:2}).format(i+1)}</span><strong>{doc}</strong></div>)}</div></section>
 <section id="steps"><Reveal><span className="kv3-eyebrow">03 — YOUR ROADMAP</span><h2>مسیر درخواست ویزا</h2></Reveal><AnimatedSteps steps={visa.steps}/></section>
 <section id="fees"><Reveal><span className="kv3-eyebrow">04 — FEES & TIMELINE</span><h2>هزینه و زمان بررسی</h2></Reveal><p>مبالغ رسمی، هزینه خدمات مرکز درخواست و دستمزد مشاوره باید جداگانه بررسی شوند. مدت رسیدگی و امکان رزرو وقت نیز تغییر می‌کند. برای مبلغ و زمان فعلی از منابع رسمی استفاده کنید.</p><a href={visa.source} target="_blank" rel="noopener noreferrer" className="kv3-source-link">مشاهده اطلاعات مرجع رسمی ↗</a></section>
 <section id="faq"><Reveal><span className="kv3-eyebrow">05 — QUESTIONS</span><h2>پرسش‌های متداول</h2></Reveal><div className="kv3-visa-faq">{visa.questions.map(x=><details key={x.q}><summary>{x.q}<span>＋</span></summary><p>{x.a}</p></details>)}</div></section>
 <div className="kv3-visa-source"><strong>منبع رسمی ویزای {visa.name}</strong><p>محتوای این صفحه جایگزین دستورالعمل رسمی سفارت یا سازمان مهاجرت نیست.</p><a href={visa.source} target="_blank" rel="noopener noreferrer">ورود به وب‌سایت مرجع رسمی ↗</a></div>
 </article><aside className="kv3-visa-sidebar"><div className="kv3-visa-sticky"><span className="kv3-eyebrow">START YOUR JOURNEY</span><h3>برای سفر به {visa.name} برنامه داری؟</h3><p>مراحل و مدارک اولیه را بررسی کن و با اطلاعات رسمی تصمیم بگیر.</p><Link href="/visa-readiness/" className="kv3-button kv3-button-gold">بررسی اولیه مسیر ←</Link><div><Link href="/destinations/">← همه مقصدها</Link><Link href="/visa-explorer/">مقایسه ویزاها ↗</Link></div></div></aside></div>
 </main>
}