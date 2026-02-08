import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { aboutHighlights, company } from "@/content/site";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Hidromont Jovancic - tim za vodovodne i kanalizacione instalacije, sanitarije, PP instalacije i zemljane radove.",
  alternates: { canonical: "/o-nama" },
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="O kompaniji Hidromont Jovancic"
        kicker="O nama"
        description="Radimo precizno, odgovorno i u skladu sa projektom - od pripreme terena do zavrsne montaze."
        background="/img/volvonov2.webp"
        priority
        actions={[{ label: "Kontakt", href: "/kontakt#forma" }]}
      />

      <section className="content-section grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-dark">Ko smo mi</h2>
          <p className="text-gray-700">
            Hidromont Jovancic je firma iz Nisa specijalizovana za vodovodne i kanalizacione
            instalacije, ulicnu mrezu, montazu sanitarija, protivpozarne instalacije i zemljane
            radove.
          </p>
          <p className="text-gray-700">
            Nas cilj je da klijent dobije pouzdanu i funkcionalnu instalaciju, izvedenu kvalitetno i
            u dogovorenom roku.
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-xl">
          <h3 className="text-xl font-semibold text-dark">Zasto klijenti biraju nas</h3>
          <div className="mt-4 grid gap-3">
            {aboutHighlights.map((item) => (
              <div key={item} className="rounded-2xl border border-black/5 bg-gray-50 px-4 py-3 text-sm font-semibold text-dark">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="rounded-3xl border border-black/5 bg-dark p-8 text-white shadow-2xl">
          <h3 className="text-3xl font-bold">Kontakt podaci</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <p><span className="text-primary">Telefon:</span> {company.phone}</p>
            <p><span className="text-primary">Email:</span> {company.email}</p>
            <p><span className="text-primary">Adresa:</span> {company.address}</p>
            <p><span className="text-primary">Radno vreme:</span> {company.workingHours}</p>
          </div>
          <div className="mt-6">
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
