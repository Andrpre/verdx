  import type { Metadata } from "next";
  import Link from "next/link";
  import { Geist, Geist_Mono } from "next/font/google";
  import "./globals.css";

  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  export const metadata: Metadata = {
    title: "verdx",
    description: "Сервис для разрешения споров",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="ru">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="bg-white border-b px-4 py-3 shadow-sm">
            <nav className="flex gap-4">
              <Link href="/">Главная</Link>
              <Link href="/profile">Профиль</Link>
              <Link href="/auth/signin">Вход</Link>
              <Link href="/auth/signup">Регистрация</Link>
            </nav>
          </header>
          <main className="p-4">{children}</main>
        </body>
      </html>
    );
  }
