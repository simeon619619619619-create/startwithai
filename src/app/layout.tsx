import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Програма „Интелигентен растеж“ — кандидатстване за AI одит",
  description:
    "Проверка на допустимост + безплатен AI одит и внедряване по ваучерната схема на Агенция по заетостта (при одобрение).",
  metadataBase: new URL("https://startwithai.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className="antialiased">
        {children}
        <footer className="border-t border-[color:var(--stroke)] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-6 text-center text-[11px] font-semibold uppercase tracking-widest text-[color:var(--muted)]">
            Сертификатите и документите по програмата са признати в цяла Европа.
          </div>
        </footer>
      </body>
    </html>
  );
}
