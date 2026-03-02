import { createContext, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { ToastStyle } from '../../types/toastTypes';
import './toast.css';

import {
  type typeOfToast,
  type TypeOfToastContext,
} from '../../types/toastTypes';

export const ToastContext = createContext<TypeOfToastContext | undefined>(
  undefined
);
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<typeOfToast>({
    msg: '',
    type: 'info',
  });
  const [open, setOpen] = useState(false);

  const showToast = (payload: typeOfToast) => {
    setToast(payload);
    setOpen(true);
  };
  return (
    <ToastContext.Provider value={{ showToast }}>
      {' '}
      <Toast.Provider swipeDirection="right">
        {children}
        <Toast.Root
          open={open}
          duration={3000}
          onOpenChange={setOpen}
          className={`toast ${ToastStyle[toast.type]}`}
        >
          <Toast.Description>{toast.msg}</Toast.Description>
        </Toast.Root>

        <Toast.Viewport className="fixed top-5 right-5 z-[9999]" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
}
