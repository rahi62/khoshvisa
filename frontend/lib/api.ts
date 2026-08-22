import type { Landing } from "./content";
import { cms } from "./digitalafarin-cms";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

export type SiteSettings = {
  brand_name: string; brand_name_en: string; tagline: string; brand_description: string;
  logo: string; logo_dark: string; favicon: string; primary_color: string; accent_color: string;
  default_og_image: string; site_domain: string; mobile: string; phone: string; whatsapp: string;
  telegram_url: string; instagram_url: string; email: string; working_hours: string;
  primary_cta_text: string; mobile_sticky_call_enabled: boolean; north_office: string; west_office: string;
  default_meta_title: string; default_meta_description: string; google_site_verification: string;
  google_analytics_id: string; google_tag_manager_id: string; visa_disclaimer: string;
  privacy_consent_text: string; lead_success_message: string; lead_error_message: string;
  hero_eyebrow: string; hero_title: string; hero_description: string; hero_image: string;
  home_services_enabled: boolean; home_testimonials_enabled: boolean; home_faq_enabled: boolean; home_trust_enabled: boolean;
};

export type FAQ = { id: number; question: string; answer: string; page_path: string; sort_order: number };
export type Testimonial = { id: number; customer_name: string; customer_role: string; text: string; avatar: string; rating: number; sort_order: number };
export type TrustItem = { id: number; title: string; description: string; image: string; link: string; item_type: string; sort_order: number };
export type MenuItem = { id: string; label: string; url: string; sort_order: number; is_external: boolean; children: MenuItem[] };

async function request<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getLandings(type: "visa" | "tour"): Promise<Landing[] | null> {
  const payload = await request<Landing[] | { results: Landing[] }>(type === "visa" ? "/visa-services/" : "/tours/");
  return payload ? (Array.isArray(payload) ? payload : payload.results) : null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> { return request<SiteSettings>("/settings/"); }

async function getList<T>(path: string): Promise<T[]> {
  const payload = await request<T[] | { results: T[] }>(path);
  if (!payload) return [];
  return Array.isArray(payload) ? payload : payload.results;
}

export async function getFAQs(path = ""): Promise<FAQ[]> { return getList<FAQ>(`/faqs/${path ? `?path=${encodeURIComponent(path)}` : ""}`); }
export async function getTestimonials(): Promise<Testimonial[]> { return getList<Testimonial>("/testimonials/"); }
export async function getTrustItems(): Promise<TrustItem[]> { return getList<TrustItem>("/trust-items/"); }

export async function getMainMenu(): Promise<MenuItem[]> {
  try {
    const payload = await cms.getMenu("main") as { results?: Array<{ items?: MenuItem[] }> } | Array<{ items?: MenuItem[] }>;
    const menus = Array.isArray(payload) ? payload : payload.results ?? [];
    return menus[0]?.items ?? [];
  } catch { return []; }
}

export async function getLanding(type: "visa" | "tour", slug: string): Promise<Landing | null> {
  const route = type === "visa" ? `/visa/${slug}` : `/tours/${slug}`;
  try {
    const resolved = await cms.resolve(route);
    const textBlock = resolved.blocks.find((block) => block.type === "rich_text" || block.type === "text");
    const text = textBlock?.data?.text;
    return {
      slug: resolved.content.slug,
      title: resolved.content.title,
      excerpt: resolved.content.excerpt,
      body: typeof text === "string" ? text : resolved.content.excerpt,
      meta_title: resolved.seo?.title || resolved.content.title,
      meta_description: resolved.seo?.description || resolved.content.excerpt,
    };
  } catch {
    // Keep the legacy endpoint as a safe migration fallback until CMS content is verified.
  }
  const prefix = type === "visa" ? "/visa-services" : "/tours";
  return request<Landing>(`${prefix}/${slug}/`);
}
