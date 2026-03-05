import * as Dialog from '@radix-ui/react-dialog';
import { iso } from 'zod/mini';
import { is } from 'zod/v4/locales';

type ModalProps = {
  isOpen: boolean;

  onClose: () => void;
  onConfirm: () => void;
  text: string;
};
export default function PermissionModal({
  isOpen,
  onClose,
  onConfirm,
  text,
}: ModalProps) {
  console.log('from new modal', isOpen);
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          onClose();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content
          className="
          fixed left-1/2 top-1/2 w-full max-w-md
          -translate-x-1/2 -translate-y-1/2
          rounded-xl bg-white p-6 shadow-lg
          focus:outline-none
        "
        >
          {/* Title */}
          <Dialog.Title className="text-xl font-semibold text-green-800 text-center">
            Confirmation
          </Dialog.Title>

          {/* Message */}
          <div className="mt-4 text-center">
            <p className="text-black-700 text-sm">{text}?</p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="
                rounded-lg px-4 py-2 text-sm
                text-gray-600 hover:bg-gray-100
                transition
              "
              >
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={onConfirm}
              className="
              rounded-lg px-4 py-2 text-sm
              bg-green-600 text-white
              hover:bg-green-700
              transition
            "
            >
              yes
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
