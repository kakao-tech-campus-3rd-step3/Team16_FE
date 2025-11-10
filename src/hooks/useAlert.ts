import { useState, useCallback } from 'react';

interface AlertOptions {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  confirmText?: string;
}

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    message: '',
    type: 'info',
    confirmText: '확인',
  });

  const showAlert = useCallback((options: AlertOptions) => {
    setAlertOptions({
      type: 'info',
      confirmText: '확인',
      ...options,
    });
    setIsOpen(true);
  }, []);

  const closeAlert = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    alertOptions,
    showAlert,
    closeAlert,
  };
};
