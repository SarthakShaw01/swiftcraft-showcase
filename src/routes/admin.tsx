import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Download, LogOut, Search, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — SwiftCraft Studios" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Enquiry = {
  id: string; name: string; company: string | null; email: string; mobile: string;
  whatsapp: string | null; industry: string | null; website: string | null;
  services: string[]; budget: string; contact_method: string;
  preferred_date: string | null; preferred_time: string | null;
  description: string; additional_notes: string | null;
  status: string; created_at: string;
};

const STATUSES = ["new", "contacted", "in_progress", "won", "lost"];

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [q, setQ] = useState(""); const [status, setStatus] = useState("all");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [active, setActive] = useState<Enquiry | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { navigate({ to: "/auth" }); return; }
      await load(); setReady(true);
    })();
  }, [navigate]);

  async function load() {
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) { alert(error.message); return; }
    setRows((data ?? []) as Enquiry[]);
  }

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    let out = rows.filter((r) =>
      (status === "all" || r.status === status) &&
      (!term || [r.name, r.email, r.mobile, r.company, r.industry, r.description].some((v) => v?.toLowerCase().includes(term)))
    );
    out.sort((a, b) => sort === "newest"
      ? +new Date(b.created_at) - +new Date(a.created_at)
      : +new Date(a.created_at) - +new Date(b.created_at));
    return out;
  }, [rows, q, status, sort]);

  async function updateStatus(id: string, s: string) {
    const { error } = await supabase.from("enquiries").update({ status: s }).eq("id", id);
    if (error) alert(error.message); else load();
  }
  async function remove(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) alert(error.message); else { setActive(null); load(); }
  }

  function exportXlsx() {
    const ws = XLSX.utils.json_to_sheet(filtered.map((r) => ({
      ...r, services: r.services.join(", "),
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
    XLSX.writeFile(wb, `swiftcraft-enquiries-${new Date().toISOString().slice(0, 10)}.xlsx`);
  }
  function exportCsv() {
    const ws = XLSX.utils.json_to_sheet(filtered.map((r) => ({ ...r, services: r.services.join(", ") })));
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `swiftcraft-enquiries-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  }
  async function signOut() { await supabase.auth.signOut(); navigate({ to: "/auth" }); }

  if (!ready) return <div className="min-h-screen grid place-items-center text-sm text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-md bg-foreground text-background font-display">S</span>
            <div>
              <div className="text-sm font-medium">SwiftCraft Admin</div>
              <div className="text-xs text-muted-foreground">{rows.length} enquiries</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-xs hover:bg-white/5">
              <Download size={14} /> CSV
            </button>
            <button onClick={exportXlsx} className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs text-background">
              <Download size={14} /> Excel
            </button>
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-xs hover:bg-white/5">
              <LogOut size={14} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, message…"
              className="w-full rounded-full border border-hairline bg-background/50 pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[color:var(--violet)]" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="rounded-full border border-hairline bg-background/50 px-4 py-2.5 text-sm">
            <option value="all">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className="rounded-full border border-hairline bg-background/50 px-4 py-2.5 text-sm">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-left">Budget</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Received</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-hairline hover:bg-white/5 cursor-pointer" onClick={() => setActive(r)}>
                  <td className="p-4">
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.company ?? "—"}</div>
                  </td>
                  <td className="p-4">{r.email}</td>
                  <td className="p-4">{r.mobile}</td>
                  <td className="p-4">{r.budget}</td>
                  <td className="p-4" onClick={(e) => e.stopPropagation()}>
                    <select value={r.status} onChange={(e) => updateStatus(r.id, e.target.value)}
                      className="rounded-full border border-hairline bg-background/50 px-3 py-1 text-xs">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-4 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => remove(r.id)} className="text-red-300 hover:text-red-200"><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="p-10 text-center text-muted-foreground">No enquiries match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur p-6" onClick={() => setActive(null)}>
          <div className="glass max-w-2xl w-full max-h-[85vh] overflow-auto rounded-3xl border border-hairline p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl">{active.name}</h2>
                <div className="mt-1 text-sm text-muted-foreground">{active.company ?? "Individual"} · {active.industry ?? "—"}</div>
              </div>
              <button onClick={() => setActive(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            <div className="mt-6 grid gap-3 text-sm md:grid-cols-2">
              <Info k="Email" v={active.email} />
              <Info k="Mobile" v={active.mobile} />
              <Info k="WhatsApp" v={active.whatsapp} />
              <Info k="Website" v={active.website} />
              <Info k="Budget" v={active.budget} />
              <Info k="Contact via" v={active.contact_method} />
              <Info k="Preferred date" v={active.preferred_date} />
              <Info k="Preferred time" v={active.preferred_time} />
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Services</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {active.services.map((s) => <span key={s} className="rounded-full border border-hairline px-3 py-1 text-xs">{s}</span>)}
              </div>
            </div>
            <div className="mt-6">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Project details</div>
              <p className="mt-2 whitespace-pre-wrap text-sm">{active.description}</p>
            </div>
            {active.additional_notes && (
              <div className="mt-6">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Additional</div>
                <p className="mt-2 whitespace-pre-wrap text-sm">{active.additional_notes}</p>
              </div>
            )}
            <div className="mt-8 flex justify-between">
              <button onClick={() => remove(active.id)} className="inline-flex items-center gap-2 rounded-full border border-red-500/40 px-4 py-2 text-xs text-red-200 hover:bg-red-500/10">
                <Trash2 size={14} /> Delete
              </button>
              <a href={`mailto:${active.email}`} className="rounded-full bg-foreground px-4 py-2 text-xs text-background">Reply via email</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({ k, v }: { k: string; v: string | null | undefined }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
      <div className="mt-1">{v || "—"}</div>
    </div>
  );
}
