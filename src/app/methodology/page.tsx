import Link from "next/link";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-24">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--stroke)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="font-semibold tracking-tight text-[color:var(--text)]">Методология и стандарти</div>
          <Link className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)]" href="/">
            ← Начало
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <div className="border border-[color:var(--stroke)] bg-white p-6">
          <h1 className="text-2xl font-semibold text-[color:var(--text)] md:text-3xl">Как работи програмата</h1>
          <p className="mt-3 text-[color:var(--muted)]">
            Описваме процеса по внедряване като ясни етапи и изисквания към сигурността.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              ["Диагностика", "Кратък одит на процеси, данни и готовност."],
              ["Стратегия", "План за автоматизация + KPI и отговорности."],
              ["Изпълнение", "Внедряване + обучение + отчет."],
            ].map(([t, d]) => (
              <div key={t} className="border border-[color:var(--stroke)] bg-white p-4">
                <div className="font-semibold text-[color:var(--text)]">{t}</div>
                <div className="mt-2 text-sm text-[color:var(--muted)]">{d}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-lg font-semibold text-[color:var(--text)]">Етична рамка и сигурност</h2>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            Данните на предприятията се обработват по минималния необходим обем и с акцент върху конфиденциалност и съответствие с регламентите на ЕС.
          </p>
        </div>
      </main>
    </div>
  );
}
