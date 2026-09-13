import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cvConfig } from "@/data/cv";
import { devOpsMilestones } from "@/data/devops-milestones";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

import { CurrentFocusCard } from "./current-focus-card";
import { HeroContent } from "./hero-content";

const featuredSocialLabels = new Set(["github", "linkedin"]);

export function Hero() {
  const socialLinks = profile.socialLinks.filter((link) =>
    featuredSocialLabels.has(link.label.toLowerCase()),
  );
  const projectTechnologies = new Set(
    projects.flatMap((project) => project.technologies),
  );
  const completedMilestoneIds = new Set(
    devOpsMilestones
      .filter((milestone) => milestone.status === "completed")
      .map((milestone) => milestone.id),
  );
  const focusTechnologies = [
    projectTechnologies.has("Java") ? "Java" : null,
    projectTechnologies.has("MySQL") ? "MySQL" : null,
    completedMilestoneIds.has("git") ? "Git" : null,
    completedMilestoneIds.has("linux-fundamentals") ? "Linux" : null,
    completedMilestoneIds.has("bash-basics") ? "Bash" : null,
  ].flatMap((technology) => (technology ? [technology] : []));
  const focusMilestoneIds = new Set([
    "linux-fundamentals",
    "git",
    "bash-basics",
    "docker",
    "ci-cd",
  ]);
  const focusMilestones = devOpsMilestones.filter((milestone) =>
    focusMilestoneIds.has(milestone.id),
  );

  return (
    <Section
      id="home"
      aria-labelledby="hero-title"
      reveal={false}
      className="relative border-b border-border xl:flex xl:min-h-[calc(100svh-4rem)] xl:items-center"
    >
      <Container className="grid min-w-0 items-center gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,29rem)] xl:gap-10 2xl:gap-16">
        <HeroContent
          cvAvailable={cvConfig.cvAvailable}
          cvPath={cvConfig.cvPath}
          introduction={profile.introduction}
          location={profile.location}
          name={profile.name}
          roles={profile.roles}
          socialLinks={socialLinks}
        />

        <CurrentFocusCard
          devOpsMilestones={focusMilestones}
          location={profile.location}
          technologies={focusTechnologies}
        />
      </Container>
    </Section>
  );
}
