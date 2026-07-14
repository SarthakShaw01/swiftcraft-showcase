import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — SwiftCraft Studios" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate({ to: "/admin" }); });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(null); setBusy(true);
    const fn = mode === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    const { error } = await fn; setBusy(false);
    if (error) setError(error.message); else navigate({ to: "/admin" });
  }

  return (
    <div className="min-h-screen grid place-items-center px-6">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-3xl border border-hairline p-8">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Admin</div>
        <h1 className="mt-3 font-display text-4xl">{mode === "signin" ? "Welcome back." : "Create admin account."}</h1>
        <div className="mt-8 space-y-4">
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-background/50 px-4 py-3 text-sm outline-none focus:border-[color:var(--violet)]" />
          <input type="password" required minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-background/50 px-4 py-3 text-sm outline-none focus:border-[color:var(--violet)]" />
        </div>
        {error && <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</div>}
        <button disabled={busy} className="mt-6 w-full rounded-full bg-foreground py-3 text-sm font-medium text-background disabled:opacity-60">
          {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground">
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
        <p className="mt-6 text-xs text-muted-foreground">The first account created becomes the admin automatically.</p>
      </form>
    </div>
  );
}
