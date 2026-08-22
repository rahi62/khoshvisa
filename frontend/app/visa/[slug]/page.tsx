import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { visaPages } from "@/lib/content";

export function generateStaticParams() { return Object.keys(visaPages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const page = visaPages[slug]; return page ? { title: { absolute: page.meta_title }, description: page.meta_description, alternates: { canonical: `/visa/${slug}` } } : {}; }

export default async function VisaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = visaPages[slug]; if (!page) notFound();
  return <main className="container section article"><p className="breadcrumb"><Link href="/">خانه</Link> / <Link href="/visa">خدمات ویزا</Link> / {page.title}</p><span className="eyebrow">خدمات ویزا</span><h1>{page.title}؛ شرایط، مدارک و مراحل درخواست</h1><p className="lead">{page.excerpt}</p><section><h2>پیش از اقدام چه بدانیم؟</h2><p>{page.body}</p></section><section><h2>مراحل همکاری با خوش ویزا</h2><ol><li>ارزیابی اولیه شرایط سفر و سوابق پرونده</li><li>ارائه چک‌لیست اختصاصی مدارک</li><li>بررسی و نظم‌دهی پرونده پیش از تحویل</li><li>راهنمایی وقت سفارت و پیگیری مراحل</li></ol></section><aside className="formCard"><h2>ارزیابی اولیه {page.title}</h2><LeadForm service={page.title} /></aside></main>;
}
