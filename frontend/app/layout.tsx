import type {Metadata} from "next";import "./globals.css";import {Footer,Header} from "@/components/site-shell";
const url=process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:3000";
export const metadata:Metadata={metadataBase:new URL(url),title:{default:"خوش ویزا | خدمات تور و ویزا",template:"%s | خوش ویزا"},description:"خدمات تخصصی ویزای توریستی و تورهای خارجی",alternates:{canonical:"/"}};
export default function Layout({children}:{children:React.ReactNode}){const schema={"@context":"https://schema.org","@type":"TravelAgency",name:"خوش ویزا",url,telephone:["+989124175574","+982146010788"]};return <html lang="fa" dir="rtl"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><Header/>{children}<Footer/></body></html>}
