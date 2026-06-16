import type { MetadataRoute } from "next";
import { services } from "@/content/site";
import { getProjects } from "@/lib/api";
import { siteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const routes = [
    "/",
    "/o-nama",
    "/usluge",
    "/projekti",
    "/projekti/realizovani",
    "/projekti/u-realizaciji",
    "/projekti/planirani",
    "/kontakt",
  ];

  const staticRoutes = routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "/" ? 1 : path === "/kontakt" ? 0.9 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/usluge/${service.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  let projectRoutes: MetadataRoute.Sitemap = [];
  try {
    const response = await getProjects(200, 0);
    projectRoutes = response.data
      .filter((project) => project.slug)
      .map((project) => ({
        url: `${siteUrl}/projekti/${project.slug}`,
        lastModified: project.updated_at || project.published_at || project.created_at || lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      }));
  } catch {
    projectRoutes = [];
  }

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
