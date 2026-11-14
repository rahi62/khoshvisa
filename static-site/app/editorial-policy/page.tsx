import Link from "next/link";
import type { Metadata } from "next";
import "../visa-guides/guide.css";

export const metadata: Metadata = {
 title: {absolute:"سیاست تحریریه خوش‌ویزا | نحوه تهیه و بازبینی محتوای ویزا"},
 description: "خوش‌ویزا محتوای ویزا را چگونه تهیه، منبع‌یابی و به‌روزرسانی می‌کند؛ نقش منابع رسمی، محدودیت‌ها و راه گزارش خطا.",
 openGraph: {
  description: "خوش‌ویزا محتوای ویزا را چگونه تهیه، منبع‌یابی و به‌روزرسانی می‌کند؛ نقش منابع رسمی، محدودیت‌ها و راه گزارش خطا."
 },
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
     <p>در راهنماهایی که فهرست منابع دارند، پیوند منابع مورد استفاده در بخش منابع مقاله آمده است. در برخی بخش‌ها نیز، هرجا منبع مشخصی درج شده باشد، پیوند آن در همان بخش نمایش داده می‌شود.</p>
    </section>
    <section className="seo-guide-section">
     <h2>تفکیک اطلاعات رسمی از توصیه عمومی</h2>
     <p>در برخی راهنماها، الزامات اعلام‌شده از سوی مرجع رسمی از توضیحات و توصیه‌های عمومی جدا شده‌اند. توصیه عمومی خوش‌ویزا را نباید به‌عنوان الزام رسمی مرجع صدور ویزا در نظر گرفت؛ توضیحات مربوط به خدمات نیز جایگزین الزامات رسمی نیستند.</p>
    </section>
    <section className="seo-guide-section">
     <h2>به‌روزرسانی</h2>
     <p>در راهنماهایی که اطلاعات بازبینی برای آن‌ها ثبت شده است، تاریخ آخرین بررسی منابع در ابتدای مقاله نمایش داده می‌شود.</p>
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
