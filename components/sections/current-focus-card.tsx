"use client";

import { Code2, MapPin, Workflow } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { Badge } from "@/components/ui/badge";
import type { MilestoneStatus } from "@/types/portfolio";

interface FocusMilestone {
  title: string;
  status: MilestoneStatus;
}

interface CurrentFocusCardProps {
  devOpsMilestones: readonly FocusMilestone[];
  location?: string;
  technologies: readonly string[];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  reduced: { opacity: 1, scale: 1, y: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.07,
      when: "beforeChildren",
    },
  },
  hover: {
    scale: 1.01,
    y: -4,
    transition: { damping: 24, stiffness: 260, type: "spring" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  reduced: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function formatList(items: readonly string[]) {
  if (items.length < 2) {
    return items[0] ?? "";
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function getDevOpsSummary(milestones: readonly FocusMilestone[]) {
  const completed = milestones
    .filter((milestone) => milestone.status === "completed")
    .map((milestone) => milestone.title);
  const learning = milestones
    .filter((milestone) => milestone.status === "in-progress")
    .map((milestone) => milestone.title);
  const planned = milestones
    .filter((milestone) => milestone.status === "planned")
    .map((milestone) => milestone.title);

  return [
    completed.length > 0
      ? `Completed foundations: ${formatList(completed)}.`
      : null,
    learning.length > 0
      ? `Currently learning: ${formatList(learning)}.`
      : null,
    planned.length > 0 ? `Planned next: ${formatList(planned)}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
}

export function CurrentFocusCard({
  devOpsMilestones,
  location,
  technologies,
}: CurrentFocusCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const devOpsSummary = getDevOpsSummary(devOpsMilestones);

  return (
    <motion.aside
      aria-label="Current focus"
      animate={shouldReduceMotion ? "reduced" : "visible"}
      className="group relative isolate flex min-w-0 w-full flex-col overflow-hidden rounded-3xl border border-border-strong bg-card p-6 shadow-card transition-[border-color,box-shadow] duration-300 hover:border-primary/35 hover:shadow-card-hover sm:p-8 xl:min-h-[26rem] xl:max-w-[29rem] xl:justify-self-end xl:p-9"
      initial={shouldReduceMotion ? "reduced" : "hidden"}
      variants={cardVariants}
      whileHover={shouldReduceMotion ? undefined : "hover"}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 -z-10 size-56 rounded-full bg-primary/10 blur-3xl transition-colors duration-300 group-hover:bg-primary/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      />

      <motion.div
        className="flex items-center gap-2.5"
        variants={itemVariants}
      >
        <motion.span
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.55, 1, 0.55], scale: [1, 1.12, 1] }
          }
          className="size-2 rounded-full bg-primary shadow-[0_0_0_4px_rgba(37,99,235,0.1)]"
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          Current focus
        </p>
      </motion.div>

      <div className="mt-7 divide-y divide-border/80">
        <motion.section
          aria-labelledby="software-development-focus"
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 pb-6"
          variants={itemVariants}
        >
          <span className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Code2 aria-hidden="true" className="size-5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <h2
              className="text-lg font-semibold tracking-tight text-card-foreground"
              id="software-development-focus"
            >
              Software Development
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Building practical software projects with modern development tools
              and technologies.
            </p>
          </div>
        </motion.section>

        {devOpsSummary ? (
          <motion.section
            aria-labelledby="devops-journey-focus"
            className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-6"
            variants={itemVariants}
          >
            <span className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Workflow
                aria-hidden="true"
                className="size-5"
                strokeWidth={1.8}
              />
            </span>
            <div className="min-w-0">
              <h2
                className="text-lg font-semibold tracking-tight text-card-foreground"
                id="devops-journey-focus"
              >
                DevOps Journey
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {devOpsSummary}
              </p>
            </div>
          </motion.section>
        ) : null}
      </div>

      {technologies.length > 0 ? (
        <motion.div
          className="border-t border-border/80 pt-5"
          variants={itemVariants}
        >
          <p className="sr-only" id="current-focus-technologies">
            Current focus technologies
          </p>
          <ul
            aria-labelledby="current-focus-technologies"
            className="flex flex-wrap gap-2"
          >
            {technologies.map((technology) => (
              <li key={technology}>
                <Badge
                  className="border-border-strong bg-secondary/70 px-2.5 py-1 font-medium text-secondary-foreground"
                  variant="outline"
                >
                  {technology}
                </Badge>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}

      {location ? (
        <motion.p
          className="mt-auto flex items-center gap-2 border-t border-border/80 pt-5 text-sm text-muted-foreground"
          variants={itemVariants}
        >
          <MapPin aria-hidden="true" className="size-4 text-primary" />
          Based in {location}
        </motion.p>
      ) : null}
    </motion.aside>
  );
}
