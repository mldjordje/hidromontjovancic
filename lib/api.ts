export type Project = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  body?: string;
  hero_image?: string | null;
  gallery?: { id?: number; src: string; alt?: string | null; sort_order?: number }[];
  tags?: Record<string, unknown> | string[] | null;
  published_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  status?: string;
};

export type Order = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  concrete_type?: string | null;
  message: string;
  status: "new" | "in_progress" | "done";
  created_at: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost/api";

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getProjects(limit = 20, offset = 0) {
  return fetchJson<{ data: Project[]; meta: { limit: number; offset: number } }>(
    `/projects?limit=${limit}&offset=${offset}`,
    { cache: "no-store" }
  );
}

export async function getProject(slug: string) {
  return fetchJson<Project>(`/projects/${encodeURIComponent(slug)}`, { cache: "no-store" });
}
