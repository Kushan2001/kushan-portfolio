import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const surfaceClasses = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  inverse: "bg-surface-inverse text-surface-inverse-foreground",
} as const;

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  surface?: keyof typeof surfaceClasses;
  compact?: boolean;
  reveal?: boolean;
}

export function Section({
  className,
  surface = "default",
  compact = false,
  reveal = true,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        surfaceClasses[surface],
        compact
          ? "py-12 sm:py-14 lg:py-16"
          : "py-16 md:py-20 lg:py-24",
        reveal && "section-reveal",
        className,
      )}
      {...props}
    />
  );
}
