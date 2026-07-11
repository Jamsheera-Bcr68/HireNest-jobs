import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, subtitle, cta }:{icon:LucideIcon,title:string,subtitle:string,cta:string}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
        <Icon size={20} className="text-slate-400" strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <p className="text-xs text-slate-400 mt-1 max-w-[220px]">{subtitle}</p>
      {cta && (
        <button
        //  onClick={onCta}
          className="mt-4 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors px-4 py-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40"
        >
          {cta}
        </button>
      )}
    </div>


  );
}


export function JobCard() {
  return (
    <div className="group flex flex-col h-full rounded-xl border border-slate-200 p-4 transition-all duration-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-50 hover:-translate-y-0.5">
      <div className="flex justify-between gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold truncate group-hover:text-emerald-700 transition-colors">
            Backend Developer
          </h3>
          <p className="text-sm text-slate-500 truncate">ABC Technologies</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mt-3">
        <span className="px-2 py-1 bg-slate-100 rounded-md text-xs whitespace-nowrap transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-700">
          Node.js
        </span>
        <span className="px-2 py-1 bg-slate-100 rounded-md text-xs whitespace-nowrap transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-700">
          Express
        </span>
        <span className="px-2 py-1 bg-slate-100 rounded-md text-xs whitespace-nowrap transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-700">
          MongoDB
        </span>
      </div>

      <div className="flex justify-between items-center gap-2 mt-4 pt-3 border-t border-slate-100 flex-wrap">
        <div className="text-xs text-slate-500">
          Kochi • Full Time • 2 days ago
        </div>

        <button className="flex items-center gap-1 text-emerald-600 text-sm font-medium whitespace-nowrap transition-all group-hover:gap-2">
          View Job
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </button>
      </div>
    </div>
  );
}

type Props = {
  count?: number;
};

export  function JobCardSkeleton({ count = 3 }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse"
        >
          {/* Company & logo */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-slate-200" />
              <div>
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="mt-2 h-3 w-20 rounded bg-slate-200" />
              </div>
            </div>

            <div className="h-5 w-5 rounded-full bg-slate-200" />
          </div>

          {/* Title */}
          <div className="mt-6 h-5 w-3/4 rounded bg-slate-200" />

          {/* Badges */}
          <div className="mt-4 flex gap-2">
            <div className="h-6 w-16 rounded-full bg-slate-200" />
            <div className="h-6 w-20 rounded-full bg-slate-200" />
            <div className="h-6 w-14 rounded-full bg-slate-200" />
          </div>

          {/* Description */}
          <div className="mt-5 space-y-2">
            <div className="h-3 w-full rounded bg-slate-200" />
            <div className="h-3 w-5/6 rounded bg-slate-200" />
            <div className="h-3 w-2/3 rounded bg-slate-200" />
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-10 w-24 rounded-lg bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}