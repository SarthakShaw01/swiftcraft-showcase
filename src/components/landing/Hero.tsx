import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const words = ["engineer", "design", "ship", "scale"];

export function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-28 md:pt-48 md:pb-40">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-24 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[color:var(--violet)]/25 blur-[140px] animate-float-slow" />
        <div className="absolute right-[-10%] top-[40%] h-[380px] w-[380px] rounded-full bg-[color:var(--cyan)]/15 blur-[130px] animate-float-slower" />
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(109,94,248,0.14),transparent_60%)]" />
        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-hairline bg-surface/50 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur"
        >
          <Sparkles size={12} className="text-[color:var(--violet)]" />
          A digital studio for ambitious teams
        </motion.div>

        <h1 className="mt-8 text-center font-display text-5xl leading-[0.95] text-balance sm:text-7xl md:text-[112px]">
          {["We", "engineer", "digital", "products"].map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mr-3 inline-block"
            >
              {w}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="italic text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--violet)] to-[color:var(--cyan)]"
          >
            that scale.
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-8 max-w-2xl text-center text-base text-muted-foreground text-balance sm:text-lg"
        >
          SwiftCraft Studios is a boutique product agency crafting premium websites,
          bespoke software, and AI automations for teams that ship serious work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
          >
            Book a free consultation
            <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/40 px-6 py-3.5 text-sm font-medium text-foreground backdrop-blur transition hover:bg-surface"
          >
            View our work
          </a>
        </motion.div>

        {/* Marquee word list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 flex items-center justify-center gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground/70"
        >
          {words.map((w, i) => (
            <span key={i} className="flex items-center gap-6">
              {w}
              {i < words.length - 1 && <span className="size-1 rounded-full bg-muted-foreground/40" />}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
