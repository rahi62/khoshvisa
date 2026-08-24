import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { toNextMetadata, type CmsBlock, type ResolvedPage } from "@digitalafarin/cms-next";
import { getCmsClient } from "@/lib/digitalafarin-cms";

type RouteParams = { path: string[] };

function cmsPath(segments: string[]) {
  return `/${segments.join("/")}`;
}

async function resolvePage(path: string): Promise<ResolvedPage | null> {
  const client = getCmsClient();
  if (!client) return null;
  try {
    return await client.resolve(path);
  } catch {
    return null;
  }
}

function stringValue(data: Record<string, unknown>, ...keys: string[]) {
  for (const key of keys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) return value;
  }
  return "";
}

function CmsBlockView({ block }: { block: CmsBlock }) {
  const data = block.data ?? {};
  const text = stringValue(data, "html", "text", "content", "body");

  if (block.type === "rich_text") {
    if (!text) return null;
    return <div className="cms-rich-text" dangerouslySetInnerHTML={{ __html: text }} />;
  }

  if (block.type === "text") {
    return text ? <p style={{ whiteSpace: "pre-wrap" }}>{text}</p> : null;
  }

  if (block.type === "heading") {
    const level = Number(data.level ?? 2);
    return text ? (level >= 3 ? <h3>{text}</h3> : <h2>{text}</h2>) : null;
  }

  if (block.type === "image") {
    const src = stringValue(data, "url", "src", "image");
    if (!src) return null;
    const alt = stringValue(data, "alt", "title");
    const caption = stringValue(data, "caption");
    return (
      <figure>
        {/* CMS media URLs are dynamic; use a native image so remote host changes do not require a Next.js rebuild. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" style={{ width: "100%", height: "auto" }} />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  }

  if (block.type === "list") {
    const items = Array.isArray(data.items) ? data.items.filter((item): item is string => typeof item === "string") : [];
    return items.length ? <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul> : null;
  }

  if (block.type === "quote") {
    return text ? <blockquote>{text}</blockquote> : null;
  }

  if (block.type === "cta") {
    const href = stringValue(data, "url", "href", "link");
    const label = stringValue(data, "label", "title", "text") || "اطلاعات بیشتر";
    return href ? <p><Link className="btn primary" href={href}>{label}</Link></p> : null;
  }

  return text ? <p style={{ whiteSpace: "pre-wrap" }}>{text}</p> : null;
}

export async function generateMetadata({ params }: { params: Promise<RouteParams> }): Promise<Metadata> {
  const { path } = await params;
  const page = await resolvePage(cmsPath(path));
  return page ? toNextMetadata(page) : {};
}

export default async function CmsCatchAllPage({ params }: { params: Promise<RouteParams> }) {
  const { path: segments } = await params;
  const path = cmsPath(segments);
  const client = getCmsClient();
  const page = await resolvePage(path);

  if (!page) {
    let redirectMatch: { match: boolean; type?: number; destination?: string | null } | null = null;
    if (client) {
      try {
        redirectMatch = await client.resolveRedirect(path);
      } catch {
        redirectMatch = null;
      }
    }

    if (redirectMatch?.match && redirectMatch.destination) {
      if (redirectMatch.type === 301 || redirectMatch.type === 308) permanentRedirect(redirectMatch.destination);
      redirect(redirectMatch.destination);
    }

    notFound();
  }

  return (
    <main className="container section article">
      {page.breadcrumbs?.length ? (
        <p className="breadcrumb">
          <Link href="/">خانه</Link>
          {page.breadcrumbs.map((item) => (
            <span key={item.path}> / <Link href={item.path}>{item.title}</Link></span>
          ))}
        </p>
      ) : null}

      <h1>{page.content.title}</h1>
      {page.content.excerpt ? <p className="lead">{page.content.excerpt}</p> : null}

      {page.blocks?.map((block, index) => (
        <CmsBlockView key={block.id ?? `${block.type}-${index}`} block={block} />
      ))}

      {page.related_content?.length ? (
        <section>
          <h2>مطالب مرتبط</h2>
          <ul>
            {page.related_content.map((item) => (
              <li key={item.id}><Link href={item.path}>{item.title}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
