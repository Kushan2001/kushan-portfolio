"use client";

import {
  BookOpen,
  Boxes,
  CalendarClock,
  CircleCheck,
  Cloud,
  Container as ContainerIcon,
  GitBranch,
  Network,
  ServerCog,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon } from "@/components/ui/github-icon";
import { cn } from "@/lib/utils";
import type { DevOpsMilestone, MilestoneStatus } from "@/types";

export interface DevOpsRoadmapStage {
  status: MilestoneStatus;
  milestones: readonly DevOpsMilestone[];
}

interface DevOpsRoadmapProps {
  stages: readonly DevOpsRoadmapStage[];
}

type TechnologyIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface StatusDetails {
  badgeClassName: string;
  cardClassName: string;
  iconClassName: string;
  label: string;
  markerClassName: string;
  stageTitle: string;
  statusIcon: LucideIcon;
  topAccentClassName: string;
}

const statusDetails = {
  completed: {
    label: "Completed",
    stageTitle: "Foundation built",
    statusIcon: CircleCheck,
    badgeClassName:
      "border-blue-500/25 bg-blue-500/10 text-blue-700 hover:border-blue-500/40 dark:text-blue-300",
    markerClassName:
      "border-surface-muted bg-blue-600 text-white shadow-[0_0_0_1px_rgba(37,99,235,0.28),0_0_20px_rgba(37,99,235,0.14)] dark:bg-blue-400 dark:text-slate-950",
    cardClassName:
      "border-blue-500/20 hover:border-blue-500/38 dark:border-blue-400/20 dark:hover:border-blue-400/38",
    iconClassName:
      "border-blue-500/20 bg-blue-500/8 text-blue-700 group-hover/milestone:border-blue-500/35 group-hover/milestone:bg-blue-500/14 dark:text-blue-300",
    topAccentClassName:
      "from-transparent via-blue-500/75 to-transparent dark:via-blue-400/65",
  },
  "in-progress": {
    label: "Learning",
    stageTitle: "Current focus",
    statusIcon: BookOpen,
    badgeClassName:
      "border-amber-500/30 bg-amber-500/10 text-amber-800 hover:border-amber-500/45 dark:text-amber-300",
    markerClassName:
      "border-surface-muted bg-amber-500 text-amber-950 shadow-[0_0_0_1px_rgba(245,158,11,0.28),0_0_20px_rgba(245,158,11,0.14)] dark:bg-amber-400",
    cardClassName:
      "border-amber-500/25 bg-[color-mix(in_srgb,var(--card)_96%,#f59e0b)] hover:border-amber-500/45 dark:border-amber-400/25 dark:bg-[color-mix(in_srgb,var(--card)_95%,#f59e0b)] dark:hover:border-amber-400/45",
    iconClassName:
      "border-amber-500/25 bg-amber-500/10 text-amber-800 group-hover/milestone:border-amber-500/45 group-hover/milestone:bg-amber-500/16 group-hover/milestone:scale-[1.04] dark:text-amber-300",
    topAccentClassName:
      "from-transparent via-amber-500/75 to-transparent dark:via-amber-400/65",
  },
  planned: {
    label: "Planned",
    stageTitle: "Next on the roadmap",
    statusIcon: CalendarClock,
    badgeClassName:
      "border-slate-400/35 bg-slate-500/8 text-slate-700 hover:border-slate-500/50 dark:border-slate-400/25 dark:text-slate-300 dark:hover:border-slate-300/40",
    markerClassName:
      "border-surface-muted bg-slate-500 text-white shadow-[0_0_0_1px_rgba(100,116,139,0.28)] dark:bg-slate-400 dark:text-slate-950",
    cardClassName:
      "border-slate-400/30 hover:border-slate-500/45 dark:border-slate-500/35 dark:hover:border-slate-400/50",
    iconClassName:
      "border-slate-400/25 bg-slate-500/8 text-slate-600 group-hover/milestone:border-slate-500/40 group-hover/milestone:bg-slate-500/14 dark:text-slate-300",
    topAccentClassName:
      "from-transparent via-slate-400/65 to-transparent dark:via-slate-400/55",
  },
} as const satisfies Record<MilestoneStatus, StatusDetails>;

const milestoneIcons: Record<string, TechnologyIcon> = {
  "linux-fundamentals": Terminal,
  git: GitBranch,
  github: GitHubIcon,
  "bash-basics": Terminal,
  docker: ContainerIcon,
  "ci-cd": Workflow,
  aws: Cloud,
  terraform: Boxes,
  kubernetes: Network,
};

const milestoneIconMotion: Record<string, string> = {
  github: "group-hover/milestone:rotate-[3deg]",
  docker: "group-hover/milestone:scale-[1.04]",
  "ci-cd": "group-hover/milestone:translate-x-px",
  aws: "group-hover/milestone:-translate-y-px",
};

const easing = [0.22, 1, 0.36, 1] as const;

const roadmapVariants: Variants = {
  hidden: {},
  reduced: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.1,
    },
  },
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  reduced: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: easing },
  },
};

const headerVariants: Variants = {
  hidden: {},
  reduced: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const stageListVariants: Variants = {
  hidden: {},
  reduced: {},
  visible: {
    transition: { delayChildren: 0.05, staggerChildren: 0.12 },
  },
};

const stageVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  reduced: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easing },
  },
};

const horizontalLineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  reduced: { opacity: 1, scaleX: 1 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.72, ease: easing },
  },
};

const verticalLineVariants: Variants = {
  hidden: { opacity: 0, scaleY: 0 },
  reduced: { opacity: 1, scaleY: 1 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.72, ease: easing },
  },
};

function StatusBadge({
  count,
  details,
  showCount = false,
}: {
  count: number;
  details: StatusDetails;
  showCount?: boolean;
}) {
  const StatusIcon = details.statusIcon;

  return (
    <span
      className={cn(
        "inline-flex min-h-7 w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide transition-[border-color,background-color,transform] duration-200 motion-safe:hover:-translate-y-px",
        details.badgeClassName,
      )}
    >
      <StatusIcon aria-hidden="true" className="size-3.5" strokeWidth={2} />
      {showCount ? `${count} ${details.label}` : details.label}
    </span>
  );
}

function MilestoneRow({
  milestone,
  status,
}: {
  milestone: DevOpsMilestone;
  status: MilestoneStatus;
}) {
  const details = statusDetails[status];
  const MilestoneIcon = milestoneIcons[milestone.id] ?? ServerCog;

  return (
    <li className="group/milestone rounded-xl border border-transparent bg-secondary/35 px-3.5 py-3.5 transition-[background-color,border-color,transform] duration-200 hover:border-border-strong hover:bg-secondary/65 motion-safe:hover:translate-x-0.5 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl border transition-[background-color,border-color,color,transform] duration-200",
            details.iconClassName,
            milestoneIconMotion[milestone.id],
          )}
        >
          <MilestoneIcon className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-semibold leading-6 text-card-foreground">
            {milestone.title}
          </p>

          {milestone.description.trim() ? (
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {milestone.description}
            </p>
          ) : null}

          {milestone.date.trim() ? (
            <time
              className="mt-1.5 block font-mono text-xs text-muted-foreground"
              dateTime={milestone.date}
            >
              {milestone.date}
            </time>
          ) : null}
        </div>

        {status === "completed" ? (
          <CircleCheck
            aria-hidden="true"
            className="size-4 shrink-0 text-blue-600 dark:text-blue-300"
            strokeWidth={2}
          />
        ) : null}
      </div>

      {milestone.technologies.length > 0 ? (
        <ul
          aria-label={`${milestone.title} technologies`}
          className="mt-3 flex flex-wrap gap-2 pl-[3.25rem]"
        >
          {milestone.technologies.map((technology) => (
            <li
              className="rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground"
              key={technology}
            >
              {technology}
            </li>
          ))}
        </ul>
      ) : null}

      {milestone.highlights?.length ? (
        <ul className="mt-3 list-disc space-y-1 pl-[4.25rem] text-sm leading-6 text-muted-foreground marker:text-primary">
          {milestone.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function DevOpsRoadmap({ stages }: DevOpsRoadmapProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion ? "reduced" : "hidden";

  return (
    <motion.div
      animate={shouldReduceMotion ? "reduced" : undefined}
      initial={initialState}
      variants={roadmapVariants}
      viewport={{ amount: 0.12, once: true }}
      whileInView={shouldReduceMotion ? undefined : "visible"}
    >
      <motion.header className="max-w-2xl" variants={headerVariants}>
        <motion.p
          className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary"
          variants={revealVariants}
        >
          <Workflow aria-hidden="true" className="size-4" strokeWidth={1.8} />
          DevOps
        </motion.p>
        <motion.h2 id="devops-heading" variants={revealVariants}>
          DevOps Journey
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          variants={revealVariants}
        >
          A transparent roadmap of completed foundations, current learning, and
          planned areas of study.
        </motion.p>
      </motion.header>

      <motion.ul
        aria-label="DevOps roadmap summary"
        className="mt-7 flex flex-wrap gap-2.5"
        variants={revealVariants}
      >
        {stages.map((stage) => (
          <li key={stage.status}>
            <StatusBadge
              count={stage.milestones.length}
              details={statusDetails[stage.status]}
              showCount
            />
          </li>
        ))}
      </motion.ul>

      <motion.div className="relative mt-10 md:mt-12" variants={revealVariants}>
        <motion.div
          aria-hidden="true"
          className="absolute bottom-5 left-[1.125rem] top-5 w-px origin-top bg-gradient-to-b from-blue-500/65 via-amber-500/45 to-slate-400/50 sm:left-5 xl:hidden"
          variants={verticalLineVariants}
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-[16.666%] right-[16.666%] top-5 hidden h-px origin-left bg-gradient-to-r from-blue-500/65 via-amber-500/45 to-slate-400/50 xl:block"
          variants={horizontalLineVariants}
        />

        <motion.ol
          aria-label="DevOps learning roadmap"
          className="grid gap-8 xl:grid-cols-3 xl:gap-6"
          variants={stageListVariants}
        >
          {stages.map((stage) => {
            const details = statusDetails[stage.status];
            const StatusIcon = details.statusIcon;

            return (
              <motion.li
                className="relative z-10 grid min-w-0 grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-3 sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-4 xl:block"
                key={stage.status}
                variants={stageVariants}
              >
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border-4 sm:size-10 xl:mx-auto",
                    details.markerClassName,
                  )}
                  variants={revealVariants}
                >
                  <StatusIcon className="size-4" strokeWidth={2.2} />
                </motion.span>

                <motion.div className="min-w-0 xl:mt-5" variants={revealVariants}>
                  <article
                    aria-labelledby={`devops-stage-${stage.status}`}
                    className={cn(
                      "group/stage relative isolate min-w-0 overflow-hidden rounded-3xl border bg-card p-4 shadow-card transition-[border-color,box-shadow,transform] duration-200 hover:shadow-card-hover motion-safe:hover:-translate-y-[3px] sm:p-6",
                      details.cardClassName,
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-8 top-0 h-px bg-gradient-to-r",
                        details.topAccentClassName,
                      )}
                    />

                    <header className="border-b border-border/80 pb-5">
                      <StatusBadge
                        count={stage.milestones.length}
                        details={details}
                      />
                      <h3
                        className="mt-3 text-lg font-semibold tracking-[-0.02em] text-card-foreground"
                        id={`devops-stage-${stage.status}`}
                      >
                        {details.stageTitle}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {stage.milestones.length}{" "}
                        {stage.milestones.length === 1
                          ? "milestone"
                          : "milestones"}
                      </p>
                    </header>

                    <ol className="mt-5 space-y-2">
                      {stage.milestones.map((milestone) => (
                        <MilestoneRow
                          key={milestone.id}
                          milestone={milestone}
                          status={stage.status}
                        />
                      ))}
                    </ol>
                  </article>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ol>
      </motion.div>
    </motion.div>
  );
}
