import Link from "next/link";
import {guides,visas} from "../../lib/content";
export const metadata={alternates:{canonical:"/visa-guides/"},title:"راهنمای ویزای توریستی | مدارک، وقت و تمکن مالی",description:"۲۳ راهنمای مستند ویزای توریستی: مدارک، انگشت‌نگاری، بیمه شینگن، بلیت و هتل، فرم ویزا، وقت سفارت، تمکن مالی و ریجکتی."};
const groups=[
 {title:"مدارک و آمادگی پرونده",description:"برای آماده‌سازی واقعی مدارک، منابع مالی و شرایط سفر اول",slugs:["visa-documents","visa-proof-of-funds","visa-document-translation","visa-without-travel-history","schengen-travel-insurance","visa-flight-hotel-reservations","freelancer-self-employed-tourist-visa"]},
 {title:"مراحل درخواست و هدف سفر",description:"رزرو وقت رسمی، دعوت‌نامه واقعی و تعداد ورودهای مجاز",slugs:["visa-appointment","visa-biometrics","visa-invitation-letter","single-vs-multiple-entry-visa","schengen-main-destination","schengen-90-180-day-rule","japan-jvac-iran-process","france-visas-iran-application","germany-videx-form-guide","canada-ircc-portal-guide","uk-standard-visitor-online-application","italy-visametric-iran-appointment","australia-visitor-600-offshore-guide"]},
 {title:"هزینه و تصمیم نهایی",description:"تعرفه‌های دولتی و مسیر درست پس از رد درخواست",slugs:["visa-fees","visa-rejection","visa-application-form-mistakes"]}
];
export default function Page(){return <main>
 <section className="innerHero"><div className="shell"><span className="overline">VISA KNOWLEDGE HUB</span><h1>راهنماهای ویزای توریستی <em>برای ایرانیان</em></h1><p>از انگشت‌نگاری و بیمه سفر تا رزرو بلیت و هتل و اصلاح فرم؛ ۲۳ راهنمای کاربردی برای متقاضیان ایرانی، با ارجاع به منابع رسمی.</p></div></section>
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