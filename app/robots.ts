import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { getAbsoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = getAbsoluteUrl("/sitemap.xml");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    ...(sitemapUrl ? { sitemap: sitemapUrl } : {}),
    ...(siteConfig.url ? { host: siteConfig.url } : {}),
  };
}
