"use client";
import {useEffect,useState} from "react";
import {isPublicContactSettings,type PublicContactSettings} from "../lib/contact-settings";

export function usePublicContactSettings(){
 const [settings,setSettings]=useState<PublicContactSettings|null>(null);
 const [state,setState]=useState<"loading"|"ready"|"error">("loading");
 useEffect(()=>{
  const controller=new AbortController();
  fetch("/api/public/contact",{cache:"no-store",signal:controller.signal})
   .then(async response=>{if(!response.ok)throw Error("unavailable");return response.json() as Promise<unknown>})
   .then(data=>{if(!isPublicContactSettings(data))throw Error("invalid_settings");setSettings(data);setState("ready")})
   .catch(()=>{if(!controller.signal.aborted){setSettings(null);setState("error")}});
  return ()=>controller.abort();
 },[]);
 return {settings,state};
}
/** Public numbers are read from PostgreSQL. Do not render a possibly obsolete number on API failure. */
export default function ContactChannels({variant="page"}:{variant?:"page"|"footer"}){
 const {settings,state}=usePublicContactSettings();
 if(state==="loading")return <p aria-live="polite">در حال دریافت شماره‌های پاسخ‌گویی…</p>;
 if(state==="error"||!settings)return <p role="status">شماره‌های تماس موقتاً در دسترس نیستند؛ این صفحه را کمی بعد تازه‌سازی کنید.</p>;
 return <div className={"kv-contact-methods kv-contact-"+variant}>
  {settings.mobile&&<p><strong>موبایل: </strong><a href={"tel:+98"+settings.mobile.slice(1)} dir="ltr">{settings.mobile}</a></p>}
  {settings.landline&&<p><strong>تلفن ثابت: </strong><a href={"tel:+98"+settings.landline.slice(1)} dir="ltr">{settings.landline}</a></p>}
  {settings.whatsappEnabled&&settings.whatsappNumber&&<p><a href="/consultation/">آغاز ارتباط واتساپی ←</a></p>}
 </div>;
}
