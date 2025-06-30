import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    
    const cursos = await prisma.curso.findMany({
      include: { inscricoes: true },
    });

    
    const resultado = cursos.map((c) => ({
      id: c.id.toString(),
      nome: c.nome,
      descricao: c.descricao,
      capa: c.capa,
      inicio: c.inicio.toISOString(),
      inscricoes: c.inscricoes.length,
    }));

    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao listar cursos" });
  }
});

export default router;
