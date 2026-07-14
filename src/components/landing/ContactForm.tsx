import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Mail, Phone, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const SERVICES = [
  "Landing Page", "Business Website", "E-commerce", "Web Application",
  "Mobile App", "UI/UX Design", "Branding & Identity", "Custom Software",
  "AI Automation", "AI Chatbot", "SEO Optimization", "Performance Audit",
  "CMS Integration", "API Development", "Database Design", "DevOps & Hosting",
  "Maintenance & Support", "Content Strategy", "Motion Design", "3D & Interactive",
  "Consulting", "Other",
];

const BUDGETS = [
  "Under ₹25,000", "₹25,000 – ₹75,000", "₹75,000 – ₹2,00,000",
  "₹2,00,000 – ₹5,00,000", "₹5,00,000 – ₹15,00,000", "₹15,00,000+", "Not sure yet",
];

const schema = z.object({
  name: z.string().trim().min(1).max(160),
  company: z.string().trim().max(160).optional(),
  email: z.string().trim().email().max(255),
  mobile: z.string().trim().min(3).max(40),
  whatsapp: z.string().trim().max(40).optional(),
  industry: z.string().trim().max(120).optional(),
  website: z.string().trim().max(255).optional(),
  services: z.array(z.string()).min(1).max(25),
  description: z.string().trim().min(10).max(5000),
  budget: z.string().min(1),
  contact_method: z.string().min(1),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  additional_notes: z.string().trim().max(3000).optional(),
});

export function ContactForm() {
  const [services, setServices] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const payload = {
      ...raw,
      services,
      company: raw.company || undefined,
      whatsapp: raw.whatsapp || undefined,
      industry: raw.industry || undefined,
      website: raw.website || undefined,
      preferred_date: raw.preferred_date || undefined,
      preferred_time: raw.preferred_time || undefined,
      additional_notes: raw.additional_notes || undefined,
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please review the form.");
      return;
    }
    setSubmitting(true);
    const { error: dbError } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      company: parsed.data.company ?? null,
      email: parsed.data.email,
      mobile: parsed.data.mobile,
      whatsapp: parsed.data.whatsapp ?? null,
      industry: parsed.data.industry ?? null,
      website: parsed.data.website ?? null,
      services: parsed.data.services,
      description: parsed.data.description,
      budget: parsed.data.budget,
      contact_method: parsed.data.contact_method,
      preferred_date: parsed.data.preferred_date || null,
      preferred_time: parsed.data.preferred_time || null,
      additional_notes: parsed.data.additional_notes ?? null,
    });
    setSubmitting(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    setSuccess(true);
    (e.target as HTMLFormElement).reset();
    setServices([]);
  }

  return (
    <section className="relative py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[color:var(--violet)]/15 blur-[130px]" />
        <div className="absolute -right-40 top-1/2 h-[420px] w-[420px] rounded-full bg-[color:var(--cyan)]/10 blur-[130px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Contact</div>
          <h1 className="mt-4 font-display text-5xl leading-[0.98] sm:text-6xl">
            Let's build{" "}
            <span className="italic bg-gradient-to-r from-[color:var(--violet)] to-[color:var(--cyan)] bg-clip-text text-transparent">
              something great.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            Share a few details and we'll come back within one business day with a plan,
            honest opinions and next steps.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <a href="mailto:sarthak@swiftcraftstudios.in" className="flex items-center gap-3 text-foreground/80 hover:text-foreground">
              <Mail size={16} /> sarthak@swiftcraftstudios.in
            </a>
            <a href="tel:+919875393854" className="flex items-center gap-3 text-foreground/80 hover:text-foreground">
              <Phone size={16} /> +91 98753 93854
            </a>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Sparkles size={16} /> Available for Q3 2026 · 2 slots left
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-3xl border border-hairline p-10 md:p-14"
            >
              <div className="grid size-14 place-items-center rounded-full bg-[color:var(--violet)]/20 text-[color:var(--cyan)]">
                <Check size={24} />
              </div>
              <h2 className="mt-6 font-display text-4xl">Thank you — message received.</h2>
              <p className="mt-4 text-muted-foreground">
                We've saved your enquiry and will get back within one business day at the contact
                you provided. Keep an eye on your inbox.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-8 inline-flex rounded-full border border-hairline px-5 py-2.5 text-sm hover:bg-white/5"
              >
                Send another enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={onSubmit}
              className="glass rounded-3xl border border-hairline p-6 md:p-10 space-y-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full name *" name="name" required />
                <Field label="Company name" name="company" />
                <Field label="Email *" name="email" type="email" required />
                <Field label="Mobile number *" name="mobile" type="tel" required />
                <Field label="WhatsApp number" name="whatsapp" type="tel" />
                <Field label="Business / Industry" name="industry" />
                <Field label="Website" name="website" className="md:col-span-2" />
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Services you're interested in *</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggle(s)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                        services.includes(s)
                          ? "border-[color:var(--violet)] bg-[color:var(--violet)]/15 text-foreground"
                          : "border-hairline text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <Field label="Project details *" name="description" as="textarea" rows={5} required />

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm text-muted-foreground">Budget *</label>
                  <select name="budget" required className="mt-2 w-full rounded-xl border border-hairline bg-background/50 px-4 py-3 text-sm">
                    <option value="">Select a range</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Preferred contact method *</label>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    {["Email", "Phone", "WhatsApp"].map((m) => (
                      <label key={m} className="inline-flex items-center gap-2">
                        <input type="radio" name="contact_method" value={m} required className="accent-[color:var(--violet)]" />
                        {m}
                      </label>
                    ))}
                  </div>
                </div>
                <Field label="Preferred date" name="preferred_date" type="date" />
                <Field label="Preferred time" name="preferred_time" type="time" />
              </div>

              <Field label="Additional requirements" name="additional_notes" as="textarea" rows={3} />

              {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                {submitting ? "Sending..." : "Send enquiry"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Field({
  label, name, type = "text", required, as, rows, className,
}: {
  label: string; name: string; type?: string; required?: boolean;
  as?: "textarea"; rows?: number; className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm text-muted-foreground">{label}</label>
      {as === "textarea" ? (
        <textarea name={name} rows={rows} required={required}
          className="mt-2 w-full rounded-xl border border-hairline bg-background/50 px-4 py-3 text-sm outline-none focus:border-[color:var(--violet)]" />
      ) : (
        <input name={name} type={type} required={required}
          className="mt-2 w-full rounded-xl border border-hairline bg-background/50 px-4 py-3 text-sm outline-none focus:border-[color:var(--violet)]" />
      )}
    </div>
  );
}
