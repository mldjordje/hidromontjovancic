import type { Project } from "./api";

export type ProjectPhase = "realizovani" | "u_realizaciji" | "planirani";

export function getProjectPhase(project: Pick<Project, "tags">): ProjectPhase {
  const tags = project.tags;
  if (!tags || Array.isArray(tags)) return "realizovani";
  const phase = (tags as Record<string, unknown>).phase;
  if (phase === "u_realizaciji" || phase === "planirani" || phase === "realizovani") {
    return phase;
  }
  return "realizovani";
}

export function filterProjectsByPhase(projects: Project[], phase: ProjectPhase) {
  return projects.filter((project) => getProjectPhase(project) === phase);
}
