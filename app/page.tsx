import type { Metadata } from "next";
import Link from "next/link";
import HeroSlider from "@/components/hero-slider";
import FloatingCta from "@/components/floating-cta";
import { ScrollReveal, StaggerReveal } from "@/components/motion/reveal";
import TiltCard from "@/components/motion/tilt-card";
import ProcessAndFaq from "@/components/home/process-and-faq";
import { aboutHighlights, company, heroSlides, services, stats } from "@/content/site";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/api";

export const metadata: Metadata = {
  title: "Vodovodne i kanalizacione instalacije u Nisu",
  description:
    "Hidromont Jovancic: vodovodne i kanalizacione instalacije, montaza sanitarije, protivpozarna mreza i zemljani radovi.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const featuredServices = services;
  const projectShortcuts = [
    { title: "Realizovani projekti", image: "/oldsite/gotov1.jpg", href: "/projekti/realizovani" },
    { title: "Projekti u realizaciji", image: "/oldsite/radise3.jpg", href: "/projekti/u-realizaciji" },
    { title: "Planirani projekti", image: "/oldsite/uskoro2.jpg", href: "/projekti/planirani" },
  ];
  let featuredProjects: Project[] = [];

  try {
    const response = await getProjects(6, 0);
    featuredProjects = response.data || [];
  } catch {
    featuredProjects = [];
  }

  return (
    <div className="space-y-16 sm:space-y-24">
      <HeroSlider slides={heroSlides} />

      <section className="content-section">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal className="space-y-5" from="left">
            <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              O nama
            </span>
            <h1 className="text-3xl font-bold leading-tight text-dark sm:text-4xl">
              Hidromont Jovancic - vodovodne i kanalizacione instalacije
            </h1>
            <p className="text-base text-gray-700">
              Izvodimo vodovodne i kanalizacione instalacije, montazu sanitarije, protivpozarne
              instalacije, iskope i zemljane radove. Radimo odgovorno, po projektu i u dogovorenim
              rokovima.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {aboutHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm font-semibold text-dark shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/o-nama"
                className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(15,110,207,0.35)] transition hover:translate-y-[-2px]"
              >
                Vise o nama
              </Link>
              <Link
                href="/kontakt#forma"
                className="inline-flex items-center rounded-full border border-black/10 px-5 py-3 text-sm font-semibold text-dark transition hover:border-primary hover:text-primary"
              >
                Posalji upit
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal from="right" className="relative overflow-hidden rounded-3xl border border-black/5 shadow-xl">
            <img src="/oldsite/p8.jpg" alt="Terenski radovi" className="h-full w-full object-cover" />
          </ScrollReveal>
        </div>
      </section>

      <section className="content-section">
        <StaggerReveal className="grid gap-6 md:grid-cols-3">
          {projectShortcuts.map((item) => (
            <ScrollReveal key={item.title} from="up">
              <Link href={item.href} className="group block overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md">
                <div className="h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-dark">{item.title}</h3>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </StaggerReveal>
      </section>

      <section className="content-section space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <ScrollReveal className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Nase usluge
            </span>
            <h2 className="text-3xl font-bold text-dark sm:text-4xl">Sta radimo</h2>
          </ScrollReveal>
          <ScrollReveal from="right">
            <Link href="/usluge" className="inline-flex items-center text-sm font-semibold text-primary">
              Sve usluge {"->"}
            </Link>
          </ScrollReveal>
        </div>
        <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <ScrollReveal key={service.title} from="up" className="h-full">
              <TiltCard className="group relative h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md">
                <div className="relative h-52 overflow-hidden">
                  <img src={service.image} alt={service.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-lg font-semibold text-dark">{service.title}</h3>
                  <p className="text-sm text-gray-700">{service.description}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </StaggerReveal>
      </section>

      <section className="bg-white">
        <div className="content-section grid gap-6 rounded-3xl border border-black/5 bg-gradient-to-r from-white via-white to-primary/10 px-6 py-10 shadow-xl sm:px-10">
          <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
            {stats.map((item) => (
              <ScrollReveal key={item.label} from="up">
                <div className="rounded-2xl border border-black/5 bg-white px-4 py-6 text-center shadow-sm">
                  <div className="text-3xl font-bold text-dark">{item.value}</div>
                  <div className="text-sm font-semibold text-gray-600">{item.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <ProcessAndFaq />

      <section className="content-section space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <ScrollReveal className="space-y-2">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Projekti
            </span>
            <h2 className="text-3xl font-bold text-dark sm:text-4xl">Nasi realizovani radovi</h2>
          </ScrollReveal>
          <ScrollReveal from="right">
            <Link href="/projekti/realizovani" className="inline-flex items-center text-sm font-semibold text-primary">
              Pogledaj sve {"->"}
            </Link>
          </ScrollReveal>
        </div>
        {featuredProjects.length === 0 ? (
          <ScrollReveal>
            <p className="text-sm text-gray-600">Trenutno nema objavljenih projekata.</p>
          </ScrollReveal>
        ) : (
          <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ScrollReveal key={project.id} from="up" className="h-full">
                <Link href={`/projekti/${project.slug}`} className="group block h-full">
                  <TiltCard className="h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md">
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={project.hero_image || "/oldsite/p9.jpg"}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-1 p-5">
                      <h3 className="text-lg font-semibold text-dark">{project.title}</h3>
                      {project.excerpt && <p className="text-sm text-gray-600">{project.excerpt}</p>}
                    </div>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            ))}
          </StaggerReveal>
        )}
      </section>

      <section className="content-section">
        <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-dark text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,110,207,0.2),_transparent_40%)]" />
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Kontakt
              </span>
              <h3 className="text-3xl font-bold leading-tight sm:text-4xl">
                Potrebna vam je procena ili ponuda?
              </h3>
              <p className="text-sm text-gray-200">
                Posaljite upit i javicemo vam se u najkracem roku.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="tel:+381637012339"
                  className="inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(15,110,207,0.4)] transition hover:translate-y-[-2px]"
                >
                  Pozovi {company.phone}
                </Link>
                <Link
                  href="/kontakt#forma"
                  className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-dark"
                >
                  Posalji upit
                </Link>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
              <ContactCard label="Adresa" value={company.address} />
              <ContactCard label="Telefon" value={company.phone} />
              <ContactCard label="Email" value={company.email} />
              <ContactCard label="Radno vreme" value={company.workingHours} />
            </div>
          </div>
        </div>
      </section>
      <FloatingCta phone={company.phone} callNumber="0637012339" whatsappNumber="0637012339" />
    </div>
  );
}

function ContactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
