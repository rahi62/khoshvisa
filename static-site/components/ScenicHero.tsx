"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import type {Visa} from "../lib/content";
type Destination=Pick<Visa,"slug"|"name"|"photo"|"region"|"intro">;
const scenes=[
 {name:"سانتورینی",region:"یونان • دریای اژه",image:"https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=2200&q=85",first:"سفر به جهان",second:"با خیال راحت",slug:"schengen-visa"},
 {name:"انگلیس",region:"بریتانیا • لندن",image:"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2200&q=85",first:"مرزها فقط",second:"روی نقشه‌اند",slug:"uk-tourist-visa"},
 {name:"کانادا",region:"کانادا • طبیعت و شهر",image:"https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=2200&q=85",first:"سفرهای بزرگ",second:"از اینجا آغاز می‌شوند",slug:"canada-tourist-visa"},
 {name:"ژاپن",region:"ژاپن • کیوتو",image:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2200&q=85",first:"جهانی متفاوت",second:"در انتظار توست",slug:"japan-tourist-visa"}
];
export default function ScenicHero({destinations}:{destinations:Destination[]}){
 const [active,setActive]=useState(0),[pause,setPause]=useState(false),[search,setSearch]=useState("");
 useEffect(()=>{const media=window.matchMedia("(prefers-reduced-motion: reduce)");if(pause||media.matches)return;const id=window.setInterval(()=>setActive(v=>(v+1)%scenes.length),7200);return()=>window.clearInterval(id)},[pause]);
 const s=scenes[active];
 return <section className="kv3-hero" onPointerMove={e=>{if(e.pointerType!=="mouse")return;const rect=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty("--pointer-x",((e.clientX-rect.left)*100/rect.width)+"%");e.currentTarget.style.setProperty("--pointer-y",((e.clientY-rect.top)*100/rect.height)+"%")}}>
  <div className="kv3-hero-scenes" aria-hidden="true">{scenes.map((x,i)=><div key={x.name} className={"kv3-hero-scene "+(i===active?"active":"")} style={{backgroundImage:"url('"+x.image+"')"}}/>)}</div>
  <div className="kv3-hero-veil"/><div className="kv3-hero-glow"/>
  <div className="kv3-hero-inner kv3-container"><div className="kv3-hero-content"><span className="kv3-hero-overline">KHOSHVISA <i/> CURATED JOURNEYS</span><div className="kv3-hero-changing" key={active} aria-live="polite"><span className="kv3-hero-location">✧ {s.region}</span><h1><span><b>{s.first}</b></span><span className="kv3-title-gold"><b>{s.second}</b></span></h1></div><p>از کشف مقصد تا شناخت مسیر ویزا؛ اطلاعات روشن برای شروع سفری که در خاطرت می‌ماند.</p>
  <div className="kv3-hero-actions"><a className="kv3-button kv3-button-gold" href={"/"+s.slug+"/"}>راهنمای این مقصد <span>↗</span></a><Link className="kv3-button kv3-button-outline" href="/visa-explorer/">کشف مقصدها <span>←</span></Link></div>
  <form className="kv3-search" action="/destinations/" method="get" role="search"><label htmlFor="kv3-destination-search">کجا می‌خواهی سفر کنی؟</label><div><span aria-hidden="true">⌕</span><input id="kv3-destination-search" name="q" value={search} onChange={e=>setSearch(e.target.value)} placeholder="مقصدت را جست‌وجو کن..." autoComplete="off"/><button type="submit">جست‌وجو ←</button></div></form></div>
  <div className="kv3-hero-vertical" aria-hidden="true"><span>BEYOND THE ORDINARY</span><i/></div></div>
  <div className="kv3-hero-bottom kv3-container"><div className="kv3-hero-tabs" role="group" aria-label="انتخاب مقصد تصویری">{scenes.map((x,i)=><button type="button" key={x.name} onClick={()=>setActive(i)} onFocus={()=>setPause(true)} onBlur={()=>setPause(false)} aria-pressed={i===active} className={i===active?"active":""}><span>{"۰"+(i+1)}</span><strong>{x.name}</strong><i key={i===active?"active":"idle"}/></button>)}</div><button className="kv3-play" type="button" onClick={()=>setPause(p=>!p)} aria-label={pause?"پخش خودکار":"توقف حرکت خودکار"}>{pause?"▶":"Ⅱ"}</button><a href="#destinations" className="kv3-scroll-guide">برای کشف بیشتر اسکرول کنید ↓</a></div>
  <span className="kv3-hero-caption" aria-hidden="true">DISCOVER • EXPLORE • INSPIRE</span>
 </section>
}
