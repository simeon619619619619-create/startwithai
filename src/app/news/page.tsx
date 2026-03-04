import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

type NewsItem = {
  date: string;
  title: string;
  tag?: string;
  excerpt?: string;
};

export default function NewsPage() {
  const items: NewsItem[] = [
    {
      date: "26.02.2026",
      title: "Отворен прием за кандидати по Програма „Интелигентен растеж“",
      tag: "Администрация",
      excerpt: "Публикувахме обновени насоки за допустимост и документи. Кандидатстването започва с проверка на сайта и служебен имейл.",
    },
    {
      date: "24.02.2026",
      title: "Добавени 8 специализирани AI модула към 90-дневния план",
      excerpt: "CEO/COO, Inbox, Calendar, HR, Finance, Marketing и Sales — модулите се избират според целите и тесните места.",
    },
    {
      date: "21.02.2026",
      title: "Нов процес: анализ → консултация → документи → внедряване",
      excerpt: "Разгърнахме процеса до 6 ясни стъпки с пълна прозрачност и отчетност за ефекта.",
    },
  ];

  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Новини</div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-4xl">Актуално</h1>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-[color:var(--muted)]">
            Обновления по програмата, процеса и модулите.
          </p>
        </div>

        <section className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4">
          {items.map((n) => (
            <article key={n.title} className="border border-[color:var(--stroke)] bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">{n.date}</div>
                {n.tag ? (
                  <span className="border border-[color:var(--stroke)] bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-[color:var(--muted)]">
                    {n.tag}
                  </span>
                ) : null}
              </div>
              <h2 className="mt-3 text-lg font-semibold text-[color:var(--text)]">{n.title}</h2>
              {n.excerpt ? <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{n.excerpt}</p> : null}
              <div className="mt-4">
                <Link
                  href="/"
                  className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)] hover:text-[color:var(--text)]"
                >
                  ← Назад
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
