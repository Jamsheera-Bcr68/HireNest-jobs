import { Building2, X } from 'lucide-react';
import Feedback from './Feedback';
import type { interviewDetailDto } from '../../../../types/dtos/interview.dto';
import { useLockBodyScroll } from '../../../hooks/useBodyLock';
import { useEffect, useState } from 'react';
import InterviewDetails from './InterviewDetails';
import { useTheme } from '../../../../contexts/ThemeContext';

type InterviewDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  interview: interviewDetailDto | null;
  onRescheduleClick: (id: string) => void;
  handleConirmClick: (id: string) => void;
};

export default function InterviewDetailsModal({
  isOpen,
  onClose,
  interview,
  onRescheduleClick,
  handleConirmClick,
}: InterviewDetailsModalProps) {
  useLockBodyScroll(isOpen);
  const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
  if (isOpen) {
    setActiveTab('details');
  }
}, [isOpen]);

  if (!isOpen || !interview) return null;
  const tabs = [
    { label: 'Interview Details', value: 'details' },

    ...(interview.status === 'completed'
      ? [{ label: 'Feedback', value: 'feedback' }]
      : []),
  ];
  const {mode,t}=useTheme()


  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity duration-200"
      style={{
        backgroundColor:
          mode === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className={`relative w-full sm:max-w-lg ${t.surface} ${t.surfaceBorder} border-t sm:border rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden transition-all duration-200`}
      >
        {/* ── Mobile Drag Pull Bar ── */}
        <div className="sm:hidden flex justify-center pt-2.5 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* ── Header ── */}
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b ${t.surfaceBorder} flex-shrink-0 gap-3`}
        >
          {interview ? (
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {interview.companyLogo ? (
                <img
                  src={`${interview.companyLogo}`}
                  alt={interview.companyName}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-slate-100 dark:border-slate-800 flex-shrink-0 shadow-sm"
                />
              ) : (
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${t.sectionIconBg} flex items-center justify-center ${t.sectionIconText} font-bold text-sm flex-shrink-0 border border-fuchsia-200/50 dark:border-fuchsia-900/50`}
                >
                  {interview.companyName ? (
                    interview.companyName.charAt(0).toUpperCase()
                  ) : (
                    <Building2 size={20} />
                  )}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h2
                  className={`text-sm sm:text-base font-bold tracking-tight ${t.heading} truncate`}
                >
                  {interview.companyName || 'Company Name'}
                </h2>
                <p
                  className={`text-[11px] sm:text-xs ${t.subheading} truncate mt-0.5`}
                >
                  {interview.jobTitle || 'Job Application'}
                </p>
              </div>
            </div>
          ) : (
            <div className="min-w-0 flex-1">
              <h2 className={`text-base font-bold ${t.heading}`}>
                Interview Details
              </h2>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-xl text-slate-400 hover:${t.sortHover} transition-colors touch-manipulation flex-shrink-0`}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Navigation Tabs ── */}
        {interview && tabs && tabs.length > 0 && (
          <div
            className={`flex px-4 sm:px-6 gap-2 border-b ${t.surfaceBorder} flex-shrink-0 bg-slate-50/50 dark:bg-slate-900/30 overflow-x-auto no-scrollbar`}
          >
            {tabs.map((tab: any) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={`relative px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap touch-manipulation ${
                    isActive
                      ? 'text-fuchsia-600 dark:text-fuchsia-400'
                      : `${t.subheading} hover:${t.heading}`
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-full animate-in fade-in" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Body (Scrollable) ── */}
        <div className="overflow-y-auto overscroll-contain flex-1 px-4 sm:px-6 py-4 flex flex-col gap-4">
          {!interview ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div
                className={`w-14 h-14 rounded-2xl ${t.emptyIconBg} border ${t.emptyIconBorder} flex items-center justify-center ${t.emptyIconText} mb-3`}
              >
                <Building2 size={28} />
              </div>
              <p className={`text-sm font-semibold ${t.heading}`}>
                No interview details found
              </p>
              <p className={`text-xs ${t.subheading} mt-1 max-w-xs`}>
                The requested interview session might have expired or is no
                longer available on your account.
              </p>
            </div>
          ) : (
            <>
              {activeTab === 'details' && (
                <div className="animate-in fade-in duration-200">
                  <InterviewDetails interview={interview} />
                </div>
              )}

              {activeTab === 'feedback' && (
                <div className="animate-in fade-in duration-200">
                  <Feedback
                    result={interview.result}
                    feedback={interview.feedback}
                    score={interview.score}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className={`px-4 sm:px-6 py-3.5 border-t ${t.surfaceBorder} flex flex-col-reverse sm:flex-row sm:justify-end items-stretch sm:items-center gap-2 sm:gap-2.5 flex-shrink-0 ${t.surface} pb-[max(0.75rem,env(safe-area-inset-bottom))]`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl border ${t.surfaceBorder} ${t.inputText} hover:${t.sortHover} transition-all touch-manipulation text-center`}
          >
            Close
          </button>

          {interview &&
            !interview.isRescheduleRequested &&
            !interview.isConfirmed &&
            interview.status === 'scheduled' && (
              <button
                type="button"
                onClick={() => onRescheduleClick(interview.id)}
                className={`w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 ${t.inputText} hover:bg-slate-100 dark:hover:bg-slate-800 transition-all touch-manipulation text-center`}
              >
                Request Reschedule
              </button>
            )}

          {interview &&
            !interview.isConfirmed &&
            interview.status === 'scheduled' &&
            !interview.isRescheduleRequested && (
              <button
                type="button"
                onClick={() => handleConirmClick(interview.id)}
                className={`w-full sm:w-auto px-5 py-2 text-xs font-semibold rounded-xl ${t.primaryButton} ${t.primaryButtonHover} transition-all shadow-md shadow-fuchsia-500/20 active:scale-95 touch-manipulation text-center`}
              >
                Confirm Interview
              </button>
            )}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
  //     <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">
  //       {/* Header */}
  //       <div className="flex items-center justify-between px-6 py-4 border-b">
  //         <div className="flex items-center gap-3">
  //           {interview.companyLogo ? (
  //             <img
  //               src={`${interview.companyLogo}`}
  //               alt={interview.companyName}
  //               className="w-12 h-12 rounded-full object-cover"
  //             />
  //           ) : (
  //             <div className="w-12 h-12 rounded-full bg-gray-200" />
  //           )}

  //           <div>
  //             <h2 className="text-lg font-semibold text-gray-800">
  //               {interview.companyName}
  //             </h2>

  //             <p className="text-sm text-gray-500">{interview.jobTitle}</p>
  //           </div>
  //         </div>

  //         <button
  //           onClick={onClose}
  //           className="p-1 rounded hover:bg-gray-100 transition"
  //         >
  //           <X size={20} />
  //         </button>
  //       </div>

  //       {/* Body */}
  //       <div className="flex gap-2 border-b border-gray-200">
  //         {tabs.map((tab) => (
  //           <button
  //             key={tab.value}
  //             onClick={() => setActiveTab(tab.value)}
  //             className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
  //               activeTab === tab.value
  //                 ? 'border-fuchsia-600 text-fuchsia-600'
  //                 : 'border-transparent text-gray-500 hover:text-gray-700'
  //             }`}
  //           >
  //             {tab.label}
  //           </button>
  //         ))}
  //       </div>
  //       {activeTab == 'details' && <InterviewDetails interview={interview} />}
  //       {activeTab == 'feedback' && (
  //         <Feedback
  //           result={interview.result}
  //           feedback={interview.feedback}
  //           score={interview.score}
  //         />
  //       )}

  //       {/* Footer */}
  //       <div className="px-6 py-4 border-t flex justify-end gap-3">
  //         {!interview.isConfirmed &&
  //           interview.status === 'scheduled' &&
  //           !interview.isRescheduleRequested && (
  //             <button
  //               onClick={() => handleConirmClick(interview.id)}
  //               className="bg-fuchsia-800 hover:bg-fuchsia-600 text-white text-sm px-4 py-2 rounded-lg transition"
  //             >
  //               Confirm Interview
  //             </button>
  //           )}

  //         {!interview.isRescheduleRequested &&
  //           !interview.isConfirmed &&
  //           interview.status === 'scheduled' && (
  //             <button
  //               onClick={() => onRescheduleClick(interview.id)}
  //               className="border border-gray-300 hover:bg-gray-100 text-sm px-4 py-2 rounded-lg transition"
  //             >
  //               Request Reschedule
  //             </button>
  //           )}
  //         <button
  //           onClick={onClose}
  //           className="border border-red-300 hover:bg-red-100 text-sm px-4 py-2 rounded-lg transition"
  //         >
  //           Close
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
