import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import autenticar from "../middlewares/auth"; 

const router = Router();
const prisma = new PrismaClient();


router.post("/cursos/:idCurso", autenticar, async (req: Request, res: Response): Promise<any> => {
  const { idCurso } = req.params;
  const usuarioId = req.usuario.id;

  try {
    
    const curso = await prisma.curso.findUnique({
      where: { id: Number(idCurso) }
    });

    if (!curso) {
      return res.status(404).json({ mensagem: "Curso não encontrado" });
    } 

    
    const jaInscrito = await prisma.inscricao.findUnique({
      where: {
        usuarioId_cursoId: {
          usuarioId,
          cursoId: Number(idCurso)
        }
      }
    });

    if (jaInscrito) {
      return res.status(400).json({ mensagem: "Usuário já está inscrito neste curso" });
    }

    
    const inscricao = await prisma.inscricao.create({
      data: {
        usuarioId,
        cursoId: Number(idCurso)
      }
    });

    return res.status(200).json({ mensagem: "Inscrição realizada com sucesso", inscricao });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao realizar inscrição" });
  }
});

router.delete("/cursos/:idCurso", autenticar, async (req: Request, res: Response): Promise<any> => {
  const { idCurso } = req.params;
  const usuarioId = req.usuario.id;

  try {
    
    const inscricao = await prisma.inscricao.findUnique({
      where: {
        usuarioId_cursoId: {
          usuarioId,
          cursoId: Number(idCurso)
        }
      }
    });

    if (!inscricao) {
      return res.status(404).json({ mensagem: "Inscrição não encontrada" });
    }

    
    await prisma.inscricao.delete({
      where: {
        usuarioId_cursoId: {
          usuarioId,
          cursoId: Number(idCurso)
        }
      }
    });

    return res.status(200).json({ mensagem: "Inscrição cancelada com sucesso" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro ao cancelar inscrição" });
  }
});


router.get("/:idUsuario", autenticar, async (req: Request, res: Response): Promise<any> => {
  const { idUsuario } = req.params;
  const usuarioId = req.usuario.id;

  
  if (Number(idUsuario) !== usuarioId) {
    return res.status(403).json({ mensagem: "Acesso negado" });
  }

  try {
    const cursosInscritos = await prisma.inscricao.findMany({
      where: {
        usuarioId: Number(idUsuario),
        cancelada: false,
      },
      include: {
        curso: {
        include: {
        inscricoes: true
      }
      }
      }
    });

    const resultado = cursosInscritos.map((inscricao) => {
      return {
  id: inscricao.curso.id,
  nome: inscricao.curso.nome,
  descricao: inscricao.curso.descricao,
  capa: inscricao.curso.capa,
  total_inscritos: inscricao.curso.inscricoes.length,
  inicio: inscricao.curso.inicio,
  inscricao_cancelada: inscricao.cancelada,
  inscrito: true,
};

    });

    return res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ mensagem: "Erro ao buscar inscrições" });
  }
});


export default router;
