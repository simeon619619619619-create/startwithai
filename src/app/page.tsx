"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  website?: string;
  email: string;
  submittedAt: string;
};

const KEY = "startwithai_leads";

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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--stroke)] bg-white/70 px-3 py-1 text-xs font-semibold tracking-wider text-[color:var(--muted)]">
      {children}
    </span>
  );
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-6 w-6 shrink-0 rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/35" />
        <div>
          <div className="text-sm font-semibold text-[color:var(--text)]">{title}</div>
          <div className="mt-1 text-sm leading-6 text-[color:var(--muted)]">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();

  const [heroStep, setHeroStep] = useState<"website" | "email">("website");
  const [heroWebsite, setHeroWebsite] = useState("");
  const [heroEmail, setHeroEmail] = useState("");
  const [heroEmailError, setHeroEmailError] = useState<string>("");

  const disallowedEmailDomains = useMemo(
    () =>
      new Set([
        "gmail.com",
        "googlemail.com",
        "yahoo.com",
        "yahoo.co.uk",
        "yahoo.de",
        "yahoo.fr",
        "outlook.com",
        "hotmail.com",
        "live.com",
        "msn.com",
        "icloud.com",
        "me.com",
        "mac.com",
        "aol.com",
        "proton.me",
        "protonmail.com",
        "mail.com",
        "yandex.com",
        "yandex.ru",
        "abv.bg",
        "mail.bg",
        "dir.bg",
      ]),
    []
  );

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

  function validateProfessionalEmail(email: string) {
    const v = (email || "").trim().toLowerCase();
    if (!v) return "Въведи фирмен имейл.";

    // Strict format requested: word@domain.com
    // - local part: only letters/numbers (no dots, plus, underscores)
    // - domain: single label + TLD (domain.com), no subdomains
    const strict = /^[a-z0-9]+@[a-z0-9-]+\.[a-z]{2,}$/i;
    if (!strict.test(v)) {
      return "Използвай формат: word@domain.com (без точки/плюсове и без поддомейни).";
    }

    const domain = v.split("@")[1];
    if (disallowedEmailDomains.has(domain)) {
      return "Приемаме само фирмени имейли (не Gmail/Outlook/Abv и т.н.).";
    }

    return "";
  }

  function scrollToHero() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onHeroSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (heroStep === "website") {
      setHeroStep("email");
      return;
    }

    const err = validateProfessionalEmail(heroEmail);
    setHeroEmailError(err);
    if (err) return;

    // Save a minimal lead right away (MVP)
    try {
      const payload: Lead = {
        website: heroWebsite || undefined,
        email: heroEmail.trim().toLowerCase(),
        submittedAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem(KEY) || "[]") as Lead[];
      existing.push(payload);
      localStorage.setItem(KEY, JSON.stringify(existing));
    } catch {
      // ignore
    }

    const qp = new URLSearchParams();
    if (heroWebsite) qp.set("website", heroWebsite);
    qp.set("email", heroEmail.trim().toLowerCase());

    router.push(`/chat?${qp.toString()}`);
  }

  return (
    <div>
      {/* Topbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--stroke)] bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)] ring-1 ring-[color:var(--stroke)]" />
            <div className="font-semibold tracking-tight text-[color:var(--text)]">startwithai</div>
          </div>
          <div className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] md:flex">
            <a className="hover:text-[color:var(--text)]" href="#what">Какво получаваш</a>
            <a className="hover:text-[color:var(--text)]" href="#process">90 дни</a>
            <a className="hover:text-[color:var(--text)]" href="#faq">FAQ</a>
          </div>
          <button
            onClick={() => {
              scrollToHero();
              setHeroStep("website");
            }}
            className="rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(37,99,235,0.22)] hover:bg-[color:var(--accent-2)]"
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
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-[color:var(--text)] md:text-6xl">
              Увеличи продуктивността на екипа си с AI внедряване за 90 дни.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-7 text-[color:var(--muted)] md:text-lg">
              Обучение + сертификация (призната в цяла Европа) + реални автоматизации в процесите — с измерим резултат в спестени човекочасове.
              Започваме с бърза проверка на допустимост и план за внедряване.
            </p>

            <form
              onSubmit={onHeroSubmit}
              className="mx-auto mt-9 flex max-w-3xl flex-col gap-3 rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-3 shadow-sm md:flex-row md:items-center"
            >
              {heroStep === "website" ? (
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-[color:var(--stroke)] bg-white px-4 py-3">
                  <span className="text-[color:var(--muted)]">🌐</span>
                  <input
                    value={heroWebsite}
                    onChange={(e) => setHeroWebsite(e.target.value)}
                    className="w-full bg-transparent text-sm text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:outline-none"
                    placeholder="Въведи сайта на фирмата (по желание)"
                  />
                </div>
              ) : (
                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-center gap-3 rounded-xl border border-[color:var(--stroke)] bg-white px-4 py-3">
                    <span className="text-[color:var(--muted)]">✉️</span>
                    <input
                      value={heroEmail}
                      onChange={(e) => {
                        setHeroEmail(e.target.value);
                        setHeroEmailError("");
                        e.currentTarget.setCustomValidity("");
                      }}
                      onInvalid={(e) => {
                        e.currentTarget.setCustomValidity(
                          "Използвай формат: word@domain.com (само латински букви/цифри; без точки/плюсове; без поддомейни)."
                        );
                      }}
                      type="text"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      pattern="[A-Za-z0-9]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,}"
                      className="w-full bg-transparent text-sm text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:outline-none"
                      placeholder="Въведи фирмен имейл (пример: office@company.com)"
                      required
                    />
                  </div>
                  {heroEmailError ? (
                    <div className="text-left text-xs font-semibold text-rose-200/90">
                      {heroEmailError}
                    </div>
                  ) : null}
                  <div className="text-left text-xs text-[color:var(--muted)]">
                    Допускат се само професионални имейли с фирмен домейн.
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300 px-6 py-3 text-sm font-bold text-black"
              >
                {heroStep === "website" ? "Продължи →" : "Към въпросите →"}
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[color:var(--muted)]">
              <span>Договор: 0 лв такса за обучение/сертификация (при одобрение)</span>
              <span className="hidden md:inline">•</span>
              <span>Микро-сесии извън пиковите часове</span>
              <span className="hidden md:inline">•</span>
              <span>Измерим отчет за спестени човекочасове</span>
            </div>
          </div>

          {/* What you receive */}
          <section id="what" className="mx-auto mt-16 max-w-5xl">
            <div className="text-center text-xs font-semibold uppercase tracking-[0.5em] text-[color:var(--muted-2)]">
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
        <section id="process" className="mt-20 border-y border-[color:var(--stroke)] bg-white/50">
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
                <div key={x.t} className="rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-6 shadow-sm">
                  <div className="text-sm font-semibold text-[color:var(--text)]">{x.t}</div>
                  <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{x.d}</div>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-6 shadow-sm">
              <div className="text-sm font-semibold text-[color:var(--text)]">Гаранция „Измерим капацитет“</div>
              <div className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
                Ако до 90-ия ден не: имате минимум 10 сертифицирани служители, внедрите поне 2 работещи автоматизации и получите отчет за реално спестени часове —
                провеждаме допълнителен 30-дневен цикъл безплатно.
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-[color:var(--stroke)] bg-white/50">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <SectionTitle
              title="Често задавани въпроси"
              subtitle="Скептицизмът е нормален — затова моделът е прозрачен и измерим."
            />

            <div className="mx-auto mt-10 max-w-4xl space-y-3">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-5 shadow-sm"
                >
                  <summary className="cursor-pointer list-none text-sm font-semibold text-[color:var(--text)]">
                    <div className="flex items-center justify-between gap-4">
                      <span>{f.q}</span>
                      <span className="text-[color:var(--muted)] transition-transform group-open:rotate-45">
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

            <div className="mx-auto mt-10 max-w-4xl text-center">
              <button
                onClick={() => {
                  scrollToHero();
                  setHeroStep("website");
                }}
                className="rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300 px-6 py-3 text-sm font-bold text-black"
              >
                Кандидатствай →
              </button>
            </div>
          </div>
        </section>

        <footer className="border-t border-[color:var(--stroke)] py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-[color:var(--muted)] md:flex-row">
            <div>© {new Date().getFullYear()} startwithai</div>
            <div className="uppercase tracking-[0.4em]">AI внедряване за МСП</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
