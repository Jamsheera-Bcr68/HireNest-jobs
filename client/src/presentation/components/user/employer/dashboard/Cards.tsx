import { TrendingDown, TrendingUp } from 'lucide-react';
import type { StatType } from './CompanyDashboardContainer';

import { SkeletonBlock } from '../../../candidate/dashboard/StatusCards';

const tintMap = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-100',
  },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-100' },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-100',
  },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-100' },
};

type Props = {
  key: number;
  isLoading: boolean;
  stat: StatType;
};
export function StatCard({ stat, isLoading, key }: Props) {
  const Icon = stat.icon;
  const tint = stat.tint;
  const isUp = stat.trend === 'up';
  
    return (
      <div className="group rounded-3xl bg-white border border-stone-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
        <div className="flex items-start justify-between">
          <div
            className={`h-10 w-10 rounded-2xl ${tint.bg} ${tint.text} flex items-center justify-center ring-1 ${tint.ring}`}
          >
            <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
          </div>
          {stat.change ? (
            <span
              className={`flex items-center gap-0.5 text-[11px] font-semibold px-2 py-1 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}
            >
              {isUp ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {stat.change}%
            </span>
          ) : null}
        </div>
        <p
          className="text-2xl font-semibold text-stone-900 mt-4"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {stat.value}
        </p>
        <p className="text-xs text-stone-400 mt-1">{stat.label}</p>
        <div className="text-[10.5px] mt-1 font-xs text-green-600">
          {stat.note}
          {stat.desc}
        </div>
        {/* <div className="">
          {stat.note && (
            <p className="text-xs font-small text-amber-600">{stat.note}</p>
          )}

          <p className="text-xs text-stone-400">{stat.desc}</p>
        </div> */}
      </div>
    );
}
