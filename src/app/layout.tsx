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
      <body className="antialiased">{children}</body>
    </html>
  );
}
