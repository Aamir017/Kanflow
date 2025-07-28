import apiClient from './api';

const boardService = {
  // Get all boards for the current user
  getBoards: async () => {
    try {
      const response = await apiClient.get('/boards');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get a specific board by ID
  getBoardById: async (boardId) => {
    try {
      const response = await apiClient.get(`/boards/${boardId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new board
  createBoard: async (boardData) => {
    try {
      const response = await apiClient.post('/boards', boardData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update an existing board
  updateBoard: async (boardId, boardData) => {
    try {
      const response = await apiClient.put(`/boards/${boardId}`, boardData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a board
  deleteBoard: async (boardId) => {
    try {
      const response = await apiClient.delete(`/boards/${boardId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default boardService;
