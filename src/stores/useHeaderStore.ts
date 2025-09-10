import { create } from 'zustand';
import type { ReactNode } from 'react';

interface IHeaderState {
  left: ReactNode | null;
  center: string | null;
  right: ReactNode | null;
}

interface IHeaderActions {
  setHeader: (content: IHeaderState) => void;
  resetHeader: () => void;
}

type IHeaderStore = IHeaderState & IHeaderActions;

const useHeaderStore = create<IHeaderStore>((set) => {
  const resetHeader = () => set({ left: null, center: null, right: null });
  const setHeader = (content: IHeaderState) => set(content);

  return {
    left: null,
    center: null,
    right: null,
    setHeader,
    resetHeader,
  };
});

export default useHeaderStore;
