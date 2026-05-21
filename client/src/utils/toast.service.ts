import type { typeOfToast } from '../types/toast.types';

let toastHandler: ((payload: typeOfToast) => void) | null = null;

export const setToastHandler = (handler: typeof toastHandler) => {
  toastHandler = handler;
};

export const showGlobalToast = (payload: typeOfToast) => {
  if (toastHandler) {
    toastHandler(payload);
  }
};
