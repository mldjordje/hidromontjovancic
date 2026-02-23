import type { Project } from "./api";
import { filterProjectsByPhase } from "./project-phase";
import type { ProjectPhase } from "./project-phase";

function isProjectGroupCover(tags: Project["tags"]): boolean {
  if (!tags) return false;
  if (Array.isArray(tags)) {
    return tags.includes("group_cover");
  }
  return (tags as Record<string, unknown>).group_cover === true;
}

export function getGroupCoverImage(
  projects: Project[],
  phase: ProjectPhase,
  fallback: string
): string {
  const inPhase = filterProjectsByPhase(projects, phase);
  const explicit = inPhase.find((project) => isProjectGroupCover(project.tags) && project.hero_image);
  if (explicit?.hero_image) return explicit.hero_image;

  const firstWithHero = inPhase.find((project) => Boolean(project.hero_image));
  return firstWithHero?.hero_image || fallback;
}

