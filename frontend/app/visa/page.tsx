import type { Metadata } from "next";
import Link from "next/link";
import { visaPages } from "@/lib/content";

export const metadata: Metadata = { title: "خدمات ویزا", description: "بررسی خدمات ویزای شینگن، فرانسه، ایتالیا و اسپانیا در خوش ویزا." };

export default function VisaIndex() {
  return <main className="container section"><p className="breadcrumb"><Link href="/">خانه</Link> / خدمات ویزا</p><h1>خدمات ویزا</h1><p className="lead">هر مقصد شرایط و مدارک متفاوتی دارد. صفحه مقصد خود را انتخاب کنید تا اطلاعات دقیق‌تر را ببینید.</p><div className="cards">{Object.values(visaPages).map((item) => <Link className="card" key={item.slug} href={`/visa/${item.slug}`}><h2>{item.title}</h2><p>{item.excerpt}</p></Link>)}</div></main>;
}

