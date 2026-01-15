const express = require('express');
const router = express.Router();
const { getCommentsByPostId, createComment } = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/auth');

router.get('/:postId', getCommentsByPostId);
router.post('/', authMiddleware, createComment);

module.exports = router;
