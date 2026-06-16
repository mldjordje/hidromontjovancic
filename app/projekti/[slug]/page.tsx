import type { Metadata } from "next";
import ProjectDetailContent, { ProjectUnavailable } from "@/components/project-detail-content";
import { getProjects } from "@/lib/api";
import { resolveProject } from "@/lib/project-resolver";
import { absoluteUrl, brandName, plainText, truncateMeta } from "@/lib/seo";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await resolveProject(resolvedParams.slug);

  if (!project) {
    return {
      title: "Projekat",
      description: `Detalji projekta firme ${brandName}.`,
      alternates: { canonical: `/projekti/${resolvedParams.slug}` },
    };
  }

  const description = truncateMeta(plainText(project.excerpt || project.body) || `Projekat firme ${brandName}.`);
  const canonical = `/projekti/${project.slug || resolvedParams.slug}`;

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

export default async function ProjectSlugPage({ params }: Props) {
  const resolvedParams = await params;
  const project = await resolveProject(resolvedParams.slug);

  if (!project) return <ProjectUnavailable />;

  return <ProjectDetailContent project={project} />;
}

export async function generateStaticParams() {
  try {
    const response = await getProjects(200, 0);
    return response.data.filter((project) => project.slug).map((project) => ({ slug: project.slug }));
  } catch {
    return [];
  }
}
