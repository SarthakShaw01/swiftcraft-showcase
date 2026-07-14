## Scope

Major upgrade to SwiftCraft Studios. Preserve the existing dark premium design, typography, animations, and every landing section. Split into a true multi-page site, expand the consultation form, and add a secured admin dashboard backed by Lovable Cloud.

## 1. Multi-page routing

Convert the single-page landing into dedicated routes with shared `Nav` + `Footer` and smooth Framer Motion page transitions:

- `/` — Home (Hero, TrustStats, teaser Services grid, featured Work, Testimonials, FinalCTA)
- `/services` — Full Services grid + TechStack
- `/work` — FeaturedWork expanded
- `/process` — Process timeline + WhyUs
- `/plans` — Pricing (renamed section)
- `/about` — WhyUs narrative + TechStack + team/values copy
- `/contact` — Full premium consultation form (below)
- `/admin/login` and `/admin` — Admin panel (auth-gated)

Nav updates to real `<Link>` routes. Each route gets its own `head()` with unique title/description/OG. `__root.tsx` wraps `<Outlet />` with an `AnimatePresence` fade+slide.

## 2. Consultation form (`/contact`)

Replace the current `BookCallDialog` fields with the full premium form:

- Full Name, Company (opt), Email, Mobile, WhatsApp (opt), Business/Industry, Website (opt)
- **Services** — multi-select chips (all 21 options listed)
- Project Description (large textarea)
- Budget dropdown (6 options)
- Preferred Contact Method (radio: Phone / WhatsApp / Email / Google Meet)
- Preferred Date (calendar) + Preferred Time (time picker)
- Additional Requirements (textarea)

Validated with Zod. Existing "Book a call" buttons across the site route to `/contact` (dialog removed for consistency; keeps tel: link in nav CTA optional).

On submit: insert into DB, show premium success state with the specified thank-you message.

## 3. Database

New table `enquiries` (replaces `consultation_requests`):

- name, company, email, mobile, whatsapp, industry, website
- services text[], budget, contact_method
- preferred_date date, preferred_time time
- description, additional_notes
- status enum (`new`, `contacted`, `meeting_scheduled`, `proposal_sent`, `in_progress`, `closed`) default `new`
- created_at, updated_at

RLS: anon+authenticated can INSERT (with validation checks). Only admins can SELECT/UPDATE/DELETE.

Roles: `app_role` enum + `user_roles` table + `has_role()` security-definer function (per the standard pattern).

## 4. Admin authentication

- Supabase email/password auth (no signup on the public site).
- `/admin/login` page.
- `/admin` route protected via `_authenticated` layout + role check (`has_role(uid, 'admin')`).
- First admin: seeded via SQL after user creates their auth account (I'll give instructions).

## 5. Admin dashboard

Premium dark dashboard at `/admin`:

- Stat cards: total enquiries, new this week, by status, top services
- Simple bar chart (enquiries per day, last 30 days) using existing Recharts
- Table: newest first, search (name/email/company), filters (status, service, date range), sort
- Row click → detail drawer with full enquiry + status dropdown + delete
- Export selected/filtered as CSV and XLSX (client-side via `xlsx` package)

## 6. Email notifications (architecture only)

Add TODO stubs in the submit server function and a `sendEnquiryEmails()` helper marked `// TODO: wire Lovable Emails`. No sending yet, per request.

## 7. Preserved

All existing components, tokens, fonts, glass utilities, animations, brand copy, contact info (`sarthak@swiftcraftstudios.in`, `+91 98753 93854`) stay intact.

---

## Technical notes

- New deps: `xlsx` for exports, `recharts` if not already present.
- Migration will DROP `consultation_requests` (replaced by richer `enquiries`) unless you want it kept.
- Admin uses standard `user_roles` + `has_role` pattern (no roles on profiles).
- Page transitions: `AnimatePresence` around `<Outlet />` keyed by pathname; 250ms fade + 8px translateY.

Confirm and I'll build it end-to-end. Two quick checks:

1. **Drop `consultation_requests`** and migrate to the new `enquiries` table? (existing submissions would be lost — table is currently empty unless you've tested it.)
2. **Admin email** — what email should I seed as the first admin? You'll set the password on first login.