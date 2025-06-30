import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import autenticar from "../middlewares/auth";

console.log("🔔 ROTA /usuarios carregada");

const router = Router();
const prisma = new PrismaClient();


router.post("/", async (req: Request, res: Response): Promise<any> => {
  const { nome, email, senha, nascimento } = req.body;

  if (!nome || !email || !senha || !nascimento) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  try {
    const existe = await prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
        nascimento: new Date(nascimento),
      },
    });

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
});


router.get("/", async (_req: Request, res: Response): Promise<any> => {
  try {
    const usuarios = await prisma.usuario.findMany();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao buscar usuários" });
  }
});


router.get(
  "/me",
  autenticar,
  async (req: Request, res: Response): Promise<any> => {
    const { id, nome, email } = req.usuario!;
    return res.status(200).json({ id, nome, email });
  }
);


router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(id) }
    });

    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao buscar usuário" });
  }
});

export default router;
