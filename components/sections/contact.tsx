import { ExternalLink, Mail } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { CopyEmailButton } from "@/components/sections/copy-email-button";
import { SectionHeading } from "@/components/sections/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/profile";

const contactSocialLabels = new Set(["github", "linkedin"]);

export function Contact() {
  const socialLinks = profile.socialLinks.filter((link) =>
    contactSocialLabels.has(link.label.toLowerCase()),
  );

  if (!profile.email && socialLinks.length === 0) {
    return null;
  }

  return (
    <Section
      id="contact"
      surface="inverse"
      aria-labelledby="contact-heading"
    >
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s Connect"
          headingId="contact-heading"
          tone="inverse"
          description="Reach out by email or connect through GitHub and LinkedIn."
        />

        <div className="rounded-2xl border border-surface-inverse-muted/25 p-6 sm:p-8 lg:p-10">
          {profile.email ? (
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-surface-inverse-muted">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 inline-block break-all rounded-md text-lg font-semibold text-surface-inverse-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-inverse-foreground"
              >
                {profile.email}
              </a>

              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:${profile.email}`}
                  className={buttonVariants({ size: "lg" })}
                >
                  <Mail aria-hidden="true" />
                  Contact Me
                </a>
                <CopyEmailButton email={profile.email} />
              </div>
            </div>
          ) : null}

          {socialLinks.length > 0 ? (
            <div className="mt-8 border-t border-surface-inverse-muted/25 pt-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-surface-inverse-muted">
                Profiles
              </p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${link.ariaLabel} (opens in a new tab)`}
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-surface-inverse-muted/40 px-4 text-sm font-semibold text-surface-inverse-foreground transition-colors hover:border-surface-inverse-foreground/50 hover:bg-surface-inverse-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-inverse-foreground"
                    >
                      {link.label}
                      <ExternalLink aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
