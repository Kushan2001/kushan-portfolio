import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { projects } from "@/data/projects";
import { filterableProjectCategories } from "@/lib/projects";
import type { ProjectCategory } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software development and DevOps projects by Kushan M Jayaweera.",
};

interface ProjectsPageProps {
  searchParams: Promise<{
    category?: string | string[];
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const query = await searchParams;
  const requestedCategory = Array.isArray(query.category)
    ? query.category[0]
    : query.category;
  const availableCategories = filterableProjectCategories.filter((category) =>
    projects.some((project) => project.category === category),
  );
  const selectedCategory: "all" | ProjectCategory =
    requestedCategory &&
    availableCategories.some((category) => category === requestedCategory)
      ? (requestedCategory as ProjectCategory)
      : "all";
  const visibleProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main id="main-content" className="flex-1">
      <Section aria-labelledby="all-projects-heading">
        <Container>
          <header className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              Portfolio
            </p>
            <h1 id="all-projects-heading">All Projects</h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Browse practical software development and DevOps work by category.
            </p>
          </header>

          {projects.length > 0 ? (
            <>
              <ProjectFilters
                categories={availableCategories}
                selectedCategory={selectedCategory}
              />

              {visibleProjects.length > 0 ? (
                <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProjects.map((project) => (
                    <li key={project.slug}>
                      <ProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p
                  role="status"
                  className="mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground"
                >
                  No projects are available in this category.
                </p>
              )}
            </>
          ) : (
            <p
              role="status"
              className="mt-10 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground"
            >
              No projects are available yet.
            </p>
          )}
        </Container>
      </Section>
    </main>
  );
}
