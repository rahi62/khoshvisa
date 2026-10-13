import Link from "next/link";
import {redirect} from "next/navigation";
import {isAdmin} from "@/lib/crm-auth";
import {readContactSettings} from "@/lib/contact-settings-server";

export const dynamic="force-dynamic";
type Query={saved?:string;error?:string};
const errors:Record<string,string>={
 invalid_mobile:"شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود.",
 invalid_landline:"شماره تلفن ثابت باید ۱۱ رقم، شامل کد شهر و با ۰ شروع شود.",
 conflict:"تنظیمات هم‌زمان ویرایش شده‌اند. صفحه را بازخوانی و دوباره بررسی کنید.",
 unavailable:"ذخیره ممکن نیست. ابتدا اتصال دیتابیس و اجرای مهاجرت ۰۰۰۲ را بررسی کنید.",
 invalid_request:"درخواست نامعتبر است."
};
export default async function ContactSettingsPage({searchParams}:{searchParams:Promise<Query>}){
 if(!await isAdmin())redirect("/admin/login");
 const [params,result]=await Promise.all([searchParams,readContactSettings()]);
 const s=result.settings;
 return <main className="admin-shell">
  <header className="admin-top"><div><strong>✦ خوش‌ویزا</strong><span>تنظیمات سایت</span></div><Link href="/admin">→ بازگشت به مدیریت لیدها</Link></header>
  <div className="admin-width">
   <div className="admin-heading"><div><h1>شماره‌های پاسخگویی</h1><p>اطلاعات عمومی صفحه تماس؛ بدون نیاز به تغییر کد یا انتشار مجدد سایت.</p></div><Link href="/contact/" target="_blank">نمایش صفحه تماس ↗</Link></div>
   {params.saved&&<p className="success" role="status">شماره‌های تماس با موفقیت ذخیره شدند.</p>}
   {params.error&&<p className="error" role="alert">{errors[params.error]||errors.invalid_request}</p>}
   {!result.storeReady&&<p className="error" role="alert">دیتابیس تنظیمات هنوز در دسترس نیست. مقادیر زیر نسخه پیش‌فرض‌اند؛ برای ویرایش ابتدا مهاجرت دیتابیس را اجرا کنید.</p>}
   <section className="panel">
    <h2>اطلاعات تماس عمومی</h2>
    <p>این شماره‌ها در صفحه «ارتباط با ما» به‌صورت سروری نمایش داده می‌شوند. تغییر شماره واتساپ در این قسمت انجام نمی‌شود.</p>
    <form className="edit-form" method="post" action="/api/admin/settings">
     <input type="hidden" name="version" value={s.version}/>
     <label>شماره موبایل پاسخگویی <input name="support_mobile" type="tel" inputMode="tel" dir="ltr" maxLength={22} defaultValue={s.supportMobile} required placeholder="09351300502"/></label>
     <label>شماره تلفن ثابت با کد شهر <input name="support_landline" type="tel" inputMode="tel" dir="ltr" maxLength={22} defaultValue={s.supportLandline} required placeholder="02146010788"/></label>
     <div className="wide"><p>آخرین تغییر ثبت‌شده: {s.updatedAt?new Intl.DateTimeFormat("fa-IR",{timeZone:"Asia/Tehran",dateStyle:"medium",timeStyle:"short"}).format(new Date(s.updatedAt)):"هنوز تغییری ثبت نشده است."}</p></div>
     <button type="submit" disabled={!result.storeReady}>ذخیره شماره‌های پاسخگویی ←</button>
    </form>
   </section>
   <section className="panel"><h2>مرز این تنظیمات</h2><p>شماره واتساپ تجاری برای فرم مکالمه همچنان از تنظیمات امن دیپلوی تعیین می‌شود. این بخش فقط شماره موبایل و تلفن ثابت قابل نمایش در صفحه عمومی تماس را مدیریت می‌کند؛ هیچ لید یا اطلاعات شخصی در آن ثبت نمی‌شود.</p></section>
  </div>
 </main>;
}
