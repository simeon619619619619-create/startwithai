import SiteHeader from "@/components/SiteHeader";

export default function QuestionsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <h1 className="text-3xl font-semibold text-[color:var(--text)]">Често задавани въпроси</h1>
        <div className="mt-8 grid grid-cols-1 gap-3">
          {[
            ["Колко струва на фирмата?", "0 лв за одобрени кандидати по програмата."],
            ["Кои фирми са допустими?", "Повечето микро, малки и средни предприятия, регистрирани в България."],
            ["Какво е „бонус автоматизация“?", "Внедряваме 2 AI решения, които спестяват реални часове работа."],
          ].map(([q, a]) => (
            <details key={q} className="border border-[color:var(--stroke)] bg-white p-4">
              <summary className="cursor-pointer font-semibold text-[color:var(--text)]">{q}</summary>
              <div className="mt-2 text-sm text-[color:var(--muted)]">{a}</div>
            </details>
          ))}
        </div>
      </main>
    </div>
  );
}
