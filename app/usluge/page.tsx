import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Usluge",
  description:
    "Pregled usluga firme Hidromont Jovancic: vodovod, kanalizacija, sanitarije, PP instalacije i zemljani radovi.",
  alternates: { canonical: "/usluge" },
};

export default function ServicesPage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="Usluge"
        kicker="Hidromont Jovancic"
        description="Kompletne instalacione i terenske usluge za stambene, poslovne i infrastrukturne projekte."
        background="/oldsite/p7.jpg"
        priority
        actions={[{ label: "Posalji upit", href: "/kontakt#forma" }]}
      />

      <section className="content-section space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-dark sm:text-4xl">Sta sve radimo</h2>
          <p className="max-w-3xl text-sm text-gray-700">
            Radove izvodimo po projektu i dogovoru sa investitorom, uz fokus na kvalitet i rokove.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md"
            >
              <div className="h-44 overflow-hidden">
                <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-lg font-semibold text-dark">{service.title}</h3>
                <p className="text-sm text-gray-700">{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="rounded-3xl border border-black/5 bg-dark px-6 py-10 text-white shadow-2xl sm:px-10">
          <h3 className="text-3xl font-bold">Treba vam procena radova?</h3>
          <p className="mt-2 max-w-2xl text-sm text-gray-200">
            Posaljite osnovne informacije o objektu i potrebnim radovima. Odgovaramo brzo.
          </p>
          <div className="mt-5">
            <Link
              href="/kontakt#forma"
              className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-dark"
            >
              Posalji upit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
