import api from './api';

const adminService = {
    // Get all system tenants (Console System Admin)
    getAllTenants: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const endpoint = queryString ? `/admin/tenants?${queryString}` : '/admin/tenants';
        const response = await api.get(endpoint);
        return response.data;
    },

    // Get system stats
    getSystemStats: async () => {
        const response = await api.get('/admin/stats');
        return response.data;
    },

    // Suspend tenant
    suspendTenant: async (tenantId) => {
        const response = await api.post(`/admin/tenants/${tenantId}/suspend`);
        return response.data;
    },

    // Activate tenant
    activateTenant: async (tenantId) => {
        const response = await api.post(`/admin/tenants/${tenantId}/activate`);
        return response.data;
    },

    // Update tenant (e.g. subscription)
    updateTenant: async (tenantId, data) => {
        const response = await api.put(`/admin/tenants/${tenantId}`, data);
        return response.data;
    }
};

export default adminService;
