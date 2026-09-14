import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { DevOpsJourney } from "@/components/sections/devops-journey";
import { Education } from "@/components/sections/education";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { JsonLd } from "@/components/seo/json-ld";
import { profile } from "@/data/profile";
import { getAbsoluteUrl } from "@/lib/seo";

export default function Home() {
  const canonical = getAbsoluteUrl("/");
  const profileImage = profile.image
    ? getAbsoluteUrl(profile.image.src)
    : undefined;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    description: profile.introduction,
    jobTitle: profile.headline,
    ...(profile.location
      ? {
          address: {
            "@type": "PostalAddress",
            addressCountry: profile.location,
          },
        }
      : {}),
    ...(profile.email ? { email: profile.email } : {}),
    ...(profile.socialLinks.length > 0
      ? { sameAs: profile.socialLinks.map((socialLink) => socialLink.url) }
      : {}),
    ...(profileImage ? { image: profileImage } : {}),
    ...(canonical ? { url: canonical } : {}),
  };

  return (
    <>
      <JsonLd data={personJsonLd} />
      <main id="main-content" className="flex-1">
        <Hero />
        <FeaturedProjects />
        <About />
        <Skills />
        <DevOpsJourney />
        <Education />
        <Certifications />
        <Contact />
      </main>
    </>
  );
}
