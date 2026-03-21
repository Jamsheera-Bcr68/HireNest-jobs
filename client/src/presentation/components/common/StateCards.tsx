type Props = {
  label: string;
  value: number;
  color: string;
};
export const StatCard = ({ label, value, color }: Props) => (
  <div className={`rounded-xl p-4 flex flex-col gap-1 border ${color}`}>
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-xs font-medium opacity-70">{label}</span>
  </div>
);
