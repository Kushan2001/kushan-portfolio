import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";

export function About() {
  const paragraphs = [profile.introduction, ...profile.biography].filter(
    (paragraph) => paragraph.trim().length > 0,
  );

  if (paragraphs.length === 0 && profile.roles.length === 0) {
    return null;
  }

  return (
    <Section id="about" surface="muted" aria-labelledby="about-heading">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHeading
          eyebrow="About"
          title="About Me"
          headingId="about-heading"
          description="My background, current direction, and approach to professional growth."
        />

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8 lg:p-10">
          {paragraphs.length > 0 ? (
            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-lg font-medium leading-8 text-card-foreground sm:text-xl"
                      : "leading-7 text-muted-foreground"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {profile.roles.length > 0 ? (
            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Career direction
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Career direction">
                {profile.roles.map((role) => (
                  <li key={role}>
                    <Badge variant="outline">{role}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
