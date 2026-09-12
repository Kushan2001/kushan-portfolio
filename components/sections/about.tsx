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
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="About Me"
          headingId="about-heading"
          description="My background, current direction, and approach to professional growth."
        />

        <div className="mt-10 grid min-w-0 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.48fr)] xl:gap-14">
          {paragraphs.length > 0 ? (
            <div className="max-w-3xl space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={
                    index === 0
                      ? "text-lg font-medium leading-8 text-foreground sm:text-xl"
                      : "leading-7 text-muted-foreground"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {profile.roles.length > 0 ? (
            <aside className="self-start rounded-2xl border border-border bg-card p-6 shadow-card sm:p-7">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                Career direction
              </p>
              <ul className="space-y-3" aria-label="Career direction">
                {profile.roles.map((role) => (
                  <li key={role} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-primary"
                    />
                    <Badge variant="outline">{role}</Badge>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
