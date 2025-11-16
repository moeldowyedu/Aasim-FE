import { create } from 'zustand';
import tenantService from '../services/tenantService';

const useTenantStore = create((set, get) => ({
  tenants: [],
  currentTenant: null,
  tenantSettings: null,
  tenantUsers: [],
  loading: false,
  error: null,

  // Actions
  setCurrentTenant: (tenant) => {
    set({ currentTenant: tenant });
    if (tenant?.id) {
      localStorage.setItem('currentTenantId', tenant.id);
    }
  },

  fetchTenants: async () => {
    set({ loading: true, error: null });
    try {
      const tenants = await tenantService.getTenants();
      set({ tenants, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchCurrentTenant: async () => {
    set({ loading: true, error: null });
    try {
      const tenant = await tenantService.getCurrentTenant();
      set({ currentTenant: tenant, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  switchTenant: async (tenantId) => {
    set({ loading: true, error: null });
    try {
      const tenant = await tenantService.switchTenant(tenantId);
      set({ currentTenant: tenant, loading: false });

      // Reload the page to refresh all tenant-specific data
      window.location.reload();
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateTenant: async (tenantId, tenantData) => {
    set({ loading: true, error: null });
    try {
      const updatedTenant = await tenantService.updateTenant(tenantId, tenantData);

      // Update current tenant if it's the one being updated
      if (get().currentTenant?.id === tenantId) {
        set({ currentTenant: updatedTenant });
      }

      // Update in tenants list
      set(state => ({
        tenants: state.tenants.map(t =>
          t.id === tenantId ? updatedTenant : t
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchTenantSettings: async (tenantId) => {
    set({ loading: true, error: null });
    try {
      const settings = await tenantService.getTenantSettings(tenantId);
      set({ tenantSettings: settings, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateTenantSettings: async (tenantId, settings) => {
    set({ loading: true, error: null });
    try {
      const updatedSettings = await tenantService.updateTenantSettings(tenantId, settings);
      set({ tenantSettings: updatedSettings, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  fetchTenantUsers: async (tenantId) => {
    set({ loading: true, error: null });
    try {
      const users = await tenantService.getTenantUsers(tenantId);
      set({ tenantUsers: users, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  inviteUser: async (tenantId, userData) => {
    set({ loading: true, error: null });
    try {
      await tenantService.inviteUser(tenantId, userData);
      await get().fetchTenantUsers(tenantId); // Refresh users
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removeUser: async (tenantId, userId) => {
    set({ loading: true, error: null });
    try {
      await tenantService.removeUser(tenantId, userId);
      await get().fetchTenantUsers(tenantId); // Refresh users
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateUserRole: async (tenantId, userId, role) => {
    set({ loading: true, error: null });
    try {
      await tenantService.updateUserRole(tenantId, userId, role);
      await get().fetchTenantUsers(tenantId); // Refresh users
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null })
}));

export default useTenantStore;
