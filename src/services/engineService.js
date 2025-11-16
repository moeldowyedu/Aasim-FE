import api from './api';

const engineService = {
  // Get all engines
  async getEngines() {
    const response = await api.get('/engines');
    return response.data;
  },

  // Get engine by ID
  async getEngine(id) {
    const response = await api.get(`/engines/${id}`);
    return response.data;
  },

  // Process with engine
  async process(engineId, data) {
    const response = await api.post(`/engines/${engineId}/process`, data);
    return response.data;
  },

  // Get engine statistics
  async getEngineStats(engineId, params = {}) {
    const response = await api.get(`/engines/${engineId}/stats`, { params });
    return response.data;
  },

  // Get processing history
  async getProcessingHistory(engineId, params = {}) {
    const response = await api.get(`/engines/${engineId}/history`, { params });
    return response.data;
  },

  // Test engine with rubric
  async testEngine(engineId, testData) {
    const response = await api.post(`/engines/${engineId}/test`, testData);
    return response.data;
  },

  // Rubric Management
  async getRubrics(engineId) {
    const response = await api.get(`/engines/${engineId}/rubrics`);
    return response.data;
  },

  async createRubric(engineId, rubricData) {
    const response = await api.post(`/engines/${engineId}/rubrics`, rubricData);
    return response.data;
  },

  async updateRubric(engineId, rubricId, rubricData) {
    const response = await api.put(`/engines/${engineId}/rubrics/${rubricId}`, rubricData);
    return response.data;
  },

  async deleteRubric(engineId, rubricId) {
    const response = await api.delete(`/engines/${engineId}/rubrics/${rubricId}`);
    return response.data;
  }
};

export default engineService;
