import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Flag,
  MapPin,
  Mail,
  Calendar,
  ChevronDown,
  Inbox,
  type LucideIcon,
  ListTodo,
} from 'lucide-react';
import { type DashboardCompany, type PendingJobs } from './DashbordContainer';

const bseUrl = import.meta.env.VITE_BACKEND_URL;

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

function reportSeverity(count: number) {
  if (count >= 6)
    return {
      ring: 'ring-red-500/30',
      text: 'text-red-600',
      bg: 'bg-red-50',
      dot: 'bg-red-500',
      label: 'High',
    };
  if (count >= 3)
    return {
      ring: 'ring-amber-500/30',
      text: 'text-amber-600',
      bg: 'bg-amber-50',
      dot: 'bg-amber-500',
      label: 'Medium',
    };
  return {
    ring: 'ring-slate-400/30',
    text: 'text-slate-600',
    bg: 'bg-slate-50',
    dot: 'bg-slate-400',
    label: 'Low',
  };
}

function EmptyState({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12  rounded-full bg-slate-100 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-slate-400" strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-slate-700">All caught up</p>
      <p className="text-sm text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}

type CompanyRowProps = {
  company: DashboardCompany;
};

function CompanyRow({ company }: CompanyRowProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="group border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors">
      <div className="flex items-center gap-3 p-3.5">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-semibold overflow-hidden">
          {company.logoUrl ? (
            <img
              src={`${bseUrl}${company.logoUrl}`}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            initials(company.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900 truncate">
              {company.name}
            </p>
            <span className="shrink-0 text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
              {company.industry}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {company.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {company.submittedAt}
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* <button
            onClick={() => navigate(`/admin/companies/${company.id}`)}
            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-red-700 text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Reject
          </button> */}
          {/* <button
            onClick={() => navigate(`/admin/company/${company.id}`)}
            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-700 text-white hover:bg-slate-800 transition-colors"
          >
            <Check className="w-3.5 h-3.5" /> Approve
          </button> */}
          <button
            onClick={() => navigate(`/admin/companies/${company.id}`)}
            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-indigo-700 text-white hover:bg-indigo-600 transition-colors"
          >
            View
          </button>
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="sm:hidden shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {expanded && (
        <div className="sm:hidden px-3.5 pb-3.5 flex flex-col gap-2">
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <Mail className="w-3.5 h-3.5" /> {company.email}
          </p>
          <div className="flex items-center gap-2 pt-1">
            {/* <button
              onClick={() => onReject(company.id)}
              className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium px-3 py-2 rounded-lg border border-slate-200 text-slate-600"
            >
              <X className="w-3.5 h-3.5" /> Reject
            </button> */}
            <button
              onClick={() => navigate(`/admin/company/${company}`)}
              className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-medium px-3 py-2 rounded-lg bg-slate-900 text-white"
            >
              View
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type JobRowProps = {
  job: PendingJobs;
};
function JobRow({ job }: JobRowProps) {
  const sev = reportSeverity(job.reportCount);
  const navigate = useNavigate();
  return (
    <div className="p-3 border border-slate-200 rounded-xl bg-white hover:border-violet-300 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
        {/* Report count */}
        <div
          className={`w-9 h-9 shrink-0 rounded-lg flex flex-col items-center justify-center ${sev.bg} ring-1 ${sev.ring}`}
        >
          <span className={`text-xs font-bold leading-none ${sev.text}`}>
            {job.reportCount}
          </span>

          <span className={`text-[8px] font-medium ${sev.text}`}>reports</span>
        </div>

        {/* Job information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-semibold text-slate-900 leading-4 line-clamp-2">
              {job.title}
            </p>

            <span className="shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
              {job.jobTypeLabel}
            </span>
          </div>

          {/* Company */}
          <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 min-w-0">
            <Building2 className="w-3 h-3 shrink-0" />

            <span className="truncate">{job.companyName}</span>
          </div>

          {/* Priority */}
          <div
            className={`flex items-center gap-1 mt-1 text-[10px] font-medium ${sev.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${sev.dot}`} />

            <span>{sev.label} priority</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 shrink-0 sm:ml-1">
          <button
            onClick={() => navigate(`/admin/jobs/${job.id}`)}
            className="inline-flex items-center justify-center gap-1 text-[10px] text-white font-medium px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-indigo-800 hover:bg-indigo-600 transition-colors"
          >
            {/* <ShieldOff className="w-3 h-3" />
          Dismiss */}
            View
          </button>

          {/* <button
         // onClick={() => onRemove(job.id)}
          className="inline-flex items-center justify-center gap-1 text-[10px] font-medium px-2.5 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          Remove
        </button> */}
        </div>
      </div>
    </div>
  );
  //    return (
  //     <div className="p-3 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors">
  //       {/* Top section */}
  //       <div className="flex items-start gap-2.5">
  //         {/* Report count */}
  //         <div
  //           className={`w-9 h-9 shrink-0 rounded-lg flex flex-col items-center justify-center ${sev.bg} ring-1 ${sev.ring}`}
  //         >
  //           <span className={`text-xs font-bold leading-none ${sev.text}`}>
  //             {job.reportCount}
  //           </span>

  //           <span className={`text-[8px] font-medium ${sev.text}`}>
  //             reports
  //           </span>
  //         </div>

  //         {/* Job information */}
  //         <div className="min-w-0 flex-1">
  //           <div className="flex items-start justify-between gap-2">
  //             <p className="text-xs font-semibold text-slate-900 leading-4 line-clamp-2">
  //               {job.title}
  //             </p>

  //             <span className="shrink-0 text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
  //               {job.jobTypeLabel}
  //             </span>
  //           </div>

  //           {/* Company */}
  //           <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 min-w-0">
  //             <Building2 className="w-3 h-3 shrink-0" />

  //             <span className="truncate">
  //               {job.companyName}
  //             </span>
  //           </div>

  //           {/* Priority */}
  //           <div
  //             className={`flex items-center gap-1 mt-1 text-[10px] font-medium ${sev.text}`}
  //           >
  //             <span
  //               className={`w-1.5 h-1.5 rounded-full shrink-0 ${sev.dot}`}
  //             />

  //             <span>{sev.label} priority</span>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Buttons */}
  //       <div className="flex gap-2 mt-3">
  //   <button
  //     onClick={() => onDismiss(job.id)}
  //     className="inline-flex items-center justify-center gap-1 text-[10px] font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
  //   >
  //     <ShieldOff className="w-3 h-3" />
  //     Dismiss
  //   </button>

  //   <button
  //     onClick={() => onRemove(job.id)}
  //     className="inline-flex items-center justify-center gap-1 text-[10px] font-medium px-2.5 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
  //   >
  //     <Trash2 className="w-3 h-3" />
  //     Remove
  //   </button>
  // </div>
  //       {/* <div className="flex gap-2 mt-3">
  //         <button
  //           onClick={() => onDismiss(job.id)}
  //           className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] font-medium px-2 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
  //         >
  //           <ShieldOff className="w-3 h-3" />
  //           Dismiss
  //         </button>

  //         <button
  //           onClick={() => onRemove(job.id)}
  //           className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] font-medium px-2 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
  //         >
  //           <Trash2 className="w-3 h-3" />
  //           Remove
  //         </button>
  //       </div> */}
  //     </div>
  //   );
  //   return (
  //     <div className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors">
  //       <div className={`w-10 h-10 shrink-0 rounded-lg flex flex-col items-center justify-center ${sev.bg} ring-1 ${sev.ring}`}>
  //         <span className={`text-sm font-bold leading-none ${sev.text}`}>{job.reportCount}</span>
  //         <span className={`text-[9px] font-medium ${sev.text}`}>reports</span>
  //       </div>

  //       <div className="min-w-0 flex-1">
  //         <div className="flex items-center gap-2">
  //           <p className="text-sm font-semibold text-slate-900 truncate">{job.title}</p>
  //           <span className="shrink-0 text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
  //             {job.jobTypeLabel}
  //           </span>
  //         </div>
  //         <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
  //           <span className="flex items-center gap-1 truncate">
  //             <Building2 className="w-3 h-3 shrink-0" /> {job.companyName}
  //           </span>
  //           <span className={`flex items-center gap-1 font-medium ${sev.text}`}>
  //             <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} /> {sev.label} priority
  //           </span>
  //         </div>
  //       </div>

  //       <div className="flex items-center gap-2 shrink-0">
  //         <button
  //           onClick={() => onDismiss(job.id)}
  //           className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
  //         >
  //           <ShieldOff className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Dismiss</span>
  //         </button>
  //         <button
  //           onClick={() => onRemove(job.id)}
  //           className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
  //         >
  //           <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Remove</span>
  //         </button>
  //       </div>
  //     </div>
  //   );
}

type Props = {
  companies: DashboardCompany[];
  jobs: PendingJobs[];
  totalJobs: number;
  totalCompanies: number;
};
export default function ActionPending({
  companies,
  jobs,
  totalCompanies,
  totalJobs,
}: Props) {
  const [tab, setTab] = useState(totalCompanies ? 'companies' : 'jobs');
 
useEffect(() => {
  if (totalCompanies > 0) {
    setTab('companies');
  } else if (totalJobs > 0) {
    setTab('jobs');
  }
}, [totalCompanies, totalJobs]);
  console.log('pending companies from action pending ', companies);
  console.log('pending jobs from action pending ', jobs);

  const navigate = useNavigate();

  const sortedJobs = useMemo(
    () => [...jobs].sort((a, b) => b.reportCount - a.reportCount),
    [jobs]
  );

  const tabs = [
    {
      key: 'companies',
      label: 'Company approvals',
      icon: Building2,
      count: companies.length,
    },
    { key: 'jobs', label: 'Reported jobs', icon: Flag, count: jobs.length },
  ];
  if (!companies.length && !jobs.length)
    return (
      <div className="w-full bg-violet-50 rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-slate-900">
              Action pending
            </h2>

            <p className="text-xs text-slate-500 mt-0.5">
              Items waiting on a decision
            </p>
          </div>

          <button
            onClick={() => navigate('/admin/pendings')}
            className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-700 text-white hover:bg-indigo-600"
          >
            View All ({totalCompanies + totalJobs})
          </button>
        </div>
        <EmptyState icon={ListTodo} label="No  Pending Activities " />
      </div>
    );

  return (
    <div className="w-full bg-violet-50 rounded-2xl border border-slate-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="min-w-0">
          <h2 className="text-base font-semibold text-slate-900">
            Action pending
          </h2>

          <p className="text-xs text-slate-500 mt-0.5">
            Items waiting on a decision
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/pendings')}
          className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-700 text-white hover:bg-indigo-600"
        >
          View All ({totalCompanies + totalJobs})
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-indigo-200/60 rounded-xl mb-4 w-fit max-w-full overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.key;

          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                active
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-indigo-500 hover:text-indigo-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />

              <span>{t.label}</span>

              <span
                className={`ml-1 text-[10px] font-semibold px-1.5 rounded-full ${
                  active
                    ? 'bg-indigo-700 text-white'
                    : 'bg-indigo-300/70 text-indigo-600'
                }`}
              >
                {t.key === 'companies' ? totalCompanies : totalJobs}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 w-full">
        {tab === 'companies' &&
          (companies.length === 0 ? (
            <EmptyState
              icon={Building2}
              label="No company registrations waiting for review"
            />
          ) : (
            companies.map((c) => <CompanyRow key={c.id} company={c} />)
          ))}

        {tab === 'jobs' &&
          (sortedJobs.length === 0 ? (
            <EmptyState icon={Inbox} label="No reported jobs to handle" />
          ) : (
            sortedJobs.map((j) => <JobRow key={j.id} job={j} />)
          ))}
      </div>
    </div>
  );
}
