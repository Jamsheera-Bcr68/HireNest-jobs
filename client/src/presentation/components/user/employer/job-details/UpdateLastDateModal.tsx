import { useState } from 'react';

type Props = {
  isOpen: boolean;
  lastDate: string;
  onClose: () => void;
  onSetDate: (lastDate: string) => void;
  onConfirm: () => Promise<void>;
};

export default function UpdateLastDateModal({
  isOpen,
  onClose,
  lastDate,
  onSetDate,
  onConfirm,
}: Props) {
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleChange = (date: string) => {
    const selected = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selected <= today) {
      setError('Enter a future date');
      return;
    }

    setError('');
    onSetDate(date);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[360px]">
        <h2 className="text-lg font-semibold mb-2">Update Expiry Date</h2>

        <p className="text-sm text-gray-500 mb-4">
          This job has expired. Please select a new last date to reopen it.
        </p>

        <input
          type="date"
          value={lastDate}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => handleChange(e.target.value)}
          className="border rounded-md w-full p-2 mb-2"
        />

        {error && <p className="text-red-600 text-xs">{error}</p>}

        <div className="flex justify-end gap-2 mt-3">
          <button
            onClick={onClose}
            className="px-3 py-1 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>

          <button
            disabled={!lastDate || !!error}
            onClick={onConfirm}
            className={`px-4 py-1 text-white rounded-md ${
              !lastDate || error
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-green-600'
            }`}
          >
            Update & Reopen
          </button>
        </div>
      </div>
    </div>
  );
}
