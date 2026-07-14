import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/landing/AppLayout";
import { Process } from "@/components/landing/Process";
import { WhyUs } from "@/components/landing/WhyUs";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — SwiftCraft Studios" },
      { name: "description", content: "How SwiftCraft Studios turns rough ideas into shipped, revenue-driving products." },
      { property: "og:title", content: "Process — SwiftCraft Studios" },
      { property: "og:description", content: "A calm, six-step process from discovery to launch and beyond." },
    ],
  }),
  component: () => (
    <AppLayout>
      <Process />
      <WhyUs />
      <FinalCTA />
    </AppLayout>
  ),
});
