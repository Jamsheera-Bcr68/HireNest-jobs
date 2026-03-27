import { type JobFilterType } from '../../../pages/user/JobListing';

type statsType = {
  icon: string;
  label: string;
  count: string;
};
function Industries({
  stats,
  updateFilter,
}: {
  stats: statsType[];
  updateFilter: (data: Partial<JobFilterType>) => void;
}) {
  return (
    <div>
      {/* ── CATEGORIES ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto bg-slate-100">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-400 text-sm font-medium mb-2 tracking-wide uppercase">
                Explore
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Browse by Industries
              </h2>
            </div>
            {/* <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors hidden md:block">
              View all categories →
            </a> */}
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"> */}
            {stats.map((stat) => (
              <button
                key={stat.label}
                className="w-[150px] bg-white rounded-2xl p-5 border text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200"
              >
                <div
                  onClick={() => updateFilter({ industry: [stat.label] })}
                  className="text-3xl mb-3"
                >
                  {stat.icon}
                </div>
                <div className="text-sm font-semibold text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">{stat.count} jobs</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Industries;
