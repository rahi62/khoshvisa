"use client";

import {useEffect,useRef,useState} from "react";
import Link from "next/link";
import type {Visa} from "../lib/content";
import {geoContains,geoDistance,geoGraticule10,geoOrthographic,geoPath} from "d3-geo";
import {feature} from "topojson-client";
import type {Feature,FeatureCollection,Geometry} from "geojson";

type Destination=Pick<Visa,"slug"|"name"|"flag"|"region">;
type Marker={slug:string;lat:number;lon:number;iso:string};
type Pointer={startX:number;startY:number;x:number;y:number;dragged:boolean;id:number};
type Hit={slug:string;x:number;y:number};
const DEG=Math.PI/180;
const countryPoints:Record<string,Omit<Marker,"slug">>={
 "schengen-visa":{lat:50.85,lon:4.35,iso:"056"},  // Brussels: symbol for Schengen, not a country.
 "canada-tourist-visa":{lat:45.42,lon:-75.69,iso:"124"},
 "uk-tourist-visa":{lat:51.51,lon:-0.12,iso:"826"},
 "japan-tourist-visa":{lat:35.68,lon:139.69,iso:"392"},
 "france-tourist-visa":{lat:48.86,lon:2.35,iso:"250"},
 "italy-tourist-visa":{lat:41.90,lon:12.49,iso:"380"},
 "germany-tourist-visa":{lat:52.52,lon:13.40,iso:"276"},
 "australia-tourist-visa":{lat:-33.87,lon:151.21,iso:"036"}
};
const isoToSlug:Record<string,string>={
 "056":"schengen-visa","124":"canada-tourist-visa","826":"uk-tourist-visa",
 "392":"japan-tourist-visa","250":"france-tourist-visa","380":"italy-tourist-visa",
 "276":"germany-tourist-visa","036":"australia-tourist-visa"
};
function wrapLongitude(n:number):number{return ((n+180)%360+360)%360-180}
const fa=(n:number)=>new Intl.NumberFormat("fa-IR").format(n);

export default function WebGLGlobe({items}:{items:Destination[]}){
 const section=useRef<HTMLElement>(null);
 const canvas=useRef<HTMLCanvasElement>(null);
 const rotation=useRef<[number,number]>([-19,-34]);
 const markerHits=useRef<Hit[]>([]);
 const schedule=useRef<(()=>void)|null>(null);
 const spinFrame=useRef(0);
 const [countries,setCountries]=useState<FeatureCollection<Geometry>|null>(null);
 const [selected,setSelected]=useState("schengen-visa");
 const [error,setError]=useState(false);
 const [notCovered,setNotCovered]=useState(false);
 const destinations=items.filter(v=>countryPoints[v.slug]);
 const current=destinations.find(v=>v.slug===selected)||destinations[0];

 // Ship the real Natural Earth 1:110m polygons only when this section approaches view.
 // No runtime map API, paid key, third-party iframe or approximate sine-wave "continents".
 useEffect(()=>{
  const node=section.current;if(!node)return;
  let alive=true,started=false;
  const load=async()=>{
   if(started)return;started=true;
   try{
    const atlas=(await import("world-atlas/countries-110m.json")).default;
    const collection=feature(atlas as never,atlas.objects.countries as never) as FeatureCollection<Geometry>;
    if(alive)setCountries(collection);
   }catch{
    if(alive)setError(true);
   }
  };
  if(!("IntersectionObserver" in window)){void load();return()=>{alive=false}};
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(e=>e.isIntersecting)){void load();observer.disconnect()}
  },{rootMargin:"400px 0px"});
  observer.observe(node);
  return()=>{alive=false;observer.disconnect()};
 },[]);

 useEffect(()=>{
  const el=canvas.current;
  if(!el||!countries)return;
  const context=el.getContext("2d",{alpha:false});
  if(!context){setError(true);return}
  const ctx=context;
  const projection=geoOrthographic().clipAngle(90).precision(0.65);
  const path=geoPath(projection,ctx);
  const graticule=geoGraticule10();
  const featured=destinations.map(d=>({...countryPoints[d.slug],slug:d.slug}));
  const selectedISO=countryPoints[selected]?.iso;
  const selectedFeature=countries.features.find(f=>String(f.id)===selectedISO);
  let raf=0,disposed=false;
  let width=0,height=0,radius=0;

  const paint=()=>{
   if(disposed)return;
   const rect=el.getBoundingClientRect();
   width=Math.max(2,rect.width);height=Math.max(2,rect.height);
   const dpr=Math.min(2,window.devicePixelRatio||1);
   const w=Math.round(width*dpr),h=Math.round(height*dpr);
   if(el.width!==w||el.height!==h){el.width=w;el.height=h}
   ctx.setTransform(dpr,0,0,dpr,0,0);
   ctx.clearRect(0,0,width,height);
   const backdrop=ctx.createLinearGradient(0,0,width,height);
   backdrop.addColorStop(0,"#061726");backdrop.addColorStop(1,"#09263b");
   ctx.fillStyle=backdrop;ctx.fillRect(0,0,width,height);
   // Repeatable decorative stars outside the data-driven globe.
   for(let i=0;i<42;i++){
    const x=((i*73+29)%101)/101*width,y=((i*97+11)%107)/107*height;
    ctx.fillStyle=i%5===0?"rgba(226,182,112,.7)":"rgba(212,227,235,.35)";
    ctx.fillRect(x,y,i%7===0?2.1:1.1,i%7===0?2.1:1.1);
   }
   radius=Math.min(width,height)*0.415;
   projection.translate([width/2,height/2]).scale(radius).rotate([...rotation.current,0]);
   ctx.save();
   ctx.beginPath();path({type:"Sphere"});
   const water=ctx.createRadialGradient(width*.37,height*.29,radius*.05,width/2,height/2,radius);
   water.addColorStop(0,"#22536b");water.addColorStop(.68,"#0d344d");water.addColorStop(1,"#051b2d");
   ctx.fillStyle=water;ctx.fill();
   ctx.clip();

   ctx.beginPath();path(graticule);
   ctx.strokeStyle="rgba(224,193,144,.18)";
   ctx.lineWidth=.7;ctx.stroke();

   ctx.beginPath();path(countries);
   ctx.fillStyle="#2d6071";ctx.fill();
   ctx.strokeStyle="rgba(193,229,224,.26)";
   ctx.lineWidth=.65;ctx.stroke();

   if(selectedFeature){
    ctx.beginPath();path(selectedFeature);
    ctx.fillStyle="rgba(230,177,96,.50)";
    ctx.fill();ctx.lineWidth=1.3;ctx.strokeStyle="#f1d29d";ctx.stroke();
   }
   const shade=ctx.createLinearGradient(width/2-radius,height*.2,width/2+radius,height*.84);
   shade.addColorStop(0,"rgba(255,255,255,.05)");shade.addColorStop(.56,"rgba(0,0,0,0)");
   shade.addColorStop(1,"rgba(0,10,22,.43)");
   ctx.fillStyle=shade;ctx.fillRect(0,0,width,height);
   ctx.restore();

   ctx.beginPath();path({type:"Sphere"});
   ctx.strokeStyle="rgba(223,182,116,.75)";ctx.lineWidth=1.5;
   ctx.shadowColor="rgba(152,196,211,.38)";ctx.shadowBlur=22;
   ctx.stroke();ctx.shadowBlur=0;

   // Marker locations are real latitudes/longitudes, not arbitrary screen positions.
   const viewCenter:[number,number]=[-rotation.current[0],-rotation.current[1]];
   const hits:Hit[]=[];
   for(const mark of featured){
    if(geoDistance([mark.lon,mark.lat],viewCenter)>Math.PI/2-.06)continue;
    const point=projection([mark.lon,mark.lat]);
    if(!point)continue;
    const [x,y]=point;
    const focused=mark.slug===selected;
    hits.push({x,y,slug:mark.slug});
    if(focused){
     ctx.beginPath();ctx.arc(x,y,15,0,Math.PI*2);ctx.fillStyle="rgba(232,186,115,.18)";ctx.fill();
    }
    ctx.beginPath();ctx.arc(x,y,focused?7:5,0,Math.PI*2);
    ctx.fillStyle=focused?"#f7cc8a":"#f8eee0";ctx.fill();
    ctx.strokeStyle="#0a283b";ctx.lineWidth=2;ctx.stroke();
    if(focused){
     const name=destinations.find(v=>v.slug===mark.slug)?.name||"";
     ctx.font="bold 13px Tahoma, sans-serif";
     ctx.textAlign="center";
     const labelWidth=Math.min(120,ctx.measureText(name).width+23);
     const labelX=Math.max(labelWidth/2+9,Math.min(width-labelWidth/2-9,x));
     const labelY=y-25;
     ctx.fillStyle="rgba(6,25,39,.90)";
     ctx.fillRect(labelX-labelWidth/2,labelY-16,labelWidth,23);
     ctx.fillStyle="#f5d19a";
     ctx.fillText(name,labelX,labelY);
    }
   }
   markerHits.current=hits;
  };
  const requestPaint=()=>{
   if(disposed||raf)return;
   raf=requestAnimationFrame(()=>{raf=0;paint()});
  };
  schedule.current=requestPaint;
  const resize=new ResizeObserver(requestPaint);
  resize.observe(el);
  requestPaint();
  return()=>{disposed=true;resize.disconnect();cancelAnimationFrame(raf);if(schedule.current===requestPaint)schedule.current=null};
 },[countries,selected,items]); // refresh highlight and visible pin labels when selection changes.

 function rotateTo(slug:string){
  const mark=countryPoints[slug];if(!mark)return;
  setSelected(slug);setNotCovered(false);
  cancelAnimationFrame(spinFrame.current);
  const target:[number,number]=[-mark.lon,-mark.lat];
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
   rotation.current=target;schedule.current?.();return;
  }
  const start=[...rotation.current] as [number,number];
  const delta=wrapLongitude(target[0]-start[0]);
  const started=performance.now(),duration=620;
  const tick=(now:number)=>{
   const p=Math.min(1,(now-started)/duration);
   const eased=1-Math.pow(1-p,3);
   rotation.current=[wrapLongitude(start[0]+delta*eased),start[1]+(target[1]-start[1])*eased];
   schedule.current?.();
   if(p<1)spinFrame.current=requestAnimationFrame(tick);
  };
  spinFrame.current=requestAnimationFrame(tick);
 }
 useEffect(()=>()=>cancelAnimationFrame(spinFrame.current),[]);

 function handleCountryClick(clientX:number,clientY:number){
  const el=canvas.current;
  if(!el||!countries)return;
  const rect=el.getBoundingClientRect(),x=clientX-rect.left,y=clientY-rect.top;
  const marker=markerHits.current.map(m=>({...m,distance:Math.hypot(x-m.x,y-m.y)})).sort((a,b)=>a.distance-b.distance)[0];
  if(marker&&marker.distance<=23){setSelected(marker.slug);setNotCovered(false);return}
  const projection=geoOrthographic().clipAngle(90).translate([rect.width/2,rect.height/2])
   .scale(Math.min(rect.width,rect.height)*.415).rotate([...rotation.current,0]);
  const point=projection.invert?.([x,y]);
  if(!point)return;
  // Selecting the geographic territory works, even away from a capital pin.
  const found=countries.features.find(f=>isoToSlug[String(f.id)]&&geoContains(f,point));
  if(found){setSelected(isoToSlug[String(found.id)]);setNotCovered(false)}
  else setNotCovered(true);
 }
 const pointer=useRef<Pointer|null>(null);
 function down(e:React.PointerEvent<HTMLCanvasElement>){
  cancelAnimationFrame(spinFrame.current);
  pointer.current={startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,dragged:false,id:e.pointerId};
  e.currentTarget.setPointerCapture(e.pointerId);
 }
 function move(e:React.PointerEvent<HTMLCanvasElement>){
  const p=pointer.current;if(!p||p.id!==e.pointerId)return;
  const dx=e.clientX-p.x,dy=e.clientY-p.y;
  if(Math.abs(e.clientX-p.startX)+Math.abs(e.clientY-p.startY)>9)p.dragged=true;
  if(p.dragged){
   rotation.current=[
    wrapLongitude(rotation.current[0]+dx*.40),
    Math.max(-85,Math.min(85,rotation.current[1]-dy*.28))
   ];
   schedule.current?.();
  }
  p.x=e.clientX;p.y=e.clientY;
 }
 function up(e:React.PointerEvent<HTMLCanvasElement>){
  const p=pointer.current;if(!p||p.id!==e.pointerId)return;
  if(!p.dragged)handleCountryClick(e.clientX,e.clientY);
  pointer.current=null;
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
 }
 function keyboard(e:React.KeyboardEvent<HTMLCanvasElement>){
  const amount=12;
  if(e.key==="ArrowLeft"||e.key==="ArrowRight"||e.key==="ArrowUp"||e.key==="ArrowDown"){
   e.preventDefault();
   const [lon,lat]=rotation.current;
   rotation.current=[
    wrapLongitude(lon+(e.key==="ArrowLeft"?amount:e.key==="ArrowRight"?-amount:0)),
    Math.max(-85,Math.min(85,lat+(e.key==="ArrowUp"?amount:e.key==="ArrowDown"?-amount:0)))
   ];
   schedule.current?.();
  }
 }
 return <section className="kv3-globe-section" ref={section} aria-label="انتخاب کشور روی نقشه واقعی زمین">
  <div className="kv3-container kv3-globe-grid">
   <div className="kv3-globe-text">
    <span>REAL WORLD ATLAS • INTERACTIVE</span>
    <h2>جهان بزرگ است.<br/><em>از کشفش شروع کن.</em></h2>
    <p>نقشه واقعی قاره‌ها و کشورها را ببین، کره را بچرخان و روی کشور یا نشان مقصد بزن تا راهنمای ویزای آن را انتخاب کنی.</p>
    <Link className="kv3-button kv3-button-gold" href="/visa-explorer/">مقایسه همه کشورها ↗</Link>
    <small>داده جغرافیایی: Natural Earth با مقیاس ۱:۱۱۰ میلیون؛ نشان شینگن در بروکسل نماینده این منطقه است.</small>
   </div>
   <div className="kv3-globe-interaction">
    <div className="kv3-globe-canvas">
     <div className="kv3-globe-ring" aria-hidden="true"/>
     <canvas ref={canvas} width={540} height={540} role="img" tabIndex={0}
      aria-label="کره جغرافیایی واقعی؛ با کشیدن می‌چرخد، با لمس کشور یا نشان مقصد انتخاب می‌شود. با کلیدهای جهت‌دار نیز قابل چرخش است."
      aria-describedby="kv3-globe-instructions"
      onPointerDown={down} onPointerMove={move} onPointerUp={up}
      onPointerCancel={()=>pointer.current=null} onKeyDown={keyboard}/>
     {!countries&&!error&&<div className="kv3-globe-loading" role="status">در حال بارگذاری نقشه واقعی جهان…</div>}
     {error&&<div className="kv3-globe-loading" role="status">نقشه روی این دستگاه بارگذاری نشد؛ از فهرست مقصدهای زیر استفاده کن.</div>}
     <span id="kv3-globe-instructions" className="kv3-globe-label">لمس کشور، کشیدن برای چرخش؛ یا انتخاب از فهرست مقصدها</span>
    </div>
    <div className="kv3-globe-picks" role="group" aria-label="انتخاب مستقیم مقصد ویزا">
     {destinations.map(v=><button type="button" key={v.slug} className={v.slug===selected?"active":""}
      aria-pressed={v.slug===selected} onClick={()=>rotateTo(v.slug)}>{v.flag} {v.name}</button>)}
    </div>
    <div className="kv3-globe-result" aria-live="polite">
     <div><span>مقصد انتخاب‌شده</span><strong>{current.flag} {current.name}</strong>
     <small>{notCovered?"برای نقطه انتخابی راهنمای اختصاصی نداریم؛ یکی از نشان‌های موجود را انتخاب کن.":"کشور یا نشان دیگری انتخاب کن تا مسیر ویزا تغییر کند."}</small></div>
     <Link href={"/"+current.slug+"/"}>مشاهده راهنمای ویزا ←</Link>
    </div>
   </div>
  </div>
 </section>;
}
