"use client";

import SiteHeader from "@/components/SiteHeader";

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-[color:var(--text)] md:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-base leading-7 text-[color:var(--muted)] md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="border border-[color:var(--stroke)] bg-white p-5">
      <div className="text-sm font-semibold text-[color:var(--text)]">{title}</div>
      <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{desc}</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        {/* Hero */}
        <section className="border border-[color:var(--stroke)] bg-white p-6">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
              Национална програма
            </div>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[color:var(--text)] md:text-5xl">
              Модернизирайте бизнеса си с 0 лв. собствена инвестиция
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-pretty text-[color:var(--muted)]">
              Възползвайте се от държавно финансиране чрез ваучерната схема на Агенция по заетостта. Ние ще обучим екипа ви и ще автоматизираме два ключови процеса във вашата фирма напълно безплатно.
            </p>
          </div>

          <div className="mx-auto mt-5 grid max-w-5xl grid-cols-1 gap-3 text-left text-sm text-[color:var(--muted)] md:grid-cols-3">
            <div className="flex gap-3 border border-[color:var(--stroke)] bg-white p-3">
              <div className="font-semibold text-[color:var(--text)]">✓</div>
              <div>
                <div className="font-semibold text-[color:var(--text)]">Финансиране</div>
                <div>0 лв такса за одобрени кандидати.</div>
              </div>
            </div>
            <div className="flex gap-3 border border-[color:var(--stroke)] bg-white p-3">
              <div className="font-semibold text-[color:var(--text)]">✓</div>
              <div>
                <div className="font-semibold text-[color:var(--text)]">Гъвкавост</div>
                <div>Микро-сесии, съобразени с работния график.</div>
              </div>
            </div>
            <div className="flex gap-3 border border-[color:var(--stroke)] bg-white p-3">
              <div className="font-semibold text-[color:var(--text)]">✓</div>
              <div>
                <div className="font-semibold text-[color:var(--text)]">Отчетност</div>
                <div>Пълен измерим доклад за спестени човекочасове.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Program */}
        <section className="mt-16" id="program">
          <SectionTitle
            title="Какво получавате"
            subtitle="Целта е измерим ефект: обучение + внедряване + отчет." 
          />

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            <Card
              title="100% безплатно обучение"
              desc="Квалификация на служители по ключови дигитални компетенции и AI инструменти, покрита от ваучерната схема на АЗ."
            />
            <Card
              title="Директна автоматизация"
              desc="Внедряваме 2 персонализирани AI автоматизации в ежедневни процеси (напр. обработка на запитвания, фактуриране, репортинг)."
            />
            <Card
              title="Официален сертификат"
              desc="Всеки обучен служител получава държавно признат сертификат за дигитални умения."
            />
            <Card
              title="Пълно съдействие"
              desc="Поемаме административната тежест по подготовката и подаването на документите към Агенция по заетостта."
            />
          </div>

          <div className="mx-auto mt-6 max-w-5xl border border-[color:var(--stroke)] bg-white p-4 text-sm text-[color:var(--muted)]">
            Програмата е насочена към повишаване на конкурентоспособността чрез автоматизация на повтарящи се задачи.
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-[color:var(--stroke)] py-10 text-xs text-[color:var(--muted)]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
            <div>© {new Date().getFullYear()} AI Модернизация</div>
            <div className="uppercase tracking-[0.4em]">Технологична асистенция</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
