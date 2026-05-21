import { X } from 'lucide-react';

import type { interviewDetailDto } from '../../../../types/dtos/interview.dto';
import { useLockBodyScroll } from '../../../hooks/useBodyLock';
import { useState } from 'react';

type InterviewDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  interview: interviewDetailDto | null;
  setCancel: (id: string) => void;
};

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export default function InterviewDetailsModal({
  isOpen,
  onClose,
  interview,
  setCancel,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-4">
            {interview.companyLogo ? (
              <img
                src={`${baseUrl}${interview.companyLogo}`}
                alt={interview.companyName}
                className="w-14 h-14 rounded-xl object-cover border"
              />
            ) : (
              <div className="w-14 h-14 rounded-xl bg-gray-200" />
            )}

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-semibold text-gray-900">
                  {interview.jobTitle}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                    interview.status === 'scheduled'
                      ? 'bg-blue-100 text-blue-700'
                      : interview.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : interview.status === 'cancelled'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {interview.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {interview.companyName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickCard label="Candidate" value={interview.name} />

            <QuickCard label="Date" value={interview.date} />

            <QuickCard label="Time" value={interview.time} />

            <QuickCard label="Mode" value={interview.mode} />
          </div>

          {/* Interview Details */}
          <div className="border rounded-2xl p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Interview Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard label="Interview ID" value={interview.id} />

              <InfoCard label="Job Role" value={interview.jobTitle} />

              <InfoCard label="Company" value={interview.companyName} />

              <InfoCard label="Candidate Name" value={interview.name} />

              <InfoCard label="Interview Status" value={interview.status} />

              <InfoCard label="Duration" value={interview.duration} />

              <InfoCard
                label="Confirmed"
                value={interview.isConfirmed ? 'Yes' : 'No'}
              />

              <InfoCard label="Result" value={interview.result || 'Pending'} />
            </div>
          </div>

          {/* Meeting / Location */}
          <div className="border rounded-2xl p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">
              Meeting Information
            </h3>

            <div className="space-y-4">
              {interview.mode === 'online' && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Meeting Link</p>

                  {interview.meetLink ? (
                    <a
                      href={interview.meetLink}
                      target="_blank"
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {interview.meetLink}
                    </a>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Meeting link not added
                    </p>
                  )}
                </div>
              )}

              {interview.location && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>

                  <p className="text-sm text-gray-800">{interview.location}</p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {interview.note && (
            <div className="border rounded-2xl p-5">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Notes
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                {interview.note}
              </div>
            </div>
          )}

          {/* Feedback */}
          {interview.feedback && (
            <div className="border rounded-2xl p-5">
              <h3 className="text-base font-semibold text-gray-800 mb-3">
                Feedback
              </h3>

              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700">
                {interview.feedback}
              </div>
            </div>
          )}

          {/* Reschedule Request */}
          {interview.isRescheduleRequested && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-amber-800">
                  Reschedule Requested
                </h3>

                <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                  Pending
                </span>
              </div>

              <p className="text-sm text-amber-700 mt-3">
                {interview.reasonForRescheduleRequest}
              </p>
            </div>
          )}

          {/* Cancellation */}
          {interview.status === 'cancelled' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="text-base font-semibold text-red-700 mb-2">
                Interview Cancelled
              </h3>

              <p className="text-sm text-red-700">
                Cancelled By :{' '}
                {interview.cancelledBy == 'admin'
                  ? 'You'
                  : interview.cancelledBy}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3 bg-gray-50">
          {interview.status === 'scheduled' && (
            <>
              <button
                onClick={() => setCancel(interview.id)}
                className="border border-red-300 text-red-600 hover:bg-red-50 text-sm px-4 py-2 rounded-lg transition"
              >
                Cancel Interview
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="bg-gray-900 hover:bg-black text-white text-sm px-5 py-2 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const QuickCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 border rounded-xl p-4">
    <p className="text-xs text-gray-500 mb-1">{label}</p>

    <p className="text-sm font-semibold text-gray-800 truncate">{value}</p>
  </div>
);

const InfoCard = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-gray-50 rounded-xl p-4">
    <p className="text-xs text-gray-500 mb-1">{label}</p>

    <p className="text-sm font-medium text-gray-800 break-words">{value}</p>
  </div>
);
