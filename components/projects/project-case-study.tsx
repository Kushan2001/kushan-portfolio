import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { projectCategoryLabels, projectStatusLabels } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCaseStudyProps {
  project: Project;
}

interface CaseStudySectionProps {
  id: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}

function CaseStudySection({
  id,
  title,
  children,
  wide = false,
}: CaseStudySectionProps) {
  return (
    <section
      aria-labelledby={id}
      className={cn("h-full", wide && "lg:col-span-2")}
    >
      <Card className="h-full">
        <CardHeader>
          <h2 id={id} className="text-xl sm:text-2xl">
            {title}
          </h2>
        </CardHeader>
        <CardContent className="leading-7 text-muted-foreground">
          {children}
        </CardContent>
      </Card>
    </section>
  );
}

function DetailList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-primary">
      {items.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const overview = [project.summary, project.description]
    .map((paragraph) => paragraph.trim())
    .filter(
      (paragraph, index, paragraphs) =>
        paragraph.length > 0 && paragraphs.indexOf(paragraph) === index,
    );
  const architecture = project.architecture?.trim();
  const hasDetails = Boolean(
    overview.length > 0 ||
      project.problem.trim() ||
      project.solution.trim() ||
      project.features.length > 0 ||
      project.technologies.length > 0 ||
      architecture ||
      project.images.length > 0 ||
      project.challenges.length > 0 ||
      project.lessonsLearned.length > 0 ||
      project.futureImprovements.length > 0,
  );

  return (
    <>
      <Section surface="muted" compact aria-labelledby="project-title">
        <Container>
          <Link
            href="/projects"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft aria-hidden="true" />
            All Projects
          </Link>

          <header className="mt-8 max-w-4xl">
            <div className="mb-5 flex flex-wrap gap-2">
              <Badge variant="secondary">
                {projectCategoryLabels[project.category]}
              </Badge>
              <Badge variant="outline">{projectStatusLabels[project.status]}</Badge>
            </div>

            <h1 id="project-title">{project.title}</h1>

            {project.githubUrl || project.liveUrl ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} on GitHub (opens in a new tab)`}
                    className={buttonVariants({ size: "lg" })}
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
                    className={buttonVariants({ variant: "outline", size: "lg" })}
                  >
                    Live Demo
                    <ExternalLink aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </header>
        </Container>
      </Section>

      {hasDetails ? (
        <Section aria-label={`${project.title} case study`}>
          <Container className="grid gap-6 lg:grid-cols-2">
            {overview.length > 0 ? (
              <CaseStudySection id="overview" title="Overview" wide>
                <div className="space-y-4">
                  {overview.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </CaseStudySection>
            ) : null}

            {project.problem.trim() ? (
              <CaseStudySection id="problem" title="Problem">
                <p>{project.problem}</p>
              </CaseStudySection>
            ) : null}

            {project.solution.trim() ? (
              <CaseStudySection id="solution" title="Solution">
                <p>{project.solution}</p>
              </CaseStudySection>
            ) : null}

            {project.features.length > 0 ? (
              <CaseStudySection id="features" title="Features">
                <DetailList items={project.features} />
              </CaseStudySection>
            ) : null}

            {project.technologies.length > 0 ? (
              <CaseStudySection id="technologies" title="Technologies">
                <ul
                  aria-label={`${project.title} technologies`}
                  className="flex flex-wrap gap-2"
                >
                  {project.technologies.map((technology) => (
                    <li key={technology}>
                      <Badge variant="outline">{technology}</Badge>
                    </li>
                  ))}
                </ul>
              </CaseStudySection>
            ) : null}

            {architecture ? (
              <CaseStudySection id="architecture" title="Architecture" wide>
                <p>{architecture}</p>
              </CaseStudySection>
            ) : null}

            {project.images.length > 0 ? (
              <CaseStudySection id="screenshots" title="Screenshots" wide>
                <ul className="grid gap-5 sm:grid-cols-2">
                  {project.images.map((image) => (
                    <li key={image.src}>
                      <figure className="overflow-hidden rounded-xl border border-border bg-muted">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          sizes="(max-width: 639px) calc(100vw - 4rem), (max-width: 1023px) 50vw, 33vw"
                          className="h-auto w-full"
                        />
                        {image.caption ? (
                          <figcaption className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                            {image.caption}
                          </figcaption>
                        ) : null}
                      </figure>
                    </li>
                  ))}
                </ul>
              </CaseStudySection>
            ) : null}

            {project.challenges.length > 0 ? (
              <CaseStudySection id="challenges" title="Challenges">
                <DetailList items={project.challenges} />
              </CaseStudySection>
            ) : null}

            {project.lessonsLearned.length > 0 ? (
              <CaseStudySection id="lessons-learned" title="Lessons Learned">
                <DetailList items={project.lessonsLearned} />
              </CaseStudySection>
            ) : null}

            {project.futureImprovements.length > 0 ? (
              <CaseStudySection
                id="future-improvements"
                title="Future Improvements"
                wide
              >
                <DetailList items={project.futureImprovements} />
              </CaseStudySection>
            ) : null}
          </Container>
        </Section>
      ) : null}
    </>
  );
}
