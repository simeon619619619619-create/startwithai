import Link from "next/link";

export default function ThanksPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] pt-24">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--stroke)] bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[color:var(--accent)] to-[color:var(--accent-2)] ring-1 ring-[color:var(--stroke)]" />
            <div className="font-semibold tracking-tight text-[color:var(--text)]">startwithai</div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-5 pb-16">
        <div className="rounded-2xl border border-[color:var(--stroke)] bg-white/80 p-6 shadow-sm">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-[color:var(--text)] md:text-3xl">
            Благодарим Ви!
          </h1>
          <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
            Получихме заявката Ви. Очаквайте скоро да се свържем с Вас за кратка проверка на допустимост и следващи стъпки.
          </p>

          <div className="mt-5 rounded-xl border border-[color:var(--stroke)] bg-white p-4 text-sm text-[color:var(--muted)]">
            За повече информация се свържете с нас през (контакти).
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.18)] hover:bg-[color:var(--accent-2)]"
          >
            Обратно към сайта
          </Link>
        </div>
      </main>
    </div>
  );
}
