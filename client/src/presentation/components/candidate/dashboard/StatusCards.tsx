import { type CandidateStatusCard } from './CandidateDashboardContainer';

export function SkeletonBlock({ className }: { className: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-slate-200/70 ${className}`} />
  );
}

type Props = {
  statusData: CandidateStatusCard[];
  isLoading: boolean;
};
function StatusCards({ statusData, isLoading }: Props) {
  console.log('isloading from statuscards', isLoading);

  return (
    // <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 mb-6">
    //   {statusData.map((c, i) => {
    //     const tone = c.tone;
    //     return (
    //       <div
    //         key={c.key}
    //         className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
    //         style={{ animationDelay: `${60 + i * 40}ms` }}
    //       >
    //         {isLoading ? (
    //           Array.from({ length: 6 }).map((_, i) => (
    //             <div
    //               key={i}
    //               className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
    //             >
    //               <SkeletonBlock className="w-8 h-8 rounded-lg mb-3" />
    //               <SkeletonBlock className="w-12 h-6 mb-2" />
    //               <SkeletonBlock className="w-20 h-3" />
    //             </div>
    //           ))
    //         ) : (
    //           <>
    //             <div
    //               className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${tone.bg}`}
    //             >
    //               <c.icon size={16} className={tone.text} strokeWidth={1.9} />
    //             </div>
    //             <div className="font-display text-2xl font-semibold text-slate-900 leading-none">
    //               {c.value}
    //             </div>
    //             <div className="text-[11.5px] text-slate-500 mt-1.5">
    //               {c.label}
    //             </div>
    //             <div
    //               className={`text-[10.5px] mt-1 font-medium ${
    //                 c.trendUp === true
    //                   ? 'text-emerald-600'
    //                   : c.trendUp === false
    //                     ? 'text-rose-500'
    //                     : 'text-slate-400'
    //               }`}
    //             >
    //               {c.trend}
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     );
    //   })}
    // </div>
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 mb-6">
  {isLoading
    ? Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
        >
          <SkeletonBlock className="w-8 h-8 rounded-lg mb-3" />
          <SkeletonBlock className="w-12 h-6 mb-2" />
          <SkeletonBlock className="w-20 h-3" />
        </div>
      ))
    : statusData.map((c, i) => {
        const tone = c.tone;
        return (
          <div
            key={c.key}
            className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
            style={{ animationDelay: `${60 + i * 40}ms` }}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${tone.bg}`}
            >
              <c.icon size={16} className={tone.text} strokeWidth={1.9} />
            </div>

            <div className="font-display text-2xl font-semibold text-slate-900">
              {c.value}
            </div>

            <div className="text-[11.5px] text-slate-500 mt-1.5">
              {c.label}
            </div>

            <div className="text-[10.5px] mt-1 font-medium">
              {c.trend}
            </div>
          </div>
        );
      })}
</div>
  );
}

export default StatusCards;
