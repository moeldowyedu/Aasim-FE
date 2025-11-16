import api from './api';

const hitlService = {
  // Oversight Modes
  async getOversightModes() {
    const response = await api.get('/hitl/modes');
    return response.data;
  },

  async setOversightMode(modeId, config) {
    const response = await api.post('/hitl/modes', { modeId, config });
    return response.data;
  },

  async getOversightConfig() {
    const response = await api.get('/hitl/config');
    return response.data;
  },

  // Approval Queue
  async getApprovalQueue(params = {}) {
    const response = await api.get('/hitl/approvals', { params });
    return response.data;
  },

  async approveItem(itemId, feedback = {}) {
    const response = await api.post(`/hitl/approvals/${itemId}/approve`, feedback);
    return response.data;
  },

  async rejectItem(itemId, reason) {
    const response = await api.post(`/hitl/approvals/${itemId}/reject`, { reason });
    return response.data;
  },

  async bulkApprove(itemIds) {
    const response = await api.post('/hitl/approvals/bulk-approve', { itemIds });
    return response.data;
  },

  async bulkReject(itemIds, reason) {
    const response = await api.post('/hitl/approvals/bulk-reject', { itemIds, reason });
    return response.data;
  },

  // Workflows
  async getWorkflows(params = {}) {
    const response = await api.get('/hitl/workflows', { params });
    return response.data;
  },

  async createWorkflow(workflowData) {
    const response = await api.post('/hitl/workflows', workflowData);
    return response.data;
  },

  async updateWorkflow(workflowId, workflowData) {
    const response = await api.put(`/hitl/workflows/${workflowId}`, workflowData);
    return response.data;
  },

  async deleteWorkflow(workflowId) {
    const response = await api.delete(`/hitl/workflows/${workflowId}`);
    return response.data;
  },

  // Activity Logs
  async getActivityLogs(params = {}) {
    const response = await api.get('/hitl/activity-logs', { params });
    return response.data;
  },

  async exportActivityLogs(params = {}) {
    const response = await api.get('/hitl/activity-logs/export', {
      params,
      responseType: 'blob'
    });
    return response.data;
  },

  // Statistics
  async getHITLStats(params = {}) {
    const response = await api.get('/hitl/stats', { params });
    return response.data;
  }
};

export default hitlService;
