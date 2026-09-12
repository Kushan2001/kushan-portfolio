import type { ProjectCategory } from "@/types";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  "software-development": "Software",
  web: "Web",
  devops: "DevOps",
  cloud: "Cloud",
  other: "Other",
};

export const filterableProjectCategories = [
  "software-development",
  "web",
  "devops",
  "cloud",
] as const satisfies readonly ProjectCategory[];
