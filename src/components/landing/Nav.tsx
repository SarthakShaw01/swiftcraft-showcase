import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/process", label: "Process" },
  { to: "/plans", label: "Plans" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        <div
          className={`flex flex-1 items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2 font-medium tracking-tight">
            <span className="grid size-7 place-items-center rounded-md bg-foreground text-background">
              <span className="font-display text-base leading-none">S</span>
            </span>
            <span className="text-sm">SwiftCraft<span className="text-muted-foreground"> Studios</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.slice(1, -1).map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: true }}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground data-[status=active]:text-foreground data-[status=active]:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
            >
              Book a call
              <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid size-9 place-items-center rounded-full border border-hairline"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-6 mt-3 glass rounded-2xl p-4"
          >
            <nav className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-3 py-3 text-sm text-muted-foreground hover:text-foreground border-b border-hairline last:border-0"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background"
              >
                Book a call →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
