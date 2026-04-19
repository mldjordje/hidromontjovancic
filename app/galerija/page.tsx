import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import ServiceGallery from "@/components/gallery/service-gallery";
import { getServiceGalleries } from "@/lib/api";

export const metadata: Metadata = {
  title: "Galerija",
  description: "Galerija radova po uslugama firme HIDRO MONT JOVANČIĆ.",
  alternates: { canonical: "/galerija" },
};

export default async function GalleryPage() {
  const res = await getServiceGalleries();

  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="Galerija"
        kicker="HIDRO MONT JOVANČIĆ"
        description="Pregled slika radova, sortirano po uslugama."
        background="/oldsite/p6.jpg"
      />

      <section className="content-section">
        <ServiceGallery galleries={res.data ?? []} />
      </section>
    </div>
  );
}

