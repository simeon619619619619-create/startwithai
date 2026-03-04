"use client";

import Link from "next/link";
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

        {/* Program teaser */}
        <section className="mt-16" id="program">
          <SectionTitle
            title="Програма „Интелигентен растеж“"
            subtitle="Единен 3-месечен план: държавно финансирано обучение + 8 AI модула + реално внедряване и отчет." 
          />

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            <Card
              title="Месец 1: старт + диагностика"
              desc="Административно съдействие, анализ на процесите и официално обучение (DigComp) по ваучерната схема."
            />
            <Card
              title="Месец 2: 8 AI модула"
              desc="CEO/COO, Inbox, Calendar, HR, Finance + Marketing и Sales. Избирате приоритети според целта." 
            />
            <Card
              title="Месец 3: внедряване"
              desc="Интегрираме 2 избрани процеса директно във вашата среда + тестване + сертификация + отчет." 
            />
          </div>

          <div className="mx-auto mt-6 flex max-w-5xl flex-col items-center justify-between gap-4 border border-[color:var(--stroke)] bg-white p-4 md:flex-row">
            <div className="text-sm text-[color:var(--muted)]">
              Вижте пълната пътна карта и модулите (с „Преди и След“).
            </div>
            <Link
              href="/program"
              className="bg-[color:var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              ВИЖ ПРОГРАМАТА →
            </Link>
          </div>
        </section>

        {/* News */}
        <section className="mt-16" id="news">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-tight text-[color:var(--text)]">Новини</h2>
              <Link
                href="/news"
                className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)]"
              >
                Всички новини →
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 border border-[color:var(--stroke)] bg-white p-4 md:grid-cols-[1.2fr_0.8fr]">
              {/* Featured */}
              <article className="border border-[color:var(--stroke)] bg-white">
                <div className="h-48 w-full overflow-hidden border-b border-[color:var(--stroke)] bg-[#f3f6fb] md:h-64">
                  <img
                    src="/news/photo-1521791136064-7986c2920216.jpg"
                    alt="Екип в офис среда"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="border border-[color:var(--stroke)] bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--muted)]">
                      Администрация
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">26.02.2026</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[color:var(--text)]">
                    Отворен прием за кандидати по Програма „Интелигентен растеж“
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                    Обновени насоки за допустимост и документи. Кандидатстването започва с проверка на сайта и служебен имейл.
                  </p>
                  <div className="mt-5 flex justify-end">
                    <Link
                      href="/news"
                      className="inline-flex bg-[color:var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
                    >
                      Прочети повече →
                    </Link>
                  </div>
                </div>
              </article>

              {/* List */}
              <div className="flex flex-col gap-3">
                {[
                  [
                    "24.02.2026",
                    "Добавени 8 специализирани AI модула към 90-дневния план",
                    "/news/photo-1555066931-4365d14bab8c.jpg",
                    "AI модули",
                  ],
                  [
                    "21.02.2026",
                    "Нов процес: анализ → консултация → документи → внедряване",
                    "/news/photo-1556155092-490a1ba16284.jpg",
                    "Процес",
                  ],
                  [
                    "18.02.2026",
                    "Нова страница: Общи условия и политика за данни",
                    "/news/photo-1450101499163-c8848c66ca85.jpg",
                    "Документи",
                  ],
                ].map(([date, title, img, alt]) => (
                  <article key={title} className="flex gap-3 border border-[color:var(--stroke)] bg-white p-4">
                    <div className="h-12 w-16 shrink-0 overflow-hidden bg-[#f3f6fb] ring-1 ring-[color:var(--stroke)]">
                      <img src={img} alt={alt} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">{date}</div>
                      <div className="mt-1 text-sm font-semibold text-[color:var(--text)]">{title}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-[color:var(--stroke)] py-10 text-xs text-[color:var(--muted)]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 md:flex-row">
            <div>© {new Date().getFullYear()} Програма „Интелигентен растеж“</div>
            <div className="uppercase tracking-[0.4em]">Технологична асистенция</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
