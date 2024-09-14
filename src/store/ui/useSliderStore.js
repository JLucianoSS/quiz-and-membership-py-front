import { create } from "zustand";

export const useSliderStore = create((set) => ({
  scrollPosition: 0, // Almacena la posición del scroll
  setScrollPosition: (position) => set({ scrollPosition: position }),
}));
