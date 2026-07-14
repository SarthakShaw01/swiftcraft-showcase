import { openBookCall } from "./nav-actions";

const columns = [
  {
    title: "Studio",
    links: [
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "#services" },
      { label: "UI/UX Design", href: "#services" },
      { label: "Custom Software", href: "#services" },
      { label: "AI Automation", href: "#services" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "sarthak@swiftcraftstudios.in", href: "mailto:sarthak@swiftcraftstudios.in" },
      { label: "Book a call", href: "#book-a-call", action: "book" as const },
      { label: "Twitter / X", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-hairline">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-md bg-foreground text-background">
                <span className="font-display text-lg leading-none">S</span>
              </span>
              <span className="text-base font-medium">SwiftCraft Studios</span>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              A premium digital studio building products, sites and automations for teams that care about the craft.
            </p>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {c.title}
              </div>
              <ul className="mt-5 space-y-3 text-sm">
                {c.links.map((l) => (
                  <li key={l.label}>
                    {"action" in l && l.action === "book" ? (
                      <button
                        type="button"
                        onClick={openBookCall}
                        className="text-left text-foreground/80 transition hover:text-foreground"
                      >
                        {l.label}
                      </button>
                    ) : (
                      <a
                        href={l.href}
                        className="text-foreground/80 transition hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div aria-hidden className="mt-20 select-none">
          <div className="font-display text-[18vw] leading-none text-transparent [background:linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))] bg-clip-text">
            SwiftCraft
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} SwiftCraft Studios. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Q3 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
