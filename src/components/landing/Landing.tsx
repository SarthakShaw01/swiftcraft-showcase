import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { TrustStats } from "./TrustStats";
import { Services } from "./Services";
import { FeaturedWork } from "./FeaturedWork";
import { Testimonials } from "./Testimonials";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

export function Landing() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustStats />
      <Services />
      <FeaturedWork />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
}
