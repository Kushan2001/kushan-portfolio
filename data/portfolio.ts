import type { PortfolioData } from "@/types";

import { certifications } from "./certifications";
import { devOpsMilestones } from "./devops-milestones";
import { education } from "./education";
import { profile } from "./profile";
import { projects } from "./projects";
import { skillCategories } from "./skills";

export const portfolioData = {
  profile,
  skillCategories,
  projects,
  education,
  certifications,
  devOpsMilestones,
} satisfies PortfolioData;
