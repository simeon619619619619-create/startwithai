"use client";

import Link from "next/link";
import IntakeBar from "@/components/IntakeBar";

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--stroke)] bg-white">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link
            href="/"
            className="hidden text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)] md:inline-flex"
            aria-label="Назад към начална страница"
          >
            ← Начало
          </Link>
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 bg-[color:var(--accent)] ring-1 ring-[color:var(--stroke)]" />
            <div className="font-semibold tracking-tight text-[color:var(--text)]">Програма „Интелигентен растеж“</div>
          </Link>

          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] md:flex">
            <Link className="hover:text-[color:var(--text)]" href="/program">Програма</Link>
            <Link className="hover:text-[color:var(--text)]" href="/process">Процес</Link>
            <Link className="hover:text-[color:var(--text)]" href="/questions">Въпроси</Link>
            <Link className="hover:text-[color:var(--text)]" href="/news">Новини</Link>
            <Link className="hover:text-[color:var(--text)]" href="/contact">Контакти</Link>
          </nav>
        </div>

        <div className="pb-4">
          <IntakeBar compact />
        </div>
      </div>
    </header>
  );
}
