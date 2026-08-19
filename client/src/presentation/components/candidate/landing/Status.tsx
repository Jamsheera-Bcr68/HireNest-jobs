type stats = { value: number; label: string };

function Status({ stats }: { stats: stats[] }) {
  return (
    <div>
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-card bg-indigo-100 rounded-2xl p-6 text-center w-[160px] sm:w-[180px] md:flex-1 md:max-w-[220px]"
            >
              <div
                className="text-3xl font-extrabold text-indigo-700 mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                {s.value}
              </div>
              <div className="text-indigo-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Status;
