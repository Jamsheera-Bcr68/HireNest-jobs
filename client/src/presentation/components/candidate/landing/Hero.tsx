import type { JobFilterType } from '../jobListing/ListingContainter';

type Props = {
  jobCountOfToday: number;
  handleFilterChange: (data: Partial<JobFilterType>) => void;
  filter: { search: { job: string; location: string } };
};
function Hero({ filter }: Props) {
  console.log('filter formlisting', filter);
  const POPULAR_TAGS = [
    'Remote',
    'Full-time',
    'Tech',
    'Design',
    'Marketing',
    'Finance',
  ];
  return (
    <section className="relative isolate flex min-h-svh items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <img
          src="/homeBg.jpg"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover object-[70%_center] md:object-center"
        />
        {/* readability overlay */}
        <div className="absolute inset-0 bg-slate-900/50" />
        {/* glow, defined here instead of a global class */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.30),transparent_70%)]" />
      </div>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-4xl py-28 text-center md:py-36">
        <h1 className="mb-5 text-balance text-4xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-5xl md:mb-6 md:text-6xl lg:text-7xl">
          Find Your{' '}
          <span className="bg-gradient-to-br from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Dream Career
          </span>{' '}
          Today
        </h1>

        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg md:text-xl">
          Search thousands of jobs from top companies. Connect with the right
          opportunities and take the next step in your career journey.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8">
          <span className="text-xs font-medium text-slate-200 sm:text-sm">
            Popular:
          </span>

          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className="rounded-full border border-white/30 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 sm:text-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
