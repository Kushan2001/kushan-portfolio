import { existsSync } from "node:fs";
import { join } from "node:path";

import {
  Code2,
  GitBranch,
  GraduationCap,
  MapPin,
  Terminal,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { devOpsMilestones } from "@/data/devops-milestones";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const profileImagePath = "/images/profile/kushan-profile.png";

interface AboutInfoCardProps {
  children: ReactNode;
  icon: LucideIcon;
  label: string;
}

function AboutInfoCard({ children, icon: Icon, label }: AboutInfoCardProps) {
  return (
    <article className="group/info-card h-full rounded-2xl border border-border/80 bg-card p-5 shadow-card transition-[transform,border-color,box-shadow] duration-250 hover:border-primary/30 hover:shadow-card-hover motion-safe:hover:-translate-y-0.5 sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-accent/60 text-primary transition-colors duration-200 group-hover/info-card:bg-accent">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
        </span>
        <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-card-foreground">
          {label}
        </h3>
      </div>
      <div className="mt-4 text-sm leading-6 text-muted-foreground">
        {children}
      </div>
    </article>
  );
}

function formatList(items: readonly string[]) {
  if (items.length < 2) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

export function About() {
  const leadStatement = profile.introduction.trim();
  const whatIBuild = profile.biography[0]?.trim() ?? "";
  const currentDirection = profile.biography[1]?.trim() ?? "";
  const currentDirectionLower = currentDirection.toLowerCase();
  const educationEntry = education[0];
  const hasProfileImage = existsSync(
    join(
      process.cwd(),
      "public",
      "images",
      "profile",
      "kushan-profile.png",
    ),
  );
  const developmentFocus = [
    currentDirectionLower.includes("software engineering")
      ? "Software engineering"
      : null,
    currentDirectionLower.includes("web development")
      ? "Web development"
      : null,
    currentDirectionLower.includes("databases") ? "Databases" : null,
  ].flatMap((item) => (item ? [item] : []));
  const completedDevOps = devOpsMilestones
    .filter((milestone) => milestone.status === "completed")
    .map((milestone) => milestone.title);
  const learningDevOps = devOpsMilestones
    .filter((milestone) => milestone.status === "in-progress")
    .map((milestone) => milestone.title);
  const careerDirections = [
    {
      role: profile.roles.find((role) => role === "ICT Undergraduate"),
      description:
        "Building an academic foundation in Information and Communication Technology.",
      icon: GraduationCap,
    },
    {
      role: profile.roles.find((role) => role === "Software Developer"),
      description:
        "Building practical software projects and developing knowledge in web development.",
      icon: Code2,
    },
    {
      role: profile.roles.find((role) => role === "DevOps Learner"),
      description:
        "Developing knowledge in Linux, Git/GitHub, Bash, and DevOps practices.",
      icon: Terminal,
    },
  ].flatMap(({ role, ...item }) => (role ? [{ ...item, role }] : []));
  const hasAboutContent = Boolean(
    leadStatement ||
      whatIBuild ||
      currentDirection ||
      careerDirections.length > 0,
  );

  if (!hasAboutContent) {
    return null;
  }

  return (
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <header className="max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <UserRound aria-hidden="true" className="size-4" strokeWidth={1.8} />
            About
          </p>
          <h2
            className="text-3xl font-semibold leading-tight tracking-[-0.035em] text-foreground sm:text-4xl"
            id="about-heading"
          >
            About Me
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            My background, current direction, and approach to professional
            growth.
          </p>
        </header>

        <div
          className={cn(
            "mt-10 grid min-w-0 gap-8 md:mt-12",
            hasProfileImage
              ? "lg:grid-cols-2 xl:grid-cols-[15rem_minmax(0,1fr)_minmax(20rem,0.9fr)] xl:gap-8"
              : "lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.75fr)] lg:items-start xl:gap-10",
          )}
        >
          {hasProfileImage ? (
            <figure className="self-start overflow-hidden rounded-2xl border border-primary/20 bg-card p-2 shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-card-hover motion-safe:hover:scale-[1.015]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                <Image
                  alt={`Portrait of ${profile.name}`}
                  className="object-cover transition-[filter,transform] duration-300 hover:brightness-105 motion-safe:hover:scale-[1.015]"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) 45vw, 15rem"
                  src={profileImagePath}
                />
              </div>
              <figcaption className="px-2 pb-2 pt-4">
                <p className="font-semibold text-card-foreground">
                  {profile.name}
                </p>
                {profile.location ? (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" className="size-4 text-primary" />
                    {profile.location}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          ) : null}

          <article className="rounded-3xl border border-border/80 bg-card p-6 shadow-card sm:p-8">
            {leadStatement ? (
              <section aria-labelledby="about-background-heading">
                <h3
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary"
                  id="about-background-heading"
                >
                  <GraduationCap
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.8}
                  />
                  My background
                </h3>
                <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-card-foreground sm:text-xl sm:leading-9">
                  {leadStatement}
                </p>
              </section>
            ) : null}

            {whatIBuild ? (
              <section
                aria-labelledby="about-build-heading"
                className="mt-7 border-t border-border/80 pt-7"
              >
                <h3
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary"
                  id="about-build-heading"
                >
                  <Code2
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.8}
                  />
                  What I build
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {whatIBuild}
                </p>
              </section>
            ) : null}

            {currentDirection ? (
              <section
                aria-labelledby="about-developing-heading"
                className="mt-7 border-t border-border/80 pt-7"
              >
                <h3
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary"
                  id="about-developing-heading"
                >
                  <TrendingUp
                    aria-hidden="true"
                    className="size-4"
                    strokeWidth={1.8}
                  />
                  Currently developing
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {currentDirection}
                </p>
              </section>
            ) : null}
          </article>

          {careerDirections.length > 0 ? (
            <aside
              aria-labelledby="career-direction-heading"
              className={cn(
                "relative isolate self-start overflow-hidden rounded-3xl border border-primary/15 bg-card p-6 shadow-card sm:p-7",
                hasProfileImage && "lg:col-span-2 xl:col-span-1",
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 -z-10 size-48 rounded-full bg-primary/8 blur-3xl"
              />
              <h3
                className="text-xs font-semibold uppercase tracking-[0.12em] text-primary"
                id="career-direction-heading"
              >
                Career direction
              </h3>
              <ul className="mt-5 space-y-3" aria-label="Career direction">
                {careerDirections.map(({ role, description, icon: Icon }) => (
                  <li
                    className="group/career-row grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 rounded-2xl border border-border/80 bg-secondary/35 p-4 transition-[transform,background-color,border-color] duration-200 hover:border-primary/30 hover:bg-accent/45 motion-safe:hover:translate-x-0.5"
                    key={role}
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl border border-primary/15 bg-card text-muted-foreground transition-[color,background-color] duration-200 group-hover/career-row:bg-accent group-hover/career-row:text-primary">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.8}
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold leading-6 text-card-foreground">
                        {role}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-5">
          {educationEntry ? (
            <li className="min-w-0">
              <AboutInfoCard icon={GraduationCap} label="Education">
                <p className="font-semibold text-card-foreground">
                  {educationEntry.qualification}
                </p>
                {educationEntry.fieldOfStudy ? (
                  <p className="mt-1.5">
                    Specialization: {educationEntry.fieldOfStudy}
                  </p>
                ) : null}
                {educationEntry.institution ? (
                  <p className="mt-1.5">{educationEntry.institution}</p>
                ) : null}
              </AboutInfoCard>
            </li>
          ) : null}

          {developmentFocus.length > 0 ? (
            <li className="min-w-0">
              <AboutInfoCard icon={Code2} label="Development focus">
                <p className="font-medium text-card-foreground">
                  Developing knowledge in
                </p>
                <p className="mt-1.5">{formatList(developmentFocus)}</p>
              </AboutInfoCard>
            </li>
          ) : null}

          {completedDevOps.length > 0 || learningDevOps.length > 0 ? (
            <li className="min-w-0 md:col-span-2 xl:col-span-1">
              <AboutInfoCard icon={GitBranch} label="DevOps focus">
                {completedDevOps.length > 0 ? (
                  <p>
                    <span className="font-medium text-card-foreground">
                      Completed foundations:
                    </span>{" "}
                    {formatList(completedDevOps)}.
                  </p>
                ) : null}
                {learningDevOps.length > 0 ? (
                  <p className="mt-1.5">
                    <span className="font-medium text-card-foreground">
                      Currently learning:
                    </span>{" "}
                    {formatList(learningDevOps)}.
                  </p>
                ) : null}
              </AboutInfoCard>
            </li>
          ) : null}
        </ul>
      </Container>
    </Section>
  );
}
