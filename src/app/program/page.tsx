import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

type Module = {
  title: string;
  desc: string;
  tag?: string;
};

function TimelineItem({ month, title, children, highlight }: { month: string; title: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-4 border border-[color:var(--stroke)] bg-white p-5 md:grid-cols-[160px_1fr]">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">{month}</div>
        <div className={"mt-1 text-lg font-semibold " + (highlight ? "text-[color:var(--accent)]" : "text-[color:var(--text)]")}>{title}</div>
      </div>
      <div className="text-sm leading-6 text-[color:var(--muted)]">{children}</div>
    </div>
  );
}

function ModuleCard({ m }: { m: Module }) {
  return (
    <div className="group border border-[color:var(--stroke)] bg-white p-5 transition-colors hover:border-[color:var(--accent)]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-[color:var(--text)]">{m.title}</div>
        {m.tag ? (
          <span className="border border-[color:var(--stroke)] bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--muted)] group-hover:border-[color:var(--accent)]">
            {m.tag}
          </span>
        ) : null}
      </div>
      <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{m.desc}</div>
    </div>
  );
}

export default function ProgramPage() {
  const modules: Module[] = [
    {
      title: "CEO Playbook",
      desc: "Автоматизирани справки и стратегически анализи за управители.",
    },
    {
      title: "COO Operations",
      desc: "Оптимизация на оперативните вериги и ресурсите.",
    },
    {
      title: "Inbox Commander",
      desc: "AI система за управление на имейл кореспонденцията и филтриране на важното.",
    },
    {
      title: "Calendar Architect",
      desc: "Умно планиране на срещи и графици без ръчна намеса.",
    },
    {
      title: "HR Kit",
      desc: "Автоматизирано пресяване на кандидати и управление на вътрешна документация.",
    },
    {
      title: "Finance Shield",
      desc: "AI четене на фактури и автоматизирано счетоводно отчитане.",
    },
    {
      title: "Marketing Pro",
      desc: "Генерация на съдържание и управление на рекламни кампании.",
    },
    {
      title: "Sales Booster",
      desc: "Автоматични отговори на запитвания и водене на клиенти по фунията.",
    },
  ];

  return (
    <div>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Програма „Интелигентен растеж“
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-4xl">
            От обучение до внедряване: 90-дневен план
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-[color:var(--muted)]">
            Комбинираме държавно финансирано обучение с директно техническо внедряване на AI инструменти във вашия екип.
          </p>
        </div>

        {/* Timeline */}
        <section className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4">
          <TimelineItem month="Етап 1 • Месец 1" title="Подготовка и официален старт">
            <ul className="list-disc pl-5">
              <li>
                <span className="font-semibold text-[color:var(--text)]">Административно съдействие:</span> Пълна подкрепа при кандидатстване
                за ваучер по проект „
                <Link href="/voucher" className="font-semibold text-[color:var(--accent)] underline">
                  Квалификация, умения и кариерно развитие на заети лица
                </Link>
                “.
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text)]">Диагностика на процесите:</span> Анализираме кои ежедневни задачи
                отнемат най-много време и пречат на растежа.
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text)]">Дигитален старт:</span> Започваме официалното обучение за базови или
                средни дигитални умения (DigComp), финансирано на 100% от ЕСФ+.
              </li>
            </ul>
          </TimelineItem>

          <TimelineItem month="Етап 2 • Месец 2" title="Специализирани AI модули">
            <div>
              <p className="mb-3">
                През този месец екипът ви усвоява конкретните инструменти, които променят начина на работа. Избирате приоритети според
                целите ви.
              </p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {modules.map((m) => (
                  <ModuleCard key={m.title} m={m} />
                ))}
              </div>
            </div>
          </TimelineItem>

          <TimelineItem month="Етап 3 • Месец 3" title="Внедряване и сертификация" highlight>
            <ul className="list-disc pl-5">
              <li>
                <span className="font-semibold text-[color:var(--text)]">Техническо внедряване:</span> Интегрираме 2 избрани процеса директно във
                вашата работна среда (напр. Finance Shield + Inbox Commander).
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text)]">Тестване и оптимизация:</span> Фина настройка спрямо спецификите на
                бизнеса.
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text)]">Финална сертификация:</span> Официален държавен сертификат за дигитална
                компетентност.
              </li>
              <li>
                <span className="font-semibold text-[color:var(--text)]">Доклад за ефективност:</span> Отчет за спестени човекочасове + план за
                следващи автоматизации.
              </li>
            </ul>
          </TimelineItem>
        </section>

        {/* Before/After */}
        <section className="mx-auto mt-12 max-w-5xl border border-[color:var(--stroke)] bg-white p-6">
          <div className="text-sm font-semibold uppercase tracking-widest text-[color:var(--muted)]">Преди и след</div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text)]">Какво се променя за 90 дни</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-[color:var(--stroke)] bg-white p-5">
              <div className="text-sm font-semibold text-[color:var(--text)]">Преди</div>
              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-[color:var(--muted)]">
                <li>Ръчна обработка на запитвания и имейли.</li>
                <li>Фактури/документи се въвеждат на ръка.</li>
                <li>Липсва ясна картина за време/разход по процеси.</li>
              </ul>
            </div>
            <div className="border border-[color:var(--stroke)] bg-white p-5">
              <div className="text-sm font-semibold text-[color:var(--text)]">След</div>
              <ul className="mt-3 list-disc pl-5 text-sm leading-6 text-[color:var(--muted)]">
                <li>Филтрирани входящи + полуавтоматични отговори по правила.</li>
                <li>Автоматично извличане на данни от фактури/документи.</li>
                <li>Отчет за спестени човекочасове и следващи приоритети.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 border border-[color:var(--stroke)] bg-white p-4 text-sm text-[color:var(--muted)]">
            <span className="font-semibold text-[color:var(--text)]">Как мерим ефекта:</span> настройваме базова линия (седмично време по процес),
            после сравняваме след внедряване.
          </div>
        </section>

        {/* Conditions */}
        <section className="mx-auto mt-10 max-w-5xl border border-[color:var(--stroke)] bg-white p-6">
          <div className="text-sm font-semibold uppercase tracking-widest text-[color:var(--muted)]">Условия</div>
          <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">
            Участието е възможно само при одобрение и при приемане на официалните Общи условия на програмата.
          </p>
          <div className="mt-5">
            <Link
              href="/terms"
              className="inline-flex bg-[color:var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              ОБЩИ УСЛОВИЯ →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
