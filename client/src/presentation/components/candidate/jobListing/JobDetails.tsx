import { useState } from 'react';
import type { JobDetailsDto } from '../../../../types/dtos/jobDto';
import { Save, MapIcon, CheckIcon } from 'lucide-react';
import { formatSalary } from '../../../../utils/salaryFormat';
import Skills from '../../user/profile/Skills';

type Props = {
  viewMode: 'split' | 'grid';
  activeJob: JobDetailsDto | null;
};
const baseUrl = import.meta.env.VITE_BACKEND_URL;
function JobDetails({ viewMode, activeJob }: Props) {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  if (!activeJob) return null;
  return (
    <div>
      {/* ── JOB DETAIL PANEL (split mode) ── */}
      {viewMode === 'split' && activeJob && (
        <div className="flex-1 min-w-0 sticky top-24 ">
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
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-md">
                    <img
                      className="rounded-2xl"
                      src={`${baseUrl}${activeJob.companyLogo}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {activeJob.title}
                    </h2>
                    <p className="text-slate-500 font-semibold">
                      {activeJob.companyName}
                    </p>
                  </div>
                </div>
                <button
                  // onClick={() => toggleSave(activeJob.id)}
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
                      savedJobs.includes(activeJob.id) ? 'currentColor' : 'none'
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
                  {
                    icon: <MapIcon />,
                    text: `${activeJob.location.place ?? ''},${activeJob.location.state},${activeJob.location.country}`,
                  },
                  { icon: '💼', text: activeJob.jobType },
                  { icon: '⭐', text: activeJob.mode },
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
                {
                  label: 'Salary',
                  value: formatSalary(
                    activeJob.min_salary,
                    activeJob.max_salary
                  ),
                },
                { label: 'Applicants', value: `${activeJob.totalApplicants}+` },
                {
                  label: 'Posted',
                  value: new Date(activeJob.createdAt).toLocaleDateString(),
                },
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
                  {activeJob.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                  Responsibilities
                </h4>
                <ul className="space-y-2">
                  {activeJob.responsibilities.map((r, i) => (
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
              {activeJob.requirements && activeJob.requirements.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                    Requirements
                  </h4>
                  <ul className="space-y-2">
                    {activeJob.requirements.map((r, i) => (
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
              )}

              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeJob.skills.map((skill) => (
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
              {activeJob.benefits.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                    Benefits
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {activeJob.benefits.map((b) => (
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
              )}
              <button>Report </button>

              {/* Company card */}
              <div
                className="rounded-2xl p-4"
                style={{ background: '#f8fafc', border: '1.5px solid #e8edf5' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white">
                    <img
                      className="rounded-2xl"
                      src={`${baseUrl}${activeJob.companyLogo}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {activeJob.companyName}
                    </p>
                    <p className="text-xs text-slate-400 font-medium">
                      {activeJob.industry} · {activeJob.companySize} employees
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {activeJob.aboutCompany}
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
  );
}

export default JobDetails;
