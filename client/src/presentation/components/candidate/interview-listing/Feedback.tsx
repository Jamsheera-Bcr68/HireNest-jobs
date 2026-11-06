import { Award, MessageSquare } from "lucide-react";
import { useTheme } from "../../../../contexts/ThemeContext";

type Props = {
  feedback?: string;
  score?: number;
  result?: 'passed' | 'failed' | 'pending';
};

function Feedback({ feedback, result, score }: Props) {
const {mode,t}=useTheme()

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-3.5">
      <div
        className={`${t.cardBg} border ${t.cardBorder} rounded-2xl shadow-sm p-4 sm:p-5 flex flex-col gap-4`}
      >
        {/* ── Header ── */}
        <div
          className={`flex items-center justify-between border-b ${t.surfaceBorder} pb-3 gap-2`}
        >
          <div>
            <h2 className={`text-sm sm:text-base font-bold ${t.heading}`}>
              Interview Feedback
            </h2>
            <p className={`text-[11px] sm:text-xs ${t.subheading} mt-0.5`}>
              Performance assessment released after interview completion
            </p>
          </div>

          {result && (
            <span
              className={`text-[11px] font-bold px-3 py-1 rounded-full capitalize flex-shrink-0 border ${
                result === 'passed'
                  ? `${t.appliedBg} ${t.appliedText} border-emerald-300 dark:border-emerald-800`
                  : result === 'failed'
                  ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-900'
                  : 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-900'
              }`}
            >
              {result}
            </span>
          )}
        </div>

        {/* ── Performance Score Card ── */}
        <div>
  <p
    className={`text-[10px] font-bold uppercase tracking-wider ${t.subheading} mb-2`}
  >
    Performance Score
  </p>

  {score !== null && score !== undefined ? (
    <div className="flex flex-col gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 shadow-sm shadow-fuchsia-500/20">
            <Award size={20} />
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className={`text-2xl font-black ${t.heading}`}>
              {Number(score)}
            </span>
            <span className={`text-xs font-semibold ${t.subheading}`}>
              / 10
            </span>
          </div>
        </div>

        {/* Dynamic Performance Badge */}
        <span
          className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
            Number(score) >= 8
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : Number(score) >= 6
              ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800'
              : Number(score) >= 4
              ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
          }`}
        >
          {Number(score) >= 8
            ? 'Excellent'
            : Number(score) >= 6
            ? 'Good Fit'
            : Number(score) >= 4
            ? 'Average'
            : 'Low'}
        </span>
      </div>

      {/* Visual Fill Bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            Number(score) >= 8
              ? 'bg-emerald-500'
              : Number(score) >= 6
              ? 'bg-purple-600'
              : Number(score) >= 4
              ? 'bg-amber-500'
              : 'bg-rose-500'
          }`}
          style={{ width: `${Math.min(Math.max((Number(score) / 10) * 100, 0), 100)}%` }}
        />
      </div>
    </div>
  ) : (
    <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl p-3 flex items-center gap-2">
      <span>⚠️</span>
      <span>Score has not been added yet.</span>
    </div>
  )}
</div>

        {/* ── Interviewer Feedback / Notes ── */}
        <div>
          <p
            className={`text-[10px] font-bold uppercase tracking-wider ${t.subheading} mb-2`}
          >
            Interviewer Feedback & Observations
          </p>

          {feedback ? (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-2">
                <MessageSquare
                  size={14}
                  className="text-fuchsia-600 dark:text-fuchsia-400 mt-0.5 flex-shrink-0"
                />
                <p
                  className={`text-xs sm:text-[13px] ${t.inputText} leading-relaxed whitespace-pre-line`}
                >
                  {feedback}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl p-3 flex items-center gap-2">
              <span>⚠️</span>
              <span>Feedback has not been added yet.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="p-5">
  //     <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
  //       {/* Header */}
  //       <div className="flex items-center justify-between border-b border-gray-100 pb-3">
  //         <div>
  //           <h2 className="text-sm font-semibold text-gray-800">
  //             Interview Feedback
  //           </h2>

  //           <p className="text-xs text-gray-400 mt-1">
  //             Feedback shared after interview completion
  //           </p>
  //         </div>

  //         {result && (
  //           <span
  //             className={`text-xs px-3 py-1 rounded-full text-white ${
  //               result === 'passed'
  //                 ? 'bg-green-500'
  //                 : result === 'failed'
  //                   ? 'bg-red-500'
  //                   : 'bg-yellow-500'
  //             }`}
  //           >
  //             {result}
  //           </span>
  //         )}
  //       </div>

  //       {/* Score */}
  //       <div className="mt-4">
  //         {score ? (
  //           <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
  //             {score}
  //           </p>
  //         ) : (
  //           <div className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3">
  //             Score has not been added yet.
  //           </div>
  //         )}
  //       </div>
  //       {/* Feedback */}
  //       <div className="mt-4">
  //         {feedback ? (
  //           <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
  //             {feedback}
  //           </p>
  //         ) : (
  //           <div className="text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-lg p-3">
  //             Feedback has not been added yet.
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Feedback;
