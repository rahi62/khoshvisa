"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import type {Visa} from "../lib/content";

export function HeroDestinationSearch(){const [q,setQ]=useState("");return <form className="cin-hero-search" action="/destinations/" method="get" role="search"><label htmlFor="cin-search">مقصد سفرت کجاست؟</label><div><span aria-hidden="true">⌕</span><input id="cin-search" name="q" value={q} onChange={e=>setQ(e.target.value)} placeholder="نام کشور یا مقصد را جست‌وجو کنید" autoComplete="off"/><button type="submit">جست‌وجوی مقصد ←</button></div></form>}
export function VisaCompare({items}:{items:Visa[]}){
 const [chosen,setChosen]=useState<string[]>(["schengen-visa","canada-tourist-visa"]);
 const selected=useMemo(()=>items.filter(v=>chosen.includes(v.slug)),[items,chosen]);
 const toggle=(slug:string)=>setChosen(current=>current.includes(slug)?current.filter(s=>s!==slug):current.length<3?[...current,slug]:current);
 return <section className="cin-compare"><h2>مقایسه مقصدهای ویزا</h2><p>تا سه مقصد را انتخاب کنید. این اطلاعات راهنمای عمومی‌اند، نه ارزیابی شانس دریافت ویزا.</p><div className="cin-compare-choices">{items.map(v=><label key={v.slug}><input type="checkbox" checked={chosen.includes(v.slug)} disabled={!chosen.includes(v.slug)&&chosen.length===3} onChange={()=>toggle(v.slug)}/><span>{v.flag} {v.name}</span></label>)}</div>
 {selected.length>0?<div className="cin-compare-grid">{selected.map(v=><article key={v.slug}><div className="cin-compare-photo" style={{backgroundImage:"url('"+v.photo+"')"}}/><h3>{v.flag} {v.name}</h3><small>{v.region}</small><p>{v.summary}</p><strong>مسیر بررسی ویزا</strong><ol>{v.steps.slice(0,3).map(s=><li key={s}>{s}</li>)}</ol><div className="cin-compare-actions"><Link href={"/"+v.slug+"/"}>راهنمای کامل ←</Link><a href={v.source} target="_blank" rel="noopener noreferrer">مرجع رسمی ↗</a></div></article>)}</div>:<div className="emptyState">دست‌کم یک مقصد انتخاب کنید.</div>}
 <p className="cin-disclaimer">هزینه‌ها، زمان رسیدگی و شرایط صلاحیت متغیرند؛ برای ارقام روز به لینک مرجع رسمی هر کشور مراجعه کنید.</p></section>;
}
export function VisaReadiness({items}:{items:Visa[]}){
 const [step,setStep]=useState(0),[destination,setDestination]=useState(""),[purpose,setPurpose]=useState(""),[timing,setTiming]=useState(""),[documents,setDocuments]=useState<string[]>([]);
 const checks=["گذرنامه و مدارک هویتی","مدارک مالی متناسب با سفر","مدارک شغلی یا تحصیلی","برنامه سفر و اقامت","مدارک وابستگی و بازگشت"];
 const ready=Boolean(destination&&purpose&&timing);const visa=items.find(v=>v.slug===destination);
 return <section className="cin-readiness"><div className="cin-readiness-progress" aria-label={"مرحله "+(step+1)+" از ۴"}>{[0,1,2,3].map(n=><span key={n} className={n<=step?"filled":""}/>)}</div><p className="overline">راهنمای تصمیم‌گیری • مرحله {new Intl.NumberFormat("fa-IR").format(step+1)} از ۴</p>
 {step===0&&<div><h2>کدام کشور را انتخاب کرده‌اید؟</h2><p>این ابزار فقط راهنمای مقدماتی است و تأیید یا رد صلاحیت ویزا صادر نمی‌کند.</p><label className="cin-readiness-select">مقصد سفر<select value={destination} onChange={e=>setDestination(e.target.value)}><option value="">انتخاب مقصد</option>{items.map(v=><option key={v.slug} value={v.slug}>{v.name}</option>)}</select></label></div>}
 {step===1&&<div><h2>هدف اصلی سفر چیست؟</h2><div className="cin-choice-grid">{["گردشگری","بازدید خانواده و دوستان","سایر اهداف"].map(v=><button key={v} type="button" aria-pressed={purpose===v} onClick={()=>setPurpose(v)}>{v}</button>)}</div><p>نوع ویزای مناسب باید بر اساس هدف واقعی سفر و مقررات مقصد انتخاب شود.</p></div>}
 {step===2&&<div><h2>برای چه زمانی برنامه دارید؟</h2><div className="cin-choice-grid">{["کمتر از ۳ ماه آینده","۳ تا ۶ ماه آینده","بیشتر از ۶ ماه آینده","هنوز مشخص نیست"].map(v=><button key={v} type="button" aria-pressed={timing===v} onClick={()=>setTiming(v)}>{v}</button>)}</div><p>زمان‌بندی قابل اقدام و ظرفیت نوبت‌دهی به مقررات مقصد بستگی دارد.</p></div>}
 {step===3&&<div><h2>کدام مدارک را آماده دارید؟</h2><p>تیک‌ها صرفاً برای ساخت فهرست پیگیری شخصی در همین صفحه‌اند؛ چیزی ذخیره یا ارسال نمی‌شود.</p><div className="cin-check-list">{checks.map(v=><label key={v}><input type="checkbox" checked={documents.includes(v)} onChange={e=>setDocuments(old=>e.target.checked?[...old,v]:old.filter(x=>x!==v))}/>{v}</label>)}</div></div>}
 <div className="cin-readiness-actions">{step>0&&<button className="cin-secondary-button" onClick={()=>setStep(s=>s-1)}>مرحله قبل →</button>}{step<3&&<button className="cin-primary-button" disabled={(step===0&&!destination)||(step===1&&!purpose)||(step===2&&!timing)} onClick={()=>setStep(s=>s+1)}>ادامه ←</button>}</div>
 {step===3&&ready&&<div className="cin-readiness-result" aria-live="polite"><h3>چک‌لیست اولیه سفر به {visa?.name}</h3><p>هدف: {purpose} | زمان تقریبی: {timing}</p><p>از {new Intl.NumberFormat("fa-IR").format(checks.length)} گروه مدارک، {new Intl.NumberFormat("fa-IR").format(documents.length)} مورد را آماده علامت زده‌اید.</p>{checks.filter(x=>!documents.includes(x)).length>0&&<><strong>مواردی که بهتر است بررسی کنید:</strong><ul>{checks.filter(x=>!documents.includes(x)).map(x=><li key={x}>{x}</li>)}</ul></>}
 <p>این نتیجه تأیید کفایت مدارک یا احتمال موفقیت نیست. نوع ویزا، جزئیات مدارک و زمان اقدام را با مرجع رسمی بررسی کنید.</p><div className="cin-compare-actions"><Link href={"/"+visa?.slug+"/"}>راهنمای مقصد ←</Link><a href={visa?.source} target="_blank" rel="noopener noreferrer">مرجع رسمی ↗</a></div></div>}
 </section>;
}
