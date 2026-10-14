import Link from "next/link";
import {guides,visas} from "../../lib/content";
export const metadata={alternates:{canonical:"/visa-guides/"},title:"راهنمای ویزای توریستی | مدارک، وقت و تمکن مالی",description:"مجموعه راهنماهای مستند ویزای توریستی برای ایرانیان: مدارک، گردش حساب، وقت سفارت، ترجمه، دعوت‌نامه، سینگل و مولتی و ریجکتی."};
const groups=[
 {title:"مدارک و آمادگی پرونده",description:"برای آماده‌سازی واقعی مدارک، منابع مالی و شرایط سفر اول",slugs:["visa-documents","visa-proof-of-funds","visa-document-translation","visa-without-travel-history"]},
 {title:"مراحل درخواست و هدف سفر",description:"رزرو وقت رسمی، دعوت‌نامه واقعی و تعداد ورودهای مجاز",slugs:["visa-appointment","visa-invitation-letter","single-vs-multiple-entry-visa"]},
 {title:"هزینه و تصمیم نهایی",description:"تعرفه‌های دولتی و مسیر درست پس از رد درخواست",slugs:["visa-fees","visa-rejection"]}
];
export default function Page(){return <main>
 <section className="innerHero"><div className="shell"><span className="overline">VISA KNOWLEDGE HUB</span><h1>راهنماهای ویزای توریستی <em>برای ایرانیان</em></h1><p>از مدارک و گردش حساب تا وقت سفارت و دعوت‌نامه؛ هر موضوع با منابع رسمی و توضیح تفاوت مقصدها بررسی شده است.</p></div></section>
 <div className="shell sectionSpace">
  <div className="kv-guide-hub-intro"><h2>از کدام موضوع شروع کنیم؟</h2><p>راهنماهای این صفحه پاسخ به سؤال‌های عمومی‌اند. برای مسیر اقدام کشور مشخص، صفحه اختصاصی همان مقصد و سپس چک‌لیست رسمی را مطالعه کنید. این مطالب ضمانت نتیجه یا مشاوره حقوقی اختصاصی نیستند.</p></div>
  {groups.map((group,index)=><section key={group.title} className="kv-guide-hub-group" aria-labelledby={"cluster-"+index}>
   <h2 id={"cluster-"+index}>{group.title}</h2><p>{group.description}</p>
   <div className="guideCards">{group.slugs.map((slug,i)=>{const g=guides.find(item=>item.slug===slug);return g?<Link href={"/visa-guides/"+g.slug+"/"} className="guideCard" key={g.slug}><div className={"guidePhoto guide"+(i%3)} aria-hidden="true"/><div><span>راهنمای مستند · {new Intl.NumberFormat("fa-IR",{minimumIntegerDigits:2}).format(i+1)}</span><h3>{g.title}</h3><p>{g.summary}</p><b>مطالعه راهنما ←</b></div></Link>:null})}</div>
  </section>)}
  <section className="kv-guide-index-explain"><h2>راهنمای ویزای مقصدها</h2><p>اطلاعات عمومی را با شرایط واقعی کشور خود تطبیق دهید. صفحات مقصد برای شینگن، کانادا، انگلیس، فرانسه، آلمان، ایتالیا، ژاپن و استرالیا به منابع رسمی و راهنماهای پشتیبان متصل هستند.</p>
   <nav aria-label="صفحات اختصاصی کشورها">{visas.map(v=><Link href={"/"+v.slug+"/"} key={v.slug}>ویزای {v.name} ←</Link>)}</nav>
  </section>
 </div>
 </main>}