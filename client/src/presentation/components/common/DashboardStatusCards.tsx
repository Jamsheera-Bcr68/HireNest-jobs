
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
  <div className="group  relative z-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
    {/* Decorative background glow */}
    <div
      className={`absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-all duration-300 group-hover:opacity-20 ${card.classname}`}
    />

    <div className="relative">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 ${card.classname}`}
        >
          <card.icon className="h-5 w-5" />
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            card.positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          {card.positive ? (
            <ArrowUpRight className="h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5" />
          )}

          {card.delta}
        </span>
      </div>

      {/* Value */}
      <div className="mt-5">
        <p
          className="text-3xl font-bold tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-slate-950"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {card.value}
        </p>

        <p className="mt-1 text-sm font-medium text-slate-500">
          {card.label}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="mt-4 h-1 w-10 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-16" />
    </div>
  </div>
);
  // return (
  //   <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  //     <div className="flex items-center justify-between">
  //       <div
  //         className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.classname}`}
  //       >
  //         <card.icon className="h-5 w-5" />
  //       </div>
  //       <span
  //         className={`flex items-center gap-0.5 text-xs font-semibold ${card.positive ? 'text-emerald-600' : 'text-rose-600'}`}
  //       >
  //         {card.positive ? (
  //           <ArrowUpRight className="h-3.5 w-3.5" />
  //         ) : (
  //           <ArrowDownRight className="h-3.5 w-3.5" />
  //         )}
  //         {card.delta}
  //       </span>
  //     </div>
  //     <p
  //       className="mt-4 text-2xl font-bold tracking-tight text-slate-900"
  //       style={{ fontFamily: "'Sora', sans-serif" }}
  //     >
  //       {card.value}
  //     </p>
  //     <p className="mt-1 text-sm text-slate-500">{card.label}</p>
  //   </div>
  // );
}