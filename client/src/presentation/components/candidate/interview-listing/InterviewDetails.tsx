import React from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { type interviewDetailDto } from '../../../../types/dtos/interview.dto';

import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Check,
  Layers,
  Tag,
  FileText,
  ArrowUpRight,
} from 'lucide-react';
import { THEME_TOKENS } from '../../../../contexts/ThemeContext';

interface InterviewDetailsProps {
  interview: {
    status: string;
    isConfirmed?: boolean;
    isRescheduleRequested?: boolean;
    date: string;
    time: string;
    duration?: string | number;
    mode: 'online' | 'offline';
    meetLink?: string;
    location?: string;
    note?: string;
    notes?: string;
    roundName?: string;
    topics?: string;
  };
  theme?: 'light' | 'dark';
}

type Props = {
  interview: interviewDetailDto;
};
export function InterviewDetails({ interview }: Props) {
  console.log('candidate interview', interview);
  const { t, mode } = useTheme();

  const ROUND_LABELS: Record<string, string> = {
    screening: 'Screening Round',
    hr_behavioral: 'HR & Behavioral',
    technical: 'Technical Interview',
    managerial: 'Managerial Round',
    assignment: 'Practical Assignment',
  };

  // Format Round Display Name

  const formattedRound = React.useMemo(() => {
    if (!interview?.roundName) return null;
    return (
      ROUND_LABELS[interview.roundName.toLowerCase()] || interview.roundName
    );
  }, [interview?.roundName]);
  // Parse topics string into array

  const noteText = interview.note;

  return (
    <div className="px-4 sm:px-6 py-4 flex flex-col gap-3.5">
      {/* ── Status & Confirmation Banner ── */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${t.subheading}`}>
            Interview Status:
          </span>
          <span
            className={`capitalize text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
              interview.status === 'completed'
                ? `${t.appliedBg} ${t.appliedText} border ${t.appliedBorder}`
                : interview.status === 'cancelled' ||
                    interview.status === 'not-show'
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                  : `${t.chipBg} ${t.chipText} border ${t.chipBorder}`
            }`}
          >
            {interview.status === 'not-show' ? 'No Show' : interview.status}
          </span>
        </div>

        {interview.isConfirmed && (
          <div
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${t.appliedBg} ${t.appliedText} border ${t.appliedBorder}`}
          >
            <Check size={13} className="stroke-[2.5]" />
            <span>Confirmed</span>
          </div>
        )}
      </div>

      {/* ── Round Stage (If Present) ── */}
      {formattedRound && (
        <div
          className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder} flex items-center justify-between gap-3 shadow-sm`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`p-2 rounded-lg ${t.sectionIconBg} ${t.sectionIconText} flex-shrink-0`}
            >
              <Layers size={16} />
            </div>
            <div className="min-w-0">
              <p
                className={`text-[10px] font-bold uppercase tracking-wider ${t.subheading}`}
              >
                Interview Stage
              </p>
              <p
                className={`text-xs sm:text-sm font-bold ${t.heading} truncate`}
              >
                {formattedRound}
              </p>
            </div>
          </div>
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${t.chipBg} ${t.chipText}`}
          >
            Active Round
          </span>
        </div>
      )}

      {/* ── Focus Topics (If Present) ── */}
      {interview.topics && (
        <div
          className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder} flex flex-col gap-1.5 shadow-sm`}
        >
          <div className="flex items-center gap-1.5">
            <Tag size={13} className="text-fuchsia-600 dark:text-fuchsia-400" />
            <span
              className={`text-[11px] font-bold uppercase tracking-wider ${t.subheading}`}
            >
              Focus Areas & Skills
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {interview.topics.map((topic, i) => {
              return (
                <span
                  key={i}
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${t.chipBg} ${t.chipText} ${t.chipBorder}`}
                >
                  {topic}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Date & Time Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div
          className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder} flex items-center gap-3 shadow-sm`}
        >
          <div
            className={`p-2 rounded-lg ${t.sectionIconBg} ${t.sectionIconText} flex-shrink-0`}
          >
            <Calendar size={16} />
          </div>
          <div className="min-w-0">
            <p
              className={`text-[10px] font-bold uppercase tracking-wider ${t.subheading}`}
            >
              Date
            </p>
            <p
              className={`text-xs sm:text-sm font-semibold ${t.heading} truncate`}
            >
              {interview.date}
            </p>
          </div>
        </div>

        <div
          className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder} flex items-center gap-3 shadow-sm`}
        >
          <div
            className={`p-2 rounded-lg ${t.sectionIconBg} ${t.sectionIconText} flex-shrink-0`}
          >
            <Clock size={16} />
          </div>
          <div className="min-w-0">
            <p
              className={`text-[10px] font-bold uppercase tracking-wider ${t.subheading}`}
            >
              Time & Duration
            </p>
            <p
              className={`text-xs sm:text-sm font-semibold ${t.heading} truncate`}
            >
              {interview.time}
              {interview.duration ? ` • ${interview.duration} mins` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* ── Interview Mode & Access ── */}
      <div
        className={`${t.cardBg} rounded-2xl p-3.5 sm:p-4 border ${t.cardBorder} shadow-sm flex flex-col gap-3`}
      >
        <div className="flex items-center gap-2">
          {interview.mode === 'online' ? (
            <Video
              size={16}
              className="text-fuchsia-600 dark:text-fuchsia-400"
            />
          ) : (
            <MapPin size={16} className="text-rose-500" />
          )}
          <span
            className={`font-bold text-xs sm:text-sm capitalize ${t.heading}`}
          >
            {interview.mode} Interview
          </span>
        </div>

        {/* Online View Conditions */}
        {interview.mode === 'online' && (
          <div>
            {interview.status === 'completed' ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-900/60">
                <Check size={15} />
                <span>Interview Completed</span>
              </div>
            ) : interview.status === 'not-show' ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-900/60">
                <span>⚠️</span>
                <span>You missed this scheduled interview.</span>
              </div>
            ) : interview.status === 'cancelled' ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 text-xs font-semibold border border-rose-200 dark:border-rose-900/60">
                <span>⚠️</span>
                <span>Interview Cancelled</span>
              </div>
            ) : interview.meetLink ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-gradient-to-r from-fuchsia-50/80 via-purple-50/50 to-indigo-50/80 dark:from-fuchsia-950/40 dark:via-purple-950/30 dark:to-indigo-950/40 border border-fuchsia-200 dark:border-fuchsia-900">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>Live Video Session</span>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </p>
                  <p className={`text-[11px] ${t.subheading} truncate`}>
                    Room ready • Click below to join
                  </p>
                </div>

                <a
                  href={
                    interview.meetLink.startsWith('http')
                      ? interview.meetLink
                      : `/meeting/${interview.meetLink}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 shadow-md shadow-fuchsia-500/25 active:scale-95 transition-all text-center flex-shrink-0 touch-manipulation"
                >
                  <span>Join Meeting</span>
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            ) : (
              <p className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/60 font-medium">
                Meeting link has not been added yet. It will appear here before
                the scheduled time.
              </p>
            )}
          </div>
        )}

        {/* Offline View Conditions */}
        {interview.mode === 'offline' && (
          <div className="flex flex-col gap-1">
            <p className={`text-xs ${t.inputText} leading-relaxed`}>
              {interview.location || 'Location not added yet'}
            </p>
            {interview.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  interview.location
                )}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline w-fit"
              >
                Open location on Google Maps →
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Additional Instructions / Notes ── */}
      {noteText && (
        <div
          className={`${t.cardBg} rounded-xl p-3 border ${t.cardBorder} flex flex-col gap-1 shadow-sm`}
        >
          <div className="flex items-center gap-1.5 text-slate-400">
            <FileText size={13} />
            <p
              className={`text-[10px] font-bold uppercase tracking-wider ${t.subheading}`}
            >
              Additional Instructions
            </p>
          </div>
          <p className={`text-xs ${t.inputText} leading-relaxed pt-0.5`}>
            {noteText}
          </p>
        </div>
      )}

      {/* ── Reschedule Notice ── */}
      {interview.isRescheduleRequested && interview.status !== 'cancelled' && (
        <div className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 rounded-xl px-3.5 py-2.5">
          ⚠️ Your reschedule request has been sent and is awaiting company
          review.
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="px-6 py-5 space-y-5">
  //     {/* Status */}
  //     <div className="flex items-center justify-between">
  //       <span className="text-sm text-gray-500">Interview Status</span>

  //       <span className="capitalize text-xs font-medium bg-fuchsia-100 text-fuchsia-700 px-3 py-1 rounded-full">
  //         {interview.status}
  //       </span>
  //     </div>

  //     {/* Confirmation */}
  //     {interview.isConfirmed && (
  //       <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
  //         <Check size={14} />
  //         Confirmed
  //       </div>
  //     )}

  //     {/* Date */}
  //     <div className="flex items-center gap-3">
  //       <Calendar size={18} className="text-gray-500" />

  //       <div>
  //         <p className="text-sm font-medium text-gray-700">Interview Date</p>

  //         <p className="text-sm text-gray-500">{interview.date}</p>
  //       </div>
  //     </div>

  //     {/* Time */}
  //     <div className="flex items-center gap-3">
  //       <Clock size={18} className="text-gray-500" />

  //       <div>
  //         <p className="text-sm font-medium text-gray-700">Interview Time</p>

  //         <p className="text-sm text-gray-500">
  //           {interview.time}

  //           {interview.duration && ` • ${interview.duration} mins`}
  //         </p>
  //       </div>
  //     </div>

  //     {/* Mode */}
  //     <div className="border rounded-xl p-4 bg-gray-50">
  //       <div className="flex items-center gap-2 mb-2">
  //         {interview.mode === 'online' ? (
  //           <Video size={18} className="text-fuchsia-600" />
  //         ) : (
  //           <MapPin size={18} className="text-red-500" />
  //         )}

  //         <span className="font-medium text-sm text-gray-700 capitalize">
  //           {interview.mode} Interview
  //         </span>
  //       </div>

  //       {/* Online */}
  //       {interview.mode === 'online' && (
  //         <>
  //           {interview.status === 'completed' ? (
  //             <p className="text-sm text-green-600">Interview Completed</p>
  //           ) : interview.status === 'not-show' ? (
  //             <p className="text-sm text-amber-600">
  //               You Missed the interviews
  //             </p>
  //           ) : interview.status === 'cancelled' ? (
  //             <p className="text-sm text-red-600">Interview Cancelled</p>
  //           ) : interview.meetLink ? (
  //             <a
  //               href={`/meeting/${interview.meetLink}`}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="inline-block p-1.5 border border-fuchsia-700 text-sm rounded-xl text-fuchsia-600 hover:bg-fuchsia-50 text-center"
  //             >
  //               Join Meeting
  //             </a>
  //           ) : (
  //             <p className="text-sm text-amber-600">
  //               Meeting link not added yet
  //             </p>
  //           )}
  //         </>
  //       )}

  //       {/* Offline */}
  //       {interview.mode === 'offline' && (
  //         <p className="text-sm text-gray-600">
  //           {interview.location || 'Location not added'}
  //         </p>
  //       )}
  //     </div>

  //     {/* Instructions */}
  //     {interview.note && (
  //       <div>
  //         <p className="text-sm font-medium text-gray-700 mb-1">
  //           Additional Instructions
  //         </p>

  //         <p className="text-sm text-gray-500 leading-relaxed">
  //           {interview.note}
  //         </p>
  //       </div>
  //     )}

  //     {/* Reschedule */}
  //     {interview.isRescheduleRequested && interview.status !== 'cancelled' && (
  //       <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
  //         Reschedule request has been sent.
  //       </div>
  //     )}
  //   </div>
  // );
}

export default InterviewDetails;
