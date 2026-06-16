import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/site";
import type { Project } from "@/lib/api";
import { absoluteUrl, brandName, plainText, siteUrl } from "@/lib/seo";

export function ProjectUnavailable() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Projekat</p>
      <h1 className="text-3xl font-bold text-dark">Detalji projekta trenutno nisu dostupni</h1>
      <p className="text-sm text-gray-700">
        Projekat postoji, ali podaci jos nisu dostupni. Pokusajte ponovo kasnije ili nas kontaktirajte.
      </p>
      <div className="flex gap-3">
        <Link href="/projekti" className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold">
          Nazad na projekte
        </Link>
        <Link href="/kontakt#forma" className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
          Kontakt
        </Link>
      </div>
    </div>
  );
}

export default function ProjectDetailContent({ project }: { project: Project }) {
  const canonical = project.slug ? `${siteUrl}/projekti/${project.slug}` : `${siteUrl}/projekat?id=${project.id}`;
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: plainText(project.excerpt || project.body),
    image: project.hero_image ? absoluteUrl(project.hero_image) : undefined,
    url: canonical,
    datePublished: project.published_at || project.created_at || undefined,
    dateModified: project.updated_at || undefined,
    provider: {
      "@type": "LocalBusiness",
      name: brandName,
      url: siteUrl,
      telephone: "+381637012339",
      areaServed: ["Nis", "Niska Banja", "Leskovac", "Prokuplje", "Aleksinac"],
    },
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <Link href="/projekti" className="text-sm text-gray-600 hover:text-primary">
        {"<-"} Nazad na projekte
      </Link>

      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{company.name}</p>
        <h1 className="text-3xl font-bold">{project.title}</h1>
        {project.excerpt && <p className="text-lg text-gray-700">{project.excerpt}</p>}
      </div>

      {project.hero_image && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
          <Image src={project.hero_image} alt={project.title} fill className="object-cover" />
        </div>
      )}

      {project.body && (
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: project.body }} />
        </article>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Galerija</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className="relative aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-gray-100"
              >
                <Image src={img.src} alt={img.alt || project.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
