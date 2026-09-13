"use client";

import { ArrowDownRight, ExternalLink, MapPin, Mail } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSocialLink {
  ariaLabel: string;
  label: string;
  url: string;
}

interface HeroContentProps {
  cvAvailable: boolean;
  cvPath: string;
  introduction: string;
  location?: string;
  name: string;
  roles: readonly string[];
  socialLinks: readonly HeroSocialLink[];
}

const sequenceVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.1,
    },
  },
};

const locationVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const nameVariants: Variants = {
  hidden: { filter: "blur(6px)", opacity: 0, y: 24 },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

const roleGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const roleVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

const actionGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function splitName(name: string) {
  const separatorIndex = name.lastIndexOf(" ");

  if (separatorIndex < 0) {
    return { leading: "", accent: name };
  }

  return {
    leading: name.slice(0, separatorIndex),
    accent: name.slice(separatorIndex + 1),
  };
}

export function HeroContent({
  cvAvailable,
  cvPath,
  introduction,
  location,
  name,
  roles,
  socialLinks,
}: HeroContentProps) {
  const shouldReduceMotion = useReducedMotion();
  const nameParts = splitName(name);

  return (
    <motion.div
      animate="visible"
      className="relative isolate min-w-0 max-w-4xl"
      initial={shouldReduceMotion ? false : "hidden"}
      variants={sequenceVariants}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-1/4 top-24 -z-10 h-56 rounded-full bg-primary/5 blur-3xl"
      />

      {location ? (
        <motion.div className="mb-6 w-fit" variants={locationVariants}>
          <Badge
            className="gap-1.5 border-border-strong bg-card/75 transition-colors duration-200 hover:border-primary/35 hover:bg-accent/65"
            variant="outline"
          >
            <MapPin aria-hidden="true" />
            {location}
          </Badge>
        </motion.div>
      ) : null}

      <motion.h1
        className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl lg:text-7xl"
        id="hero-title"
        variants={nameVariants}
      >
        {nameParts.leading ? <span>{nameParts.leading} </span> : null}
        <span className="relative inline-block">
          {nameParts.accent}
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-primary/75"
            variants={{
              hidden: { opacity: 0, scaleX: 0 },
              visible: {
                opacity: 1,
                scaleX: 1,
                transition: {
                  delay: 0.16,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          />
        </span>
      </motion.h1>

      <motion.ul
        aria-label="Professional roles"
        className="mt-7 flex flex-col gap-1.5 text-base font-semibold text-primary sm:flex-row sm:flex-wrap sm:gap-y-2 sm:text-lg"
        variants={roleGroupVariants}
      >
        {roles.map((role, index) => (
          <motion.li
            className="flex min-w-0 items-center"
            key={role}
            variants={roleVariants}
          >
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="mx-3 hidden text-border-strong sm:inline"
              >
                •
              </span>
            ) : null}
            <span>{role}</span>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p
        className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-8"
        variants={itemVariants}
      >
        {introduction}
      </motion.p>

      <motion.div
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        variants={actionGroupVariants}
      >
        <motion.div className="w-full sm:w-auto" variants={itemVariants}>
          <Link
            className={buttonVariants({
              className:
                "w-full transition-[color,background-color,border-color,box-shadow,transform] motion-safe:hover:-translate-y-0.5 sm:w-auto",
              size: "lg",
            })}
            href="/#projects"
          >
            View Projects
            <ArrowDownRight
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/button:translate-x-0.5 group-hover/button:translate-y-0.5"
            />
          </Link>
        </motion.div>

        <motion.div className="w-full sm:w-auto" variants={itemVariants}>
          <Link
            className={buttonVariants({
              className:
                "w-full transition-[color,background-color,border-color,box-shadow,transform] motion-safe:hover:-translate-y-0.5 hover:shadow-card sm:w-auto",
              size: "lg",
              variant: "outline",
            })}
            href="/#contact"
          >
            <Mail aria-hidden="true" />
            Contact Me
          </Link>
        </motion.div>

        {cvAvailable ? (
          <motion.div className="w-full sm:w-auto" variants={itemVariants}>
            <a
              className={buttonVariants({
                className:
                  "w-full transition-transform motion-safe:hover:-translate-y-0.5 sm:w-auto",
                size: "lg",
                variant: "ghost",
              })}
              download
              href={cvPath}
            >
              Download CV
            </a>
          </motion.div>
        ) : null}
      </motion.div>

      {socialLinks.length > 0 ? (
        <motion.nav
          aria-label="Social links"
          className="mt-6"
          variants={actionGroupVariants}
        >
          <ul className="flex flex-wrap gap-2">
            {socialLinks.map((link) => (
              <motion.li key={link.url} variants={itemVariants}>
                <a
                  aria-label={`${link.ariaLabel} (opens in a new tab)`}
                  className={cn(
                    buttonVariants({ size: "sm", variant: "ghost" }),
                    "transition-[color,background-color,transform] motion-safe:hover:-translate-y-0.5",
                  )}
                  href={link.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                  <ExternalLink
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-200 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                  />
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
      ) : null}
    </motion.div>
  );
}
