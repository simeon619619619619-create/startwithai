import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

type Step = {
  n: string;
  title: string;
  timing: string;
  bullets: string[];
};

function StepCard({ s }: { s: Step }) {
  return (
    <div className="grid grid-cols-1 gap-4 border border-[color:var(--stroke)] bg-white p-6 md:grid-cols-[140px_1fr]">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Стъпка {s.n}</div>
        <div className="mt-2 text-lg font-semibold text-[color:var(--text)]">{s.title}</div>
        <div className="mt-2 text-sm text-[color:var(--muted)]">{s.timing}</div>
      </div>
      <div className="text-sm leading-6 text-[color:var(--muted)]">
        <ul className="list-disc pl-5">
          {s.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProcessPage() {
  const steps: Step[] = [
    {
      n: "1",
      title: "Анализ и проверка",
      timing: "Седмица 1",
      bullets: [
        "Дигитален одит: въвеждате сайта на фирмата си и алгоритъмът прави първичен анализ на технологичната ви зрялост.",
        "Служебен имейл: получавате потвърждение дали отговаряте на критериите и как продължаваме.",
      ],
    },
    {
      n: "2",
      title: "Стратегическо планиране",
      timing: "Седмица 2",
      bullets: [
        "Консултация: кратък разговор за „тесните места“ (Администрация, Продажби, Финанси).",
        "Избор на модули: избирате 2 от нашите AI решения, които внедряваме в рамките на програмата.",
      ],
    },
    {
      n: "3",
      title: "Оформяне на документи",
      timing: "Седмица 2–3",
      bullets: [
        "Експертно съдействие: помагаме за подготовката и подаването на документите към Агенция по заетостта за ваучер за обучение.",
        "0 лв такси: уверяваме се, че процесът по финансиране е изряден (при одобрение).",
      ],
    },
    {
      n: "4",
      title: "Обучение и квалификация",
      timing: "Месец 1–3",
      bullets: [
        "Практически курс: минимум 45–55 учебни часа, съобразено с работния график.",
        "AI умения: паралелно с базата екипът усвоява реални AI инструменти.",
      ],
    },
    {
      n: "5",
      title: "Техническо внедряване",
      timing: "Месец 2–3",
      bullets: [
        "Интеграция: внедряваме двете избрани автоматизации директно във вашия бизнес.",
        "Тестване: фина настройка, за да работят стабилно в реална среда.",
      ],
    },
    {
      n: "6",
      title: "Сертификация и отчетност",
      timing: "Финал",
      bullets: [
        "Държавен сертификат: служителите получават официален документ за дигитална компетентност.",
        "Доклад за ефекта: финален отчет със спестени човекочасове и препоръки за следващи стъпки.",
      ],
    },
  ];

  return (
    <div>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Процес</div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-4xl">
            От проверка на допустимост до работеща автоматизация
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-[color:var(--muted)]">
            Пълна прозрачност във всяка стъпка от партньорството ни.
          </p>
        </div>

        <section className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4">
          {steps.map((s) => (
            <StepCard key={s.n} s={s} />
          ))}

          {/* Trust element */}
          <div className="border border-[color:var(--stroke)] bg-white p-6">
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Trust</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">
              Тук можем да добавим официално лого/визуален елемент за програмата „Развитие на човешките ресурси“ (ако имаме право да го
              използваме).
            </div>
          </div>

          <div className="border border-[color:var(--stroke)] bg-white p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <div className="text-sm font-semibold text-[color:var(--text)]">Имате въпроси за кандидатстването?</div>
                <div className="mt-1 text-sm text-[color:var(--muted)]">Вижте отговорите в секцията „Въпроси“.</div>
              </div>
              <Link
                href="/questions"
                className="inline-flex bg-[color:var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white"
              >
                КЪМ ВЪПРОСИ →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
