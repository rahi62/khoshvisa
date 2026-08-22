import type { Landing } from "./content";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

async function request<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getLandings(type: "visa" | "tour"): Promise<Landing[] | null> {
  return request<Landing[]>(type === "visa" ? "/visa-services/" : "/tours/");
}

export async function getLanding(type: "visa" | "tour", slug: string): Promise<Landing | null> {
  const prefix = type === "visa" ? "/visa-services" : "/tours";
  return request<Landing>(`${prefix}/${slug}/`);
}

