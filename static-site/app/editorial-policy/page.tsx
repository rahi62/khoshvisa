import Link from "next/link";
import type { Metadata } from "next";
import "../visa-guides/guide.css";

export const metadata: Metadata = {
 title: {absolute:"سیاست تحریریه خوش‌ویزا | نحوه تهیه و بازبینی محتوای ویزا"},
 alternates: {canonical:"https://khoshvisa.ir/editorial-policy/"}
};

export default function Page(){
 return <main className="seo-guide">
  <header className="seo-guide-hero">
   <div className="seo-container">
    <span className="seo-overline">سیاست تحریریه</span>
    <h1>سیاست تحریریه خوش‌ویزا</h1>
   </div>
  </header>
  <div className="seo-container seo-guide-layout">
   <article style={{gridColumn:"1 / -1"}}>
    <section className="seo-guide-section">
     <h2>منبع اطلاعات</h2>
     <p>منابع مورد استفاده برای تهیه راهنماهای خوش‌ویزا، اطلاعات منتشرشده از سوی دولت‌ها، سفارت‌ها و مراکز مجاز مرتبط هستند.</p>
    </section>
    <section className="seo-guide-section">
     <h2>تفکیک اطلاعات رسمی از توصیه عمومی</h2>
     <p>اطلاعات منتشرشده از سوی مراجع رسمی از توضیحات و توصیه‌های عمومی خوش‌ویزا تفکیک می‌شوند. توصیه عمومی به‌عنوان الزام رسمی معرفی نمی‌شود.</p>
    </section>
    <section className="seo-guide-section">
     <h2>به‌روزرسانی</h2>
     <p>تاریخ آخرین بررسی محتوا در هر راهنمای ویزا درج می‌شود.</p>
    </section>
    <section className="seo-guide-section">
     <h2>محدودیت‌ها و عدم تضمین</h2>
     <p>خوش‌ویزا نماینده سفارت یا مرجع صدور ویزا نیست. نتیجه درخواست ویزا تضمین نمی‌شود. خوش‌ویزا ادعای بازبینی حقوقی مطالب منتشرشده را مطرح نمی‌کند.</p>
    </section>
    <section className="seo-guide-section">
     <h2>مسئولیت انتشار و گزارش خطا</h2>
     <p>مسئولیت انتشار مطالب با خوش‌ویزا است. برای گزارش خطا یا اعلام مغایرت در محتوا، از <Link href="/consultation/">صفحه مشاوره</Link> استفاده کنید.</p>
    </section>
   </article>
  </div>
 </main>;
}
