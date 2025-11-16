import api from './api';

const agentService = {
  // Marketplace
  async getMarketplaceAgents(params = {}) {
    const response = await api.get('/agents/marketplace', { params });
    return response.data;
  },

  async getAgentDetails(agentId) {
    const response = await api.get(`/agents/marketplace/${agentId}`);
    return response.data;
  },

  // Deployed Agents
  async getMyAgents(params = {}) {
    const response = await api.get('/agents/my-agents', { params });
    return response.data;
  },

  async deployAgent(agentId, deploymentConfig) {
    const response = await api.post(`/agents/${agentId}/deploy`, deploymentConfig);
    return response.data;
  },

  async undeployAgent(deploymentId) {
    const response = await api.delete(`/agents/deployments/${deploymentId}`);
    return response.data;
  },

  async getAgentStatus(deploymentId) {
    const response = await api.get(`/agents/deployments/${deploymentId}/status`);
    return response.data;
  },

  // Private Agents
  async getPrivateAgents(params = {}) {
    const response = await api.get('/agents/private', { params });
    return response.data;
  },

  async createPrivateAgent(agentData) {
    const response = await api.post('/agents/private', agentData);
    return response.data;
  },

  async updatePrivateAgent(agentId, agentData) {
    const response = await api.put(`/agents/private/${agentId}`, agentData);
    return response.data;
  },

  async deletePrivateAgent(agentId) {
    const response = await api.delete(`/agents/private/${agentId}`);
    return response.data;
  },

  // Agent Execution
  async executeAgent(deploymentId, inputData) {
    const response = await api.post(`/agents/deployments/${deploymentId}/execute`, inputData);
    return response.data;
  },

  async getExecutionHistory(deploymentId, params = {}) {
    const response = await api.get(`/agents/deployments/${deploymentId}/history`, { params });
    return response.data;
  },

  // Agent Analytics
  async getAgentAnalytics(deploymentId, params = {}) {
    const response = await api.get(`/agents/deployments/${deploymentId}/analytics`, { params });
    return response.data;
  }
};

export default agentService;
