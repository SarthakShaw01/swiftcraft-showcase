import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/landing/AppLayout";
import { FeaturedWork } from "@/components/landing/FeaturedWork";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — SwiftCraft Studios" },
      { name: "description", content: "Selected case studies and client work by SwiftCraft Studios." },
      { property: "og:title", content: "Work — SwiftCraft Studios" },
      { property: "og:description", content: "Digital products, brand sites, and platforms we've shipped." },
    ],
  }),
  component: () => (
    <AppLayout>
      <FeaturedWork />
      <Testimonials />
      <FinalCTA />
    </AppLayout>
  ),
});
