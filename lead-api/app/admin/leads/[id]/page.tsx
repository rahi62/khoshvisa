import Link from "next/link";
import {notFound,redirect} from "next/navigation";
import {isAdmin} from "@/lib/auth";
import {database} from "@/lib/db";
import {stageNames,stages,type LeadRow} from "@/lib/types";
export const dynamic="force-dynamic";
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function date(value:Date|null|undefined){
 return value?new Intl.DateTimeFormat("fa-IR",{dateStyle:"medium",timeStyle:"short",timeZone:"Asia/Tehran"}).format(new Date(value)):"—";
}
function dueInput(value:Date|null){
 if(!value)return "";
 const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Tehran",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date(value));
 const get=(type:string)=>parts.find(x=>x.type===type)?.value||"";
 return get("year")+"-"+get("month")+"-"+get("day")+"T"+get("hour")+":"+get("minute");
}
type Audit={id:number;actor:string;action:string;old_stage:string|null;new_stage:string|null;occurred_at:Date};
export default async function LeadDetail({params,searchParams}:{params:Promise<{id:string}>;searchParams:Promise<{saved?:string;error?:string}>}){
 if(!await isAdmin())redirect("/admin/login");
 const {id}=await params;if(!UUID.test(id))notFound();
 const [r,history]=await Promise.all([
  database().query<LeadRow>("SELECT * FROM leads WHERE id=$1",[id]),
  database().query<Audit>("SELECT id,actor,action,old_stage,new_stage,occurred_at FROM lead_audit WHERE lead_id=$1 ORDER BY occurred_at DESC LIMIT 30",[id])
 ]);
 if(!r.rowCount)notFound();
 const lead=r.rows[0];const state=await searchParams;
 const issue:Record<string,string>={conflict:"این درخواست هم‌زمان تغییر کرده است؛ صفحه را دوباره بارگذاری و بررسی کنید.",due_required:"برای وضعیت نیازمند پیگیری، تاریخ پیگیری را وارد کنید.",consent_incomplete:"برای ثبت رضایت انتقال، گیرنده، دامنه انتقال و مرجع مستند را وارد کنید.",consent_required:"اشتراک اطلاعات بدون رضایت جداگانه ثبت‌شده مجاز نیست.",provider_mismatch:"گیرنده ثبت‌شده باید با گیرنده‌ای که برایش رضایت گرفته‌اید یکسان باشد.",transfer_required:"ارجاع فقط پس از انتقال واقعی و ثبت مشخصات آن قابل انتخاب است.",invalid_date:"فرمت تاریخ پیگیری معتبر نیست.",unavailable:"ذخیره انجام نشد؛ اتصال دیتابیس را بررسی کنید."};
 return <main className="admin-shell"><header className="admin-top"><div><strong>✦ خوش‌ویزا</strong><span>پرونده ارتباط واتساپی</span></div><Link href="/admin">→ بازگشت به همه لیدها</Link></header>
 <div className="admin-width detail"><div className="admin-heading"><div><h1>{lead.name||"مخاطب واتساپ"}</h1><p dir="ltr">+{lead.wa_id}</p></div><a href={"https://wa.me/"+lead.wa_id} target="_blank" rel="noopener noreferrer">بازکردن مکالمه واتساپ ↗</a></div>
 {state.saved&&<p className="success" role="status">اطلاعات درخواست ذخیره شد.</p>}
 {state.error&&<p className="error" role="alert">{issue[state.error]||"این عملیات انجام نشد."}</p>}
 <div className="detail-grid"><section className="panel">
  <h2>وضعیت و پیگیری</h2>
  <dl className="facts"><div><dt>مقصد</dt><dd>{lead.destination||"—"}</dd></div><div><dt>هدف سفر</dt><dd>{lead.purpose||"—"}</dd></div><div><dt>زمان سفر</dt><dd>{lead.travel_window||"—"}</dd></div><div><dt>کد پیگیری</dt><dd dir="ltr">{lead.tracking_reference||"—"}</dd></div><div><dt>منبع</dt><dd>{lead.source==="whatsapp_webhook"?"وبهوک رسمی متا":"ثبت دستی تأییدشده"}</dd></div><div><dt>پیام‌های ثبت‌شده از Webhook</dt><dd>{lead.message_count.toLocaleString("fa-IR")}</dd></div><div><dt>آخرین پیام</dt><dd>{date(lead.last_contact_at)}</dd></div><div><dt>وضعیت کنونی</dt><dd><span className={"stage stage-"+lead.stage}>{stageNames[lead.stage]}</span></dd></div></dl>
  <form action={"/api/admin/leads/"+id} method="post" className="edit-form">
   <input type="hidden" name="version" value={lead.version}/>
   <label>وضعیت درخواست <select name="stage" defaultValue={lead.stage}>{stages.map(s=><option value={s} key={s}>{stageNames[s]}</option>)}</select></label>
   <label>پیگیری بعدی (ساعت تهران) <input type="datetime-local" name="follow_up_at" defaultValue={dueInput(lead.follow_up_at)}/></label>
   <label className="wide">یادداشت داخلی (بدون اطلاعات حساس) <textarea rows={5} maxLength={2000} name="admin_notes" defaultValue={lead.admin_notes}/></label>
   <fieldset className="wide"><legend>رضایت مستقل برای انتقال اطلاعات به ارائه‌دهنده ثالث</legend>
    {lead.partner_consent_at?<p className="success">رضایت مستند در {date(lead.partner_consent_at)} ثبت شده است.</p>:<label className="check"><input type="checkbox" name="confirm_partner_consent" value="yes"/><span>پس از اطلاع‌رسانی به متقاضی، رضایت مشخص و مستند او را واقعاً دریافت کرده‌ام.</span></label>}
    <label>نام ارائه‌دهنده مستقل <input name="partner_provider" maxLength={160} defaultValue={lead.partner_consent_provider}/></label>
    <label>دامنه اطلاعات مورد توافق <input name="partner_scope" maxLength={240} defaultValue={lead.partner_consent_scope} placeholder="مثلاً نام، شماره واتساپ و کشور مقصد"/></label>
    <label>مرجع مستند رضایت <input name="partner_evidence" maxLength={190} defaultValue={lead.partner_consent_evidence} placeholder="شناسه پیام واتساپ یا مدرک معتبر ثبت‌شده"/></label>
    {lead.referred_at?<p className="success">انتقال واقعی به {lead.referred_to} در {date(lead.referred_at)} ثبت شده است.</p>:<label className="check"><input type="checkbox" name="confirm_actual_referral" value="yes"/><span>تأیید می‌کنم اطلاعات توافق‌شده واقعاً به همین ارائه‌دهنده ارسال شده‌اند (این گزینه اطلاعاتی ارسال نمی‌کند).</span></label>}
   </fieldset>
   <button type="submit">ذخیره وضعیت و مستندات ←</button>
  </form>
 </section>
 <aside className="panel history"><h2>تاریخچه تغییرات</h2>{history.rows.length?history.rows.map(x=><div key={x.id}><strong>{x.action==="stage_changed"?"تغییر وضعیت":x.action==="partner_consent_recorded"?"ثبت رضایت انتقال":x.action==="actual_referral_recorded"?"ثبت ارجاع واقعی":"ثبت دستی"}</strong><small>{date(x.occurred_at)}</small>{x.old_stage&&x.new_stage&&<p>{stageNames[x.old_stage as keyof typeof stageNames]||x.old_stage} ← {stageNames[x.new_stage as keyof typeof stageNames]||x.new_stage}</p>}</div>):<p>هنوز تغییر ثبت نشده است.</p>}
 <div className="warning-note">ارسال خودکار به همکار وجود ندارد. این پنل فقط ثبت شواهد رضایت و عملیات واقعی را انجام می‌دهد.</div>
 </aside></div>
 </div></main>;
}
