import { motion } from "framer-motion";
import { SectionHeader } from "./Services";

const steps = [
  { n: "01", t: "Discover", d: "Deep-dive workshops to align on business goals, users and constraints." },
  { n: "02", t: "Plan", d: "Scope, timeline and success metrics — written down, honestly." },
  { n: "03", t: "Design", d: "High-fidelity UI + prototype, iterated tightly until it feels right." },
  { n: "04", t: "Develop", d: "Clean, typed code shipped in small increments you can review live." },
  { n: "05", t: "Launch", d: "QA, analytics, monitoring and a launch that doesn't wake you at 3am." },
  { n: "06", t: "Support", d: "Ongoing performance, iteration and growth work as a real partner." },
];

export function Process() {
  return (
    <section id="process" className="relative border-y border-hairline bg-surface/20 py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeader
          eyebrow="Process"
          title="Six steps. Zero drama."
          description="A repeatable, transparent workflow refined across hundreds of engagements."
        />

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-hairline md:block" />
          <div className="grid gap-y-14 md:grid-cols-3 lg:grid-cols-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative px-2"
              >
                <div className="relative z-10 grid size-12 place-items-center rounded-full border border-hairline bg-background font-mono text-xs text-muted-foreground">
                  {s.n}
                </div>
                <div className="mt-6 font-display text-2xl">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
