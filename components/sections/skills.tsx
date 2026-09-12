import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { skillCategories } from "@/data/skills";
import type { SkillCategory } from "@/types";

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <h3 className="font-heading text-lg font-semibold tracking-[-0.015em]">
          {category.title}
        </h3>
        {category.description ? (
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {category.description}
          </p>
        ) : null}
      </CardHeader>

      <CardContent>
        <ul
          aria-label={`${category.title} skills`}
          className="flex flex-wrap gap-2"
        >
          {category.skills.map((skill) => (
            <li key={skill.name}>
              <Badge variant="outline">{skill.name}</Badge>
              {skill.description ? (
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {skill.description}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function Skills() {
  const populatedCategories = skillCategories.filter(
    (category) => category.skills.length > 0,
  );

  if (populatedCategories.length === 0) {
    return null;
  }

  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="Technical Skills"
          headingId="skills-heading"
          description="Technologies and tools grouped by area of practice and current learning."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {populatedCategories.map((category) => (
            <li key={category.id}>
              <SkillCategoryCard category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
