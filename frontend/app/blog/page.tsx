import type { Metadata } from "next";
import Link from "next/link";
import { getWordPressPosts, getWordPressFeaturedImage, getWordPressFeaturedImageAlt } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "مقالات و راهنمای سفر و ویزا | خوش ویزا",
  description: "مقالات، راهنماها و تازه‌های سفر، ویزا و مهاجرت در خوش ویزا.",
  alternates: { canonical: "/blog" },
};

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(date);
}

export default async function BlogIndexPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const pageNumber = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const posts = await getWordPressPosts({ page: pageNumber, perPage: 12 });

  return (
    <main className="container section">
      <header className="sectionHeading">
        <span className="eyebrow">دانش‌نامه خوش ویزا</span>
        <h1>مقالات و راهنمای سفر</h1>
        <p className="lead">راهنماهای کاربردی درباره ویزا، مدارک، قوانین سفر و انتخاب مقصد.</p>
      </header>
      {posts.length ? (
        <div className="cards">
          {posts.map((post) => {
            const image = getWordPressFeaturedImage(post);
            return (
              <article className="card" key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={getWordPressFeaturedImageAlt(post)} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: 12 }} />
                  ) : null}
                  <h2>{post.title.rendered}</h2>
                </Link>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <Link href={`/blog/${post.slug}`}>ادامه مطلب</Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p>در حال حاضر مقاله‌ای برای نمایش وجود ندارد. اتصال وردپرس را بررسی کنید یا ابتدا یک نوشته منتشرشده ایجاد کنید.</p>
      )}
      <nav aria-label="صفحه‌بندی مقالات" style={{ display: "flex", gap: 16, marginTop: 32 }}>
        {pageNumber > 1 ? <Link href={pageNumber === 2 ? "/blog" : `/blog?page=${pageNumber - 1}`}>مقالات جدیدتر</Link> : null}
        {posts.length === 12 ? <Link href={`/blog?page=${pageNumber + 1}`}>مقالات قدیمی‌تر</Link> : null}
      </nav>
    </main>
  );
}
