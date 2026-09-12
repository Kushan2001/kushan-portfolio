import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectFilters } from "@/components/projects/project-filters";
import { projects } from "@/data/projects";
import {
  filterProjectsByCategory,
  getAvailableProjectCategories,
  getSelectedProjectCategory,
} from "@/lib/projects";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description: "Software development and DevOps projects by Kushan M Jayaweera.",
  path: "/projects",
});

interface ProjectsPageProps {
  searchParams: Promise<{
    category?: string | string[];
  }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const query = await searchParams;
  const availableCategories = getAvailableProjectCategories(projects);
  const selectedCategory = getSelectedProjectCategory(
    query.category,
    availableCategories,
  );
  const visibleProjects = filterProjectsByCategory(projects, selectedCategory);

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
                <ul className="mt-8 grid gap-6 md:grid-cols-2">
                  {visibleProjects.map((project) => (
                    <li key={project.slug} className="min-w-0">
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
