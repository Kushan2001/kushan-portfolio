import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { projectCategoryLabels } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

interface ProjectFiltersProps {
  categories: readonly ProjectCategory[];
  selectedCategory: "all" | ProjectCategory;
}

export function ProjectFilters({
  categories,
  selectedCategory,
}: ProjectFiltersProps) {
  const filters = ["all", ...categories] as const;

  return (
    <nav aria-label="Filter projects by category" className="mt-10">
      <ul className="flex flex-wrap gap-2">
        {filters.map((category) => {
          const isActive = selectedCategory === category;
          const label =
            category === "all" ? "All" : projectCategoryLabels[category];
          const href =
            category === "all" ? "/projects" : `/projects?category=${category}`;

          return (
            <li key={category}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  buttonVariants({
                    variant: isActive ? "default" : "outline",
                    size: "sm",
                  }),
                  "min-w-16",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
