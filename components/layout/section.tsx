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
}

export function Section({
  className,
  surface = "default",
  compact = false,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        surfaceClasses[surface],
        compact ? "py-12 sm:py-16" : "py-[var(--section-spacing)]",
        className,
      )}
      {...props}
    />
  );
}
