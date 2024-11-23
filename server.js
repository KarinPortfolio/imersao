import express from "express";
// Importa as rotas definidas no arquivo postsRoutes.js
import routes from "./src/routes/postsRoutes.js";

// Cria uma nova instância do servidor Express
const app = express();
// Serve arquivos estáticos
app.use(express.static("uploads"));
// Registra as rotas no servidor Express
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
  console.log("Servidor escutando...");
});