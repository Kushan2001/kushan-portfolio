import { describe, expect, it } from "vitest";

import { getProjectSeoDescription } from "@/lib/seo";
import type { Project } from "@/types";

function createProject(overrides: Partial<Project> = {}): Project {
  return {
    slug: "project",
    title: "Project",
    summary: "",
    description: "",
    category: "software-development",
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
    ...overrides,
  };
}

describe("project SEO descriptions", () => {
  it("prefers a trimmed project summary", () => {
    const project = createProject({
      summary: "  Concise summary.  ",
      description: "Long description.",
    });

    expect(getProjectSeoDescription(project)).toBe("Concise summary.");
  });

  it("uses the description when the summary is empty", () => {
    const project = createProject({ description: "  Project description. " });

    expect(getProjectSeoDescription(project)).toBe("Project description.");
  });

  it("builds a factual fallback from listed technologies", () => {
    const project = createProject({
      title: "Student System",
      technologies: ["Java", "MySQL"],
    });

    expect(getProjectSeoDescription(project)).toBe(
      "Student System project featuring Java, MySQL.",
    );
  });

  it("uses the project title and profile name as the final fallback", () => {
    expect(getProjectSeoDescription(createProject({ title: "Student System" }))).toBe(
      "Student System project by Kushan M Jayaweera.",
    );
  });
});
