import Link from "next/link";
import {
  ArrowDownRight,
  Download,
  ExternalLink,
  MapPin,
  Mail,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
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
      className="relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden border-b border-border"
    >
      <Container className="grid items-center gap-12 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:gap-16">
        <div className="max-w-4xl">
          {profile.location ? (
            <Badge variant="outline" className="mb-6">
              {profile.location}
            </Badge>
          ) : null}

          <h1
            id="hero-title"
            className="text-[clamp(2.75rem,6vw,4.25rem)] leading-[1.03] tracking-[-0.045em] text-foreground"
          >
            {profile.name}
          </h1>

          <ul
            aria-label="Professional roles"
            className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-base font-semibold text-primary sm:text-lg"
          >
            {profile.roles.map((role, index) => (
              <li key={role} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-border-strong">
                    /
                  </span>
                ) : null}
                <span>{role}</span>
              </li>
            ))}
          </ul>

          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {profile.introduction}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/#projects" className={buttonVariants({ size: "lg" })}>
              View Projects
              <ArrowDownRight aria-hidden="true" />
            </Link>

            <Link
              href="/#contact"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              <Mail aria-hidden="true" />
              Contact Me
            </Link>

            {profile.cvUrl ? (
              <a
                href={profile.cvUrl}
                download
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                <Download aria-hidden="true" />
                Download CV
              </a>
            ) : null}
          </div>

          {socialLinks.length > 0 ? (
            <nav aria-label="Social links" className="mt-9">
              <ul className="flex flex-wrap gap-5">
                {socialLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${link.ariaLabel} (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-md text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
          aria-label="Professional focus"
          className="relative rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-0 h-px bg-primary sm:inset-x-8"
          />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Professional focus
          </p>

          <ol className="mt-6 divide-y divide-border">
            {profile.roles.map((role, index) => (
              <li key={role} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <span
                  aria-hidden="true"
                  className="font-mono text-xs font-semibold text-muted-foreground"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-semibold text-card-foreground">{role}</span>
              </li>
            ))}
          </ol>

          {profile.location ? (
            <p className="mt-7 flex items-center gap-2 border-t border-border pt-5 text-sm text-muted-foreground">
              <MapPin aria-hidden="true" className="size-4 text-primary" />
              Based in {profile.location}
            </p>
          ) : null}
        </aside>
      </Container>
    </Section>
  );
}
