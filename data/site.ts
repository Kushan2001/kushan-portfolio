export function resolveSiteUrl(value: string | undefined): string | null {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  const url = new URL(candidate);

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new Error("SITE_URL must use the http or https protocol.");
  }

  return url.origin;
}

export const siteConfig = {
  /** Set SITE_URL to the production origin when the final domain is available. */
  url: resolveSiteUrl(process.env.SITE_URL),
  locale: "en_US",
  language: "en",
} as const;
