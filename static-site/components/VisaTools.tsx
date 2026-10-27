"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import type {Visa} from "../lib/content";
import {destinationFacts} from "../lib/visa-comparison";

const fa=(n:number)=>new Intl.NumberFormat("fa-IR").format(n);
export function HeroDestinationSearch(){
 const [q,setQ]=useState("");
 return <form className="cin-hero-search" action="/destinations/" method="get" role="search"><label htmlFor="cin-search">مقصد سفرت کجاست؟</label><div><span aria-hidden="true">⌕</span><input id="cin-search" name="q" value={q} onChange={e=>setQ(e.target.value)} placeholder="نام کشور یا مقصد را جست‌وجو کنید" autoComplete="off"/><button type="submit">جست‌وجوی مقصد ←</button></div></form>;
}
export function VisaCompare({items}:{items:Visa[]}){
 const [chosen,setChosen]=useState<string[]>(["schengen-visa","canada-tourist-visa"]);
 const selected=useMemo(()=>items.filter(v=>chosen.includes(v.slug)),[items,chosen]);
 const toggle=(slug:string)=>setChosen(current=>current.includes(slug)?current.filter(s=>s!==slug):current.length<3?[...current,slug]:current);
 return <section className="cin-compare seo-tools-compare" aria-label="مقایسه راهنماهای ویزا">
 <h2>مقایسه اطلاعات واقعی مقصدها</h2>
 <p>تا سه مقصد انتخاب کنید. اعداد و مراحل، خلاصه رسمی و قابل تغییر هستند؛ این ابزار احتمال دریافت ویزا یا تصمیم قطعی درباره صلاحیت را محاسبه نمی‌کند.</p>
 <div className="cin-compare-choices">{items.map(v=><label key={v.slug}><input type="checkbox" checked={chosen.includes(v.slug)} disabled={!chosen.includes(v.slug)&&chosen.length===3} onChange={()=>toggle(v.slug)}/><span>{v.flag} {v.name}</span></label>)}</div>
 <p className="seo-compare-status" aria-live="polite">{fa(selected.length)} از ۳ مقصد انتخاب شده است.</p>
 {selected.length>0?<div className="cin-compare-grid">{selected.map(v=>{const facts=destinationFacts[v.slug];return <article key={v.slug}>
 <div className="cin-compare-photo" style={{backgroundImage:"url('"+v.photo+"')"}} role="img" aria-label={"تصویر مقصد "+v.name}/>
 <h3>{v.flag} {v.name}</h3><small>{v.region}</small>
 {facts?<><dl className="seo-compare-facts">
  <div><dt>نوع درخواست</dt><dd>{facts.type}</dd></div>
  <div><dt>هزینه رسمی</dt><dd>{facts.fee}</dd></div>
  <div><dt>زمان متداول بررسی</dt><dd>{facts.processing}</dd></div>
  <div><dt>روش درخواست</dt><dd>{facts.filing}</dd></div></dl>
  <p className="seo-compare-warning">{facts.warning}</p>
  <small>بررسی منابع: {facts.updated}</small>
  </>:<><p>{v.summary}</p><p className="seo-compare-warning">اطلاعات عددی این کشور هنوز به‌صورت اختصاصی راستی‌آزمایی نشده‌اند؛ از مرجع رسمی استفاده کنید.</p></>}
  <div className="cin-compare-actions"><Link href={"/"+v.slug+"/"}>راهنمای کشور ←</Link><a href={facts?.official||v.source} target="_blank" rel="noopener noreferrer">مرجع رسمی ↗</a></div>
 </article>})}</div>:<div className="emptyState">برای شروع، دست‌کم یک مقصد انتخاب کنید.</div>}
 <p className="cin-disclaimer">ارقام و استانداردهای پردازش با زمان رزرو وقت، هزینه خصوصی خدمات و تصمیم نهایی مرجع صادرکننده متفاوت‌اند؛ پیش از پرداخت به منبع رسمی بروید.</p>
 </section>;
}
const generalDocs=["گذرنامه و اسناد هویتی","مدارک مالی متناسب با سفر","مدارک شغلی، تحصیلی یا خانوادگی","برنامه سفر و اقامت","اسناد حمایتی در صورت کاربرد"];
export function VisaReadiness({items}:{items:Visa[]}){
 const [step,setStep]=useState(0),[destination,setDestination]=useState(""),[purpose,setPurpose]=useState(""),[timing,setTiming]=useState(""),[docs,setDocs]=useState<string[]>([]);
 const visa=items.find(v=>v.slug===destination),facts=destinationFacts[destination],checks=facts?.docs||generalDocs;
 const ready=Boolean(destination&&purpose&&timing);
 function selectDestination(next:string){setDestination(next);setDocs([])}
 return <section className="cin-readiness" aria-label="چک‌لیست آمادگی مقدماتی درخواست ویزا">
 <div className="cin-readiness-progress" aria-label={"مرحله "+fa(step+1)+" از ۴"}>{[0,1,2,3].map(n=><span key={n} className={n<=step?"filled":""}/>)}</div>
 <p className="overline">راهنمای تصمیم‌گیری • مرحله {fa(step+1)} از ۴</p>
 {step===0&&<div><h2>کدام کشور را انتخاب کرده‌اید؟</h2><p>این ابزار فقط یک چک‌لیست اطلاعاتی در مرورگر است؛ اطلاعاتی ارسال نمی‌شود و واجدشرایط‌بودن را تأیید نمی‌کند.</p>
 <label className="cin-readiness-select">مقصد سفر<select value={destination} onChange={e=>selectDestination(e.target.value)}><option value="">انتخاب مقصد</option>{items.map(v=><option key={v.slug} value={v.slug}>{v.name}</option>)}</select></label>
 </div>}
 {step===1&&<div><h2>هدف واقعی سفر چیست؟</h2><div className="cin-choice-grid">{["گردشگری","دیدار خانواده یا دوستان","سایر اهداف (نیازمند بررسی نوع ویزا)"].map(v=><button key={v} type="button" aria-pressed={purpose===v} onClick={()=>setPurpose(v)}>{v}</button>)}</div><p>انتخاب دسته ویزا باید متناسب با فعالیت مجاز و مقررات کشور مقصد باشد.</p></div>}
 {step===2&&<div><h2>برای چه زمانی برنامه دارید؟</h2><div className="cin-choice-grid">{["کمتر از ۳ ماه آینده","۳ تا ۶ ماه آینده","بیشتر از ۶ ماه آینده","هنوز مشخص نیست"].map(v=><button key={v} type="button" aria-pressed={timing===v} onClick={()=>setTiming(v)}>{v}</button>)}</div><p>زمان مجاز ثبت درخواست و ظرفیت وقت سفارت برای کشورها متفاوت است.</p></div>}
 {step===3&&<div><h2>کدام گروه مدارک را آماده دارید؟</h2><p>چک‌لیست مقدماتی {visa?.name} است؛ فهرست رسمی و شخصی متقاضی می‌تواند متفاوت باشد. نتیجه فقط روی این صفحه محاسبه می‌شود.</p>
 <div className="cin-check-list">{checks.map(x=><label key={x}><input type="checkbox" checked={docs.includes(x)} onChange={e=>setDocs(a=>e.target.checked?[...a,x]:a.filter(y=>y!==x))}/><span>{x}</span></label>)}</div></div>}
 <div className="cin-readiness-actions">{step>0&&<button type="button" className="cin-secondary-button" onClick={()=>setStep(s=>s-1)}>مرحله قبل →</button>}{step<3&&<button type="button" className="cin-primary-button" disabled={(step===0&&!destination)||(step===1&&!purpose)||(step===2&&!timing)} onClick={()=>setStep(s=>s+1)}>ادامه ←</button>}</div>
 {step===3&&ready&&<div className="cin-readiness-result" aria-live="polite">
 <h3>فهرست اولیه سفر به {visa?.name}</h3><p>هدف: {purpose} | زمان برنامه: {timing}</p>
 <p>{fa(docs.length)} مورد از {fa(checks.length)} گروه مدرک علامت زده شده است. این عدد «امتیاز ویزا» یا پیش‌بینی تأیید نیست.</p>
 {checks.some(x=>!docs.includes(x))&&<><strong>مواردی که هنوز باید بررسی کنید:</strong><ul>{checks.filter(x=>!docs.includes(x)).map(x=><li key={x}>{x}</li>)}</ul></>}
 {facts&&<p>{facts.warning}</p>}
 <p>برای بررسی شرایط قانونی، مدارک شخصی و زمان ثبت درخواست، حتماً به راهنمای رسمی مراجعه کنید.</p>
 <div className="cin-compare-actions"><Link href={"/"+visa?.slug+"/"}>راهنمای مقصد ←</Link><a href={facts?.official||visa?.source} target="_blank" rel="noopener noreferrer">مرجع رسمی ↗</a><Link href={"/consultation/?"+new URLSearchParams({destination,purpose,timing,source:"readiness"}).toString()} className="cin-primary-button">ادامه درخواست در واتساپ ↗</Link></div>
 </div>}
 </section>;
}
