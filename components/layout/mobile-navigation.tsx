"use client";

import { ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { NavigationItem } from "@/data/navigation";
import type { SocialLink } from "@/types";

interface MobileNavigationProps {
  items: readonly NavigationItem[];
  socialLinks: readonly Pick<
    SocialLink,
    "ariaLabel" | "label" | "url"
  >[];
}

const mobileLinkStyles =
  "flex min-h-11 items-center rounded-lg px-3 py-2 text-base font-medium text-muted-foreground transition-[color,background-color,transform] duration-200 hover:bg-muted hover:text-foreground motion-safe:hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40";

export function MobileNavigation({
  items,
  socialLinks,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const closeNavigation = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label="Open navigation menu"
          />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[min(22rem,calc(100vw-0.75rem))] gap-0 border-border bg-background"
      >
        <SheetHeader className="border-b border-border px-6 py-5">
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Portfolio navigation and theme settings
          </SheetDescription>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5">
          <nav aria-label="Mobile navigation">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeNavigation}
                    className={mobileLinkStyles}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-5 border-t border-border pt-5">
            {socialLinks.length > 0 ? (
              <ul className="space-y-1" aria-label="Social links">
                {socialLinks.map((socialLink) => (
                  <li key={socialLink.url}>
                    <a
                      href={socialLink.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeNavigation}
                      className={mobileLinkStyles}
                      aria-label={`${socialLink.ariaLabel} (opens in a new tab)`}
                    >
                      <ExternalLink
                        aria-hidden="true"
                        className="mr-2 size-4"
                      />
                      {socialLink.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="flex items-center justify-between gap-4 px-1">
              <p className="text-sm font-medium text-muted-foreground">
                Theme
              </p>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
