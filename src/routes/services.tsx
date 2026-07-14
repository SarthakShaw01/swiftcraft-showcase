import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/landing/AppLayout";
import { Services } from "@/components/landing/Services";
import { TechStack } from "@/components/landing/TechStack";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — SwiftCraft Studios" },
      { name: "description", content: "Web development, UI/UX, custom software, and AI automation crafted for growth-stage teams." },
      { property: "og:title", content: "Services — SwiftCraft Studios" },
      { property: "og:description", content: "Web, product, and AI services engineered by SwiftCraft Studios." },
    ],
  }),
  component: () => (
    <AppLayout>
      <Services />
      <TechStack />
      <FinalCTA />
    </AppLayout>
  ),
});
