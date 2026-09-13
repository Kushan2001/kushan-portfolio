import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  DevOpsRoadmap,
  type DevOpsRoadmapStage,
} from "@/components/sections/devops-roadmap";
import { devOpsMilestones } from "@/data/devops-milestones";
import type { MilestoneStatus } from "@/types";

const statusOrder = [
  "completed",
  "in-progress",
  "planned",
] as const satisfies readonly MilestoneStatus[];

export function DevOpsJourney() {
  const stages = statusOrder.flatMap<DevOpsRoadmapStage>((status) => {
    const milestones = devOpsMilestones.filter(
      (milestone) => milestone.status === status,
    );

    return milestones.length > 0 ? [{ status, milestones }] : [];
  });

  if (stages.length === 0) {
    return null;
  }

  return (
    <Section id="devops" surface="muted" aria-labelledby="devops-heading">
      <Container>
        <DevOpsRoadmap stages={stages} />
      </Container>
    </Section>
  );
}
