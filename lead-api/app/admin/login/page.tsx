import Link from "next/link";
import {redirect} from "next/navigation";
import {isAdmin} from "@/lib/auth";
export const dynamic="force-dynamic";
const errors:Record<string,string>={
 invalid:"اطلاعات ورود معتبر نیست.",
 wait:"تلاش‌های ناموفق زیاد بوده‌اند؛ ۱۵ دقیقه دیگر دوباره امتحان کنید.",
 setup:"نام کاربری یا تنظیمات امنیتی سرور هنوز کامل نشده است.",
 unavailable:"سرویس مدیریت موقتاً در دسترس نیست.",
};
export default async function Login({searchParams}:{searchParams:Promise<{error?:string}>}){
 if(await isAdmin())redirect("/admin");
 const {error}=await searchParams;
 return <main className="login-screen"><section className="login-card">
  <div className="brand">✦ خوش‌ویزا <small>LEAD OPERATIONS</small></div>
  <h1>ورود مدیر</h1>
  <p>پیگیری مکالمات واقعی واتساپ و وضعیت درخواست‌ها</p>
  {error&&<p className="error" role="alert">{errors[error]||"عملیات انجام نشد."}</p>}
  <form action="/api/admin/login" method="post">
    <label htmlFor="login-email">ایمیل مدیر</label><input id="login-email" name="email" type="email" autoComplete="username" required maxLength={180}/>
    <label htmlFor="login-password">رمز عبور</label><input id="login-password" name="password" type="password" autoComplete="current-password" required/>
    <button type="submit">ورود امن به پنل ←</button>
  </form>
  <div className="fineprint">حساب مدیر به‌صورت امن روی VPS پیکربندی می‌شود. <Link href="https://khoshvisa.ir/">سایت خوش‌ویزا ↗</Link></div>
 </section></main>;
}
