import { motion } from "framer-motion";
import { SectionHeader } from "./Services";

const tech = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js",
  "Supabase", "PostgreSQL", "Framer Motion", "Figma", "GitHub",
];

export function TechStack() {
  return (
    <section className="relative border-y border-hairline bg-surface/20 py-28 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeader
          eyebrow="Stack"
          title="Battle-tested tools. Modern by default."
          description="We choose technology for longevity and developer velocity — never for hype."
        />

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-3 md:grid-cols-5">
          {tech.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 5) * 0.05 }}
              className="group flex items-center justify-center bg-background p-8 transition-colors hover:bg-surface"
            >
              <span className="font-display text-2xl text-muted-foreground transition-colors group-hover:text-foreground">
                {t}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
