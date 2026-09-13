"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useId, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import { isTheme } from "@/lib/theme";

const themeOptions = [
  {
    value: "system",
    label: "System",
    Icon: Monitor,
    iconMotion:
      "motion-safe:group-hover/theme-option:scale-[1.04] motion-safe:group-focus-within/theme-option:scale-[1.04]",
  },
  {
    value: "light",
    label: "Light",
    Icon: Sun,
    iconMotion:
      "motion-safe:group-hover/theme-option:rotate-[8deg] motion-safe:group-focus-within/theme-option:rotate-[8deg]",
  },
  {
    value: "dark",
    label: "Dark",
    Icon: Moon,
    iconMotion:
      "motion-safe:group-hover/theme-option:-rotate-[8deg] motion-safe:group-focus-within/theme-option:-rotate-[8deg]",
  },
] as const;

const subscribeToMount = () => () => undefined;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const groupName = useId();
  const isMounted = useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false,
  );
  const selectedTheme = isMounted && isTheme(theme) ? theme : undefined;

  return (
    <fieldset
      className={cn(
        "inline-flex shrink-0 rounded-xl border border-border/80 bg-card/90 p-1 text-card-foreground shadow-card",
        className,
      )}
    >
      <legend className="sr-only">Color theme</legend>
      {themeOptions.map(({ value, label, Icon, iconMotion }) => (
        <label
          key={value}
          className="group/theme-option relative cursor-pointer rounded-lg has-disabled:cursor-default"
          title={`${label} theme`}
        >
          <input
            type="radio"
            name={groupName}
            value={value}
            checked={selectedTheme === value}
            disabled={!isMounted}
            onChange={() => setTheme(value)}
            aria-label={`${label} theme`}
            className="peer sr-only"
          />
          <span className="flex size-11 items-center justify-center rounded-lg text-muted-foreground transition-[color,background-color,box-shadow,transform] duration-200 hover:bg-muted/80 hover:text-foreground peer-checked:-translate-y-px peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:shadow-sm peer-focus-visible:ring-3 peer-focus-visible:ring-ring/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background peer-disabled:opacity-70">
            <Icon
              aria-hidden="true"
              className={cn("size-4 transition-transform duration-200", iconMotion)}
              strokeWidth={1.8}
            />
          </span>
        </label>
      ))}
    </fieldset>
  );
}
