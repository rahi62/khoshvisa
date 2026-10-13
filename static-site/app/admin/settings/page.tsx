import Link from "next/link";
import {redirect} from "next/navigation";
import {isAdmin} from "@/lib/crm-auth";
import {database} from "@/lib/crm-db";
export const dynamic="force-dynamic";
type SettingsRow={
 mobile:string;landline:string;whatsapp_number:string;whatsapp_enabled:boolean;
 version:number;updated_at:Date;
};
const errors:Record<string,string>={
 invalid:"شماره‌های واردشده معتبر نیستند. موبایل ۱۱ رقمی با ۰۹ و تلفن ثابت ۱۱ رقمی با صفر و کد شهر وارد شود.",
 wa_required:"برای فعال‌کردن واتساپ، شماره موبایل واتساپ را وارد کنید.",
 conflict:"تنظیمات توسط نشست دیگری تغییر کرده‌اند. صفحه را تازه‌سازی کنید.",
 unavailable:"اتصال تنظیمات به دیتابیس برقرار نیست. مهاجرت پایگاه داده و دسترسی سرور را بررسی کنید."
};
export default async function Settings({searchParams}:{searchParams:Promise<{saved?:string;error?:string}>}){
 if(!await isAdmin())redirect("/admin/login");
 const state=await searchParams;
 let row:SettingsRow|null=null;
 try{
  const r=await database().query<SettingsRow>("SELECT * FROM site_contact_settings WHERE id=1");
  row=r.rows[0]||null;
 }catch(e){console.error("Site settings admin unavailable",e instanceof Error?e.name:"Error")}
 return <main className="admin-shell">
  <header className="admin-top"><div><strong>✦ خوش‌ویزا</strong><span>تنظیمات عمومی سایت</span></div><Link href="/admin">→ داشبورد لیدها</Link></header>
  <div className="admin-width">
   <div className="admin-heading"><div><h1>تنظیمات ارتباط و جذب مشتری</h1><p>شماره‌های عمومی و مسیر واتساپ را بدون تغییر کد مدیریت کنید.</p></div><Link href="/contact/" target="_blank">صفحه تماس سایت ↗</Link></div>
   {state.saved&&<p className="success" role="status">تنظیمات ثبت شدند. تغییرات از API عمومی، بدون دیپلوی مجدد، نمایش داده می‌شوند.</p>}
   {state.error&&<p className="error" role="alert">{errors[state.error]||"ذخیره انجام نشد."}</p>}
   {!row?<section className="panel"><p className="error" role="alert">تنظیمات در دسترس نیستند. ابتدا فایل مهاجرت <code>0002_site_contact_settings.sql</code> را روی دیتابیس اجرا کنید.</p></section>:
   <section className="panel">
    <h2>شماره‌های پاسخ‌گویی</h2>
    <p>شماره‌های تماس در فوتر و صفحه ارتباط نمایش داده می‌شوند. موبایل بودن یک شماره، به معنی فعال بودن واتساپ روی آن نیست.</p>
    <form className="edit-form" method="post" action="/api/admin/settings">
     <input type="hidden" name="version" value={row.version}/>
     <label>شماره موبایل پاسخ‌گویی
      <input name="mobile" type="tel" dir="ltr" inputMode="numeric" maxLength={11} defaultValue={row.mobile} placeholder="09351300502" />
     </label>
     <label>شماره ثابت پاسخ‌گویی
      <input name="landline" type="tel" dir="ltr" inputMode="numeric" maxLength={11} defaultValue={row.landline} placeholder="02146010788"/>
     </label>
     <fieldset className="wide">
      <legend>مسیر واتساپ</legend>
      <p>تا زمانی که شماره واتساپ را تعیین و فعال نکنید، فرم پیام‌رسان غیرفعال می‌ماند. این تنظیم فقط لینک گفتگو را فعال می‌کند؛ اتصال وبهوک و ثبت خودکار لید تنظیم جداگانه‌ای دارد.</p>
      <label>شماره واتساپ در قالب موبایل ایران
       <input name="whatsapp_number" type="tel" dir="ltr" maxLength={18} defaultValue={row.whatsapp_number} placeholder="989xxxxxxxxx یا 09xxxxxxxxx"/>
      </label>
      <label className="check"><input name="whatsapp_enabled" type="checkbox" value="yes" defaultChecked={row.whatsapp_enabled}/><span>فعال‌کردن لینک واتساپ برای متقاضیان</span></label>
     </fieldset>
     <button type="submit">ذخیره امن تنظیمات ←</button>
    </form>
    <p>ویرایش شماره‌ها هیچ اطلاعاتی از مشتریان به شخص ثالث ارسال نمی‌کند. برای آزمایش، صفحه عمومی را بعد از ذخیره دوباره باز کنید.</p>
   </section>}
   <section className="panel"><h2>دامنه این مرحله</h2><p>مدیریت شماره‌های تماس و وضعیت واتساپ در این فاز داینامیک شده است. انتشار مقالات، اطلاعات ویزا و متادیتای سئو همچنان به بازبینی و فرایند انتشار جداگانه نیاز دارد.</p></section>
  </div>
 </main>
}
