import Link from "next/link";
import ConsultationForm from "../../components/ConsultationForm";
export const metadata={alternates:{canonical:"/consultation/"},title:"درخواست راهنمایی ویزا در واتساپ",description:"با انتخاب مقصد و هدف سفر، پیام خود را با رضایت در واتساپ خوش‌ویزا ارسال کنید. ارتباط اولیه بدون فرم ذخیره اطلاعات شخصی."};
export default function Page(){return <main className="refConsultPage kv-wa-page">
 <section className="innerHero"><div className="shell"><span className="overline">KHOSHVISA • WHATSAPP</span><h1>شروع ارتباط <em>در واتساپ</em></h1><p>مقصد و زمان سفر را انتخاب کن؛ پیام آماده در واتساپ خوش‌ویزا باز می‌شود و فقط با ارسال خودت به دست ما می‌رسد.</p></div></section>
 <div className="shell refConsultStandalone kv-wa-layout"><ConsultationForm/><div className="kv-wa-explainer">
 <span className="kv-wa-overline">HOW IT WORKS</span><h2>از پرسش تا هماهنگی سفر</h2>
 <ol><li><span>۱</span><div><strong>انتخاب مقصد</strong><p>کشور، هدف و زمان تقریبی سفرت را مشخص کن. شماره موبایل، مدارک و اطلاعات حساس لازم نیست.</p></div></li>
 <li><span>۲</span><div><strong>ارسال توسط خودت</strong><p>متن از پیش آماده را در واتساپ بررسی کن و در صورت تأیید دکمه ارسال را بزن. صرف باز شدن واتساپ به معنای ثبت درخواست نیست.</p></div></li>
 <li><span>۳</span><div><strong>هماهنگی مراحل بعدی</strong><p>پس از دریافت پیام، مکالمه در واتساپ ادامه پیدا می‌کند و وضعیت درخواست بر اساس ارتباط واقعی پیگیری می‌شود.</p></div></li></ol>
 <p className="kv-wa-explainer-alert">هیچ شخص یا مجموعه‌ای صدور ویزا را تضمین نمی‌کند. اطلاعات و شرایط رسمی مقصد را از <Link href="/destinations/">راهنماهای کشورها</Link> بررسی کن.</p>
 </div></div>
 </main>}