import type { DevOpsMilestone, MilestoneStatus } from "@/types";

export interface DevOpsMilestoneGroup {
  status: MilestoneStatus;
  milestones: readonly DevOpsMilestone[];
}

const milestoneStatusOrder = [
  "completed",
  "in-progress",
  "planned",
] as const satisfies readonly MilestoneStatus[];

export function groupDevOpsMilestonesByStatus(
  milestones: readonly DevOpsMilestone[],
): DevOpsMilestoneGroup[] {
  return milestoneStatusOrder.flatMap((status) => {
    const matchingMilestones = milestones.filter(
      (milestone) => milestone.status === status,
    );

    return matchingMilestones.length > 0
      ? [{ status, milestones: matchingMilestones }]
      : [];
  });
}
