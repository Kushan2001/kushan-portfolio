import { existsSync } from "node:fs";
import { join } from "node:path";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { EducationShowcase } from "@/components/sections/education-showcase";
import { education } from "@/data/education";

const universityLogoPath = "/images/education/seusl-logo.png";

export function Education() {
  if (education.length === 0) {
    return null;
  }

  const hasUniversityLogo = existsSync(
    join(
      process.cwd(),
      "public",
      "images",
      "education",
      "seusl-logo.png",
    ),
  );

  return (
    <Section id="education" aria-labelledby="education-heading">
      <Container>
        <EducationShowcase
          entries={education}
          hasUniversityLogo={hasUniversityLogo}
          universityLogoPath={universityLogoPath}
        />
      </Container>
    </Section>
  );
}
