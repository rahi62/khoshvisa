"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {visas} from "../lib/content";
const mainLinks=[["/","صفحه اصلی"],["/destinations/","مقصدها"],["/visa-explorer/","کشف مقصد"],["/visa-readiness/","بررسی اولیه"],["/visa-guides/","مقالات"],["/about/","درباره ما"],["/contact/","تماس با ما"]] as const;
export default function SiteHeader(){
 const [mobile,setMobile]=useState(false),[mega,setMega]=useState(false);
 const path=usePathname(),toggleRef=useRef<HTMLButtonElement>(null),menuRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{setMobile(false);setMega(false)},[path]);
 useEffect(()=>{if(!mobile)return;const original=document.body.style.overflow;document.body.style.overflow="hidden";
 const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"){setMobile(false);toggleRef.current?.focus()}if(event.key==="Tab"){const focusables=Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a,button")||[]);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}};
 window.addEventListener("keydown",onKey);menuRef.current?.querySelector<HTMLElement>("a")?.focus();return()=>{document.body.style.overflow=original;window.removeEventListener("keydown",onKey)}},[mobile]);
 return <header className="siteHeader cin-header"><div className="shell cin-header-inner">
 <Link className="cin-brand" href="/" aria-label="خوش‌ویزا، صفحه اصلی"><span className="cin-brand-mark" aria-hidden="true">✈</span><span>خوش‌ویزا<small>سفر آگاهانه، خاطره ماندگار</small></span></Link>
 <nav className="cin-desktop-nav" aria-label="ناوبری اصلی"><Link className={path==="/"?"active":""} href="/">صفحه اصلی</Link>
 <div className="cin-mega-parent" onMouseEnter={()=>setMega(true)} onMouseLeave={()=>setMega(false)}>
 <button type="button" aria-expanded={mega} aria-controls="cin-mega-menu" onClick={()=>setMega(v=>!v)} onKeyDown={e=>{if(e.key==="Escape")setMega(false)}}>مقصدها <span aria-hidden>⌄</span></button>
 <div id="cin-mega-menu" className={"cin-mega "+(mega?"is-open":"")} onKeyDown={e=>{if(e.key==="Escape")setMega(false)}}>
 <div className="cin-mega-list"><strong>مقصدهای پرطرفدار</strong>{visas.slice(0,6).map(v=><Link onClick={()=>setMega(false)} key={v.slug} href={"/"+v.slug+"/"}>{v.flag} ویزای {v.name}<span>←</span></Link>)}</div>
 <div className="cin-mega-actions"><strong>برای سفر برنامه‌ریزی کنید</strong><p>راهنمای کشورها و مراحل رسمی درخواست ویزا را ببینید.</p><Link href="/visa-explorer/" onClick={()=>setMega(false)}>کشف هوشمند مقصد ←</Link><Link href="/destinations/" onClick={()=>setMega(false)}>همه مقصدها ←</Link></div>
 </div></div>
 <Link href="/visa-readiness/">بررسی اولیه</Link><Link href="/visa-guides/">مقالات</Link><Link href="/about/">درباره ما</Link><Link href="/contact/">تماس با ما</Link></nav>
 <Link href="/consultation/" className="cin-header-cta">درخواست مشاوره ←</Link>
 <button ref={toggleRef} className="cin-mobile-toggle" type="button" aria-label={mobile?"بستن منو":"باز کردن منو"} aria-expanded={mobile} aria-controls="cin-mobile-menu" onClick={()=>setMobile(v=>!v)}><span className={mobile?"cin-burger is-open":"cin-burger"}><i/><i/><i/></span></button></div>
 <div className={"cin-mobile-overlay "+(mobile?"is-open":"")} id="cin-mobile-menu" aria-hidden={!mobile} ref={menuRef}><div className="cin-mobile-art" aria-hidden="true"/><div className="cin-mobile-links" role="navigation" aria-label="منوی موبایل">{mainLinks.map(([href,label],i)=><Link key={href} href={href} tabIndex={mobile?0:-1} style={{"--nav-index":i} as React.CSSProperties}>{label}<span aria-hidden>←</span></Link>)}<Link href="/consultation/" tabIndex={mobile?0:-1} className="cin-mobile-cta">درخواست مشاوره ویزا ←</Link></div><p>سفر به جهان، با خیال راحت</p></div>
 </header>
}
