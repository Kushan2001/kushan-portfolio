import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "@/data/site";

describe("site URL validation", () => {
  it.each([undefined, "", "   "])(
    "treats an unset production URL as unavailable (%s)",
    (value) => {
      expect(resolveSiteUrl(value)).toBeNull();
    },
  );

  it("normalizes a configured URL to its origin", () => {
    expect(resolveSiteUrl("  https://portfolio.example/path/  ")).toBe(
      "https://portfolio.example",
    );
  });

  it("accepts HTTP for local deployment checks", () => {
    expect(resolveSiteUrl("http://localhost:3000/projects")).toBe(
      "http://localhost:3000",
    );
  });

  it.each(["ftp://portfolio.example", "not a URL"])(
    "rejects an invalid production URL (%s)",
    (value) => {
      expect(() => resolveSiteUrl(value)).toThrow();
    },
  );
});
