import Link from "next/link";
import {redirect} from "next/navigation";
import {isAdmin} from "@/lib/crm-auth";
import {readSiteSettings} from "@/lib/site-settings-server";
import type {SiteSettings} from "@/lib/site-settings";
export const dynamic="force-dynamic";
const errors:Record<string,string>={
 invalid:"ورودی‌ها معتبر نیستند. شماره‌ها، طول متن، ایمیل و آدرس HTTPS را بررسی کنید.",
 conflict:"اطلاعات هم‌زمان ویرایش شده است؛ صفحه را دوباره باز کنید.",
 unavailable:"اتصال به دیتابیس یا Migration تنظیمات آماده نیست. ذخیره انجام نشد."
};
const row=(name:keyof SiteSettings,title:string,value:string,maxLength:number,placeholder="")=>
 <label key={name}>{title}<input name={name} defaultValue={value} maxLength={maxLength} placeholder={placeholder}/></label>;
export default async function Settings({searchParams}:{searchParams:Promise<{error?:string;saved?:string}>}){
 if(!await isAdmin())redirect("/admin/login?next=%2Fadmin%2Fsettings");
 const [params,{settings:s,ready}]=await Promise.all([searchParams,readSiteSettings()]);
 return <main className="admin-shell"><header className="admin-top"><div><strong>✦ خوش‌ویزا</strong><span>تنظیمات عمومی سایت</span></div><Link href="/admin">داشبورد ←</Link></header>
  <div className="admin-width"><div className="admin-heading"><div><h1>تنظیمات سایت</h1><p>تنظیم اطلاعات برند، پاسخ‌گویی و نمایش عمومی، بدون CMS مجزا.</p></div><Link href="/contact/" target="_blank">مشاهده صفحه تماس ↗</Link></div>
  {params.saved&&<p className="success" role="status">تنظیمات در PostgreSQL ذخیره شدند.</p>}
  {params.error&&<p className="error" role="alert">{errors[params.error]??errors.invalid}</p>}
  {!ready&&<p className="error" role="alert">دیتابیس تنظیمات در دسترس نیست. مقادیر فعلی پیش‌فرض‌اند و امکان ذخیره وجود ندارد.</p>}
  <form method="post" action="/api/admin/settings">
   <input type="hidden" name="version" value={s.version}/>
   <section className="panel"><h2>هویت برند</h2><div className="edit-form">
    {row("brandName","نام فارسی",s.brandName,120)}
    {row("brandNameEn","نام انگلیسی",s.brandNameEn,120)}
    {row("tagline","توضیح کوتاه",s.tagline,220)}
    {row("logoUrl","نشانی HTTPS لوگو",s.logoUrl,2048,"https://...")}
    {row("faviconUrl","نشانی HTTPS آیکن سایت",s.faviconUrl,2048,"https://...")}
    <label className="wide">توضیحات فوتر<textarea name="footerDescription" maxLength={600} rows={3} defaultValue={s.footerDescription}/></label>
   </div></section>
   <section className="panel"><h2>راه‌های ارتباطی</h2><div className="edit-form">
    {row("supportMobile","موبایل پاسخ‌گویی",s.supportMobile,24,"09351300502")}
    {row("supportLandline","تلفن ثابت پاسخ‌گویی",s.supportLandline,24,"02146010788")}
    {row("email","ایمیل عمومی",s.email,254,"info@example.com")}
    {row("instagramUrl","لینک اینستاگرام (HTTPS)",s.instagramUrl,2048)}
    {row("telegramUrl","لینک تلگرام (HTTPS)",s.telegramUrl,2048)}
    <fieldset className="wide"><legend>واتساپ (مستقل از شماره موبایل تماس)</legend>
     <p>لینک شروع مکالمه فقط وقتی نمایش داده می‌شود که شماره معتبر را وارد و این گزینه را فعال کنید. فعال‌سازی به معنی اتصال وبهوک یا ثبت خودکار لید نیست.</p>
     <label>شماره واتساپ (مانند 989xxxxxxxxx)<input name="whatsappNumber" type="tel" dir="ltr" maxLength={26} defaultValue={s.whatsappNumber}/></label>
     <label className="check"><input type="checkbox" name="whatsappEnabled" value="yes" defaultChecked={s.whatsappEnabled}/><span>فعال‌سازی لینک واتساپ برای مخاطبان</span></label>
    </fieldset>
   </div></section>
   <section className="panel"><h2>پیش‌فرض‌های سئو</h2>
    <p>این مقادیر برای صفحات داینامیک آینده نگهداری می‌شوند؛ متادیتای صفحات استاتیک مقصدها، Sitemap و Canonical فعلاً در کد ثابت می‌مانند.</p>
    <div className="edit-form">
     {row("defaultMetaTitle","عنوان پیش‌فرض سایت",s.defaultMetaTitle,180)}
     {row("defaultOgImageUrl","نشانی HTTPS تصویر اشتراک‌گذاری",s.defaultOgImageUrl,2048)}
     <label className="wide">توضیحات متا<textarea name="defaultMetaDescription" maxLength={320} rows={3} defaultValue={s.defaultMetaDescription}/></label>
    </div>
   </section>
   <section className="panel"><button type="submit" disabled={!ready}>ذخیره امن تنظیمات ←</button>
    <p>فقط اطلاعات عمومی ذخیره می‌شود. تغییر شماره‌های سایت، داده لیدها یا CRM را تغییر نمی‌دهد.</p>
   </section>
  </form></div>
 </main>;
}
