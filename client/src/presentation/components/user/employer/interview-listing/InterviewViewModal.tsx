import React, { useEffect, useState, type ReactNode } from 'react';
import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import type {
  interviewDetailDto,
  InterviewResult,
} from '../../../../../types/dtos/interview.dto';
import { useLockBodyScroll } from '../../../../hooks/useBodyLock';
import { MapPinIcon } from 'lucide-react';
import { useInterviews } from '../../../../hooks/user/useInterview';
import { type InterviewMode } from '../../../../../types/dtos/interview.dto';

import InterviewFeedbackModal from './UpdateModal';
import { useToast } from '../../../../../shared/toast/useToast';

import {
  formatDateForInput,
  formatTimeForInput,
} from '../../../../../utils/dateConversion';
import { interviewService } from '../../../../../services/interview.service';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  interview: interviewDetailDto | null;
  onUpdate: (data: Partial<interviewDetailDto>) => void;
};

// ── Icons ──────────────────────────────────────────────────────────────────
const BriefcaseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>
);

const EditIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const VideoIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="blue"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" />
  </svg>
);

// const BellIcon = () => (
//   <svg
//     width="14"
//     height="14"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
//     <path d="M13.73 21a2 2 0 0 1-3.46 0" />
//   </svg>
// );

const XIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── Helpers ────────────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: ReactNode }) => (
  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
    {children}
  </p>
);

// ── Component ──────────────────────────────────────────────────────────────
export default function InterviewDetailsModal({
  isOpen,
  onClose,
  interview,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [focusField, setFocusField] = useState<'meetLink' | 'date' | null>(
    null
  );
  const [feedbackModal, setFeedbackModal] = useState(false);
  const { showToast } = useToast();

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };
  useLockBodyScroll(isOpen);
  const {
    formData,
    updateFormdata,
    submitInterviewForm,
    initialData,
    error,
    upsateStatus,
  } = useInterviews();

  const handleUpdate = async () => {
    if (!interview) return;

    const updated = await submitInterviewForm('edit', {
      interviewId: interview.id,
    });

    console.log('updated interview', updated);

    if (!updated) return;
    updateFormdata(initialData);
    onUpdate(updated);
    handleClose();
  };

  useEffect(() => {
    if (!interview || !isOpen) return;

    updateFormdata({
      date: formatDateForInput(interview.date),
      time: formatTimeForInput(interview.time),
      mode: interview.mode,
      meetLink: interview.meetLink || '',
      location: interview.location || '',
      duration: interview.duration,
      notes: interview.note || '',
    });
  }, [interview, isOpen]);

  const handleAddLink = () => {
    setIsEditing(true);

    setFocusField('meetLink');
  };

  const handleReschedule = () => {
    setIsEditing(true);

    setFocusField('date');
  };

  const handleAddResult = async (values: {
    result: InterviewResult;
    feedback?: string;
  }) => {
    if (!interview) return;
    console.log('data is', values);

    try {
      const data = await interviewService.updateResult(interview.id, values);
      console.log('data after adding result', data);
      showToast({
        msg: data.message,
        type: 'success',
      });
      onUpdate({ ...values });
      setFeedbackModal(false);
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  const handleComplete = async () => {
    if (!interview) return;
    await upsateStatus(interview.id, 'completed');
    onUpdate({ status: 'completed' });
  };

  if (!interview) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
        <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg shadow-xl max-h-[90vh] flex flex-col">
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <BriefcaseIcon />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  Interview details
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  Scheduled interview overview
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-50 text-green-700 text-[11px] font-semibold px-3 py-0.5 rounded-full">
                {interview?.isConfirmed ? 'Confirmed' : 'Not Confirmed'}
              </span>
              {interview.status !== 'completed' && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                    isEditing
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <EditIcon />
                  {isEditing ? 'Editing…' : 'Edit'}
                </button>
              )}

              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <XIcon />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* ── Candidate ── */}
            {/* <div className="px-6 py-4 border-b border-gray-100">
              <SectionLabel>Candidate</SectionLabel>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold text-sm flex-shrink-0">
                  {interview?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {interview?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Applied for: {interview?.jobTitle}
                  </p>
                </div>
              </div>
              <span
  className={`text-sm text-white rounded-2xl px-2 py-0.5 ${
    interview.result === 'passed'
      ? 'bg-green-500'
      : interview.result === 'failed'
      ? 'bg-red-500'
      : 'bg-yellow-500'
  }`}
>
  {interview.result}
</span>
            </div> */}
            <div className="px-6 py-4 border-b border-gray-100">
              <SectionLabel>Candidate</SectionLabel>

              <div className="flex items-center justify-between">
                {/* Left side (candidate info) */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold text-sm flex-shrink-0">
                    {interview?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {interview?.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Applied for: {interview?.jobTitle}
                    </p>
                  </div>
                </div>

                {/* Right side (badge) */}
                <span
                  className={`text-xs text-white rounded-full px-3 py-1 ${
                    interview.status == 'cancelled'
                      ? 'bg-red-500'
                      : interview.result === 'passed'
                        ? 'bg-green-500'
                        : interview.result === 'failed'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                  }`}
                >
                  {interview.status == 'cancelled'
                    ? 'cancelled'
                    : (interview.result ?? 'pending')}
                </span>
              </div>
            </div>

            {!isEditing && (
              <div className="px-6 pt-4 flex flex-col gap-2">
                {interview.mode === 'online' && !interview.meetLink && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-amber-600">
                      ⚠️ This is an online interview but no meeting link is
                      added.
                    </span>
                    <button
                      onClick={handleAddLink}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Add Link
                    </button>
                  </div>
                )}

                {interview.status === 'completed' && !interview.result && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-red-600">
                      ⚠️ Result is not Updated yet.
                    </span>
                    <button
                      onClick={() => setFeedbackModal(true)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Update Result
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* ── Date & Mode ── */}
            <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-5">
              {/* Date & Time */}
              <div>
                <SectionLabel>Date & time</SectionLabel>
                {isEditing ? (
                  <div className="flex flex-col gap-1.5">
                    <input
                      name="date"
                      autoFocus={focusField === 'date'}
                      type="date"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFormdata({ date: e.currentTarget.value })
                      }
                      value={formatDateForInput(formData.date)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    {error && error.date && (
                      <p className="text-sm text-red-500">*{error.date}</p>
                    )}
                    <input
                      type="time"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFormdata({ time: e.currentTarget.value })
                      }
                      value={formatTimeForInput(formData.time)}
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    {error && error.time && (
                      <p className="text-sm text-red-500">*{error.time}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <CalendarIcon />
                      <span className="text-xs text-gray-700">
                        {interview.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <ClockIcon />
                      <span className="text-xs text-gray-700">
                        {interview.time}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Mode */}
              <div>
                <SectionLabel>Mode</SectionLabel>
                {isEditing ? (
                  <div className="flex flex-col gap-1.5">
                    <select
                      value={formData.mode}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateFormdata({
                          mode: e.currentTarget.value as InterviewMode,
                        })
                      }
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      <option value={'online'} key={'online'}>
                        Online (Google Meet)
                      </option>

                      <option value={'offline'} key={'offline'}>
                        In-person
                      </option>
                    </select>
                    {error && error.mode && (
                      <p className="text-sm text-red-500">*{error.mode}</p>
                    )}
                    <input
                      name="meetLink"
                      autoFocus={focusField === 'meetLink'}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (formData.mode == 'online') {
                          updateFormdata({ meetLink: e.currentTarget.value });
                        } else {
                          updateFormdata({ location: e.currentTarget.value });
                        }
                      }}
                      type="text"
                      value={formData.meetLink}
                      placeholder={
                        formData.mode == 'online'
                          ? 'Add meetlink'
                          : 'Add location'
                      }
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    {error && error.meetLink && (
                      <p className="text-sm text-red-500">*{error.meetLink}</p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-gray-500">
                      {interview.mode == 'online' ? (
                        <VideoIcon />
                      ) : (
                        <MapPinIcon size={16} className="text-blue-500" />
                      )}

                      <span className="text-xs bg-blue-100 rounded-full p-1 text-gray-700">
                        {interview.mode.toUpperCase()}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="text-xs text-blue-500 hover:underline pl-0.5"
                    >
                      {interview.mode === 'online' &&
                        interview.meetLink &&
                        interview.status == 'scheduled' && (
                          <div>
                            <span className="bg-blue-50 rounded p-1 mt-3">
                              <a
                                href={interview.meetLink}
                                target="_blank"
                                className="text-xs text-blue-500 hover:underline"
                              >
                                Join meeting
                              </a>
                            </span>
                          </div>
                        )}
                      {interview.mode === 'offline' && interview.location && (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(interview.location)}`}
                          target="_blank"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          View location
                        </a>
                      )}
                    </a>
                  </div>
                )}
              </div>
            </div>
            {!isEditing ? (
              <div className="flex flex-col ml-5 gap-2">
                {interview.mode === 'online' && !interview.meetLink && (
                  <span className="text-xs text-amber-600"></span>
                )}
              </div>
            ) : (
              formData.mode === 'online' && (
                <div className="flex flex-col ml-5 gap-2">
                  {[
                    { val: false, label: 'Add link now' },
                    { val: true, label: 'Add link later' },
                  ].map(({ val, label }) => (
                    <label
                      key={label}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          formData.isAddlinkLater === val
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-slate-300 group-hover:border-slate-400'
                        }`}
                        onClick={() => updateFormdata({ isAddlinkLater: val })}
                      />
                      <span
                        className="text-sm text-slate-700"
                        onClick={() => updateFormdata({ isAddlinkLater: val })}
                      >
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              )
            )}

            {/* ── Round & Duration ── */}
            {/* <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-5">
              <div>
                <SectionLabel>Round</SectionLabel>
                {isEditing ? (
                  <></>
                ) : (
                  // <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
                  //   <option>Round 1 — HR Screening</option>
                  //   <option>Round 2 — Technical</option>
                  //   <option>Round 3 — Culture Fit</option>
                  //   <option>Final Round</option>
                  // </select>
                  <></>
                  // <p className="text-xs text-gray-700">Round 2 — Technical</p>
                )}
              </div>
              <div>
                <SectionLabel>Duration</SectionLabel>
                {isEditing ? (
                  <>
                    {' '}
                    <select
                      value={formData.duration}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        updateFormdata({
                          duration: e.target.value as InterviewMode,
                        })
                      }
                      className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                      {Durations.map((dur) => (
                        <option value={dur}>{dur} minutes</option>
                      ))}
                    </select>
                    {error && error.duration && (
                      <p className="text-sm text-red-500">*{error.duration}</p>
                    )}
                  </>
                ) : (
                  <p className="text-xs text-gray-700">
                    {interview.duration} minutes
                  </p>
                )}
              </div>
            </div> */}

            {/* ── Note for Candidate ── */}
            <div className="px-6 py-4 border-b border-gray-100">
              <SectionLabel>Note for candidate</SectionLabel>
              {isEditing ? (
                <>
                  {' '}
                  <textarea
                    className="w-full text-sm border rounded"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateFormdata({ notes: e.currentTarget.value })
                    }
                    rows={3}
                    value={formData.notes}
                  />
                  {error && error.notes && (
                    <p className="text-sm text-red-500">* {error.notes}</p>
                  )}
                </>
              ) : (
                <p className="text-xs text-gray-500 leading-relaxed">
                  {interview?.note}
                </p>
              )}
            </div>

            {/* ── Result ── */}
            {/* ── Result ── */}

            {/* ── Feedback ── */}
            {interview.status === 'completed' && (
              <div className="px-6 py-4 border-b border-gray-100">
                <SectionLabel>FeedBack</SectionLabel>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {interview?.feedback ? (
                    interview.feedback
                  ) : (
                    <span className="text-amber-600">
                      No feedback added yet
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="px-6 py-4 flex items-center justify-between">
            {interview.status !== 'cancelled' && (
              <>
                {' '}
                <button
                  onClick={handleReschedule}
                  className="text-xs font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reschedule
                </button>
                {interview.status !== 'completed' && (
                  <button
                    onClick={handleComplete}
                    className="text-xs font-medium text-green-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Mark as Completed
                  </button>
                )}
              </>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-xs font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="text-xs font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save changes
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors border border-blue-100"
                >
                  close
                </button>
              )}
            </div>
          </div>
        </div>
        <InterviewFeedbackModal
          isOpen={feedbackModal}
          onClose={() => setFeedbackModal(false)}
          onSubmit={handleAddResult}
        />
      </DialogContent>
    </Dialog>
  );
}
