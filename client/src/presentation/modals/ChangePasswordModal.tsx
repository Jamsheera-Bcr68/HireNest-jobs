import * as Dialog from '@radix-ui/react-dialog';

import { EyeClosedIcon, Eye } from 'lucide-react';
import { useChangePassword } from '../hooks/auth/useChangePassword';
import { useToast } from '../../shared/toast/useToast';

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { showToast } = useToast();
  const { handleChange, formData, show, error, setShow, handleSubmit } =
    useChangePassword(showToast, onClose);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
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
          <Dialog.Title className="text-2xl text-indigo-700 font-semibold text-center">
            Change Password
          </Dialog.Title>

          {/* Form (static) */}
          <div className="mt-6 space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Current Password
              </label>
              <input
                name="current_password"
                value={formData.current_password}
                onChange={handleChange}
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              {error?.current_password ? (
                <p className="text-sm text-red-500">{error.current_password}</p>
              ) : (
                ''
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                New Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              {error?.password ? (
                <p className="text-sm text-red-500">{error.password}</p>
              ) : (
                ''
              )}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  type={show ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {show ? <Eye size={18} /> : <EyeClosedIcon size={18} />}
                </button>
              </div>
              {error?.confirm_password ? (
                <p className="text-sm text-red-500">{error.confirm_password}</p>
              ) : (
                ''
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
                Cancel
              </button>
            </Dialog.Close>

            <button
              onClick={handleSubmit}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white"
            >
              Save
            </button>
          </div>
        </Dialog.Content>
        {/* <ChangePassword /> */}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
