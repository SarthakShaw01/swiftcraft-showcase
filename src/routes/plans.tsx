import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/landing/AppLayout";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Plans — SwiftCraft Studios" },
      { name: "description", content: "Transparent starting points for landing pages, business websites, web apps, and custom software." },
      { property: "og:title", content: "Plans — SwiftCraft Studios" },
      { property: "og:description", content: "Investment tiers built to scale with your ambition." },
    ],
  }),
  component: () => (
    <AppLayout>
      <Pricing />
      <FAQ />
      <FinalCTA />
    </AppLayout>
  ),
});
