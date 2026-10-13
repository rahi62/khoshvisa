"use client";
import {useEffect,useState} from "react";
import type {FormEvent} from "react";
import Link from "next/link";
import {visas} from "../lib/content";
import {WA_NUMBER_READY,buildWhatsAppUrl,makeLeadReference} from "../lib/whatsapp";

const purposes=["گردشگری","دیدار خانواده یا دوستان","سفر کاری کوتاه‌مدت","سایر اهداف (نیازمند بررسی نوع ویزا)"];
const windows=["کمتر از ۳ ماه آینده","۳ تا ۶ ماه آینده","بیشتر از ۶ ماه آینده","هنوز مشخص نیست"];
type HandoffStatus="idle"|"opened"|"error";

export default function ConsultationForm(){
 const [name,setName]=useState(""),[destination,setDestination]=useState("");
 const [purpose,setPurpose]=useState("گردشگری"),[timing,setTiming]=useState("هنوز مشخص نیست");
 const [sourcePath,setSourcePath]=useState("/consultation/");
 const [consent,setConsent]=useState(false),[status,setStatus]=useState<HandoffStatus>("idle");
 const [lastReference,setLastReference]=useState("");
 useEffect(()=>{
   const params=new URLSearchParams(window.location.search);
   const requested=params.get("destination")||"";
   if(visas.some(v=>v.slug===requested)){
     setDestination(requested);
     setSourcePath("/"+requested+"/");
   }
   const requestedPurpose=params.get("purpose")||"";
   const requestedTiming=params.get("timing")||"";
   if(purposes.includes(requestedPurpose))setPurpose(requestedPurpose);
   if(windows.includes(requestedTiming))setTiming(requestedTiming);
   // The readiness checklist is the only supported alternate source. Do not trust arbitrary URLs.
   if(params.get("source")==="readiness")setSourcePath("/visa-readiness/");
 },[]);
 const selected=visas.find(v=>v.slug===destination);
 const ready=WA_NUMBER_READY&&!!selected&&!!purpose&&!!timing&&consent;
 const resetStatus=()=>setStatus("idle");

 function openWhatsApp(event:FormEvent<HTMLFormElement>){
   event.preventDefault();
   if(!ready){setStatus("error");return}
   try{
     const reference=makeLeadReference(window.crypto);
     const href=buildWhatsAppUrl({name,destination,purpose,timing,sourcePath},reference,visas);
     setLastReference(reference);
     // Opening the prefilled chat is not proof the visitor pressed Send in WhatsApp.
     setStatus("opened");
     window.dispatchEvent(new CustomEvent("khoshvisa:whatsapp_opened",{detail:{destination,source:"consultation"}}));
     // Same-tab navigation avoids popup blockers on mobile browsers and keyboard submissions.
     window.location.assign(href);
   }catch{
     setStatus("error");
   }
 }
 return <div id="kv-wa-form" className="refForm kv-wa-form">
  <span className="kv-wa-overline">KHOSHVISA / WHATSAPP CONTACT</span>
  <h2>ثبت درخواست اولیه سفر</h2>
  <p>مقصد، هدف و زمان احتمالی سفر را انتخاب کنید. ارسال نهایی پیام تنها با تأیید شما در واتساپ انجام می‌شود؛ این مرحله به معنی تشکیل قطعی پرونده یا مشاوره حقوقی نیست.</p>
  <form onSubmit={openWhatsApp}>
   <label htmlFor="kv-wa-name"><span>نام شما (اختیاری)</span><input id="kv-wa-name" type="text" value={name} maxLength={80} autoComplete="name" onChange={e=>{setName(e.target.value);resetStatus()}} placeholder="مثلاً علی رضایی"/></label>
   <label htmlFor="kv-wa-destination"><span>کشور یا مقصد موردنظر *</span>
    <select id="kv-wa-destination" value={destination} required onChange={e=>{setDestination(e.target.value);resetStatus()}}>
     <option value="">مقصد را انتخاب کنید</option>
     {visas.map(v=><option key={v.slug} value={v.slug}>{v.name}</option>)}
    </select></label>
   <label htmlFor="kv-wa-purpose"><span>هدف سفر *</span><select id="kv-wa-purpose" value={purpose} required onChange={e=>{setPurpose(e.target.value);resetStatus()}}>{purposes.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
   <label htmlFor="kv-wa-timing"><span>زمان تقریبی سفر *</span><select id="kv-wa-timing" value={timing} required onChange={e=>{setTiming(e.target.value);resetStatus()}}>{windows.map(x=><option key={x} value={x}>{x}</option>)}</select></label>
   <div className="kv-wa-privacy">
    <label htmlFor="kv-wa-consent" className="kv-wa-consent"><input id="kv-wa-consent" type="checkbox" checked={consent} onChange={e=>{setConsent(e.target.checked);resetStatus()}}/><span>موافقم متن آماده‌شده پس از تأیید و ارسال خودم از طریق واتساپ برای خوش‌ویزا فرستاده شود. می‌دانم واتساپ یک سرویس مستقل است و شماره حساب واتساپ من برای گیرنده نمایش داده می‌شود.</span></label>
    <Link href="/privacy/">مطالعه حریم خصوصی و نحوه استفاده از اطلاعات ←</Link>
   </div>
   <button type="submit" disabled={!ready} aria-disabled={!ready} className={"kv-wa-submit "+(!ready?"is-disabled":"")}>ادامه در واتساپ <span aria-hidden="true">↗</span></button>
   {!selected&&<p className="kv-wa-hint" role="status">برای ادامه، کشور مقصد را مشخص کنید.</p>}
   {selected&&!consent&&<p className="kv-wa-hint">لطفاً قبل از رفتن به واتساپ، توضیح انتقال داده را بخوانید و تأیید کنید.</p>}
   {!WA_NUMBER_READY&&<p className="kv-wa-warning" role="status">شماره واتساپ معتبر تنظیم نشده و اطلاعاتی ارسال نمی‌شود. برای ارتباط اولیه با <a href="tel:+989351300502">۰۹۳۵۱۳۰۰۵۰۲</a> یا <a href="tel:+982146010788">۰۲۱۴۶۰۱۰۷۸۸</a> تماس بگیرید.</p>}
   {status==="opened"&&<div className="kv-wa-notice" role="status"><strong>انتقال به واتساپ آغاز شد؛ پیام هنوز ثبت‌شده محسوب نمی‌شود.</strong><p>متن را در واتساپ بخوانید و برای ارسال، دکمه «ارسال» آن برنامه را بزنید. کد پیگیری این تلاش: <b dir="ltr">{lastReference}</b>. تا زمان دریافت پیام، امکان پیگیری از طرف خوش‌ویزا وجود ندارد.</p></div>}
   {status==="error"&&<p className="kv-wa-warning" role="alert">باز کردن واتساپ انجام نشد. مقصد و رضایت را کنترل کنید؛ اگر لازم بود از یک مرورگر به‌روز استفاده کنید.</p>}
   <small className="kv-wa-disclaimer">خوش‌ویزا نماینده رسمی سفارت، صادرکننده ویزا یا ارائه‌دهنده مستقیم مشاوره حقوقی مهاجرتی نیست و نتیجه را تضمین نمی‌کند. اطلاعات این فرم پیش از ارسال واتساپ در سرور سایت ثبت نمی‌شود. هویت مجری مستقل و هدف انتقال اطلاعات پیش از هر ارجاع به اطلاع متقاضی می‌رسد و رضایت جداگانه دریافت خواهد شد.</small>
  </form>
 </div>;
}
