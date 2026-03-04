import SiteHeader from "@/components/SiteHeader";

export default function ProgramPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <h1 className="text-3xl font-semibold text-[color:var(--text)]">Програма</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--muted)]">
          Описание на програмата, модулите и какво получавате.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            ["Обучение", "Дигитални компетенции и AI инструменти"],
            ["Внедряване", "2 автоматизации в реални процеси"],
            ["Отчет", "Измерим доклад за ефекта"],
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
