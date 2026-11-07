const WORDPRESS_BASE_URL = process.env.WORDPRESS_BASE_URL?.replace(/\/+$/, "");
const WORDPRESS_REST_API_PATH = (process.env.WORDPRESS_REST_API_PATH ?? "/wp-json/wp/v2")
  .replace(/^\/+/, "")
  .replace(/\/+$/, "");
const FETCH_TIMEOUT_MS = 5_000;

export type WordPressRendered = { rendered: string };

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
  const query = new URLSearchParams({ _embed: "1", per_page: String(params.perPage ?? 10), page: String(params.page ?? 1) });
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
  const query = new URLSearchParams({ _embed: "1", per_page: String(params.perPage ?? 100), page: String(params.page ?? 1) });
  if (params.slug) query.set("slug", params.slug);
  return (await wordpressRequest<WordPressPage[]>(`pages?${query.toString()}`)) ?? [];
}

export async function getWordPressPageBySlug(slug: string): Promise<WordPressPage | null> {
  const pages = await getWordPressPages({ slug, perPage: 1 });
  return pages.find((page) => page.status === "publish") ?? null;
}

export async function getWordPressCategories(): Promise<WordPressCategory[]> {
  return (await wordpressRequest<WordPressCategory[]>("categories?per_page=100&hide_empty=true")) ?? [];
}
