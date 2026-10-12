"use client";
import {useEffect,useMemo,useState} from "react";
import Link from "next/link";
import type {Visa} from "../lib/content";
export default function DestinationExplorer({items}:{items:Visa[]}){
 const [q,setQ]=useState(""),[region,setRegion]=useState("همه مقصدها");
 useEffect(()=>{setQ(new URLSearchParams(window.location.search).get("q")||"")},[]);
 const regions=["همه مقصدها",...Array.from(new Set(items.map(x=>x.region)))];
 const normalized=q.trim().replace(/ي/g,"ی").replace(/ك/g,"ک").toLowerCase();
 const filtered=useMemo(()=>items.filter(v=>(region==="همه مقصدها"||v.region===region)&&[v.name,v.region,v.intro].join(" ").replace(/ي/g,"ی").replace(/ك/g,"ک").toLowerCase().includes(normalized)),[normalized,region,items]);
 return <div className="cin-explorer"><div className="explorer"><label className="searchBox"><span aria-hidden="true">⌕</span><input aria-label="جست‌وجوی مقصد" placeholder="نام کشور یا مقصد را جست‌وجو کنید..." value={q} onChange={e=>setQ(e.target.value)}/></label><div className="filters">{regions.map(r=><button key={r} className={r===region?"filter active":"filter"} onClick={()=>setRegion(r)} aria-pressed={r===region}>{r}</button>)}</div></div><p className="cin-result-count" aria-live="polite">{new Intl.NumberFormat("fa-IR").format(filtered.length)} مقصد پیدا شد</p><div className="destinationGrid">{filtered.map(v=><a className="destinationCard cin-explorer-card" key={v.slug} href={"/"+v.slug+"/"} style={{viewTransitionName:"visa-"+v.slug}}><div className="cardImage" style={{backgroundImage:"linear-gradient(0deg,rgba(6,27,42,.9),rgba(6,27,42,.05) 70%),url('"+v.photo+"')"}}/><div className="cardTop"><span>{v.region}</span><span>{v.flag}</span></div><div className="cardBottom"><h3>ویزای توریستی {v.name}</h3><p>{v.intro}</p><span className="cardArrow">مشاهده راهنمای ویزا ←</span></div></a>)}</div>{filtered.length===0&&<div className="emptyState">مقصدی با این عبارت پیدا نشد. <button onClick={()=>{setQ("");setRegion("همه مقصدها")}}>نمایش همه مقصدها</button></div>}</div>
}
