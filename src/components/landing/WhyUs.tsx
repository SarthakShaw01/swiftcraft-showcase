import { motion } from "framer-motion";
import { SectionHeader } from "./Services";
import { Check } from "lucide-react";

const points = [
  { t: "Premium quality", d: "Every pixel and every line of code held to a portfolio-worthy bar." },
  { t: "Fast delivery", d: "Tight sprints, transparent progress, no invisible weeks of silence." },
  { t: "Modern technology", d: "React, TypeScript, edge runtimes and the tools serious teams pick." },
  { t: "Scalable architecture", d: "Built to hold up when traffic, data or team size doubles overnight." },
  { t: "SEO ready", d: "Semantic, fast and structured so search engines actually love your site." },
  { t: "Responsive design", d: "Impeccable on 4K displays, laptops, tablets and phones — no exceptions." },
  { t: "Business-first thinking", d: "We optimize for revenue and clarity, not designer trophies." },
];

export function WhyUs() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeader
              eyebrow="Why SwiftCraft"
              title="A studio, not a factory."
              description="You get a small, senior team that treats your product like their own — not an offshore assembly line billing by the hour."
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 hidden lg:block"
            >
              <div className="relative aspect-square w-full max-w-sm surface rounded-3xl p-8">
                <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-[color:var(--violet)]/20 via-transparent to-[color:var(--cyan)]/10 blur-2xl" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="font-display text-7xl leading-none">
                    01<span className="text-muted-foreground">/07</span>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Principle</div>
                    <div className="mt-2 font-display text-3xl italic">Craft compounds.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <ul className="divide-y divide-hairline border-y border-hairline">
            {points.map((p, i) => (
              <motion.li
                key={p.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group grid grid-cols-[auto_1fr] items-start gap-5 py-6"
              >
                <span className="mt-1 grid size-8 place-items-center rounded-full border border-hairline bg-surface transition group-hover:border-[color:var(--violet)]/60 group-hover:text-[color:var(--violet)]">
                  <Check size={14} />
                </span>
                <div>
                  <div className="font-display text-2xl">{p.t}</div>
                  <div className="mt-1.5 text-sm text-muted-foreground">{p.d}</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
