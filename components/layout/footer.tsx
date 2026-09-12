import { Container } from "@/components/layout/container";
import { profile } from "@/data/profile";

const footerSocialLabels = new Set(["github", "linkedin"]);

const footerLinkStyles =
  "rounded-md text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = profile.socialLinks.filter((link) =>
    footerSocialLabels.has(link.label.toLowerCase()),
  );

  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {currentYear} {profile.name}
        </p>

        {profile.email || socialLinks.length > 0 ? (
          <nav aria-label="Footer links">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {profile.email ? (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className={footerLinkStyles}
                  >
                    Email
                  </a>
                </li>
              ) : null}

              {socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${link.ariaLabel} (opens in a new tab)`}
                    className={footerLinkStyles}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </footer>
  );
}
