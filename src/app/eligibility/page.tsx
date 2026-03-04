import SiteHeader from "@/components/SiteHeader";

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-24">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <div className="border border-[color:var(--stroke)] bg-white p-6">
          <h1 className="text-2xl font-semibold text-[color:var(--text)] md:text-3xl">Критерии (ориентировъчно)</h1>
          <p className="mt-3 text-[color:var(--muted)]">Тук е публична рамка. Окончателната проверка се прави при кандидатстване.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border border-[color:var(--stroke)] text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="border border-[color:var(--stroke)] px-3 py-2 text-left">Критерий</th>
                  <th className="border border-[color:var(--stroke)] px-3 py-2 text-left">Пример</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Размер", "Малки и средни предприятия"],
                  ["Сектори", "Услуги / производство / търговия"],
                  ["Процеси", "Повтаряеми задачи, подходящи за автоматизация"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td className="border border-[color:var(--stroke)] px-3 py-2 text-[color:var(--text)]">{k}</td>
                    <td className="border border-[color:var(--stroke)] px-3 py-2 text-[color:var(--muted)]">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-8 text-lg font-semibold text-[color:var(--text)]">Необходими документи</h2>
          <ul className="mt-3 list-disc pl-5 text-sm text-[color:var(--muted)]">
            <li>Профил на фирмата / дейност</li>
            <li>Кратко описание на текущи процеси</li>
            <li>Контактно лице и служебен имейл</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
