import type { MetadataRoute } from "next";
import { tourPages, visaPages } from "@/lib/content";
import { getWordPressPages, getWordPressPosts, getWordPressFeaturedImage } from "@/lib/wordpress";

function normalizePath(path: string) {
  const normalized = `/${path.split("/").filter(Boolean).join("/")}`;
  return normalized === "/" ? "/" : `${normalized}/`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://khoshvisa.ir";
  const staticPaths = [
    "",
    "/visa",
    "/tours",
    ...Object.keys(visaPages).map((slug) => `/visa/${slug}`),
    ...Object.keys(tourPages).map((slug) => `/tours/${slug}`),
  ];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "weekly" : "daily",
    priority: path ? 0.8 : 1,
  }));

  const [posts, pages] = await Promise.all([
    getWordPressPosts({ perPage: 100 }),
    getWordPressPages({ perPage: 100 }),
  ]);
  const existing = new Set(staticPaths.map(normalizePath));
  const wordpressEntries: MetadataRoute.Sitemap = [
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...pages.flatMap((page) => {
      try {
        const path = normalizePath(new URL(page.link).pathname);
        if (existing.has(path) || path === "/" || path === "/blog/") return [];
        return [{
          url: `${base}${path.replace(/\/$/, "")}`,
          lastModified: page.modified ? new Date(page.modified) : new Date(page.date),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }];
      } catch {
        return [];
      }
    }),
  ];

  return [...staticEntries, ...wordpressEntries];
}
