import { useEffect } from 'react';
import useHeaderStore from '@/stores/useHeaderStore';
import type { ReactNode } from 'react';

type HeaderContent = {
  leftContent?: ReactNode | null;
  centerContent?: string | null;
  rightContent?: ReactNode | null;
};

export const useHeader = ({ leftContent, centerContent, rightContent }: HeaderContent) => {
  const { setHeader, resetHeader } = useHeaderStore.getState();
  useEffect(() => {
    setHeader({ leftContent, centerContent, rightContent });

    return () => {
      resetHeader();
    };
  }, [leftContent, centerContent, rightContent, setHeader, resetHeader]);
};
