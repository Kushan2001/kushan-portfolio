import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { projectCategoryLabels } from "@/lib/projects";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.images[0];
  const summary = project.summary.trim();

  return (
    <article aria-labelledby={`project-${project.slug}-title`} className="h-full">
      <Card interactive className="h-full gap-0 py-0">
        {image ? (
          <div className="aspect-[16/10] overflow-hidden border-b border-border bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover/card:scale-[1.02]"
            />
          </div>
        ) : null}

        <CardHeader className="pt-6">
          <Badge variant="secondary" className="mb-3">
            {projectCategoryLabels[project.category]}
          </Badge>
          <h3
            id={`project-${project.slug}-title`}
            className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl"
          >
            {project.title}
          </h3>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col pb-6">
          {summary ? (
            <p className="mt-4 leading-7 text-muted-foreground">{summary}</p>
          ) : null}

          {project.technologies.length > 0 ? (
            <ul
              aria-label={`${project.title} technologies`}
              className="mt-6 flex flex-wrap gap-2"
            >
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Badge variant="outline">{technology}</Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                GitHub
                <ExternalLink aria-hidden="true" />
              </a>
            ) : null}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo (opens in a new tab)`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Live Demo
                <ExternalLink aria-hidden="true" />
              </a>
            ) : null}

            <Link
              href={`/projects/${project.slug}`}
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Case Study
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
