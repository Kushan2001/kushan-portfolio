import { Code2, ExternalLink, Mail } from "lucide-react";
import type { ComponentType, ComponentPropsWithoutRef } from "react";

import { Container } from "@/components/layout/container";
import { FooterReveal } from "@/components/layout/footer-reveal";
import { GitHubIcon } from "@/components/ui/github-icon";
import { LinkedInIcon } from "@/components/ui/linkedin-icon";
import { profile } from "@/data/profile";

type FooterIcon = ComponentType<ComponentPropsWithoutRef<"svg">>;

const footerSocialLabels = new Set(["github", "linkedin"]);

const socialIcons: Record<string, FooterIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
};

const footerLinkStyles =
  "group/footer-link inline-flex min-h-11 items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:border-border/80 hover:bg-surface hover:text-foreground hover:shadow-card motion-safe:hover:-translate-y-px focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const identityRoles = profile.roles.slice(1);
  const socialLinks = profile.socialLinks.filter((link) =>
    footerSocialLabels.has(link.label.toLowerCase()),
  );

  return (
    <footer className="relative border-t border-border bg-background">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent"
      />

      <FooterReveal>
        <Container className="py-10 sm:py-12">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-base font-semibold tracking-[-0.02em] text-foreground sm:text-lg">
                {profile.name}
              </p>

              {identityRoles.length > 0 ? (
                <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm leading-6 text-muted-foreground">
                  {identityRoles.map((role, index) => (
                    <span className="inline-flex items-center gap-x-2" key={role}>
                      {index > 0 ? (
                        <span aria-hidden="true" className="text-primary/70">
                          •
                        </span>
                      ) : null}
                      {role}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>

            {profile.email || socialLinks.length > 0 ? (
              <nav aria-label="Footer contact links">
                <ul className="grid gap-1 min-[390px]:grid-cols-3 sm:flex sm:flex-wrap sm:items-center sm:justify-end">
                  {profile.email ? (
                    <li>
                      <a
                        className={footerLinkStyles}
                        href={`mailto:${profile.email}`}
                      >
                        <Mail
                          aria-hidden="true"
                          className="size-4 transition-colors duration-200 group-hover/footer-link:text-primary"
                          strokeWidth={1.8}
                        />
                        Email
                      </a>
                    </li>
                  ) : null}

                  {socialLinks.map((link) => {
                    const SocialIcon =
                      socialIcons[link.icon?.toLowerCase() ?? ""] ??
                      socialIcons[link.label.toLowerCase()];

                    return (
                      <li key={link.url}>
                        <a
                          aria-label={`${link.ariaLabel} (opens in a new tab)`}
                          className={footerLinkStyles}
                          href={link.url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {SocialIcon ? (
                            <SocialIcon
                              aria-hidden="true"
                              className="size-4 transition-[color,transform] duration-200 group-hover/footer-link:text-primary motion-safe:group-hover/footer-link:scale-[1.04]"
                            />
                          ) : null}
                          {link.label}
                          <ExternalLink
                            aria-hidden="true"
                            className="size-3.5 opacity-65 transition-[opacity,transform] duration-200 group-hover/footer-link:opacity-100 motion-safe:group-hover/footer-link:-translate-y-px motion-safe:group-hover/footer-link:translate-x-px"
                            strokeWidth={1.8}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ) : null}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-border/70 pt-6 text-sm leading-6 text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>
              © {currentYear} {profile.name}. All rights reserved.
            </p>
            <p className="flex flex-wrap items-center gap-x-2">
              <Code2
                aria-hidden="true"
                className="size-4 shrink-0 text-primary"
                strokeWidth={1.8}
              />
              <span>Built with Next.js • TypeScript • Tailwind CSS</span>
            </p>
          </div>
        </Container>
      </FooterReveal>
    </footer>
  );
}
