import Link from "next/link";
import ConsultationForm from "../../components/ConsultationForm";
export const metadata={
 alternates:{canonical:"/consultation/"},
 title:"ثبت درخواست اولیه ویزا از طریق واتساپ",
 description:"مقصد، هدف و زمان تقریبی سفر را انتخاب کنید و در صورت فعال‌بودن واتساپ رسمی خوش‌ویزا، پیام درخواست اولیه خود را با رضایت ارسال کنید."
};
export default function Page(){
 return <main className="refConsultPage kv-wa-page">
 <section className="innerHero"><div className="shell"><span className="overline">KHOSHVISA • WHATSAPP</span>
  <h1>شروع ارتباط <em>با خوش‌ویزا</em></h1>
  <p>مقصد و زمان سفر را انتخاب کن. در صورت فعال‌بودن شماره رسمی، متن آماده در واتساپ باز می‌شود و فقط با ارسال خودت به دست ما می‌رسد.</p>
 </div></section>
 <div className="shell refConsultStandalone kv-wa-layout"><ConsultationForm/><div className="kv-wa-explainer">
 <span className="kv-wa-overline">HOW IT WORKS</span><h2>از انتخاب مقصد تا هماهنگی اولیه</h2>
 <ol>
  <li><span>۱</span><div><strong>مشخص‌کردن درخواست</strong><p>کشور، هدف و زمان تقریبی سفر را انتخاب کن؛ برای شروع، تصویر مدارک یا اطلاعات حساس لازم نیست.</p></div></li>
  <li><span>۲</span><div><strong>ارسال آگاهانه پیام</strong><p>متن آماده را در واتساپ بررسی کن و اگر مایل بودی، دکمه ارسال را بزن. صرف بازشدن واتساپ به معنی ثبت درخواست نیست.</p></div></li>
  <li><span>۳</span><div><strong>هماهنگی مراحل احتمالی</strong><p>در صورت دریافت پیام، ادامه گفتگو از همان کانال انجام می‌شود. در صورت نیاز به مجری خدمات، مشخصات و شرایط او پیش از ارجاع و انتقال اطلاعات اعلام خواهد شد.</p></div></li>
 </ol>
 <p className="kv-wa-explainer-alert">خوش‌ویزا مرجع صادرکننده ویزا یا ارائه‌دهنده مستقیم مشاوره حقوقی مهاجرت نیست و نتیجه ویزا را تضمین نمی‌کند. پیش از اقدام، <Link href="/destinations/">اطلاعات رسمی کشور مقصد</Link> را بخوان.</p>
 </div></div>
 </main>;
}
