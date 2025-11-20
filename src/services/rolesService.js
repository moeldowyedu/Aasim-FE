import api from './api';

const rolesService = {
  // List all roles
  getRoles: async () => {
    const response = await api.get('/roles');
    return response.data;
  },

  // Get single role
  getRole: async (id) => {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  },

  // Create custom role
  createRole: async (roleData) => {
    const response = await api.post('/roles', roleData);
    return response.data;
  },

  // Update custom role
  updateRole: async (id, roleData) => {
    const response = await api.put(`/roles/${id}`, roleData);
    return response.data;
  },

  // Delete custom role
  deleteRole: async (id) => {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  },

  // Get all permissions
  getPermissions: async () => {
    const response = await api.get('/permissions');
    return response.data;
  }
};

export default rolesService;
