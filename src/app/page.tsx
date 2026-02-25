"use client";

import { useMemo, useState } from "react";

type Lead = {
  website?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  teamSize?: string;
  submittedAt: string;
};

const KEY = "startwithai_leads";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-balance text-2xl font-semibold tracking-tight text-white md:text-3xl">
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-white/70">
      {children}
    </span>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/35" />
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [heroWebsite, setHeroWebsite] = useState("");

  const [lead, setLead] = useState<
    Omit<Lead, "submittedAt"> & { submittedAt?: string }
  >({});

  const [status, setStatus] = useState<string>("");

  const faqs = useMemo(
    () => [
      {
        q: "Как е безплатно за фирмата?",
        a: "Кандидатстваш за програма, в която обучението и сертификацията са без разход за фирмата (при одобрение). На кратка среща обясняваме модела и проверяваме допустимост.",
      },
      {
        q: "Ще ми загубите ли работното време?",
        a: "Не. Обученията се разпределят в микро-сесии извън пиковите часове по график протокол.",
      },
      {
        q: "AI е сложно — хората ми ще се справят ли?",
        a: "Да. Включваме практическа система за подготовка (тестове + симулации) и готови шаблони за автоматизация за МСП.",
      },
      {
        q: "Има ли скрити такси / обвързване?",
        a: "Не. Има договор за нулев разход: 0 лв такса. Всичко е ясно фиксирано предварително.",
      },
      {
        q: "Какво точно получавам за 90 дни?",
        a: "Обучение + сертификация + внедряване на 3 автоматизации + отчет за спестени човекочасове + бонус 1000 лв за всеки 10 сертифицирани.",
      },
    ],
    []
  );

  function scrollToApply() {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  function onHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLead((prev) => ({ ...prev, website: heroWebsite }));
    scrollToApply();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("");

    const payload: Lead = {
      website: lead.website,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      teamSize: lead.teamSize,
      submittedAt: new Date().toISOString(),
    };

    if (!payload.email && !payload.phone) {
      setStatus("Остави поне имейл или телефон.");
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem(KEY) || "[]") as Lead[];
      existing.push(payload);
      localStorage.setItem(KEY, JSON.stringify(existing));
    } catch {
      // ignore
    }

    setStatus("Готово — получихме заявката. Ще се свържем с теб.");
    setLead({});
    setHeroWebsite("");

    setTimeout(() => setStatus(""), 7000);
  }

  return (
    <div>
      {/* Topbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400/80 via-emerald-300/60 to-sky-400/30 ring-1 ring-white/15" />
            <div className="font-semibold tracking-tight text-white">startwithai</div>
          </div>
          <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-widest text-white/60 md:flex">
            <a className="hover:text-white" href="#what">Какво получаваш</a>
            <a className="hover:text-white" href="#process">90 дни</a>
            <a className="hover:text-white" href="#faq">FAQ</a>
          </div>
          <button
            onClick={scrollToApply}
            className="rounded-full bg-gradient-to-r from-sky-400 to-emerald-300 px-4 py-2 text-xs font-bold uppercase tracking-widest text-black shadow-[0_12px_40px_rgba(34,197,94,0.18)]"
          >
            Кандидатствай
          </button>
        </div>
      </header>

      {/* Hero */}
      <main className="relative pt-28">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-4xl text-center">
            <Pill>Кандидатствай за безплатно обучение + сертификати (признати в ЕС)</Pill>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              Увеличи продуктивността на екипа си с AI внедряване за 90 дни.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-7 text-[color:var(--muted)] md:text-lg">
              Обучение + сертификация (призната в цяла Европа) + реални автоматизации в процесите — с измерим резултат в спестени човекочасове.
              Започваме с бърза проверка на допустимост и план за внедряване.
            </p>

            <form
              onSubmit={onHeroSubmit}
              className="mx-auto mt-9 flex max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 md:flex-row md:items-center"
            >
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <span className="text-white/35">🌐</span>
                <input
                  value={heroWebsite}
                  onChange={(e) => setHeroWebsite(e.target.value)}
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                  placeholder="Въведи сайта на фирмата (по желание)"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300 px-6 py-3 text-sm font-bold text-black"
              >
                Започни →
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/40">
              <span>Договор: 0 лв такса за обучение/сертификация (при одобрение)</span>
              <span className="hidden md:inline">•</span>
              <span>Микро-сесии извън пиковите часове</span>
              <span className="hidden md:inline">•</span>
              <span>Измерим отчет за спестени човекочасове</span>
            </div>
          </div>

          {/* What you receive */}
          <section id="what" className="mx-auto mt-16 max-w-5xl">
            <div className="text-center text-xs font-semibold uppercase tracking-[0.5em] text-white/30">
              Какво получаваш
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card
                title="Обучение + сертификация"
                desc="Дигитални умения + английски (сертификационно) + подготовка и официални изпити."
              />
              <Card
                title="3 AI автоматизации във фирмата"
                desc="Избираме 3 конкретни процеса и ги автоматизираме (практика, не теория)."
              />
              <Card
                title="Отчет за спестено време"
                desc="Измерваме освободени човекочасове и ги превръщаме в капацитет."
              />
              <Card
                title="1000 лв тимбилдинг бонус"
                desc="За всеки 10 сертифицирани служители (финансов стимул по модела)."
              />
            </div>
          </section>
        </div>

        {/* 90 days */}
        <section id="process" className="mt-20 border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <SectionTitle
              title="90-дневна система: обучение + внедряване + измерим резултат"
              subtitle="Повечето пазари предлагат или скъпа консултация, или теоретично обучение. Тук процесът е комбиниран и контролиран." 
            />

            <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  t: "Седмица 1–2: Процесен анализ",
                  d: "Избираме 3 процеса, които губят най-много време, и правим план за внедряване.",
                },
                {
                  t: "Седмица 3–6: Обучение в микро-сесии",
                  d: "График протокол извън пиковите часове + практическа подготовка за изпити.",
                },
                {
                  t: "Седмица 7–10: Внедряване на автоматизации",
                  d: "Изпълняваме автоматизациите с готови шаблони, настройка и обучение на екипа.",
                },
                {
                  t: "Седмица 11–13: Измерване и отчет",
                  d: "Отчет за спестени човекочасове + инструкции за поддръжка и разширяване.",
                },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-white/10 bg-gradient-to-r from-sky-400/10 to-emerald-300/10 p-6">
              <div className="text-sm font-semibold text-white">Гаранция „Измерим капацитет“</div>
              <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Ако до 90-ия ден не: имате минимум 10 сертифицирани служители, внедрите поне 2 работещи автоматизации и получите отчет за реално спестени часове —
                провеждаме допълнителен 30-дневен цикъл безплатно.
              </div>
            </div>
          </div>
        </section>

        {/* Value */}
        <section className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle
            title="Стойност, която обичайно струва 25 000–35 000 лв"
            subtitle="Пазарните алтернативи са консултанти, скъпи обучения и внедрявания без обучение. Тук влиза система с обучение + сертификация + внедряване и отчет." 
          />

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
            {[
              ["AI консултация (10–20 души)", "8 000 – 15 000 лв"],
              ["Дигитално обучение", "4 000 – 7 000 лв"],
              ["Сертификационна подготовка", "~3 000 лв"],
              ["Внедряване на автоматизации", "10 000+ лв"],
              ["Вътрешен координатор", "2 000+ лв"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <div className="text-sm text-white/80">{k}</div>
                <div className="text-sm font-semibold text-white">{v}</div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-5xl rounded-2xl border border-white/10 bg-black/20 p-6">
            <div className="text-sm font-semibold text-white">Реална цена за клиента</div>
            <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              0 лв разход за фирмата за обучението и сертификацията (при одобрение) + 1000 лв тимбилдинг бонус при 10 сертифицирани служители.
              Всичко се уточнява предварително и е описано в договор (без скрити такси).
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <SectionTitle
              title="Често задавани въпроси"
              subtitle="Скептицизмът е нормален — затова моделът е прозрачен и измерим." 
            />

            <div className="mx-auto mt-10 max-w-4xl space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-white">
                    <div className="flex items-center justify-between gap-4">
                      <span>{f.q}</span>
                      <span className="text-white/35 group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </div>
                  </summary>
                  <div className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Apply */}
        <section id="apply" className="mx-auto max-w-6xl px-5 py-16">
          <SectionTitle
            title="Провери допустимост (1 минута)"
            subtitle="Работим с ограничен брой компании на тримесечие, защото внедряваме процеси лично." 
          />

          <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  Сайт (по желание)
                </label>
                <input
                  value={lead.website || ""}
                  onChange={(e) => setLead((p) => ({ ...p, website: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  Име
                </label>
                <input
                  value={lead.name || ""}
                  onChange={(e) => setLead((p) => ({ ...p, name: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25"
                  placeholder="Име и фамилия"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  Фирма
                </label>
                <input
                  value={lead.company || ""}
                  onChange={(e) => setLead((p) => ({ ...p, company: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25"
                  placeholder="Име на фирмата"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  Имейл
                </label>
                <input
                  value={lead.email || ""}
                  onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
                  type="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  Телефон
                </label>
                <input
                  value={lead.phone || ""}
                  onChange={(e) => setLead((p) => ({ ...p, phone: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25"
                  placeholder="+359…"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  Брой служители
                </label>
                <select
                  value={lead.teamSize || ""}
                  onChange={(e) => setLead((p) => ({ ...p, teamSize: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
                >
                  <option value="">Избери…</option>
                  <option value="10-20">10–20</option>
                  <option value="21-40">21–40</option>
                  <option value="41-80">41–80</option>
                  <option value="80+">80+</option>
                </select>
              </div>

              <div className="md:col-span-2 mt-2 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                <button
                  type="submit"
                  className={cn(
                    "rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300 px-6 py-3 text-sm font-bold text-black",
                    "shadow-[0_18px_60px_rgba(56,189,248,0.12)]"
                  )}
                >
                  Изпрати →
                </button>
                <div className="text-xs text-white/35">
                  Минимум: имейл или телефон.
                </div>
              </div>

              {status ? (
                <div className="md:col-span-2 text-sm font-semibold text-white">
                  {status}
                </div>
              ) : null}
            </form>

            <div className="mt-4 text-xs leading-5 text-white/35">
              * Този формуляр е MVP (локално записване). Като следваща стъпка го свързваме с CRM / календар.
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-white/35 md:flex-row">
            <div>© {new Date().getFullYear()} startwithai</div>
            <div className="uppercase tracking-[0.4em]">AI внедряване за МСП</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
