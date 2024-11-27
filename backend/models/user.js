const mongoose = require('mongoose');  // Importa o mongoose para trabalhar com o MongoDB
const bcrypt = require('bcryptjs');    // Importa o bcrypt para criptografar senhas

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
  username: {
    type: String,                   // Tipo do campo, no caso, String
    required: true,                  // Garante que o campo seja obrigatório
    unique: true,                    // Garante que o valor do campo seja único no banco de dados
    minlength: [3, 'O nome de usuário deve ter pelo menos 3 caracteres'],  // Valida o comprimento mínimo do username
  },
  password: {
    type: String,                   // Tipo do campo, no caso, String
    required: true,                  // Garante que o campo senha seja obrigatório
    minlength: [6, 'A senha deve ter pelo menos 6 caracteres'],  // Valida o comprimento mínimo da senha
  },
});

// Middleware para criptografar a senha antes de salvar no banco de dados
userSchema.pre('save', async function (next) {
  // Verifica se a senha foi alterada. Se não, não faz nada.
  if (!this.isModified('password')) return next();

  try {
    // Gerar um salt (valor aleatório utilizado para fortalecer a criptografia)
    const salt = await bcrypt.genSalt(10);   // O "10" é o número de rounds de salting (quanto maior, mais seguro)
    
    // Criptografa a senha com o salt gerado
    this.password = await bcrypt.hash(this.password, salt);
    
    // Continua com o processo de salvar o usuário
    next(); 
  } catch (error) {
    // Se ocorrer um erro, passa o erro para o próximo middleware
    next(error); 
  }
});

// Método de instância para comparar a senha fornecida com a senha criptografada
userSchema.methods.comparePassword = async function (password) {
  try {
    // Compara a senha fornecida com a senha criptografada no banco de dados
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    // Se ocorrer um erro ao comparar as senhas, lança um erro
    throw new Error('Erro ao comparar as senhas');
  }
};

// Criando o modelo de usuário com base no esquema
const User = mongoose.model('User', userSchema);

// Exportando o modelo para ser usado em outros arquivos
module.exports = User;


