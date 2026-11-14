"use client";

import Link from "next/link";
import { useState } from "react";
import { articles, categories, type Category } from "@/lib/home-data";

export default function JournalSection() {
  const [category, setCategory] = useState<Category>("همه");
  const items = articles.filter((a) => category === "همه" || a.category === category);
  const [featured, ...rest] = items;

  return (
    <section id="journal" aria-labelledby="journal-title">
      <div className="wrap">
        <div className="head">
          <div>
            <h2 id="journal-title">مدارک و راهنمای درخواست ویزا</h2>
            <p className="muted">پاسخ به سؤال‌های مهم درباره مدارک، هزینه‌ها و مراحل درخواست ویزا.</p>
          </div>
          <Link className="more" href="/visa-guides/">همه راهنماها</Link>
        </div>

        <div className="filters" role="group" aria-label="دسته‌بندی مطالب">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className="chip"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="jr">
          <article className="feat">
            {featured ? (
              <>
                <div>
                  <span className="tag">{featured.category}</span>
                  <h3>{featured.title}</h3>
                  <p className="muted">
                    {featured.excerpt ?? "راهنمای مستند با پیوند به منابع رسمی."}
                  </p>
                </div>
                <Link className="more" href={`/visa-guides/${featured.slug}/`}>
                  خواندن راهنما
                </Link>
              </>
            ) : (
              <p className="muted">مطلبی در این دسته نیست.</p>
            )}
          </article>

          <div className="list">
            {rest.map((a) => (
              <Link key={a.slug} href={`/visa-guides/${a.slug}/`}>
                <span className="tag">{a.category}</span>
                <h3>{a.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
