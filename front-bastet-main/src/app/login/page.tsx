"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/lib/methods";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  try {
    await Login(form);
    router.replace("/");
  } catch (err: any) {
    setError(err.message);
  }
}
  return (
    <main>
      <form
        className="p-6 bg-indigo-50 max-w-96 rounded-3xl flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="page-title">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border h-10 rounded-xl px-4"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={form.senha}
            onChange={handleChange}
            required
            className="border h-10 rounded-xl px-4"
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <a href="/cadastro" className="text-indigo-600">Fazer cadastro</a>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
          >
            Entrar
          </button>
        </div>
      </form>
    </main>
  );
}

