import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWordPressAuthor, getWordPressFeaturedImage, getWordPressFeaturedImageAlt, getWordPressPostBySlug } from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

function plainText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(date);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getWordPressPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.yoast_head_json?.title || post.title.rendered,
    description: post.yoast_head_json?.description || plainText(post.excerpt.rendered),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.yoast_head_json?.title || post.title.rendered,
      description: post.yoast_head_json?.description || plainText(post.excerpt.rendered),
      images: getWordPressFeaturedImage(post) ? [getWordPressFeaturedImage(post)!] : undefined,
      publishedTime: post.date,
      modifiedTime: post.modified,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getWordPressPostBySlug(slug);
  if (!post) notFound();
  const image = getWordPressFeaturedImage(post);
  const author = getWordPressAuthor(post);

  return (
    <main className="container section article">
      <p className="breadcrumb"><Link href="/">خانه</Link> / <Link href="/blog">مقالات</Link> / {post.title.rendered}</p>
      <article>
        <header>
          <h1>{post.title.rendered}</h1>
          <p className="breadcrumb">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {author ? ` · ${author}` : ""}
          </p>
          {post.excerpt.rendered ? <div className="lead" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} /> : null}
        </header>
        {image ? (
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={getWordPressFeaturedImageAlt(post)} style={{ width: "100%", height: "auto", borderRadius: 16 }} />
          </figure>
        ) : null}
        <div className="wordpress-content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </article>
    </main>
  );
}
