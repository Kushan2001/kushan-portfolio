"use client";

import {
  ExternalLink,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ComponentType, SVGProps } from "react";

import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/github-icon";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

interface ContactShowcaseProps {
  email?: string;
  socialLinks: readonly SocialLink[];
}

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

interface SocialDetails {
  actionLabel: string;
  description: string;
  icon: SocialIcon;
  iconMotionClassName: string;
}

const socialDetails: Record<string, SocialDetails> = {
  github: {
    actionLabel: "View GitHub",
    description: "Explore my projects, source code, and development work.",
    icon: GitHubIcon,
    iconMotionClassName: "motion-safe:group-hover/social:rotate-[4deg]",
  },
  linkedin: {
    actionLabel: "Connect on LinkedIn",
    description: "Connect with me professionally and follow my development journey.",
    icon: LinkedInIcon,
    iconMotionClassName: "motion-safe:group-hover/social:scale-[1.04]",
  },
};

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

const emailCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 24 },
  reduced: { opacity: 1, scale: 1, y: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.65, ease: easing },
  },
};

function SocialCard({ link, index }: { link: SocialLink; index: number }) {
  const details = socialDetails[link.label.toLowerCase()];

  if (!details) {
    return null;
  }

  const SocialIcon = details.icon;
  const headingId = `contact-social-${index}`;

  return (
    <motion.li className="min-w-0" variants={revealVariants}>
      <article
        aria-labelledby={headingId}
        className="group/social relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-card transition-[background-color,border-color,box-shadow,transform] duration-300 hover:border-primary/35 hover:bg-surface hover:shadow-card-hover motion-safe:hover:-translate-y-1 sm:p-6"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/55 to-transparent opacity-70 transition-opacity duration-200 group-hover/social:opacity-100"
        />
        <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/15 bg-accent/65 text-primary transition-[background-color,border-color,transform] duration-200 group-hover/social:border-primary/30 group-hover/social:bg-accent">
          <SocialIcon
            aria-hidden="true"
            className={cn(
              "size-6 transition-transform duration-200",
              details.iconMotionClassName,
            )}
          />
        </span>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
          {link.label}
        </p>
        <h3
          className="mt-2 text-xl font-semibold tracking-[-0.025em] text-card-foreground"
          id={headingId}
        >
          {link.label}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {details.description}
        </p>

        <a
          aria-label={`${link.ariaLabel} (opens in a new tab)`}
          className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-6 text-sm font-semibold text-card-foreground underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
          href={link.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {details.actionLabel}
          <ExternalLink
            aria-hidden="true"
            className="size-4 transition-transform duration-200 motion-safe:group-hover/social:-translate-y-px motion-safe:group-hover/social:translate-x-px"
          />
        </a>
      </article>
    </motion.li>
  );
}

export function ContactShowcase({
  email,
  socialLinks,
}: ContactShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const initialState = shouldReduceMotion ? "reduced" : "hidden";

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
          <MessageCircle
            aria-hidden="true"
            className="size-4"
            strokeWidth={1.8}
          />
          Contact
        </motion.p>
        <motion.h2 id="contact-heading" variants={revealVariants}>
          Let’s Connect
        </motion.h2>
        <motion.p
          className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
          variants={revealVariants}
        >
          Reach out by email or connect through GitHub and LinkedIn.
        </motion.p>
      </motion.header>

      <motion.div
        className={cn(
          "mt-10 grid min-w-0 gap-5 md:grid-cols-2 xl:mt-12",
          email && socialLinks.length > 0
            ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(19rem,0.85fr)]"
            : "max-w-4xl",
        )}
        variants={sectionVariants}
      >
        {email ? (
          <motion.div
            className={cn(
              "min-w-0",
              socialLinks.length > 0 && "md:col-span-2 lg:col-span-1 lg:row-span-2",
            )}
            variants={emailCardVariants}
          >
            <article
              aria-labelledby="contact-email-heading"
              className="group/email relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-primary/20 bg-card p-6 shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:border-primary/40 hover:shadow-card-hover motion-safe:hover:-translate-y-[3px] sm:p-8"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/75 to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 -z-10 size-52 rounded-full bg-primary/8 blur-3xl transition-colors duration-300 group-hover/email:bg-primary/12"
              />

              <span className="flex size-12 items-center justify-center rounded-2xl border border-primary/20 bg-accent/70 text-primary transition-[background-color,border-color,transform] duration-200 group-hover/email:border-primary/35 group-hover/email:bg-accent motion-safe:group-hover/email:-translate-y-px">
                <Mail aria-hidden="true" className="size-6" strokeWidth={1.8} />
              </span>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Email
              </p>
              <h3
                className="mt-2 text-xl font-semibold tracking-[-0.025em] text-card-foreground sm:text-2xl"
                id="contact-email-heading"
              >
                Start a conversation
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                The best way to reach me directly.
              </p>

              <a
                className="mt-6 inline-flex min-h-11 max-w-full items-center rounded-lg font-mono text-base font-semibold text-card-foreground underline-offset-4 transition-colors duration-200 [overflow-wrap:anywhere] hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 sm:text-lg"
                href={`mailto:${email}`}
              >
                {email}
              </a>

              <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-start lg:mt-auto lg:pt-10">
                <a
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "w-full transition-[background-color,box-shadow,transform] hover:shadow-card motion-safe:hover:-translate-y-0.5 sm:w-auto",
                  })}
                  href={`mailto:${email}`}
                >
                  <Send
                    aria-hidden="true"
                    className="transition-transform duration-200 motion-safe:group-hover/button:translate-x-px"
                  />
                  Contact Me
                </a>
                <CopyEmailButton email={email} />
              </div>
            </article>
          </motion.div>
        ) : null}

        {socialLinks.length > 0 ? (
          <motion.ul
            aria-label="Professional profiles"
            className={cn(
              "grid min-w-0 gap-5 md:col-span-2 md:grid-cols-2",
              email && "lg:col-span-1 lg:row-span-2 lg:grid-cols-1",
            )}
            variants={sectionVariants}
          >
            {socialLinks.map((link, index) => (
              <SocialCard index={index} key={link.url} link={link} />
            ))}
          </motion.ul>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
