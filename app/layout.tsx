import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcade.Play",
  description: "Arcade mobile com login, perfil e jogos demonstrativos"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
