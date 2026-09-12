import { describe, expect, it } from "vitest";

import { hasContent, hasItems } from "@/lib/content";

describe("content guards", () => {
  it("recognizes non-empty collections", () => {
    expect(hasItems(["item"])).toBe(true);
  });

  it.each([undefined, null, []] as const)(
    "rejects missing or empty collections",
    (items) => {
      expect(hasItems(items)).toBe(false);
    },
  );

  it("treats false, zero, and empty strings as present content", () => {
    expect(hasContent(false)).toBe(true);
    expect(hasContent(0)).toBe(true);
    expect(hasContent("")).toBe(true);
  });

  it("rejects only nullish content", () => {
    expect(hasContent(null)).toBe(false);
    expect(hasContent(undefined)).toBe(false);
  });
});
