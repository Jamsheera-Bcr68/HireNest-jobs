
import { ArrowUpRight,ArrowDownRight, type LucideIcon } from "lucide-react";
type Card={
  icon: LucideIcon;
  label: string;
  value: number;
  delta: string;
  positive: boolean;
  classname: string;
};

type Props = {
  card:Card
}
export function DashboardStatCard({card }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.classname}`}
        >
          <card.icon className="h-5 w-5" />
        </div>
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${card.positive ? 'text-emerald-600' : 'text-rose-600'}`}
        >
          {card.positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}
          {card.delta}
        </span>
      </div>
      <p
        className="mt-4 text-2xl font-bold tracking-tight text-slate-900"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        {card.value}
      </p>
      <p className="mt-1 text-sm text-slate-500">{card.label}</p>
    </div>
  );
}