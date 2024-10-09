// store/useAppStore.js
import { create } from 'zustand';

export const useRedrawStore = create((set) => ({
  refreshTable: false, 
  toggleRefreshTable: () => set((state) => ({ refreshTable: !state.refreshTable })), // Función para cambiar el "trigger"
}));


