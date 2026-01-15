const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'seu_secret_super_seguro_aqui_123';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    req.user = user;
    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = { authMiddleware, JWT_SECRET };
