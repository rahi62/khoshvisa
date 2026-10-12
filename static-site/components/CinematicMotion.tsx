"use client";
import Link from "next/link";
import {useEffect,useRef,useState} from "react";
import type {CSSProperties, ReactNode} from "react";
import type {Visa} from "../lib/content";

export function Reveal({children,className="",delay=0}:{children:ReactNode;className?:string;delay?:number}) {
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=ref.current;if(!el)return; if(!("IntersectionObserver" in window)){el.classList.add("is-visible");return}
 const observer=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){el.classList.add("is-visible");observer.disconnect()}},{threshold:.09});
 observer.observe(el);return ()=>observer.disconnect()},[]);
 return <div ref={ref} className={"cin-reveal "+className} style={{transitionDelay:delay+"ms"}}>{children}</div>;
}
export function CinematicTitle({first,second}:{first:string;second:string}){
 return <h1 className="cin-title" aria-label={first+" "+second}><span className="cin-line"><span>{first}</span></span><span className="cin-line cin-gold"><span>{second}</span></span></h1>;
}
export function DestinationCarousel({items}:{items:Pick<Visa,"name"|"slug"|"photo"|"flag">[]}){
 const [active,setActive]=useState(0),touchX=useRef<number|null>(null);
 const shift=(delta:number)=>setActive(i=>(i+delta+items.length)%items.length);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(e.key==="ArrowLeft")shift(1);if(e.key==="ArrowRight")shift(-1)}; const el=document.getElementById("destination-carousel");if(!el)return;el.addEventListener("keydown",fn);return()=>el.removeEventListener("keydown",fn)},[items.length]);
 return <div id="destination-carousel" className="cin-destinations" role="region" aria-label="کاروسل سه‌بعدی مقصدهای ویزا" tabIndex={0}>
 <div className="cin-carousel-stage" onTouchStart={e=>{touchX.current=e.touches[0].clientX}} onTouchEnd={e=>{if(touchX.current!==null){let d=e.changedTouches[0].clientX-touchX.current;if(Math.abs(d)>45)shift(d>0?-1:1)}touchX.current=null}}>
 {items.map((item,i)=>{let difference=i-active; if(difference>items.length/2)difference-=items.length;if(difference < -items.length/2)difference+=items.length;const depth=Math.abs(difference);
 const transform="translateX(calc(-50% + "+difference*78+"%)) translateZ("+-depth*110+"px) rotateY("+-difference*14+"deg) scale("+(1-depth*.09)+")";
 return <a key={item.slug} href={"/"+item.slug+"/"} className="cin-destination-card" data-active={difference===0?"true":"false"} style={{transform,opacity:depth>2?0:1-depth*.16,backgroundImage:"linear-gradient(0deg,rgba(5,22,36,.94),transparent 76%),url('"+item.photo+"')",viewTransitionName:"visa-"+item.slug} as CSSProperties} tabIndex={depth>1?-1:0} aria-hidden={depth>1?"true":undefined}>
 <span className="cin-flag">{item.flag}</span><div className="cin-card-copy"><small>ویزای توریستی</small><h3>{item.name}</h3><span>مشاهده راهنما ←</span></div></a>})}
 </div><div className="cin-carousel-controls"><button type="button" onClick={()=>shift(-1)} aria-label="مقصد قبلی">→</button><div className="cin-dots">{items.map((item,i)=><button type="button" key={item.slug} className={active===i?"active":""} aria-label={"نمایش "+item.name} aria-current={active===i?"true":undefined} onClick={()=>setActive(i)}/>)}</div><button type="button" onClick={()=>shift(1)} aria-label="مقصد بعدی">←</button></div></div>;
}
export function StackedSteps({steps}:{steps:string[]}){return <div className="cin-step-stack">{steps.map((s,i)=><Reveal key={s} delay={i*70}><div className="cin-step"><span>{new Intl.NumberFormat("fa-IR",{minimumIntegerDigits:2}).format(i+1)}</span><p>{s}</p></div></Reveal>)}</div>}
export function WordReveal({text}:{text:string}){return <Reveal className="cin-word-reveal"><p>{text.split(/\s+/).map((word,i)=><span key={i} style={{"--word-index":i} as CSSProperties}>{word}{" "}</span>)}</p></Reveal>}
export function BlurText({text}:{text:string}){return <Reveal className="cin-blur-text"><span>{text}</span></Reveal>}
export function KineticStagger({words}:{words:string[]}){return <Reveal className="cin-kinetic">{words.map((w,i)=><span key={w} style={{"--word-index":i} as CSSProperties}>{w}</span>)}</Reveal>}
export function RotatingText({text}:{text:string}){return <Reveal className="cin-rotate-text"><strong>{text}</strong></Reveal>}
export function MaskReveal({image,children}:{image:string;children?:ReactNode}){return <Reveal className="cin-mask-frame"><div className="cin-mask-image" style={{backgroundImage:"url('"+image+"')"}}/>{children&&<div className="cin-mask-content">{children}</div>}</Reveal>}
export function ScrambleText({text}:{text:string}){
 const [output,setOutput]=useState(text),[playing,setPlaying]=useState(false);
 const ref=useRef<HTMLSpanElement>(null);
 useEffect(()=>{let observer:IntersectionObserver|null=null;const el=ref.current;if(el&&"IntersectionObserver" in window){observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setPlaying(true);observer?.disconnect()}});observer.observe(el)}return()=>observer?.disconnect()},[]);
 useEffect(()=>{if(!playing)return;const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduce){setOutput(text);return}
 const chars=Array.from(text),glyphs=Array.from("ابتثجحخدذرزسشصضطظعغفقکگلمنوهی");let step=0;
 const interval=window.setInterval(()=>{step++;setOutput(chars.map((c,i)=>c===" "||i<step/2?c:glyphs[(i*7+step*3)%glyphs.length]).join(""));if(step>=chars.length*2){clearInterval(interval);setOutput(text)}},45);
 return()=>clearInterval(interval)},[playing,text]);
 return <span ref={ref} className="cin-scramble" aria-label={text}><span aria-hidden="true">{output}</span></span>;
}
export function ImageSequenceTransition({items}:{items:Pick<Visa,"name"|"photo"|"slug">[]}){
 const [active,setActive]=useState(0),[running,setRunning]=useState(false);
 const next=(index:number)=>{if(index===active||running)return;setRunning(true);window.setTimeout(()=>{setActive(index);setRunning(false)},420)};
 return <div className={"cin-sequence "+(running?"is-changing":"")}><div className="cin-sequence-frame" style={{backgroundImage:"url('"+items[active].photo+"')"}}><div className="cin-sequence-slices" aria-hidden="true">{[0,1,2,3,4].map(i=><div key={i} style={{backgroundImage:"url('"+items[active].photo+"')",backgroundPosition:(i*25)+"% center","--slice-index":i} as CSSProperties}/>)}</div><div className="cin-sequence-label"><small>سفر بعدی شما</small><strong>{items[active].name}</strong></div></div><div className="cin-sequence-pills">{items.map((x,i)=><button key={x.slug} className={active===i?"is-active":""} onClick={()=>next(i)} aria-pressed={active===i}>{x.name}</button>)}</div></div>
}
export function ParallaxScene({image,title}:{image:string;title:string}){
 const ref=useRef<HTMLElement>(null),layer=useRef<HTMLDivElement>(null);
 useEffect(()=>{const section=ref.current,photo=layer.current;if(!section||!photo)return;
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");if(reduced.matches)return;
 let ticking=false;const update=()=>{const rect=section.getBoundingClientRect(),center=rect.top+rect.height/2-window.innerHeight/2;const offset=Math.max(-45,Math.min(45,-center*.075));photo.style.transform="translate3d(0,"+offset+"px,0) scale(1.13)";ticking=false};
 const onScroll=()=>{if(!ticking){requestAnimationFrame(update);ticking=true}};update();window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onScroll);return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll)}},[]);
 return <section className="cin-parallax" ref={ref}><div className="cin-parallax-photo" ref={layer} style={{backgroundImage:"url('"+image+"')"}}/><div className="cin-parallax-shade"/><Reveal className="cin-parallax-text"><span>BEYOND BORDERS</span><h2>{title}</h2><Link href="/visa-explorer/" className="refGoldButton">کشف مقصدها ←</Link></Reveal></section>;
}
export function HorizontalJourney({items}:{items:Pick<Visa,"slug"|"name"|"photo"|"intro">[]}){
 const ref=useRef<HTMLElement>(null),track=useRef<HTMLDivElement>(null);
 useEffect(()=>{const el=ref.current,strip=track.current;if(!el||!strip)return;const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
 if(reduce.matches||window.matchMedia("(max-width: 800px)").matches)return;
 let scheduled=false;const update=()=>{const max=el.offsetHeight-window.innerHeight;let fraction=Math.min(1,Math.max(0,-el.getBoundingClientRect().top/Math.max(1,max)));strip.style.transform="translate3d("+(fraction*80*(items.length-1)/(items.length))+"%,0,0)";scheduled=false};
 const handler=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}};handler();window.addEventListener("scroll",handler,{passive:true});window.addEventListener("resize",handler);return()=>{window.removeEventListener("scroll",handler);window.removeEventListener("resize",handler)}},[items.length]);
 return <section className="cin-horizontal" ref={ref} style={{"--journey-count":items.length} as CSSProperties}><div className="cin-horizontal-sticky"><div className="cin-horizontal-heading"><span>JOURNEY STORIES</span><h2>هر مقصد، شروع یک داستان</h2></div><div className="cin-horizontal-track" ref={track}>{items.map(v=><Link href={"/"+v.slug+"/"} className="cin-horizontal-panel" key={v.slug} style={{backgroundImage:"linear-gradient(0deg,#041728de,transparent 70%),url('"+v.photo+"')"}}><h3>{v.name}</h3><p>{v.intro}</p><span>راهنمای ویزا ←</span></Link>)}</div></div></section>;
}
export function SpatialGallery({items}:{items:Pick<Visa,"slug"|"name"|"photo">[]}){
 const [rotation,setRotation]=useState(0);
 return <section className="cin-spatial" aria-label="گالری فضایی مقصدها"><div className="cin-spatial-globe" aria-hidden="true">✦</div><div className="cin-spatial-cards">{items.slice(0,5).map((x,i)=><Link key={x.slug} href={"/"+x.slug+"/"} className="cin-spatial-card" style={{backgroundImage:"linear-gradient(0deg,#071b2bc9,transparent),url('"+x.photo+"')",transform:"rotateY("+(i*72+rotation)+"deg) translateZ(240px)"}}><span>{x.name}</span></Link>)}</div><div className="cin-spatial-controls"><button onClick={()=>setRotation(v=>v-72)} aria-label="چرخش گالری به راست">→</button><button onClick={()=>setRotation(v=>v+72)} aria-label="چرخش گالری به چپ">←</button></div><p>مقصدها را در یک گالری سه‌بعدی مرور کنید</p></section>
}
