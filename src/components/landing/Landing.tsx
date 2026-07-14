import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { TrustStats } from "./TrustStats";
import { Services } from "./Services";
import { WhyUs } from "./WhyUs";
import { Process } from "./Process";
import { FeaturedWork } from "./FeaturedWork";
import { TechStack } from "./TechStack";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

export function Landing() {
  return (
    <main className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      <Nav />
      <Hero />
      <TrustStats />
      <Services />
      <WhyUs />
      <Process />
      <FeaturedWork />
      <TechStack />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
