"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/lib/methods";

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    nascimento: "",
    email: "",
    senha: "",
  });
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await CreateUser(form);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <main>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="page-title">Cadastro</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="max-w-96 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome</label>
            <input
              name="nome"
              id="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="border h-10 rounded-xl px-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nascimento">Data de nascimento</label>
            <input
              type="date"
              name="nascimento"
              id="nascimento"
              value={form.nascimento}
              onChange={handleChange}
              required
              className="border h-10 rounded-xl px-4"
            />
          </div>
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
        </div>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}
