import { About } from "@/components/sections/about";
import { DevOpsJourney } from "@/components/sections/devops-journey";
import { Education } from "@/components/sections/education";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <About />
      <Skills />
      <FeaturedProjects />
      <DevOpsJourney />
      <Education />
    </main>
  );
}
