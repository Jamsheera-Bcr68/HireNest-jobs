import { type StatusCardType } from '../../pages/admin/Companies';
type Props = {
  stats: StatusCardType[];
};
function StatusCards({ stats }: Props) {
  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white items-center justify-center rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-sm  font-medium text-slate-500">
                {s.label}
              </span>
            </div>
            <div className="items-center text-center">
              <p className="text-3xl font-bold text-slate-900">{s.count}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusCards;
