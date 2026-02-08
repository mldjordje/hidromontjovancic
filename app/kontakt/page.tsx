import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import PageHero from "@/components/page-hero";
import FloatingCta from "@/components/floating-cta";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte Hidromont Jovancic za ponudu i informacije o instalacionim i zemljanim radovima.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="Kontaktirajte nas"
        kicker="Kontakt"
        description="Posaljite upit i odgovoricemo vam u najkracem roku."
        background="/img/volvonov2.webp"
        priority
        actions={[
          { label: "Pozovi", href: "tel:+381637012339" },
          { label: "Posalji upit", href: "#forma" },
        ]}
      />

      <section className="content-section">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-dark">Kontakt podaci</h2>
              <ul className="mt-6 space-y-3 text-sm text-gray-800">
                <li>
                  <span className="text-gray-500">Adresa: </span>
                  {company.address}
                </li>
                <li>
                  <span className="text-gray-500">Telefon: </span>
                  <a className="text-primary" href="tel:+381637012339">
                    {company.phone}
                  </a>
                </li>
                <li>
                  <span className="text-gray-500">Email: </span>
                  <a className="text-primary" href={`mailto:${company.email}`}>
                    {company.email}
                  </a>
                </li>
                <li>
                  <span className="text-gray-500">Radno vreme: </span>
                  {company.workingHours}
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-3xl border border-black/5 shadow-xl">
              <iframe
                title="Mapa Hidromont Jovancic"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11526.043922801283!2d21.8887915!3d43.3446012!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b79e59040e57%3A0xb7d73e47c8b7c9f4!2sHIDRO%20MONT%20JOVAN%C4%8CI%C4%86!5e0!3m2!1sen!2srs!4v1682497102779!5m2!1sen!2srs"
                className="h-[360px] w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div id="forma" className="space-y-4">
            <h2 className="text-2xl font-bold text-dark">Posaljite upit</h2>
            <p className="text-sm text-gray-700">
              Upisite osnovne informacije o projektu i trazenim radovima. Upit ce biti sacuvan u
              admin panelu.
            </p>
            <ContactForm
              subjectPlaceholder="Tema upita"
              selectLabel="Tip usluge (nije obavezno)"
              selectPlaceholder="Izaberite uslugu"
              selectOptions={[
                "Vodovodne instalacije",
                "Kanalizacione instalacije",
                "Ulicna mreza",
                "Montaza sanitarije",
                "Protivpozarna instalacija",
                "Zemljani radovi i iskopi",
                "Pumpe i centralni bojleri",
              ]}
            />
          </div>
        </div>
      </section>
      <FloatingCta
        phone={company.phone}
        callNumber="0637012339"
        whatsappNumber="0637012339"
        message="Pozdrav! Treba mi ponuda za radove."
      />
    </div>
  );
}
