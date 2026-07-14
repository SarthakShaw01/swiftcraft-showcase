import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Rocket,
  Globe,
  Cpu,
  Bot,
  RefreshCw,
  Gauge,
  ArrowUpRight,
} from "lucide-react";

const services = [
  { icon: Code2, title: "Web Development", desc: "Production-grade builds engineered for scale, speed and maintainability." },
  { icon: Palette, title: "UI/UX Design", desc: "Interfaces that feel inevitable — clear, considered, brand-defining." },
  { icon: Rocket, title: "Landing Pages", desc: "High-converting launch pages designed to move numbers, not just heads." },
  { icon: Globe, title: "Business Websites", desc: "Elegant marketing sites that turn traffic into qualified pipeline." },
  { icon: Cpu, title: "Custom Software", desc: "Purpose-built tools and internal platforms tailored to your workflow." },
  { icon: Bot, title: "AI Automation", desc: "Workflow AI and copilots that quietly do the work your team hates." },
  { icon: RefreshCw, title: "Website Redesign", desc: "Bring dated brands back to life without losing SEO, trust or traffic." },
  { icon: Gauge, title: "Performance", desc: "Core Web Vitals, LCP and INR — tuned until numbers make you smile." },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeader eyebrow="Services" title="Everything you need to ship a product that matters." />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
              className="group relative bg-background p-8 transition-colors duration-500 hover:bg-surface"
            >
              <div className="flex items-center justify-between">
                <div className="grid size-11 place-items-center rounded-xl border border-hairline bg-surface text-foreground transition group-hover:border-[color:var(--violet)]/50 group-hover:text-[color:var(--violet)]">
                  <s.icon size={18} />
                </div>
                <ArrowUpRight
                  size={16}
                  className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                />
              </div>
              <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-col ${center ? "items-center text-center" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground"
      >
        <span className="size-1 rounded-full bg-[color:var(--violet)]" />
        {eyebrow}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`mt-5 font-display text-4xl text-balance sm:text-5xl md:text-6xl ${
          center ? "max-w-3xl" : "max-w-2xl"
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-2xl text-base text-muted-foreground text-balance"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
