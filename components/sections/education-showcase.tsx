"use client";

import {
  BookOpen,
  Building2,
  CalendarDays,
  CircleCheck,
  Code2,
  GraduationCap,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { Education, EducationStatus } from "@/types";

interface EducationShowcaseProps {
  entries: readonly Education[];
  hasUniversityLogo: boolean;
  universityLogoPath: string;
}

interface EducationStatusDetails {
  badgeClassName: string;
  icon: LucideIcon;
  label: string;
}

interface AcademicInfoItemProps {
  children: ReactNode;
  icon: LucideIcon;
  label: string;
}

interface AcademicHighlightCardProps {
  children: ReactNode;
  icon: LucideIcon;
  iconMotionClassName?: string;
  label: string;
}

const educationStatus = {
  completed: {
    label: "Completed",
    icon: CircleCheck,
    badgeClassName:
      "border-blue-500/25 bg-blue-500/10 text-blue-700 hover:border-blue-500/40 dark:text-blue-300",
  },
  "in-progress": {
    label: "In Progress",
    icon: BookOpen,
    badgeClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-800 hover:border-amber-500/45 dark:text-amber-300",
  },
} as const satisfies Record<EducationStatus, EducationStatusDetails>;

const easing = [0.22, 1, 0.36, 1] as const;

const sectionVariants: Variants = {
  hidden: {},
  reduced: {},
  visible: {
    transition: { delayChildren: 0.04, staggerChildren: 0.1 },
  },
};

const headerVariants: Variants = {
  hidden: {},
  reduced: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  reduced: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: easing },
  },
};

const degreeCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 22 },
  reduced: { opacity: 1, scale: 1, y: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: easing },
  },
};

const detailsGridVariants: Variants = {
  hidden: {},
  reduced: {},
  visible: {
    transition: { delayChildren: 0.08, staggerChildren: 0.07 },
  },
};

function splitQualification(qualification: string) {
  const [degreeName, ...abbreviationParts] = qualification.split(
    /\s+[–—-]\s+/,
  );

  return {
    abbreviation: abbreviationParts.join(" – ").trim(),
    degreeName: degreeName.trim(),
  };
}

function StatusBadge({ status }: { status: EducationStatus }) {
  const details = educationStatus[status];
  const StatusIcon = details.icon;

  return (
    <span
      className={cn(
        "inline-flex min-h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide transition-[border-color,background-color,transform] duration-200 motion-safe:hover:-translate-y-px",
        details.badgeClassName,
      )}
    >
      <StatusIcon aria-hidden="true" className="size-3.5" strokeWidth={2} />
      {details.label}
    </span>
  );
}

function AcademicInfoItem({
  children,
  icon: Icon,
  label,
}: AcademicInfoItemProps) {
  return (
    <motion.div
      className="group/info grid min-w-0 grid-cols-[2.5rem_minmax(0,1fr)] gap-3 rounded-2xl border border-border/80 bg-secondary/30 p-4 transition-[background-color,border-color,transform] duration-200 hover:border-primary/25 hover:bg-secondary/55 motion-safe:hover:-translate-y-0.5"
      variants={revealVariants}
    >
      <span className="flex size-10 items-center justify-center rounded-xl border border-primary/15 bg-card text-primary transition-[background-color,border-color,transform] duration-200 group-hover/info:border-primary/30 group-hover/info:bg-accent motion-safe:group-hover/info:-translate-y-px">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
          {label}
        </dt>
        <dd className="mt-1.5 break-words text-sm font-medium leading-6 text-card-foreground">
          {children}
        </dd>
      </div>
    </motion.div>
  );
}

function AcademicHighlightCard({
  children,
  icon: Icon,
  iconMotionClassName,
  label,
}: AcademicHighlightCardProps) {
  return (
    <motion.li className="min-w-0" variants={revealVariants}>
      <article className="group/highlight h-full rounded-2xl border border-border/80 bg-card p-5 shadow-card transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-primary/30 hover:bg-surface hover:shadow-card-hover motion-safe:hover:-translate-y-0.5 sm:p-6">
        <span className="flex size-10 items-center justify-center rounded-xl border border-primary/15 bg-accent/65 text-primary transition-[background-color,border-color,transform] duration-200 group-hover/highlight:border-primary/30 group-hover/highlight:bg-accent">
          <Icon
            aria-hidden="true"
            className={cn("size-5 transition-transform", iconMotionClassName)}
            strokeWidth={1.8}
          />
        </span>
        <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.11em] text-primary">
          {label}
        </h3>
        <div className="mt-2 text-sm leading-6 text-muted-foreground">
          {children}
        </div>
      </article>
    </motion.li>
  );
}

function AcademicSummary({ entry }: { entry: Education }) {
  const { abbreviation, degreeName } = splitQualification(entry.qualification);
  const status = educationStatus[entry.status];

  return (
    <motion.aside
      aria-labelledby="academic-summary-heading"
      className="relative isolate self-start overflow-hidden rounded-3xl border border-border/80 bg-card p-6 shadow-card sm:p-7"
      variants={revealVariants}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-7 left-0 w-px bg-gradient-to-b from-transparent via-primary/70 to-transparent"
      />
      <h3
        className="text-xs font-semibold uppercase tracking-[0.12em] text-primary"
        id="academic-summary-heading"
      >
        Academic summary
      </h3>

      <dl className="mt-5 divide-y divide-border/80">
        <div className="pb-5">
          <dt className="text-sm font-semibold text-card-foreground">
            Academic foundation
          </dt>
          <dd className="mt-2 text-sm leading-6 text-muted-foreground">
            {entry.status === "in-progress" ? "Pursuing" : "Completed"}{" "}
            {abbreviation || degreeName}
            {entry.institution.trim() ? ` at ${entry.institution}` : ""}.
          </dd>
        </div>

        {entry.fieldOfStudy?.trim() ? (
          <div className="py-5">
            <dt className="text-sm font-semibold text-card-foreground">
              Specialization
            </dt>
            <dd className="mt-2 text-sm leading-6 text-muted-foreground">
              {entry.fieldOfStudy}
            </dd>
          </div>
        ) : null}

        <div className="pt-5">
          <dt className="text-sm font-semibold text-card-foreground">
            Current status
          </dt>
          <dd className="mt-2 text-sm leading-6 text-muted-foreground">
            {status.label}
          </dd>
        </div>
      </dl>
    </motion.aside>
  );
}

function DegreeCard({
  entry,
  hasUniversityLogo,
  index,
  universityLogoPath,
}: {
  entry: Education;
  hasUniversityLogo: boolean;
  index: number;
  universityLogoPath: string;
}) {
  const { abbreviation, degreeName } = splitQualification(entry.qualification);
  const coursework =
    entry.coursework?.filter((course) => course.trim().length > 0) ?? [];
  const highlights =
    entry.highlights?.filter((highlight) => highlight.trim().length > 0) ?? [];
  const titleId = `education-${index}-title`;

  return (
    <motion.li className="min-w-0" variants={degreeCardVariants}>
      <article
        aria-labelledby={titleId}
        className="group/degree relative isolate min-w-0 overflow-hidden rounded-3xl border border-primary/20 bg-card p-5 shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/38 hover:shadow-card-hover motion-safe:hover:-translate-y-[3px] sm:p-7 lg:p-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/75 to-transparent transition-opacity duration-300 group-hover/degree:opacity-100"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 -z-10 size-48 rounded-full bg-primary/7 blur-3xl transition-colors duration-300 group-hover/degree:bg-primary/10"
        />

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-accent/60 p-2 text-primary transition-transform duration-200 motion-safe:group-hover/degree:scale-[1.04]">
            {hasUniversityLogo && index === 0 ? (
              <Image
                alt={`${entry.institution} logo`}
                className="size-full object-contain"
                height={56}
                sizes="56px"
                src={universityLogoPath}
                width={56}
              />
            ) : (
              <Landmark aria-hidden="true" className="size-6" strokeWidth={1.8} />
            )}
          </div>
          <StatusBadge status={entry.status} />
        </div>

        <header className="mt-6 max-w-3xl">
          <h3
            className="break-words text-xl font-semibold leading-8 tracking-[-0.025em] text-card-foreground sm:text-2xl sm:leading-9"
            id={titleId}
          >
            {degreeName}
          </h3>
          {abbreviation ? (
            <p className="mt-2 text-base font-semibold text-primary sm:text-lg">
              {abbreviation}
            </p>
          ) : null}

          {entry.institution.trim() ? (
            <p className="mt-4 flex items-start gap-2 text-sm font-medium leading-6 text-muted-foreground sm:text-base">
              <Landmark
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-primary"
                strokeWidth={1.8}
              />
              {entry.institution}
            </p>
          ) : null}

          {entry.startDate?.trim() || entry.endDate?.trim() ? (
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
              />
              {entry.startDate?.trim() ? (
                <time dateTime={entry.startDate}>{entry.startDate}</time>
              ) : null}
              {entry.startDate?.trim() && entry.endDate?.trim() ? (
                <span aria-hidden="true">–</span>
              ) : null}
              {entry.endDate?.trim() ? (
                <time dateTime={entry.endDate}>{entry.endDate}</time>
              ) : null}
            </p>
          ) : null}
        </header>

        {entry.fieldOfStudy?.trim() ||
        entry.department?.trim() ||
        entry.faculty?.trim() ? (
          <motion.dl
            className="mt-7 grid min-w-0 gap-3 border-t border-border/80 pt-7 sm:grid-cols-2"
            variants={detailsGridVariants}
          >
            {entry.fieldOfStudy?.trim() ? (
              <AcademicInfoItem icon={Code2} label="Specialization">
                {entry.fieldOfStudy}
              </AcademicInfoItem>
            ) : null}
            {entry.department?.trim() ? (
              <AcademicInfoItem icon={Building2} label="Department">
                {entry.department}
              </AcademicInfoItem>
            ) : null}
            {entry.faculty?.trim() ? (
              <AcademicInfoItem icon={GraduationCap} label="Faculty">
                {entry.faculty}
              </AcademicInfoItem>
            ) : null}
          </motion.dl>
        ) : null}

        {entry.description?.trim() ? (
          <p className="mt-7 border-t border-border/80 pt-6 leading-7 text-muted-foreground">
            {entry.description}
          </p>
        ) : null}

        {coursework.length > 0 ? (
          <section
            aria-labelledby={`education-${index}-coursework`}
            className="mt-7 border-t border-border/80 pt-6"
          >
            <h4
              className="text-sm font-semibold text-card-foreground"
              id={`education-${index}-coursework`}
            >
              Relevant coursework
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {coursework.map((course) => (
                <li
                  className="rounded-full border border-border-strong bg-secondary/45 px-3 py-1 text-xs font-medium text-muted-foreground"
                  key={course}
                >
                  {course}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {highlights.length > 0 ? (
          <section
            aria-labelledby={`education-${index}-highlights`}
            className="mt-7 border-t border-border/80 pt-6"
          >
            <h4
              className="text-sm font-semibold text-card-foreground"
              id={`education-${index}-highlights`}
            >
              Academic highlights
            </h4>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted-foreground marker:text-primary">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </motion.li>
  );
}

export function EducationShowcase({
  entries,
  hasUniversityLogo,
  universityLogoPath,
}: EducationShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion ? "reduced" : "hidden";
  const primaryEntry = entries[0];

  if (!primaryEntry) {
    return null;
  }

  const primaryQualification = splitQualification(
    primaryEntry.qualification,
  );

  return (
    <motion.div
      animate={shouldReduceMotion ? "reduced" : undefined}
      initial={initialState}
      variants={sectionVariants}
      viewport={{ amount: 0.12, once: true }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
    >
      <motion.header className="max-w-2xl" variants={headerVariants}>
        <motion.p
          className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
          variants={revealVariants}
        >
          <GraduationCap
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.8}
          />
          Education
        </motion.p>
        <motion.h2 id="education-heading" variants={revealVariants}>
          Academic Background
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          variants={revealVariants}
        >
          Formal study and specialization supporting my direction in software
          development and continued technology learning.
        </motion.p>
      </motion.header>

      <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-[minmax(17rem,0.55fr)_minmax(0,1.45fr)] lg:items-start lg:gap-10 xl:mt-12 xl:gap-12">
        <AcademicSummary entry={primaryEntry} />

        <motion.ul className="min-w-0 space-y-6" variants={sectionVariants}>
          {entries.map((entry, index) => (
            <DegreeCard
              entry={entry}
              hasUniversityLogo={hasUniversityLogo}
              index={index}
              key={`${entry.institution}-${entry.qualification}`}
              universityLogoPath={universityLogoPath}
            />
          ))}
        </motion.ul>
      </div>

      <motion.ul
        aria-label="Academic highlights"
        className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-5"
        variants={sectionVariants}
      >
        <AcademicHighlightCard
          icon={GraduationCap}
          iconMotionClassName="motion-safe:group-hover/highlight:-translate-y-px"
          label="Degree"
        >
          {primaryQualification.abbreviation ? (
            <p className="font-semibold text-card-foreground">
              {primaryQualification.abbreviation}
            </p>
          ) : null}
          <p className={primaryQualification.abbreviation ? "mt-1.5" : ""}>
            {primaryQualification.degreeName}
          </p>
        </AcademicHighlightCard>

        {primaryEntry.fieldOfStudy?.trim() ? (
          <AcademicHighlightCard
            icon={Code2}
            iconMotionClassName="motion-safe:group-hover/highlight:translate-x-px"
            label="Specialization"
          >
            <p className="font-semibold text-card-foreground">
              {primaryEntry.fieldOfStudy}
            </p>
          </AcademicHighlightCard>
        ) : null}

        {primaryEntry.faculty?.trim() || primaryEntry.department?.trim() ? (
          <AcademicHighlightCard icon={Building2} label="Academic unit">
            {primaryEntry.faculty?.trim() ? (
              <p className="font-semibold text-card-foreground">
                {primaryEntry.faculty}
              </p>
            ) : null}
            {primaryEntry.department?.trim() ? (
              <p className={primaryEntry.faculty?.trim() ? "mt-1.5" : ""}>
                {primaryEntry.department}
              </p>
            ) : null}
          </AcademicHighlightCard>
        ) : null}
      </motion.ul>
    </motion.div>
  );
}
