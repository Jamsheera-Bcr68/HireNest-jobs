import { useState } from 'react';

type Props<T> = {
  isOpen: boolean;
  status: T;
  onClose: () => void;
  action: 'Suspend' | 'Reject' | 'Remove';
  onConfirm: (status: T, reason: string) => Promise<void>;
  item: string;
};

export default function AddReasonModal<T>({
  isOpen,
  onClose,
  status,
  action,
  onConfirm,
  item,
}: Props<T>) {
  const [error, setError] = useState<string>('');
  const [value, setValue] = useState<string>('');

  if (!isOpen) return null;

  const submitReason = () => {
    if (!value.trim()) {
      setError('Enter a reason');
      return;
    }
    onConfirm(status, value);
    setError('');
    console.log('value from modal', value);

    setValue('');
  };
  console.log('from reason modal');

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[360px]">
        <h2 className="text-lg font-semibold mb-2">Plase enter a reason </h2>

        <p className="text-sm text-gray-500 mb-4">
          If you really want to {action} this {item} enter a reason
        </p>
        <textarea
          rows={4}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border rounded-md w-full p-2 mb-2"
        />

        {error && <p className="text-red-600 text-xs">{error}</p>}

        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={() => {
              setValue('');
              onClose();
            }}
            className="px-3 py-1 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>

          <button
            disabled={!value || !!error}
            onClick={submitReason}
            className={`px-4 py-1 text-white rounded-md ${
              !value || error ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600'
            }`}
          >
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
