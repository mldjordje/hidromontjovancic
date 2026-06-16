import type { Project } from "./api";

type ProjectLinkTarget = Pick<Project, "id" | "slug">;

export function getProjectHref(project: ProjectLinkTarget): string {
  if (typeof project.slug === "string" && project.slug.trim().length > 0) {
    return `/projekti/${encodeURIComponent(project.slug.trim())}`;
  }

  const params = new URLSearchParams();
  params.set("id", String(project.id));

  return `/projekat?${params.toString()}`;
}
