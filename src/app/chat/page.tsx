"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

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
      "Имате ли вътрешен човек за координация (не IT) или искате ние да поемем?",
      "Имате ли предпочитан ден/час за кратка проверка на допустимост (15 мин)?",
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Array<{ q: string; a: string }>>([]);
  const [done, setDone] = useState(false);

  const [msgs, setMsgs] = useState<ChatMsg[]>(() => {
    const intro: ChatMsg[] = [
      {
        role: "agent",
        text:
          "Ок. Имам информацията ти. Ще задам 6 кратки въпроса, за да направим план за внедряване.",
      },
    ];
    if (website) intro.push({ role: "agent", text: `Сайт: ${website}` });
    if (email) intro.push({ role: "agent", text: `Имейл: ${email}` });
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

  function submitAnswer(e: React.FormEvent) {
    e.preventDefault();
    const v = input.trim();
    if (!v) return;

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
