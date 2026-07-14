import { motion } from "framer-motion";
import { SectionHeader } from "./Services";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Meridian Capital",
    industry: "Fintech",
    tech: ["Next.js", "TypeScript", "Postgres"],
    result: "+62% qualified leads in Q1",
    tint: "from-[#6D5EF8]/40 to-[#3DD9EB]/20",
    year: "2025",
  },
  {
    name: "Kōji Ramen House",
    industry: "Hospitality",
    tech: ["React", "Tailwind", "Sanity"],
    result: "3.4× online reservations",
    tint: "from-[#f97316]/40 to-[#eab308]/10",
    year: "2025",
  },
  {
    name: "Northline Realty",
    industry: "Real Estate",
    tech: ["Next.js", "Supabase", "Mapbox"],
    result: "12min → 40s time-to-listing",
    tint: "from-[#3DD9EB]/40 to-[#22d3ee]/10",
    year: "2024",
  },
  {
    name: "Halo Aesthetics",
    industry: "Clinic",
    tech: ["React", "Framer Motion"],
    result: "+118% bookings YoY",
    tint: "from-[#ec4899]/35 to-[#6D5EF8]/20",
    year: "2024",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Selected work"
            title="Case studies that speak for themselves."
          />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            View all projects <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface/50 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
            >
              {/* Screenshot area */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.tint}`} />
                <div className="absolute inset-0 bg-[radial-gradient(600px_300px_at_50%_120%,rgba(0,0,0,0.6),transparent)]" />
                {/* Faux UI */}
                <div className="absolute inset-6 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-xl transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="size-2 rounded-full bg-white/20" />
                    <span className="ml-3 text-[10px] text-white/40 font-mono">{p.name.toLowerCase().replace(/[^a-z]/g, "")}.com</span>
                  </div>
                  <div className="mt-6 space-y-2">
                    <div className="h-2 w-1/3 rounded-full bg-white/20" />
                    <div className="h-6 w-3/4 rounded-md bg-white/15" />
                    <div className="h-3 w-2/3 rounded-full bg-white/10" />
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    <div className="aspect-square rounded-lg bg-white/10" />
                    <div className="aspect-square rounded-lg bg-white/[0.06]" />
                    <div className="aspect-square rounded-lg bg-white/10" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 p-7">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <span>{p.industry}</span>
                  <span className="font-mono">{p.year}</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl">{p.name}</h3>
                  <ArrowUpRight
                    size={20}
                    className="mt-1 shrink-0 -translate-y-1 opacity-40 transition-all duration-300 group-hover:-translate-y-0 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-hairline px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-2 border-t border-hairline pt-4 text-sm">
                  <span className="text-muted-foreground">Result — </span>
                  <span className="text-foreground">{p.result}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
