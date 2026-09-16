import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/projects/project-case-study";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { getProjectBySlug } from "@/lib/projects";
import {
  createPageMetadata,
  getAbsoluteUrl,
  getProjectSeoDescription,
} from "@/lib/seo";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(projects, slug);

  if (!project) {
    notFound();
  }

  return createPageMetadata({
    title: project.title,
    description: getProjectSeoDescription(project),
    path: `/projects/${project.slug}`,
    type: "article",
    images: project.images,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(projects, slug);

  if (!project) {
    notFound();
  }

  const canonical = getAbsoluteUrl(`/projects/${project.slug}`);
  const description = getProjectSeoDescription(project);
  const imageUrls = project.images.flatMap((image) => {
    const url = getAbsoluteUrl(image.src);
    return url ? [url] : [];
  });
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description,
    keywords: project.technologies,
    author: {
      "@type": "Person",
      name: profile.name,
    },
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(imageUrls.length > 0 ? { image: imageUrls } : {}),
    ...(canonical ? { url: canonical } : {}),
  };

  return (
    <>
      <JsonLd data={projectJsonLd} />
      <main id="main-content" className="flex-1">
        <ProjectCaseStudy project={project} />
      </main>
    </>
  );
}
