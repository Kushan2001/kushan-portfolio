import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { GitHubIcon } from "@/components/ui/github-icon";
import { certifications } from "@/data/certifications";
import {
  navigationItems,
  primaryNavigationItems,
} from "@/data/navigation";
import { profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";

export function Navbar() {
  const githubLink = profile.socialLinks.find(
    (link) => link.label.toLowerCase() === "github",
  );
  const hasSkills = skillCategories.some(
    (category) => category.skills.length > 0,
  );
  const visibleNavigationItems = navigationItems.filter(
    (item) => item.label !== "Skills" || hasSkills,
  );
  const mobileItems =
    certifications.length > 0
      ? visibleNavigationItems.flatMap((item) =>
          item.label === "Contact"
            ? [
                { label: "Certifications", href: "/#certifications" },
                item,
              ]
            : [item],
        )
      : visibleNavigationItems;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 supports-backdrop-filter:bg-background/88 supports-backdrop-filter:backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-5">
        <Link
          href="/"
          aria-label={`${profile.name} home`}
          className="inline-flex min-h-11 min-w-0 items-center rounded-md py-2 text-base font-semibold tracking-[-0.025em] text-foreground transition-[color,opacity,transform] duration-200 hover:text-primary motion-safe:hover:-translate-y-px focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 sm:text-lg"
        >
          <span className="block truncate">{profile.name}</span>
        </Link>

        <div className="hidden min-w-0 items-center gap-5 xl:flex">
          <DesktopNavigation items={primaryNavigationItems} />

          <div className="flex items-center gap-2 border-l border-border/80 pl-5">
            {githubLink ? (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`${githubLink.ariaLabel} (opens in a new tab)`}
                className="group/github inline-flex h-11 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition-[color,background-color,transform] duration-200 hover:bg-muted/70 hover:text-foreground motion-safe:hover:-translate-y-px focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <GitHubIcon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 motion-safe:group-hover/github:-rotate-3 motion-safe:group-focus-visible/github:-rotate-3"
                />
                {githubLink.label}
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-200 motion-safe:group-hover/github:translate-x-0.5 motion-safe:group-hover/github:-translate-y-0.5 motion-safe:group-focus-visible/github:translate-x-0.5 motion-safe:group-focus-visible/github:-translate-y-0.5"
                />
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
