import SiteHeader from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <h1 className="text-3xl font-semibold text-[color:var(--text)]">Контакти</h1>
        <p className="mt-3 text-[color:var(--muted)]">Плейсхолдър — ще се попълни с реални данни.</p>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-[color:var(--stroke)] bg-white p-5">
            <div className="font-semibold text-[color:var(--text)]">Имейл</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">contact@techaid-portal.bg</div>
          </div>
          <div className="border border-[color:var(--stroke)] bg-white p-5">
            <div className="font-semibold text-[color:var(--text)]">Телефон</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">+359 000 000 000</div>
          </div>
          <div className="border border-[color:var(--stroke)] bg-white p-5">
            <div className="font-semibold text-[color:var(--text)]">Адрес</div>
            <div className="mt-2 text-sm text-[color:var(--muted)]">София, България</div>
          </div>
        </div>
      </main>
    </div>
  );
}
