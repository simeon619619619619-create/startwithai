import SiteHeader from "@/components/SiteHeader";

export default function TermsPage() {
  return (
    <div>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-16 pt-40">
        <h1 className="text-3xl font-semibold text-[color:var(--text)]">Общи условия</h1>
        <p className="mt-3 max-w-3xl text-[color:var(--muted)]">
          Плейсхолдър — тук ще качим официалните общи условия на Програма „Интелигентен растеж“.
        </p>

        <div className="mt-8 border border-[color:var(--stroke)] bg-white p-6 text-sm leading-6 text-[color:var(--muted)]">
          <p>
            <span className="font-semibold text-[color:var(--text)]">Важно:</span> Участието е възможно само при одобрение и след приемане на общите
            условия.
          </p>
          <p className="mt-4">(Текстът ще бъде предоставен от юридическия екип.)</p>
        </div>
      </main>
    </div>
  );
}
