import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ContactShowcase } from "@/components/sections/contact-showcase";
import { profile } from "@/data/profile";

const contactSocialLabels = new Set(["github", "linkedin"]);

export function Contact() {
  const socialLinks = profile.socialLinks.filter((link) =>
    contactSocialLabels.has(link.label.toLowerCase()),
  );

  if (!profile.email && socialLinks.length === 0) {
    return null;
  }

  return (
    <Section id="contact" surface="muted" aria-labelledby="contact-heading">
      <Container>
        <ContactShowcase email={profile.email} socialLinks={socialLinks} />
      </Container>
    </Section>
  );
}
