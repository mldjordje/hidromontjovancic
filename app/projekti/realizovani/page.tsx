import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { ScrollReveal, StaggerReveal } from "@/components/motion/reveal";
import TiltCard from "@/components/motion/tilt-card";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/api";
import { filterProjectsByPhase } from "@/lib/project-phase";

export const metadata: Metadata = {
  title: "Realizovani projekti",
  description: "Pregled zavrsenih projekata firme Hidromont Jovancic.",
  alternates: { canonical: "/projekti/realizovani" },
};

export default async function RealizedProjectsPage() {
  let projects: Project[] = [];
  try {
    const response = await getProjects(60, 0);
    projects = response.data || [];
  } catch {
    projects = [];
  }
  const realized = filterProjectsByPhase(projects, "realizovani");

  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="Realizovani projekti"
        kicker="Projekti"
        description="Zavrseni projekti i radovi koje smo uspesno isporucili."
        background="/oldsite/gotov1.jpg"
        priority
        actions={[{ label: "Posalji upit", href: "/kontakt#forma" }]}
      />

      <section className="content-section space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-dark sm:text-4xl">Zavrseni radovi</h2>
          </ScrollReveal>
          <ScrollReveal from="right">
            <Link href="/projekti" className="text-sm font-semibold text-primary">
              {"<-"} Nazad na grupe projekata
            </Link>
          </ScrollReveal>
        </div>

        {realized.length === 0 ? (
          <ScrollReveal>
            <p className="text-sm text-gray-600">Trenutno nema realizovanih projekata.</p>
          </ScrollReveal>
        ) : (
          <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {realized.map((project) => (
              <ScrollReveal key={project.id} from="up" className="h-full">
                <Link href={`/projekti/${project.slug}`} className="group block h-full">
                  <TiltCard className="h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md">
                    <article>
                      <div className="h-52 overflow-hidden">
                        <img
                          src={project.hero_image || "/oldsite/p9.jpg"}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="space-y-1 p-5">
                        <h3 className="text-lg font-semibold text-dark">{project.title}</h3>
                        {project.excerpt && <p className="text-sm text-gray-600">{project.excerpt}</p>}
                        <p className="pt-1 text-sm font-semibold text-primary">Pogledaj projekat {"->"}</p>
                      </div>
                    </article>
                  </TiltCard>
                </Link>
              </ScrollReveal>
            ))}
          </StaggerReveal>
        )}
      </section>
    </div>
  );
}
