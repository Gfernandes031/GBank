const express = require('express');      // Framework para construir a API
const mongoose = require('mongoose');    // ORM para interagir com o MongoDB
const bcrypt = require('bcryptjs');      // Biblioteca para criptografar senhas
const jwt = require('jsonwebtoken');     // Biblioteca para gerar tokens JWT

const app = express();

// Middleware para aceitar JSON nas requisições
app.use(express.json());

// Conectar ao MongoDB
mongoose
  .connect('mongodb://localhost:27017/GBank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexão com o MongoDB bem-sucedida'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Modelo User (importado de outro arquivo)
const User = require('./models/User');

// Segredo do JWT para assinar os tokens
const JWT_SECRET = 'seu_segredo_seguro';

// Rota para testar se o servidor está funcionando
app.get('/test', (req, res) => {
  res.send('API está funcionando!');
});

// Rota de registro de usuário
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validar os dados fornecidos
  if (!username || !password) {
    return res.status(400).json({ error: 'Username e senha são obrigatórios' });
  }

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    // Criar e salvar um novo usuário
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota de login do usuário
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validar os dados fornecidos
  if (!username || !password) {
    return res.status(400).json({ error: 'Username e senha são obrigatórios' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    // Comparar a senha fornecida com a senha criptografada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    // Gerar o token JWT com o id do usuário
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });  // Retorna o token para o cliente
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar todos os usuários (somente para teste)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclui a senha na resposta
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Iniciar o servidor na porta 3000
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));


