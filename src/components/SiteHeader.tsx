"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import IntakeBar from "@/components/IntakeBar";

export default function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:rgba(255,255,255,0.18)] bg-[color:var(--accent)]">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between gap-6 py-4">
          <div className="flex items-center gap-4">
            {pathname !== "/" ? (
              <Link
                href="/"
                className="hidden text-xs font-semibold uppercase tracking-widest text-white/80 hover:text-white md:inline-flex"
                aria-label="Назад към начална страница"
              >
                ← Начало
              </Link>
            ) : null}

            <Link href="/" className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-none bg-transparent">
                <img src="/logo.png" alt="Лого" className="h-full w-full object-contain" />
              </div>
              <div className="font-semibold tracking-tight text-white">Програма „Интелигентен растеж“</div>
            </Link>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-widest text-white/80 md:flex">
            <Link className="hover:text-white" href="/program">Програма</Link>
            <Link className="hover:text-white" href="/process">Процес</Link>
            <Link className="hover:text-white" href="/questions">Въпроси</Link>
            <Link className="hover:text-white" href="/news">Новини</Link>
            <Link className="hover:text-white" href="/contact">Контакти</Link>
          </nav>
        </div>

        <div className="pb-4">
          <IntakeBar compact variant="header" />
        </div>
      </div>
    </header>
  );
}
