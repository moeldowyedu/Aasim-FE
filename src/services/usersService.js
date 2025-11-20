import api from './api';

const usersService = {
  // List users with filters
  getUsers: async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.role_id) params.append('role_id', filters.role_id);
    if (filters.department_id) params.append('department_id', filters.department_id);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.page) params.append('page', filters.page);
    if (filters.per_page) params.append('per_page', filters.per_page);

    const response = await api.get(`/users?${params.toString()}`);
    return response.data;
  },

  // Get single user
  getUser: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Create user
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  // Toggle user status
  toggleUserStatus: async (id) => {
    const response = await api.patch(`/users/${id}/toggle-status`);
    return response.data;
  },

  // Get user activity
  getUserActivity: async (id, filters = {}) => {
    const params = new URLSearchParams();

    if (filters.action) params.append('action', filters.action);
    if (filters.entity_type) params.append('entity_type', filters.entity_type);
    if (filters.from_date) params.append('from_date', filters.from_date);
    if (filters.to_date) params.append('to_date', filters.to_date);
    if (filters.page) params.append('page', filters.page);
    if (filters.per_page) params.append('per_page', filters.per_page);

    const response = await api.get(`/users/${id}/activity?${params.toString()}`);
    return response.data;
  }
};

export default usersService;
