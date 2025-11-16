import { create } from 'zustand';
import agentService from '../services/agentService';

const useAgentStore = create((set, get) => ({
  marketplaceAgents: [],
  myAgents: [],
  privateAgents: [],
  selectedAgent: null,
  deployments: [],
  loading: false,
  error: null,

  // Actions
  setMarketplaceAgents: (agents) => set({ marketplaceAgents: agents }),

  setMyAgents: (agents) => set({ myAgents: agents }),

  setPrivateAgents: (agents) => set({ privateAgents: agents }),

  setSelectedAgent: (agent) => set({ selectedAgent: agent }),

  fetchMarketplaceAgents: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const agents = await agentService.getMarketplaceAgents(filters);
      set({ marketplaceAgents: agents, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchMyAgents: async () => {
    set({ loading: true, error: null });
    try {
      const agents = await agentService.getMyAgents();
      set({ myAgents: agents, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchPrivateAgents: async () => {
    set({ loading: true, error: null });
    try {
      const agents = await agentService.getPrivateAgents();
      set({ privateAgents: agents, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deployAgent: async (agentId, deploymentConfig) => {
    set({ loading: true, error: null });
    try {
      const result = await agentService.deployAgent(agentId, deploymentConfig);
      await get().fetchMyAgents(); // Refresh deployed agents
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  undeployAgent: async (deploymentId) => {
    set({ loading: true, error: null });
    try {
      await agentService.undeployAgent(deploymentId);
      await get().fetchMyAgents(); // Refresh deployed agents
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createPrivateAgent: async (agentData) => {
    set({ loading: true, error: null });
    try {
      const result = await agentService.createPrivateAgent(agentData);
      await get().fetchPrivateAgents(); // Refresh private agents
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updatePrivateAgent: async (agentId, agentData) => {
    set({ loading: true, error: null });
    try {
      const result = await agentService.updatePrivateAgent(agentId, agentData);
      await get().fetchPrivateAgents(); // Refresh private agents
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deletePrivateAgent: async (agentId) => {
    set({ loading: true, error: null });
    try {
      await agentService.deletePrivateAgent(agentId);
      await get().fetchPrivateAgents(); // Refresh private agents
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useAgentStore;
