import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  question: string;
  answer: string;
  website?: string;
  email?: string;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return jsonError(
      "Липсва OPENAI_API_KEY във Vercel Environment Variables. Добави го в Project Settings → Environment Variables.",
      500
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return jsonError("Невалиден JSON.");
  }

  const question = (body.question || "").trim();
  const answer = (body.answer || "").trim();
  if (!question || !answer) {
    return jsonError("Липсва question/answer.");
  }

  const system =
    "Ти си B2B AI асистент за intake на фирми (10–80 служители) за 90-дневно AI внедряване. Говориш на български, официално (на Вие).";

  const userPrompt = `
Оцени дали отговорът е логичен и полезен за въпроса.

Въпрос: ${question}
Отговор: ${answer}

Контекст (ако има):
- сайт: ${body.website || ""}
- имейл: ${body.email || ""}

Върни САМО валиден JSON в следния формат:
{
  "valid": boolean,
  "reason": string,
  "followup": string
}

Правила:
- Ако отговорът е твърде кратък/неясен (напр. "да", "ок", "не знам", 1-2 думи) → valid=false и followup = един конкретен уточняващ въпрос.
- Ако има очевидна нелогичност/противоречие → valid=false и followup да изяснява.
- Ако е достатъчно конкретен → valid=true, followup="".
- followup трябва да е кратък, B2B, без излишни обяснения.
`.trim();

  const payload = {
    model: "gpt-4o-mini",
    temperature: 0.2,
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt },
    ],
  };

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!r.ok) {
    const t = await r.text().catch(() => "");
    return jsonError(`OpenAI error: ${r.status} ${t}`.slice(0, 800), 502);
  }

  const data = (await r.json()) as unknown;
  const text: string | undefined = (data as { choices?: Array<{ message?: { content?: string } }> })
    ?.choices?.[0]?.message?.content;
  if (!text) return jsonError("Празен отговор от модела.", 502);

  let parsed: { valid: boolean; reason: string; followup: string };
  try {
    parsed = JSON.parse(text);
  } catch {
    return jsonError("Моделът върна невалиден JSON.", 502);
  }

  return NextResponse.json({ ok: true, ...parsed });
}
