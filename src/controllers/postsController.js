
import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
// Importa o módulo fs para trabalhar com o sistema de arquivos
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js"
// Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
  // Chama a função getTodosPosts para obter todos os posts do banco de dados
  const posts = await getTodosPosts();
  // Envia uma resposta HTTP com status 200 (sucesso) e os posts no formato JSON
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;
  // Tenta criar o novo post
  try {
    // Chama a função criarPost para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, imprime a mensagem de erro no console
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

// Função assíncrona para fazer o upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um novo objeto de post com a descrição e o caminho da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };

  // Tenta criar o novo post e renomear o arquivo da imagem
  try {
    // Chama a função criarPost para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Cria um novo nome para a imagem com o ID do post
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia uma resposta HTTP com status 200 (sucesso) e o post criado no formato JSON
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra um erro, imprime a mensagem de erro no console
    console.error(erro.message);
    // Envia uma resposta HTTP com status 500 (erro interno do servidor) e uma mensagem de erro
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}
// Atualiza o post
export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/uploads/${id}.png`
  
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);
    
    const post = {
      imgURL : urlImagem,
      descricao : descricao,
      alt : req.body.alt
    } 

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}