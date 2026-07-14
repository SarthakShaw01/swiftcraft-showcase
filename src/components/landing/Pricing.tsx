import { motion } from "framer-motion";
import { Check, ArrowUpRight, Calendar, FileText } from "lucide-react";
import { SectionHeader } from "./Services";

const tiers = [
  {
    name: "Starter",
    price: "₹14,999",
    scope: "Landing Pages & Basic Business Websites",
    description:
      "A sharp, high-performance presence for early-stage brands, founders, and small businesses ready to convert visitors.",
    features: [
      "Custom landing page or 3-page site",
      "Mobile-first responsive design",
      "Performance & speed optimization",
      "Basic SEO & meta structure",
      "Contact / lead capture setup",
      "2–3 week delivery",
    ],
    cta: "Book a Free Consultation",
    featured: false,
  },
  {
    name: "Professional",
    price: "₹24,999",
    scope: "Custom Business Websites with CMS & SEO",
    description:
      "The choice for growing businesses that need a brand-defining site with content control, search visibility, and polish.",
    features: [
      "Up to 10 custom-designed pages",
      "CMS integration & content model",
      "Advanced SEO, schema & analytics",
      "Motion design & interactions",
      "Brand UI system & components",
      "4–6 week delivery",
    ],
    cta: "Book a Free Consultation",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom Quote",
    scope: "Web Applications, AI Automation, Custom Software",
    description:
      "Bespoke platforms, internal tools, and intelligent automation for businesses solving complex problems at scale.",
    features: [
      "Full-stack web applications",
      "AI automation & workflow agents",
      "Custom dashboards & internal tools",
      "APIs, integrations & databases",
      "Dedicated senior team & SLA",
      "Ongoing support & iteration",
    ],
    cta: "Request a Custom Quote",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="plans" className="relative py-28 md:py-40">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[color:var(--violet)]/10 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[color:var(--cyan)]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
      <SectionHeader
          eyebrow="Plans"
          title="Investment that scales with your ambition."
          description="No cookie-cutter packages. Every engagement is scoped around outcomes — built to perform, designed to last."
          center
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`group relative flex flex-col rounded-[2rem] border p-8 md:p-10 transition-all duration-500 ${
                t.featured
                  ? "glass border-[color:var(--violet)]/30 bg-gradient-to-b from-[color:var(--violet)]/[0.07] via-surface/60 to-background shadow-[0_0_60px_-20px_rgba(109,94,248,0.25)]"
                  : "border-hairline bg-surface/40 hover:border-white/15 hover:bg-surface/60"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-4 left-10 rounded-full border border-[color:var(--violet)]/40 bg-background px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--violet)] shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {t.name}
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground">Starting from</span>
                  <span className="font-display text-5xl md:text-6xl tracking-tight">
                    {t.price}
                  </span>
                </div>

                <p className="mt-2 text-sm font-medium text-foreground/90">
                  {t.scope}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {t.description}
                </p>

                <ul className="mt-8 space-y-3.5 border-t border-hairline pt-6">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                          t.featured
                            ? "bg-[color:var(--violet)]/20 text-[color:var(--violet)]"
                            : "bg-surface-elevated text-muted-foreground"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-col gap-3">
                <a
                  href="#contact"
                  className={`group/btn inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition ${
                    t.featured
                      ? "bg-foreground text-background hover:opacity-90"
                      : "border border-hairline text-foreground hover:bg-surface hover:border-white/20"
                  }`}
                >
                  <Calendar size={16} />
                  {t.cta}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </a>
                {!t.featured && (
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    <FileText size={16} />
                    Request a Custom Quote
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          Every project is custom-built. Final pricing depends on features, integrations, and project scope.
        </motion.p>
      </div>
    </section>
  );
}
