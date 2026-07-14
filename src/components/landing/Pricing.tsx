import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Services";

const tiers = [
  {
    name: "Launch",
    price: "$2,900",
    cadence: "one-time",
    tagline: "For founders who need a beautiful presence, fast.",
    features: [
      "Landing page or 3-page site",
      "Custom design in Figma",
      "Responsive build in React",
      "Basic SEO + analytics",
      "2 weeks delivery",
    ],
    cta: "Start a project",
    featured: false,
  },
  {
    name: "Studio",
    price: "$7,500",
    cadence: "starting at",
    tagline: "Full marketing sites and product surfaces, end-to-end.",
    features: [
      "Up to 10 custom pages",
      "Brand-level UI system",
      "CMS or content model",
      "Animations & interactions",
      "Advanced SEO + schema",
      "4–6 weeks delivery",
    ],
    cta: "Book a consultation",
    featured: true,
  },
  {
    name: "Partner",
    price: "Custom",
    cadence: "monthly retainer",
    tagline: "An embedded studio for ongoing product & growth work.",
    features: [
      "Dedicated senior team",
      "Design, engineering & AI",
      "Weekly ship cadence",
      "Roadmap & strategy calls",
      "Priority support (24/7)",
      "Month-to-month",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <SectionHeader
          eyebrow="Pricing"
          title="Honest pricing. No surprises."
          description="Fixed-scope engagements or ongoing partnerships — pick the shape that fits."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative flex flex-col rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1 ${
                t.featured
                  ? "border-[color:var(--violet)]/40 bg-gradient-to-b from-[color:var(--violet)]/[0.08] to-transparent"
                  : "border-hairline bg-surface/50 hover:border-white/20"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-8 rounded-full border border-[color:var(--violet)]/40 bg-background px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--violet)]">
                  Most popular
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="font-display text-2xl">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.cadence}
                </div>
              </div>

              <div className="mt-6 font-display text-6xl">{t.price}</div>
              <p className="mt-3 text-sm text-muted-foreground">{t.tagline}</p>

              <ul className="mt-8 space-y-3 border-t border-hairline pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${
                        t.featured
                          ? "bg-[color:var(--violet)]/20 text-[color:var(--violet)]"
                          : "bg-surface-elevated text-muted-foreground"
                      }`}
                    >
                      <Check size={12} />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`group/btn mt-10 inline-flex items-center justify-between rounded-full px-5 py-3 text-sm font-medium transition ${
                  t.featured
                    ? "bg-foreground text-background hover:opacity-90"
                    : "border border-hairline text-foreground hover:bg-surface"
                }`}
              >
                {t.cta}
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          All plans include senior design & engineering. Prices shown in USD, excl. taxes.
        </p>
      </div>
    </section>
  );
}
