import Link from "next/link";
import type {Visa} from "../lib/content";
import type {VisaProfile} from "../lib/visa-profiles";

const sections=[
 ["overview","معرفی و شرایط"],["facts","هزینه و زمان"],["documents","مدارک لازم"],
 ["apply","مراحل اقدام"],["iran","نکات متقاضی ایرانی"],
 ["risks","خطاهای رایج"],["faq","سؤالات متداول"],["sources","منابع رسمی"]
];
function SourceList({profile}:{profile:VisaProfile}){
 return <section id="sources" className="seo-pillar-sources"><span className="seo-overline">REFERENCE & FACT CHECK</span><h2>منابع رسمی و تاریخ بررسی</h2><p>محتوای این صفحه بر اساس منابع دولتی زیر در تاریخ <time dateTime="2026-10-12">{profile.reviewed}</time> مرور شده است. قوانین، هزینه‌ها، خدمات مراکز درخواست و زمان رسیدگی قابل تغییرند؛ قبل از اقدام منبع اصلی را دوباره بررسی کنید.</p>
 <ul>{profile.sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<span aria-hidden="true">↗</span></a></li>)}</ul><p className="seo-pillar-disclaimer">اطلاعات منتشرشده راهنمای عمومی است، توصیه حقوقی شخصی یا تضمین صدور ویزا نیست. تصمیم نهایی را مرجع رسمی کشور مقصد اتخاذ می‌کند.</p></section>;
}
export function VisaPillarPage({visa,profile}:{visa:Visa;profile:VisaProfile}){
 const breadcrumbs=[{name:"خانه",href:"/"},{name:"مقصدهای ویزا",href:"/destinations/"},{name:"ویزای "+visa.name,href:"/"+visa.slug+"/"}];
 const ld={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:breadcrumbs.map((b,i)=>({"@type":"ListItem",position:i+1,name:b.name,item:"https://khoshvisa.ir"+b.href}))};
 return <main className="seo-pillar">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld).replace(/</g,"\\u003c")}}/>
  <header className="seo-pillar-hero" style={{backgroundImage:"linear-gradient(270deg,rgba(5,24,41,.97) 0%,rgba(7,30,48,.89) 50%,rgba(7,30,48,.38) 100%),url('"+visa.photo+"')"}}>
  <div className="seo-container">
  <nav className="seo-breadcrumb" aria-label="مسیر صفحه">{breadcrumbs.map((b,i)=><span key={b.href}>{i>0&&<span aria-hidden="true"> / </span>}{i===breadcrumbs.length-1?<span aria-current="page">{b.name}</span>:<Link href={b.href}>{b.name}</Link>}</span>)}</nav>
  <span className="seo-hero-kicker">{visa.flag} راهنمای ویزای توریستی · اطلاعات مستند</span>
  <h1>{profile.primaryKeyword}؛ شرایط، مدارک و هزینه‌ها</h1>
  <p>{profile.subtitle}</p><div className="seo-hero-actions">
   <a className="seo-button seo-button-gold" href="#facts">هزینه و شرایط را ببینید <span aria-hidden="true">↓</span></a>
   <Link className="seo-button seo-button-outline" href="/visa-readiness/">چک‌لیست اولیه سفر ←</Link></div>
   <small>تاریخ آخرین بررسی منابع: <time dateTime="2026-10-12">{profile.reviewed}</time> · اطلاعات ممکن است تغییر کند.</small></div></header>
  <nav className="seo-pillar-mobile-nav" aria-label="فهرست بخش‌های راهنمای ویزا"><div className="seo-container">{sections.map(([id,label])=><a key={id} href={"#"+id}>{label}</a>)}</div></nav>
  <div className="seo-container seo-pillar-layout">
   <article className="seo-pillar-main">
    <section id="overview" className="seo-section">
      <span className="seo-overline">OVERVIEW / معرفی</span><h2>ویزای {visa.name} برای چه کسانی مناسب است؟</h2>
      {profile.overview.map(p=><p key={p}>{p}</p>)}
      <div className="seo-inline-hint"><strong>مهم:</strong> این راهنما جایگزین چک‌لیست صادرشده برای پرونده شخصی یا دستورالعمل سفارت نیست. در صورت تعارض، اعلامیه رسمی مربوط به وضعیت شما ملاک است.</div>
    </section>
    <section id="facts" className="seo-section">
      <span className="seo-overline">QUICK FACTS / اطلاعات سریع</span><h2>هزینه، زمان رسیدگی و مشخصات کلیدی</h2>
      <div className="seo-fact-grid">{profile.quick.map(f=><div className="seo-fact" key={f.label}><span>{f.label}</span><strong>{f.value}</strong>{f.note&&<small>{f.note}</small>}{f.source&&<a href={f.source} target="_blank" rel="noopener noreferrer">استعلام از مرجع رسمی ↗</a>}</div>)}</div>
      <p className="seo-footnote">ارقام ذکرشده هزینه رسمی دولتی هستند و لزوماً شامل خدمات مرکز درخواست، ترجمه، بیمه یا خدمات خصوصی نمی‌شوند. مبالغ، مهلت‌ها و زمان‌های اعلام‌شده را در تاریخ اقدام بازبینی کنید.</p>
    </section>
    <section id="requirements" className="seo-section">
      <span className="seo-overline">ELIGIBILITY / شرایط پرونده</span><h2>شرایط و الزامات اصلی</h2>
      <div className="seo-article-list">{profile.requirements.map((item,i)=><div key={item.title}><span className="seo-list-num">{String(i+1).padStart(2,"0")}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></div>)}</div>
    </section>
    <section id="documents" className="seo-section">
      <span className="seo-overline">CHECKLIST / مدارک</span><h2>مدارک موردنیاز و نحوه آماده‌سازی</h2>
      <p>مدارک زیر برای شناخت گروه‌های اصلی پرونده‌اند. فهرست نهایی بسته به وضعیت فردی و سامانه یا نمایندگی رسیدگی‌کننده متفاوت است.</p>
      <div className="seo-doc-grid">{profile.documents.map((item,i)=><div key={item.title} className="seo-doc-card"><span>{new Intl.NumberFormat("fa-IR",{minimumIntegerDigits:2}).format(i+1)}</span><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
      <p className="seo-related-inline">راهنمای مرتبط: <Link href="/visa-guides/visa-documents/">چک‌لیست مدارک ویزای توریستی و نحوه تنظیم مدارک ←</Link></p>
    </section>
    <section id="apply" className="seo-section">
      <span className="seo-overline">APPLICATION / مراحل اقدام</span><h2>مراحل درخواست ویزای {visa.name}</h2>
      <ol className="seo-timeline">{profile.procedures.map((item,i)=><li key={item.title}><span>{new Intl.NumberFormat("fa-IR",{minimumIntegerDigits:2}).format(i+1)}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></li>)}</ol>
    </section>
    <section id="iran" className="seo-section">
      <span className="seo-overline">IRANIAN APPLICANTS / متقاضی ساکن ایران</span><h2>نکات مهم برای متقاضیان ایرانی</h2><ul className="seo-bullets">{profile.iranNotes.map(note=><li key={note}>{note}</li>)}</ul>
      <div className="seo-inline-hint">نشانی سفارت یا مرکز انگشت‌نگاری، ظرفیت وقت و دستورالعمل پرداخت ممکن است تغییر کند؛ از فهرست رسمی لینک‌شده در پایین صفحه استفاده کنید.</div>
    </section>
    <section id="risks" className="seo-section">
      <span className="seo-overline">COMMON MISTAKES / اشتباهات پرتکرار</span><h2>پیش از ثبت درخواست این موارد را بررسی کنید</h2>
      <ul className="seo-risk-list">{profile.pitfalls.map(x=><li key={x}>{x}</li>)}</ul>
      <p className="seo-related-inline">مطالعه بیشتر: <Link href="/visa-guides/visa-rejection/">دلایل ریجکتی و اقدامات بعد از رد درخواست ویزا ←</Link></p>
    </section>
    <section id="faq" className="seo-section">
      <span className="seo-overline">QUESTIONS / سؤالات رایج</span><h2>پرسش‌های متداول درباره {profile.primaryKeyword}</h2>
      <div className="seo-faq">{profile.questions.map(x=><details key={x.q}><summary>{x.q}<span aria-hidden="true">＋</span></summary><p>{x.a}</p></details>)}</div>
    </section>
    <SourceList profile={profile}/>
   </article>
   <aside className="seo-pillar-aside"><div className="seo-aside-card">
    <span className="seo-overline">YOUR TRAVEL ROADMAP</span>
    <h2>قدم بعدی در مسیر ویزای {visa.name}</h2>
    <p>قبل از هر اقدامی، چک‌لیست اولیه وضعیت خود را تهیه و مرجع رسمی کشور مقصد را بررسی کنید.</p>
    <Link href="/visa-readiness/" className="seo-button seo-button-gold">چک‌لیست اولیه ←</Link>
    <a href={profile.sources[0].url} target="_blank" rel="noopener noreferrer" className="seo-aside-source">مشاهده راهنمای رسمی ↗</a>
    <p className="seo-aside-note">درخواست مشاوره آنلاین فعلاً فعال نیست؛ اطلاعات شخصی در این مرحله دریافت نمی‌شود.</p></div>
    <div className="seo-aside-toc"><strong>در این راهنما</strong>{sections.map(([id,label])=><a href={"#"+id} key={id}>{label}</a>)}</div>
   </aside>
  </div>
  <section className="seo-container seo-related"><span className="seo-overline">CONTINUE EXPLORING</span><h2>راهنماهای مرتبط</h2>
    <div>{profile.related.map(x=><Link key={x.slug} href={"/"+x.slug+"/"}>{x.label}<span aria-hidden="true">←</span></Link>)}
    <Link href="/visa-explorer/">مقایسه مقصدهای ویزا <span aria-hidden="true">←</span></Link></div>
  </section>
 </main>;
}
