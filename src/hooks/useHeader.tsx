import { useEffect } from 'react';
import useHeaderStore from '@/stores/useHeaderStore';
import type { ReactNode } from 'react';

type HeaderContent = {
  left?: ReactNode | null;
  center?: string | null;
  right?: ReactNode | null;
};

export const useHeader = ({ left, center, right }: HeaderContent) => {
  const { setHeader, resetHeader } = useHeaderStore.getState();
  useEffect(() => {
    setHeader({ left, center, right });

    return () => {
      resetHeader();
    };
  }, [left, center, right, setHeader, resetHeader]);
};
