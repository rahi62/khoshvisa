import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { getLanding } from "@/lib/api";
import { tourPages } from "@/lib/content";

export function generateStaticParams() { return Object.keys(tourPages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const page = (await getLanding("tour", slug)) ?? tourPages[slug]; return page ? { title: { absolute: page.meta_title }, description: page.meta_description, alternates: { canonical: `/tours/${slug}` } } : {}; }
export default async function TourPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = (await getLanding("tour", slug)) ?? tourPages[slug]; if (!page) notFound(); return <main className="container section article"><p className="breadcrumb"><Link href="/">خانه</Link> / <Link href="/tours">تورها</Link> / {page.title}</p><span className="eyebrow">تورهای خارجی</span><h1>{page.title}؛ قیمت و پکیج‌های سفر</h1><p className="lead">{page.excerpt}</p><section><h2>جزئیات و قیمت تور</h2><p>{page.body}</p></section><section><h2>پیش از رزرو بررسی می‌کنیم</h2><ul><li>تاریخ و ساعت پرواز و میزان بار مجاز</li><li>درجه، موقعیت و خدمات هتل</li><li>خدمات شامل و غیرشامل پکیج</li><li>شرایط تغییر تاریخ و کنسلی</li></ul></section><aside className="formCard"><h2>استعلام {page.title}</h2><LeadForm service={page.title} /></aside></main>; }
