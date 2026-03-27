import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import type { JobFilterType } from '../../../pages/user/JobListing';

type Props = {
  jobCountOfToday: number;
  handleFilterChange: (data: Partial<JobFilterType>) => void;
  filter: { search: { job: string; location: string } };
};
function Hero({ jobCountOfToday, handleFilterChange, filter }: Props) {
  console.log('filter formlisting', filter);

  const [jobSearch, setJobSearch] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  return (
    <div>
      <section className="relative pb-24 px-6 overflow-hidden">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <img
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src="/review.jpg"
          alt=""
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex bg-teal-50 items-center mt-20 gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium text-teal-800">
            ✦ {jobCountOfToday} new jobs added today
          </div>

          <h1
            className="text-5xl text-gray-700 md:text-5xl lg:text 7xl font-extrabold leading-tight tracking-tight mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            Find Your{' '}
            <span
              className="text-teal-700"
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

          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Search thousands of jobs from top companies. Connect with the right
            opportunities and take the next step in your career journey.
          </p>

          {/* ── SEARCH BAR ── */}
          <div className="search-bar bg-white rounded-2xl p-3 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto shadow-2xl">
            {/* Job Title */}
            <div className="flex items-center gap-3 flex-1  px-2 py-1 border rounded-2xl bg-gray-100">
              <Search size={18} className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
                placeholder="  Job title, keyword, or company"
                className="bg-white pl-2 h-7 flex-1 text-sm text- rounded-md focus:outline-none  "
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px bg-white my-1" />

            {/* Location */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 border rounded-2xl bg-gray-100">
              <MapPin size={18} className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, state, or Remote"
                className="bg-white h-7 flex-1 text-sm rounded-md pl-3 focus:outline-none "
              />
            </div>

            <button
              onClick={() => {
                handleFilterChange({
                  search: { job: jobSearch, location: location },
                });
              }}
              className="search-btn px-8 py-3.5 rounded-2xl  bg-indigo-400 text-sm font-semibold text-white shadow-lg whitespace-nowrap"
            >
              Search Jobs
            </button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
            <span className="text-white text-xs">Popular:</span>
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
                className="text-xs  text-white border border-1-white px-3 py-1 rounded-full hover:text-white transition-colors"
                style={{
                  background: 'rgba(113, 37, 37, 0.06)',
                  border: '1px solid rgba(13, 135, 137, 0.1)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
