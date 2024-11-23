// Importa o módulo Express para criar um servidor web
import express from "express";
// Importa o módulo Multer para lidar com uploads de arquivos
import multer from "multer"; 

// Importa funções para gerenciar posts do arquivo postsController.js
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}
// Configuração de armazenamento para uploads (somente para Windows)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define a pasta 'uploads' como destino para os arquivos salvos
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo
    cb(null, file.originalname);
  }
});

// Configuração de armazenamento para uploads (no Linux ou Mac não precisa da configuração do Windows)
 const upload = multer({dest:"./uploads", storage});

// Define as rotas da API (função 'routes')
const routes = (app) => {
  // Habilita o parseamento de dados JSON enviados na requisição
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para listar posts (executa a função 'listarPosts')
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (executa a função 'postarNovoPost')
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware 'upload.single("imagem")' 
  // e executa a função 'uploadImagem')
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost);
};


// Exporta a função 'routes' para ser usada em outros arquivos
export default routes;