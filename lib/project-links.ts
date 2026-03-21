import type { Project } from "./api";

type ProjectLinkTarget = Pick<Project, "id" | "slug">;

export function getProjectHref(project: ProjectLinkTarget): string {
  const params = new URLSearchParams();
  params.set("id", String(project.id));

  if (typeof project.slug === "string" && project.slug.trim().length > 0) {
    params.set("slug", project.slug.trim());
  }

  return `/projekat?${params.toString()}`;
}
