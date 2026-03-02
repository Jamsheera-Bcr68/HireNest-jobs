import { useContext } from 'react';

import { ToastContext } from './ToastContext';

// export function useToast() {
//   const [open, setOpen] = useState(false);
//   const [toast, setToast] = useState<typeOfToast>({ msg: '', type: 'info' });

//   const showToast = (payLoad: typeOfToast) => {
//     console.log('from tost', payLoad);

//     setToast(payLoad);
//     setOpen(true);
//   };
//   const ToastElement = (
//     <Toast.Root
//       open={open}
//       duration={3000}
//       onOpenChange={setOpen}
//       className={`toast ${ToastStyle[toast.type]}`}
//     >
//       <Toast.Description>{toast.msg}</Toast.Description>
//     </Toast.Root>
//   );
//   return {
//     showToast,
//     ToastElement,
//   };
// }
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider');
  }
  return context;
};
