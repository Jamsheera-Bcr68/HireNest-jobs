import { X } from 'lucide-react';
import Feedback from './Feedback';
import type { interviewDetailDto } from '../../../../types/dtos/interview.dto';
import { useLockBodyScroll } from '../../../hooks/useBodyLock';
import { useState } from 'react';
import InterviewDetails from './InterviewDetails';

type InterviewDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  interview: interviewDetailDto | null;
  onRescheduleClick: (id: string) => void;
  handleConirmClick: (id: string) => void;
};

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export default function InterviewDetailsModal({
  isOpen,
  onClose,
  interview,
  onRescheduleClick,
  handleConirmClick,
}: InterviewDetailsModalProps) {
  useLockBodyScroll(isOpen);
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !interview) return null;
  const tabs = [
    { label: 'Interview Details', value: 'details' },

    ...(interview.status === 'completed'
      ? [{ label: 'Feedback', value: 'feedback' }]
      : []),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            {interview.companyLogo ? (
              <img
                src={`${baseUrl}${interview.companyLogo}`}
                alt={interview.companyName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200" />
            )}

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {interview.companyName}
              </h2>

              <p className="text-sm text-gray-500">{interview.jobTitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.value
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab == 'details' && <InterviewDetails interview={interview} />}
        {activeTab == 'feedback' && (
          <Feedback result={interview.result} feedback={interview.feedback} />
        )}

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          {!interview.isConfirmed &&
            interview.status === 'scheduled' &&
            !interview.isRescheduleRequested && (
              <button
                onClick={() => handleConirmClick(interview.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                Confirm Interview
              </button>
            )}

          {!interview.isRescheduleRequested &&
            !interview.isConfirmed &&
            interview.status === 'scheduled' && (
              <button
                onClick={() => onRescheduleClick(interview.id)}
                className="border border-gray-300 hover:bg-gray-100 text-sm px-4 py-2 rounded-lg transition"
              >
                Request Reschedule
              </button>
            )}
          <button
            onClick={onClose}
            className="border border-red-300 hover:bg-red-100 text-sm px-4 py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
