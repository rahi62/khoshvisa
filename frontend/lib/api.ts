import type { Landing } from "./content";
import { cms } from "./digitalafarin-cms";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

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
  return request<Landing[]>(type === "visa" ? "/visa-services/" : "/tours/");
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
