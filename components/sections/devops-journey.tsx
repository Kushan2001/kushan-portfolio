import { BookOpen, CalendarClock, CircleCheck } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { devOpsMilestones } from "@/data/devops-milestones";
import type { MilestoneStatus } from "@/types";

const statusOrder = [
  "completed",
  "in-progress",
  "planned",
] as const satisfies readonly MilestoneStatus[];

const statusDetails = {
  completed: {
    label: "Completed",
    icon: CircleCheck,
    iconClassName: "bg-primary text-primary-foreground",
    badgeVariant: "default",
  },
  "in-progress": {
    label: "Learning",
    icon: BookOpen,
    iconClassName: "bg-accent text-accent-foreground",
    badgeVariant: "secondary",
  },
  planned: {
    label: "Planned",
    icon: CalendarClock,
    iconClassName: "bg-muted text-muted-foreground",
    badgeVariant: "outline",
  },
} as const;

export function DevOpsJourney() {
  const stages = statusOrder
    .map((status) => ({
      status,
      milestones: devOpsMilestones.filter(
        (milestone) => milestone.status === status,
      ),
    }))
    .filter((stage) => stage.milestones.length > 0);

  if (stages.length === 0) {
    return null;
  }

  return (
    <Section id="devops" surface="muted" aria-labelledby="devops-heading">
      <Container>
        <SectionHeading
          eyebrow="DevOps"
          title="DevOps Journey"
          headingId="devops-heading"
          description="A transparent roadmap of completed foundations, current learning, and planned areas of study."
        />

        <div className="relative mt-12">
          <div
            aria-hidden="true"
            className="timeline-line absolute bottom-5 left-5 top-5 w-px bg-border lg:bottom-auto lg:left-5 lg:right-5 lg:top-5 lg:h-px lg:w-auto"
          />

          <ol className="grid gap-8 lg:grid-cols-3">
            {stages.map(({ status, milestones }) => {
              const details = statusDetails[status];
              const StatusIcon = details.icon;

              return (
                <li
                  key={status}
                  className="timeline-stage relative z-10 flex items-start gap-5 lg:block"
                >
                  <span
                    aria-hidden="true"
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border-4 border-surface-muted ${details.iconClassName}`}
                  >
                    <StatusIcon className="size-4" />
                  </span>

                  <Card className="min-w-0 flex-1 lg:mt-5">
                    <CardHeader>
                      <Badge variant={details.badgeVariant} className="mb-3">
                        <StatusIcon aria-hidden="true" />
                        {details.label}
                      </Badge>
                      <h3>{details.label}</h3>
                    </CardHeader>

                    <CardContent>
                      <ol className="divide-y divide-border">
                        {milestones.map((milestone) => (
                          <li
                            key={milestone.id}
                            className="py-5 first:pt-0 last:pb-0"
                          >
                            <p className="font-semibold text-card-foreground">
                              {milestone.title}
                            </p>

                            {milestone.description.trim() ? (
                              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                {milestone.description}
                              </p>
                            ) : null}

                            {milestone.date.trim() ? (
                              <time
                                dateTime={milestone.date}
                                className="mt-2 block font-mono text-xs text-muted-foreground"
                              >
                                {milestone.date}
                              </time>
                            ) : null}

                            {milestone.technologies.length > 0 ? (
                              <ul
                                aria-label={`${milestone.title} technologies`}
                                className="mt-3 flex flex-wrap gap-2"
                              >
                                {milestone.technologies.map((technology) => (
                                  <li key={technology}>
                                    <Badge variant="outline">{technology}</Badge>
                                  </li>
                                ))}
                              </ul>
                            ) : null}

                            {milestone.highlights?.length ? (
                              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary">
                                {milestone.highlights.map((highlight) => (
                                  <li key={highlight}>{highlight}</li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
