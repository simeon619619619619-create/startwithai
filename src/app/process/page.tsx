import SiteHeader from "@/components/SiteHeader";

export default function ProcessPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <h1 className="text-3xl font-semibold text-[color:var(--text)]">Процес</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--muted)]">
          Стъпките от проверка на допустимост до внедряване и отчет.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            ["1) Проверка", "Въвеждате сайт → анализ → служебен имейл"],
            ["2) Кратък разговор", "Уточняваме процеси и цели"],
            ["3) Документи", "Подготовка и подаване към АЗ"],
            ["4) Изпълнение", "Обучение + 2 автоматизации + отчет"],
          ].map(([t, d]) => (
            <div key={t} className="border border-[color:var(--stroke)] bg-white p-5">
              <div className="font-semibold text-[color:var(--text)]">{t}</div>
              <div className="mt-2 text-sm text-[color:var(--muted)]">{d}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
