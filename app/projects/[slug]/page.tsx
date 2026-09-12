import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const description = project.summary.trim() || project.description.trim();

  return {
    title: project.title,
    ...(description ? { description } : {}),
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main id="main-content" className="flex-1">
      <ProjectCaseStudy project={project} />
    </main>
  );
}
