import Link from "next/link";

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-24">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--stroke)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="font-semibold tracking-tight text-[color:var(--text)]">Резултати и прозрачност</div>
          <Link className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)]" href="/">
            ← Начало
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <div className="border border-[color:var(--stroke)] bg-white p-6">
          <h1 className="text-2xl font-semibold text-[color:var(--text)] md:text-3xl">Отчети и кейсове</h1>
          <p className="mt-3 text-[color:var(--muted)]">
            Публикуваме резултати като кратки доклади: цел → внедряване → измерим ефект.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Кейс 1", "Оптимизация на обработка на заявки"],
              ["Кейс 2", "Автоматизация на офертиране"],
              ["Кейс 3", "Вътрешен knowledge base + търсене"],
            ].map(([t, d]) => (
              <div key={t} className="border border-[color:var(--stroke)] bg-white p-4">
                <div className="font-semibold text-[color:var(--text)]">{t}</div>
                <div className="mt-2 text-sm text-[color:var(--muted)]">{d}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 border border-[color:var(--stroke)] bg-slate-50 p-4">
            <div className="text-sm font-semibold text-[color:var(--text)]">Общо оптимизирани часове (демо)</div>
            <div className="mt-1 text-3xl font-semibold text-[color:var(--text)]">12 480</div>
            <div className="mt-1 text-xs text-[color:var(--muted)]">*Плейсхолдър — ще се върже към реални данни.</div>
          </div>
        </div>
      </main>
    </div>
  );
}
