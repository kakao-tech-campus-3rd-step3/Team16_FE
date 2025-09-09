import { useEffect } from 'react';
import useHeaderStore from '@/stores/useHeaderStore';
import type { ReactNode } from 'react';

type HeaderContent = {
  left?: ReactNode;
  center?: string | null;
  right?: ReactNode;
};

export const useHeader = ({ left, center, right }: HeaderContent) => {
  const { setHeader, resetHeader } = useHeaderStore.getState();

  useEffect(() => {
    setHeader({
      left: left ?? null,
      center: center ?? null,
      right: right ?? null,
    });

    return () => {
      resetHeader();
    };
  }, [left, center, right, setHeader, resetHeader]);
};
