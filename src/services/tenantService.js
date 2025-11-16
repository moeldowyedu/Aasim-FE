import api from './api';

const tenantService = {
  // Tenant Management
  async getTenants() {
    const response = await api.get('/tenants');
    return response.data;
  },

  async getTenant(tenantId) {
    const response = await api.get(`/tenants/${tenantId}`);
    return response.data;
  },

  async getCurrentTenant() {
    const response = await api.get('/tenants/current');
    return response.data;
  },

  async switchTenant(tenantId) {
    localStorage.setItem('currentTenantId', tenantId);
    const response = await api.post(`/tenants/${tenantId}/switch`);
    return response.data;
  },

  async updateTenant(tenantId, tenantData) {
    const response = await api.put(`/tenants/${tenantId}`, tenantData);
    return response.data;
  },

  // Tenant Settings
  async getTenantSettings(tenantId) {
    const response = await api.get(`/tenants/${tenantId}/settings`);
    return response.data;
  },

  async updateTenantSettings(tenantId, settings) {
    const response = await api.put(`/tenants/${tenantId}/settings`, settings);
    return response.data;
  },

  // Users & Roles
  async getTenantUsers(tenantId, params = {}) {
    const response = await api.get(`/tenants/${tenantId}/users`, { params });
    return response.data;
  },

  async inviteUser(tenantId, userData) {
    const response = await api.post(`/tenants/${tenantId}/users/invite`, userData);
    return response.data;
  },

  async removeUser(tenantId, userId) {
    const response = await api.delete(`/tenants/${tenantId}/users/${userId}`);
    return response.data;
  },

  async updateUserRole(tenantId, userId, role) {
    const response = await api.put(`/tenants/${tenantId}/users/${userId}/role`, { role });
    return response.data;
  },

  // Usage & Billing
  async getTenantUsage(tenantId, params = {}) {
    const response = await api.get(`/tenants/${tenantId}/usage`, { params });
    return response.data;
  },

  async getBillingInfo(tenantId) {
    const response = await api.get(`/tenants/${tenantId}/billing`);
    return response.data;
  },

  async updateBillingInfo(tenantId, billingData) {
    const response = await api.put(`/tenants/${tenantId}/billing`, billingData);
    return response.data;
  }
};

export default tenantService;
