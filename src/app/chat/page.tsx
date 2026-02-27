"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function pad2(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatSlot(d: Date) {
  const day = pad2(d.getDate());
  const month = pad2(d.getMonth() + 1);
  const hh = pad2(d.getHours());
  const mm = pad2(d.getMinutes());
  return `${day}.${month} • ${hh}:${mm}`;
}

function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

type ChatMsg = {
  role: "agent" | "user";
  text: string;
};

type ChatLead = {
  website?: string;
  email?: string;
  answers: Array<{ q: string; a: string }>;
  submittedAt: string;
};

const KEY = "startwithai_chat_leads";

function ChatInner() {
  const sp = useSearchParams();
  const router = useRouter();

  const website = sp.get("website") || "";
  const email = sp.get("email") || "";

  const questions = useMemo(
    () => [
      "Каква е най-важната ти цел за приход/ефективност в следващите 12 месеца?",
      "Кои 1–2 процеса в момента ви крадат най-много време?",
      "Колко служители са в екипа (10–80) и кои отдели са най-засегнати?",
      "Как изглежда успехът за вас след 90 дни (в часове, разходи или капацитет)?",
      "Кой ще е контактното лице от ваша страна за координация (име + роля)?", 
      "Имате ли предпочитан ден/час за кратка проверка на допустимост (15 мин)?",
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Array<{ q: string; a: string }>>([]);
  const [done, setDone] = useState(false);

  const isScheduleStep = idx === 5; // Q6

  const scheduleSlots = useMemo(() => {
    // Next 3 days are blocked (busy)
    const now = new Date();
    const minDate = addDays(new Date(now.getFullYear(), now.getMonth(), now.getDate()), 3);

    // Allowed days: Tue/Wed/Thu
    const allowed = new Set([2, 3, 4]);

    // Generate up to next 3 eligible days
    const days: Date[] = [];
    for (let i = 0; i < 30 && days.length < 3; i++) {
      const d = addDays(minDate, i);
      if (allowed.has(d.getDay())) days.push(d);
    }

    // Slots between 12:00 and 16:00 (end exclusive) every 30 minutes
    const slots: Date[] = [];
    for (const day of days) {
      for (let h = 12; h < 16; h++) {
        slots.push(new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, 0));
        slots.push(new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, 30));
      }
    }

    return slots;
  }, []);

  const [msgs, setMsgs] = useState<ChatMsg[]>(() => {
    const intro: ChatMsg[] = [];

    if (website) intro.push({ role: "agent", text: `Сайт: ${website}` });
    if (email) intro.push({ role: "agent", text: `Имейл: ${email}` });

    intro.push({
      role: "agent",
      text:
        "Ще ти направим персонален анализ и план за внедряване. Започвам с 6 кратки въпроса.",
    });

    intro.push({
      role: "agent",
      text: `Въпрос 1/${questions.length}: ${questions[0]}`,
    });

    return intro;
  });

  function pushAgent(text: string) {
    setMsgs((m) => [...m, { role: "agent", text }]);
  }

  function pushUser(text: string) {
    setMsgs((m) => [...m, { role: "user", text }]);
  }

  function acceptAnswer(v: string) {
    const q = questions[idx];
    pushUser(v);
    setAnswers((prev) => [...prev, { q, a: v }]);
    setInput("");

    const next = idx + 1;
    if (next >= questions.length) {
      pushAgent("Супер. Това е достатъчно за старт.");
      pushAgent(
        "Натисни „Финализирай“, за да запазим отговорите и да ти върнем следващите стъпки."
      );
      setDone(true);
      return;
    }

    setIdx(next);
    pushAgent(`Въпрос ${next + 1}/${questions.length}: ${questions[next]}`);
  }

  function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;
    acceptAnswer(v);
  }

  function finalize() {
    const payload: ChatLead = {
      website: website || undefined,
      email: email || undefined,
      answers,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem(KEY) || "[]") as ChatLead[];
      existing.push(payload);
      localStorage.setItem(KEY, JSON.stringify(existing));
    } catch {
      // ignore
    }

    pushAgent("Готово. Получихме отговорите ти. Ще се свържем с теб.");
    setDone(false);
    setTimeout(() => router.push("/"), 1200);
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-24">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400/80 via-emerald-300/60 to-sky-400/30 ring-1 ring-white/15" />
            <div className="font-semibold tracking-tight text-white">startwithai</div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white"
          >
            ← Назад
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 pb-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-balance text-center text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Чат за бърза проверка
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-white/55">
            Отговори кратко. След 6 въпроса записваме заявката.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="space-y-3">
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "agent"
                      ? "flex justify-start"
                      : "flex justify-end"
                  }
                >
                  <div
                    className={
                      m.role === "agent"
                        ? "max-w-[90%] rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/90"
                        : "max-w-[90%] rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-300 px-4 py-3 text-sm font-semibold text-black"
                    }
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {isScheduleStep && !done ? (
              <div className="mt-5">
                <div className="text-xs font-semibold uppercase tracking-widest text-white/55">
                  Свободни часове (вторник/сряда/четвъртък, 12:00–16:00)
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                  {scheduleSlots.map((s) => (
                    <button
                      key={s.toISOString()}
                      type="button"
                      onClick={() => acceptAnswer(formatSlot(s))}
                      className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/10"
                    >
                      {formatSlot(s)}
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-xs text-white/35">
                  Следващите 3 дни са заети. Показваме първите свободни слотове във вторник/сряда/четвъртък.
                </div>
              </div>
            ) : (
              <form
                onSubmit={submitAnswer}
                className="mt-5 flex flex-col gap-3 md:flex-row md:items-center"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/25"
                  placeholder={done ? "Готово" : "Напиши отговор…"}
                  disabled={done}
                />
                <button
                  type="submit"
                  disabled={done}
                  className="rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300 px-6 py-3 text-sm font-bold text-black disabled:opacity-40"
                >
                  Изпрати
                </button>
              </form>
            )}

            {done ? (
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs text-white/40">
                  {answers.length}/{questions.length} отговора
                </div>
                <button
                  onClick={finalize}
                  className="rounded-xl bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/15"
                >
                  Финализирай →
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[color:var(--bg)] pt-24 text-center text-sm text-white/60">
          Зареждане…
        </div>
      }
    >
      <ChatInner />
    </Suspense>
  );
}
