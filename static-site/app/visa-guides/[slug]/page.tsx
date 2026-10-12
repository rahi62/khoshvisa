import {guides} from "../../../lib/content";
import {guideExpansions} from "../../../lib/guide-expansions";
import {notFound} from "next/navigation";
import Link from "next/link";
export function generateStaticParams(){return guides.map(g=>({slug:g.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,g=guides.find(x=>x.slug===slug),detail=guideExpansions[slug];
 return {title:g?.title,description:detail?detail.intro.slice(0,158):g?.summary,alternates:{canonical:"/visa-guides/"+slug+"/"}};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,g=guides.find(x=>x.slug===slug);
 if(!g)notFound();
 const d=guideExpansions[slug];
 if(!d)return <main><section className="innerHero"><div className="shell"><span className="overline">VISA GUIDE</span><h1>{g.title}</h1><p>{g.summary}</p></div></section><div className="shell articleLayout"><article className="articleBody">{g.sections.map(s=><section key={s[0]}><h2>{s[0]}</h2><p>{s[1]}</p></section>)}</article></div></main>;
 return <main className="seo-guide">
  <header className="seo-guide-hero"><div className="seo-container"><nav className="seo-breadcrumb" aria-label="مسیر صفحه"><Link href="/">خانه</Link> / <Link href="/visa-guides/">راهنمای ویزا</Link> / <span aria-current="page">{g.title}</span></nav><span className="seo-overline">VISA GUIDE / راهنمای کاربردی</span><h1>{g.title}</h1><p>{d.intro}</p><small>آخرین بررسی منابع: <time dateTime="2026-10-12">{d.updated}</time></small></div></header>
  <div className="seo-container seo-guide-layout"><article>
   <div className="seo-guide-notice">این مطلب برای آگاهی عمومی است و جایگزین دستورالعمل اختصاصی سفارت یا سامانه رسمی درخواست ویزا نیست.</div>
   {d.sections.map((s,i)=><section className="seo-guide-section" key={s.title} id={"section-"+(i+1)}>
    <span className="seo-overline">بخش {new Intl.NumberFormat("fa-IR").format(i+1)}</span><h2>{s.title}</h2>
    {s.paragraphs.map(p=><p key={p}>{p}</p>)}{s.bullets&&<ul>{s.bullets.map(x=><li key={x}>{x}</li>)}</ul>}
   </section>)}
   <section className="seo-guide-section" id="references"><span className="seo-overline">PRIMARY SOURCES</span><h2>منابع رسمی و کنترل تاریخ اطلاعات</h2><p>منابع زیر در تاریخ <time dateTime="2026-10-12">{d.updated}</time> بررسی شده‌اند. قوانین و هزینه‌ها ممکن است تغییر کنند؛ برای اقدام و پرداخت، نسخه جاری مرجع رسمی را مطالعه کنید.</p><ul className="seo-guide-sources">{d.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a></li>)}</ul></section>
  </article><aside><div className="seo-aside-card"><span className="seo-overline">VISAS & DESTINATIONS</span><h2>راهنمای اختصاصی کشورت را بخوان</h2><p>مدارک و مراحل درخواست برای هر مقصد متفاوت‌اند.</p><Link href="/visa-explorer/" className="seo-button seo-button-gold">مقایسه مقصدها ←</Link></div><nav className="seo-guide-toc" aria-label="فهرست مقاله"><strong>در این مقاله</strong>{d.sections.map((s,i)=><a key={s.title} href={"#section-"+(i+1)}>{s.title}</a>)}<a href="#references">منابع رسمی</a></nav></aside></div>
  <section className="seo-container seo-related"><span className="seo-overline">RECOMMENDED / مانی‌پیج‌های مرتبط</span><h2>راهنمای ویزای مقصدها</h2><div>{d.related.map(r=><Link href={"/"+r.slug+"/"} key={r.slug}>{r.title} <span>←</span></Link>)}</div></section>
 </main>;
}
