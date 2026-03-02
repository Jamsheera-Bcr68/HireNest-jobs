export type ToastType = 'success' | 'error' | 'info';

export const ToastStyle: Record<ToastType, string> = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-yellow-600 text-white',
};

export type typeOfToast = {
  msg: string;
  type: ToastType;
};

export type TypeOfToastContext = {
  showToast: (toast: typeOfToast) => void;
};
