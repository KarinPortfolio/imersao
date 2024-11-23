import 'dotenv/config';
import  {ObjectId} from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a função importar do arquivo dbConfig.js
// A string de conexão é obtida da variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts
export async function getTodosPosts() {
  // Seleciona o banco de dados 'imercao'
  const db = conexao.db("imercao");
  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post
export async function criarPost(novoPost) {
  // Seleciona o banco de dados 'imercao'
  const db = conexao.db("imercao");
  // Seleciona a coleção 'posts' dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere um novo documento na coleção e retorna o resultado da inserção
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imercao");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
  }