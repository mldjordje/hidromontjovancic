import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://hidromontjovancic.rs";
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

  return routes.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/kontakt" ? 0.9 : 0.8,
  }));
}
