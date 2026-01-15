import api from './api';

export const postService = {
  async getAllPosts(page = 1, limit = 10) {
    try {
      const response = await api.get(`/posts?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar posts' };
    }
  },

  async getPostById(id) {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao buscar post' };
    }
  },

  async createPost(titulo, texto) {
    try {
      const response = await api.post('/posts', { titulo, texto });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Erro ao criar post' };
    }
  }
};
