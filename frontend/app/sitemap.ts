import type { MetadataRoute } from "next";
import { tourPages, visaPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://khoshvisa.ir";
  return ["", "/visa", "/tours", "/uk-10-year-visa", ...Object.keys(visaPages).map((s) => `/visa/${s}`), ...Object.keys(tourPages).map((s) => `/tours/${s}`)].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path ? "weekly" : "daily", priority: path ? 0.8 : 1 }));
}

