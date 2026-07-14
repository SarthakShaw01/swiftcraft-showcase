import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/landing/AppLayout";
import { ContactForm } from "@/components/landing/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SwiftCraft Studios" },
      { name: "description", content: "Book a free consultation or request a custom quote from SwiftCraft Studios." },
      { property: "og:title", content: "Contact — SwiftCraft Studios" },
      { property: "og:description", content: "Tell us about your project. We reply within one business day." },
    ],
  }),
  component: () => (
    <AppLayout>
      <ContactForm />
    </AppLayout>
  ),
});
