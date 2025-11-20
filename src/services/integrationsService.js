import api from './api';

const integrationsService = {
  // ========== API Keys ==========
  apiKeys: {
    list: async () => {
      const response = await api.get('/integrations/api-keys');
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/integrations/api-keys/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/integrations/api-keys', data);
      return response.data;
    },

    revoke: async (id) => {
      const response = await api.delete(`/integrations/api-keys/${id}`);
      return response.data;
    }
  },

  // ========== Webhooks ==========
  webhooks: {
    list: async () => {
      const response = await api.get('/integrations/webhooks');
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/integrations/webhooks/${id}`);
      return response.data;
    },

    create: async (data) => {
      const response = await api.post('/integrations/webhooks', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/integrations/webhooks/${id}`, data);
      return response.data;
    },

    delete: async (id) => {
      const response = await api.delete(`/integrations/webhooks/${id}`);
      return response.data;
    },

    test: async (id) => {
      const response = await api.post(`/integrations/webhooks/${id}/test`);
      return response.data;
    },

    toggle: async (id) => {
      const response = await api.patch(`/integrations/webhooks/${id}/toggle`);
      return response.data;
    }
  },

  // ========== Connected Apps ==========
  connectedApps: {
    list: async () => {
      const response = await api.get('/integrations/connected-apps');
      return response.data;
    },

    get: async (id) => {
      const response = await api.get(`/integrations/connected-apps/${id}`);
      return response.data;
    },

    connect: async (data) => {
      const response = await api.post('/integrations/connected-apps', data);
      return response.data;
    },

    update: async (id, data) => {
      const response = await api.put(`/integrations/connected-apps/${id}`, data);
      return response.data;
    },

    disconnect: async (id) => {
      const response = await api.delete(`/integrations/connected-apps/${id}`);
      return response.data;
    },

    reconnect: async (id) => {
      const response = await api.post(`/integrations/connected-apps/${id}/reconnect`);
      return response.data;
    }
  }
};

export default integrationsService;
