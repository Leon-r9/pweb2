require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDatabase } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API do Blog está funcionando!' });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Inicializar servidor
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`✓ Ambiente: ${process.env.NODE_ENV || 'development'}\n`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();
