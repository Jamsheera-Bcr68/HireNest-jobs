import { SkeletonBlock } from '../candidate/dashboard/StatusCards';

type Props = {
  label: string;
  value: number;
  color: string;
  isLoading: boolean;key:number
};

export const StatCard = ({ isLoading, label, value, color,key }: Props) => {
  if (isLoading)
    return (
      <div
        key={key}
        className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
      >
        <SkeletonBlock className="w-8 h-8 rounded-lg mb-3" />
        <SkeletonBlock className="w-12 h-6 mb-2" />
        <SkeletonBlock className="w-20 h-3" />
      </div>
    );
  else
    <div className={`rounded-xl p-4 flex flex-col gap-1 border ${color}`}>
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs font-medium opacity-70">{label}</span>
    </div>;
};
