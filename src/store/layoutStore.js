import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLayoutStore = create(
    persist(
        (set) => ({
            isCollapsed: false,
            expandedSections: {
                organization: false,
                agentx: false,
                jobFlows: false,
                orchestration: false,
                scheduling: false,
                hitl: false,
                engines: false,
                integrations: false,
                teamUsers: false,
                billing: false,
                settings: false
            },
            toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
            setCollapsed: (value) => set({ isCollapsed: value }),
            toggleSection: (section) => set((state) => ({
                expandedSections: {
                    ...state.expandedSections,
                    [section]: !state.expandedSections[section]
                }
            })),
            setSectionExpanded: (section, value) => set((state) => ({
                expandedSections: {
                    ...state.expandedSections,
                    [section]: value
                }
            })),
        }),
        {
            name: 'layout-storage', // unique name for localStorage key
        }
    )
);
