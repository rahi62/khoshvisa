import Link from "next/link";
import {redirect} from "next/navigation";
import {isAdmin} from "@/lib/crm-auth";
import {database} from "@/lib/crm-db";
import {stageNames,stages,type LeadRow,type Stage} from "@/lib/crm-types";
export const dynamic="force-dynamic";
type Filter={stage?:string;page?:string;error?:string};
function fmt(value:Date|null|undefined){
 return value?new Intl.DateTimeFormat("fa-IR",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Tehran"}).format(new Date(value)):"—";
}
export default async function Dashboard({searchParams}:{searchParams:Promise<Filter>}){
 if(!await isAdmin())redirect("/admin/login");
 const params=await searchParams;
 const stage=stages.includes(params.stage as Stage)?params.stage as Stage:"";
 const page=Math.max(1,Math.min(500,Number.parseInt(params.page||"1",10)||1));
 const offset=(page-1)*50;
 const [data,count,due]=await Promise.all([
   database().query<LeadRow>(`
    SELECT * FROM leads WHERE ($1::text = '' OR stage=$1) ORDER BY last_contact_at DESC LIMIT 50 OFFSET $2
   `,[stage,offset]),
   database().query<{total:string}>("SELECT count(*)::text AS total FROM leads WHERE ($1::text='' OR stage=$1)",[stage]),
   database().query<{total:string}>(`SELECT count(*)::text AS total FROM leads WHERE stage='follow_up' AND follow_up_at<=now()`),
 ]);
 const total=Number(count.rows[0].total);
 const hasNext=page*50<total;
 const link=(n:number)=>"/admin?"+new URLSearchParams(stage?{stage,page:String(n)}:{page:String(n)}).toString();
 return <main className="admin-shell">
  <header className="admin-top"><div><strong>✦ خوش‌ویزا</strong><span>مدیریت درخواست‌های ارتباطی</span></div><form method="post" action="/api/admin/logout"><button type="submit">خروج امن</button></form></header>
  <div className="admin-width"><div className="admin-heading"><div><h1>داشبورد لیدها</h1><p>ثبت تماس‌های واقعی، پیگیری انسانی و انتقال اطلاعات فقط با رضایت مستند</p></div><div className="kv-admin-quicklinks"><Link href="/admin/settings">تنظیمات سایت ←</Link><Link href="https://khoshvisa.ir/consultation/" target="_blank">صفحه دریافت لید ↗</Link></div></div>
  <div className="metrics"><div><strong>{total.toLocaleString("fa-IR")}</strong><span>{stage?"تعداد در این وضعیت":"مجموع لیدها"}</span></div><div><strong>{Number(due.rows[0].total).toLocaleString("fa-IR")}</strong><span>پیگیری‌های سررسید شده</span></div><div><strong>تلفن / واتساپ</strong><span>کانال‌های دریافت اولیه</span></div></div>
  {params.error&&<p className="error" role="alert">ثبت دستی انجام نشد: {params.error==="already_exists"?"این شماره قبلاً ثبت شده است.":params.error==="not_confirmed"?"تأیید دریافت واقعی پیام لازم است.":params.error==="invalid_phone"?"شماره تماس نامعتبر است.":params.error==="invalid_channel"?"نوع تماس انتخاب‌شده معتبر نیست.":"ورودی یا سرویس را بررسی کنید."}</p>}
  <section className="panel">
   <div className="panel-head"><h2>درخواست‌ها</h2><form method="get" action="/admin"><label>وضعیت <select name="stage" defaultValue={stage}><option value="">همه وضعیت‌ها</option>{stages.map(s=><option key={s} value={s}>{stageNames[s]}</option>)}</select></label><button type="submit">فیلتر</button></form></div>
   <div className="table-wrap"><table><thead><tr><th>مخاطب</th><th>مقصد</th><th>وضعیت</th><th>آخرین فعالیت</th><th>موعد پیگیری</th><th>جزئیات</th></tr></thead>
   <tbody>{data.rows.map(l=><tr key={l.id}><td><strong>{l.name||"متقاضی"}</strong><small dir="ltr">...{l.wa_id.slice(-4)}</small></td><td>{l.destination||"نامشخص"}</td><td><span className={"stage stage-"+l.stage}>{stageNames[l.stage]}</span></td><td>{fmt(l.last_contact_at)}</td><td>{fmt(l.follow_up_at)}</td><td><Link href={"/admin/leads/"+l.id}>پیگیری ←</Link></td></tr>)}</tbody></table>
   {data.rowCount===0&&<p className="empty">در این وضعیت هنوز لیدی وجود ندارد.</p>}</div>
   <div className="pages">{page>1&&<Link href={link(page-1)}>→ صفحه قبل</Link>}<span>صفحه {page.toLocaleString("fa-IR")} · {total.toLocaleString("fa-IR")} لید</span>{hasNext&&<Link href={link(page+1)}>صفحه بعد ←</Link>}</div>
  </section>
  <section className="panel manual"><h2>ثبت دستی تماس یا مکالمه واقعی</h2><p>لید را تنها بعد از دریافت تماس تلفنی یا پیام واقعی واتساپ ثبت کن؛ شماره پاسخ‌گویی خود سایت را به‌جای شماره متقاضی ننویس. این فرم هیچ پیام یا تماسی ارسال نمی‌کند.</p>
   <form action="/api/admin/leads" method="post"><label>کانال دریافت <select name="channel" defaultValue="phone_manual"><option value="phone_manual">تماس تلفنی واقعی</option><option value="whatsapp_manual">پیام واتساپ دریافت‌شده</option></select></label><label>شماره تماس متقاضی <input name="wa_id" placeholder="0935... یا 98935..." dir="ltr" required maxLength={30}/></label>
    <label>نام (اختیاری) <input name="name" maxLength={120}/></label><label>مقصد <input name="destination" maxLength={80}/></label>
    <label>کد پیگیری (اختیاری) <input name="tracking_reference" placeholder="KV-..." dir="ltr" maxLength={32}/></label>
    <label className="wide check"><input type="checkbox" name="confirmed_contact" value="yes" required/><span>تأیید می‌کنم تماس یا پیام واقعی از این متقاضی دریافت شده است.</span></label>
    <button type="submit">ثبت لید واقعی ←</button></form>
  </section></div>
 </main>;
}
