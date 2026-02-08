import Link from "next/link";
import PageHero from "@/components/page-hero";
import { ScrollReveal, StaggerReveal } from "@/components/motion/reveal";
import TiltCard from "@/components/motion/tilt-card";
import { getProjects } from "@/lib/api";
import type { Project } from "@/lib/api";

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    const response = await getProjects(60, 0);
    projects = response.data || [];
  } catch {
    projects = [];
  }

  return (
    <div className="space-y-16 sm:space-y-24">
      <PageHero
        title="Galerija projekata"
        kicker="Realizovani radovi"
        description="Radovi koje smo zavrsili na terenu. Novi projekti se dodaju iz admin panela."
        background="/oldsite/p10.jpg"
        priority
        actions={[{ label: "Posalji upit", href: "/kontakt#forma" }]}
      />

      <section className="content-section space-y-8">
        <ScrollReveal className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-dark sm:text-4xl">Poslednji projekti</h2>
          <p className="max-w-3xl text-sm text-gray-700">
            Ako trenutno nema objava, dodajte projekat kroz admin panel i pojavi ce se ovde.
          </p>
        </ScrollReveal>

        {projects.length === 0 ? (
          <ScrollReveal>
            <p className="text-sm text-gray-600">Trenutno nema objavljenih projekata.</p>
          </ScrollReveal>
        ) : (
          <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {projects.map((project) => (
              <ScrollReveal key={project.id} from="up" className="h-full">
                <Link href={`/projekti/${project.slug}`} className="group block h-full">
                  <TiltCard className="h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md transition">
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
