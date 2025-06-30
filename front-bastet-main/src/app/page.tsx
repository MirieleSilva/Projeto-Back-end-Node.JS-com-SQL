"use client";

import { useState, useEffect } from "react";
import Curso from "@/components/curso";
import type { Curso as CursoType } from "@/lib/methods";
import { ListarCursos, Me, MeusCursos } from "@/lib/methods";

export default function Page() {
  const [cursos, setCursos] = useState<CursoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAll() {
      try {
        
        const all = await ListarCursos();

        
        let inscritosIds = new Set<string>();
        try {
          const user = await Me();
          const subs = await MeusCursos(user.id.toString());
          inscritosIds = new Set(subs.map((c) => c.id.toString()));
        } catch {
         
        }

        const merged = all.map((c) => {
          const idStr = c.id.toString();
          return {
            ...c,
            id: idStr,                    
            inicio: new Date(c.inicio),
            inscrito: inscritosIds.has(idStr),
          };
        });

        setCursos(merged);
      } catch (err) {
        console.error("Erro ao carregar cursos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);

  if (loading) {
    return <p>Carregando cursos…</p>;
  }

  return (
    <main>
      <h2 className="page-title">Cursos</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cursos.map((curso) => (
          <Curso
            key={curso.id}
            data={curso}
            showCancel={false}
          />
        ))}
      </div>
    </main>
  );
}
