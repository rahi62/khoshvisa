const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL?.replace(/\/+$/, "");
const WORDPRESS_REST_API_PATH = (process.env.WORDPRESS_REST_API_PATH ?? "/wp-json/wp/v2")
  .replace(/^\/+/, "")
  .replace(/\/+$/, "");
const FETCH_TIMEOUT_MS = 5_000;

export type WordPressRendered = { rendered: string };

type WordPressEmbedded = {
  "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string; media_details?: { sizes?: Record<string, { source_url?: string }> } }>;
  author?: Array<{ name?: string }>;
};

export type WordPressPost = {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  link: string;
  title: WordPressRendered;
  content: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: WordPressEmbedded;
  yoast_head_json?: { title?: string; description?: string; canonical?: string };
};

export type WordPressPage = Omit<WordPressPost, "categories" | "tags"> & {
  parent: number;
  menu_order: number;
};

export type WordPressCategory = {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  parent: number;
};

function apiUrl(path: string) {
  if (!WORDPRESS_BASE_URL) return null;
  return `${WORDPRESS_BASE_URL}/${WORDPRESS_REST_API_PATH}/${path.replace(/^\/+/, "")}`;
}

async function wordpressRequest<T>(path: string, revalidate = 300): Promise<T | null> {
  const url = apiUrl(path);
  if (!url) return null;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function isWordPressConfigured() {
  return Boolean(WORDPRESS_BASE_URL);
}

export async function getWordPressPosts(params: {
  slug?: string;
  page?: number;
  perPage?: number;
  category?: number;
} = {}): Promise<WordPressPost[]> {
  const query = new URLSearchParams({
    _embed: "1",
    status: "publish",
    per_page: String(Math.min(Math.max(params.perPage ?? 10, 1), 100)),
    page: String(Math.max(params.page ?? 1, 1)),
  });
  if (params.slug) query.set("slug", params.slug);
  if (params.category) query.set("categories", String(params.category));
  return (await wordpressRequest<WordPressPost[]>(`posts?${query.toString()}`)) ?? [];
}

export async function getWordPressPostBySlug(slug: string): Promise<WordPressPost | null> {
  const posts = await getWordPressPosts({ slug, perPage: 1 });
  return posts.find((post) => post.status === "publish") ?? null;
}

export async function getWordPressPages(params: {
  slug?: string;
  page?: number;
  perPage?: number;
} = {}): Promise<WordPressPage[]> {
  const query = new URLSearchParams({
    _embed: "1",
    status: "publish",
    per_page: String(Math.min(Math.max(params.perPage ?? 100, 1), 100)),
    page: String(Math.max(params.page ?? 1, 1)),
  });
  if (params.slug) query.set("slug", params.slug);
  return (await wordpressRequest<WordPressPage[]>(`pages?${query.toString()}`)) ?? [];
}

export async function getWordPressPageBySlug(slug: string): Promise<WordPressPage | null> {
  const pages = await getWordPressPages({ slug, perPage: 1 });
  return pages.find((page) => page.status === "publish") ?? null;
}

function normalizePath(path: string) {
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    // Keep the original path if it contains malformed percent-encoding.
  }
  const normalized = `/${decoded.split("/").filter(Boolean).join("/")}`;
  return normalized === "/" ? "/" : `${normalized}/`;
}

/** Resolve a WordPress page only when its permalink path exactly matches the requested frontend path. */
export async function getWordPressPageByPath(path: string): Promise<WordPressPage | null> {
  const slug = path.split("/").filter(Boolean).at(-1);
  if (!slug) return null;
  const pages = await getWordPressPages({ slug, perPage: 100 });
  const requestedPath = normalizePath(path);
  return pages.find((page) => {
    try {
      return normalizePath(new URL(page.link).pathname) === requestedPath;
    } catch {
      return false;
    }
  }) ?? null;
}

export async function getWordPressCategories(): Promise<WordPressCategory[]> {
  return (await wordpressRequest<WordPressCategory[]>("categories?per_page=100&hide_empty=true")) ?? [];
}

export function getWordPressFeaturedImage(item: WordPressPost | WordPressPage) {
  const media = item._embedded?.["wp:featuredmedia"]?.[0];
  return media?.media_details?.sizes?.medium_large?.source_url
    ?? media?.media_details?.sizes?.large?.source_url
    ?? media?.source_url
    ?? null;
}

export function getWordPressFeaturedImageAlt(item: WordPressPost | WordPressPage) {
  return item._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ?? item.title.rendered;
}

export function getWordPressAuthor(item: WordPressPost | WordPressPage) {
  return item._embedded?.author?.[0]?.name ?? "";
}
