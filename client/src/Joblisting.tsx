import { useState } from 'react';

const allJobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Senior',
    salary: '$120k – $160k',
    logo: 'S',
    color: '#635BFF',
    tags: ['Remote OK', 'Senior'],
    industry: 'Finance',
    posted: '2 hours ago',
    applicants: 42,
    description:
      'Lead end-to-end product design for our payments dashboard. Work closely with PMs and engineers.',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'Notion',
    location: 'New York, NY',
    type: 'Full-time',
    level: 'Lead',
    salary: '$140k – $180k',
    logo: 'N',
    color: '#1a1a1a',
    tags: ['Hybrid', 'Lead'],
    industry: 'Technology',
    posted: '5 hours ago',
    applicants: 87,
    description:
      'Build and scale the core API infrastructure powering millions of workspaces worldwide.',
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Airbnb',
    location: 'Remote',
    type: 'Contract',
    level: 'Mid-level',
    salary: '$80k – $110k',
    logo: 'A',
    color: '#FF5A5F',
    tags: ['Remote', 'Mid-level'],
    industry: 'Technology',
    posted: '1 day ago',
    applicants: 63,
    description:
      'Analyze booking trends and user behavior to drive data-informed product decisions.',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'Figma',
    location: 'Austin, TX',
    type: 'Full-time',
    level: 'Senior',
    salary: '$130k – $170k',
    logo: 'F',
    color: '#F24E1E',
    tags: ['On-site', 'Senior'],
    industry: 'Technology',
    posted: '2 days ago',
    applicants: 29,
    description:
      'Own our cloud infrastructure, CI/CD pipelines, and reliability engineering practices.',
  },
  {
    id: 5,
    title: 'Marketing Manager',
    company: 'Shopify',
    location: 'Toronto, Canada',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$90k – $120k',
    logo: 'S',
    color: '#96BF48',
    tags: ['Hybrid', 'Mid-level'],
    industry: 'Marketing',
    posted: '3 days ago',
    applicants: 115,
    description:
      'Drive growth marketing campaigns across paid, organic, and partnership channels.',
  },
  {
    id: 6,
    title: 'iOS Developer',
    company: 'Linear',
    location: 'Remote',
    type: 'Full-time',
    level: 'Senior',
    salary: '$110k – $150k',
    logo: 'L',
    color: '#5E6AD2',
    tags: ['Remote', 'Senior'],
    industry: 'Technology',
    posted: '3 days ago',
    applicants: 54,
    description:
      'Build beautiful, high-performance iOS features for our project management tool.',
  },
  {
    id: 7,
    title: 'UX Researcher',
    company: 'Loom',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$95k – $125k',
    logo: 'L',
    color: '#625DF5',
    tags: ['Remote', 'Mid-level'],
    industry: 'Technology',
    posted: '4 days ago',
    applicants: 38,
    description:
      'Conduct user interviews, usability tests, and synthesize insights for product teams.',
  },
  {
    id: 8,
    title: 'Financial Analyst',
    company: 'Brex',
    location: 'San Francisco, CA',
    type: 'Full-time',
    level: 'Junior',
    salary: '$70k – $95k',
    logo: 'B',
    color: '#E5484D',
    tags: ['Hybrid', 'Junior'],
    industry: 'Finance',
    posted: '5 days ago',
    applicants: 92,
    description:
      'Support FP&A, build financial models, and assist with quarterly business reviews.',
  },
  {
    id: 9,
    title: 'Content Strategist',
    company: 'Buffer',
    location: 'Remote',
    type: 'Part-time',
    level: 'Mid-level',
    salary: '$55k – $75k',
    logo: 'B',
    color: '#2C4BFF',
    tags: ['Remote', 'Mid-level'],
    industry: 'Marketing',
    posted: '6 days ago',
    applicants: 71,
    description:
      'Develop and execute content strategies that grow our brand and community presence.',
  },
  {
    id: 10,
    title: 'Machine Learning Engineer',
    company: 'Hugging Face',
    location: 'New York, NY',
    type: 'Full-time',
    level: 'Senior',
    salary: '$160k – $210k',
    logo: 'H',
    color: '#FF9D00',
    tags: ['Hybrid', 'Senior'],
    industry: 'Technology',
    posted: '1 week ago',
    applicants: 48,
    description:
      'Research and deploy state-of-the-art ML models powering our open-source platform.',
  },
  {
    id: 11,
    title: 'Nurse Practitioner',
    company: 'Carbon Health',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$110k – $135k',
    logo: 'C',
    color: '#00A878',
    tags: ['On-site', 'Mid-level'],
    industry: 'Healthcare',
    posted: '1 week ago',
    applicants: 22,
    description:
      'Provide primary and urgent care services in a modern, tech-forward clinical environment.',
  },
  {
    id: 12,
    title: 'Frontend Developer',
    company: 'Vercel',
    location: 'Remote',
    type: 'Full-time',
    level: 'Mid-level',
    salary: '$100k – $140k',
    logo: 'V',
    color: '#000000',
    tags: ['Remote', 'Mid-level'],
    industry: 'Technology',
    posted: '1 week ago',
    applicants: 133,
    description:
      'Build performant UI components and improve the developer experience on our platform.',
  },
];

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Freelance',
  'Internship',
];
const experienceLevels = ['Junior', 'Mid-level', 'Senior', 'Lead'];
const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Marketing',
  'Education',
  'Engineering',
];
const salaryRanges = ['$0 – $60k', '$60k – $100k', '$100k – $150k', '$150k+'];

const badgeStyle = (t) => {
  if (t === 'Remote OK' || t === 'Remote')
    return { bg: '#d1fae5', color: '#065f46', border: '#a7f3d0' };
  if (t === 'Hybrid')
    return { bg: '#fef3c7', color: '#92400e', border: '#fde68a' };
  if (t === 'On-site')
    return { bg: '#fee2e2', color: '#991b1b', border: '#fecaca' };
  if (t === 'Senior')
    return { bg: '#ede9fe', color: '#5b21b6', border: '#ddd6fe' };
  if (t === 'Mid-level')
    return { bg: '#e0e7ff', color: '#3730a3', border: '#c7d2fe' };
  if (t === 'Lead')
    return { bg: '#fce7f3', color: '#9d174d', border: '#fbcfe8' };
  if (t === 'Junior')
    return { bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0' };
  return { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' };
};

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FilterSection({ title, items, selected, onToggle }) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
        {title}
      </h4>
      <div className="space-y-2">
        {items.map((item) => {
          const active = selected.includes(item);
          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all"
              style={{
                background: active ? '#eef2ff' : 'transparent',
                color: active ? '#4f46e5' : '#64748b',
                border: active
                  ? '1.5px solid #c7d2fe'
                  : '1.5px solid transparent',
              }}
            >
              <span>{item}</span>
              {active && (
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                  style={{ background: '#4f46e5' }}
                >
                  <CheckIcon />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function JobListingPage() {
  const [search, setSearch] = useState('');
  const [locationQ, setLocationQ] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState([]);
  const [sortBy, setSortBy] = useState('Relevant');
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(allJobs[0]);
  const [viewMode, setViewMode] = useState('split'); // split | list

  const toggle = (setter, arr, val) =>
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const toggleSave = (id) =>
    setSavedJobs((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const filtered = allJobs.filter((j) => {
    if (
      search &&
      !j.title.toLowerCase().includes(search.toLowerCase()) &&
      !j.company.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (
      locationQ &&
      !j.location.toLowerCase().includes(locationQ.toLowerCase())
    )
      return false;
    if (selectedTypes.length && !selectedTypes.includes(j.type)) return false;
    if (selectedLevels.length && !selectedLevels.includes(j.level))
      return false;
    if (selectedIndustries.length && !selectedIndustries.includes(j.industry))
      return false;
    return true;
  });

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedIndustries([]);
    setSelectedSalary([]);
  };

  const totalFilters =
    selectedTypes.length +
    selectedLevels.length +
    selectedIndustries.length +
    selectedSalary.length;

  return (
    <div
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      className="min-h-screen bg-slate-50 text-slate-800"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        input:focus { outline: none; }
        input::placeholder { color: #94a3b8; }
        .job-card { transition: all 0.2s cubic-bezier(.4,0,.2,1); }
        .job-card:hover { transform: translateX(2px); box-shadow: 0 4px 20px rgba(79,70,229,0.10); }
        .job-card.active { border-color: #818cf8 !important; background: #fafbff !important; box-shadow: 0 4px 24px rgba(79,70,229,0.13); }
        .apply-btn { transition: opacity 0.18s, transform 0.18s; box-shadow: 0 4px 16px rgba(79,70,229,0.28); }
        .apply-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .save-btn { transition: all 0.18s; }
        .search-bar-shadow { box-shadow: 0 4px 24px rgba(79,70,229,0.10); }
        .detail-scroll::-webkit-scrollbar { width: 4px; }
        .detail-scroll::-webkit-scrollbar-track { background: transparent; }
        .detail-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #4f46e5; }
        .sort-select { appearance: none; cursor: pointer; }
        .chip { transition: all 0.15s; }
        .chip:hover { background: #eef2ff; border-color: #a5b4fc; color: #4f46e5; }
      `}</style>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5"
        style={{
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid #e8edf5',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
          >
            J
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            JobSphere
          </span>
        </div>
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-500">
          <a
            href="#"
            className="nav-link text-indigo-600 font-bold border-b-2 border-indigo-500 pb-0.5"
          >
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
          <button className="text-sm font-semibold text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
            Sign In
          </button>
          <button
            className="text-sm font-bold text-white px-5 py-2 rounded-lg"
            style={{
              background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
              boxShadow: '0 3px 12px rgba(79,70,229,0.28)',
            }}
          >
            Post a Job
          </button>
        </div>
      </nav>

      {/* ── SEARCH BAR ── */}
      <div className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3">
          <div
            className="flex items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-slate-50 search-bar-shadow"
            style={{ border: '1.5px solid #e2e8f0' }}
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title, keyword, or company"
              className="bg-transparent flex-1 text-sm text-slate-700 font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div
            className="flex items-center gap-3 w-full md:w-72 px-4 py-3 rounded-xl bg-slate-50"
            style={{ border: '1.5px solid #e2e8f0' }}
          >
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
              value={locationQ}
              onChange={(e) => setLocationQ(e.target.value)}
              placeholder="City, state, or Remote"
              className="bg-transparent flex-1 text-sm text-slate-700 font-medium"
            />
          </div>
          <button
            className="apply-btn px-8 py-3 rounded-xl text-sm font-bold text-white whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
          >
            Search
          </button>
        </div>

        {/* Active filter chips */}
        {totalFilters > 0 && (
          <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mt-3">
            {[
              ...selectedTypes,
              ...selectedLevels,
              ...selectedIndustries,
              ...selectedSalary,
            ].map((f) => (
              <span
                key={f}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 px-3 py-1 rounded-full"
                style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe' }}
              >
                {f}
                <button
                  onClick={() => {
                    if (selectedTypes.includes(f))
                      toggle(setSelectedTypes, selectedTypes, f);
                    if (selectedLevels.includes(f))
                      toggle(setSelectedLevels, selectedLevels, f);
                    if (selectedIndustries.includes(f))
                      toggle(setSelectedIndustries, selectedIndustries, f);
                    if (selectedSalary.includes(f))
                      toggle(setSelectedSalary, selectedSalary, f);
                  }}
                  className="text-indigo-400 hover:text-indigo-700"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors px-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {/* ── FILTERS SIDEBAR ── */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div
            className="sticky top-24 bg-white rounded-2xl p-5 sidebar-scroll overflow-y-auto"
            style={{
              border: '1.5px solid #e8edf5',
              maxHeight: 'calc(100vh - 120px)',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-extrabold text-slate-900">Filters</h3>
              {totalFilters > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs font-bold text-indigo-500 hover:text-indigo-700"
                >
                  Clear ({totalFilters})
                </button>
              )}
            </div>

            <FilterSection
              title="Job Type"
              items={jobTypes}
              selected={selectedTypes}
              onToggle={(v) => toggle(setSelectedTypes, selectedTypes, v)}
            />
            <div className="h-px bg-slate-100 mb-5" />
            <FilterSection
              title="Experience Level"
              items={experienceLevels}
              selected={selectedLevels}
              onToggle={(v) => toggle(setSelectedLevels, selectedLevels, v)}
            />
            <div className="h-px bg-slate-100 mb-5" />
            <FilterSection
              title="Industry"
              items={industries}
              selected={selectedIndustries}
              onToggle={(v) =>
                toggle(setSelectedIndustries, selectedIndustries, v)
              }
            />
            <div className="h-px bg-slate-100 mb-5" />
            <FilterSection
              title="Salary Range"
              items={salaryRanges}
              selected={selectedSalary}
              onToggle={(v) => toggle(setSelectedSalary, selectedSalary, v)}
            />

            <div
              className="mt-2 p-3 rounded-xl text-xs text-indigo-600 font-semibold text-center"
              style={{ background: '#eef2ff', border: '1px solid #c7d2fe' }}
            >
              🔔 Set up Job Alert
            </div>
          </div>
        </aside>

        {/* ── CENTER: JOB LIST ── */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-bold text-slate-900">
                {filtered.length.toLocaleString()} jobs found
              </span>
              <span className="text-slate-400 text-sm ml-1.5">
                {search || locationQ || totalFilters > 0
                  ? 'for your search'
                  : 'in all categories'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select bg-transparent text-slate-700 font-bold text-xs pr-4 focus:outline-none"
                >
                  <option>Relevant</option>
                  <option>Newest</option>
                  <option>Salary High–Low</option>
                  <option>Most Applied</option>
                </select>
              </div>
              {/* View toggle */}
              <div
                className="flex items-center rounded-xl overflow-hidden"
                style={{ border: '1.5px solid #e2e8f0' }}
              >
                <button
                  onClick={() => setViewMode('split')}
                  className="px-3 py-1.5 text-xs font-bold transition-all"
                  style={{
                    background: viewMode === 'split' ? '#eef2ff' : 'white',
                    color: viewMode === 'split' ? '#4f46e5' : '#94a3b8',
                  }}
                >
                  Split
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className="px-3 py-1.5 text-xs font-bold transition-all"
                  style={{
                    background: viewMode === 'list' ? '#eef2ff' : 'white',
                    color: viewMode === 'list' ? '#4f46e5' : '#94a3b8',
                  }}
                >
                  grid
                </button>
              </div>
            </div>
          </div>

          {/* Split view: list + detail panel */}
          <div
            className={`flex gap-5 ${viewMode === 'split' ? '' : 'flex-col'}`}
          >
            {/* Job cards */}
            <div
              className={`space-y-3 ${viewMode === 'split' ? 'w-80 shrink-0' : 'w-full'}`}
            >
              {filtered.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="font-semibold">No jobs match your filters</p>
                  <p className="text-sm mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
              {filtered.map((job) => {
                const isActive = activeJob?.id === job.id;
                const isSaved = savedJobs.includes(job.id);
                return (
                  <div
                    key={job.id}
                    onClick={() => setActiveJob(job)}
                    className={`job-card cursor-pointer rounded-2xl p-4 bg-white ${isActive && viewMode === 'split' ? 'active' : ''}`}
                    style={{
                      border: `1.5px solid ${isActive && viewMode === 'split' ? '#818cf8' : '#e8edf5'}`,
                      background:
                        isActive && viewMode === 'split' ? '#fafbff' : 'white',
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white shadow-sm shrink-0"
                          style={{ background: job.color }}
                        >
                          {job.logo}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800 leading-tight">
                            {job.title}
                          </h3>
                          <p className="text-xs text-slate-400 font-semibold mt-0.5">
                            {job.company}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(job.id);
                        }}
                        className="save-btn shrink-0 ml-2"
                        style={{ color: isSaved ? '#4f46e5' : '#cbd5e1' }}
                      >
                        <svg
                          className="w-4.5 h-4.5 w-[18px] h-[18px]"
                          fill={isSaved ? 'currentColor' : 'none'}
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

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2.5">
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
                      <span className="text-slate-300 mx-0.5">·</span>
                      {job.type}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {job.tags.map((t) => {
                        const s = badgeStyle(t);
                        return (
                          <span
                            key={t}
                            className="text-xs font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              background: s.bg,
                              color: s.color,
                              border: `1px solid ${s.border}`,
                            }}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-indigo-600 text-xs font-bold">
                        {job.salary}
                      </span>
                      <span className="text-slate-400 text-xs">
                        {job.posted}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Pagination */}
              {filtered.length > 0 && (
                <div className="flex items-center justify-center gap-1 pt-4 pb-2">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button
                      key={p}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all"
                      style={{
                        background: p === 1 ? '#4f46e5' : 'transparent',
                        color: p === 1 ? 'white' : '#94a3b8',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* ── JOB DETAIL PANEL (split mode) ── */}
            {viewMode === 'split' && activeJob && (
              <div className="flex-1 min-w-0">
                <div
                  className="sticky top-24 bg-white rounded-2xl detail-scroll overflow-y-auto"
                  style={{
                    border: '1.5px solid #e8edf5',
                    maxHeight: 'calc(100vh - 120px)',
                  }}
                >
                  {/* Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md"
                          style={{ background: activeJob.color }}
                        >
                          {activeJob.logo}
                        </div>
                        <div>
                          <h2 className="text-xl font-extrabold text-slate-900">
                            {activeJob.title}
                          </h2>
                          <p className="text-slate-500 font-semibold">
                            {activeJob.company}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSave(activeJob.id)}
                        className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
                        style={{
                          color: savedJobs.includes(activeJob.id)
                            ? '#4f46e5'
                            : '#cbd5e1',
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill={
                            savedJobs.includes(activeJob.id)
                              ? 'currentColor'
                              : 'none'
                          }
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

                    {/* Meta chips */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {[
                        { icon: '📍', text: activeJob.location },
                        { icon: '💼', text: activeJob.type },
                        { icon: '⭐', text: activeJob.level },
                        { icon: '🏢', text: activeJob.industry },
                      ].map((m) => (
                        <span
                          key={m.text}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 px-3 py-1.5 rounded-xl"
                          style={{
                            background: '#f8fafc',
                            border: '1.5px solid #e8edf5',
                          }}
                        >
                          {m.icon} {m.text}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        className="apply-btn flex-1 py-3 rounded-xl text-sm font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                        }}
                      >
                        Apply Now
                      </button>
                      <button
                        className="px-5 py-3 rounded-xl text-sm font-bold text-indigo-600 transition-all hover:bg-indigo-50"
                        style={{ border: '1.5px solid #c7d2fe' }}
                      >
                        Easy Apply
                      </button>
                    </div>
                  </div>

                  {/* Salary + stats row */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                    {[
                      { label: 'Salary', value: activeJob.salary },
                      {
                        label: 'Applicants',
                        value: `${activeJob.applicants}+`,
                      },
                      { label: 'Posted', value: activeJob.posted },
                    ].map((s) => (
                      <div key={s.label} className="p-4 text-center">
                        <div className="text-sm font-extrabold text-indigo-600">
                          {s.value}
                        </div>
                        <div className="text-xs text-slate-400 font-medium mt-0.5">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-6">
                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                        About the Role
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {activeJob.description} Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                        Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {[
                          'Define and drive the product vision with cross-functional teams',
                          'Conduct user research and translate insights into actionable designs',
                          'Create wireframes, prototypes, and high-fidelity mockups',
                          'Collaborate with engineering to ensure quality implementation',
                          'Establish design system standards and best practices',
                        ].map((r, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-slate-600"
                          >
                            <span
                              className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white text-xs"
                              style={{ background: '#4f46e5' }}
                            >
                              <CheckIcon />
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                        Requirements
                      </h4>
                      <ul className="space-y-2">
                        {[
                          '5+ years of product design experience',
                          'Proficiency in Figma and prototyping tools',
                          'Strong portfolio demonstrating end-to-end design process',
                          'Experience working in agile, fast-paced environments',
                          'Excellent communication and presentation skills',
                        ].map((r, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-slate-600"
                          >
                            <span className="text-indigo-400 mt-0.5 shrink-0">
                              →
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Figma',
                          'User Research',
                          'Prototyping',
                          'Design Systems',
                          'Wireframing',
                          'A/B Testing',
                          'Usability Testing',
                        ].map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-semibold text-slate-600 px-3 py-1.5 rounded-xl"
                            style={{
                              background: '#f1f5f9',
                              border: '1.5px solid #e2e8f0',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                        Benefits
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          '🏥 Health Insurance',
                          '🏡 Remote Friendly',
                          '📈 Stock Options',
                          '🎓 Learning Budget',
                          '🌴 Unlimited PTO',
                          '💻 Home Office Setup',
                        ].map((b) => (
                          <div
                            key={b}
                            className="text-xs font-semibold text-slate-600 px-3 py-2 rounded-xl flex items-center gap-1.5"
                            style={{
                              background: '#f8fafc',
                              border: '1.5px solid #e8edf5',
                            }}
                          >
                            {b}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Company card */}
                    <div
                      className="rounded-2xl p-4"
                      style={{
                        background: '#f8fafc',
                        border: '1.5px solid #e8edf5',
                      }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white"
                          style={{ background: activeJob.color }}
                        >
                          {activeJob.logo}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">
                            {activeJob.company}
                          </p>
                          <p className="text-xs text-slate-400 font-medium">
                            {activeJob.industry} · 500–1000 employees
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        A fast-growing technology company building tools that
                        empower millions of users worldwide. Known for strong
                        engineering culture and exceptional benefits.
                      </p>
                      <button className="mt-3 text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors">
                        View company profile →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
