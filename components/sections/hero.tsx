import Link from "next/link";
import {
  ArrowDownRight,
  ExternalLink,
  MapPin,
  Mail,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cvConfig } from "@/data/cv";
import { profile } from "@/data/profile";

const featuredSocialLabels = new Set(["github", "linkedin"]);

export function Hero() {
  const socialLinks = profile.socialLinks.filter((link) =>
    featuredSocialLabels.has(link.label.toLowerCase()),
  );

  return (
    <Section
      id="home"
      aria-labelledby="hero-title"
      reveal={false}
      className="relative border-b border-border xl:flex xl:min-h-[calc(100svh-4rem)] xl:items-center"
    >
      <Container className="grid min-w-0 items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)] xl:gap-16 2xl:gap-20">
        <div className="hero-enter min-w-0 max-w-4xl">
          {profile.location ? (
            <Badge variant="outline" className="mb-5 gap-1.5">
              <MapPin aria-hidden="true" />
              {profile.location}
            </Badge>
          ) : null}

          <h1
            id="hero-title"
            className="max-w-3xl break-words text-4xl leading-[1.04] tracking-[-0.045em] text-foreground sm:text-5xl xl:text-6xl"
          >
            {profile.name}
          </h1>

          <ul
            aria-label="Professional roles"
            className="mt-6 flex flex-col gap-1 text-base font-semibold text-primary sm:flex-row sm:flex-wrap sm:gap-x-0 sm:text-lg"
          >
            {profile.roles.map((role, index) => (
              <li
                key={role}
                className="flex min-w-0 items-center"
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
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {profile.introduction}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/#projects"
              className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
            >
              View Projects
              <ArrowDownRight aria-hidden="true" />
            </Link>

            <Link
              href="/#contact"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "w-full sm:w-auto",
              })}
            >
              <Mail aria-hidden="true" />
              Contact Me
            </Link>

            {cvConfig.cvAvailable ? (
              <a
                href={cvConfig.cvPath}
                download
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                Download CV
              </a>
            ) : null}
          </div>

          {socialLinks.length > 0 ? (
            <nav aria-label="Social links" className="mt-6">
              <ul className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${link.ariaLabel} (opens in a new tab)`}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      {link.label}
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <aside
          aria-label="Current focus"
          className="hero-enter hero-enter-delay min-w-0 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
            Current focus
          </p>

          <p className="mt-4 text-lg font-semibold leading-7 text-card-foreground">
            {profile.roles.slice(1).join(" and ")}
          </p>

          {profile.biography[0]?.trim() ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {profile.biography[0]}
            </p>
          ) : null}

          {profile.location ? (
            <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              Based in {profile.location}
            </p>
          ) : null}
        </aside>
      </Container>
    </Section>
  );
}
