"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  compact?: boolean;
  variant?: "default" | "header";
};

export default function IntakeBar({ compact, variant = "default" }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<"website" | "email">("website");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisNote, setAnalysisNote] = useState<string>("");

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

  function validateProfessionalEmail(v: string) {
    const t = (v || "").trim().toLowerCase();
    if (!t) return "Въведете фирмен имейл.";

    // Strict format requested: word@domain.com
    const strict = /^[a-z0-9]+@[a-z0-9-]+\.[a-z]{2,}$/i;
    if (!strict.test(t)) {
      return "Използвайте формат: word@domain.com (без точки/плюсове и без поддомейни).";
    }

    const domain = t.split("@")[1];
    if (disallowedEmailDomains.has(domain)) {
      return "Приемаме само фирмени имейли (не Gmail/Outlook/Abv и т.н.).";
    }

    return "";
  }

  async function analyzeThenContinue() {
    setAnalyzing(true);
    setError("");
    setAnalysisNote("Анализираме сайта…");

    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: website }),
      });
      const j = await r.json().catch(() => null);

      if (!j?.ok) {
        setAnalyzing(false);
        setAnalysisNote("");
        setError(j?.message || "Сайтът не може да бъде проверен.");
        setStep("website");
        return;
      }

      if (j.title || j.description) {
        setAnalysisNote(j.title ? `Открихме: ${j.title}` : "Анализът е готов.");
      }

      const waitMs = 3000 + Math.floor(Math.random() * 2000);
      await new Promise((res) => setTimeout(res, waitMs));

      setAnalyzing(false);
      setAnalysisNote("");
      setStep("email");
    } catch {
      setAnalyzing(false);
      setAnalysisNote("");
      setError("Не успяхме да достъпим сайта. Проверете URL.");
      setStep("website");
    }
  }

  function startChat() {
    const err = validateProfessionalEmail(email);
    setError(err);
    if (err) return;

    const qp = new URLSearchParams();
    if (website.trim()) qp.set("website", website.trim());
    qp.set("email", email.trim().toLowerCase());

    router.push(`/chat?${qp.toString()}`);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (analyzing) return;

    if (step === "website") {
      await analyzeThenContinue();
      return;
    }

    startChat();
  }

  return (
    <div className={compact ? "" : "border border-[color:var(--stroke)] bg-white"}>
      <form
        onSubmit={onSubmit}
        className={
          "flex flex-col gap-3 p-3 md:flex-row md:items-center" +
          (compact ? "" : "")
        }
      >
        {step === "website" ? (
          <div className="flex flex-1 items-center gap-3 border border-[color:var(--stroke)] bg-white px-4 py-3">
            <span className="text-[color:var(--muted)]">🌐</span>
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Линк към сайта на фирмата (URL)"
              className="w-full bg-transparent text-sm text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:outline-none"
            />
          </div>
        ) : (
          <div className="flex flex-1 items-center gap-3 border border-[color:var(--stroke)] bg-white px-4 py-3">
            <span className="text-[color:var(--muted)]">✉️</span>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="Фирмен имейл (напр. office@company.com)"
              className="w-full bg-transparent text-sm text-[color:var(--text)] placeholder:text-[color:var(--muted)] focus:outline-none"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={analyzing}
          className={
            (variant === "header"
              ? "border border-white/35 bg-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-[color:var(--accent)]"
              : "bg-[color:var(--accent)] px-6 py-3 text-sm font-bold uppercase tracking-widest text-white") +
            " disabled:opacity-60"
          }
        >
          {analyzing ? "АНАЛИЗИРАМЕ…" : step === "website" ? "ПРОДЪЛЖИ" : "ЗАПОЧНИ"}
        </button>
      </form>

      {analyzing ? (
        <div className="px-3 pb-3 text-sm text-[color:var(--muted)]">
          {analysisNote || "Анализираме сайта…"}
        </div>
      ) : null}

      {error ? (
        <div className="px-3 pb-3 text-sm text-red-700">{error}</div>
      ) : null}
    </div>
  );
}
