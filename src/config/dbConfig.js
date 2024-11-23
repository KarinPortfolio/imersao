import { MongoClient } from 'mongodb';

// Cria uma função assíncrona para conectar ao banco de dados
export default async function conectarAoBanco(stringConexao) {
  // Cria uma variável para armazenar o cliente do MongoDB
  let mongoClient;

  // Tenta conectar ao banco de dados
  try {
    // Cria um novo cliente MongoDB usando a string de conexão fornecida
    mongoClient = new MongoClient(stringConexao);
    // Imprime uma mensagem no console indicando que está conectando ao banco
    console.log('Conectando ao cluster do banco de dados...');
    // Conecta ao banco de dados de forma assíncrona
    await mongoClient.connect();
    // Imprime uma mensagem de sucesso caso a conexão seja estabelecida
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoDB para que possa ser usado em outras partes do código
    return mongoClient;
  } catch (erro) {
    // Caso ocorra algum erro durante a conexão, imprime uma mensagem de erro no console
    console.error('Falha na conexão com o banco!', erro);
    // Encerra o processo
    process.exit();
  }
}