import React from 'react';
import { ClipboardList, Flag, Building2, type LucideIcon } from 'lucide-react';
import type { CardType } from './Container';

type SummaryCardsProps = {
  loading: boolean;
  counts: CardType[];
};
function SummaryCards({ loading, counts }: SummaryCardsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {counts.map((count, i) => {
        return (
          <SummaryCard
            key={i}
            icon={count.icon}
            tint={count.tint}
            count={count.value}
            label={count.label}
            sub={count.desc}
          />
        );
      })}
    </div>
  );
}

function SummaryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
      <div className="mt-4 h-6 w-12 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-100" />
    </div>
  );
}
type Props = {
  icon: LucideIcon;
  tint: string;
  count: number;
  label: string;
  sub: string;
};

function SummaryCard({ icon: Icon, tint, count, label, sub }: Props) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <p className="mt-4 text-2xl font-semibold text-slate-900">{count}</p>
      <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
      <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

export default SummaryCards;
