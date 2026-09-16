import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  DevOpsRoadmap,
} from "@/components/sections/devops-roadmap";
import { devOpsMilestones } from "@/data/devops-milestones";
import { groupDevOpsMilestonesByStatus } from "@/lib/devops";

export function DevOpsJourney() {
  const stages = groupDevOpsMilestonesByStatus(devOpsMilestones);

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
