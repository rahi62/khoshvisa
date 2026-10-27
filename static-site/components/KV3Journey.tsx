"use client";
import {useEffect,useRef,useState} from "react";
import type {CSSProperties} from "react";
import Link from "next/link";
import type {Visa} from "../lib/content";
type Destination=Pick<Visa,"slug"|"name"|"photo"|"region"|"flag"|"intro">;
const num=(n:number)=>new Intl.NumberFormat("fa-IR",{minimumIntegerDigits:2}).format(n);
export function DestinationDeck({items}:{items:Destination[]}){
 const [active,setActive]=useState(0),touch=useRef<number|null>(null),go=(n:number)=>setActive((n+items.length)%items.length);
 return <div className="kv3-deck" onKeyDown={e=>{if(e.key==="ArrowLeft"){e.preventDefault();go(active+1)}else if(e.key==="ArrowRight"){e.preventDefault();go(active-1)}}}>
 <div className="kv3-deck-stage" role="region" aria-label="کاروسل سه‌بعدی مقصدهای ویزا" onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{if(touch.current===null)return;const dx=e.changedTouches[0].clientX-touch.current;if(Math.abs(dx)>45)go(active+(dx>0?-1:1));touch.current=null}}>
 {items.map((v,i)=>{let diff=i-active;if(diff>items.length/2)diff-=items.length;if(diff< -items.length/2)diff+=items.length;const depth=Math.abs(diff);
 return <a key={v.slug} href={"/"+v.slug+"/"} className="kv3-deck-card" data-active={depth===0} aria-hidden={depth>1?true:undefined} tabIndex={depth>1?-1:0} style={{transform:"translateX(calc(-50% + "+(diff*76)+"%)) translateZ("+(-depth*120)+"px) rotateY("+(-diff*18)+"deg) scale("+(1-depth*.105)+")",opacity:depth>2?0:1-depth*.16,zIndex:10-depth,backgroundImage:"linear-gradient(0deg,#071a2fe6,transparent 74%),url('"+v.photo+"')",viewTransitionName:"kv-visa-"+v.slug} as CSSProperties}>
 <span className="kv3-deck-flag">{v.flag} <small>{num(i+1)}</small></span><span className="kv3-deck-card-text"><small>{v.region}</small><strong>{v.name}</strong><em>راهنمای ویزا ↗</em></span></a>})}</div>
 <div className="kv3-deck-info"><div><span>SELECTED DESTINATION / {num(active+1)}</span><h3>ویزای توریستی {items[active].name}</h3><p>{items[active].intro}</p></div><div className="kv3-deck-controls"><button type="button" onClick={()=>go(active-1)} aria-label="مقصد قبلی">→</button><button type="button" onClick={()=>go(active+1)} aria-label="مقصد بعدی">←</button></div></div>
 </div>;
}
export function StoryJourney({items}:{items:Destination[]}){
 const ref=useRef<HTMLElement>(null),mobileTrack=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0),[mobileActive,setMobileActive]=useState(0),[progress,setProgress]=useState(0);
 useEffect(()=>{
  const el=ref.current;if(!el)return;
  const desktop=window.matchMedia("(min-width: 761px)");
  let frame=0;
  const update=()=>{
   if(!desktop.matches||frame)return;
   frame=requestAnimationFrame(()=>{
    frame=0;
    const r=el.getBoundingClientRect();
    const travel=Math.max(1,el.offsetHeight-window.innerHeight);
    const value=Math.max(0,Math.min(1,-r.top/travel));
    setProgress(value);
    setActive(Math.min(items.length-1,Math.round(value*(items.length-1))));
   });
  };
  const sync=()=>{if(desktop.matches)update()};
  window.addEventListener("scroll",sync,{passive:true});
  window.addEventListener("resize",sync);
  desktop.addEventListener("change",sync);
  update();
  return()=>{
   window.removeEventListener("scroll",sync);
   window.removeEventListener("resize",sync);
   desktop.removeEventListener("change",sync);
   cancelAnimationFrame(frame);
  };
 },[items.length]);
 const chooseMobile=(index:number)=>{
  const next=Math.max(0,Math.min(items.length-1,index));
  const node=mobileTrack.current?.querySelectorAll<HTMLElement>("[data-story-index]")[next];
  if(!node)return;
  setMobileActive(next);
  node.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"nearest",inline:"center"});
 };
 const syncMobile=()=>{
  const track=mobileTrack.current;if(!track)return;
  const center=track.getBoundingClientRect().left+track.clientWidth/2;
  let next=0,nearest=Number.POSITIVE_INFINITY;
  track.querySelectorAll<HTMLElement>("[data-story-index]").forEach((node,i)=>{
   const rect=node.getBoundingClientRect(),distance=Math.abs(rect.left+rect.width/2-center);
   if(distance<nearest){nearest=distance;next=i}
  });
  setMobileActive(next);
 };
 return <section className="kv3-story" style={{"--kv-stories":items.length} as CSSProperties} ref={ref} aria-label="داستان مقصدهای ویزا">
  <div className="kv3-story-sticky">
   <div className="kv3-story-heading"><span>IMMERSIVE DESTINATIONS</span><h2>هر مقصد،<br/><em>یک داستان متفاوت</em></h2></div>
   <div className="kv3-story-photo">{items.map((v,i)=><div key={v.slug} className={"kv3-story-frame "+(i===active?"active":"")} aria-hidden={i!==active} style={{backgroundImage:"linear-gradient(270deg,#071c30d1,#071c3030),url('"+v.photo+"')"}}><div className="kv3-story-copy"><span>{num(i+1)} / {num(items.length)} — {v.region}</span><h3>{v.name}</h3><p>{v.intro}</p><a href={"/"+v.slug+"/"} tabIndex={i===active?0:-1}>کشف مسیر ویزای {v.name} ↗</a></div></div>)}</div>
   <div className="kv3-story-progress" aria-hidden="true"><i style={{height:(progress*100)+"%"}}/></div>
   <div className="kv3-story-index">{num(active+1)} <small>/ {num(items.length)}</small></div>
  </div>
  <div className="kv3-story-mobile">
   <div className="kv3-container kv3-story-mobile-heading"><span className="kv3-eyebrow">IMMERSIVE DESTINATIONS</span><h2>هر مقصد، <em>یک داستان متفاوت</em></h2><p>کارت‌ها را به چپ و راست بکش؛ بدون اسکرول طولانی و فضای خالی.</p></div>
   <div className="kv3-story-mobile-track" ref={mobileTrack} onScroll={syncMobile} role="region" aria-roledescription="کاروسل" aria-label="راهنمای تصویری مقصدهای ویزا">
    {items.map((v,i)=><a data-story-index={i} key={v.slug} className="kv3-story-mobile-card" href={"/"+v.slug+"/"} aria-label={"مشاهده راهنمای ویزای "+v.name} style={{backgroundImage:"linear-gradient(0deg,rgba(4,19,32,.97),rgba(4,19,32,.16) 75%),url('"+v.photo+"')"}}>
      <div className="kv3-story-mobile-top"><span>{num(i+1)} / {num(items.length)}</span><span>{v.region}</span></div>
      <div className="kv3-story-mobile-copy"><h3>{v.name}</h3><p>{v.intro}</p><strong>کشف مسیر ویزا ↗</strong></div>
     </a>)}
   </div>
   <div className="kv3-container kv3-story-mobile-controls">
    <span aria-live="polite">{num(mobileActive+1)} / {num(items.length)}</span>
    <div><button type="button" onClick={()=>chooseMobile(mobileActive-1)} disabled={mobileActive===0} aria-label="مقصد قبلی">→</button>
    <button type="button" onClick={()=>chooseMobile(mobileActive+1)} disabled={mobileActive===items.length-1} aria-label="مقصد بعدی">←</button></div>
   </div>
  </div>
 </section>;
}
export function AnimatedSteps({steps}:{steps:string[]}){
 const [selected,setSelected]=useState(0),labels=["انتخاب مقصد","آماده‌سازی مدارک","ثبت درخواست","ارائه اطلاعات","پیگیری رسمی"];
 return <div className="kv3-steps"><div className="kv3-step-menu">{steps.map((x,i)=><button type="button" key={x} className={i===selected?"active":""} aria-pressed={i===selected} onClick={()=>setSelected(i)}><span>{num(i+1)}</span><strong>{labels[i]||"گام بعد"}</strong><b>←</b></button>)}</div><div className="kv3-step-feature" key={selected}><span>YOUR VISA ROADMAP • {num(selected+1)}</span><strong>{steps[selected]}</strong><p>جزئیات مدارک و مسیر اقدام برای هر مقصد متفاوت است؛ قبل از اقدام، اطلاعات رسمی را بررسی کنید.</p><Link href="/visa-readiness/">بررسی اولیه مسیر ←</Link><i aria-hidden="true">{num(selected+1)}</i></div></div>;
}

export function HorizontalFilmStrip({items}:{items:Destination[]}){
 const section=useRef<HTMLElement>(null),track=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=section.current,t=track.current;if(!el||!t)return;let frame=0;const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(window.innerWidth<=900||window.matchMedia("(prefers-reduced-motion: reduce)").matches){t.style.transform="none";return}const area=Math.max(1,el.offsetHeight-window.innerHeight);const p=Math.max(0,Math.min(1,-el.getBoundingClientRect().top/area));const dx=Math.max(0,t.scrollWidth-window.innerWidth);t.style.transform="translate3d("+(p*dx)+"px,0,0)"})};window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);update();return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);cancelAnimationFrame(frame)}},[]);
 return <section className="kv3-film" style={{"--film-count":items.length} as CSSProperties} ref={section}><div className="kv3-film-pin"><div className="kv3-container kv3-film-heading"><span className="kv3-eyebrow">HORIZONTAL JOURNEY • 04</span><h2>قاب‌هایی از <em>جهان</em></h2></div><div className="kv3-film-track" ref={track}>{items.map((v,i)=><a href={"/"+v.slug+"/"} key={v.slug} className="kv3-film-frame" style={{backgroundImage:"linear-gradient(0deg,#061b2bdc,transparent 72%),url('"+v.photo+"')"}}><span>{num(i+1)} / {num(items.length)} — {v.region}</span><strong>{v.name}</strong><p>{v.intro}</p><b>جزئیات مقصد ↗</b></a>)}</div><div className="kv3-container kv3-film-bottom"><span>هر اسکرول، مقصدی تازه</span><span aria-hidden>← ← ←</span></div></div></section>;
}

export function ScrollTextReveal({text}:{text:string}){
 const target=useRef<HTMLDivElement>(null),[progress,setProgress]=useState(0);
 useEffect(()=>{const el=target.current;if(!el)return;let frame=0;const update=()=>{if(frame)return;frame=requestAnimationFrame(()=>{frame=0;const rect=el.getBoundingClientRect();const p=Math.max(0,Math.min(1,(window.innerHeight*.82-rect.top)/(window.innerHeight*.68)));setProgress(p)})};
 window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);update();return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);cancelAnimationFrame(frame)}},[]);
 const words=text.split(/\s+/);
 return <div className="kv3-scroll-text" ref={target} aria-label={text}>{words.map((word,i)=>{const amount=progress*words.length-i;const opacity=Math.max(.16,Math.min(1,amount));return <span aria-hidden="true" key={i} style={{opacity,transform:"translateY("+(Math.max(0,1-opacity)*11)+"px)"}}>{word}{" "}</span>})}</div>;
}
