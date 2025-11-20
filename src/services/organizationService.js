import api from './api';

const organizationService = {
  // ========== Branches ==========
  branches: {
    list: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page);
      if (filters.per_page) params.append('per_page', filters.per_page);

      const response = await api.get(`/branches?${params.toString()}`);
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/branches/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/branches', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/branches/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/branches/${id}`);
      return response.data;
    }
  },

  // ========== Departments ==========
  departments: {
    list: async () => {
      const response = await api.get('/departments');
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/departments/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/departments', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/departments/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/departments/${id}`);
      return response.data;
    }
  },

  // ========== Projects ==========
  projects: {
    list: async (filters = {}) => {
      const params = new URLSearchParams();

      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.department_id) params.append('department_id', filters.department_id);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.page) params.append('page', filters.page);
      if (filters.per_page) params.append('per_page', filters.per_page);

      const response = await api.get(`/projects?${params.toString()}`);
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/projects', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/projects/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    }
  },

  // ========== Teams ==========
  teams: {
    list: async (filters = {}) => {
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page);
      if (filters.per_page) params.append('per_page', filters.per_page);

      const response = await api.get(`/teams?${params.toString()}`);
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/teams/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/teams', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/teams/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/teams/${id}`);
      return response.data;
    }
  }
};

export default organizationService;
