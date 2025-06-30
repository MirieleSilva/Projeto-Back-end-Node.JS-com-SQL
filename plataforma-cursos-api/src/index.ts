import "dotenv/config"; 
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import usuarioRoutes from "./routes/usuario";
import loginRoutes from "./routes/login";
import cursosRoutes from "./routes/cursos";
import inscricoesRouter from "./routes/inscricoes";

const app = express();


app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("API Plataforma de Cursos funcionando!");
});


app.use("/usuarios", usuarioRoutes);
app.use("/login", loginRoutes);
app.use("/cursos", cursosRoutes);
app.use("/inscricoes", inscricoesRouter);


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

