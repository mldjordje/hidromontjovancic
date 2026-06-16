import type { Metadata } from "next";
import ProjectDetailContent, { ProjectUnavailable } from "@/components/project-detail-content";
import { resolveProject } from "@/lib/project-resolver";
import { absoluteUrl, brandName, plainText, truncateMeta } from "@/lib/seo";

type Props = {
  searchParams?:
    | {
        slug?: string;
        id?: string;
      }
    | Promise<{
        slug?: string;
        id?: string;
      }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug = (resolvedSearchParams?.slug || "").trim() || undefined;
  const id = Number(resolvedSearchParams?.id);
  const validId = Number.isInteger(id) && id > 0 ? id : undefined;
  const project = await resolveProject(slug, validId);

  if (!project) {
    return {
      title: "Projekat",
      description: `Detalji projekta firme ${brandName}.`,
      alternates: { canonical: "/projekat" },
    };
  }

  const description = truncateMeta(plainText(project.excerpt || project.body) || `Projekat firme ${brandName}.`);
  const canonical = project.slug ? `/projekti/${project.slug}` : `/projekat?id=${project.id}`;

  return {
    title: project.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: project.title,
      description,
      url: canonical,
      images: project.hero_image ? [{ url: absoluteUrl(project.hero_image), alt: project.title }] : undefined,
    },
  };
}

export default async function ProjectDetailsPage({ searchParams }: Props) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const slug = (resolvedSearchParams?.slug || "").trim() || undefined;
  const id = Number(resolvedSearchParams?.id);
  const validId = Number.isInteger(id) && id > 0 ? id : undefined;
  const project = await resolveProject(slug, validId);

  if (!project) return <ProjectUnavailable />;

  return <ProjectDetailContent project={project} />;
}
