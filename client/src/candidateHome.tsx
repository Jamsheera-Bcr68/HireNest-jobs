import { useState } from 'react';

const jobCategories = [
  { icon: '💻', label: 'Technology', count: '12,430' },
  { icon: '🏥', label: 'Healthcare', count: '8,210' },
  { icon: '📊', label: 'Finance', count: '6,540' },
  { icon: '🎨', label: 'Design', count: '4,890' },
  { icon: '📚', label: 'Education', count: '5,320' },
  { icon: '🏗️', label: 'Engineering', count: '9,110' },
];

const featuredJobs = [
  {
    title: 'Senior Product Designer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k – $160k',
    logo: 'S',
    color: '#635BFF',
    tags: ['Remote OK', 'Senior'],
  },
  {
    title: 'Backend Engineer',
    company: 'Notion',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$140k – $180k',
    logo: 'N',
    color: '#000000',
    tags: ['Hybrid', 'Lead'],
  },
  {
    title: 'Data Analyst',
    company: 'Airbnb',
    location: 'Remote',
    type: 'Contract',
    salary: '$80k – $110k',
    logo: 'A',
    color: '#FF5A5F',
    tags: ['Remote', 'Mid-level'],
  },
  {
    title: 'DevOps Engineer',
    company: 'Figma',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$130k – $170k',
    logo: 'F',
    color: '#F24E1E',
    tags: ['On-site', 'Senior'],
  },
  {
    title: 'Marketing Manager',
    company: 'Shopify',
    location: 'Toronto, Canada',
    type: 'Full-time',
    salary: '$90k – $120k',
    logo: 'S',
    color: '#96BF48',
    tags: ['Hybrid', 'Mid-level'],
  },
  {
    title: 'iOS Developer',
    company: 'Linear',
    location: 'Remote',
    type: 'Full-time',
    salary: '$110k – $150k',
    logo: 'L',
    color: '#5E6AD2',
    tags: ['Remote', 'Senior'],
  },
];

const stats = [
  { value: '2.4M+', label: 'Active Jobs' },
  { value: '180K+', label: 'Companies' },
  { value: '12M+', label: 'Candidates' },
  { value: '94%', label: 'Hire Rate' },
];

export default function JobHomePage() {
  const [jobQuery, setJobQuery] = useState('');
  const [location, setLocation] = useState('');

  return (
    <div
      style={{ fontFamily: "'Sora', 'DM Sans', sans-serif" }}
      className="min-h-screen bg-slate-950 text-white overflow-x-hidden"
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        .hero-glow {
          background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.35) 0%, transparent 70%);
        }
        .card-hover {
          transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s cubic-bezier(.4,0,.2,1), border-color 0.22s;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px 0 rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.55) !important;
        }
        .search-bar {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255,255,255,0.10);
        }
        .search-btn {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          transition: opacity 0.18s, transform 0.18s;
        }
        .search-btn:hover {
          opacity: 0.88;
          transform: scale(1.03);
        }
        .employer-btn {
          background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%);
          transition: opacity 0.18s, transform 0.18s;
        }
        .employer-btn:hover {
          opacity: 0.88;
          transform: scale(1.04);
        }
        .cat-card:hover {
          background: rgba(99,102,241,0.18) !important;
          border-color: rgba(99,102,241,0.5) !important;
        }
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #a5b4fc; }
        .badge-remote { background: rgba(16,185,129,0.15); color: #6ee7b7; }
        .badge-hybrid { background: rgba(245,158,11,0.15); color: #fcd34d; }
        .badge-onsite { background: rgba(239,68,68,0.13); color: #fca5a5; }
        .badge-senior { background: rgba(139,92,246,0.15); color: #c4b5fd; }
        .badge-mid { background: rgba(99,102,241,0.13); color: #a5b4fc; }
        .badge-lead { background: rgba(236,72,153,0.13); color: #f9a8d4; }
        .dots-bg {
          background-image: radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .stat-card {
          background: linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.07) 100%);
          border: 1px solid rgba(99,102,241,0.18);
        }
        input::placeholder { color: rgba(255,255,255,0.35); }
        input:focus { outline: none; }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{
          background: 'rgba(2,6,23,0.82)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
          >
            J
          </div>
          <span className="text-lg font-semibold tracking-tight">
            JobSphere
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#" className="nav-link">
            Find Jobs
          </a>
          <a href="#" className="nav-link">
            Companies
          </a>
          <a href="#" className="nav-link">
            Salaries
          </a>
          <a href="#" className="nav-link">
            Resources
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-sm text-slate-300 px-4 py-2 rounded-lg nav-link hover:bg-white/5">
            Sign In
          </button>
          <button className="employer-btn text-sm font-semibold px-5 py-2 rounded-lg text-white shadow-lg">
            Post a Job
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 px-6 dots-bg">
        <div className="hero-glow absolute inset-0 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium text-indigo-300"
            style={{
              background: 'rgba(99,102,241,0.14)',
              border: '1px solid rgba(99,102,241,0.28)',
            }}
          >
            ✦ 2,400+ new jobs added today
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Find Your{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#818cf8,#c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dream Career
            </span>{' '}
            Today
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Search thousands of jobs from top companies. Connect with the right
            opportunities and take the next step in your career journey.
          </p>

          {/* ── SEARCH BAR ── */}
          <div className="search-bar rounded-2xl p-3 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto shadow-2xl">
            {/* Job Title */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-white/5">
              <svg
                className="w-5 h-5 text-indigo-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                value={jobQuery}
                onChange={(e) => setJobQuery(e.target.value)}
                placeholder="Job title, keyword, or company"
                className="bg-transparent flex-1 text-sm text-white"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-white/10 my-1" />

            {/* Location */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-white/5">
              <svg
                className="w-5 h-5 text-indigo-400 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, state, or Remote"
                className="bg-transparent flex-1 text-sm text-white"
              />
            </div>

            <button className="search-btn px-8 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg whitespace-nowrap">
              Search Jobs
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-slate-500 text-xs">Popular:</span>
            {[
              'Remote',
              'Full-time',
              'Tech',
              'Design',
              'Marketing',
              'Finance',
            ].map((tag) => (
              <button
                key={tag}
                className="text-xs text-slate-400 px-3 py-1 rounded-full hover:text-white transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-card rounded-2xl p-6 text-center"
            >
              <div
                className="text-3xl font-extrabold text-white mb-1"
                style={{ letterSpacing: '-0.02em' }}
              >
                {s.value}
              </div>
              <div className="text-slate-400 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-400 text-sm font-medium mb-2 tracking-wide uppercase">
                Explore
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Browse by Category
              </h2>
            </div>
            <a
              href="#"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors hidden md:block"
            >
              View all categories →
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {jobCategories.map((cat) => (
              <button
                key={cat.label}
                className="cat-card card-hover rounded-2xl p-5 text-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">
                  {cat.label}
                </div>
                <div className="text-xs text-slate-500">{cat.count} jobs</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED JOBS ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-400 text-sm font-medium mb-2 tracking-wide uppercase">
                Opportunities
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Jobs
              </h2>
            </div>
            <a
              href="#"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors hidden md:block"
            >
              View all jobs →
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredJobs.map((job, i) => {
              const badgeClass = (t) => {
                if (t === 'Remote OK' || t === 'Remote') return 'badge-remote';
                if (t === 'Hybrid') return 'badge-hybrid';
                if (t === 'On-site') return 'badge-onsite';
                if (t === 'Senior') return 'badge-senior';
                if (t === 'Mid-level') return 'badge-mid';
                if (t === 'Lead') return 'badge-lead';
                return '';
              };
              return (
                <div
                  key={i}
                  className="card-hover rounded-2xl p-6 cursor-pointer"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-lg"
                      style={{ background: job.color }}
                    >
                      {job.logo}
                    </div>
                    <button className="text-slate-500 hover:text-indigo-400 transition-colors">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>

                  <h3 className="font-semibold text-white text-base mb-1">
                    {job.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">{job.company}</p>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                    </svg>
                    {job.location}
                    <span className="mx-1 text-slate-700">·</span>
                    {job.type}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.tags.map((t) => (
                      <span
                        key={t}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeClass(t)}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-indigo-300 text-sm font-semibold">
                      {job.salary}
                    </span>
                    <button
                      className="text-xs font-semibold text-white px-4 py-1.5 rounded-lg transition-all hover:opacity-90"
                      style={{
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── EMPLOYER CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.22) 0%, rgba(139,92,246,0.16) 50%, rgba(14,165,233,0.15) 100%)',
              border: '1.5px solid rgba(99,102,241,0.3)',
            }}
          >
            {/* Background glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
                transform: 'translate(30%,-30%)',
              }}
            />

            <div className="relative z-10 text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs text-sky-300 font-medium"
                style={{
                  background: 'rgba(14,165,233,0.15)',
                  border: '1px solid rgba(14,165,233,0.25)',
                }}
              >
                🏢 For Employers
              </div>
              <h2
                className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
                style={{ letterSpacing: '-0.02em' }}
              >
                Hire Top Talent <br className="hidden md:block" />
                at Scale
              </h2>
              <p className="text-slate-400 text-base max-w-md leading-relaxed">
                Post jobs, manage applications, and connect with millions of
                qualified candidates. Your next great hire is one click away.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-3 items-center md:items-end shrink-0">
              <button className="employer-btn px-8 py-4 rounded-xl text-base font-bold text-white shadow-xl whitespace-nowrap">
                🚀 Become an Employer
              </button>
              <p className="text-slate-500 text-xs">
                Free to start · No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-indigo-400 text-sm font-medium mb-2 tracking-wide uppercase">
            Simple Process
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            How JobSphere Works
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: '🔍',
                title: 'Search Jobs',
                desc: 'Browse thousands of listings filtered by role, location, salary, and more.',
              },
              {
                step: '02',
                icon: '📝',
                title: 'Apply Easily',
                desc: 'Submit your profile and resume with one click. No lengthy forms.',
              },
              {
                step: '03',
                icon: '🎉',
                title: 'Get Hired',
                desc: "Hear back from companies and land the career you've been working toward.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl p-8"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1.5px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs font-bold text-indigo-400 tracking-widest mb-2">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/8 py-10 px-6 mt-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
            >
              J
            </div>
            <span className="font-semibold text-sm">JobSphere</span>
          </div>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Sitemap
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors">
              Contact
            </a>
          </div>
          <p className="text-xs text-slate-600">
            © 2026 JobSphere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
