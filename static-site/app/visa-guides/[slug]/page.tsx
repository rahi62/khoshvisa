import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";
import {guides} from "../../../lib/content";
import {guideExpansions} from "../../../lib/guide-expansions";
import {articleGuideLinks} from "../../../lib/guide-cluster-links";
import "../guide.css";

const base="https://khoshvisa.ir";
type Props={params:Promise<{slug:string}>};

export function generateStaticParams(){return guides.map(g=>({slug:g.slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;
 const g=guides.find(item=>item.slug===slug);
 if(!g)return {};
 const detail=guideExpansions[slug];
 const description=detail?.metaDescription||detail?.intro.slice(0,155)||g.summary;
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
 const organization={"@type":"Organization" as const,name:"خوش‌ویزا",url:base+"/about/"};
 const schema={
  "@context":"https://schema.org",
  "@graph":[
   {"@type":"BreadcrumbList",itemListElement:breadcrumbs.map((b,index)=>({"@type":"ListItem",position:index+1,name:b.name,item:b.url}))},
   {"@type":"WebPage","@id":url+"#webpage",url,name:guide.title,description:detail.metaDescription||detail.intro,inLanguage:"fa-IR",dateModified:date,about:{"@type":"Thing",name:guide.title}},
   {"@type":"Article","@id":url+"#article",mainEntityOfPage:{"@type":"WebPage","@id":url+"#webpage"},headline:guide.title,
    description:detail.metaDescription||detail.intro,inLanguage:"fa-IR",dateModified:date,author:organization,publisher:organization,
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
   <Link className="seo-button seo-button-gold" href="/consultation/">ثبت درخواست ویزای توریستی ←</Link>
   <small>آخرین بررسی منابع: <time dateTime={date}>{detail.updated}</time> · مقررات ممکن است تغییر کنند.</small>
  </div></header>
  <div className="seo-container seo-guide-layout">
   <article>
    {detail.lead&&<p className="kv-article-human-lead">{detail.lead}</p>}
    <div className="seo-guide-notice">{detail.notice||"این مطلب راهنمای عمومی برای متقاضیان ایرانی است و جایگزین چک‌لیست صادرشده از سفارت یا سامانه رسمی مربوط به شرایط شخصی شما نیست."}</div>
    {detail.quickAnswer&&<section id="answer" className="seo-guide-section kv-guide-answer"><span className="seo-overline">پاسخ کوتاه</span>
     <h2>{detail.quickAnswerTitle||"مدارک ویزای توریستی چیست؟"}</h2><p>{detail.quickAnswer}</p>
     <p className="kv-guide-hint">{detail.comparison?<>برای مشاهده جزئیات مقصدها، <a href="#countries">{detail.comparisonTitle||"جدول مقایسه مقصدها"}</a> را ببینید.</>:<>برای جزئیات و استثناها، <a href="#section-1">ادامه راهنما</a> را بخوانید.</>}</p>
    </section>}
    {detail.decisionAid&&<figure id="decision-path" className="seo-guide-section kv-editorial-path" aria-label={detail.decisionAid.accessibleSummary}>
      <figcaption><span className="seo-overline">راهنمای عملی / مسیر تصمیم‌گیری</span><h2>{detail.decisionAid.title}</h2><p>{detail.decisionAid.intro}</p></figcaption>
      <ol>{detail.decisionAid.steps.map((step,i)=><li key={step.title}><span aria-hidden="true">{new Intl.NumberFormat("fa-IR").format(i+1)}</span><div><strong>{step.title}</strong><p>{step.body}</p></div></li>)}</ol>
      <p className="kv-path-conclusion">{detail.decisionAid.conclusion}</p><p><a href={detail.decisionAid.sourceUrl} target="_blank" rel="noopener noreferrer">بررسی معیارهای رسمی این مسیر ↗</a></p>
    </figure>}
    {detail.comparison&&<section className="seo-guide-section" id="countries">
     <span className="seo-overline">مقایسه منابع رسمی و شرایط کشورها</span><h2>{detail.comparisonTitle||"مقایسه چک‌لیست مدارک ویزای ۸ مقصد"}</h2><p>{detail.comparison.intro}</p>
     <div className="kv-guide-table-wrap"><table className="kv-guide-table"><caption>{detail.comparisonCaption||"مقایسه کلی مدارک متقاضی ایرانی به تفکیک مقصد"}</caption>
      <thead><tr><th scope="col">مقصد</th><th scope="col">{detail.comparisonRequirementLabel||"تمرکز مدارک"}</th><th scope="col">منبع رسمی</th></tr></thead>
      <tbody>{detail.comparison.rows.map(row=><tr key={row.slug}><th scope="row"><Link href={"/"+row.slug+"/"}>{row.destination}</Link></th><td>{row.requirement}</td><td><a href={row.href} target="_blank" rel="noopener noreferrer">{row.source} ↗</a></td></tr>)}</tbody>
     </table></div>
    </section>}
    {detail.sections.map((section,i)=><section className="seo-guide-section" key={section.title} id={"section-"+(i+1)}>
     <span className="seo-overline">بخش {new Intl.NumberFormat("fa-IR").format(i+1)}</span>
     <h2>{section.title}</h2>
     {section.paragraphs.map(p=><p key={p}>{p}</p>)}
     {section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}
     {detail.contextualLinks?.filter(link=>link.section===section.title).map(link=><p className="kv-context-link" key={link.slug+link.section}>{link.before}<Link href={link.slug.includes("tourist-visa")||link.slug==="schengen-visa"?"/"+link.slug+"/":"/visa-guides/"+link.slug+"/"}>{link.label}</Link>{link.after}</p>)}
     {section.sourceUrls&&<p className="kv-guide-inline-sources"><strong>منابع این بخش:</strong>{" "}
       {section.sourceUrls.map((source,j)=><span key={source}>{j>0&&" · "}<a href={source} target="_blank" rel="noopener noreferrer">{detail.sources.find(s=>s.url===source)?.name||"مشاهده منبع"} ↗</a></span>)}
      </p>}
    </section>)}
    {detail.questions&&<section className="seo-guide-section" id="questions"><span className="seo-overline">پرسش‌های متداول</span><h2>{detail.faqTitle||"سؤالات متداول درباره مدارک ویزا"}</h2>
     <div className="kv-guide-questions">{detail.questions.map(({q,a})=><div key={q}><h3>{q}</h3><p>{a}</p></div>)}</div>
    </section>}
    <section className="seo-guide-section kv-guide-next-step">
     <span className="seo-overline">گام بعدی</span><h2>برای شروع درخواست ویزای توریستی اقدام کنید</h2>
     <p>اطلاعات این صفحه عمومی است؛ برای مسیر واقعی، مقررات و شرایط همان نوع ویزا ملاک‌اند. می‌توانید مقصدتان را انتخاب کنید و در صورت فعال‌بودن کانال ارتباطی، درخواست اولیه خود را برای هماهنگی به خوش‌ویزا بفرستید. هیچ نتیجه ویزایی تضمین نمی‌شود.</p>
     <p><Link className="seo-button seo-button-gold" href="/consultation/">شروع ارتباط اولیه با خوش‌ویزا ←</Link></p>
    </section>
    <section className="seo-guide-section" id="references">
     <span className="seo-overline">منابع اولیه و به‌روزرسانی</span><h2>منابع رسمی مقاله</h2>
     <p>این منابع در تاریخ <time dateTime={date}>{detail.updated}</time> برای محتوای فعلی مرور شده‌اند؛ در روز ثبت درخواست، نسخه جدید مرجع رسمی را دوباره بررسی کنید. خوش‌ویزا نماینده سفارت یا صادرکننده ویزا نیست.</p>
     <p className="kv-editorial-byline">مسئولیت انتشار: تیم محتوای خوش‌ویزا · بازبینی حقوقی اختصاصی یا تأیید توسط کارشناس دارای مجوز برای این مطلب ادعا نمی‌شود. <Link href="/editorial-policy/">روش پژوهش و ارزیابی مطالب</Link></p>
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
     {detail.decisionAid&&<a href="#decision-path">مسیر تصمیم‌گیری</a>}
     {detail.comparison&&<a href="#countries">{detail.comparisonTitle||"جدول مقایسه مدارک"}</a>}
     {detail.sections.map((s,i)=><a key={s.title} href={"#section-"+(i+1)}>{s.title}</a>)}
     {detail.questions&&<a href="#questions">سؤالات متداول</a>}
     <a href="#references">منابع رسمی</a>
    </nav>
   </aside>
  </div>
  <section className="seo-container seo-related"><span className="seo-overline">صفحات مرتبط</span><h2>راهنمای ویزا برای مقصدهای مختلف</h2>
   <div>{detail.related.map(r=><Link href={"/"+r.slug+"/"} key={r.slug}>{r.title} <span>←</span></Link>)}</div>
   <p>راهنماهای تکمیلی: {guides.filter(item=>(articleGuideLinks[slug]||[]).includes(item.slug)).map((item,i)=><span key={item.slug}>{i>0&&" · "}<Link href={"/visa-guides/"+item.slug+"/"}>{item.title}</Link></span>)}</p>
  </section>
 </main>;
}
