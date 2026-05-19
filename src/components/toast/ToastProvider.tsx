import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Toast, type ToastVariant } from './Toast';
import { ToastContext } from './ToastContext';

interface ToastState {
  id: number;
  isClosing: boolean;
  message: string;
  variant: ToastVariant;
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastState | null>(null);
  const toastId = toast?.id;

  const showToast = useCallback((message: string, variant: ToastVariant) => {
    setToast({
      id: Date.now(),
      isClosing: false,
      message: normalizeToastMessage(message),
      variant,
    });
  }, []);

  useEffect(() => {
    if (!toastId) {
      return;
    }

    const closeTimerId = window.setTimeout(() => {
      setToast((currentToast) =>
        currentToast?.id === toastId ? { ...currentToast, isClosing: true } : currentToast,
      );
    }, 2000);

    const removeTimerId = window.setTimeout(() => {
      setToast((currentToast) => (currentToast?.id === toastId ? null : currentToast));
    }, 2200);

    return () => {
      window.clearTimeout(closeTimerId);
      window.clearTimeout(removeTimerId);
    };
  }, [toastId]);

  const contextValue = useMemo(
    () => ({
      showError: (message: string) => showToast(message, 'error'),
      showSuccess: (message: string) => showToast(message, 'success'),
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toast
        key={toast?.id}
        message={toast?.message ?? ''}
        isClosing={toast?.isClosing}
        variant={toast?.variant}
      />
    </ToastContext.Provider>
  );
}

function normalizeToastMessage(message: string) {
  return message.trim().replace(/[.。．]+$/g, '');
}
