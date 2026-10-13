"use client";
import {useEffect,useState} from "react";
import {DEFAULT_SITE_SETTINGS,phoneHref} from "@/lib/site-settings";

type PublicDetails={
 brandName:string;footerDescription:string;supportMobile:string;
 supportLandline:string;email:string;instagramUrl:string;telegramUrl:string;
};
export default function PublicContactDetails(){
 const [data,setData]=useState<PublicDetails|null>(null);
 useEffect(()=>{
  let active=true;
  fetch("/api/public/site-settings",{cache:"no-store"})
   .then(async r=>r.ok?await r.json():null)
   .then(d=>{if(active&&d&&typeof d.brandName==="string")setData(d)})
   .catch(()=>{});
  return ()=>{active=false};
 },[]);
 const s=data??DEFAULT_SITE_SETTINGS;
 return <div>
  <strong>{s.brandName}</strong>
  <p>{s.footerDescription}</p>
  {s.supportMobile&&<a href={phoneHref(s.supportMobile)} dir="ltr">{s.supportMobile}</a>}
  {s.supportLandline&&<a href={phoneHref(s.supportLandline)} dir="ltr">{s.supportLandline}</a>}
  {s.email&&<a href={"mailto:"+s.email}>{s.email}</a>}
  {s.instagramUrl&&<a href={s.instagramUrl} rel="noopener noreferrer" target="_blank">اینستاگرام ↗</a>}
  {s.telegramUrl&&<a href={s.telegramUrl} rel="noopener noreferrer" target="_blank">تلگرام ↗</a>}
 </div>;
}
