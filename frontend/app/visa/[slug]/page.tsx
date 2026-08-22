import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { getLanding } from "@/lib/api";
import { visaPages } from "@/lib/content";

export function generateStaticParams() { return Object.keys(visaPages).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const page = (await getLanding("visa", slug)) ?? visaPages[slug]; return page ? { title: { absolute: page.meta_title }, description: page.meta_description, alternates: { canonical: `/visa/${slug}` } } : {}; }

export default async function VisaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const page = (await getLanding("visa", slug)) ?? visaPages[slug]; if (!page) notFound();
  const requirements = page.custom_fields?.requirements ?? [];
  const steps = page.custom_fields?.steps ?? [];
  return <main className="container section article"><p className="breadcrumb"><Link href="/">خانه</Link> / <Link href="/visa">خدمات ویزا</Link> / {page.title}</p><span className="eyebrow">خدمات ویزا</span><h1>{page.title}؛ شرایط، مدارک و مراحل درخواست</h1><p className="lead">{page.excerpt}</p><section><h2>پیش از اقدام چه بدانیم؟</h2><p>{page.body}</p></section>{requirements.length > 0 && <section><h2>مدارک و الزامات</h2><ul>{requirements.map((item) => <li key={item}>{item}</li>)}</ul></section>}<section><h2>مراحل همکاری با خوش ویزا</h2><ol>{(steps.length ? steps : ["ارزیابی اولیه شرایط سفر و سوابق پرونده", "ارائه چک‌لیست اختصاصی مدارک", "بررسی و نظم‌دهی پرونده پیش از تحویل", "راهنمایی وقت سفارت و پیگیری مراحل"]).map((item) => <li key={item}>{item}</li>)}</ol></section><aside className="formCard"><h2>ارزیابی اولیه {page.title}</h2><LeadForm service={page.title} /></aside></main>;
}
