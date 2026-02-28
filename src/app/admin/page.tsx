"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Lead = {
  id: string;
  session_id: string;
  website: string | null;
  email: string | null;
  progress: number;
  completed: boolean;
  answers: unknown;
  created_at: string;
  updated_at: string;
  last_seen_at: string;
};

export default function AdminPage() {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [rows, setRows] = useState<Lead[]>([]);
  const [q, setQ] = useState("");

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${pw}` },
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(json?.message || `HTTP ${res.status}`);
      }
      setRows(json.data || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Error";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) => {
      const hay = `${r.website || ""} ${r.email || ""} ${r.session_id || ""}`.toLowerCase();
      return hay.includes(needle);
    });
  }, [rows, q]);

  async function downloadCsv() {
    const res = await fetch("/api/admin/leads.csv", {
      headers: { Authorization: `Bearer ${pw}` },
    });
    if (!res.ok) {
      alert("Грешка при export. Провери паролата.");
      return;
    }
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw") || "";
    if (saved) setPw(saved);
  }, []);

  useEffect(() => {
    if (pw) sessionStorage.setItem("admin_pw", pw);
  }, [pw]);

  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-24">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--stroke)] bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)] ring-1 ring-[color:var(--stroke)]" />
            <div className="font-semibold tracking-tight text-[color:var(--text)]">Admin</div>
          </div>
          <Link
            className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)]"
            href="/"
          >
            ← към сайта
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <div className="rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex-1">
              <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Парола</div>
              <input
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="ADMIN_PASSWORD"
                className="mt-2 w-full rounded-xl border border-[color:var(--stroke)] bg-white px-4 py-3 text-sm text-[color:var(--text)] placeholder:text-[color:var(--muted)]"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={load}
                disabled={!pw || loading}
                className="rounded-xl bg-[color:var(--accent)] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.18)] disabled:opacity-60"
              >
                {loading ? "Зареждам…" : "Зареди"}
              </button>
              <button
                onClick={downloadCsv}
                disabled={!pw || loading}
                className="rounded-xl border border-[color:var(--stroke)] bg-white px-4 py-3 text-sm font-semibold text-[color:var(--text)] shadow-sm disabled:opacity-60"
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Търси по сайт / имейл / session…"
              className="w-full rounded-xl border border-[color:var(--stroke)] bg-white px-4 py-3 text-sm text-[color:var(--text)] placeholder:text-[color:var(--muted)] md:max-w-md"
            />
            <div className="text-sm text-[color:var(--muted)]">Записи: {filtered.length}</div>
          </div>

          {err ? <div className="mt-4 text-sm text-red-600">{err}</div> : null}

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="text-left text-[color:var(--muted)]">
                  <th className="px-3">Email</th>
                  <th className="px-3">Website</th>
                  <th className="px-3">Progress</th>
                  <th className="px-3">Completed</th>
                  <th className="px-3">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="rounded-xl bg-white shadow-sm">
                    <td className="px-3 py-3 text-[color:var(--text)]">{r.email || "—"}</td>
                    <td className="px-3 py-3 text-[color:var(--text)]">{r.website || "—"}</td>
                    <td className="px-3 py-3 text-[color:var(--text)]">{r.progress}</td>
                    <td className="px-3 py-3 text-[color:var(--text)]">{r.completed ? "yes" : "no"}</td>
                    <td className="px-3 py-3 text-[color:var(--muted)]">{new Date(r.updated_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
