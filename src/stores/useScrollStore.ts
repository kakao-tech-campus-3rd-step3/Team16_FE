import { create } from 'zustand';

interface ScrollState {
  homeScrollPosition: number;
  setHomeScrollPosition: (position: number) => void;
}

const useScrollStore = create<ScrollState>((set) => ({
  homeScrollPosition: 0,
  setHomeScrollPosition: (position: number) => set({ homeScrollPosition: position }),
}));

export default useScrollStore;
