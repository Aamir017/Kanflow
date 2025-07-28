import apiClient from './api';

const columnService = {
  // Get all columns for a specific board
  getColumns: async (boardId) => {
    try {
      const response = await apiClient.get(`/boards/${boardId}/columns`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get a specific column by ID
  getColumnById: async (boardId, columnId) => {
    try {
      const response = await apiClient.get(`/boards/${boardId}/columns/${columnId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new column
  createColumn: async (boardId, columnData) => {
    try {
      const response = await apiClient.post(`/boards/${boardId}/columns`, columnData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update an existing column
  updateColumn: async (boardId, columnId, columnData) => {
    try {
      const response = await apiClient.put(`/boards/${boardId}/columns/${columnId}`, columnData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a column
  deleteColumn: async (boardId, columnId) => {
    try {
      const response = await apiClient.delete(`/boards/${boardId}/columns/${columnId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default columnService;
