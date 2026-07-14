import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/landing/AppLayout";
import { WhyUs } from "@/components/landing/WhyUs";
import { TrustStats } from "@/components/landing/TrustStats";
import { TechStack } from "@/components/landing/TechStack";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SwiftCraft Studios" },
      { name: "description", content: "SwiftCraft Studios is a small, senior team of designers and engineers building premium digital products." },
      { property: "og:title", content: "About — SwiftCraft Studios" },
      { property: "og:description", content: "A studio built on craft, calm process, and long-term partnership." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppLayout>
      <section className="relative py-24 md:py-36">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">About</div>
          <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-6xl md:text-7xl">
            A small studio,{" "}
            <span className="italic bg-gradient-to-r from-[color:var(--violet)] to-[color:var(--cyan)] bg-clip-text text-transparent">
              serious craft.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            SwiftCraft Studios is a senior-led team of designers, engineers, and strategists.
            We partner with founders and growth-stage teams to design, build, and scale
            digital products that feel premium and perform in the real world.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            No junior hand-offs, no template shops. Just the same people who scoped your
            project — through discovery, design, engineering and launch.
          </p>
        </div>
      </section>
      <TrustStats />
      <WhyUs />
      <TechStack />
      <FinalCTA />
    </AppLayout>
  );
}
