import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};
function SuccessModal({ open, onClose }: ModalProps) {
  const navigate = useNavigate();
  return (
    <div>
      <Dialog.Root open={open} onOpenChange={(open) => !open && onClose()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

          <Dialog.Content
            className="
      fixed left-1/2 top-1/2 w-full max-w-md
      -translate-x-1/2 -translate-y-1/2
      rounded-xl bg-white p-8 shadow-2xl
      focus:outline-none
    "
          >
            {/* Success Icon Placeholder */}
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Title */}
            <Dialog.Title className="text-2xl font-bold text-gray-900 text-center">
              Company Created!
            </Dialog.Title>

            {/* Message */}
            <div className="mt-3 text-center">
              <p className="text-gray-600 text-base">
                Your company profile has been successfully submitted.
              </p>
              <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                <strong>Under Review:</strong> We’ll process your application
                and provide an update within 2 business days.
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex justify-center">
              <Dialog.Close asChild>
                <button
                  onClick={() => {
                    navigate('/');
                    onClose();
                  }}
                  className="
            w-full rounded-lg px-6 py-3 text-sm font-medium
            bg-green-900 text-white
            hover:bg-green-800
            transition-all active:scale-95
          "
                >
                  Got it, thanks!
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default SuccessModal;
