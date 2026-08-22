import type { Metadata } from "next";
import Link from "next/link";
import { tourPages } from "@/lib/content";

export const metadata: Metadata = { title: "تورهای خارجی", description: "تورهای استانبول، دبی و اروپا با استعلام قیمت و مشاوره سفر از خوش ویزا." };
export default function ToursIndex() { return <main className="container section"><p className="breadcrumb"><Link href="/">خانه</Link> / تورهای خارجی</p><h1>تورهای خارجی</h1><p className="lead">پکیج‌ها بر اساس تاریخ حرکت، ظرفیت، پرواز و هتل به‌روزرسانی می‌شوند. برای قیمت قطعی استعلام بگیرید.</p><div className="cards">{Object.values(tourPages).map((item) => <Link className="card" key={item.slug} href={`/tours/${item.slug}`}><h2>{item.title}</h2><p>{item.excerpt}</p></Link>)}</div></main>; }

