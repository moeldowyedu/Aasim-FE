import { create } from 'zustand';
import hitlService from '../services/hitlService';

const useHITLStore = create((set, get) => ({
  oversightMode: null,
  oversightConfig: null,
  approvalQueue: [],
  workflows: [],
  activityLogs: [],
  stats: null,
  loading: false,
  error: null,

  // Actions
  setOversightMode: (mode) => set({ oversightMode: mode }),

  setOversightConfig: (config) => set({ oversightConfig: config }),

  fetchOversightConfig: async () => {
    set({ loading: true, error: null });
    try {
      const config = await hitlService.getOversightConfig();
      set({
        oversightConfig: config,
        oversightMode: config?.mode,
        loading: false
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  setOversightModeConfig: async (modeId, config) => {
    set({ loading: true, error: null });
    try {
      await hitlService.setOversightMode(modeId, config);
      await get().fetchOversightConfig(); // Refresh config
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchApprovalQueue: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const queue = await hitlService.getApprovalQueue(filters);
      set({ approvalQueue: queue, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  approveItem: async (itemId, feedback = {}) => {
    try {
      await hitlService.approveItem(itemId, feedback);
      await get().fetchApprovalQueue(); // Refresh queue
    } catch (error) {
      throw error;
    }
  },

  rejectItem: async (itemId, reason) => {
    try {
      await hitlService.rejectItem(itemId, reason);
      await get().fetchApprovalQueue(); // Refresh queue
    } catch (error) {
      throw error;
    }
  },

  bulkApprove: async (itemIds) => {
    set({ loading: true, error: null });
    try {
      await hitlService.bulkApprove(itemIds);
      await get().fetchApprovalQueue(); // Refresh queue
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  bulkReject: async (itemIds, reason) => {
    set({ loading: true, error: null });
    try {
      await hitlService.bulkReject(itemIds, reason);
      await get().fetchApprovalQueue(); // Refresh queue
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchWorkflows: async () => {
    try {
      const workflows = await hitlService.getWorkflows();
      set({ workflows });
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
    }
  },

  createWorkflow: async (workflowData) => {
    try {
      await hitlService.createWorkflow(workflowData);
      await get().fetchWorkflows(); // Refresh workflows
    } catch (error) {
      throw error;
    }
  },

  updateWorkflow: async (workflowId, workflowData) => {
    try {
      await hitlService.updateWorkflow(workflowId, workflowData);
      await get().fetchWorkflows(); // Refresh workflows
    } catch (error) {
      throw error;
    }
  },

  deleteWorkflow: async (workflowId) => {
    try {
      await hitlService.deleteWorkflow(workflowId);
      await get().fetchWorkflows(); // Refresh workflows
    } catch (error) {
      throw error;
    }
  },

  fetchActivityLogs: async (filters = {}) => {
    try {
      const logs = await hitlService.getActivityLogs(filters);
      set({ activityLogs: logs });
    } catch (error) {
      console.error('Failed to fetch activity logs:', error);
    }
  },

  fetchStats: async (params = {}) => {
    try {
      const stats = await hitlService.getHITLStats(params);
      set({ stats });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },

  clearError: () => set({ error: null })
}));

export default useHITLStore;
