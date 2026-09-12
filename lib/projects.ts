import type { ProjectCategory, ProjectStatus } from "@/types";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  "software-development": "Software",
  web: "Web",
  devops: "DevOps",
  cloud: "Cloud",
  other: "Other",
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  maintained: "Maintained",
  archived: "Archived",
};

export const filterableProjectCategories = [
  "software-development",
  "web",
  "devops",
  "cloud",
] as const satisfies readonly ProjectCategory[];
