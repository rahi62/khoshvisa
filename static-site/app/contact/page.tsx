import Link from "next/link";
import {readContactSettings} from "@/lib/contact-settings-server";
import {phoneHref} from "@/lib/contact-settings";
export const dynamic="force-dynamic";
export const metadata={alternates:{canonical:"/contact/"},title:"راه‌های ارتباط با خوش‌ویزا",description:"شماره‌های پاسخگویی و راه‌های ارتباط با خوش‌ویزا برای اطلاعات عمومی درباره خدمات ویزا."};
export default async function Page(){
 const {settings}=await readContactSettings();
 return <main><section className="innerHero"><div className="shell"><span className="overline">CONTACT KHOSHVISA</span><h1>برای شروع <em>در ارتباط باشیم</em></h1><p>برای پرسش درباره خدمات ویزا، با شماره‌های پاسخگویی خوش‌ویزا تماس بگیرید یا ارتباط واتساپی را آغاز کنید.</p></div></section>
 <section className="shell sectionSpace prose">
  <h2>شماره‌های پاسخگویی</h2>
  <p>تلفن همراه: <a href={phoneHref(settings.supportMobile)} dir="ltr">{settings.supportMobile}</a></p>
  <p>تلفن ثابت: <a href={phoneHref(settings.supportLandline)} dir="ltr">{settings.supportLandline}</a></p>
  <h2>ارتباط اولیه از طریق واتساپ</h2>
  <p>فرم راهنمایی، پیام را در مرورگر شما آماده می‌کند و پس از تأیید، واتساپ را باز می‌کند. پیام تا زمانی که خودتان آن را در واتساپ ارسال نکنید به دست خوش‌ویزا نمی‌رسد.</p>
  <Link className="btn btnDark" href="/consultation/">شروع مکالمه واتساپ ↗</Link>
  <h2>راهنمایی پیش از تماس</h2><p>شرایط و هزینه‌های رسمی ویزا در صفحات مقصدها و با منبع معتبر توضیح داده شده است. این اطلاعات تضمین صدور ویزا نیستند.</p>
  <Link className="btn btnGold" href="/destinations/">مشاهده مقصدها ↗</Link>
 </section></main>;
}
