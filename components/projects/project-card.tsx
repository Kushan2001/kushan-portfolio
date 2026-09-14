import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GitHubIcon } from "@/components/ui/github-icon";
import { projectCategoryLabels } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  headingLevel?: 2 | 3;
}

export function ProjectCard({
  project,
  headingLevel = 3,
}: ProjectCardProps) {
  const image = project.images[0];
  const summary = project.summary.trim();
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <article
      aria-labelledby={`project-${project.slug}-title`}
      className="h-full min-w-0"
    >
      <Card
        interactive
        className={cn(
          "relative isolate min-h-[19rem] h-full gap-0 overflow-hidden rounded-3xl border-primary/15 bg-card py-0 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-card-hover motion-safe:hover:-translate-y-1",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 z-0 size-48 rounded-full bg-primary/5 blur-3xl transition-colors duration-300 group-hover/card:bg-primary/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
        />

        {image ? (
          <div className="relative z-10 aspect-video overflow-hidden border-b border-border/80 bg-muted">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 767px) calc(100vw - 2rem), (max-width: 1279px) 50vw, 40rem"
              className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover/card:scale-[1.02]"
            />
          </div>
        ) : null}

        <CardHeader className="relative z-10 px-6 pt-7 sm:px-7">
          <Badge
            variant="secondary"
            className="mb-4 gap-1.5 border border-primary/15 bg-accent/65 text-accent-foreground"
          >
            <Code2 aria-hidden="true" strokeWidth={1.8} />
            {projectCategoryLabels[project.category]}
          </Badge>
          <Heading
            id={`project-${project.slug}-title`}
            className="font-heading text-xl font-semibold leading-tight tracking-[-0.025em] text-card-foreground transition-colors duration-200 group-hover/card:text-primary sm:text-2xl"
          >
            {project.title}
          </Heading>
        </CardHeader>

        <CardContent className="relative z-10 flex min-w-0 flex-1 flex-col px-6 pb-6 sm:px-7 sm:pb-7">
          {summary ? (
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              {summary}
            </p>
          ) : null}

          {project.technologies.length > 0 ? (
            <ul
              aria-label={`${project.title} technologies`}
              className="mt-6 flex flex-wrap gap-2"
            >
              {project.technologies.map((technology) => (
                <li key={technology}>
                  <Badge
                    className="min-h-7 border-border-strong bg-secondary/55 text-secondary-foreground transition-[color,background-color,border-color,transform] duration-200 hover:border-primary/35 hover:bg-accent/70 hover:text-accent-foreground motion-safe:hover:-translate-y-px"
                    variant="outline"
                  >
                    {technology}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-auto flex flex-col gap-3 border-t border-border/80 pt-6 sm:flex-row sm:flex-wrap">
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                buttonVariants({ size: "default" }),
                "group/case-study w-full shadow-card transition-[color,background-color,box-shadow,transform] duration-200 hover:shadow-card-hover motion-safe:hover:-translate-y-0.5 sm:w-auto",
              )}
            >
              Case Study
              <ArrowRight
                aria-hidden="true"
                className="transition-transform duration-200 motion-safe:group-hover/case-study:translate-x-0.5 motion-safe:group-focus-visible/case-study:translate-x-0.5"
              />
            </Link>

            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub (opens in a new tab)`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "group/github-project w-full transition-[color,background-color,border-color,transform] duration-200 hover:border-primary/35 motion-safe:hover:-translate-y-0.5 sm:w-auto",
                )}
              >
                <GitHubIcon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 motion-safe:group-hover/github-project:-rotate-3 motion-safe:group-focus-visible/github-project:-rotate-3"
                />
                GitHub
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-200 motion-safe:group-hover/github-project:translate-x-0.5 motion-safe:group-hover/github-project:-translate-y-0.5 motion-safe:group-focus-visible/github-project:translate-x-0.5 motion-safe:group-focus-visible/github-project:-translate-y-0.5"
                />
              </a>
            ) : null}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo (opens in a new tab)`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "default" }),
                  "w-full transition-[color,background-color,border-color,transform] duration-200 motion-safe:hover:-translate-y-0.5 sm:w-auto",
                )}
              >
                Live Demo
                <ExternalLink aria-hidden="true" />
              </a>
            ) : null}

          </div>
        </CardContent>
      </Card>
    </article>
  );
}
