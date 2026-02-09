import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { ScrollReveal, StaggerReveal } from "@/components/motion/reveal";
import TiltCard from "@/components/motion/tilt-card";

export const metadata: Metadata = {
  title: "Planirani projekti",
  description: "Pregled projekata koji su u pripremi i planu realizacije.",
  alternates: { canonical: "/projekti/planirani" },
};

const plannedProjects = [
  {
    title: "Novi stambeni kompleks",
    image: "/oldsite/uskoro2.jpg",
    excerpt: "Planirana je kompletna izvedba vodovodne i kanalizacione mreze po fazama.",
  },
  {
    title: "Poslovni objekat - priprema instalacija",
    image: "/oldsite/p10.jpg",
    excerpt: "U pripremi su projektna dokumentacija i dinamika za pocetak radova.",
  },
  {
    title: "Infrastrukturni terenski projekat",
    image: "/oldsite/p2.jpg",
    excerpt: "Naredna faza obuhvata iskope, trasiranje i pripremu prikljucaka.",
  },
];

export default function PlannedProjectsPage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="Planirani projekti"
        kicker="Projekti"
        description="Projekti koji su trenutno u fazi pripreme i planiranja."
        background="/oldsite/uskoro2.jpg"
        priority
        actions={[{ label: "Posalji upit", href: "/kontakt#forma" }]}
      />

      <section className="content-section space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-dark sm:text-4xl">Projekti u pripremi</h2>
          </ScrollReveal>
          <ScrollReveal from="right">
            <Link href="/projekti" className="text-sm font-semibold text-primary">
              {"<-"} Nazad na grupe projekata
            </Link>
          </ScrollReveal>
        </div>

        <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {plannedProjects.map((project) => (
            <ScrollReveal key={project.title} from="up" className="h-full">
              <TiltCard className="h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md">
                <article>
                  <div className="h-52 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2 p-5">
                    <h3 className="text-lg font-semibold text-dark">{project.title}</h3>
                    <p className="text-sm text-gray-600">{project.excerpt}</p>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </StaggerReveal>
      </section>
    </div>
  );
}
