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
  return <main className="container section article"><p className="breadcrumb"><Link href="/">خانه</Link> / <Link href="/visa">خدمات ویزا</Link> / {page.title}</p><span className="eyebrow">راهنمای به‌روز ویزا</span><h1>{page.title}؛ شرایط، مدارک و مراحل درخواست</h1><p className="lead">{page.excerpt}</p><section><h2>پیش از اقدام چه بدانیم؟</h2><p>{page.body}</p><p>هر پرونده بر اساس هدف سفر، وضعیت شغلی، توانایی مالی، سابقه سفر و وابستگی‌های متقاضی بررسی می‌شود؛ بنابراین نسخه یکسانی برای همه متقاضیان وجود ندارد.</p></section><section><h2>ارزیابی اولیه شامل چه مواردی است؟</h2><ul><li>بررسی هدف سفر و تناسب کشور مقصد با شرایط متقاضی</li><li>ارزیابی سابقه سفر و پرونده‌های قبلی</li><li>بررسی کلی مدارک مالی، شغلی و خانوادگی</li><li>شناسایی تناقض‌ها و نقاطی که پیش از اقدام باید تقویت شوند</li></ul></section>{requirements.length > 0 && <section><h2>مدارک و الزامات</h2><ul>{requirements.map((item) => <li key={item}>{item}</li>)}</ul></section>}<section><h2>مراحل همکاری با خوش ویزا</h2><ol>{(steps.length ? steps : ["ارزیابی اولیه شرایط سفر و سوابق پرونده", "ارائه چک‌لیست اختصاصی مدارک", "بررسی ترجمه‌ها، فرم‌ها و نظم پرونده", "راهنمایی وقت سفارت و انگشت‌نگاری", "پیگیری وضعیت و راهنمایی تا اعلام نتیجه"]).map((item) => <li key={item}>{item}</li>)}</ol></section><section><h2>هزینه و مدت بررسی</h2><p>هزینه رسمی سفارت، هزینه کارگزاری، بیمه، ترجمه و حق خدمات از یکدیگر جدا هستند. مبلغ و زمان تقریبی پس از مشخص‌شدن نوع ویزا و شرایط پرونده اعلام می‌شود و ممکن است با تغییر مقررات یا نرخ ارز تغییر کند.</p></section><section><h2>دلایل رایج ضعف پرونده</h2><ul><li>هدف سفر نامشخص یا برنامه سفر غیرمنسجم</li><li>مدارک مالی یا شغلی غیرقابل استناد</li><li>تناقض میان فرم، رزروها و مدارک ارائه‌شده</li><li>بی‌توجهی به سابقه ریجکتی و توضیح‌ندادن تغییر شرایط</li></ul><p><strong>توجه:</strong> هیچ مجموعه‌ای امکان تضمین صدور ویزا ندارد و تصمیم نهایی فقط با سفارت است.</p></section><aside className="formCard"><h2>ارزیابی اولیه {page.title}</h2><p>شماره تماس خود را ثبت کنید تا برای بررسی شرایط و قدم بعدی با شما تماس بگیریم.</p><LeadForm service={page.title} /></aside></main>;
}
