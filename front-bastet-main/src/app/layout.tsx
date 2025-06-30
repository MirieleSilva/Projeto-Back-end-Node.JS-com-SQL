import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import UserMenu from "@/components/UserMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bastet",
  description: "Plataforma de cursos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col gap-10">
          <header className="layout-guide h-[16rem] flex flex-col justify-end">
            <h1 className="text-5xl font-bold py-5">
              <Link href="/" className="text-indigo-800 hover:text-indigo-900">
                Bastet
              </Link>
            </h1>
            <p>Uma nova plataforma de cursos</p>
            <menu className="flex flex-row gap-4">
              <UserMenu />
            </menu>
          </header>
          <div className="layout-guide flex-1">
            {children}
          </div>
          <footer className="bg-indigo-800">
            <p className="p-4 text-center text-white text-sm">
              A plataforma Bastet faz parte de um projeto criado para fins didáticos para a disciplina de Backend Node.js com SQL no Instituto INFnet.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
