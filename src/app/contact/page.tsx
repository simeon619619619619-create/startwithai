"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

const BUSINESS_TYPES = [
  "E-commerce / онлайн магазин",
  "Услуги (B2C) — фризьор, ресторант, автосервиз",
  "Услуги (B2B) — агенция, консултанти, IT",
  "Производство / занаяти",
  "Образование / курсове / event",
  "Медии / контент / influencer",
  "Друго",
];

const TEAM_SIZES = ["Само аз (1)", "2-5 души", "6-20 души", "21-50 души", "50+ души"];

const SERVICE_INTERESTS = [
  "Уеб платформи & E-commerce",
  "AI асистенти & чатботове",
  "Автоматизация на админ / процеси",
  "Скрейпване & бази с данни",
  "Имейл маркетинг & кампании",
  "SEO & AI Search",
  "Визуален контент & реклама",
  "Логистика & плащания",
  "Мониторинг & операции",
  "Поддръжка / Retainer",
  "Не съм сигурен — нужна е консултация",
];

const BUDGETS = [
  "до 1 000 €",
  "1 000 - 3 000 €",
  "3 000 - 7 000 €",
  "7 000 - 15 000 €",
  "над 15 000 €",
  "Не съм сигурен — обсъждам",
];

const TIMELINES = [
  "Спешно (под 2 седмици)",
  "1 месец",
  "2-3 месеца",
  "Гъвкаво (3+ месеца)",
  "Само проучвам",
];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  businessType: string;
  teamSize: string;
  services: string[];
  pains: string;
  budget: string;
  timeline: string;
  details: string;
  voucher: boolean;
  consent: boolean;
};

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    teamSize: "",
    services: [],
    pains: "",
    budget: "",
    timeline: "",
    details: "",
    voucher: false,
    consent: false,
  });

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleService = (s: string) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s],
    }));
  };

  const canProceedStep1 = form.name.trim() && form.email.trim() && form.consent;
  const canProceedStep2 = form.businessType && form.teamSize;
  const canSubmit = form.services.length > 0 && form.budget && form.timeline;

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.message || "Грешка при изпращане");
      setDone(true);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Неочаквана грешка";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div>
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-5 pb-16 pt-40 text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#1A2B48]">Получено · {new Date().toLocaleDateString("bg-BG")}</div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Благодарим, {form.name.split(" ")[0]}!
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[color:var(--muted)]">
            Получихме заявката ти. Преглеждам всеки бизнес лично и отговарям с конкретни въпроси и/или оферта в рамките на <span className="font-semibold text-[color:var(--text)]">24 часа</span> на <span className="font-semibold text-[color:var(--text)]">{form.email}</span>.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-[color:var(--muted)]">
            За спешни проекти — пиши директно в Telegram или на simeondimitrov@eufashioninstitute.com.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/uslugi"
              className="inline-flex bg-[color:var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              Виж услугите →
            </Link>
            <Link
              href="/"
              className="inline-flex border border-[color:var(--stroke)] bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-[color:var(--text)]"
            >
              Към начало
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 pb-16 pt-40">
        {/* Hero */}
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Безплатна консултация · 30 минути
          </div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Кратка анкета за бизнеса ти
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-[color:var(--muted)]">
            3-4 минути. Отговарям лично на всяка заявка в рамките на 24 часа с конкретни въпроси и/или оферта.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={
                "h-1 w-12 transition-colors " + (n <= step ? "bg-[color:var(--accent)]" : "bg-[color:var(--stroke)]")
              }
            />
          ))}
        </div>
        <div className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
          Стъпка {step} от 3
        </div>

        {/* Step 1 — Contact */}
        {step === 1 ? (
          <section className="mt-8 space-y-5 border border-[color:var(--stroke)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight">Кой се свързва?</h2>

            <Field label="Име и фамилия *">
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Иван Петров"
                className="input"
              />
            </Field>

            <Field label="Фирма (или 'Физическо лице')">
              <input
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Example ООД"
                className="input"
              />
            </Field>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Имейл *">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="ivan@example.com"
                  className="input"
                />
              </Field>

              <Field label="Телефон">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+359..."
                  className="input"
                />
              </Field>
            </div>

            <Field label="Уебсайт (ако има)">
              <input
                type="url"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                placeholder="https://example.com"
                className="input"
              />
            </Field>

            <label className="flex items-start gap-3 text-sm leading-6 text-[color:var(--muted)]">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                Съгласен съм данните ми да бъдат обработени за връзка по тази заявка съгласно
                <Link href="/terms#gdpr" className="ml-1 font-semibold text-[color:var(--accent)] underline">
                  политиката за GDPR
                </Link>
                . Не получавам маркетинг съобщения без отделно съгласие.
              </span>
            </label>

            <div className="flex justify-end pt-2">
              <button
                disabled={!canProceedStep1}
                onClick={() => setStep(2)}
                className="bg-[color:var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-40"
              >
                Продължи →
              </button>
            </div>
          </section>
        ) : null}

        {/* Step 2 — Business */}
        {step === 2 ? (
          <section className="mt-8 space-y-6 border border-[color:var(--stroke)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight">За бизнеса</h2>

            <Field label="Тип бизнес *">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {BUSINESS_TYPES.map((t) => (
                  <Pill key={t} active={form.businessType === t} onClick={() => update("businessType", t)}>
                    {t}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label="Размер на екипа *">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                {TEAM_SIZES.map((t) => (
                  <Pill key={t} active={form.teamSize === t} onClick={() => update("teamSize", t)}>
                    {t}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label="Какво те боли в бизнеса в момента? (свободен текст)">
              <textarea
                value={form.pains}
                onChange={(e) => update("pains", e.target.value)}
                rows={4}
                placeholder="Напр.: Затрупан съм с админ. Клиентите не плащат на време. Сайтът ми е стар."
                className="input"
              />
            </Field>

            <label className="flex items-start gap-3 text-sm leading-6 text-[color:var(--muted)]">
              <input
                type="checkbox"
                checked={form.voucher}
                onChange={(e) => update("voucher", e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span>
                Интересува ме <span className="font-semibold text-[color:var(--text)]">ваучерната програма за обучение</span> на Агенция по заетостта (държавно финансирано обучение по DigComp).
              </span>
            </label>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(1)}
                className="border border-[color:var(--stroke)] bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest"
              >
                ← Назад
              </button>
              <button
                disabled={!canProceedStep2}
                onClick={() => setStep(3)}
                className="bg-[color:var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-40"
              >
                Продължи →
              </button>
            </div>
          </section>
        ) : null}

        {/* Step 3 — Project */}
        {step === 3 ? (
          <section className="mt-8 space-y-6 border border-[color:var(--stroke)] bg-white p-6 md:p-8">
            <h2 className="text-xl font-semibold tracking-tight">За проекта</h2>

            <Field label="Кои услуги те интересуват? * (мулти-избор)">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {SERVICE_INTERESTS.map((s) => (
                  <Pill key={s} active={form.services.includes(s)} onClick={() => toggleService(s)}>
                    {s}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label="Прогнозен бюджет *">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {BUDGETS.map((b) => (
                  <Pill key={b} active={form.budget === b} onClick={() => update("budget", b)}>
                    {b}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label="Кога искаш да започнем? *">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {TIMELINES.map((t) => (
                  <Pill key={t} active={form.timeline === t} onClick={() => update("timeline", t)}>
                    {t}
                  </Pill>
                ))}
              </div>
            </Field>

            <Field label="Допълнителни детайли (опционално)">
              <textarea
                value={form.details}
                onChange={(e) => update("details", e.target.value)}
                rows={4}
                placeholder="Кратко описание на проекта, конкретни цели, срокове..."
                className="input"
              />
            </Field>

            {error ? (
              <div className="border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                Грешка: {error}
              </div>
            ) : null}

            <div className="flex justify-between pt-2">
              <button
                onClick={() => setStep(2)}
                disabled={submitting}
                className="border border-[color:var(--stroke)] bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest disabled:opacity-40"
              >
                ← Назад
              </button>
              <button
                disabled={!canSubmit || submitting}
                onClick={submit}
                className="bg-[color:var(--accent)] px-8 py-3 text-sm font-bold uppercase tracking-widest text-white disabled:opacity-40"
              >
                {submitting ? "Изпращам..." : "Изпрати заявка →"}
              </button>
            </div>
          </section>
        ) : null}

        {/* Quick contact */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-[color:var(--stroke)] bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Имейл</div>
            <a href="mailto:simeondimitrov@eufashioninstitute.com" className="mt-1 block text-sm font-semibold text-[color:var(--text)] hover:text-[color:var(--accent)]">
              simeondimitrov@eufashioninstitute.com
            </a>
          </div>
          <div className="border border-[color:var(--stroke)] bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Местоположение</div>
            <div className="mt-1 text-sm font-semibold text-[color:var(--text)]">София, България</div>
          </div>
          <div className="border border-[color:var(--stroke)] bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Време за отговор</div>
            <div className="mt-1 text-sm font-semibold text-[color:var(--text)]">До 24 часа</div>
          </div>
        </div>

        <style jsx>{`
          .input {
            display: block;
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid var(--stroke);
            background: white;
            font-size: 0.95rem;
            color: var(--text);
            outline: none;
          }
          .input:focus {
            border-color: var(--accent);
          }
        `}</style>
      </main>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">{label}</div>
      {children}
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "border px-3 py-2 text-left text-sm transition-colors " +
        (active
          ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
          : "border-[color:var(--stroke)] bg-white text-[color:var(--text)] hover:border-[color:var(--accent)]")
      }
    >
      {children}
    </button>
  );
}
