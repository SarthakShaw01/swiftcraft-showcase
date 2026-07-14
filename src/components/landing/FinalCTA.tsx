import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { openBookCall } from "./BookCallDialog";

export function FinalCTA() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-hairline bg-surface p-10 md:p-20"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[color:var(--violet)]/25 blur-[130px]" />
            <div className="absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-[color:var(--cyan)]/15 blur-[120px]" />
            <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/40 px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-[color:var(--cyan)] animate-pulse" />
              Taking on 2 new projects this quarter
            </div>

            <h2 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-balance sm:text-6xl md:text-[92px]">
              Let's build something{" "}
              <span className="italic bg-gradient-to-r from-[color:var(--violet)] to-[color:var(--cyan)] bg-clip-text text-transparent">
                extraordinary.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
              Tell us what you're building. We'll come back within one business day with an honest opinion.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={openBookCall}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Book consultation
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <button
                type="button"
                onClick={openBookCall}
                className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-background/70"
              >
                Get a quote
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
