import apiClient from './api';

const taskService = {
  // Get all tasks for a specific column
  getTasks: async (boardId, columnId) => {
    try {
      const response = await apiClient.get(`/boards/${boardId}/columns/${columnId}/tasks`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get a specific task by ID
  getTaskById: async (boardId, columnId, taskId) => {
    try {
      const response = await apiClient.get(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create a new task
  createTask: async (boardId, columnId, taskData) => {
    try {
      const response = await apiClient.post(`/boards/${boardId}/columns/${columnId}/tasks`, taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update an existing task
  updateTask: async (boardId, columnId, taskId, taskData) => {
    try {
      const response = await apiClient.put(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a task
  deleteTask: async (boardId, columnId, taskId) => {
    try {
      const response = await apiClient.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Move a task to a different column
  moveTask: async (boardId, taskId, newColumnId) => {
    try {
      const response = await apiClient.patch(`/boards/${boardId}/tasks/${taskId}/move`, { 
        newColumnId 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default taskService;
