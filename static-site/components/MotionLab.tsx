"use client";
import {useState} from "react";
import {visas} from "../lib/content";
import {BlurText, CinematicTitle, DestinationCarousel, HorizontalJourney, ImageSequenceTransition, KineticStagger, MaskReveal, ParallaxScene, RotatingText, ScrambleText, SpatialGallery, StackedSteps, WordReveal} from "./CinematicMotion";
const names=["کاروسل سه‌بعدی مقصدها","کارت‌های لایه‌ای","ترنزیشن چندلایه تصویر","اسکرول افقی سینمایی","پارالاکس سینمایی","تبدیل کارت به صفحه","نمایش تصویر با ماسک","گالری فضایی سه‌بعدی","Masked Split Text","Blur Text Reveal","Scroll Word Reveal","3D Text Rotation","Kinetic Stagger","Scramble Text"];
export default function MotionLab(){
 const [selected,setSelected]=useState(0),[replay,setReplay]=useState(0);
 const items=visas.slice(0,5);
 return <main className="cin-lab"><div className="shell"><span className="overline">KHOSHVISA MOTION SHOWROOM</span><h1>آزمایشگاه <em>حرکت و ترنزیشن</em></h1><p>چهارده الگوی انیمیشن که برای خوش‌ویزا در نظر گرفته شده‌اند. سبک‌ها را انتخاب و به‌صورت واقعی بررسی کنید.</p>
 <div className="cin-lab-selector" role="group" aria-label="انتخاب انیمیشن">{names.map((name,i)=><button key={name} className={selected===i?"active":""} onClick={()=>{setSelected(i);setReplay(v=>v+1)}} aria-pressed={selected===i}>{new Intl.NumberFormat("fa-IR").format(i+1)}. {name}</button>)}</div>
 <div className="cin-lab-preview" key={selected+"-"+replay}>
 <div className="cin-lab-top"><h2>{names[selected]}</h2><button onClick={()=>setReplay(v=>v+1)}>پخش مجدد ↻</button></div>
 {selected===0&&<DestinationCarousel items={items}/>}
 {selected===1&&<StackedSteps steps={visas[0].steps}/>}
 {selected===2&&<ImageSequenceTransition items={items}/>}
 {selected===3&&<HorizontalJourney items={items}/>}
 {selected===4&&<ParallaxScene image={visas[1].photo} title="یک سفر، هزار خاطره"/>}
 {selected===5&&<div className="cin-lab-card-transition"><DestinationCarousel items={items}/><p>برای مشاهده حرکت انتقال تصویر، روی مقصد کلیک کنید. مرورگرهای پشتیبانی‌کننده از View Transitions افکت را هنگام تغییر صفحه نشان می‌دهند.</p></div>}
 {selected===6&&<MaskReveal image={visas[0].photo}><h3>دنیا منتظر شماست</h3></MaskReveal>}
 {selected===7&&<SpatialGallery items={items}/>}
 {selected===8&&<div className="cin-lab-title"><CinematicTitle first="سفر به جهان" second="با خیال راحت"/></div>}
 {selected===9&&<div className="cin-lab-title"><BlurText text="جهان را با خیال راحت کشف کنید"/></div>}
 {selected===10&&<div className="cin-lab-title"><WordReveal text="هر سفر خاطره‌ای تازه است و هر مقصد فرصتی برای کشف جهان"/></div>}
 {selected===11&&<div className="cin-lab-title"><RotatingText text="فراتر از مرزها"/></div>}
 {selected===12&&<div className="cin-lab-title"><KineticStagger words={["سفر","کشف","آرامش","اطمینان"]}/></div>}
 {selected===13&&<div className="cin-lab-title"><ScrambleText text="مقصد بعدی شما کجاست؟"/></div>}
 </div><p className="cin-lab-note">حرکت‌های اسکرول را با پیمایش صفحه بررسی کنید. در حالت کاهش حرکت دستگاه، جلوه‌های غیرضروری غیرفعال می‌شوند.</p></div></main>
}
