import { create } from 'zustand'

export const useScrollStore = create((set) => ({
  scrollToPlans: () => {},
  setScrollToPlans: (callback) => set({ scrollToPlans: callback }),
  scrollToInfo: () => {},
  setScrollToInfo: (callback) => set({ scrollToInfo: callback }),
  scrollToFAQ: () => {},
  setScrollToFAQ: (callback) => set({ scrollToFAQ: callback }),
}))