import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "./Services";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Landing pages usually ship in 2–3 weeks. Marketing sites 4–6 weeks. Product and custom software engagements scope to 6–12 weeks with clear milestones.",
  },
  {
    q: "How do you price projects?",
    a: "Fixed-scope engagements are quoted after a discovery call. Ongoing partnerships run on monthly retainers with published deliverables and no surprise invoices.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes — we love pre-launch and seed-stage teams. We'll happily push back on scope so we ship the smallest thing that moves your metric.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Absolutely. We start with a paid audit, deliver a written report and a stabilization plan, then execute. No blame, just cleanup.",
  },
  {
    q: "Which industries do you specialize in?",
    a: "Fintech, hospitality, healthcare, real estate and B2B SaaS. That said, if the product is interesting and the team is serious, we're in.",
  },
  {
    q: "What happens after launch?",
    a: "We offer optional support retainers for performance, iteration and growth work — or we hand off cleanly with docs and a Loom walkthrough.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-y border-hairline bg-surface/20 py-28 md:py-40">
      <div className="mx-auto w-full max-w-4xl px-6">
        <SectionHeader
          center
          eyebrow="FAQ"
          title="Answers before you ask."
        />

        <div className="mt-16 divide-y divide-hairline border-y border-hairline">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-foreground"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-xl md:text-2xl">{f.q}</span>
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full border border-hairline transition-transform duration-300 ${
                      isOpen ? "rotate-45 border-[color:var(--violet)]/60 text-[color:var(--violet)]" : ""
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-16 text-base leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
