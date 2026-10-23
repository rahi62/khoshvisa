import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import JournalSection from "@/components/home/JournalSection";
import { Consult, Directory, Footer, Header, Hero, Process, StickyBar, Trust } from "@/components/home/sections";
import "@/styles/home.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "خوش‌ویزا | راهنمای ویزای توریستی برای ایرانیان",
  description:
    "مدارک، شرایط و هزینه‌های رسمی ویزای شینگن، کانادا، انگلیس، فرانسه، آلمان، ایتالیا، ژاپن و استرالیا برای ایرانیان.",
  // Staging route next to the current homepage: keep it out of the index until it replaces "/".
  robots: { index: false, follow: false },
};

const homeSchema={"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://khoshvisa.ir/#organization",name:"خوش‌ویزا",url:"https://khoshvisa.ir/",description:"پلتفرم مستقل راهنمای ویزا و هماهنگی اولیه درخواست",contactPoint:[{"@type":"ContactPoint",contactType:"customer support",telephone:"+989351300502",availableLanguage:["fa"]},{"@type":"ContactPoint",contactType:"customer support",telephone:"+982146010788",availableLanguage:["fa"]}]},{"@type":"WebSite","@id":"https://khoshvisa.ir/#website",url:"https://khoshvisa.ir/",name:"خوش‌ویزا",inLanguage:"fa-IR",publisher:{"@id":"https://khoshvisa.ir/#organization"}}]};

export default function NewHomePage() {
  return (
    <div className={`kvh ${vazirmatn.className}`} dir="rtl" lang="fa">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeSchema).replace(/</g, "\\u003c")
        }}
      />
      <Header />
      <main>
        <Hero />
        <Directory />
        <Process />
        <JournalSection />
        <Trust />
        <Consult />
      </main>
      <Footer />
      <StickyBar />
    </div>
  );
}
