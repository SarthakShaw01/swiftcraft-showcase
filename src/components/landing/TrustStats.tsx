import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 80, suffix: "+", label: "Happy clients" },
  { value: 7, suffix: "yrs", label: "In the craft" },
  { value: 24, suffix: "/7", label: "Client support" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      <span className="text-muted-foreground">{suffix}</span>
    </span>
  );
}

export function TrustStats() {
  return (
    <section className="relative border-y border-hairline bg-surface/30">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-hairline px-6 md:grid-cols-4 md:divide-x">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="py-10 md:py-14 md:px-8"
          >
            <div className="font-display text-5xl md:text-6xl">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
