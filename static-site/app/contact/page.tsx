import Link from "next/link";
import {readSiteSettings} from "@/lib/site-settings-server";
import {phoneHref} from "@/lib/site-settings";
export const dynamic="force-dynamic";
export const metadata={
 alternates:{canonical:"/contact/"},
 title:"راه‌های ارتباط با خوش‌ویزا",
 description:"راه‌های تماس و پاسخ‌گویی خوش‌ویزا برای اطلاعات عمومی خدمات ویزا."
};
export default async function Page(){
 const {settings:s}=await readSiteSettings();
 return <main>
 <section className="innerHero"><div className="shell"><span className="overline">CONTACT KHOSHVISA</span>
  <h1>برای شروع <em>در ارتباط باشیم</em></h1>
  <p>برای دریافت اطلاعات عمومی خدمات ویزا با {s.brandName} در ارتباط باشید.</p></div></section>
 <section className="shell sectionSpace prose">
  <h2>شماره‌های پاسخ‌گویی</h2>
  {s.supportMobile&&<p>تلفن همراه: <a href={phoneHref(s.supportMobile)} dir="ltr">{s.supportMobile}</a></p>}
  {s.supportLandline&&<p>تلفن ثابت: <a href={phoneHref(s.supportLandline)} dir="ltr">{s.supportLandline}</a></p>}
  {s.email&&<p>ایمیل: <a href={"mailto:"+s.email}>{s.email}</a></p>}
  {s.instagramUrl&&<p><a href={s.instagramUrl} target="_blank" rel="noopener noreferrer">اینستاگرام خوش‌ویزا ↗</a></p>}
  {s.telegramUrl&&<p><a href={s.telegramUrl} target="_blank" rel="noopener noreferrer">تلگرام خوش‌ویزا ↗</a></p>}
  <h2>ارتباط از طریق واتساپ</h2>
  {s.whatsappEnabled?<><p>برای آغاز مکالمه، فرم درخواست راهنمایی را تکمیل و پیام را در واتساپ شخصاً ارسال کنید.</p>
    <Link className="btn btnDark" href="/consultation/">شروع مکالمه واتساپ ↗</Link></>:
    <p>مسیر ارتباط واتساپی هنوز از طرف مدیریت فعال نشده است. لطفاً از شماره‌های پاسخگویی استفاده کنید.</p>}
  <h2>راهنمایی پیش از تماس</h2>
  <p>شرایط و هزینه‌های رسمی ویزا در صفحات مقصدها با استناد به منابع معتبر بررسی می‌شود. این اطلاعات تضمین صدور ویزا نیستند.</p>
  <Link className="btn btnGold" href="/destinations/">مشاهده مقصدها ↗</Link>
 </section></main>;
}
