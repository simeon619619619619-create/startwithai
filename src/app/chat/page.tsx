"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
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

function formatDay(d: Date) {
  const day = pad2(d.getDate());
  const month = pad2(d.getMonth() + 1);
  return `${day}.${month}`;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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
      "Каква е най-важната Ви цел за приход/ефективност в следващите 12 месеца?",
      "Кои 1–2 процеса в момента Ви крадат най-много време?",
      "Колко служители сте (10–80) и кои отдели са най-засегнати?",
      "Как изглежда успехът за Вас след 90 дни (в часове, разходи или капацитет)?",
      "Кой ще е контактното лице от Ваша страна за координация (име + роля)?",
      "Изберете ден и час за кратка проверка на допустимост (15 мин).",
    ],
    []
  );

  const tips = useMemo(
    () => [
      "Отговорете с 1 изречение цел + число. Пример: „+20% приход“ или „-10 ч/седмица ръчни задачи“.",
      "Назовете процес + честота + време. Пример: „офертиране (20/седм, 15 мин)“.",
      "Дайте диапазон + отдели. Пример: „32 души: продажби 6, бекофис 8, операции 12“.",
      "Опишете метрика за успех. Пример: „-120 ч/месец, +скорост на обработка 30%“.",
      "Име + роля + контакт. Пример: „Мария Иванова, Operations Manager“.",
      "Изберете удобен слот от календара. (Показваме само Tue/Wed/Thu 12:00–16:00.)",
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Array<{ q: string; a: string }>>([]);
  const [done, setDone] = useState(false);
  const [clarifyQ, setClarifyQ] = useState<string | null>(null);
  const [clarifyAttempts, setClarifyAttempts] = useState<Record<number, number>>({});
  const [busy, setBusy] = useState(false);

  const [sessionId, setSessionId] = useState<string>("");
  const [leadId, setLeadId] = useState<string>("");

  const isScheduleStep = idx === 5; // Q6

  async function syncLead(nextAnswers: Array<{ q: string; a: string }>, nextIdx: number, completed: boolean) {
    if (!sessionId || !leadId) return;
    try {
      await fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: leadId,
          sessionId,
          website,
          email,
          progress: nextIdx,
          completed,
          lastQuestion: questions[Math.min(nextIdx, questions.length - 1)] || null,
          answers: nextAnswers.reduce((acc, x) => {
            acc[x.q] = x.a;
            return acc;
          }, {} as Record<string, string>),
        }),
      });
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    // Session + lead ids
    try {
      const sidKey = "swai_session_id";
      const lidKey = "swai_lead_id";

      let sid = localStorage.getItem(sidKey) || "";
      if (!sid) {
        sid = crypto.randomUUID();
        localStorage.setItem(sidKey, sid);
      }

      let lid = localStorage.getItem(lidKey) || "";
      if (!lid) {
        lid = crypto.randomUUID();
        localStorage.setItem(lidKey, lid);
      }

      setSessionId(sid);
      setLeadId(lid);

      // Track chat entry
      fetch("/api/track/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sid,
          path: "/chat",
          website,
          email,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
        }),
      }).catch(() => null);

      // Ensure lead exists immediately (even before first answer)
      fetch("/api/leads/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lid,
          sessionId: sid,
          website,
          email,
          progress: 0,
          completed: false,
          answers: {},
        }),
      }).catch(() => null);
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scheduleWindow = useMemo(() => {
    // Next 3 days are blocked (busy)
    const now = new Date();
    const blockedUntil = addDays(
      new Date(now.getFullYear(), now.getMonth(), now.getDate()),
      3
    );

    const allowed = new Set([2, 3, 4]); // Tue/Wed/Thu

    const start = blockedUntil;
    const days: Date[] = [];
    for (let i = 0; i < 45; i++) {
      const d = addDays(start, i);
      if (allowed.has(d.getDay())) days.push(d);
      if (days.length >= 18) break; // enough for calendar
    }

    const end = days.length ? days[days.length - 1] : addDays(start, 14);
    return { start, end, allowed };
  }, []);

  const scheduleDays = useMemo(() => {
    const days: Date[] = [];
    const total = 42; // 6 weeks grid
    const start = new Date(
      scheduleWindow.start.getFullYear(),
      scheduleWindow.start.getMonth(),
      scheduleWindow.start.getDate()
    );

    // align to Monday
    const dow = start.getDay(); // 0 Sun
    const delta = (dow + 6) % 7; // Mon=0
    const gridStart = addDays(start, -delta);

    for (let i = 0; i < total; i++) days.push(addDays(gridStart, i));
    return days;
  }, [scheduleWindow.start]);

  const allowedDaysSet = useMemo(() => {
    // Allowed days must be Tue/Wed/Thu and not within blocked 3 days
    const set = new Set<string>();
    for (const d of scheduleDays) {
      const key = d.toISOString().slice(0, 10);
      if (
        d >= scheduleWindow.start &&
        scheduleWindow.allowed.has(d.getDay())
      ) {
        set.add(key);
      }
    }
    return set;
  }, [scheduleDays, scheduleWindow]);

  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const timeSlotsForSelectedDay = useMemo(() => {
    if (!selectedDay) return [] as Date[];
    const slots: Date[] = [];
    for (let h = 12; h < 16; h++) {
      slots.push(
        new Date(
          selectedDay.getFullYear(),
          selectedDay.getMonth(),
          selectedDay.getDate(),
          h,
          0
        )
      );
      slots.push(
        new Date(
          selectedDay.getFullYear(),
          selectedDay.getMonth(),
          selectedDay.getDate(),
          h,
          30
        )
      );
    }
    return slots;
  }, [selectedDay]);

  function questionMsg(i: number) {
    return `Въпрос ${i + 1}/${questions.length}: ${questions[i]}`;
  }

  function tipMsg(i: number) {
    return `Как да отговорите: ${tips[i]}`;
  }

  const [msgs, setMsgs] = useState<ChatMsg[]>(() => {
    const intro: ChatMsg[] = [];

    if (website) intro.push({ role: "agent", text: `Сайт: ${website}` });
    if (email) intro.push({ role: "agent", text: `Имейл: ${email}` });

    intro.push({
      role: "agent",
      text:
        "Ще Ви направим персонален анализ и план за внедряване. Започваме с 6 кратки въпроса.",
    });

    intro.push({ role: "agent", text: questionMsg(0) });
    intro.push({ role: "agent", text: tipMsg(0) });

    return intro;
  });

  function pushAgent(text: string) {
    setMsgs((m) => {
      const last = m[m.length - 1];
      if (last?.role === "agent" && last.text === text) return m; // avoid duplicates
      return [...m, { role: "agent", text }];
    });
  }

  function pushUser(text: string) {
    setMsgs((m) => [...m, { role: "user", text }]);
  }

  function acceptAnswer(v: string) {
    const q = questions[idx];
    const nextAnswers = [...answers, { q, a: v }];

    pushUser(v);
    setAnswers(nextAnswers);
    setInput("");
    setClarifyQ(null);

    const next = idx + 1;

    // persist partial progress
    syncLead(nextAnswers, Math.min(next, questions.length), false);

    if (next >= questions.length) {
      pushAgent("Супер. Това е достатъчно за старт.");
      pushAgent(
        "Натисни „Финализирай“, за да запазим отговорите и да ти върнем следващите стъпки."
      );
      setDone(true);
      return;
    }

    setIdx(next);
    setClarifyAttempts((m) => ({ ...m, [next]: 0 }));
    pushAgent(questionMsg(next));
    // show tip except for the calendar step (it already has UI)
    if (next !== 5) pushAgent(tipMsg(next));
  }

  async function validateWithAI(question: string, answer: string) {
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer, website, email }),
    });
    const j = await r.json().catch(() => null);
    if (!r.ok || !j?.ok) {
      return {
        valid: true,
        followup: "",
        reason:
          j?.message ||
          "(AI проверката временно не е налична. Продължаваме.)",
      };
    }
    return { valid: !!j.valid, followup: j.followup || "", reason: j.reason || "" };
  }

  function isSkipAnswer(v: string) {
    const t = v.trim().toLowerCase();
    if (!t) return false;
    const skips = [
      "не знам",
      "нз",
      "не съм сигурен",
      "не съм сигурна",
      "нямам информация",
      "не мога",
      "нямам",
      "нямам идея",
      "не е ясно",
      "не в момента",
      "по-късно",
      "skip",
      "пропусни",
    ];
    return skips.some((s) => t === s || t.startsWith(s + " "));
  }

  async function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;

    const v = input.trim();
    if (!v) return;

    // calendar step is handled by buttons, not the text form
    if (isScheduleStep) {
      acceptAnswer(v);
      return;
    }

    // If user explicitly doesn't know, record and move on.
    if (isSkipAnswer(v)) {
      acceptAnswer("(не знам)");
      return;
    }

    setBusy(true);
    try {
      const q = clarifyQ || questions[idx];
      const verdict = await validateWithAI(q, v);

      if (!verdict.valid && verdict.followup) {
        const attempts = (clarifyAttempts[idx] ?? 0) + 1;
        setClarifyAttempts((m) => ({ ...m, [idx]: attempts }));

        // If we already asked once and still not getting a good answer — record what we have and move on.
        if (attempts >= 2) {
          acceptAnswer(v || "(неясно)");
          return;
        }

        // Ask clarification
        pushUser(v);
        setInput("");
        setClarifyQ(verdict.followup);
        pushAgent(verdict.followup);
        pushAgent(
          "Ако не сте сигурни, може да напишете „не знам“ и ще продължим към следващия въпрос."
        );
        return;
      }

      acceptAnswer(v);
    } finally {
      setBusy(false);
    }
  }

  function finalize() {
    const payload: ChatLead = {
      website: website || undefined,
      email: email || undefined,
      answers,
      submittedAt: new Date().toISOString(),
    };

    // mark completed server-side
    syncLead(answers, questions.length, true);

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--stroke)] bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-sky-400/80 via-emerald-300/60 to-sky-400/30 ring-1 ring-white/15" />
            <div className="font-semibold tracking-tight text-[color:var(--text)]">startwithai</div>
          </div>
          <button
            onClick={() => router.push("/")}
            className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)]"
          >
            ← Назад
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-5 pb-14">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-balance text-center text-2xl font-semibold tracking-tight text-[color:var(--text)] md:text-3xl">
            Чат за бърза проверка
          </h1>
          <p className="mt-3 text-center text-sm leading-6 text-[color:var(--muted)]">
            Отговори кратко. След 6 въпроса записваме заявката.
          </p>

          <div className="mt-8 rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-5 shadow-sm">
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
                        ? "max-w-[90%] rounded-2xl border border-[color:var(--stroke)] bg-white px-4 py-3 text-sm text-[color:var(--text)] shadow-sm"
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
                <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
                  Свободни часове (вторник/сряда/четвъртък, 12:00–16:00)
                </div>

                {/* Calendar grid */}
                <div className="mt-3 rounded-2xl border border-[color:var(--stroke)] bg-white p-4 shadow-sm">
                  <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-semibold uppercase tracking-widest text-[color:var(--muted-2)]">
                    <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
                  </div>

                  <div className="mt-3 grid grid-cols-7 gap-2">
                    {scheduleDays.map((d) => {
                      const key = d.toISOString().slice(0, 10);
                      const enabled = allowedDaysSet.has(key);
                      const isSelected = selectedDay ? sameDay(d, selectedDay) : false;
                      const faded = d.getMonth() !== scheduleWindow.start.getMonth();

                      return (
                        <button
                          key={key}
                          type="button"
                          disabled={!enabled}
                          onClick={() => setSelectedDay(d)}
                          className={
                            "h-9 rounded-xl border text-xs font-semibold transition-colors " +
                            (enabled
                              ? "border-[color:var(--stroke)] bg-white text-[color:var(--text)] hover:bg-slate-50"
                              : "border-[color:var(--stroke)] bg-white/50 text-[color:var(--muted-2)]") +
                            (isSelected ? " ring-2 ring-sky-400/50" : "") +
                            (faded ? " opacity-50" : "")
                          }
                          title={enabled ? `Свободно: ${formatDay(d)}` : `Заето/неактивно: ${formatDay(d)}`}
                        >
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-3 text-xs text-[color:var(--muted)]">
                    Следващите 3 дни са заети. Активни са само вторник/сряда/четвъртък.
                  </div>
                </div>

                {/* Time picker */}
                {selectedDay ? (
                  <div className="mt-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
                      Избери точен час за {formatDay(selectedDay)}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                      {timeSlotsForSelectedDay.map((s) => (
                        <button
                          key={s.toISOString()}
                          type="button"
                          onClick={() => acceptAnswer(formatSlot(s))}
                          className="rounded-xl border border-[color:var(--stroke)] bg-white px-3 py-2 text-xs font-semibold text-[color:var(--text)] shadow-sm hover:bg-slate-50"
                        >
                          {pad2(s.getHours())}:{pad2(s.getMinutes())}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-xs text-[color:var(--muted)]">
                    Първо избери ден от календара.
                  </div>
                )}
              </div>
            ) : (
              <form
                onSubmit={submitAnswer}
                className="mt-5 flex flex-col gap-3 md:flex-row md:items-center"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 rounded-xl border border-[color:var(--stroke)] bg-white px-4 py-3 text-sm text-[color:var(--text)] placeholder:text-[color:var(--muted)] shadow-sm"
                  placeholder={done ? "Готово" : busy ? "Проверявам отговора…" : "Напиши отговор…"}
                  disabled={done || busy}
                />
                <button
                  type="submit"
                  disabled={done || busy}
                  className="rounded-xl bg-gradient-to-r from-sky-400 to-emerald-300 px-6 py-3 text-sm font-bold text-black disabled:opacity-40"
                >
                  {busy ? "…" : "Изпрати"}
                </button>
              </form>
            )}

            {done ? (
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-xs text-[color:var(--muted)]">
                  {answers.length}/{questions.length} отговора
                </div>
                <button
                  onClick={finalize}
                  className="rounded-xl bg-[color:var(--accent)] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(37,99,235,0.18)] hover:bg-[color:var(--accent-2)]"
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
        <div className="min-h-screen bg-[color:var(--bg)] pt-24 text-center text-sm text-[color:var(--muted)]">
          Зареждане…
        </div>
      }
    >
      <ChatInner />
    </Suspense>
  );
}
