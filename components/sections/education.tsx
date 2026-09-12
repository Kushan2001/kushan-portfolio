import {
  BookOpen,
  Building2,
  CalendarDays,
  CircleCheck,
  GraduationCap,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { education } from "@/data/education";

const educationStatusDetails = {
  completed: {
    label: "Completed",
    icon: CircleCheck,
  },
  "in-progress": {
    label: "In progress",
    icon: BookOpen,
  },
} as const;

export function Education() {
  if (education.length === 0) {
    return null;
  }

  return (
    <Section id="education" aria-labelledby="education-heading">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHeading
          eyebrow="Education"
          title="Academic Background"
          headingId="education-heading"
          description="Formal study and specialization supporting my direction in technology."
        />

        <ul className="space-y-6">
          {education.map((item, index) => {
            const status = educationStatusDetails[item.status];
            const StatusIcon = status.icon;
            const coursework =
              item.coursework?.filter((course) => course.trim().length > 0) ?? [];
            const titleId = `education-${index}-title`;

            return (
              <li key={`${item.institution}-${item.qualification}`}>
                <article aria-labelledby={titleId}>
                  <Card>
                    <CardHeader>
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                          <GraduationCap aria-hidden="true" className="size-5" />
                        </span>
                        <Badge variant="secondary">
                          <StatusIcon aria-hidden="true" />
                          {status.label}
                        </Badge>
                      </div>

                      <h3 id={titleId}>{item.qualification}</h3>

                      {item.institution.trim() ? (
                        <p className="mt-3 flex items-start gap-2 text-sm font-medium text-muted-foreground sm:text-base">
                          <Building2
                            aria-hidden="true"
                            className="mt-1 size-4 shrink-0 text-primary"
                          />
                          {item.institution}
                        </p>
                      ) : null}

                      {item.startDate?.trim() || item.endDate?.trim() ? (
                        <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays
                            aria-hidden="true"
                            className="size-4 shrink-0 text-primary"
                          />
                          {item.startDate?.trim() ? (
                            <time dateTime={item.startDate}>{item.startDate}</time>
                          ) : null}
                          {item.startDate?.trim() && item.endDate?.trim() ? (
                            <span aria-hidden="true">–</span>
                          ) : null}
                          {item.endDate?.trim() ? (
                            <time dateTime={item.endDate}>{item.endDate}</time>
                          ) : null}
                        </p>
                      ) : null}
                    </CardHeader>

                    <CardContent>
                      {item.fieldOfStudy?.trim() ||
                      item.department?.trim() ||
                      item.faculty?.trim() ? (
                        <dl className="grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
                          {item.fieldOfStudy?.trim() ? (
                            <div>
                              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                                Specialization
                              </dt>
                              <dd className="mt-2 text-sm leading-6 text-card-foreground">
                                {item.fieldOfStudy}
                              </dd>
                            </div>
                          ) : null}

                          {item.department?.trim() ? (
                            <div>
                              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                                Department
                              </dt>
                              <dd className="mt-2 text-sm leading-6 text-card-foreground">
                                {item.department}
                              </dd>
                            </div>
                          ) : null}

                          {item.faculty?.trim() ? (
                            <div>
                              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                                Faculty
                              </dt>
                              <dd className="mt-2 text-sm leading-6 text-card-foreground">
                                {item.faculty}
                              </dd>
                            </div>
                          ) : null}
                        </dl>
                      ) : null}

                      {item.description?.trim() ? (
                        <p className="mt-6 leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      ) : null}

                      {coursework.length > 0 ? (
                        <div className="mt-6 border-t border-border pt-6">
                          <h4 className="text-sm font-semibold">Relevant coursework</h4>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {coursework.map((course) => (
                              <li key={course}>
                                <Badge variant="outline">{course}</Badge>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
