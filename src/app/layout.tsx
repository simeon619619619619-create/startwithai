import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "startwithai — кандидатствай за безплатно обучение и сертификати (признати в цяла Европа)",
  description:
    "90-дневно внедряване: обучение + сертификация + реални AI автоматизации + измерим резултат — за фирми с 10–80 служители.",
  metadataBase: new URL("https://startwithai.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
