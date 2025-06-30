"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Me, Logout } from "@/lib/methods";

export default function UserMenu() {
  const [user, setUser] = useState<{ id: number; nome: string } | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    Me()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, [pathname]); 

  const handleLogout = async () => {
    await Logout();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  if (!user) {
    return (
      <>
        <Link className="text-indigo-600" href="/cadastro">Fazer cadastro</Link>
        <Link className="text-indigo-600" href="/login">Fazer login</Link>
      </>
    );
  }

  return (
    <>
      <span className="text-indigo-600">Olá, {user.nome}</span>
      <Link className="text-indigo-600" href="/">Home</Link>
      <Link className="text-indigo-600" href={`/usuario/${user.id}`}>Meus cursos</Link>
      <button onClick={handleLogout} className="text-indigo-600 ml-4">Logout</button>
    </>
  );
}
