import { create } from 'zustand';
import type { ReactNode } from 'react';

interface IHeaderState {
  left: ReactNode | null | undefined;
  center: string | null | undefined;
  right: ReactNode | null | undefined;
}

interface IHeaderActions {
  setHeader: (content: {
    left?: ReactNode | null;
    center?: string | null;
    right?: ReactNode | null;
  }) => void;
  resetHeader: () => void;
}

type IHeaderStore = IHeaderState & IHeaderActions;

const useHeaderStore = create<IHeaderStore>((set) => ({
  left: undefined,
  center: undefined,
  right: undefined,

  setHeader: (content) => set(content),

  resetHeader: () => set({ left: undefined, center: undefined, right: undefined }),
}));

export default useHeaderStore;
