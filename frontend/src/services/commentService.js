import api from './api';

export const commentService = {
  async getCommentsByPostId(postId) {
    try {
      const response = await api.get(`/comments/${postId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar comentários' };
    }
  },

  async createComment(texto, postId) {
    try {
      const response = await api.post('/comments', { texto, postId });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao criar comentário' };
    }
  }
};
