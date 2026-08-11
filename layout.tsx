import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcade — UI Demo",
  description: "Mobile-first arcade interface demo"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}