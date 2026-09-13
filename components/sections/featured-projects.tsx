import { ArrowUpRight, FolderKanban } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { ProjectCard } from "@/components/projects/project-card";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

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
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
          <header className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              <FolderKanban aria-hidden="true" className="size-4" strokeWidth={1.8} />
              Projects
            </p>
            <h2
              className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-4xl"
              id="projects-heading"
            >
              Featured Projects
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Selected projects demonstrating practical software development
              work.
            </p>
          </header>

          <Link
            aria-label="View all projects"
            href="/projects"
            className={cn(
              buttonVariants({ size: "default", variant: "outline" }),
              "group/view-all w-full shadow-card transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-primary/45 hover:shadow-card-hover motion-safe:hover:-translate-y-0.5 md:w-auto",
            )}
          >
            View All Projects
            <ArrowUpRight
              aria-hidden="true"
              className="transition-transform duration-200 motion-safe:group-hover/view-all:translate-x-0.5 motion-safe:group-hover/view-all:-translate-y-0.5 motion-safe:group-focus-visible/view-all:translate-x-0.5 motion-safe:group-focus-visible/view-all:-translate-y-0.5"
            />
          </Link>
        </div>

        <ul
          className={cn(
            "mt-10 grid gap-6 md:mt-12 lg:gap-8",
            featuredProjects.length > 1 && "md:grid-cols-2",
          )}
        >
          {featuredProjects.map((project) => (
            <li
              key={project.slug}
              className={cn(
                "min-w-0",
                featuredProjects.length === 1 && "mx-auto w-full max-w-3xl",
              )}
            >
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
