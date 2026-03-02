import * as Dialog from '@radix-ui/react-dialog';

type ModalProps = {
  isOpen: boolean;

  onClose: () => void;
  onDelete: () => Promise<void>;
  item: string;
};
export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  item,
}: ModalProps) {
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
          <Dialog.Title className="text-xl font-semibold text-red-800 text-center">
            Delete Confirmation
          </Dialog.Title>

          {/* Message */}
          <div className="mt-4 text-center">
            <p className="text-black-700 text-sm">
              Are you sure you want to delete this {item}?
            </p>
            <p className="text-black-500 text-sm mt-1">
              This action cannot be undone.
            </p>
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
              onClick={onDelete}
              className="
              rounded-lg px-4 py-2 text-sm
              bg-red-600 text-white
              hover:bg-red-700
              transition
            "
            >
              Delete
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
