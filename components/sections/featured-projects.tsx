import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";
import Link from "next/link";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <Section
      id="projects"
      surface="muted"
      aria-labelledby="projects-heading"
    >
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Projects"
            title="Featured Projects"
            headingId="projects-heading"
            description="Selected projects demonstrating practical software development work."
          />
          <Link
            href="/projects"
            className={buttonVariants({ variant: "outline" })}
          >
            View All Projects
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="min-w-0">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
