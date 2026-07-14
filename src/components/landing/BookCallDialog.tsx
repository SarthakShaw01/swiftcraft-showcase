import { useEffect, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, CalendarClock, ArrowUpRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const BOOK_CALL_EVENT = "swiftcraft:open-book-call";

export function openBookCall() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(BOOK_CALL_EVENT));
  }
}

const PURPOSE_OPTIONS = [
  "Web Development",
  "UI/UX Design",
  "Custom Software",
  "AI Automation",
  "SEO & Growth",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under ₹25,000",
  "₹25,000 – ₹75,000",
  "₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000",
  "₹5,00,000+",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

export function BookCallDialog() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [purposes, setPurposes] = useState<string[]>([]);
  const [preferred, setPreferred] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = () => {
      setStatus("idle");
      setError(null);
      setOpen(true);
    };
    window.addEventListener(BOOK_CALL_EVENT, handler);
    return () => window.removeEventListener(BOOK_CALL_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const togglePurpose = (p: string) => {
    setPurposes((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setBudget("");
    setPurposes([]);
    setPreferred("");
    setMessage("");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !phone.trim() || !budget || purposes.length === 0) {
      setError("Please fill in your name, email, phone, budget and at least one purpose.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    const { error: insertError } = await supabase
      .from("consultation_requests")
      .insert({
        name: name.trim().slice(0, 120),
        email: email.trim().slice(0, 255),
        phone: phone.trim().slice(0, 40),
        budget: budget.slice(0, 80),
        purposes: purposes.slice(0, 10),
        preferred_datetime: preferred ? new Date(preferred).toISOString() : null,
        message: message.trim() ? message.trim().slice(0, 2000) : null,
      });

    if (insertError) {
      console.error(insertError);
      setStatus("error");
      setError("Something went wrong. Please try again or email us directly.");
      return;
    }

    setStatus("success");
    reset();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/70 backdrop-blur-md p-0 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-t-[2rem] border border-hairline bg-surface shadow-2xl sm:rounded-[2rem]"
          >
            {/* ambient glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[color:var(--violet)]/25 blur-[110px]" />
              <div className="absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-[color:var(--cyan)]/15 blur-[110px]" />
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-hairline bg-background/60 text-muted-foreground transition hover:text-foreground"
            >
              <X size={16} />
            </button>

            <div className="relative max-h-[92vh] overflow-y-auto p-6 sm:p-10">
              {status === "success" ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="grid size-14 place-items-center rounded-full bg-[color:var(--violet)]/15 text-[color:var(--violet)]">
                    <Check size={26} />
                  </div>
                  <h3 className="mt-6 font-display text-3xl sm:text-4xl">Request received.</h3>
                  <p className="mt-3 max-w-md text-sm text-muted-foreground">
                    Thanks — we'll review your project and reach out within one business day at your preferred time.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90"
                  >
                    Close
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <CalendarClock size={12} />
                      Book a call
                    </div>
                    <h3 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
                      Tell us about your project.
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      A few quick details so we can prepare for our call. We reply within one business day.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        maxLength={120}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        maxLength={255}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Mobile number" required>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98753 93854"
                        maxLength={40}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Budget" required>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select a range</option>
                        {BUDGET_OPTIONS.map((b) => (
                          <option key={b} value={b} className="bg-background">
                            {b}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="What do you need help with?" required>
                    <div className="flex flex-wrap gap-2">
                      {PURPOSE_OPTIONS.map((p) => {
                        const active = purposes.includes(p);
                        return (
                          <button
                            type="button"
                            key={p}
                            onClick={() => togglePurpose(p)}
                            className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                              active
                                ? "border-[color:var(--violet)]/50 bg-[color:var(--violet)]/15 text-foreground"
                                : "border-hairline bg-background/40 text-muted-foreground hover:text-foreground hover:border-white/20"
                            }`}
                          >
                            {active && <Check size={12} className="mr-1.5 inline" strokeWidth={3} />}
                            {p}
                          </button>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="Best time to contact you">
                    <input
                      type="datetime-local"
                      value={preferred}
                      onChange={(e) => setPreferred(e.target.value)}
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                  </Field>

                  <Field label="Anything else? (optional)">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      maxLength={2000}
                      placeholder="A few lines about your goals, timeline, or references you love."
                      className={`${inputClass} resize-none`}
                    />
                  </Field>

                  {error && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                      {error}
                    </div>
                  )}

                  <div className="flex flex-col-reverse items-center gap-3 pt-2 sm:flex-row sm:justify-between">
                    <p className="text-[11px] text-muted-foreground">
                      We reply within 1 business day. Your details stay private.
                    </p>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60 sm:w-auto"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Request consultation
                          <ArrowUpRight
                            size={16}
                            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputClass =
  "w-full rounded-xl border border-hairline bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition focus:border-[color:var(--violet)]/50 focus:bg-background/80";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label} {required && <span className="text-[color:var(--violet)]">*</span>}
      </span>
      {children}
    </label>
  );
}
