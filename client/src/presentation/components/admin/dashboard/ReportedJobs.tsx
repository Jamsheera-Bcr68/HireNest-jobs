
import { ExternalLink,Briefcase } from 'lucide-react';
import { EmptyState } from './PendingCompany';
import type { PendingJobs } from './DashbordContainer';
import { useNavigate } from 'react-router-dom';



type ReportedJobsProps={
  jobs:PendingJobs[]
}
function ReportedJobs({jobs}:ReportedJobsProps) {
  const navigate=useNavigate()
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-slate-900">
         Pending Review Reported Jobs
        </h3>
        <button
          onClick={()=>navigate('/admin/jobs',{state:{isReported:true}})}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View all <ExternalLink className="h-3 w-3" />
        </button>
      </div>
      <div className="space-y-3">
        {jobs.map((j) => (
          <div
            key={j.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Briefcase className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {j.title}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {j.companyName} · {j.jobTypeLabel}
              </p>
            </div>
            {/* <button
            onClick={() => navigate(`/admin/jobs/${j.id}`)}
              className="h-8 w-12 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center shrink-0"
            >
              View
            </button> */}
            <div className="flex items-center gap-3 shrink-0">
    <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
      {j.reportCount} Reports
    </span>

    <button
      onClick={() => navigate(`/admin/jobs/${j.id}`)}
      className="h-8 w-12 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center"
    >
      View
    </button>
  </div>
            
          </div>
        ))}
        {jobs.length === 0 && <EmptyState label="jobs" />}
      </div>
    </div>
  );
}

export default ReportedJobs;
