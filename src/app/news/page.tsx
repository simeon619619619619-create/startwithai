import SiteHeader from "@/components/SiteHeader";
import { NEWS } from "@/lib/news";

export default function NewsPage() {
  return (
    <div>
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">Новини</div>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-[color:var(--text)] md:text-4xl">Актуално</h1>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-[color:var(--muted)]">
            Подбрани официални източници и теми, които са релевантни за дигитални умения, финансиране и AI внедряване.
          </p>
        </div>

        <section className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {NEWS.map((n) => (
            <article key={n.url} className="border border-[color:var(--stroke)] bg-white">
              <div className="h-44 w-full overflow-hidden border-b border-[color:var(--stroke)] bg-[#f3f6fb]">
                {/* Using <img> to avoid Next remote image config */}
                <img src={n.imageUrl} alt={n.imageAlt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">{n.sourceLabel}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--muted)]">
                    {new Date(n.date).toLocaleDateString("bg-BG")}
                  </div>
                </div>

                <h2 className="mt-3 text-base font-semibold leading-snug text-[color:var(--text)]">{n.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{n.excerpt}</p>

                <div className="mt-4">
                  <a
                    href={n.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex bg-[color:var(--accent)] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
                  >
                    Прочети повече →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
