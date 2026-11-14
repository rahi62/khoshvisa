import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
 title:"درباره خوش‌ویزا | ثبت درخواست ویزای توریستی",
 description:"خوش‌ویزا مسیر ثبت درخواست و هماهنگی مراحل ویزای توریستی برای مقصدهای مختلف است.",
 alternates:{canonical:"/about/"}
};
export default function Page(){return <main>
<section className="innerHero"><div className="shell"><span className="overline">ABOUT KHOSHVISA</span>
<h1>شروع درخواست ویزای توریستی، <em>ساده و روشن</em></h1>
<p>خوش‌ویزا برای متقاضیانی است که می‌خواهند برای سفر توریستی اقدام کنند و مسیر درخواست و مدارک لازم را با هماهنگی اولیه پیش ببرند.</p>
<Link className="btn btnDark" href="/consultation/">ثبت درخواست ویزا ←</Link></div></section>
<section className="shell sectionSpace prose">
<h2>خدمات خوش‌ویزا</h2>
<p>برای درخواست ویزای توریستی شینگن، کانادا، انگلیس، ژاپن، استرالیا و سایر مقصدهای موجود در سایت می‌توانید درخواست اولیه ثبت کنید. شرایط و مدارک هر مقصد متفاوت است و پس از مشخص‌شدن اطلاعات اولیه، درباره مراحل مناسب درخواست هماهنگی می‌شود.</p>
<h2>مراحل شروع درخواست</h2>
<ol><li>مقصد و هدف سفر خود را در <Link href="/destinations/">صفحات ویزای کشورها</Link> انتخاب کنید.</li><li>از طریق <Link href="/consultation/">فرم درخواست ویزا</Link> یا تماس تلفنی، اطلاعات اولیه را اعلام کنید.</li><li>پس از برقراری ارتباط، شرایط و مراحل بعدی متناسب با مقصد مشخص می‌شود.</li></ol>
<h2>اطلاعات تماس</h2>
<p>برای پرسش درباره شروع درخواست با <a href="tel:+989351300502">۰۹۳۵۱۳۰۰۵۰۲</a> یا <a href="tel:+982146010788">۰۲۱۴۶۰۱۰۷۸۸</a> تماس بگیرید.</p>
<p>صدور ویزا به تصمیم مرجع رسمی کشور مقصد وابسته است و نتیجه درخواست قابل تضمین نیست.</p>
<Link className="btn btnDark" href="/consultation/">شروع درخواست اخذ ویزا ←</Link>
</section></main>}