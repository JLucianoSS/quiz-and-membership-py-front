// ESTE ES PARA EL SIDEBAR DEL ADMINISTRADOR

import create from 'zustand';

export const useSideBarStore2 = create((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  closeSidebar: () => set({ isOpen: false }),
}));
