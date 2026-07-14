import { motion } from "framer-motion";
import { SectionHeader } from "./Services";
import { Star } from "lucide-react";

const items = [
  {
    quote:
      "SwiftCraft rebuilt our entire booking platform in six weeks. Conversion is up 47% and I stopped dreading Monday standups.",
    name: "Amelia Chen",
    role: "COO, Halo Aesthetics",
    initials: "AC",
  },
  {
    quote:
      "They designed and shipped a marketing site that finally looks like a company we'd want to hire. Best money we've spent this year.",
    name: "Marcus Rivera",
    role: "Founder, Meridian Capital",
    initials: "MR",
  },
  {
    quote:
      "Senior-level thinking from day one. The AI workflow they built saves us 30+ hours a week — real hours, not slide-deck hours.",
    name: "Priya Kapoor",
    role: "Head of Ops, Northline",
    initials: "PK",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeader
          eyebrow="Clients"
          title="Trusted by founders and operators."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass flex flex-col justify-between rounded-2xl p-7"
            >
              <div>
                <div className="flex gap-0.5 text-[color:var(--violet)]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-5 text-lg leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-hairline pt-5">
                <div className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-[color:var(--violet)] to-[color:var(--cyan)] text-sm font-medium text-background">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
