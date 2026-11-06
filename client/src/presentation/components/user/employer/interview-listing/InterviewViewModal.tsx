import React, { useEffect, useState } from 'react';

import type {
  interviewDetailDto,
  InterviewResult,
  RoundType,
} from '../../../../../types/dtos/interview.dto';
import { useLockBodyScroll } from '../../../../hooks/useBodyLock';
import {  LinkIcon, MapPinIcon, VideoIcon } from 'lucide-react';
import { useInterviews } from '../../../../hooks/user/useInterview';


import InterviewFeedbackModal from './UpdateModal';
import { useToast } from '../../../../../shared/toast/use-toast';

import {
  formatDateForInput,
  formatTimeForInput,
} from '../../../../../utils/date-conversion';
import { interviewService } from '../../../../../services/api-services/interview.service';
import { useTheme } from '../../../../../contexts/ThemeContext';

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

  const ROUNDS: { value: RoundType; label: string }[] = [
    { value: 'screening', label: 'Screening' },
    { value: 'hr_behavioral', label: 'HR Round' },
    { value: 'technical', label: 'Technical' },
    { value: 'managerial', label: 'Managerial' },
    { value: 'assignment', label: 'Assignment' },
  ];

  console.log('interiew ', interview);

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };
  useLockBodyScroll(isOpen);
  const { formData, updateFormdata, submitInterviewForm, initialData, error,generateMeetLink } =
    useInterviews();

  const handleUpdate = async () => {
    if (!interview || !isOpen) return;

    const updated = await submitInterviewForm('edit', {
      interviewId: interview.id,
    });

    console.log('updated interview', updated);

    if (!updated) return;
    updateFormdata(initialData);
    onUpdate({...updated})
    setIsEditing(false)
   
  };

  useEffect(() => {
    if (!interview) return;

    updateFormdata({
      date: formatDateForInput(interview.date),
      time: formatTimeForInput(interview.time),
      mode: interview.mode,
      meetLink: interview.meetLink || '',
      location: interview.location || '',
      duration: interview.duration,
      notes: interview.note || '',
      topics: interview.topics.join(','),
      roundName: interview.roundName,
      interviewerType: interview.interviewerType,
    });
  }, [interview, isOpen]);
 

  const handleAddLink =async () => {
    setIsEditing(true);
    await generateMeetLink()
  };

  const handleReschedule = () => {
    setIsEditing(true);

    setFocusField('date');
  };

  const handleAddResult = async (values: {
    result: InterviewResult;
    score: number;
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
      console.log('update values', values);

      onUpdate({ status: 'completed', result: values.result });
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
    setFeedbackModal(true);

    // onUpdate({ status: 'completed' });
  };

  if (!interview) return null;
  const { mode, t } = useTheme();

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p
      className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${t.subheading} mb-1.5`}
    >
      {children}
    </p>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-200"
      style={{
        backgroundColor:
          mode === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className={`relative w-full sm:max-w-xl ${t.surface} ${t.surfaceBorder} border-t sm:border rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden transition-all duration-200`}
      >
        {/* ── Mobile Drag Bar ── */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* ── Header ── */}
        <div
          className={`flex items-start sm:items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b ${t.surfaceBorder} flex-shrink-0 gap-2`}
        >
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${t.sectionIconBg} flex items-center justify-center ${t.sectionIconText} flex-shrink-0`}
            >
              <BriefcaseIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className={`text-xs sm:text-base font-bold tracking-tight ${t.heading} truncate`}
              >
                Interview Details
              </p>
              <p
                className={`text-[10px] sm:text-xs ${t.subheading} truncate hidden xs:block`}
              >
                Scheduled candidate interview overview
              </p>
            </div>
          </div>

          {/* Header Action Badges & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span
              className={`text-[9px] sm:text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border whitespace-nowrap ${
                interview?.isConfirmed
                  ? `${t.appliedBg} ${t.appliedText} ${t.appliedBorder}`
                  : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900'
              }`}
            >
              {interview?.isConfirmed ? 'Confirmed' : 'Unconfirmed'}
            </span>

            {interview.status !== 'completed' &&
              interview.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border transition-all touch-manipulation ${
                    isEditing
                      ? `${t.primaryButton} shadow-sm`
                      : `${t.surface} ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover}`
                  }`}
                >
                  <EditIcon />
                  <span>{isEditing ? 'Editing' : 'Edit'}</span>
                </button>
              )}

            <button
              type="button"
              onClick={handleClose}
              className={`p-1.5 rounded-lg text-slate-400 hover:${t.sortHover} transition-colors touch-manipulation`}
              aria-label="Close modal"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto overscroll-contain flex-1 px-4 sm:px-6 py-4 flex flex-col gap-4">
          {/* Candidate Profile Strip */}
          <div
            className={`flex items-center justify-between gap-3 ${t.cardBg} rounded-xl p-3 sm:p-3.5 border ${t.cardBorder}`}
          >
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${t.statIconBg} flex items-center justify-center ${t.statIconText} font-bold text-xs flex-shrink-0 overflow-hidden`}
              >
                {interview?.candidateImageUrl ? (
                  <img
                    src={interview.candidateImageUrl}
                    alt={interview.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  interview?.name?.charAt(0).toUpperCase()
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs sm:text-sm font-semibold ${t.heading} truncate`}
                >
                  {interview?.name}
                </p>
                <p
                  className={`text-[10px] sm:text-[11px] ${t.subheading} truncate`}
                >
                  Applied for:{' '}
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    {interview?.jobTitle}
                  </span>
                </p>
              </div>
            </div>

            {interview.result && (
              <span
                className={`text-[9px] sm:text-xs font-semibold rounded-full px-2 sm:px-2.5 py-0.5 sm:py-1 capitalize flex-shrink-0 ${
                  interview.status === 'cancelled' ||
                  interview.result === 'failed'
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    : interview.result === 'passed'
                      ? `${t.appliedBg} ${t.appliedText} border ${t.appliedBorder}`
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}
              >
                {interview.status === 'cancelled'
                  ? 'Cancelled'
                  : interview.result}
              </span>
            )}
          </div>

          {/* Action Alerts / Notices (View Mode Only) */}
          {!isEditing && (
            <div className="flex flex-col gap-2">
              {interview.isRescheduleRequested &&
                interview.status === 'scheduled' && (
                  <div className="flex items-start justify-between gap-2.5 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-900/60 p-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1.5">
                        <span>⚠️</span> Candidate requested reschedule
                      </p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5 line-clamp-2">
                        Reason:{' '}
                        {interview.reasonForRescheduleRequest ||
                          'No reason specified'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReschedule}
                      className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline whitespace-nowrap pt-0.5"
                    >
                      Reschedule
                    </button>
                  </div>
                )}

              {interview.mode === 'online' && !interview.meetLink && (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-amber-200/80 bg-amber-50/60 dark:bg-amber-950/30 dark:border-amber-900/50 p-2.5 px-3">
                  <span className="text-[11px] text-amber-700 dark:text-amber-400 truncate">
                    ⚠️ Online interview missing meeting room link.
                  </span>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline whitespace-nowrap flex-shrink-0"
                  >
                    Add Link
                  </button>
                </div>
              )}

              {interview.status === 'completed' && !interview.result && (
                <div className="flex items-center justify-between gap-2 rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-900/50 p-2.5 px-3">
                  <span className="text-[11px] text-rose-700 dark:text-rose-400 font-medium truncate">
                    ⚠️ Completed interview needs evaluation score.
                  </span>
                  <button
                    type="button"
                    onClick={() => setFeedbackModal(true)}
                    className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline whitespace-nowrap flex-shrink-0"
                  >
                    Update Result
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Round, Conducted By & Topics Section ── */}
          <div
            className={`${t.cardBg} rounded-xl p-3 sm:p-3.5 border ${t.cardBorder} flex flex-col gap-3`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Round Selection */}
              <div className="w-full">
                <SectionLabel>Interview Round</SectionLabel>
                {isEditing ? (
                  <div>
                    <select
                      value={formData.roundName}
                      onChange={(e) =>
                        updateFormdata({ roundName: e.target.value })
                      }
                      className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
                    >
                      <option value="" disabled>
                        Select round
                      </option>
                      {ROUNDS.map((r) => (
                        <option key={r.value} value={r.value}>
                          {r.label}
                        </option>
                      ))}
                    </select>
                    {error?.roundName && (
                      <p className="text-red-500 text-[10px] mt-1">
                        {error.roundName}
                      </p>
                    )}
                  </div>
                ) : (
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg ${t.chipBg} ${t.chipText} border ${t.chipBorder}`}
                  >
                    {ROUNDS.find((r) => r.value === interview.roundName)
                      ?.label ||
                      interview.roundName ||
                      'General Round'}
                  </span>
                )}
              </div>

              {/* Conducted By (AI vs Human) */}
              <div className="w-full">
                <SectionLabel>Conducted By</SectionLabel>
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { val: 'ai_agent', label: 'AI Agent' },
                      { val: 'human', label: 'Human' },
                    ].map(({ val, label }) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          updateFormdata({
                            interviewerType: val,
                            mode: val === 'ai_agent' ? 'online' : formData.mode,
                          })
                        }
                        className={`py-1.5 px-2 rounded-xl border text-xs font-semibold transition-all touch-manipulation text-center ${
                          formData.interviewerType === val
                            ? `${t.chipBg} ${t.chipText} border-purple-400 shadow-sm`
                            : `${t.surface} ${t.surfaceBorder} ${t.resultsMuted} hover:${t.dropdownHover}`
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {interview.interviewerType === 'ai_agent' ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/60 px-2.5 py-1 rounded-lg border border-fuchsia-200 dark:border-fuchsia-900">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
                        AI Agent
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg ${t.surface} ${t.surfaceBorder} border ${t.inputText}`}
                      >
                        Human
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Target Topics / Skills */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <SectionLabel>Topics / Core Skills</SectionLabel>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={formData.topics || ''}
                    placeholder="e.g. React hooks, Redux, Node.js architecture"
                    onChange={(e) => updateFormdata({ topics: e.target.value })}
                    className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
                  />
                  {error?.topics && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {error.topics}
                    </p>
                  )}
                </div>
              ) : (
                <p className={`text-xs ${t.inputText} leading-relaxed`}>
                  {interview.topics ? (
                    <span className="font-medium">{interview.topics}</span>
                  ) : (
                    <span className={t.subheading}>
                      No specific topics assigned
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* ── Schedule & Logistics ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date & Time */}
            <div
              className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}
            >
              <SectionLabel>Date & Time</SectionLabel>
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <input
                    name="date"
                    autoFocus={focusField === 'date'}
                    type="date"
                    value={formatDateForInput(formData.date)}
                    onChange={(e) => updateFormdata({ date: e.target.value })}
                    className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
                  />
                  {error?.date && (
                    <p className="text-red-500 text-[10px]">*{error.date}</p>
                  )}

                  <input
                    name="time"
                    type="time"
                    value={formatTimeForInput(formData.time)}
                    onChange={(e) => updateFormdata({ time: e.target.value })}
                    className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
                  />
                  {error?.time && (
                    <p className="text-red-500 text-[10px]">*{error.time}</p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 mt-0.5">
                  <div
                    className={`flex items-center gap-2 text-xs ${t.inputText}`}
                  >
                    <CalendarIcon />
                    <span>{interview.date}</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-xs ${t.inputText}`}
                  >
                    <ClockIcon />
                    <span>
                      {interview.time} ({interview.duration || 30} mins)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Mode & Location/Link */}
            <div
              className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}
            >
              <SectionLabel>Mode & Venue</SectionLabel>
              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <select
                    value={formData.mode}
                    onChange={(e) =>
                      updateFormdata({ mode: e.target.value as any })
                    }
                    disabled={formData.interviewerType === 'ai_agent'}
                    className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
                  >
                    <option value="online">Online (Video Room)</option>
                    <option
                      value="offline"
                      disabled={formData.interviewerType === 'ai_agent'}
                    >
                      In-Person (Office)
                    </option>
                  </select>

                  {formData.mode === 'online' ? (
                    <div className="flex flex-col xs:flex-row gap-1.5">
                      <input
                        name="meetLink"
                        type="url"
                        placeholder="Meeting room link"
                        value={formData.meetLink || ''}
                        onChange={(e) =>
                          updateFormdata({ meetLink: e.target.value })
                        }
                        className={`w-full flex-1 text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-2.5 py-2 outline-none ${t.inputFocusRing}`}
                      />
                      <button
                        type="button"
                        onClick={handleAddLink}
                        className={`w-full xs:w-auto px-3 py-2 text-xs font-semibold rounded-lg ${t.secondaryButton} hover:${t.secondaryButtonHover} whitespace-nowrap`}
                      >
                        Generate new Link
                      </button>
                    </div>
                  ) : (
                    <input
                      name="location"
                      type="text"
                      placeholder="Add location here"
                      value={formData.location || ''}
                      onChange={(e) =>
                        updateFormdata({ location: e.target.value })
                      }
                      className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-2.5 py-2 outline-none ${t.inputFocusRing}`}
                    />
                  )}
                  {error?.meetLink && (
                    <p className="text-red-500 text-[10px]">
                      *{error.meetLink}
                    </p>
                  )}
                  {error?.location && (
                    <p className="text-red-500 text-[10px]">
                      *{error.location}
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-1.5 mt-0.5">
                  <div
                    className={`flex items-center gap-2 text-xs font-medium ${t.inputText}`}
                  >
                    {interview.mode === 'online' ? (
                      <VideoIcon size={16} className="text-fuchsia-700" />
                    ) : (
                      <MapPinIcon />
                    )}
                    <span>
                      {interview.mode === 'offline'
                        ? 'In-Person (Office)'
                        : 'Online Video Call'}
                    </span>
                  </div>

                  {interview.mode === 'online' && interview.meetLink && (
                    <button
                      type="button"
                      onClick={() =>
                        window.open(
                          interview.meetLink?.startsWith('http')
                            ? interview.meetLink
                            : `/meeting/${interview.meetLink}`,
                          '_blank'
                        )
                      }
                      className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95 transition-all duration-200 mt-1 cursor-pointer overflow-hidden border border-white/20"
                    >
                      {/* Live pulsing indicator */}
                      <span className="relative flex h-2 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                      </span>

                      <LinkIcon
                        size={14}
                        className="transition-transform group-hover:rotate-12"
                      />
                      <span>Join Room</span>

                      {/* Micro arrow icon */}
                      <svg
                        className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}

                  {interview.mode === 'offline' && interview.location && (
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(interview.location)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-fuchsia-600 dark:text-fuchsia-400 hover:underline flex items-center gap-1"
                    >
                      <span>📍</span> {interview.location}
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Candidate Notes ── */}
          <div className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}>
            <SectionLabel>Instructions / Notes for Candidate</SectionLabel>
            {isEditing ? (
              <div>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={(e) => updateFormdata({ notes: e.target.value })}
                  placeholder="Additional notes for candidate..."
                  className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} p-2.5 outline-none ${t.inputFocusRing} resize-none`}
                />
                {error?.notes && (
                  <p className="text-red-500 text-[10px]">*{error.notes}</p>
                )}
              </div>
            ) : (
              <p className={`text-xs ${t.subheading} leading-relaxed`}>
                {interview?.note || 'No special notes provided.'}
              </p>
            )}
          </div>

          {/* ── Evaluation & Feedback (Completed Rounds Only) ── */}
          {interview.status === 'completed' && (
            <div
              className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-2.5`}
            >
              <div className="flex items-center justify-between">
                <SectionLabel>Evaluation Score</SectionLabel>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${t.appliedBg} ${t.appliedText}`}
                >
                  {interview.score ? `${interview.score}/10` : 'Pending'}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <SectionLabel>Feedback Details</SectionLabel>
                <p className={`text-xs ${t.inputText} leading-relaxed`}>
                  {interview?.feedback || (
                    <span className="text-amber-500 italic">
                      No feedback added yet
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-3 border-t ${t.surfaceBorder} flex-shrink-0 ${t.surface} pb-[max(0.75rem,env(safe-area-inset-bottom))]`}
        >
          {!['cancelled', 'completed'].includes(interview.status) &&
          !isEditing ? (
            <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleReschedule}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover} transition-all touch-manipulation text-center`}
              >
                Reschedule
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/20 border border-emerald-600/20 transition-all touch-manipulation text-center"
              >
                Mark Completed
              </button>
            </div>
          ) : (
            <div className="hidden sm:block" />
          )}

          <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto ml-auto">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl border ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover} transition-all touch-manipulation text-center`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className={`px-5 py-2 text-xs font-semibold rounded-xl ${t.primaryButton} ${t.primaryButtonHover} transition-all shadow-md active:scale-95 touch-manipulation text-center`}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className={`col-span-2 sm:col-span-1 sm:w-auto px-5 py-2 text-xs font-semibold rounded-xl ${t.secondaryButton} hover:${t.secondaryButtonHover} transition-all touch-manipulation text-center`}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      {feedbackModal && (
        <InterviewFeedbackModal
          isOpen={feedbackModal}
          onClose={() => setFeedbackModal(false)}
          onSubmit={handleAddResult}
        />
      )}
    </div>
  );

  // const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  //     <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${t.subheading} mb-1.5`}>
  //       {children}
  //     </p>
  //   );

  //   return 2(
  //     <div
  //       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-200"
  //       style={{
  //         backgroundColor: mode === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(15, 23, 42, 0.6)',
  //         backdropFilter: 'blur(4px)',
  //       }}
  //       onClick={(e) => e.target === e.currentTarget && handleClose()}
  //     >
  //       <div
  //         className={`relative w-full sm:max-w-xl ${t.surface} ${t.surfaceBorder} border-t sm:border rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col h-[92dvh] sm:h-auto sm:max-h-[88dvh] overflow-hidden transition-all duration-200`}
  //       >
  //         {/* ── Mobile Drag Bar ── */}
  //         <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
  //           <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
  //         </div>

  //         {/* ── Header ── */}
  //         <div className={`flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b ${t.surfaceBorder} flex-shrink-0`}>
  //           <div className="flex items-center gap-3 min-w-0">
  //             <div className={`w-9 h-9 rounded-xl ${t.sectionIconBg} flex items-center justify-center ${t.sectionIconText} flex-shrink-0`}>
  //               <BriefcaseIcon />
  //             </div>
  //             <div className="min-w-0">
  //               <p className={`text-sm sm:text-base font-bold tracking-tight ${t.heading} truncate`}>
  //                 Interview Details
  //               </p>
  //               <p className={`text-[11px] sm:text-xs ${t.subheading} truncate`}>
  //                 Scheduled candidate interview overview
  //               </p>
  //             </div>
  //           </div>

  //           <div className="flex items-center gap-2 flex-shrink-0">
  //             <span
  //               className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
  //                 interview?.isConfirmed
  //                   ? `${t.appliedBg} ${t.appliedText} ${t.appliedBorder}`
  //                   : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900'
  //               }`}
  //             >
  //               {interview?.isConfirmed ? 'Confirmed' : 'Unconfirmed'}
  //             </span>

  //             {interview.status !== 'completed' && interview.status !== 'cancelled' && (
  //               <button
  //                 type="button"
  //                 onClick={() => setIsEditing(!isEditing)}
  //                 className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all touch-manipulation ${
  //                   isEditing
  //                     ? `${t.primaryButton} shadow-sm`
  //                     : `${t.surface} ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover}`
  //                 }`}
  //               >
  //                 <EditIcon />
  //                 <span>{isEditing ? 'Editing…' : 'Edit'}</span>
  //               </button>
  //             )}

  //             <button
  //               type="button"
  //               onClick={handleClose}
  //               className={`p-1.5 rounded-lg text-slate-400 hover:${t.sortHover} transition-colors touch-manipulation`}
  //             >
  //               <XIcon />
  //             </button>
  //           </div>
  //         </div>

  //         {/* ── Scrollable Body ── */}
  //         <div className="overflow-y-auto overscroll-contain flex-1 px-4 sm:px-6 py-4 flex flex-col gap-4">

  //           {/* Candidate Profile Strip */}
  //           <div className={`flex items-center justify-between gap-3 ${t.cardBg} rounded-xl p-3 sm:p-3.5 border ${t.cardBorder}`}>
  //             <div className="flex items-center gap-3 min-w-0">
  //               <div className={`w-10 h-10 rounded-full ${t.statIconBg} flex items-center justify-center ${t.statIconText} font-bold text-xs flex-shrink-0 overflow-hidden`}>
  //                 {interview?.candidateImageUrl ? (
  //                   <img
  //                     src={interview.candidateImageUrl}
  //                     alt={interview.name}
  //                     className="w-full h-full object-cover"
  //                   />
  //                 ) : (
  //                   interview?.name?.charAt(0).toUpperCase()
  //                 )}
  //               </div>
  //               <div className="min-w-0">
  //                 <p className={`text-xs sm:text-sm font-semibold ${t.heading} truncate`}>
  //                   {interview?.name}
  //                 </p>
  //                 <p className={`text-[10px] sm:text-[11px] ${t.subheading} truncate`}>
  //                   Applied for: <span className="font-medium text-purple-600 dark:text-purple-400">{interview?.jobTitle}</span>
  //                 </p>
  //               </div>
  //             </div>

  //             {interview.result && (
  //               <span
  //                 className={`text-[10px] sm:text-xs font-semibold rounded-full px-2.5 py-1 capitalize flex-shrink-0 ${
  //                   interview.status === 'cancelled' || interview.result === 'failed'
  //                     ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
  //                     : interview.result === 'passed'
  //                     ? `${t.appliedBg} ${t.appliedText} border ${t.appliedBorder}`
  //                     : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
  //                 }`}
  //               >
  //                 {interview.status === 'cancelled' ? 'Cancelled' : interview.result}
  //               </span>
  //             )}
  //           </div>

  //           {/* Action Alerts / Notices (View Mode Only) */}
  //           {!isEditing && (
  //             <div className="flex flex-col gap-2">
  //               {interview.isRescheduleRequested && interview.status === 'scheduled' && (
  //                 <div className="flex items-start justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-900/60 p-3">
  //                   <div className="min-w-0 flex-1">
  //                     <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1.5">
  //                       <span>⚠️</span> Candidate requested reschedule
  //                     </p>
  //                     <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
  //                       Reason: {interview.reasonForRescheduleRequest || 'No reason specified'}
  //                     </p>
  //                   </div>
  //                   <button
  //                     type="button"
  //                     onClick={handleReschedule}
  //                     className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline whitespace-nowrap pt-0.5"
  //                   >
  //                     Reschedule
  //                   </button>
  //                 </div>
  //               )}

  //               {interview.mode === 'online' && !interview.meetLink && (
  //                 <div className="flex items-center justify-between rounded-xl border border-amber-200/80 bg-amber-50/60 dark:bg-amber-950/30 dark:border-amber-900/50 p-2.5 px-3">
  //                   <span className="text-[11px] text-amber-700 dark:text-amber-400">
  //                     ⚠️ Online interview missing a meeting room link.
  //                   </span>
  //                   <button
  //                     type="button"
  //                     onClick={handleAddLink}
  //                     className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
  //                   >
  //                     Add Link
  //                   </button>
  //                 </div>
  //               )}

  //               {interview.status === 'completed' && !interview.result && (
  //                 <div className="flex items-center justify-between rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/40 dark:border-rose-900/50 p-2.5 px-3">
  //                   <span className="text-[11px] text-rose-700 dark:text-rose-400 font-medium">
  //                     ⚠️ Completed interview needs evaluation score.
  //                   </span>
  //                   <button
  //                     type="button"
  //                     onClick={() => setFeedbackModal(true)}
  //                     className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
  //                   >
  //                     Update Result
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           )}

  //           {/* ── Round, Conducted By & Topics Section ── */}
  //           <div className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-3`}>
  //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  //               {/* Round Selection */}
  //               <div>
  //                 <SectionLabel>Interview Round</SectionLabel>
  //                 {isEditing ? (
  //                   <div>
  //                     <select
  //                       value={formData.roundName}
  //                       onChange={(e) => updateFormdata({ roundName: e.target.value })}
  //                       className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
  //                     >
  //                       <option value="" disabled>Select round</option>
  //                       {ROUNDS.map((r) => (
  //                         <option key={r.value} value={r.value}>
  //                           {r.label}
  //                         </option>
  //                       ))}
  //                     </select>
  //                     {error?.roundName && <p className="text-red-500 text-[10px] mt-1">{error.roundName}</p>}
  //                   </div>
  //                 ) : (
  //                   <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg ${t.chipBg} ${t.chipText} border ${t.chipBorder}`}>
  //                     {ROUNDS.find((r) => r.value === interview.roundName)?.label || interview.roundName || 'General Round'}
  //                   </span>
  //                 )}
  //               </div>

  //               {/* Conducted By (AI vs Human) */}
  //               <div>
  //                 <SectionLabel>Conducted By</SectionLabel>
  //                 {isEditing ? (
  //                   <div className="grid grid-cols-2 gap-1.5">
  //                     {[
  //                       { val: 'ai_agent', label: 'AI Agent' },
  //                       { val: 'human', label: 'Human' },
  //                     ].map(({ val, label }) => (
  //                       <button
  //                         key={val}
  //                         type="button"
  //                         onClick={() =>
  //                           updateFormdata({
  //                             interviewerType: val,
  //                             mode: val === 'ai_agent' ? 'online' : formData.mode,
  //                           })
  //                         }
  //                         className={`py-1.5 px-2 rounded-xl border text-xs font-semibold transition-all touch-manipulation ${
  //                           formData.interviewerType === val
  //                             ? `${t.chipBg} ${t.chipText} border-purple-400 shadow-sm`
  //                             : `${t.surface} ${t.surfaceBorder} ${t.resultsMuted} hover:${t.dropdownHover}`
  //                         }`}
  //                       >
  //                         {label}
  //                       </button>
  //                     ))}
  //                   </div>
  //                 ) : (
  //                   <div className="flex items-center gap-2">
  //                     {interview.interviewerType === 'ai_agent' ? (
  //                       <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/60 px-2.5 py-1 rounded-lg border border-fuchsia-200 dark:border-fuchsia-900">
  //                         <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
  //                         AI Agent Interviewer
  //                       </span>
  //                     ) : (
  //                       <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-lg ${t.surface} ${t.surfaceBorder} border ${t.inputText}`}>
  //                         Human / Team Interviewer
  //                       </span>
  //                     )}
  //                   </div>
  //                 )}
  //               </div>
  //             </div>

  //             {/* Target Topics / Skills */}
  //             <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
  //               <SectionLabel>Topics / Core Skills</SectionLabel>
  //               {isEditing ? (
  //                 <div>
  //                   <input
  //                     type="text"
  //                     value={formData.topics || ''}
  //                     placeholder="e.g. React hooks, Redux, Node.js architecture"
  //                     onChange={(e) => updateFormdata({ topics: e.target.value })}
  //                     className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
  //                   />
  //                   {error?.topics && <p className="text-red-500 text-[10px] mt-1">{error.topics}</p>}
  //                 </div>
  //               ) : (
  //                 <p className={`text-xs ${t.inputText} leading-relaxed`}>
  //                   {interview.topics ? (
  //                     <span className="font-medium">{interview.topics}</span>
  //                   ) : (
  //                     <span className={t.subheading}>No specific topics assigned</span>
  //                   )}
  //                 </p>
  //               )}
  //             </div>
  //           </div>

  //           {/* ── Schedule & Logistics ── */}
  //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
  //             {/* Date & Time */}
  //             <div className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}>
  //               <SectionLabel>Date & Time</SectionLabel>
  //               {isEditing ? (
  //                 <div className="flex flex-col gap-2">
  //                   <input
  //                     name="date"
  //                     autoFocus={focusField === 'date'}
  //                     type="date"
  //                     value={formatDateForInput(formData.date)}
  //                     onChange={(e) => updateFormdata({ date: e.target.value })}
  //                     className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-1.5 outline-none ${t.inputFocusRing}`}
  //                   />
  //                   {error?.date && <p className="text-red-500 text-[10px]">*{error.date}</p>}

  //                   <input
  //                     name="time"
  //                     type="time"
  //                     value={formatTimeForInput(formData.time)}
  //                     onChange={(e) => updateFormdata({ time: e.target.value })}
  //                     className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-1.5 outline-none ${t.inputFocusRing}`}
  //                   />
  //                   {error?.time && <p className="text-red-500 text-[10px]">*{error.time}</p>}
  //                 </div>
  //               ) : (
  //                 <div className="flex flex-col gap-1.5 mt-0.5">
  //                   <div className={`flex items-center gap-2 text-xs ${t.inputText}`}>
  //                     <CalendarIcon />
  //                     <span>{interview.date}</span>
  //                   </div>
  //                   <div className={`flex items-center gap-2 text-xs ${t.inputText}`}>
  //                     <ClockIcon />
  //                     <span>{interview.time} ({interview.duration || 30} mins)</span>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>

  //             {/* Mode & Location/Link */}
  //             <div className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}>
  //               <SectionLabel>Mode & Venue</SectionLabel>
  //               {isEditing ? (
  //                 <div className="flex flex-col gap-2">
  //                   <select
  //                     value={formData.mode}
  //                     onChange={(e) => updateFormdata({ mode: e.target.value as any })}
  //                     disabled={formData.interviewerType === 'ai_agent'}
  //                     className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-1.5 outline-none ${t.inputFocusRing}`}
  //                   >
  //                     <option value="online">Online (Video Room)</option>
  //                     <option value="offline" disabled={formData.interviewerType === 'ai_agent'}>
  //                       In-Person (Office)
  //                     </option>
  //                   </select>

  //                   {formData.mode === 'online' ? (
  //                     <div className="flex gap-1.5">
  //                       <input
  //                         name="meetLink"
  //                         type="url"
  //                         placeholder="Meeting room link"
  //                         value={formData.meetLink || ''}
  //                         onChange={(e) => updateFormdata({ meetLink: e.target.value })}
  //                         className={`flex-1 text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-2.5 py-1.5 outline-none ${t.inputFocusRing}`}
  //                       />
  //                       <button
  //                         type="button"
  //                         onClick={() => {
  //                           if (formData.interviewerType === 'ai_agent') {
  //                             const aiRoom = `ai_room_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  //                             updateFormdata({ meetLink: `${window.location.origin}/interview/room/${aiRoom}` });
  //                           } else {
  //                             // generateMeetLink?.();
  //                           }
  //                         }}
  //                         className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg ${t.secondaryButton} hover:${t.secondaryButtonHover} whitespace-nowrap`}
  //                       >
  //                         Gen
  //                       </button>
  //                     </div>
  //                   ) : (
  //                     <input
  //                       name="location"
  //                       type="text"
  //                       placeholder="Office address or cabin"
  //                       value={formData.location || ''}
  //                       onChange={(e) => updateFormdata({ location: e.target.value })}
  //                       className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-2.5 py-1.5 outline-none ${t.inputFocusRing}`}
  //                     />
  //                   )}
  //                   {error?.meetLink && <p className="text-red-500 text-[10px]">*{error.meetLink}</p>}
  //                   {error?.location && <p className="text-red-500 text-[10px]">*{error.location}</p>}
  //                 </div>
  //               ) : (
  //                 <div className="flex flex-col gap-1.5 mt-0.5">
  //                   <div className={`flex items-center gap-2 text-xs font-medium ${t.inputText}`}>
  //                     {interview.mode === 'online' ? <LinkIcon /> : <MapPinIcon />}
  //                     <span>{interview.mode === 'offline' ? 'In-Person (Office)' : 'Online Video Call'}</span>
  //                   </div>

  //                   {interview.mode === 'online' && interview.meetLink && (
  //                     <button
  //                       type="button"
  //                      // onClick={() => window.open(interview.meetLink.startsWith('http') ? interview.meetLink : `/meeting/${interview.meetLink}`, '_blank')}
  //                       className={`inline-flex items-center gap-1.5 text-xs font-semibold w-fit px-2.5 py-1 rounded-lg border mt-0.5 transition-colors ${t.secondaryButton} hover:${t.secondaryButtonHover}`}
  //                     >
  //                       <LinkIcon /> Join Meeting Room
  //                     </button>
  //                   )}

  //                   {interview.mode === 'offline' && interview.location && (
  //                     <a
  //                       href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(interview.location)}`}
  //                       target="_blank"
  //                       rel="noreferrer"
  //                       className="text-xs text-fuchsia-600 dark:text-fuchsia-400 hover:underline flex items-center gap-1"
  //                     >
  //                       <span>📍</span> {interview.location}
  //                     </a>
  //                   )}
  //                 </div>
  //               )}
  //             </div>
  //           </div>

  //           {/* ── Candidate Notes ── */}
  //           <div className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}>
  //             <SectionLabel>Instructions / Notes for Candidate</SectionLabel>
  //             {isEditing ? (
  //               <div>
  //                 <textarea
  //                   rows={2}
  //                   value={formData.notes || ''}
  //                   onChange={(e) => updateFormdata({ notes: e.target.value })}
  //                   placeholder="Additional notes for candidate..."
  //                   className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} p-2.5 outline-none ${t.inputFocusRing} resize-none`}
  //                 />
  //                 {error?.notes && <p className="text-red-500 text-[10px]">*{error.notes}</p>}
  //               </div>
  //             ) : (
  //               <p className={`text-xs ${t.subheading} leading-relaxed`}>
  //                 {interview?.note || interview.note || 'No special notes provided.'}
  //               </p>
  //             )}
  //           </div>

  //           {/* ── Evaluation & Feedback (Completed Rounds Only) ── */}
  //           {interview.status === 'completed' && (
  //             <div className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-2.5`}>
  //               <div className="flex items-center justify-between">
  //                 <SectionLabel>Evaluation Score</SectionLabel>
  //                 <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${t.appliedBg} ${t.appliedText}`}>
  //                   {interview.score ? `${interview.score}/10` : 'Pending'}
  //                 </span>
  //               </div>
  //               <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
  //                 <SectionLabel>Feedback Details</SectionLabel>
  //                 <p className={`text-xs ${t.inputText} leading-relaxed`}>
  //                   {interview?.feedback || <span className="text-amber-500 italic">No feedback added yet</span>}
  //                 </p>
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         {/* ── Footer ── */}
  //         <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t ${t.surfaceBorder} flex-shrink-0 ${t.surface} safe-bottom`}>
  //           {!['cancelled', 'completed'].includes(interview.status) && !isEditing ? (
  //             <div className="flex items-center gap-2 w-full sm:w-auto">
  //               <button
  //                 type="button"
  //                 onClick={handleReschedule}
  //                 className={`flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold rounded-xl border ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover} transition-all touch-manipulation`}
  //               >
  //                 Reschedule
  //               </button>
  //               <button
  //                 type="button"
  //                 onClick={handleComplete}
  //                 className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/20 border border-emerald-600/20 transition-all touch-manipulation"
  //               >
  //                 Mark Completed
  //               </button>
  //             </div>
  //           ) : (
  //             <div className="hidden sm:block" />
  //           )}

  //           <div className="flex items-center gap-2 w-full sm:w-auto ml-auto">
  //             {isEditing ? (
  //               <>
  //                 <button
  //                   type="button"
  //                   onClick={() => setIsEditing(false)}
  //                   className={`flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-xl border ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover} transition-all touch-manipulation`}
  //                 >
  //                   Cancel
  //                 </button>
  //                 <button
  //                   type="button"
  //                   onClick={handleUpdate}
  //                   className={`flex-1 sm:flex-none px-5 py-2 text-xs font-semibold rounded-xl ${t.primaryButton} ${t.primaryButtonHover} transition-all shadow-md active:scale-95 touch-manipulation`}
  //                 >
  //                   Save Changes
  //                 </button>
  //               </>
  //             ) : (
  //               <button
  //                 type="button"
  //                 onClick={handleClose}
  //                 className={`w-full sm:w-auto px-5 py-2 text-xs font-semibold rounded-xl ${t.secondaryButton} hover:${t.secondaryButtonHover} transition-all touch-manipulation`}
  //               >
  //                 Close
  //               </button>
  //             )}
  //           </div>
  //         </div>
  //       </div>

  //       {feedbackModal && (
  //         <InterviewFeedbackModal
  //           isOpen={feedbackModal}
  //           onClose={() => setFeedbackModal(false)}
  //           onSubmit={handleAddResult}
  //         />
  //       )}
  //     </div>
  //   );

  // return 1(
  //   <Dialog open={isOpen} onOpenChange={handleClose}>
  //     <DialogContent className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
  //       <div className="bg-white rounded-2xl border border-gray-200 w-full max-w-lg shadow-xl max-h-[90vh] flex flex-col">
  //         {/* ── Header ── */}
  //         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
  //           <div className="flex items-center gap-3">
  //             <div className="w-9 h-9 rounded-xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-600">
  //               <BriefcaseIcon />
  //             </div>
  //             <div>
  //               <p className="text-sm font-semibold text-gray-800 leading-tight">
  //                 Interview details
  //               </p>
  //               <p className="text-xs text-gray-400 leading-tight">
  //                 Scheduled interview overview
  //               </p>
  //             </div>
  //           </div>
  //           <div className="flex items-center gap-2">
  //             <span className="bg-green-50 text-green-700 text-[11px] font-semibold px-3 py-0.5 rounded-full">
  //               {interview?.isConfirmed ? 'Confirmed' : 'Not Confirmed'}
  //             </span>
  //             {interview.status !== 'completed' && (
  //               <button
  //                 onClick={() => setIsEditing(!isEditing)}
  //                 className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
  //                   isEditing
  //                     ? 'bg-fuchsia-600 text-white border-fuchsia-600'
  //                     : 'border-gray-200 text-gray-600 hover:bg-gray-50'
  //                 }`}
  //               >
  //                 <EditIcon />
  //                 {isEditing ? 'Editing…' : 'Edit'}
  //               </button>
  //             )}

  //             <button
  //               onClick={handleClose}
  //               className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
  //             >
  //               <XIcon />
  //             </button>
  //           </div>
  //         </div>
  //         <div className="flex-1 overflow-y-auto">
  //           <div className="px-6 py-4 border-b border-gray-100">
  //             <SectionLabel>Candidate</SectionLabel>

  //             <div className="flex items-center justify-between">
  //               {/* Left side (candidate info) */}
  //               <div className="flex items-center gap-3">
  //                 <div className="w-11 h-11 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold text-sm flex-shrink-0 overflow-hidden">
  //                   {interview?.candidateImageUrl ? (
  //                     <img
  //                       src={interview.candidateImageUrl}
  //                       alt={interview.name}
  //                       className="w-full h-full object-cover"
  //                     />
  //                   ) : (
  //                     interview?.name?.charAt(0).toUpperCase()
  //                   )}
  //                 </div>
  //                 <div>
  //                   <p className="text-sm font-semibold text-gray-800">
  //                     {interview?.name}
  //                   </p>
  //                   <p className="text-xs text-gray-400 mt-0.5">
  //                     Applied for: {interview?.jobTitle}
  //                   </p>
  //                 </div>
  //               </div>

  //               {/* Right side (badge) */}
  //               {interview.result && (
  //                 <span
  //                   className={`text-xs text-white rounded-full px-3 py-1 ${
  //                     interview.status == 'cancelled'
  //                       ? 'bg-red-500'
  //                       : interview.result === 'passed'
  //                         ? 'bg-green-500'
  //                         : interview.result === 'failed'
  //                           ? 'bg-red-500'
  //                           : 'bg-yellow-500'
  //                   }`}
  //                 >
  //                   {interview.status == 'cancelled'
  //                     ? 'cancelled'
  //                     : interview.result
  //                       ? interview.result
  //                       : ''}
  //                 </span>
  //               )}
  //             </div>
  //           </div>

  //           {!isEditing && (
  //             <div className="px-6 pt-4">
  //               {interview.isRescheduleRequested &&
  //                 interview.status === 'scheduled' && (
  //                   <div className="flex items-start justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
  //                     <div className="flex-1">
  //                       <p className="text-xs text-amber-700 font-medium">
  //                         ⚠️ Candidate requested reschedule
  //                       </p>

  //                       <p className="text-xs text-black-700 font-medium mt-1">
  //                         Reason: {interview.reasonForRescheduleRequest}
  //                       </p>
  //                     </div>

  //                     <button
  //                       onClick={handleReschedule}
  //                       className="text-xs text-fuchsia-600 hover:underline whitespace-nowrap"
  //                     >
  //                       Reschedule
  //                     </button>
  //                   </div>
  //                 )}
  //             </div>
  //           )}

  //           {!isEditing && (
  //             <div className="px-6 pt-4 flex flex-col gap-2">
  //               {interview.mode === 'online' && !interview.meetLink && (
  //                 <div className="flex items-center justify-between">
  //                   <span className="text-xs text-amber-600">
  //                     ⚠️ This is an online interview but no meeting link is
  //                     added.
  //                   </span>
  //                   <button
  //                     onClick={handleAddLink}
  //                     className="text-xs text-fuchsia-600 hover:underline"
  //                   >
  //                     Add Link
  //                   </button>
  //                 </div>
  //               )}

  //               {interview.status === 'completed' && !interview.result && (
  //                 <div className="flex items-center justify-between">
  //                   <span className="text-xs text-red-600">
  //                     ⚠️ Result is not Updated yet.
  //                   </span>
  //                   <button
  //                     onClick={() => setFeedbackModal(true)}
  //                     className="text-xs text-fuchsia-600 hover:underline"
  //                   >
  //                     Update Result
  //                   </button>
  //                 </div>
  //               )}
  //             </div>
  //           )}
  //           {/* ── Date & Mode ── */}
  //           <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-5">
  //             {/* Date & Time */}
  //             <div>
  //               <SectionLabel>Date & time</SectionLabel>
  //               {isEditing ? (
  //                 <div className="flex flex-col gap-1.5">
  //                   <input
  //                     name="date"
  //                     autoFocus={focusField === 'date'}
  //                     type="date"
  //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //                       updateFormdata({ date: e.currentTarget.value })
  //                     }
  //                     value={formatDateForInput(formData.date)}
  //                     className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-100"
  //                   />
  //                   {error && error.date && (
  //                     <p className="text-sm text-red-500">*{error.date}</p>
  //                   )}
  //                   <input
  //                     type="time"
  //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //                       updateFormdata({ time: e.currentTarget.value })
  //                     }
  //                     value={formatTimeForInput(formData.time)}
  //                     className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-100"
  //                   />
  //                   {error && error.time && (
  //                     <p className="text-sm text-red-500">*{error.time}</p>
  //                   )}
  //                 </div>
  //               ) : (
  //                 <div className="flex flex-col gap-1">
  //                   <div className="flex items-center gap-1.5 text-gray-500">
  //                     <CalendarIcon />
  //                     <span className="text-xs text-gray-700">
  //                       {interview.date}
  //                     </span>
  //                   </div>
  //                   <div className="flex items-center gap-1.5 text-gray-500">
  //                     <ClockIcon />
  //                     <span className="text-xs text-gray-700">
  //                       {interview.time}
  //                     </span>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>

  //             {/* Mode */}
  //             <div>
  //               <SectionLabel>Mode</SectionLabel>
  //               {isEditing ? (
  //                 <div className="flex flex-col gap-1.5">
  //                   <select
  //                     value={formData.mode}
  //                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
  //                       updateFormdata({
  //                         mode: e.currentTarget.value as InterviewMode,
  //                       })
  //                     }
  //                     className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-100"
  //                   >
  //                     <option value={'online'} key={'online'}>
  //                       Online (Google Meet)
  //                     </option>

  //                     <option value={'offline'} key={'offline'}>
  //                       In-person
  //                     </option>
  //                   </select>
  //                   {error && error.mode && (
  //                     <p className="text-sm text-red-500">*{error.mode}</p>
  //                   )}
  //                   <input
  //                     name="meetLink"
  //                     autoFocus={focusField === 'meetLink'}
  //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  //                       if (formData.mode == 'online') {
  //                         updateFormdata({ meetLink: e.currentTarget.value });
  //                       } else {
  //                         updateFormdata({ location: e.currentTarget.value });
  //                       }
  //                     }}
  //                     type="text"
  //                     value={formData.meetLink}
  //                     placeholder={
  //                       formData.mode == 'online'
  //                         ? 'Add meetlink'
  //                         : 'Add location'
  //                     }
  //                     className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
  //                   />
  //                   {error && error.meetLink && (
  //                     <p className="text-sm text-red-500">*{error.meetLink}</p>
  //                   )}
  //                 </div>
  //               ) : (
  //                 <div className="flex flex-col gap-1">
  //                   <div className="flex items-center gap-1.5 text-gray-500">
  //                     {interview.mode == 'online' ? (
  //                       <Link size={16} className="text-fuchsia-500" />
  //                     ) : (
  //                       <MapPinIcon size={16} className="text-fuchsia-500" />
  //                     )}

  //                     <span className="text-xs   text-gray-700">
  //                       {interview.mode == 'offline' ? 'Offline' : 'Online'}
  //                     </span>
  //                   </div>
  //                   <div>
  //                     {' '}
  //                     <a
  //                       href="#"
  //                       className="text-xs text-fuchsia-500 hover:underline pl-0.5"
  //                     >
  //                       {interview.mode === 'online' &&
  //                         interview.meetLink &&
  //                         (() => {
  //                           const interviewDateTime = new Date(
  //                             `${interview.date}T${interview.time}`
  //                           );

  //                           const isPastInterview =
  //                             interviewDateTime <= new Date();

  //                           const isDisabled =
  //                             interview.status !== 'scheduled' ||
  //                             isPastInterview;

  //                           return (
  //                             <div className="flex flex-col items-start gap-1">
  //                               <button
  //                                 type="button"
  //                                 disabled={isDisabled}
  //                                 onClick={() => {
  //                                   window.open(
  //                                     `/meeting/${interview.meetLink}`,
  //                                     '_blank'
  //                                   );
  //                                 }}
  //                                 className={`rounded py-1 px-2 border text-xs ${
  //                                   isDisabled
  //                                     ? 'border-gray-300 text-gray-400 cursor-not-allowed'
  //                                     : 'border-fuchsia-700 text-fuchsia-800 hover:bg-fuchsia-50'
  //                                 }`}
  //                               >
  //                                 Join meeting
  //                               </button>

  //                               {isPastInterview && (
  //                                 <span className="text-xs text-red-500">
  //                                   You cannot join a past interview.
  //                                 </span>
  //                               )}

  //                               {!isPastInterview &&
  //                                 interview.status !== 'scheduled' && (
  //                                   <span className="text-xs text-gray-500">
  //                                     This interview is not available to join.
  //                                   </span>
  //                                 )}
  //                             </div>
  //                           );
  //                         })()}
  //                       {interview.mode === 'offline' && interview.location && (
  //                         <a
  //                           href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(interview.location)}`}
  //                           target="_blank"
  //                           className="text-xs text-fuchsia-500 hover:underline"
  //                         >
  //                           View location
  //                         </a>
  //                       )}
  //                     </a>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //           {!isEditing ? (
  //             <div className="flex flex-col ml-5 gap-2">
  //               {interview.mode === 'online' && !interview.meetLink && (
  //                 <span className="text-xs text-amber-600"></span>
  //               )}
  //             </div>
  //           ) : (
  //             formData.mode === 'online' && (
  //               <div className="flex flex-col ml-5 gap-2">
  //                 {[
  //                   { val: false, label: 'Add link now' },
  //                   { val: true, label: 'Add link later' },
  //                 ].map(({ val, label }) => (
  //                   <label
  //                     key={label}
  //                     className="flex items-center gap-2.5 cursor-pointer group"
  //                   >
  //                     <div
  //                       className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
  //                         formData.isAddlinkLater === val
  //                           ? 'border-fuchsia-800 bg-fuchsia-800'
  //                           : 'border-slate-300 group-hover:border-slate-400'
  //                       }`}
  //                       onClick={() => updateFormdata({ isAddlinkLater: val })}
  //                     />
  //                     <span
  //                       className="text-sm text-slate-700"
  //                       onClick={() => updateFormdata({ isAddlinkLater: val })}
  //                     >
  //                       {label}
  //                     </span>
  //                   </label>
  //                 ))}
  //               </div>
  //             )
  //           )}

  //           {/* ── Round & Duration ── */}
  //           {/* <div className="px-6 py-4 border-b border-gray-100 grid grid-cols-2 gap-5">
  //             <div>
  //               <SectionLabel>Round</SectionLabel>
  //               {isEditing ? (
  //                 <></>
  //               ) : (
  //                 // <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100">
  //                 //   <option>Round 1 — HR Screening</option>
  //                 //   <option>Round 2 — Technical</option>
  //                 //   <option>Round 3 — Culture Fit</option>
  //                 //   <option>Final Round</option>
  //                 // </select>
  //                 <></>
  //                 // <p className="text-xs text-gray-700">Round 2 — Technical</p>
  //               )}
  //             </div>
  //             <div>
  //               <SectionLabel>Duration</SectionLabel>
  //               {isEditing ? (
  //                 <>
  //                   {' '}
  //                   <select
  //                     value={formData.duration}
  //                     onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
  //                       updateFormdata({
  //                         duration: e.target.value as InterviewMode,
  //                       })
  //                     }
  //                     className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
  //                   >
  //                     {Durations.map((dur) => (
  //                       <option value={dur}>{dur} minutes</option>
  //                     ))}
  //                   </select>
  //                   {error && error.duration && (
  //                     <p className="text-sm text-red-500">*{error.duration}</p>
  //                   )}
  //                 </>
  //               ) : (
  //                 <p className="text-xs text-gray-700">
  //                   {interview.duration} minutes
  //                 </p>
  //               )}
  //             </div>
  //           </div> */}

  //           {/* ── Note for Candidate ── */}
  //           <div className="px-6 py-4 border-b border-gray-100">
  //             <SectionLabel>Note for candidate</SectionLabel>
  //             {isEditing ? (
  //               <>
  //                 {' '}
  //                 <textarea
  //                   className="w-full text-sm border rounded"
  //                   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //                     updateFormdata({ notes: e.currentTarget.value })
  //                   }
  //                   rows={3}
  //                   value={formData.notes}
  //                 />
  //                 {error && error.notes && (
  //                   <p className="text-sm text-red-500">* {error.notes}</p>
  //                 )}
  //               </>
  //             ) : (
  //               <p className="text-xs text-gray-500 leading-relaxed">
  //                 {interview?.note}
  //               </p>
  //             )}
  //           </div>

  //           {/* ── Feedback ── */}
  //           {interview.status === 'completed' && (
  //             <>
  //               {' '}
  //               <div className="px-6 py-4 border-b border-gray-100">
  //                 <SectionLabel>Score</SectionLabel>
  //                 <p className="text-xs text-gray-500 leading-relaxed">
  //                   {interview.score ?? 'Score not added'}
  //                 </p>
  //               </div>
  //               <div className="px-6 py-4 border-b border-gray-100">
  //                 <SectionLabel>FeedBack</SectionLabel>

  //                 <p className="text-xs text-gray-500 leading-relaxed">
  //                   {interview?.feedback ? (
  //                     interview.feedback
  //                   ) : (
  //                     <span className="text-amber-600">
  //                       No feedback added yet
  //                     </span>
  //                   )}
  //                 </p>
  //               </div>
  //             </>
  //           )}
  //         </div>

  //         {/* ── Footer ── */}
  //         <div className="px-6 py-4 flex items-center justify-between">
  //           {!['cancelled', 'completed'].includes(interview.status) && (
  //             <>
  //               {' '}
  //               <button
  //                 onClick={handleReschedule}
  //                 className="text-xs font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
  //               >
  //                 Reschedule
  //               </button>
  //               {interview.status !== 'completed' && (
  //                 <button
  //                   onClick={handleComplete}
  //                   className="text-xs font-medium text-green-700 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
  //                 >
  //                   Mark as Completed
  //                 </button>
  //               )}
  //             </>
  //           )}

  //           <div className="flex items-center gap-2 ml-auto">
  //             {isEditing ? (
  //               <>
  //                 <button
  //                   onClick={() => setIsEditing(false)}
  //                   className="text-xs font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
  //                 >
  //                   Cancel
  //                 </button>
  //                 <button
  //                   onClick={handleUpdate}
  //                   className="text-xs font-semibold bg-fuchsia-800 text-white px-4 py-2 rounded-lg hover:bg-fuchsia-600 transition-colors"
  //                 >
  //                   Save changes
  //                 </button>
  //               </>
  //             ) : (
  //               <button
  //                 onClick={onClose}
  //                 className="flex items-center gap-1.5 text-xs font-semibold bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors border border-blue-100"
  //               >
  //                 close
  //               </button>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //       <InterviewFeedbackModal
  //         isOpen={feedbackModal}
  //         onClose={() => setFeedbackModal(false)}
  //         onSubmit={handleAddResult}
  //       />
  //     </DialogContent>
  //   </Dialog>
  // );
}
