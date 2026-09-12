import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <Hero />
      <About />
    </main>
  );
}
