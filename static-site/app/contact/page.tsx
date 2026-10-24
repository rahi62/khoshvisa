import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = {
 title:"تماس با خوش‌ویزا | ثبت درخواست ویزای توریستی",
 description:"برای ثبت درخواست اولیه ویزای توریستی و هماهنگی مراحل با خوش‌ویزا تماس بگیرید.",
 alternates:{canonical:"/contact/"}
};
export default function Page(){return <main>
<section className="innerHero"><div className="shell"><span className="overline">CONTACT KHOSHVISA</span>
<h1>برای درخواست ویزا، <em>همین حالا تماس بگیر</em></h1>
<p>کشور مقصدت را مشخص کن و برای شروع درخواست ویزای توریستی با خوش‌ویزا ارتباط بگیر.</p>
<Link className="btn btnDark" href="/consultation/">ثبت درخواست ویزا ←</Link></div></section>
<section className="shell sectionSpace prose">
<h2>شماره‌های تماس برای درخواست ویزا</h2>
<ul className="kv-public-phones"><li>موبایل: <a href="tel:+989351300502" dir="ltr">۰۹۳۵۱۳۰۰۵۰۲</a></li><li>تلفن ثابت: <a href="tel:+982146010788" dir="ltr">۰۲۱۴۶۰۱۰۷۸۸</a></li></ul>
<h2>فرم درخواست ویزای توریستی</h2>
<p>مقصد، هدف و زمان تقریبی سفرت را مشخص کن تا درخواست اولیه برای هماهنگی مراحل بعدی آماده شود. در صورت فعال‌بودن واتساپ، پیام فقط پس از تأیید و ارسال خودت منتقل می‌شود.</p>
<Link className="btn btnDark" href="/consultation/">ورود به فرم درخواست ویزا ←</Link>
<h2>انتخاب مقصد</h2><p>برای بررسی شرایط و مدارک موردنیاز، ابتدا <Link href="/destinations/">مقصدهای ویزای توریستی</Link> را مشاهده کن.</p>
<p>نتیجه صدور ویزا در اختیار مرجع رسمی مقصد است.</p>
</section></main>}