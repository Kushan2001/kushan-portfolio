import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { navigationItems } from "@/data/navigation";
import { profile } from "@/data/profile";

const navigationLinkStyles =
  "rounded-md px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40";

export function Navbar() {
  const githubLink = profile.socialLinks.find(
    (link) => link.label.toLowerCase() === "github",
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 supports-backdrop-filter:bg-background/85 supports-backdrop-filter:backdrop-blur-md">
      <Container className="flex min-h-18 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${profile.name} home`}
          className="min-w-0 rounded-md py-2 text-base font-semibold tracking-[-0.02em] text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 sm:text-lg"
        >
          <span className="block truncate">{profile.name}</span>
        </Link>

        <div className="hidden min-w-0 items-center gap-3 lg:flex">
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-0.5">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={navigationLinkStyles}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 border-l border-border pl-3">
            {githubLink ? (
              <a
                href={githubLink.url}
                target="_blank"
                rel="noreferrer"
                aria-label={githubLink.ariaLabel}
                className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                <ExternalLink aria-hidden="true" className="size-4" />
                {githubLink.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
            <ThemeToggle className="shadow-none" />
          </div>
        </div>

        <div className="lg:hidden">
          <MobileNavigation items={navigationItems} githubLink={githubLink} />
        </div>
      </Container>
    </header>
  );
}
