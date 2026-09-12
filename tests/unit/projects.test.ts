import { describe, expect, it } from "vitest";

import {
  filterProjectsByCategory,
  getAvailableProjectCategories,
  getSelectedProjectCategory,
} from "@/lib/projects";
import type { Project, ProjectCategory } from "@/types";

function createProject(
  slug: string,
  category: ProjectCategory,
): Project {
  return {
    slug,
    title: slug,
    summary: "",
    description: "",
    category,
    technologies: [],
    images: [],
    featured: false,
    status: "in-progress",
    problem: "",
    solution: "",
    features: [],
    challenges: [],
    lessonsLearned: [],
    futureImprovements: [],
  };
}

const projects = [
  createProject("cloud-project", "cloud"),
  createProject("software-project", "software-development"),
  createProject("web-project", "web"),
  createProject("other-project", "other"),
] as const;

describe("project filtering", () => {
  it("returns only populated filter categories in the configured display order", () => {
    expect(getAvailableProjectCategories(projects)).toEqual([
      "software-development",
      "web",
      "cloud",
    ]);
  });

  it("selects an available category", () => {
    expect(
      getSelectedProjectCategory("web", ["software-development", "web"]),
    ).toBe("web");
  });

  it("uses the first value when a category query is repeated", () => {
    expect(getSelectedProjectCategory(["cloud", "web"], ["web", "cloud"])).toBe(
      "cloud",
    );
  });

  it.each([undefined, "", "other", "not-a-category"])(
    "falls back to all for an unavailable category (%s)",
    (category) => {
      expect(getSelectedProjectCategory(category, ["web", "cloud"])).toBe(
        "all",
      );
    },
  );

  it("filters projects without mutating the source collection", () => {
    const filtered = filterProjectsByCategory(projects, "web");

    expect(filtered.map((project) => project.slug)).toEqual(["web-project"]);
    expect(projects).toHaveLength(4);
  });

  it("returns the original collection for the all filter", () => {
    expect(filterProjectsByCategory(projects, "all")).toBe(projects);
  });
});
