import type { Curso as CursoType } from "@/lib/methods";
import Image from "next/image";
import { Inscricao, Cancelar } from "@/lib/methods";

interface Props {
  data: CursoType;
  showCancel?: boolean;
}

export default function CursoView({ data, showCancel = true }: Props) {
  const handleInscricao = async () => {
    try {
      await Inscricao(data.id.toString());
      window.location.reload();
    } catch (err: any) {
      alert(err.mensagem || "Falha ao inscrever");
    }
  };

  const handleCancelar = async () => {
    try {
      await Cancelar(data.id.toString());
      window.location.reload();
    } catch (err: any) {
      alert(err.mensagem || "Falha ao cancelar inscrição");
    }
  };

  return (
    <div className="border flex flex-col">
      <figure className="relative aspect-video">
        {data.capa ? (
          <Image src={data.capa} alt={data.nome} fill />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            Sem imagem
          </div>
        )}
        {data.inscrito && (
          <figcaption className="text-sm p-4 bg-slate-200 absolute m-4 shadow-xl border rounded-xl">
            Você já se inscreveu nesse curso
          </figcaption>
        )}
      </figure>
      <div className="p-6 flex-1 flex flex-col gap-2">
        <h3 className="text-2xl">{data.nome}</h3>
        <p>{data.descricao}</p>
        <div className="flex flex-wrap gap-1 mt-auto">
          <span className="text-xs py-1 px-2 bg-slate-200 rounded-2xl">
            {data.inscricoes} inscritos
          </span>
          <span className="text-xs py-1 px-2 bg-slate-200 rounded-2xl">
            Inicia em{" "}
            {data.inicio.toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {data.inscrito ? (
        showCancel ? (
          <button
            onClick={handleCancelar}
            className="w-full py-3 bg-red-500 text-white hover:bg-red-600"
          >
            Cancelar inscrição
          </button>
        ) : null
      ) : (
        <button
          onClick={handleInscricao}
          className="w-full py-3 bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Fazer inscrição
        </button>
      )}
    </div>
  );
}
