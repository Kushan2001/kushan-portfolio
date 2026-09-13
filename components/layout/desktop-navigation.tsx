"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { NavigationItem } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface DesktopNavigationProps {
  items: readonly NavigationItem[];
}

const linkStyles =
  "relative inline-flex min-h-11 items-center rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-[color,background-color,transform] duration-200 hover:bg-muted/60 hover:text-foreground motion-safe:hover:-translate-y-px focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40 after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-200 after:ease-out hover:after:scale-x-75 data-[active=true]:text-primary data-[active=true]:after:scale-x-100";

export function DesktopNavigation({ items }: DesktopNavigationProps) {
  const pathname = usePathname();
  const [homepageActiveHref, setHomepageActiveHref] = useState<string>();
  const activeHref =
    pathname === "/"
      ? homepageActiveHref
      : pathname.startsWith("/projects")
        ? "/#projects"
        : undefined;

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = items.flatMap((item) => {
      const id = item.href.split("#")[1];
      const element = id ? document.getElementById(id) : null;
      return element ? [{ element, href: item.href }] : [];
    });

    let frameId = 0;
    const updateActiveSection = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const activationPoint = window.scrollY + window.innerHeight * 0.38;
        const activeSection = sections
          .filter(({ element }) => element.offsetTop <= activationPoint)
          .sort((a, b) => a.element.offsetTop - b.element.offsetTop)
          .at(-1);

        setHomepageActiveHref(activeSection?.href);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items, pathname]);

  return (
    <nav aria-label="Primary navigation">
      <ul className="flex items-center gap-1.5">
        {items.map((item) => {
          const isActive = activeHref === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                data-active={isActive}
                className={cn(linkStyles)}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
