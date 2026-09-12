import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps extends ComponentPropsWithoutRef<"header"> {
  title: string;
  eyebrow?: string;
  description?: string;
  headingId?: string;
  align?: "start" | "center";
  tone?: "default" | "inverse";
}

export function SectionHeading({
  title,
  eyebrow,
  description,
  headingId,
  align = "start",
  tone = "default",
  className,
  ...props
}: SectionHeadingProps) {
  const isCentered = align === "center";
  const isInverse = tone === "inverse";

  return (
    <header
      className={cn(
        "max-w-2xl",
        isCentered && "mx-auto text-center",
        className,
      )}
      {...props}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold tracking-[0.12em] uppercase",
            isInverse ? "text-surface-inverse-muted" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 id={headingId}>{title}</h2>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-7 sm:text-lg sm:leading-8",
            isInverse
              ? "text-surface-inverse-muted"
              : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
