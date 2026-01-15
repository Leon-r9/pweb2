const { Comment, User, Post } = require('../models');

const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    const comments = await Comment.findAll({
      where: { postId },
      order: [['createdAt', 'ASC']],
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });

    res.json(comments);
  } catch (error) {
    console.error('Erro ao buscar comentários:', error);
    res.status(500).json({ error: 'Erro ao buscar comentários' });
  }
};

const createComment = async (req, res) => {
  try {
    const { texto, postId } = req.body;
    const userId = req.userId;

    if (!texto || !postId) {
      return res.status(400).json({ error: 'Texto e postId são obrigatórios' });
    }

    if (texto.trim().length < 1) {
      return res.status(400).json({ error: 'O comentário não pode estar vazio' });
    }

    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    const comment = await Comment.create({
      texto,
      postId,
      userId
    });

    const commentWithUser = await Comment.findByPk(comment.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'username']
      }]
    });

    res.status(201).json({
      message: 'Comentário criado com sucesso',
      comment: commentWithUser
    });
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    res.status(500).json({ error: 'Erro ao criar comentário' });
  }
};

module.exports = { getCommentsByPostId, createComment };
