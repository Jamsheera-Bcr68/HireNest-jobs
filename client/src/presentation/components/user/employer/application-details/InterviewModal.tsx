import React, { useState, type ReactNode } from 'react';
import { useInterviews } from '../../../../hooks/user/useInterview';
import type { ApplicationStatusType } from '../../../../../types/dtos/application.dto';
import {
  Durations,
  type InterviewMode,
} from '../../../../../types/dtos/interview.dto';

// ─── Icons ────────────────────────────────────────────────────────────────────
const GlobeIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="8" cy="8" r="6.5" />
    <path d="M5.5 8a8.5 8.5 0 0 0 2.5 5.5A8.5 8.5 0 0 0 10.5 8a8.5 8.5 0 0 0-2.5-5.5A8.5 8.5 0 0 0 5.5 8z" />
    <path d="M2 8h12" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5s4.5-5 4.5-8.5c0-2.5-2-4.5-4.5-4.5z" />
    <circle cx="8" cy="6" r="1.5" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <rect x="2" y="3" width="12" height="11" rx="2" />
    <path d="M5 1.5v3M11 1.5v3M2 7h12" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3.5l2.5 1.5" />
  </svg>
);

const LinkIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4" />
    <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12" />
  </svg>
);

const Label = ({
  children,
  optional = false,
}: {
  children: ReactNode;
  optional?: boolean;
}) => (
  <label className="block text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1.5">
    {children}
    {optional && (
      <span className="ml-1.5 text-[10px] normal-case tracking-normal font-normal text-slate-400/70">
        optional
      </span>
    )}
  </label>
);

// ─── Input ────────────────────────────────────────────────────────────────────
const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800
      placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
      focus:border-indigo-400 transition-all duration-150 ${className}`}
    {...props}
  />
);

// ─── Select ───────────────────────────────────────────────────────────────────
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ children, className = '', ...props }: SelectProps) => (
  <select
    className={`w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800
      focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
      transition-all duration-150 appearance-none cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </select>
);

// ─── Textarea ─────────────────────────────────────────────────────────────────
// const Textarea = ({ className = '', ...props }) => (
//   <textarea
//     className={`w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800
//       placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20
//       focus:border-indigo-400 transition-all duration-150 resize-none ${className}`}
//     {...props}
//   />
// );

type Props = {
  isOpen: boolean;
  onClose: () => void;
  candidate: {
    name: string;
    email: string;
    applied: string;
    status: ApplicationStatusType;
    initials: string;
  };
  jobTitle: string;
  appId: string;
};
export default function InterviewModal({
  isOpen,
  onClose,
  candidate,
  jobTitle,
  appId,
}: Props) {
  const { formData, updateFormdata, scheduleInterview, error } =
    useInterviews(appId);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{
        backgroundColor: 'rgba(15,23,42,0.55)',
        backdropFilter: 'blur(2px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[95dvh] sm:max-h-[90dvh] overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-slate-800 leading-tight">
              Schedule Interview
            </h2>
            <p className="text-[12px] text-slate-400 mt-0.5">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="overflow-y-auto flex-1 px-5 py-4 flex flex-col gap-4">
          {/* Candidate Chip */}
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold flex-shrink-0">
              {candidate.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-800 truncate">
                {candidate.name}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {candidate.email} · Applied on: {candidate.applied}
              </p>
            </div>
            <span className="flex-shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              {candidate.status}
            </span>
          </div>

          <div>
            <Label>Interview Type</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { val: 'online', icon: <GlobeIcon />, label: 'Online' },
                { val: 'offline', icon: <PinIcon />, label: 'In-Person' },
              ].map(({ val, icon, label }) => (
                <button
                  key={val}
                  onClick={() => updateFormdata({ mode: val as InterviewMode })}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150
                    ${
                      formData.mode === val
                        ? 'bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>
                <span className="flex items-center gap-1.5">
                  <CalendarIcon /> Date
                </span>
              </Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormdata({ date: e.currentTarget.value })
                }
              />
              {error && error.date && (
                <p className="text-red-600 text-sm">* {error.date}</p>
              )}
            </div>
            <div>
              <Label>
                <span className="flex items-center gap-1.5">
                  <ClockIcon /> Time
                </span>
              </Label>
              <Input
                type="time"
                value={formData.time}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormdata({ time: e.currentTarget.value })
                }
              />
              {error && error.time && (
                <p className="text-red-600 text-sl">* {error.time}</p>
              )}
            </div>
          </div>

          {/* Duration */}
          <div>
            <Label>Duration</Label>
            <div className="relative">
              <Select
                value={formData.duration}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  updateFormdata({ duration: e.currentTarget.value })
                }
              >
                <option value="">Select</option>
                {Durations.map((d, i) => {
                  return (
                    <option key={i} value={d}>
                      {d} minutes
                    </option>
                  );
                })}
              </Select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M3 4.5l3 3 3-3" />
                </svg>
              </div>
              {error && error.duration && (
                <p className="text-red-600 text-sm">* {error.duration}</p>
              )}
            </div>
          </div>

          {/* Online Section */}
          {formData.mode === 'online' && (
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
              <Label>
                <span className="flex items-center gap-1.5">
                  <LinkIcon /> Meeting Link
                </span>
              </Label>

              {/* Radio Options */}

              <div className="flex flex-col gap-2">
                {[
                  { val: false, label: 'Add link now' },
                  { val: true, label: 'Add link later' },
                ].map(({ val, label }) => (
                  <label
                    key={label}
                    className="flex items-center gap-2.5 cursor-pointer group"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
      ${
        formData.isAddlinkLater === val
          ? 'border-indigo-500 bg-indigo-500'
          : 'border-slate-300 group-hover:border-slate-400'
      }`}
                      onClick={() => updateFormdata({ isAddlinkLater: val })}
                    ></div>

                    <span
                      className="text-sm text-slate-700 select-none"
                      onClick={() => updateFormdata({ isAddlinkLater: val })}
                    >
                      {label}
                    </span>
                  </label>
                ))}
              </div>

              {!formData.isAddlinkLater ? (
                <>
                  <div className="flex gap-2">
                    <Input
                      type="url"
                      value={formData.meetlink}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFormdata({ meetlink: e.currentTarget.value })
                      }
                      placeholder="https://meet.google.com/..."
                      className="flex-1"
                    />

                    <button className="flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap">
                      Generate
                    </button>
                  </div>
                  {error && error.meetlink && (
                    <p className="text-red-600 text-sm">* {error.meetlink}</p>
                  )}
                </>
              ) : (
                <p className="text-[12px] text-slate-500 leading-relaxed bg-amber-50 border border-amber-100 rounded-lg px-3 py-2.5">
                  The candidate will be notified once the link is added. You can
                  update it anytime from the application dashboard.
                </p>
              )}
            </div>
          )}

          {/* Offline Section */}
          {formData.mode === 'offline' && (
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
              <Label>
                <span className="flex items-center gap-1.5">
                  <PinIcon /> Interview Location
                </span>
              </Label>
              <Input
                type="text"
                value={formData.location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFormdata({ location: e.currentTarget.value })
                }
                placeholder="Office floor, building, or full address"
              />
              {error && error.location && (
                <p className="text-red-600 text-sm">* {error.location}</p>
              )}
            </div>
          )}
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 flex flex-col gap-3">
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateFormdata({ notes: e.currentTarget.value })
              }
              placeholder="Additional instructions (parking, entrance, etc.)"
              className="w-full rounded border p-2"
            />
            {error && error.notes && (
              <p className="text-red-600 text-sm">* {error.notes}</p>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-100 flex-shrink-0 bg-white">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            An email invite will be sent to the candidate.
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={scheduleInterview}
              className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-sm shadow-indigo-200"
            >
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
