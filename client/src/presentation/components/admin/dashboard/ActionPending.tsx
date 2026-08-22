import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Flag,
  MapPin,
  Mail,
  Calendar,
  Check,
  X,
  Trash2,
  ShieldOff,
  ChevronDown,
  Inbox,
} from "lucide-react";
import {type DashboardCompany, type PendingJobs } from "./DashbordContainer";

// ---- Types (for reference, matches your backend shape) --------------------
// export type DashboardCompany = {
//   id: string; name: string; industry: IndustryType; location: string;
//   submittedAt: string; email: string; logoUrl: string;
// };
// export type PendingJobs = {
//   id: string; title: string; type: string; companyName: string;
//   reportCount: number; jobTypeLabel: string;
// };


const bseUrl=import.meta.env.VITE_BACKEND_URL
const mockCompanies = [
  {
    id: "c1",
    name: "Northwind Robotics",
    industry: "Manufacturing",
    location: "Austin, TX",
    submittedAt: "2026-08-17T10:32:00Z",
    email: "hr@northwindrobotics.com",
    logoUrl: "",
  },
  {
    id: "c2",
    name: "Verdant Foods Co.",
    industry: "Food & Beverage",
    location: "Portland, OR",
    submittedAt: "2026-08-18T14:05:00Z",
    email: "careers@verdantfoods.com",
    logoUrl: "",
  },
  {
    id: "c3",
    name: "Halcyon Health",
    industry: "Healthcare",
    location: "Remote",
    submittedAt: "2026-08-19T09:15:00Z",
    email: "talent@halcyonhealth.io",
    logoUrl: "",
  },
];

const mockJobs = [
  {
    id: "j1",
    title: "Senior Backend Engineer",
    type: "full-time",
    companyName: "Quantum Retail",
    reportCount: 5,
    jobTypeLabel: "Full-time",
  },
  {
    id: "j2",
    title: "Warehouse Associate",
    type: "contract",
    companyName: "Fastline Logistics",
    reportCount: 2,
    jobTypeLabel: "Contract",
  },
  {
    id: "j3",
    title: "Marketing Intern",
    type: "internship",
    companyName: "Bright Path Media",
    reportCount: 8,
    jobTypeLabel: "Internship",
  },
];

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function reportSeverity(count) {
  if (count >= 6) return { ring: "ring-red-500/30", text: "text-red-600", bg: "bg-red-50", dot: "bg-red-500", label: "High" };
  if (count >= 3) return { ring: "ring-amber-500/30", text: "text-amber-600", bg: "bg-amber-50", dot: "bg-amber-500", label: "Medium" };
  return { ring: "ring-slate-400/30", text: "text-slate-600", bg: "bg-slate-50", dot: "bg-slate-400", label: "Low" };
}

function EmptyState({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-slate-400" strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-slate-700">All caught up</p>
      <p className="text-sm text-slate-400 mt-0.5">{label}</p>
    </div>
  );
}


type CompanyRowProps={
   company:DashboardCompany
   
}


function CompanyRow({ company}:CompanyRowProps) {
    const navigate=useNavigate()
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="group border border-slate-200 rounded-xl bg-white hover:border-slate-300 transition-colors">
      <div className="flex items-center gap-3 p-3.5">
        <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-semibold overflow-hidden">
          {company.logoUrl ? (
            <img src={`${bseUrl}${company.logoUrl}`} alt="" className="w-full h-full object-cover" />
          ) : (
            initials(company.name)
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-slate-900 truncate">{company.name}</p>
            <span className="shrink-0 text-[11px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
              {company.industry}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-0.5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {company.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {timeAgo(company.submittedAt)}
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
            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
             View
          </button>
        </div>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="sm:hidden shrink-0 w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
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
              onClick={() =>navigate(`/admin/company/${company}`) }
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

type JobRowProps={
  job:PendingJobs
}
function JobRow({ job }:JobRowProps) {
  const sev = reportSeverity(job.reportCount);
  const navigate=useNavigate()
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

        <span className={`text-[8px] font-medium ${sev.text}`}>
          reports
        </span>
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

          <span className="truncate">
            {job.companyName}
          </span>
        </div>

        {/* Priority */}
        <div
          className={`flex items-center gap-1 mt-1 text-[10px] font-medium ${sev.text}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 ${sev.dot}`}
          />

          <span>{sev.label} priority</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2 shrink-0 sm:ml-1">
        <button
          onClick={() => navigate(`/admin/jobs/${job.id}`)}
          className="inline-flex items-center justify-center gap-1 text-[10px] text-white font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-900 hover:bg-slate-600 transition-colors"
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

type Props={
    companies:DashboardCompany[]
    jobs:PendingJobs[]
}
export default function ActionPending({
  companies ,
  jobs ,
  // onApproveCompany = (id) => console.log("approve", id),
  // onRejectCompany = (id) => console.log("reject", id),
  // onDismissReport = (id) => console.log("dismiss", id),
  // onRemoveJob = (id) => console.log("remove", id),
}:Props) {
  const [tab, setTab] = useState("companies");
  const [companyList, setCompanyList] = useState(companies);
  const [jobList, setJobList] = useState(jobs);

  // const handleApprove = (id) => {
  //   onApproveCompany(id);
  //   setCompanyList((prev) => prev.filter((c) => c.id !== id));
  // };
  // const handleReject = (id) => {
  //   onRejectCompany(id);
  //   setCompanyList((prev) => prev.filter((c) => c.id !== id));
  // };
  // const handleDismiss = (id) => {
  //   onDismissReport(id);
  //   setJobList((prev) => prev.filter((j) => j.id !== id));
  // };
  // const handleRemove = (id) => {
  //   onRemoveJob(id);
  //   setJobList((prev) => prev.filter((j) => j.id !== id));
  // };

  const sortedJobs = useMemo(
    () => [...jobList].sort((a, b) => b.reportCount - a.reportCount),
    [jobList]
  );

  const tabs = [
    { key: "companies", label: "Company approvals", icon: Building2, count: companyList.length },
    { key: "jobs", label: "Reported jobs", icon: Flag, count: jobList.length },
  ];

  
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

      <span className="shrink-0 text-xs font-medium px-2.5 py-1 rounded-full bg-slate-900 text-white">
        {companyList.length + jobList.length} total
      </span>
    </div>

    {/* Tabs */}
    <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-xl mb-4 w-fit max-w-full overflow-x-auto">
      {tabs.map((t) => {
        const Icon = t.icon;
        const active = tab === t.key;

        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              active
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />

            <span>{t.label}</span>

            <span
              className={`ml-1 text-[10px] font-semibold px-1.5 rounded-full ${
                active
                  ? "bg-slate-900 text-white"
                  : "bg-slate-300/70 text-slate-600"
              }`}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>

    {/* Content */}
    <div className="flex flex-col gap-2 w-full">
      {tab === "companies" &&
        (companyList.length === 0 ? (
          <EmptyState
            icon={Building2}
            label="No company registrations waiting for review"
          />
        ) : (
          companyList.map((c) => (
            <CompanyRow
              key={c.id}
              company={c}
            
            />
          ))
        ))}

      {tab === "jobs" &&
        (sortedJobs.length === 0 ? (
          <EmptyState
            icon={Inbox}
            label="No reported jobs to handle"
          />
        ) : (
          sortedJobs.map((j) => (
            <JobRow
              key={j.id}
              job={j}
              // onDismiss={handleDismiss}
              // onRemove={handleRemove}
            />
          ))
        ))}
    </div>
  </div>
);

//   return (
//     <div className="w-full max-w-3xl bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h2 className="text-base font-semibold text-slate-900">Action pending</h2>
//           <p className="text-xs text-slate-500 mt-0.5">Items waiting on a decision</p>
//         </div>
//         <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-900 text-white">
//           {companyList.length + jobList.length} total
//         </span>
//       </div>

//       <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded-xl mb-4 w-fit">
//         {tabs.map((t) => {
//           const Icon = t.icon;
//           const active = tab === t.key;
//           return (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
//                 active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
//               }`}
//             >
//               <Icon className="w-3.5 h-3.5" />
//               {t.label}
//               <span
//                 className={`ml-1 text-[10px] font-semibold px-1.5 rounded-full ${
//                   active ? "bg-slate-900 text-white" : "bg-slate-300/70 text-slate-600"
//                 }`}
//               >
//                 {t.count}
//               </span>
//             </button>
//           );
//         })}
//       </div>

//       <div className="flex flex-col gap-2">
//         {tab === "companies" &&
//           (companyList.length === 0 ? (
//             <EmptyState icon={Building2} label="No company registrations waiting for review" />
//           ) : (
//             companyList.map((c) => (
//               <CompanyRow key={c.id} company={c} onApprove={handleApprove} onReject={handleReject} />
//             ))
//           ))}

//         {tab === "jobs" &&
//           (sortedJobs.length === 0 ? (
//             <EmptyState icon={Inbox} label="No reported jobs to handle" />
//           ) : (
//             sortedJobs.map((j) => (
//               <JobRow key={j.id} job={j} onDismiss={handleDismiss} onRemove={handleRemove} />
//             ))
//           ))}
//       </div>
//     </div>
//   );
}
