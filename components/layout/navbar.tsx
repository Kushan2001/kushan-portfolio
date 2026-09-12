import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { certifications } from "@/data/certifications";
import {
  navigationItems,
  primaryNavigationItems,
} from "@/data/navigation";
import { profile } from "@/data/profile";

export function Navbar() {
  const githubLink = profile.socialLinks.find(
    (link) => link.label.toLowerCase() === "github",
  );
  const mobileItems =
    certifications.length > 0
      ? navigationItems.flatMap((item) =>
          item.label === "Contact"
            ? [
                { label: "Certifications", href: "/#certifications" },
                item,
              ]
            : [item],
        )
      : navigationItems;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 supports-backdrop-filter:bg-background/88 supports-backdrop-filter:backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${profile.name} home`}
          className="inline-flex min-h-11 min-w-0 items-center rounded-md py-2 text-base font-semibold tracking-[-0.02em] text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 sm:text-lg"
        >
          <span className="block truncate">{profile.name}</span>
        </Link>

        <div className="hidden min-w-0 items-center gap-4 xl:flex">
          <DesktopNavigation items={primaryNavigationItems} />

          <div className="flex items-center gap-1 border-l border-border pl-4">
            {githubLink ? (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noreferrer"
                aria-label={githubLink.ariaLabel}
                className="inline-flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                {githubLink.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            <ThemeToggle />
          </div>
        </div>

        <div className="xl:hidden">
          <MobileNavigation
            items={mobileItems}
            socialLinks={profile.socialLinks}
          />
        </div>
      </Container>
    </header>
  );
}
