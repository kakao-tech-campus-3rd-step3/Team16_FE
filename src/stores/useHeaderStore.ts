import { create } from 'zustand';
import type { ReactNode } from 'react';

interface IHeaderState {
  leftContent: ReactNode | null | undefined;
  centerContent: string | null | undefined;
  rightContent: ReactNode | null | undefined;
}

interface IHeaderActions {
  setHeader: (content: {
    leftContent?: ReactNode | null;
    centerContent?: string | null;
    rightContent?: ReactNode | null;
  }) => void;
  resetHeader: () => void;
}

type IHeaderStore = IHeaderState & IHeaderActions;

const useHeaderStore = create<IHeaderStore>((set) => ({
  leftContent: undefined,
  centerContent: undefined,
  rightContent: undefined,

  setHeader: (content) => set(content),

  resetHeader: () =>
    set({ leftContent: undefined, centerContent: undefined, rightContent: undefined }),
}));

export default useHeaderStore;
