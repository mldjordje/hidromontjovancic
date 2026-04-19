import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { services } from "@/content/site";
import { getServiceGalleries } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Usluga" };

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical: `/usluge/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const res = await getServiceGalleries(service.slug);
  const images = res.data?.[0]?.images ?? [];

  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title={service.title}
        kicker="Usluge"
        description={service.description}
        background={service.image}
        priority
        actions={[
          { label: "Posalji upit", href: "/kontakt#forma" },
          { label: "Sve usluge", href: "/usluge" },
        ]}
      />

      <section className="content-section space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-dark">Galerija</h2>
            <p className="text-sm text-gray-600">Slike radova za ovu uslugu.</p>
          </div>
          <Link href="/galerija" className="text-sm font-semibold text-primary">
            Pogledaj sve galerije →
          </Link>
        </div>

        {images.length ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((img) => (
              <a
                key={img.id}
                href={img.src}
                target="_blank"
                rel="noreferrer"
                className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
              >
                <img
                  src={img.src}
                  alt={img.alt || service.title}
                  className="h-56 w-full object-cover transition group-hover:scale-[1.02]"
                />
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-black/5 bg-white p-6 text-sm text-gray-700 shadow-sm">
            Trenutno nema slika za ovu uslugu.
          </div>
        )}
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

