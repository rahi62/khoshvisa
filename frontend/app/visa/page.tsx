import type { Metadata } from "next";
import Link from "next/link";
import { getLandings } from "@/lib/api";
import { visaPages } from "@/lib/content";

export const metadata: Metadata = { title: "خدمات ویزا", description: "بررسی خدمات ویزای شینگن، فرانسه، ایتالیا و اسپانیا در خوش ویزا." };

export default async function VisaIndex() {
  const items = (await getLandings("visa")) ?? Object.values(visaPages);
  return <main className="container section"><p className="breadcrumb"><Link href="/">خانه</Link> / خدمات ویزا</p><h1>خدمات ویزا</h1><p className="lead">هر مقصد شرایط و مدارک متفاوتی دارد. صفحه مقصد خود را انتخاب کنید تا اطلاعات دقیق‌تر را ببینید.</p><div className="cards">{items.map((item) => <Link className="card" key={item.slug} href={`/visa/${item.slug}`}><h2>{item.title}</h2><p>{item.excerpt}</p></Link>)}</div></main>;
}
