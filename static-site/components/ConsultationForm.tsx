"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {visas} from "../lib/content";
import {buildWhatsAppUrl,makeLeadReference} from "../lib/whatsapp";

const purposes=["گردشگری","دیدار خانواده یا دوستان","سفر کاری کوتاه‌مدت","سایر اهداف (نیازمند بررسی نوع ویزا)"];
const windows=["کمتر از ۳ ماه آینده","۳ تا ۶ ماه آینده","بیشتر از ۶ ماه آینده","هنوز مشخص نیست"];
type HandoffStatus="idle"|"opened"|"error";

export default function ConsultationForm(){
 const [name,setName]=useState(""),[destination,setDestination]=useState("");
 const [purpose,setPurpose]=useState("گردشگری"),[timing,setTiming]=useState("هنوز مشخص نیست");
 const [sourcePath,setSourcePath]=useState("/consultation/");
 const [consent,setConsent]=useState(false),[status,setStatus]=useState<HandoffStatus>("idle");
 const [lastReference,setLastReference]=useState("");
 const [waNumber,setWaNumber]=useState("");
 useEffect(()=>{
  let active=true;
  fetch("/api/public/site-settings",{cache:"no-store"}).then(r=>r.ok?r.json():null)
   .then(data=>{if(active)setWaNumber(data?.whatsappEnabled&&/^989[0-9]{9}$/.test(data.whatsappNumber)?data.whatsappNumber:"")})
   .catch(()=>{if(active)setWaNumber("")});
  return ()=>{active=false};
 },[]);
 useEffect(()=>{
   const params=new URLSearchParams(window.location.search);
   const requested=params.get("destination")||"";
   const valid=visas.some(v=>v.slug===requested);
   if(valid){setDestination(requested);setSourcePath("/"+requested+"/")}
 },[]);
 const selected=visas.find(v=>v.slug===destination);
 const ready=!!waNumber&&!!selected&&!!purpose&&!!timing&&consent;
 const resetStatus=()=>setStatus("idle");
 function openWhatsApp(event:React.MouseEvent<HTMLAnchorElement>){
   if(!ready){event.preventDefault();setStatus("error");return}
   try{
     const reference=makeLeadReference(window.crypto);
     const href=buildWhatsAppUrl({name,destination,purpose,timing,sourcePath},reference,visas,waNumber);
     event.currentTarget.href=href;
     setLastReference(reference);
     setStatus("opened");
     // Event contains non-personal selection only. It is not proof the message was sent.
     window.dispatchEvent(new CustomEvent("khoshvisa:whatsapp_opened",{detail:{destination,source:"consultation"}}));
   }catch{
     event.preventDefault();setStatus("error");
   }
 }
 return <div className="refForm kv-wa-form">
  <span className="kv-wa-overline">KHOSHVISA / WHATSAPP CONTACT</span>
  <h2>درخواست راهنمایی ویزا</h2>
  <p>اطلاعات اولیه سفر را انتخاب کنید؛ سپس متن آماده را در واتساپ خوش‌ویزا بررسی و در صورت تمایل ارسال کنید. ارسال نهایی با خود شماست.</p>
  <form onSubmit={e=>e.preventDefault()}>
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
   {waNumber?<a href={"https://wa.me/"+waNumber} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp} aria-disabled={!ready} className={"kv-wa-submit "+(!ready?"is-disabled":"")}>ادامه در واتساپ <span aria-hidden="true">↗</span></a>:<button type="button" disabled className="kv-wa-submit is-disabled" aria-disabled="true">واتساپ خوش‌ویزا در حال راه‌اندازی است</button>}
   {!selected&&<p className="kv-wa-hint" role="status">برای ادامه، کشور مقصد را مشخص کنید.</p>}
   {selected&&!consent&&<p className="kv-wa-hint">لطفاً قبل از رفتن به واتساپ، توضیح انتقال داده را بخوانید و تأیید کنید.</p>}
   {!waNumber&&<p className="kv-wa-warning" role="status">شماره رسمی واتساپ خوش‌ویزا هنوز توسط مدیر سایت تنظیم نشده است. این فرم اطلاعاتی ارسال یا ذخیره نمی‌کند.</p>}
   {status==="opened"&&<div className="kv-wa-notice" role="status"><strong>واتساپ باز شد؛ پیام هنوز ثبت‌شده محسوب نمی‌شود.</strong><p>متن را در واتساپ بخوانید و برای ارسال، دکمه «ارسال» آن برنامه را بزنید. کد پیگیری همین مکالمه: <b dir="ltr">{lastReference}</b>. تا زمان دریافت پیام، امکان پیگیری از طرف خوش‌ویزا وجود ندارد.</p></div>}
   {status==="error"&&<p className="kv-wa-warning" role="alert">باز کردن واتساپ انجام نشد. مقصد و رضایت را کنترل کنید؛ اگر لازم بود از یک مرورگر به‌روز استفاده کنید.</p>}
   <small className="kv-wa-disclaimer">خوش‌ویزا نمایندگی رسمی دولت یا سفارت نیست و نتیجه ویزا را تضمین نمی‌کند. در این صفحه اطلاعات در سرور سایت ثبت نمی‌شود. انتقال احتمالی اطلاعات به ارائه‌دهنده خدمات مستقل فقط پس از اطلاع‌رسانی و رضایت جداگانه انجام خواهد شد.</small>
  </form>
 </div>;
}
