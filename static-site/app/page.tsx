import type { Metadata } from "next";
import JournalSection from "@/components/home/JournalSection";
import { Consult, Directory, Hero, Process, Trust } from "@/components/home/sections";
import "@/styles/home.css";

export const metadata: Metadata = {
  title: "درخواست ویزای توریستی | خدمات اخذ ویزا - خوش‌ویزا",
  description:
    "ثبت درخواست ویزای توریستی شینگن، کانادا، انگلیس و سایر مقصدها؛ بررسی شرایط اولیه و هماهنگی مراحل درخواست ویزا.",
  alternates: { canonical: "/" },
};

const homeSchema={"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://khoshvisa.ir/#organization",name:"خوش‌ویزا",url:"https://khoshvisa.ir/",description:"ثبت درخواست و هماهنگی خدمات ویزای توریستی",contactPoint:[{"@type":"ContactPoint",contactType:"customer support",telephone:"+989351300502",availableLanguage:["fa"]},{"@type":"ContactPoint",contactType:"customer support",telephone:"+982146010788",availableLanguage:["fa"]}]},{"@type":"WebSite","@id":"https://khoshvisa.ir/#website",url:"https://khoshvisa.ir/",name:"خوش‌ویزا",inLanguage:"fa-IR",publisher:{"@id":"https://khoshvisa.ir/#organization"}}]};

export default function NewHomePage() {
  return (
    <div className="kvh" dir="rtl" lang="fa">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchema).replace(/</g, "\\u003c")
        }}
      />
      <main>
        <Hero />
        <Directory />
        <Process />
        <JournalSection />
        <Trust />
        <Consult />
      </main>
    </div>
  );
}
