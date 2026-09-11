export const themes = ["system", "light", "dark"] as const;

export type Theme = (typeof themes)[number];

export function isTheme(value: string | null | undefined): value is Theme {
  return value !== null && themes.some((theme) => theme === value);
}
