import { useState, useEffect } from 'react';
import type { InterviewDto } from '../../../../../types/dtos/interview.dto';

import {
  convertDateStringToInputDate,
  formatTimeForInput,
} from '../../../../../utils/dateConversion';
import { useLockBodyScroll } from '../../../../hooks/useBodyLock';

type ErrorType = {
  date?: string;
  time?: string;
};
type Props = {
  isOpen: boolean;
  onClose: () => void;
  initialDate: string | null;
  initialTime: string | null;
  onConfirm: (date: Partial<InterviewDto>) => Promise<void>;
};
function RescheduleModal({
  isOpen,
  onClose,
  initialDate,
  initialTime,
  onConfirm,
}: Props) {
  const [date, setDate] = useState<string | null>(null);

  const [error, setError] = useState<ErrorType | null>(null);
  const [time, setTime] = useState<string | null>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    console.log('initial data', initialDate);

    if (isOpen) {
      setDate(initialDate);

      setTime(initialTime ?? '');
    }
  }, [isOpen, initialDate, initialTime]);

  const handleClose = () => {
    setDate('');
    setTime('');
    onClose();
  };
  const handleConfirm = async () => {
    if (!time) {
      let err: ErrorType = { ...error, time: 'Time is mandatory' };
      setError(err);
      return;
    }
    if (!date) {
      let err: ErrorType = { ...error, date: 'Date is mandatory' };
      setError(err);
      return;
    }
    if (date && new Date(date) < new Date()) {
      let err: ErrorType = { ...error, date: 'Add a valid date' };
      setError(err);
      return;
    }
    setError(null);
    onConfirm({ scheduledAt: { time, date } });
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-5 animate-in fade-in zoom-in-95">
        {/* Header */}
        <h2 className="text-sm font-semibold text-gray-800 mb-4">
          Reschedule Interview
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">New date</label>
            <input
              type="date"
              value={date ? date : ''}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {error && error.date && (
              <p className="text-sm text-red-500">* {error.date} </p>
            )}
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">New time</label>
            <input
              type="time"
              value={time ? formatTimeForInput(time) : ''}
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            {error && error.time && (
              <p className="text-sm text-red-500">* {error.time} </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-xs font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={!date || !time || isLoading}
            className="text-xs font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RescheduleModal;
