"use client";

import Link from "next/link";
import { useState } from "react";
import { destinations } from "@/lib/home-data";

export default function DestinationChecker() {
  const [index, setIndex] = useState(0);
  const d = destinations[index];

  return (
    <div className="checker" aria-labelledby="checker-title">
      <h2 id="checker-title">مقصدت کجاست؟</h2>

      <div className="chips" role="radiogroup" aria-label="انتخاب مقصد">
        {destinations.map((item, i) => (
          <button
            key={item.href}
            type="button"
            role="radio"
            aria-checked={i === index}
            className="chip"
            onClick={() => setIndex(i)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="result" aria-live="polite">
        <div className="name">ویزای {d.name}</div>
        <dl>
          <div className="row">
            <dt>مسیر درخواست</dt>
            <dd>{d.route}</dd>
          </div>
          <div className="row">
            <dt>اول بدان</dt>
            <dd>{d.note}</dd>
          </div>
        </dl>
        <Link className="btn btn-primary" href={d.href}>
          شرایط ویزای این مقصد
        </Link>
        <Link className="alt" href="/consultation/">
          شروع درخواست ویزا
        </Link>
      </div>
    </div>
  );
}
