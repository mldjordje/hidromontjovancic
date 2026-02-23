import type { Project } from "./api";

export type ProjectPhase = "realizovani" | "u_realizaciji" | "planirani";

function isKnownPhase(value: unknown): value is ProjectPhase {
  return value === "u_realizaciji" || value === "planirani" || value === "realizovani";
}

export function getProjectPhase(project: Pick<Project, "tags">): ProjectPhase {
  const tags = project.tags;
  if (!tags) return "realizovani";

  if (Array.isArray(tags)) {
    for (const tag of tags) {
      if (isKnownPhase(tag)) return tag;
    }
    return "realizovani";
  }

  const phase = (tags as Record<string, unknown>).phase;
  if (isKnownPhase(phase)) {
    return phase;
  }
  return "realizovani";
}

export function filterProjectsByPhase(projects: Project[], phase: ProjectPhase) {
  return projects.filter((project) => getProjectPhase(project) === phase);
}
