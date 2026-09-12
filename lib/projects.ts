import type { Project, ProjectCategory, ProjectStatus } from "@/types";

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

export function getAvailableProjectCategories(
  projects: readonly Project[],
): ProjectCategory[] {
  return filterableProjectCategories.filter((category) =>
    projects.some((project) => project.category === category),
  );
}

export function getSelectedProjectCategory(
  requestedCategory: string | string[] | undefined,
  availableCategories: readonly ProjectCategory[],
): "all" | ProjectCategory {
  const category = Array.isArray(requestedCategory)
    ? requestedCategory[0]
    : requestedCategory;

  return category &&
    availableCategories.some((available) => available === category)
    ? (category as ProjectCategory)
    : "all";
}

export function filterProjectsByCategory(
  projects: readonly Project[],
  category: "all" | ProjectCategory,
): readonly Project[] {
  return category === "all"
    ? projects
    : projects.filter((project) => project.category === category);
}
