import type { MetadataRoute } from "next";

import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { getAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) {
    return [];
  }

  return ["/", "/projects", ...projects.map((project) => `/projects/${project.slug}`)].map(
    (path) => ({ url: getAbsoluteUrl(path) as string }),
  );
}
