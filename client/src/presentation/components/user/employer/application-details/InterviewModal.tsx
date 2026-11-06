import React from 'react';
import { useInterviews } from '../../../../hooks/user/useInterview';
import type { ApplicationStatusType } from '../../../../../types/dtos/application.dto';
import { initialData } from '../../../../hooks/user/useInterview';
import {
  Durations,
  type InterviewerType,
  type InterviewMode,
  type RoundType,
} from '../../../../../types/dtos/interview.dto';
import { useTheme } from '../../../../../contexts/ThemeContext';

// ─── Icons ────────────────────────────────────────────────────────────────────

type Props = {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    name: string;
    email: string;
    applied: string;
    status: ApplicationStatusType;
    initials: string;
    profileImg?: string;
  };
  jobTitle: string;
  appId: string;
  onSchedule: (status: ApplicationStatusType) => void;
  setChatroomId: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function InterviewModal({
  isOpen,
  onClose,
  candidate,
  jobTitle,
  appId,
  onSchedule,
  setChatroomId,
}: Props) {
  const {
    formData,
    updateFormdata,
    submitInterviewForm,
    error,
    generateMeetLink,
    loading,
  } = useInterviews();

  const handleSchedule = async () => {
    const response = await submitInterviewForm('add', {
      applicationId: appId,
    });
    if (!response) return;
    const { interviewId, chatroomId } = response;
    console.log('chatroomId', chatroomId, 'interviewId', interviewId);
    setChatroomId(chatroomId);
    if (!interviewId || !chatroomId) return;
    updateFormdata(initialData);
    onSchedule('interviewScheduled');
  };

  const ROUNDS: { value: RoundType; label: string }[] = [
    { value: 'screening', label: 'Screening' },
    { value: 'hr_behavioral', label: 'HR Round' },
    { value: 'technical', label: 'Technical' },
    { value: 'managerial', label: 'Managerial' },
    { value: 'assignment', label: 'Assignment' },
  ];

  if (!isOpen) return null;

  console.log('candidate', candidate);
  const { mode, t } = useTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-200"
      style={{
        backgroundColor:
          mode === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && !loading && onClose()}
    >
      <div
        className={`relative w-full sm:max-w-xl ${t.surface} ${t.surfaceBorder} border-t sm:border rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col h-[90dvh] sm:h-auto sm:max-h-[88dvh] overflow-hidden transition-all duration-200`}
      >
        {/* ── Mobile Drag Indicator ── */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* ── Header ── */}
        <div
          className={`flex items-start justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b ${t.surfaceBorder} flex-shrink-0`}
        >
          <div className="min-w-0 pr-3">
            <h2
              className={`text-sm sm:text-base font-bold tracking-tight ${t.heading} truncate`}
            >
              Schedule Interview
            </h2>
            <p
              className={`text-[11px] sm:text-xs ${t.subheading} mt-0.5 font-medium truncate`}
            >
              {jobTitle}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={`p-2 -mr-1 rounded-xl text-slate-400 hover:${t.sortHover} transition-colors disabled:opacity-50 touch-manipulation`}
            aria-label="Close modal"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto overscroll-contain flex-1 px-4 sm:px-6 py-4 flex flex-col gap-4">
          {/* Candidate Summary Card */}
          <div
            className={`flex items-center gap-3 ${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}
          >
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${t.statIconBg} flex items-center justify-center ${t.statIconText} text-xs font-semibold flex-shrink-0 overflow-hidden`}
            >
              {candidate.profileImg ? (
                <img
                  src={candidate.profileImg}
                  alt={candidate.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                candidate.initials
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-xs sm:text-sm font-semibold ${t.heading} truncate`}
              >
                {candidate.name}
              </p>
              <p
                className={`text-[10px] sm:text-[11px] ${t.subheading} truncate`}
              >
                {candidate.email} · Applied on: {candidate.applied}
              </p>
            </div>
            <span
              className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold px-2 sm:px-2.5 py-1 rounded-full ${t.appliedBg} ${t.appliedText} border ${t.appliedBorder}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span className="hidden xs:inline">{candidate.status}</span>
            </span>
          </div>

          {/* ── Round Sequence & Interviewer Selection ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="w-full">
              <label
                className={`block text-xs font-semibold ${t.heading} mb-1.5`}
              >
                Round Sequence
              </label>
              <div className="relative">
                <select
                  value={formData.roundName}
                  onChange={(e) => {
                    const selectedValue = e.target.value as RoundType;
                    console.log('selected value', selectedValue);

                    updateFormdata({
                      roundName: selectedValue,
                    });
                  }}
                  className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing} appearance-none pr-8 cursor-pointer`}
                >
                  <option value={''}>Select Round</option>
                  {ROUNDS.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                      Round : {preset.label}
                    </option>
                  ))}
                </select>
                {error?.roundName && (
                  <p className="text-red-500 text-[11px] mt-1">
                    {error.roundName}
                  </p>
                )}

                {/* Dropdown Chevron Icon */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="w-full">
              <label
                className={`block text-xs font-semibold ${t.heading} mb-1.5`}
              >
                Interviewer
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { val: 'ai_agent', label: 'AI Agent' },
                  { val: 'human', label: 'Human / Team' },
                ].map(({ val, label }) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() =>
                      updateFormdata({
                        interviewerType: val as InterviewerType,
                        mode: val === 'ai_agent' ? 'online' : formData.mode,
                      })
                    }
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all touch-manipulation text-center truncate ${
                      formData.interviewerType === val
                        ? `${t.chipBg} ${t.chipText} border-purple-400 shadow-sm`
                        : `${t.surface} ${t.surfaceBorder} ${t.resultsMuted} hover:${t.dropdownHover}`
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              {error?.interviewerType && (
                <p className="text-red-500 text-[11px] mt-1">
                  {error.interviewerType}
                </p>
              )}
            </div>
          </div>

          {/* ── Interview Mode (Online vs Offline) ── */}
          <div>
            <label
              className={`block text-xs font-semibold ${t.heading} mb-1.5`}
            >
              Interview Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  val: 'online',
                  label: 'Online',
                  sublabel: 'Video Call',
                  icon: (
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                },
                {
                  val: 'offline',
                  label: 'In-Person',
                  sublabel: 'Physical',
                  disabled: formData.interviewerType === 'ai_agent',
                  icon: (
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ),
                },
              ].map(({ val, icon, label, sublabel, disabled }) => (
                <button
                  key={val}
                  type="button"
                  disabled={disabled}
                  onClick={() => updateFormdata({ mode: val as InterviewMode })}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all touch-manipulation ${
                    disabled
                      ? 'opacity-40 cursor-not-allowed border-dashed'
                      : ''
                  } ${
                    formData.mode === val
                      ? `${t.chipBg} ${t.chipText} border-purple-400 font-semibold shadow-sm`
                      : `${t.surface} ${t.surfaceBorder} ${t.resultsMuted} hover:${t.dropdownHover}`
                  }`}
                >
                  {icon}
                  <span className="truncate">{label}</span>
                  <span className="hidden sm:inline text-[11px] opacity-75">
                    ({sublabel})
                  </span>
                </button>
              ))}
            </div>
            {formData.interviewerType === 'ai_agent' && (
              <p className={`text-[11px] ${t.subheading} mt-1.5 italic`}>
                * AI Agent interviews can only be conducted online.
              </p>
            )}
          </div>

          {/* ── Date, Time & Duration ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="w-full">
              <label
                className={`block text-xs font-semibold ${t.heading} mb-1.5`}
              >
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => updateFormdata({ date: e.target.value })}
                className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
              />
              {error?.date && (
                <p className="text-red-500 text-[11px] mt-1">{error.date}</p>
              )}
            </div>

            <div className="w-full">
              <label
                className={`block text-xs font-semibold ${t.heading} mb-1.5`}
              >
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => updateFormdata({ time: e.target.value })}
                className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
              />
              {error?.time && (
                <p className="text-red-500 text-[11px] mt-1">{error.time}</p>
              )}
            </div>

            <div className="w-full">
              <label
                className={`block text-xs font-semibold ${t.heading} mb-1.5`}
              >
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => updateFormdata({ duration: e.target.value })}
                className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
              >
                <option value="">Select duration</option>
                {Durations.map((d) => (
                  <option key={d} value={d}>
                    {d} minutes
                  </option>
                ))}
              </select>
              {error?.duration && (
                <p className="text-red-500 text-[11px] mt-1">
                  {error.duration}
                </p>
              )}
            </div>
          </div>

          {/* ── Online Meeting Configuration ── */}
          {/* {formData.mode === 'online' && (
            <div
              className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-3`}
            >
              {formData.interviewerType === 'ai_agent' ? (
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping flex-shrink-0" />
                    <span className={`text-xs font-semibold ${t.heading}`}>
                      AI Room Integration
                    </span>
                  </div>
                  <p
                    className={`text-[11px] sm:text-[12px] ${t.subheading} leading-relaxed`}
                  >
                    A real-time AI interview session room will be provisioned
                    automatically. A unique secure joining link will be included
                    in the candidate's invitation.
                  </p>
                  <div>
                    <label
                      className={`block text-[11px] font-semibold ${t.subheading} mb-1`}
                    >
                      Focus Topics / Skills for AI Evaluator (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., React hooks, async patterns, TypeScript generics"
                      value={formData.topics || ''}
                      onChange={(e) =>
                        updateFormdata({ topics: e.target.value })
                      }
                      className={`w-full text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} p-2.5 outline-none ${t.inputFocusRing}`}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <label className={`text-xs font-semibold ${t.heading}`}>
                    Meeting Link
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { val: false, label: 'Add link now' },
                      { val: true, label: 'Add link later' },
                    ].map(({ val, label }) => (
                      <label
                        key={label}
                        className="flex items-center gap-2 cursor-pointer text-xs touch-manipulation"
                      >
                        <input
                          type="radio"
                          name="addLinkOption"
                          checked={formData.isAddlinkLater === val}
                          onChange={() =>
                            updateFormdata({ isAddlinkLater: val })
                          }
                          className="text-fuchsia-600 focus:ring-fuchsia-500"
                        />
                        <span className={t.inputText}>{label}</span>
                      </label>
                    ))}
                  </div>

                  {!formData.isAddlinkLater ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={formData.meetLink}
                        onChange={(e) =>
                          updateFormdata({ meetLink: e.target.value })
                        }
                        placeholder="https://meet.google.com/..."
                        className={`w-full flex-1 text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
                      />
                      <button
                        type="button"
                        onClick={generateMeetLink}
                        className={`w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-lg ${t.secondaryButton} hover:${t.secondaryButtonHover} transition-colors whitespace-nowrap touch-manipulation`}
                      >
                        Generate
                      </button>
                    </div>
                  ) : (
                    <p
                      className={`text-[11px] ${t.subheading} bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5`}
                    >
                      Candidate will be notified once the link is added. You can
                      update it anytime from the application dashboard.
                    </p>
                  )}
                  {error?.meetLink && (
                    <p className="text-red-500 text-[11px]">{error.meetLink}</p>
                  )}
                </>
              )}
            </div>
          )} */}

          {formData.mode === 'online' && (
            <div
              className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-3.5`}
            >
              {/* Optional AI Focus Topics (Only shown when AI Agent is selected) */}
              {formData.interviewerType === 'ai_agent' && (
                <div className="flex flex-col gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping flex-shrink-0" />
                    <span className={`text-xs font-semibold ${t.heading}`}>
                      AI Agent Settings
                    </span>
                  </div>
                  <label
                    className={`block text-[11px] font-semibold ${t.subheading}`}
                  >
                    Focus Topics / Skills for AI Evaluator (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., React hooks, async patterns, TypeScript generics"
                    value={formData.topics || ''}
                    onChange={(e) => updateFormdata({ topics: e.target.value })}
                    className={`w-full text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} p-2.5 outline-none ${t.inputFocusRing}`}
                  />
                </div>
              )}

              {/* Meeting Link Section (Available for both AI Agent & Human) */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <label className={`text-xs font-semibold ${t.heading}`}>
                    Meeting Link
                  </label>
                  {formData.interviewerType === 'ai_agent' && (
                    <span className="text-[10px] font-medium text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-950/60 px-2 py-0.5 rounded-full border border-fuchsia-200 dark:border-fuchsia-900">
                      Internal AI Room
                    </span>
                  )}
                </div>

                {/* Radio options: Now or Later */}
                <div className="flex flex-wrap gap-4">
                  {[
                    { val: false, label: 'Add link now' },
                    { val: true, label: 'Add link later' },
                  ].map(({ val, label }) => (
                    <label
                      key={label}
                      className="flex items-center gap-2 cursor-pointer text-xs touch-manipulation"
                    >
                      <input
                        type="radio"
                        name="addLinkOption"
                        checked={formData.isAddlinkLater === val}
                        onChange={() => updateFormdata({ isAddlinkLater: val })}
                        className="text-fuchsia-600 focus:ring-fuchsia-500"
                      />
                      <span className={t.inputText}>{label}</span>
                    </label>
                  ))}
                </div>

                {/* Link Input & Generate Button */}
                {!formData.isAddlinkLater ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={formData.meetLink || ''}
                      onChange={(e) =>
                        updateFormdata({ meetLink: e.target.value })
                      }
                      placeholder={
                        formData.interviewerType === 'ai_agent'
                          ? `${window.location.origin}/interview/ai-... or paste custom link`
                          : 'https://meet.google.com/... or paste custom link'
                      }
                      className={`w-full flex-1 text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (formData.interviewerType === 'ai_agent') {
                          // Generate an internal AI room link
                          const aiRoomId = `ai_room_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
                          updateFormdata({
                            meetLink: `${window.location.origin}/interview/room/${aiRoomId}`,
                          });
                        } else {
                          // Existing Google Meet or custom generation logic
                          generateMeetLink();
                        }
                      }}
                      className={`w-full sm:w-auto px-4 py-2.5 text-xs font-semibold rounded-lg ${t.secondaryButton} hover:${t.secondaryButtonHover} transition-colors whitespace-nowrap touch-manipulation`}
                    >
                      Generate
                    </button>
                  </div>
                ) : (
                  <p
                    className={`text-[11px] ${t.subheading} bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5`}
                  >
                    Candidate will be notified once the link is added. You can
                    update it anytime from the application dashboard.
                  </p>
                )}

                {error?.meetLink && (
                  <p className="text-red-500 text-[11px] mt-0.5">
                    {error.meetLink}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Offline Location Details ── */}
          {formData.mode === 'offline' && (
            <div
              className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-2`}
            >
              <label className={`text-xs font-semibold ${t.heading}`}>
                Interview Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => updateFormdata({ location: e.target.value })}
                placeholder="Office floor, cabin, or street address"
                className={`w-full text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
              />
              {error?.location && (
                <p className="text-red-500 text-[11px]">{error.location}</p>
              )}
            </div>
          )}

          {/* ── Additional Notes ── */}
          <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold ${t.heading}`}>
              Instructions / Notes
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => updateFormdata({ notes: e.target.value })}
              placeholder="Candidate preparation advice, parking details, or guidelines..."
              className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} p-3 outline-none ${t.inputFocusRing} resize-none`}
            />
            {error?.notes && (
              <p className="text-red-500 text-[11px]">{error.notes}</p>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div
          className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t ${t.surfaceBorder} flex-shrink-0 ${t.surface} safe-bottom`}
        >
          <p
            className={`text-[11px] ${t.subheading} text-center sm:text-left hidden sm:block`}
          >
            {formData.interviewerType === 'ai_agent'
              ? 'Candidate will receive instant AI room details via email.'
              : 'Calendar invitation with instructions will be dispatched.'}
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className={`flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold rounded-xl border ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover} transition-all disabled:opacity-50 touch-manipulation`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSchedule}
              disabled={loading}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-xl ${t.primaryButton} ${t.primaryButtonHover} transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Scheduling...</span>
                </>
              ) : (
                'Send Invite'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  // return 2(
  //     <div
  //       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-200"
  //       style={{
  //         backgroundColor: mode === 'dark' ? 'rgba(2, 6, 23, 0.75)' : 'rgba(15, 23, 42, 0.55)',
  //         backdropFilter: 'blur(4px)',
  //       }}
  //       onClick={(e) => e.target === e.currentTarget && !isLoading && onClose()}
  //     >
  //       <div
  //         className={`relative w-full sm:max-w-xl ${t.surface} ${t.surfaceBorder} border rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] overflow-hidden transition-all duration-200 animate-in fade-in zoom-in-95`}
  //       >
  //         {/* ── Header ── */}
  //         <div className={`flex items-start justify-between px-5 py-4 border-b ${t.surfaceBorder} flex-shrink-0`}>
  //           <div>
  //             <h2 className={`text-base font-bold tracking-tight ${t.heading}`}>
  //               Schedule Interview
  //             </h2>
  //             <p className={`text-xs ${t.subheading} mt-0.5 font-medium`}>{jobTitle}</p>
  //           </div>
  //           <button
  //             onClick={onClose}
  //             disabled={isLoading}
  //             className={`p-1.5 rounded-lg text-slate-400 hover:${t.sortHover} transition-colors disabled:opacity-50`}
  //             aria-label="Close modal"
  //           >
  //             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  //               <path d="M18 6L6 18M6 6l12 12" />
  //             </svg>
  //           </button>
  //         </div>

  //         {/* ── Scrollable Body ── */}
  //         <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">
  //           {/* Candidate Card */}
  //           <div className={`flex items-center gap-3.5 ${t.cardBg} rounded-xl p-3 border ${t.cardBorder}`}>
  //             <div className={`w-10 h-10 rounded-full ${t.statIconBg} flex items-center justify-center ${t.statIconText} text-xs font-semibold flex-shrink-0 overflow-hidden`}>
  //               {candidate.profileImg ? (
  //                 <img src={candidate.profileImg} alt={candidate.name} className="w-full h-full object-cover" />
  //               ) : (
  //                 candidate.initials
  //               )}
  //             </div>
  //             <div className="flex-1 min-w-0">
  //               <p className={`text-sm font-semibold ${t.heading} truncate`}>{candidate.name}</p>
  //               <p className={`text-[11px] ${t.subheading} truncate`}>
  //                 {candidate.email} · Applied on: {candidate.applied}
  //               </p>
  //             </div>
  //             <span className={`flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full ${t.appliedBg} ${t.appliedText} border ${t.appliedBorder}`}>
  //               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
  //               {candidate.status}
  //             </span>
  //           </div>

  //           {/* ── Section: Interview Round & Type ── */}
  //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  //             <div>
  //               <label className={`block text-xs font-semibold ${t.heading} mb-1.5`}>Round Sequence</label>
  //               <select
  //                 value={`${formData.roundNumber}|${formData.roundName}`}
  //                 onChange={(e) => {
  //                   const [order, name] = e.target.value.split('|');
  //                   // const matched = ROUND_PRESETS.find((p) => p.order === Number(order));
  //                   // updateFormdata({
  //                   //   roundNumber: Number(order),
  //                   //   roundName: name,
  //                   //   interviewerType: matched?.type || formData.interviewerType,
  //                   //   mode: matched?.type === 'ai_agent' ? 'online' : formData.mode,
  //                   // });
  //                 }}
  //                 className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
  //               >
  //                 {ROUNDS.map((preset) => (
  //                   <option key={preset.label} value={`${preset.value}`}>
  //                    Round {preset.label}: {preset.value}
  //                   </option>
  //                 ))}
  //               </select>
  //             </div>

  //             <div>
  //               <label className={`block text-xs font-semibold ${t.heading} mb-1.5`}>Interviewer Conducted By</label>
  //               <div className="grid grid-cols-2 gap-1.5">
  //                 {[
  //                   { val: 'ai_agent', label: 'AI Agent' },
  //                   { val: 'human', label: 'Human / Team' },
  //                 ].map(({ val, label }) => (
  //                   <button
  //                     key={val}
  //                     type="button"
  //                     onClick={() =>
  //                       updateFormdata({
  //                         interviewerType: val as InterviewerType,
  //                         mode: val === 'ai_agent' ? 'online' : formData.mode,
  //                       })
  //                     }
  //                     className={`py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
  //                       formData.interviewerType === val
  //                         ? `${t.chipBg} ${t.chipText} border-purple-400 shadow-sm`
  //                         : `${t.surface} ${t.surfaceBorder} ${t.resultsMuted} hover:${t.dropdownHover}`
  //                     }`}
  //                   >
  //                     {label}
  //                   </button>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>

  //           {/* ── Section: Interview Mode (Online vs Offline) ── */}
  //           <div>
  //             <label className={`block text-xs font-semibold ${t.heading} mb-1.5`}>Interview Mode</label>
  //             <div className="grid grid-cols-2 gap-2">
  //               {[
  //                 {
  //                   val: 'online',
  //                   label: 'Online (Video Call)',
  //                   icon: (
  //                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  //                     </svg>
  //                   ),
  //                 },
  //                 {
  //                   val: 'offline',
  //                   label: 'In-Person',
  //                   disabled: formData.interviewerType === 'ai_agent',
  //                   icon: (
  //                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  //                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  //                     </svg>
  //                   ),
  //                 },
  //               ].map(({ val, icon, label, disabled }) => (
  //                 <button
  //                   key={val}
  //                   type="button"
  //                   disabled={disabled}
  //                   onClick={() => updateFormdata({ mode: val as InterviewMode })}
  //                   className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
  //                     disabled ? 'opacity-40 cursor-not-allowed border-dashed' : ''
  //                   } ${
  //                     formData.mode === val
  //                       ? `${t.chipBg} ${t.chipText} border-purple-400 font-semibold shadow-sm`
  //                       : `${t.surface} ${t.surfaceBorder} ${t.resultsMuted} hover:${t.dropdownHover}`
  //                   }`}
  //                 >
  //                   {icon}
  //                   {label}
  //                 </button>
  //               ))}
  //             </div>
  //             {formData.interviewerType === 'ai_agent' && (
  //               <p className={`text-[11px] ${t.subheading} mt-1.5 italic`}>
  //                 * AI Agent interviews can only be conducted online in real time.
  //               </p>
  //             )}
  //           </div>

  //           {/* ── Section: Date, Time & Duration ── */}
  //           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
  //             <div>
  //               <label className={`block text-xs font-semibold ${t.heading} mb-1.5`}>Date</label>
  //               <input
  //                 type="date"
  //                 value={formData.date}
  //                 onChange={(e) => updateFormdata({ date: e.target.value })}
  //                 className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
  //               />
  //               {error?.date && <p className="text-red-500 text-[11px] mt-1">{error.date}</p>}
  //             </div>

  //             <div>
  //               <label className={`block text-xs font-semibold ${t.heading} mb-1.5`}>Time</label>
  //               <input
  //                 type="time"
  //                 value={formData.time}
  //                 onChange={(e) => updateFormdata({ time: e.target.value })}
  //                 className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
  //               />
  //               {error?.time && <p className="text-red-500 text-[11px] mt-1">{error.time}</p>}
  //             </div>

  //             <div>
  //               <label className={`block text-xs font-semibold ${t.heading} mb-1.5`}>Duration</label>
  //               <select
  //                 value={formData.duration}
  //                 onChange={(e) => updateFormdata({ duration: e.target.value })}
  //                 className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2.5 outline-none ${t.inputFocusRing}`}
  //               >
  //                 <option value="">Select duration</option>
  //                 {Durations.map((d) => (
  //                   <option key={d} value={d}>
  //                     {d} minutes
  //                   </option>
  //                 ))}
  //               </select>
  //               {error?.duration && <p className="text-red-500 text-[11px] mt-1">{error.duration}</p>}
  //             </div>
  //           </div>

  //           {/* ── Section: Online Details ── */}
  //           {formData.mode === 'online' && (
  //             <div className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-3`}>
  //               {formData.interviewerType === 'ai_agent' ? (
  //                 <div className="flex flex-col gap-2">
  //                   <div className="flex items-center gap-2">
  //                     <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-ping" />
  //                     <span className={`text-xs font-semibold ${t.heading}`}>AI Room Integration</span>
  //                   </div>
  //                   <p className={`text-[12px] ${t.subheading} leading-relaxed`}>
  //                     A real-time AI interview session room will be provisioned automatically. A unique secure joining link will be included in the candidate's invitation.
  //                   </p>
  //                   <div>
  //                     <label className={`block text-[11px] font-semibold ${t.subheading} mb-1`}>
  //                       Focus Topics / Skills for AI Evaluator (Optional)
  //                     </label>
  //                     <input
  //                       type="text"
  //                       placeholder="e.g., React hooks, async patterns, TypeScript generics"
  //                       value={formData.topics || ''}
  //                       onChange={(e) => updateFormdata({ topics: e.target.value })}
  //                       className={`w-full text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} p-2 outline-none ${t.inputFocusRing}`}
  //                     />
  //                   </div>
  //                 </div>
  //               ) : (
  //                 <>
  //                   <label className={`text-xs font-semibold ${t.heading}`}>Meeting Link</label>
  //                   <div className="flex gap-4">
  //                     {[
  //                       { val: false, label: 'Add link now' },
  //                       { val: true, label: 'Add link later' },
  //                     ].map(({ val, label }) => (
  //                       <label key={label} className="flex items-center gap-2 cursor-pointer text-xs">
  //                         <input
  //                           type="radio"
  //                           name="addLinkOption"
  //                           checked={formData.isAddlinkLater === val}
  //                           onChange={() => updateFormdata({ isAddlinkLater: val })}
  //                           className="text-fuchsia-600 focus:ring-fuchsia-500"
  //                         />
  //                         <span className={t.inputText}>{label}</span>
  //                       </label>
  //                     ))}
  //                   </div>

  //                   {!formData.isAddlinkLater ? (
  //                     <div className="flex gap-2">
  //                       <input
  //                         type="url"
  //                         value={formData.meetLink}
  //                         onChange={(e) => updateFormdata({ meetLink: e.target.value })}
  //                         placeholder="https://meet.google.com/... or your custom room"
  //                         className={`flex-1 text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
  //                       />
  //                       <button
  //                         type="button"
  //                         onClick={generateMeetLink}
  //                         className={`px-3 py-2 text-xs font-semibold rounded-lg ${t.secondaryButton} hover:${t.secondaryButtonHover} transition-colors whitespace-nowrap`}
  //                       >
  //                         Generate
  //                       </button>
  //                     </div>
  //                   ) : (
  //                     <p className={`text-[11px] ${t.subheading} bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5`}>
  //                       Candidate will be notified once the link is added. You can update it anytime from the application dashboard.
  //                     </p>
  //                   )}
  //                   {error?.meetLink && <p className="text-red-500 text-[11px]">{error.meetLink}</p>}
  //                 </>
  //               )}
  //             </div>
  //           )}

  //           {/* ── Section: Offline Details ── */}
  //           {formData.mode === 'offline' && (
  //             <div className={`${t.cardBg} rounded-xl p-3.5 border ${t.cardBorder} flex flex-col gap-2`}>
  //               <label className={`text-xs font-semibold ${t.heading}`}>Interview Location</label>
  //               <input
  //                 type="text"
  //                 value={formData.location}
  //                 onChange={(e) => updateFormdata({ location: e.target.value })}
  //                 placeholder="Office floor, cabin, or street address"
  //                 className={`w-full text-xs rounded-lg border ${t.surfaceBorder} ${t.surface} ${t.inputText} px-3 py-2 outline-none ${t.inputFocusRing}`}
  //               />
  //               {error?.location && <p className="text-red-500 text-[11px]">{error.location}</p>}
  //             </div>
  //           )}

  //           {/* ── Section: Additional Notes ── */}
  //           <div className="flex flex-col gap-1.5">
  //             <label className={`text-xs font-semibold ${t.heading}`}>Instructions / Notes</label>
  //             <textarea
  //               rows={3}
  //               value={formData.notes}
  //               onChange={(e) => updateFormdata({ notes: e.target.value })}
  //               placeholder="Candidate preparation advice, parking details, or guidelines..."
  //               className={`w-full text-xs rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.inputText} p-3 outline-none ${t.inputFocusRing} resize-none`}
  //             />
  //             {error?.notes && <p className="text-red-500 text-[11px]">{error.notes}</p>}
  //           </div>
  //         </div>

  //         {/* ── Footer ── */}
  //         <div className={`flex items-center justify-between gap-3 px-5 py-3.5 border-t ${t.surfaceBorder} flex-shrink-0 ${t.surface}`}>
  //           <p className={`text-[11px] ${t.subheading} hidden sm:block`}>
  //             {formData.interviewerType === 'ai_agent'
  //               ? 'Candidate will receive instant AI room details via email.'
  //               : 'Calendar invitation with instructions will be dispatched.'}
  //           </p>

  //           <div className="flex gap-2 w-full sm:w-auto">
  //             <button
  //               type="button"
  //               onClick={onClose}
  //               disabled={isLoading}
  //               className={`flex-1 sm:flex-none px-4 py-2 text-xs font-medium rounded-xl border ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover} transition-all disabled:opacity-50`}
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               type="button"
  //               onClick={handleSchedule}
  //               disabled={isLoading}
  //               className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold rounded-xl ${t.primaryButton} ${t.primaryButtonHover} transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
  //             >
  //               {isLoading ? (
  //                 <>
  //                   <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
  //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
  //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  //                   </svg>
  //                   <span>Scheduling...</span>
  //                 </>
  //               ) : (
  //                 'Send Invite'
  //               )}
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>)

  //1 return (
  //   <div
  //     className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
  //     style={{
  //       backgroundColor: 'rgba(15,23,42,0.55)',
  //       backdropFilter: 'blur(2px)',
  //     }}
  //     onClick={(e) => e.target === e.currentTarget && onClose()}
  //   >
  //     <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[95dvh] sm:max-h-[90dvh] overflow-hidden">
  //       {/* ── Header ── */}
  //       <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
  //         <div>
  //           <h2 className="text-[15px] font-semibold text-slate-800 leading-tight">
  //             Schedule Interview
  //           </h2>
  //           <p className="text-[12px] text-slate-400 mt-0.5">{jobTitle}</p>
  //         </div>
  //         <button
  //           onClick={onClose}
  //           className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
  //         >
  //           <CloseIcon />
  //         </button>
  //       </div>

  //       {/* ── Scrollable Body ── */}
  //       <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">
  //         {/* Candidate Chip */}
  //         <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
  //           <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold flex-shrink-0 overflow-hidden">
  //             {candidate.profileImg ? (
  //               <img
  //                 src={`${candidate.profileImg}`}
  //                 alt={candidate.initials}
  //                 className="w-full h-full object-cover"
  //               />
  //             ) : (
  //               candidate.initials
  //             )}
  //           </div>
  //           <div className="flex-1 min-w-0">
  //             <p className="text-[13px] font-medium text-slate-800 truncate">
  //               {candidate.name}
  //             </p>
  //             <p className="text-[11px] text-slate-400 truncate">
  //               {candidate.email} · Applied on: {candidate.applied}
  //             </p>
  //           </div>
  //           <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
  //             <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
  //             {candidate.status}
  //           </span>
  //         </div>

  //         <div>
  //           <Label>Interview mode</Label>
  //           <div className="grid grid-cols-2 gap-2">
  //             {[
  //               { val: 'online', icon: <GlobeIcon />, label: 'Online' },
  //               { val: 'offline', icon: <PinIcon />, label: 'In-Person' },
  //             ].map(({ val, icon, label }) => (
  //               <button
  //                 key={val}
  //                 onClick={() => updateFormdata({ mode: val as InterviewMode })}
  //                 className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150
  //                   ${
  //                     formData.mode === val
  //                       ? 'bg-fuchsia-50 border-fuchsia-300 text-fuchsia-700 shadow-sm'
  //                       : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
  //                   }`}
  //               >
  //                 {icon}
  //                 {label}
  //               </button>
  //             ))}
  //           </div>
  //         </div>

  //         {/* Date & Time */}
  //         <div className="grid grid-cols-2 gap-3">
  //           <div>
  //             <Label>
  //               <span className="flex items-center gap-1.5">
  //                 <CalendarIcon /> Date
  //               </span>
  //             </Label>
  //             <Input
  //               type="date"
  //               value={formData.date}
  //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //                 updateFormdata({ date: e.currentTarget.value })
  //               }
  //             />
  //             {error && error.date && (
  //               <p className="text-red-600 text-sm">* {error.date}</p>
  //             )}
  //           </div>
  //           <div>
  //             <Label>
  //               <span className="flex items-center gap-1.5">
  //                 <ClockIcon /> Time
  //               </span>
  //             </Label>
  //             <Input
  //               type="time"
  //               value={formData.time}
  //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //                 updateFormdata({ time: e.currentTarget.value })
  //               }
  //             />
  //             {error && error.time && (
  //               <p className="text-red-600 text-sl">* {error.time}</p>
  //             )}
  //           </div>
  //         </div>

  //         {/* Duration */}
  //         <div>
  //           <Label>Duration</Label>
  //           <div className="relative">
  //             <Select
  //               value={formData.duration}
  //               onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
  //                 updateFormdata({ duration: e.currentTarget.value })
  //               }
  //             >
  //               <option value="">Select</option>
  //               {Durations.map((d, i) => {
  //                 return (
  //                   <option key={i} value={d}>
  //                     {d} minutes
  //                   </option>
  //                 );
  //               })}
  //             </Select>

  //             <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
  //               <svg
  //                 width="12"
  //                 height="12"
  //                 viewBox="0 0 12 12"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth="1.5"
  //               >
  //                 <path d="M3 4.5l3 3 3-3" />
  //               </svg>
  //             </div>
  //             {error && error.duration && (
  //               <p className="text-red-600 text-sm">* {error.duration}</p>
  //             )}
  //           </div>
  //         </div>

  //         {/* Online Section */}
  //         {formData.mode === 'online' && (
  //           <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
  //             <Label>
  //               <span className="flex items-center gap-1.5">
  //                 <LinkIcon /> Meeting Link
  //               </span>
  //             </Label>

  //             {/* Radio Options */}

  //             <div className="flex flex-col gap-2">
  //               {[
  //                 { val: false, label: 'Add link now' },
  //                 { val: true, label: 'Add link later' },
  //               ].map(({ val, label }) => (
  //                 <label
  //                   key={label}
  //                   className="flex items-center gap-2.5 cursor-pointer group"
  //                 >
  //                   <div
  //                     className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
  //     ${
  //       formData.isAddlinkLater === val
  //         ? 'border-fuchsia-800 bg-fuchsia-600'
  //         : 'border-slate-300 group-hover:border-slate-400'
  //     }`}
  //                     onClick={() => updateFormdata({ isAddlinkLater: val })}
  //                   ></div>

  //                   <span
  //                     className="text-sm text-slate-700 select-none"
  //                     onClick={() => updateFormdata({ isAddlinkLater: val })}
  //                   >
  //                     {label}
  //                   </span>
  //                 </label>
  //               ))}
  //             </div>

  //             {!formData.isAddlinkLater ? (
  //               <>
  //                 <div className="flex gap-2">
  //                   <Input
  //                     type="url"
  //                     value={formData.meetLink}
  //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //                       updateFormdata({ meetLink: e.currentTarget.value })
  //                     }
  //                     placeholder="https://meet.google.com/..."
  //                     className="flex-1"
  //                   />

  //                   <button
  //                     onClick={generateMeetLink}
  //                     className="flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg border border-fuchsia-800 bg-white text-fuchsia-600 hover:bg-fuchsia-50  transition-colors whitespace-nowrap"
  //                   >
  //                     Generate
  //                   </button>
  //                 </div>
  //                 {error && error.meetLink && (
  //                   <p className="text-red-600 text-sm">* {error.meetLink}</p>
  //                 )}
  //               </>
  //             ) : (
  //               <p className="text-[12px] text-slate-500 leading-relaxed bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
  //                 The candidate will be notified once the link is added. You can
  //                 update it anytime from the application dashboard.
  //               </p>
  //             )}
  //           </div>
  //         )}

  //         {/* Offline Section */}
  //         {formData.mode === 'offline' && (
  //           <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
  //             <Label>
  //               <span className="flex items-center gap-1.5">
  //                 <PinIcon /> Interview Location
  //               </span>
  //             </Label>
  //             <Input
  //               type="text"
  //               value={formData.location}
  //               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //                 updateFormdata({ location: e.currentTarget.value })
  //               }
  //               placeholder="Office floor, building, or full address"
  //             />
  //             {error && error.location && (
  //               <p className="text-red-600 text-sm">* {error.location}</p>
  //             )}
  //           </div>
  //         )}
  //         <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
  //           <textarea
  //             rows={4}
  //             value={formData.notes}
  //             onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //               updateFormdata({ notes: e.currentTarget.value })
  //             }
  //             placeholder="Additional instructions (parking, entrance, etc.)"
  //             className="w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
  //           />
  //           {error && error.notes && (
  //             <p className="text-red-600 text-sm">* {error.notes}</p>
  //           )}
  //         </div>
  //       </div>

  //       {/* ── Footer ── */}
  //       <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-100 flex-shrink-0 bg-white">
  //         <p className="text-[11px] text-slate-400 hidden sm:block">
  //           An email invite will be sent to the candidate.
  //         </p>
  //         <div className="flex gap-2 w-full sm:w-auto">
  //           <button
  //             onClick={onClose}
  //             className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
  //           >
  //             Cancel
  //           </button>
  //           <button
  //             onClick={handleSchedule}
  //             className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold rounded-xl bg-fuchsia-800 text-white hover:bg-fuchsia-600 active:scale-[0.98] transition-all shadow-sm shadow-fuchsia-200"
  //           >
  //             Send Invite
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
