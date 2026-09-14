import type { MetadataRoute } from "next";

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { getAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) {
    return [];
  }

  const homeUrl = getAbsoluteUrl("/") as string;
  const projectsUrl = getAbsoluteUrl("/projects") as string;
  const profileImageUrl = profile.image
    ? getAbsoluteUrl(profile.image.src)
    : undefined;

  return [
    {
      url: homeUrl,
      ...(profileImageUrl ? { images: [profileImageUrl] } : {}),
    },
    { url: projectsUrl },
    ...projects.map((project) => ({
      url: getAbsoluteUrl(`/projects/${project.slug}`) as string,
      images: project.images.flatMap((image) => {
        const imageUrl = getAbsoluteUrl(image.src);
        return imageUrl ? [imageUrl] : [];
      }),
    })),
  ];
}
