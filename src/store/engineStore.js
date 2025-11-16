import { create } from 'zustand';
import engineService from '../services/engineService';

const useEngineStore = create((set, get) => ({
  engines: [],
  selectedEngine: null,
  rubrics: [],
  processingHistory: [],
  loading: false,
  error: null,

  // Actions
  setEngines: (engines) => set({ engines }),

  setSelectedEngine: (engine) => set({ selectedEngine: engine }),

  fetchEngines: async () => {
    set({ loading: true, error: null });
    try {
      const engines = await engineService.getEngines();
      set({ engines, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchEngine: async (engineId) => {
    set({ loading: true, error: null });
    try {
      const engine = await engineService.getEngine(engineId);
      set({ selectedEngine: engine, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  processWithEngine: async (engineId, data) => {
    set({ loading: true, error: null });
    try {
      const result = await engineService.process(engineId, data);
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchRubrics: async (engineId) => {
    try {
      const rubrics = await engineService.getRubrics(engineId);
      set({ rubrics });
    } catch (error) {
      console.error('Failed to fetch rubrics:', error);
    }
  },

  createRubric: async (engineId, rubricData) => {
    try {
      await engineService.createRubric(engineId, rubricData);
      await get().fetchRubrics(engineId);
    } catch (error) {
      throw error;
    }
  },

  updateRubric: async (engineId, rubricId, rubricData) => {
    try {
      await engineService.updateRubric(engineId, rubricId, rubricData);
      await get().fetchRubrics(engineId);
    } catch (error) {
      throw error;
    }
  },

  deleteRubric: async (engineId, rubricId) => {
    try {
      await engineService.deleteRubric(engineId, rubricId);
      await get().fetchRubrics(engineId);
    } catch (error) {
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useEngineStore;
