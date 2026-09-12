import { describe, expect, it } from "vitest";

import { isTheme } from "@/lib/theme";

describe("theme validation", () => {
  it.each(["system", "light", "dark"])("accepts the %s theme", (theme) => {
    expect(isTheme(theme)).toBe(true);
  });

  it.each([undefined, null, "", "auto", "DARK"])(
    "rejects an unsupported theme (%s)",
    (theme) => {
      expect(isTheme(theme)).toBe(false);
    },
  );
});
