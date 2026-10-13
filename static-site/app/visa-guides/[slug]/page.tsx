import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {guides} from "../../../lib/content";
import {guideExpansions} from "../../../lib/guide-expansions";
import "../guide.css";

const base="https://khoshvisa.ir";
type Props={params:Promise<{slug:string}>};

export function generateStaticParams(){return guides.map(g=>({slug:g.slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;
 const g=guides.find(item=>item.slug===slug);
 if(!g)return {};
 const detail=guideExpansions[slug];
 const description=detail?.intro.slice(0,155)||g.summary;
 const url=base+"/visa-guides/"+slug+"/";
 return {
  title:g.title,description,alternates:{canonical:url},
  openGraph:{type:"article",locale:"fa_IR",siteName:"خوش‌ویزا",title:g.title,description,url},
  twitter:{card:"summary",title:g.title,description}
 };
}

export default async function Page({params}:Props){
 const {slug}=await params;
 const guide=guides.find(g=>g.slug===slug);
 if(!guide)notFound();
 const detail=guideExpansions[slug];
 if(!detail)return <main><section className="innerHero"><div className="shell"><span className="overline">VISA GUIDE</span><h1>{guide.title}</h1><p>{guide.summary}</p></div></section><div className="shell articleLayout"><article className="articleBody">{guide.sections.map(s=><section key={s[0]}><h2>{s[0]}</h2><p>{s[1]}</p></section>)}</article></div></main>;

 const date=detail.updatedISO||"2026-10-12";
 const url=base+"/visa-guides/"+slug+"/";
 const breadcrumbs=[
  {name:"خانه",url:base+"/"},
  {name:"راهنمای ویزا",url:base+"/visa-guides/"},
  {name:guide.title,url}
 ];
 const organization={"@type":"Organization" as const,name:"خوش‌ویزا",url:base+"/"};
 const schema={
  "@context":"https://schema.org",
  "@graph":[
   {"@type":"BreadcrumbList",itemListElement:breadcrumbs.map((b,index)=>({"@type":"ListItem",position:index+1,name:b.name,item:b.url}))},
   {"@type":"Article","@id":url+"#article",mainEntityOfPage:{"@type":"WebPage","@id":url+"#webpage"},headline:guide.title,
    description:detail.intro,inLanguage:"fa-IR",dateModified:date,author:organization,publisher:organization,
    articleSection:detail.sections.map(s=>s.title),citation:detail.sources.map(s=>s.url)}
  ]
 };
 return <main className="seo-guide">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
  <header className="seo-guide-hero"><div className="seo-container">
   <nav className="seo-breadcrumb" aria-label="مسیر صفحه">
    <Link href="/">خانه</Link> / <Link href="/visa-guides/">راهنمای ویزا</Link> / <span aria-current="page">{guide.title}</span>
   </nav>
   <span className="seo-overline">راهنمای کاربردی ویزای توریستی</span>
   <h1>{guide.title}</h1>
   <p>{detail.intro}</p>
   <small>آخرین بررسی منابع: <time dateTime={date}>{detail.updated}</time> · مقررات ممکن است تغییر کنند.</small>
  </div></header>
  <div className="seo-container seo-guide-layout">
   <article>
    <div className="seo-guide-notice">این مطلب راهنمای عمومی برای متقاضیان ایرانی است و جایگزین چک‌لیست صادرشده از سفارت یا سامانه رسمی مربوط به شرایط شخصی شما نیست.</div>
    {detail.quickAnswer&&<section id="answer" className="seo-guide-section kv-guide-answer"><span className="seo-overline">پاسخ کوتاه</span>
     <h2>مدارک ویزای توریستی چیست؟</h2><p>{detail.quickAnswer}</p>
     <p className="kv-guide-hint">برای مشاهده تفاوت کشورها، <a href="#countries">جدول مقایسه مدارک هشت مقصد</a> را ببینید.</p>
    </section>}
    {detail.comparison&&<section className="seo-guide-section" id="countries">
     <span className="seo-overline">تفاوت مدارک کشورها</span><h2>مقایسه چک‌لیست مدارک ویزای ۸ مقصد</h2><p>{detail.comparison.intro}</p>
     <div className="kv-guide-table-wrap"><table className="kv-guide-table"><caption>مقایسه کلی مدارک متقاضی ایرانی به تفکیک مقصد</caption>
      <thead><tr><th scope="col">مقصد</th><th scope="col">تمرکز مدارک</th><th scope="col">منبع رسمی</th></tr></thead>
      <tbody>{detail.comparison.rows.map(row=><tr key={row.slug}><th scope="row"><Link href={"/"+row.slug+"/"}>{row.destination}</Link></th><td>{row.requirement}</td><td><a href={row.href} target="_blank" rel="noopener noreferrer">{row.source} ↗</a></td></tr>)}</tbody>
     </table></div>
    </section>}
    {detail.sections.map((section,i)=><section className="seo-guide-section" key={section.title} id={"section-"+(i+1)}>
     <span className="seo-overline">بخش {new Intl.NumberFormat("fa-IR").format(i+1)}</span>
     <h2>{section.title}</h2>
     {section.paragraphs.map(p=><p key={p}>{p}</p>)}
     {section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}
     {section.sourceUrls&&<p className="kv-guide-inline-sources"><strong>منابع این بخش:</strong>{" "}
       {section.sourceUrls.map((source,j)=><span key={source}>{j>0&&" · "}<a href={source} target="_blank" rel="noopener noreferrer">{detail.sources.find(s=>s.url===source)?.name||"مرجع رسمی"} ↗</a></span>)}
      </p>}
    </section>)}
    {detail.questions&&<section className="seo-guide-section" id="questions"><span className="seo-overline">پرسش‌های متداول</span><h2>سؤالات متداول درباره مدارک ویزا</h2>
     <div className="kv-guide-questions">{detail.questions.map(({q,a})=><div key={q}><h3>{q}</h3><p>{a}</p></div>)}</div>
    </section>}
    <section className="seo-guide-section" id="references">
     <span className="seo-overline">منابع اولیه و به‌روزرسانی</span><h2>منابع رسمی مقاله</h2>
     <p>این منابع در تاریخ <time dateTime={date}>{detail.updated}</time> برای محتوای فعلی مرور شده‌اند؛ در روز ثبت درخواست، نسخه جدید مرجع رسمی را دوباره بررسی کنید. خوش‌ویزا نماینده سفارت یا صادرکننده ویزا نیست.</p>
     <ul className="seo-guide-sources">{detail.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a></li>)}</ul>
     <p>درباره شیوه تهیه و اصلاح مطالب بیشتر بدانید: <Link href="/editorial-policy/">سیاست بررسی محتوای خوش‌ویزا</Link>.</p>
    </section>
   </article>
   <aside>
    <div className="seo-aside-card"><span className="seo-overline">انتخاب مقصد</span><h2>راهنمای اختصاصی کشور خود را بخوانید</h2>
     <p>هر کشور مدارک و مسیر درخواست متفاوتی دارد.</p><Link href="/destinations/" className="seo-button seo-button-gold">مشاهده مقصدها ←</Link>
     <p><Link href="/visa-readiness/">بررسی آمادگی اولیه سفر ←</Link></p></div>
    <nav className="seo-guide-toc" aria-label="فهرست بخش‌های مقاله"><strong>در این مقاله</strong>
     {detail.quickAnswer&&<a href="#answer">پاسخ کوتاه</a>}
     {detail.comparison&&<a href="#countries">جدول مقایسه مدارک</a>}
     {detail.sections.map((s,i)=><a key={s.title} href={"#section-"+(i+1)}>{s.title}</a>)}
     {detail.questions&&<a href="#questions">سؤالات متداول</a>}
     <a href="#references">منابع رسمی</a>
    </nav>
   </aside>
  </div>
  <section className="seo-container seo-related"><span className="seo-overline">صفحات مرتبط</span><h2>راهنمای ویزا برای مقصدهای مختلف</h2>
   <div>{detail.related.map(r=><Link href={"/"+r.slug+"/"} key={r.slug}>{r.title} <span>←</span></Link>)}</div>
   <p>راهنماهای تکمیلی: <Link href="/visa-guides/visa-rejection/">دلایل رد درخواست ویزا</Link> · <Link href="/visa-guides/visa-fees/">هزینه‌های ویزای توریستی</Link></p>
  </section>
 </main>;
}
