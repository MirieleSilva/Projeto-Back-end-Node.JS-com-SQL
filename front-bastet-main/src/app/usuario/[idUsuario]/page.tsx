"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Curso from "@/components/curso";
import { MeusCursos } from "@/lib/methods";

export default function MeusCursosPage() {
  const params = useParams();
  
  const rawId = params.idUsuario;
  
  const idUsuario = Array.isArray(rawId) ? rawId[0] : rawId;

  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idUsuario) return;
    MeusCursos(idUsuario)
      .then(raw =>
        setCursos(raw.map((c: any) => ({ ...c, inicio: new Date(c.inicio) })))
      )
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [idUsuario]);

  if (loading) return <p>Carregando seus cursos…</p>;

  return (
    <main>
      <h2 className="page-title">Meus cursos</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {cursos.map(curso => (
          <Curso data={curso} key={curso.id} />
        ))}
      </div>
    </main>
  );
}

