const root = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export default {
  root,
  criarUsuario:       () => "/usuarios",
  login:                 () => "/login",
  listarCursos:       () => "/cursos",
  meUsuario: () => "/usuarios/me",
  inscricao:             (id: string) => `/inscricoes/cursos/${id}`,
  cancelar:              (id: string) => `/inscricoes/cursos/${id}`,
  meusCursos:   (userId: string) => `/inscricoes/${userId}`,
};
