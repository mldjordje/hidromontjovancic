import { getProject, getProjectById, getProjects, type Project } from "@/lib/api";

export async function resolveProject(slug?: string, id?: number): Promise<Project | null> {
  if (slug) {
    try {
      return await getProject(slug);
    } catch {
      // Continue with fallbacks below.
    }
  }

  if (id && Number.isInteger(id) && id > 0) {
    try {
      return await getProjectById(id);
    } catch {
      // Continue with list fallback below.
    }
  }

  try {
    const list = await getProjects(200, 0);
    if (id && Number.isInteger(id) && id > 0) {
      const byId = list.data.find((item) => item.id === id);
      if (byId) return byId;
    }
    if (slug) {
      const bySlug = list.data.find((item) => item.slug === slug);
      if (bySlug) return bySlug;
    }
  } catch {
    // Public project pages should still render a useful fallback.
  }

  return null;
}
