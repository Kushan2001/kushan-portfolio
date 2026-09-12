import type { Metadata } from "next";

import { profile } from "@/data/profile";
import { siteConfig } from "@/data/site";
import type { ImageAsset, Project } from "@/types";

export const siteTitle = `${profile.name} | ${profile.headline}`;
export const siteDescription = profile.introduction;

export function getAbsoluteUrl(path: string): string | undefined {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  if (!siteConfig.url) {
    return undefined;
  }

  return new URL(path, `${siteConfig.url}/`).toString();
}

export function getProjectSeoDescription(project: Project): string {
  const suppliedDescription =
    project.summary.trim() || project.description.trim();

  if (suppliedDescription) {
    return suppliedDescription;
  }

  const technologies = project.technologies.join(", ");

  return technologies
    ? `${project.title} project featuring ${technologies}.`
    : `${project.title} project by ${profile.name}.`;
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  images?: readonly ImageAsset[];
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  images = [],
}: PageMetadataOptions): Metadata {
  const canonical = getAbsoluteUrl(path);
  const socialImages = images.flatMap((image) => {
    const url = getAbsoluteUrl(image.src);

    return url
      ? [
          {
            url,
            alt: image.alt,
            width: image.width,
            height: image.height,
          },
        ]
      : [];
  });

  return {
    title,
    description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      type,
      title,
      description,
      siteName: profile.name,
      locale: siteConfig.locale,
      ...(canonical ? { url: canonical } : {}),
      ...(socialImages.length > 0 ? { images: socialImages } : {}),
    },
    twitter: {
      card: socialImages.length > 0 ? "summary_large_image" : "summary",
      title,
      description,
      ...(socialImages.length > 0
        ? { images: socialImages.map((image) => image.url) }
        : {}),
    },
  };
}
