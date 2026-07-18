


type Props={
    recruiter:string
    data:string
}
export function WelcomeBanner({ recruiter, data }:Props) {
  const needsAttention = data.notifications.filter(
    (n) => n.priority === 'high'
  ).length;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 px-8 py-9 md:px-10 md:py-10">
      <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-24 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <p className="text-emerald-100/90 text-sm font-medium mb-2">
            Good afternoon, {recruiter.name.split(' ')[0]} 👋
          </p>
          <h1
            className="text-2xl md:text-[28px] font-semibold text-white max-w-md leading-snug"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Hiring is trending up this month — 3 roles are ahead of schedule.
          </h1>
        </div>
        <div className="flex gap-8 md:gap-10 shrink-0">
          <div>
            <p
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              18
            </p>
            <p className="text-xs text-emerald-100/80 mt-1">Open roles</p>
          </div>
          <div>
            <p
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              47
            </p>
            <p className="text-xs text-emerald-100/80 mt-1">New today</p>
          </div>
          <div>
            <p
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {needsAttention}
            </p>
            <p className="text-xs text-emerald-100/80 mt-1">Needs attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}


