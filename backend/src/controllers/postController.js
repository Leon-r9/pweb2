const { Post, User } = require('../models');

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows: posts } = await Post.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });

    res.json({
      posts,
      pagination: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });

    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    res.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ error: 'Erro ao buscar post' });
  }
};

const createPost = async (req, res) => {
  try {
    const { titulo, texto } = req.body;
    const userId = req.userId;

    if (!titulo || !texto) {
      return res.status(400).json({ error: 'Título e texto são obrigatórios' });
    }

    if (titulo.trim().length < 3) {
      return res.status(400).json({ error: 'O título deve ter pelo menos 3 caracteres' });
    }

    if (texto.trim().length < 10) {
      return res.status(400).json({ error: 'O texto deve ter pelo menos 10 caracteres' });
    }

    const post = await Post.create({
      titulo,
      texto,
      userId
    });

    const postWithUser = await Post.findByPk(post.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });

    res.status(201).json({
      message: 'Post criado com sucesso',
      post: postWithUser
    });
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
};

module.exports = { getAllPosts, getPostById, createPost };
