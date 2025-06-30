import router from "@/config/routes";


export type Curso = {
  id: string;
  nome: string;
  descricao: string;
  capa: string;
  inscricoes: number;
  inicio: Date;
  inscrito?: boolean;
  inscricao_cancelada?: boolean;
};

export type Usuario = {
  nome: string;
  email: string;
  senha: string;
  nascimento: string;
};


async function request(
  path: string,
  options: { method?: string; body?: any } = {}
) {
  const res = await fetch(`${router.root}${path}`, {
    method: options.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw error || new Error(`Erro HTTP ${res.status}`);
  }
  return res.json();
}


export async function CreateUser(
  data: Usuario
): Promise<{ id: number; nome: string; email: string; nascimento: string }> {
  return request(router.criarUsuario(), {
    method: "POST",
    body: data,
  });
}

export async function Login(
  data: { email: string; senha: string }
): Promise<void> {
  await request(router.login(), {
    method: "POST",
    body: data,
  });
}

export async function Me(): Promise<{
  id: number;
  nome: string;
  email: string;
}> {
  return request(router.meUsuario());
}


export async function ListarCursos(): Promise<Curso[]> {
  type RawCurso = Omit<Curso, "inicio"> & { inicio: string };
  const raw = (await request(router.listarCursos())) as RawCurso[];
  return raw.map((c) => ({
    ...c,
    inicio: new Date(c.inicio),
  }));
}


export async function Inscricao(
  idCurso: string
): Promise<{ mensagem?: string }> {
  return request(router.inscricao(idCurso), { method: "POST" });
}

export async function Cancelar(
  idCurso: string
): Promise<{ mensagem?: string }> {
  return request(router.cancelar(idCurso), { method: "DELETE" });
}


export async function MeusCursos(
  idUsuario: string
): Promise<Curso[]> {
  type RawCurso = Omit<Curso, "inicio"> & { inicio: string };
  const raw = (await request(router.meusCursos(idUsuario))) as RawCurso[];
  return raw.map((c) => ({
    ...c,
    inicio: new Date(c.inicio),
  }));
}

export async function Logout(): Promise<void> {
  await request("/login/logout", { method: "POST" });
  window.location.reload();
}