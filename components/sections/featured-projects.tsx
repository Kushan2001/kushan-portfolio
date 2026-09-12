import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { projects } from "@/data/projects";

export function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  if (featuredProjects.length === 0) {
    return null;
  }

  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <Container>
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          headingId="projects-heading"
          description="Selected projects demonstrating practical software development work."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
