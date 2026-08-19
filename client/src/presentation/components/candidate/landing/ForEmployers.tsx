function ForEmployers() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="employer-cta bg-indigo-600 relative rounded-3xl overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-15"
            style={{
              background: 'radial-gradient(circle,#fff 0%,transparent 70%)',
              transform: 'translate(30%,-30%)',
            }}
          />
          <div className="relative z-10 text-center md:text-left">
            <div
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs text-white/80 font-bold"
              style={{ background: 'rgba(255,255,255,0.18)' }}
            >
              🏢 For Employers
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-white mb-3"
              style={{ letterSpacing: '-0.02em' }}
            >
              Hire Top Talent <br className="hidden md:block" />
              at Scale
            </h2>
            <p className="text-indigo-100 text-base max-w-md leading-relaxed font-medium">
              Post jobs, manage applications, and connect with millions of
              qualified candidates. Your next great hire is one click away.
            </p>
          </div>
          <div className="relative z-10 flex flex-col gap-3 items-center md:items-end shrink-0">
            <button className="emp-btn-white bg-white text-indigo-700 font-extrabold text-base px-8 py-4 rounded-xl whitespace-nowrap shadow-xl">
              🚀 Become an Employer
            </button>
            <p className="text-indigo-200 text-xs font-medium">
              Free to start · No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForEmployers;
