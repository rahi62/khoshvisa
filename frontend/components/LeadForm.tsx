"use client";

import { FormEvent, useState } from "react";

export function LeadForm({ service = "مشاوره تور و ویزا" }: { service?: string }) {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("در حال ارسال...");
    const form = new FormData(formElement);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1"}/leads/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: form.get("full_name"), phone: form.get("phone"), service }),
    });
    if (response.ok) {
      formElement.reset();
      setStatus("درخواست شما ثبت شد؛ با شما تماس می‌گیریم.");
    } else {
      setStatus("ارسال انجام نشد؛ شماره را بررسی کنید یا مستقیم تماس بگیرید.");
    }
  }

  return (
    <form className="leadForm" onSubmit={submit}>
      <label>نام و نام خانوادگی<input name="full_name" required /></label>
      <label>شماره موبایل<input name="phone" inputMode="tel" pattern="09[0-9]{9}" required /></label>
      <button className="button" type="submit">درخواست تماس</button>
      <p aria-live="polite">{status}</p>
    </form>
  );
}
