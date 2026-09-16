import { describe, expect, it } from "vitest";

import { groupDevOpsMilestonesByStatus } from "@/lib/devops";
import type { DevOpsMilestone, MilestoneStatus } from "@/types";

function createMilestone(
  id: string,
  status: MilestoneStatus,
): DevOpsMilestone {
  return {
    id,
    title: id,
    description: "",
    date: "",
    status,
    technologies: [],
  };
}

describe("DevOps milestone grouping", () => {
  it("groups milestones in roadmap order while preserving order within a status", () => {
    const docker = createMilestone("docker", "in-progress");
    const git = createMilestone("git", "completed");
    const linux = createMilestone("linux", "completed");
    const aws = createMilestone("aws", "planned");

    const groups = groupDevOpsMilestonesByStatus([
      docker,
      git,
      aws,
      linux,
    ]);

    expect(groups.map((group) => group.status)).toEqual([
      "completed",
      "in-progress",
      "planned",
    ]);
    expect(groups[0]?.milestones).toEqual([git, linux]);
    expect(groups[1]?.milestones).toEqual([docker]);
    expect(groups[2]?.milestones).toEqual([aws]);
  });

  it("omits empty status groups", () => {
    const docker = createMilestone("docker", "in-progress");

    expect(groupDevOpsMilestonesByStatus([docker])).toEqual([
      { status: "in-progress", milestones: [docker] },
    ]);
  });

  it("returns no groups when there are no milestones", () => {
    expect(groupDevOpsMilestonesByStatus([])).toEqual([]);
  });
});
