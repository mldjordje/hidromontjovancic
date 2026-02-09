import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { ScrollReveal, StaggerReveal } from "@/components/motion/reveal";
import TiltCard from "@/components/motion/tilt-card";

export const metadata: Metadata = {
  title: "Projekti u realizaciji",
  description: "Pregled projekata koji su trenutno u toku.",
  alternates: { canonical: "/projekti/u-realizaciji" },
};

const activeProjects = [
  {
    title: "Stambeni objekat - instalacije u toku",
    image: "/oldsite/radise3.jpg",
    excerpt: "Radovi na vodovodnoj i kanalizacionoj mrezi su u aktivnoj fazi izvodjenja.",
  },
  {
    title: "Terenski infrastrukturni radovi",
    image: "/oldsite/p4.jpg",
    excerpt: "U toku je priprema terena i izvodjenje trase za instalacionu mrezu.",
  },
  {
    title: "Unutrasnje instalacije poslovnog objekta",
    image: "/oldsite/p8.jpg",
    excerpt: "Montaza sanitarija i prikljucci napreduju po planu dinamike radova.",
  },
];

export default function InProgressProjectsPage() {
  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="Projekti u realizaciji"
        kicker="Projekti"
        description="Objekti i lokacije na kojima tim trenutno radi."
        background="/oldsite/radise3.jpg"
        priority
        actions={[{ label: "Posalji upit", href: "/kontakt#forma" }]}
      />

      <section className="content-section space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-dark sm:text-4xl">Aktuelni projekti</h2>
          </ScrollReveal>
          <ScrollReveal from="right">
            <Link href="/projekti" className="text-sm font-semibold text-primary">
              {"<-"} Nazad na grupe projekata
            </Link>
          </ScrollReveal>
        </div>

        <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {activeProjects.map((project) => (
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
