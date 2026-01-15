const express = require('express');
const router = express.Router();
const { getAllPosts, getPostById, createPost } = require('../controllers/postController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createPost);

module.exports = router;
