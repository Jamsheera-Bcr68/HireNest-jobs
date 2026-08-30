// import React, { useState, useMemo } from "react";
// import {
//   RefreshCw,
//   Search,
//   ChevronDown,
//   Flag,
//   Building2,
//   ShieldAlert,
//   UserCheck,
//   MoreHorizontal,
//   CheckCircle2,
//   XCircle,
//   Eye,
//   ClipboardList,
//   ListChecks,
// } from "lucide-react";

// // ---------------------------------------------------------------------------
// // Mock data
// // ---------------------------------------------------------------------------

// const reportedJobs = [
//   {
//     id: "rj-1",
//     type: "reportedJob",
//     title: "Senior React Developer",
//     company: "TechNova Solutions",
//     reports: 3,
//     reason: "Misleading job description",
//     date: "Aug 20, 2026",
//     severity: "High",
//     status: "Pending review",
//   },
//   {
//     id: "rj-2",
//     type: "reportedJob",
//     title: "Backend Engineer (Node.js)",
//     company: "Bluewave Systems",
//     reports: 1,
//     reason: "Suspected duplicate posting",
//     date: "Aug 19, 2026",
//     severity: "Low",
//     status: "Pending review",
//   },
//   {
//     id: "rj-3",
//     type: "reportedJob",
//     title: "Marketing Intern",
//     company: "Fernhill Media",
//     reports: 5,
//     reason: "Unpaid / exploitative terms",
//     date: "Aug 18, 2026",
//     severity: "Medium",
//     status: "Under investigation",
//   },
// ];

// const companyRegistrations = [
//   {
//     id: "cr-1",
//     type: "companyRegistration",
//     company: "Nova Technologies",
//     industry: "Information Technology",
//     email: "hr@novatech.io",
//     date: "Aug 20, 2026",
//     status: "Pending",
//   },
//   {
//     id: "cr-2",
//     type: "companyRegistration",
//     company: "Meridian Health Group",
//     industry: "Healthcare",
//     email: "careers@meridianhealth.com",
//     date: "Aug 19, 2026",
//     status: "Pending",
//   },
//   {
//     id: "cr-3",
//     type: "companyRegistration",
//     company: "Coastline Logistics",
//     industry: "Transportation",
//     email: "admin@coastlinelogistics.com",
//     date: "Aug 17, 2026",
//     status: "Documents requested",
//   },
// ];

// const otherActivities = [
//   {
//     id: "oa-1",
//     type: "jobApproval",
//     title: "Job approval request",
//     subtitle: "Product Designer",
//     meta: "Aurora Labs · Submitted Aug 20, 2026",
//     status: "Pending",
//   },
//   {
//     id: "oa-2",
//     type: "suspiciousAccount",
//     title: "Suspicious account activity",
//     subtitle: "Recruiter account #48213",
//     meta: "Flagged for unusual posting pattern · Aug 19, 2026",
//     status: "Flagged",
//   },
//   {
//     id: "oa-3",
//     type: "profileVerification",
//     title: "Profile verification request",
//     subtitle: "Anita Kulkarni",
//     meta: "ID document submitted · Aug 18, 2026",
//     status: "Pending",
//   },
// ];

// // ---------------------------------------------------------------------------
// // Small presentational helpers
// // ---------------------------------------------------------------------------

// const severityStyles = {
//   Low: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
//   Medium: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
//   High: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
// };

// const statusStyles = {
//   "Pending review": "bg-slate-100 text-slate-600",
//   "Under investigation": "bg-orange-50 text-orange-700",
//   Pending: "bg-slate-100 text-slate-600",
//   "Documents requested": "bg-blue-50 text-blue-700",
//   Flagged: "bg-red-50 text-red-700",
// };

// function Badge({ children, className = "" }) {
//   return (
//     <span
//       className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${className}`}
//     >
//       {children}
//     </span>
//   );
// }

// function IconTile({ icon: Icon, tint }) {
//   return (
//     <div
//       className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tint}`}
//     >
//       <Icon className="h-5 w-5" strokeWidth={1.8} />
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Page header
// // ---------------------------------------------------------------------------

// function PageHeader({ onRefresh, refreshing }) {
//   return (
//     <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//       <div>
//         <nav className="mb-2 text-sm text-slate-400">
//           <span>Admin</span>
//           <span className="mx-1.5">/</span>
//           <span className="text-slate-500">Pending Activities</span>
//         </nav>
//         <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
//           Pending Activities
//         </h1>
//         <p className="mt-1 text-sm text-slate-500">
//           Review and take action on activities that require your attention.
//         </p>
//       </div>

//       <button
//         type="button"
//         onClick={onRefresh}
//         className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-md"
//       >
//         <RefreshCw
//           className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
//           strokeWidth={1.8}
//         />
//         Refresh
//       </button>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Summary cards
// // ---------------------------------------------------------------------------

// function SummaryCardSkeleton() {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5">
//       <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
//       <div className="mt-4 h-6 w-12 animate-pulse rounded bg-slate-100" />
//       <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
//       <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-100" />
//     </div>
//   );
// }

// function SummaryCard({ icon: Icon, tint, count, label, sub }) {
//   return (
//     <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
//       <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
//         <Icon className="h-5 w-5" strokeWidth={1.8} />
//       </div>
//       <p className="mt-4 text-2xl font-semibold text-slate-900">{count}</p>
//       <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
//       <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
//     </div>
//   );
// }

// function PendingSummaryCards({ loading, counts }) {
//   if (loading) {
//     return (
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         {Array.from({ length: 4 }).map((_, i) => (
//           <SummaryCardSkeleton key={i} />
//         ))}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//       <SummaryCard
//         icon={ClipboardList}
//         tint="bg-indigo-50 text-indigo-600"
//         count={counts.total}
//         label="Total Pending"
//         sub="Across all categories"
//       />
//       <SummaryCard
//         icon={Flag}
//         tint="bg-red-50 text-red-600"
//         count={counts.reportedJobs}
//         label="Reported Jobs"
//         sub="Awaiting moderation"
//       />
//       <SummaryCard
//         icon={Building2}
//         tint="bg-blue-50 text-blue-600"
//         count={counts.companies}
//         label="Company Registrations"
//         sub="Awaiting approval"
//       />
//       <SummaryCard
//         icon={ListChecks}
//         tint="bg-amber-50 text-amber-600"
//         count={counts.other}
//         label="Other Requests"
//         sub="Misc. moderation tasks"
//       />
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Tabs + filters
// // ---------------------------------------------------------------------------

// function PendingTabs({ active, onChange, counts }) {
//   const tabs = [
//     { key: "all", label: "All", count: counts.total },
//     { key: "reportedJob", label: "Reported Jobs", count: counts.reportedJobs },
//     { key: "companyRegistration", label: "Company Registrations", count: counts.companies },
//     { key: "other", label: "Other", count: counts.other },
//   ];

//   return (
//     <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
//       {tabs.map((tab) => {
//         const isActive = active === tab.key;
//         return (
//           <button
//             key={tab.key}
//             type="button"
//             onClick={() => onChange(tab.key)}
//             className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
//               isActive
//                 ? "bg-indigo-50 text-indigo-700"
//                 : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
//             }`}
//           >
//             {tab.label}
//             <span
//               className={`rounded-full px-1.5 py-0.5 text-xs ${
//                 isActive ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
//               }`}
//             >
//               {tab.count}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

// function PendingFilters({ search, onSearch, severity, onSeverity, sort, onSort }) {
//   return (
//     <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
//       <div className="relative flex-1">
//         <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => onSearch(e.target.value)}
//           placeholder="Search by title, company, or requester..."
//           className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
//         />
//       </div>

//       <div className="relative">
//         <select
//           value={severity}
//           onChange={(e) => onSeverity(e.target.value)}
//           className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 sm:w-44"
//         >
//           <option value="all">All statuses</option>
//           <option value="Low">Severity: Low</option>
//           <option value="Medium">Severity: Medium</option>
//           <option value="High">Severity: High</option>
//         </select>
//         <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//       </div>

//       <div className="relative">
//         <select
//           value={sort}
//           onChange={(e) => onSort(e.target.value)}
//           className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 sm:w-44"
//         >
//           <option value="newest">Sort: Newest</option>
//           <option value="oldest">Sort: Oldest</option>
//         </select>
//         <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
//       </div>
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Activity list + card
// // ---------------------------------------------------------------------------

// const typeMeta = {
//   reportedJob: { icon: Flag, tint: "bg-red-50 text-red-600", kicker: "Job reported" },
//   companyRegistration: {
//     icon: Building2,
//     tint: "bg-blue-50 text-blue-600",
//     kicker: "Company registration",
//   },
//   jobApproval: {
//     icon: ClipboardList,
//     tint: "bg-amber-50 text-amber-600",
//     kicker: "Job approval request",
//   },
//   suspiciousAccount: {
//     icon: ShieldAlert,
//     tint: "bg-red-50 text-red-600",
//     kicker: "Suspicious account",
//   },
//   profileVerification: {
//     icon: UserCheck,
//     tint: "bg-emerald-50 text-emerald-600",
//     kicker: "Profile verification",
//   },
// };

// function PendingActivityCard({ item }) {
//   const meta = typeMeta[item.type];
//   const Icon = meta.icon;

//   let primaryLabel = "";
//   let secondaryLine = "";
//   let metaLine = "";
//   let badge = null;
//   let primaryAction = "Review";
//   let secondaryActions = [];

//   if (item.type === "reportedJob") {
//     primaryLabel = item.title;
//     secondaryLine = item.company;
//     metaLine = `${item.reports} report${item.reports > 1 ? "s" : ""} · ${item.reason} · ${item.date}`;
//     badge = <Badge className={severityStyles[item.severity]}>{item.severity}</Badge>;
//     secondaryActions = ["Dismiss report", "Take action"];
//   } else if (item.type === "companyRegistration") {
//     primaryLabel = item.company;
//     secondaryLine = item.industry;
//     metaLine = `${item.email} · Submitted ${item.date}`;
//     badge = <Badge className={statusStyles[item.status]}>{item.status}</Badge>;
//     primaryAction = "Review";
//     secondaryActions = ["Approve", "Reject"];
//   } else {
//     primaryLabel = item.subtitle;
//     secondaryLine = item.title;
//     metaLine = item.meta;
//     badge = <Badge className={statusStyles[item.status] || "bg-slate-100 text-slate-600"}>{item.status}</Badge>;
//   }

//   return (
//     <div className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:p-5">
//       <div className="flex items-start gap-3 sm:items-center">
//         <IconTile icon={Icon} tint={meta.tint} />
//         <div className="min-w-0 sm:hidden">
//           <p className="text-xs font-medium text-slate-400">{meta.kicker}</p>
//         </div>
//       </div>

//       <div className="min-w-0 flex-1">
//         <p className="hidden text-xs font-medium text-slate-400 sm:block">{meta.kicker}</p>
//         <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">{primaryLabel}</p>
//         <p className="truncate text-sm text-slate-500">{secondaryLine}</p>
//         <p className="mt-1 truncate text-xs text-slate-400">{metaLine}</p>
//       </div>

//       <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-4">
//         {badge}

//         <div className="flex items-center gap-2">
//           {item.type === "companyRegistration" ? (
//             <>
//               <button
//                 type="button"
//                 className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
//               >
//                 <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2} />
//                 Approve
//               </button>
//               <button
//                 type="button"
//                 className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
//               >
//                 <Eye className="h-3.5 w-3.5" strokeWidth={2} />
//                 Review
//               </button>
//             </>
//           ) : (
//             <button
//               type="button"
//               className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
//             >
//               <Eye className="h-3.5 w-3.5" strokeWidth={2} />
//               {primaryAction}
//             </button>
//           )}

//           <button
//             type="button"
//             aria-label="More options"
//             className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
//           >
//             <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ActivityCardSkeleton() {
//   return (
//     <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center">
//       <div className="h-10 w-10 shrink-0 animate-pulse rounded-xl bg-slate-100" />
//       <div className="flex-1 space-y-2">
//         <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
//         <div className="h-4 w-48 animate-pulse rounded bg-slate-100" />
//         <div className="h-3 w-64 animate-pulse rounded bg-slate-100" />
//       </div>
//       <div className="flex gap-2">
//         <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-100" />
//         <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-100" />
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
//       <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
//         <CheckCircle2 className="h-7 w-7 text-emerald-500" strokeWidth={1.8} />
//       </div>
//       <h3 className="mt-4 text-base font-semibold text-slate-900">All caught up!</h3>
//       <p className="mt-1 max-w-sm text-sm text-slate-500">
//         There are no pending activities requiring your attention.
//       </p>
//     </div>
//   );
// }

// function PendingActivityList({ loading, items }) {
//   if (loading) {
//     return (
//       <div className="space-y-4">
//         {Array.from({ length: 4 }).map((_, i) => (
//           <ActivityCardSkeleton key={i} />
//         ))}
//       </div>
//     );
//   }

//   if (items.length === 0) {
//     return <EmptyState />;
//   }

//   return (
//     <div className="space-y-4">
//       {items.map((item) => (
//         <PendingActivityCard key={item.id} item={item} />
//       ))}
//     </div>
//   );
// }

// // ---------------------------------------------------------------------------
// // Page
// // ---------------------------------------------------------------------------

// export default function PendingActivitiesContainer() {
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("all");
//   const [search, setSearch] = useState("");
//   const [severity, setSeverity] = useState("all");
//   const [sort, setSort] = useState("newest");

//   const allItems = useMemo(
//     () => [...reportedJobs, ...companyRegistrations, ...otherActivities],
//     []
//   );

//   const counts = {
//     total: allItems.length,
//     reportedJobs: reportedJobs.length,
//     companies: companyRegistrations.length,
    
//   };

//   const filteredItems = useMemo(() => {
//     let items = allItems;

//     if (activeTab === "reportedJob") {
//       items = items.filter((i) => i.type === "reportedJob");
//     } else if (activeTab === "companyRegistration") {
//       items = items.filter((i) => i.type === "companyRegistration");
//     } else if (activeTab === "other") {
//       items = items.filter(
//         (i) => !["reportedJob", "companyRegistration"].includes(i.type)
//       );
//     }

//     if (severity !== "all") {
//       items = items.filter((i) => i.severity === severity);
//     }

//     if (search.trim()) {
//       const q = search.trim().toLowerCase();
//       items = items.filter((i) =>
//         [i.title, i.company, i.subtitle, i.email, i.reason]
//           .filter(Boolean)
//           .some((field) => field.toLowerCase().includes(q))
//       );
//     }

//     return items;
//   }, [allItems, activeTab, severity, search]);

//   const handleRefresh = () => {
//     setLoading(true);
//     setTimeout(() => setLoading(false), 900);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
//         <PageHeader onRefresh={handleRefresh} refreshing={loading} />

//         <div className="mt-6">
//           <PendingSummaryCards loading={loading} counts={counts} />
//         </div>

//         <div className="mt-8 space-y-4">
//           <PendingTabs active={activeTab} onChange={setActiveTab} counts={counts} />
//           <PendingFilters
//             search={search}
//             onSearch={setSearch}
//             severity={severity}
//             onSeverity={setSeverity}
//             sort={sort}
//             onSort={setSort}
//           />
//         </div>

//         <div className="mt-6">
//           <PendingActivityList loading={loading} items={filteredItems} />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useMemo } from "react";
import {
  RefreshCw,
  Search,
  ChevronDown,
  Flag,
  Building2,
  ShieldAlert,
  UserCheck,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Eye,
  ClipboardList,
  ListChecks,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const reportedJobs = [
  {
    id: "rj-1",
    type: "reportedJob",
    title: "Senior React Developer",
    company: "TechNova Solutions",
    reports: 3,
    reason: "Misleading job description",
    date: "Aug 20, 2026",
    severity: "High",
    status: "Pending review",
  },
  {
    id: "rj-2",
    type: "reportedJob",
    title: "Backend Engineer (Node.js)",
    company: "Bluewave Systems",
    reports: 1,
    reason: "Suspected duplicate posting",
    date: "Aug 19, 2026",
    severity: "Low",
    status: "Pending review",
  },
  {
    id: "rj-3",
    type: "reportedJob",
    title: "Marketing Intern",
    company: "Fernhill Media",
    reports: 5,
    reason: "Unpaid / exploitative terms",
    date: "Aug 18, 2026",
    severity: "Medium",
    status: "Under investigation",
  },
];

const companyRegistrations = [
  {
    id: "cr-1",
    type: "companyRegistration",
    company: "Nova Technologies",
    industry: "Information Technology",
    email: "hr@novatech.io",
    date: "Aug 20, 2026",
    status: "Pending",
  },
  {
    id: "cr-2",
    type: "companyRegistration",
    company: "Meridian Health Group",
    industry: "Healthcare",
    email: "careers@meridianhealth.com",
    date: "Aug 19, 2026",
    status: "Pending",
  },
  {
    id: "cr-3",
    type: "companyRegistration",
    company: "Coastline Logistics",
    industry: "Transportation",
    email: "admin@coastlinelogistics.com",
    date: "Aug 17, 2026",
    status: "Documents requested",
  },
];

const otherActivities = [
  {
    id: "oa-1",
    type: "jobApproval",
    title: "Job approval request",
    subtitle: "Product Designer",
    meta: "Aurora Labs · Submitted Aug 20, 2026",
    status: "Pending",
  },
  {
    id: "oa-2",
    type: "suspiciousAccount",
    title: "Suspicious account activity",
    subtitle: "Recruiter account #48213",
    meta: "Flagged for unusual posting pattern · Aug 19, 2026",
    status: "Flagged",
  },
  {
    id: "oa-3",
    type: "profileVerification",
    title: "Profile verification request",
    subtitle: "Anita Kulkarni",
    meta: "ID document submitted · Aug 18, 2026",
    status: "Pending",
  },
];

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

const severityStyles = {
  Low: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Medium: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  High: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
};

const statusStyles = {
  "Pending review": "bg-slate-100 text-slate-600",
  "Under investigation": "bg-orange-50 text-orange-700",
  Pending: "bg-slate-100 text-slate-600",
  "Documents requested": "bg-blue-50 text-blue-700",
  Flagged: "bg-red-50 text-red-700",
};

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${className}`}
    >
      {children}
    </span>
  );
}

function IconTile({ icon: Icon, tint }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tint}`}
    >
      <Icon className="h-5 w-5" strokeWidth={1.8} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page header
// ---------------------------------------------------------------------------

function PageHeader({ onRefresh, refreshing }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <nav className="mb-2 text-sm text-slate-400">
          <span>Admin</span>
          <span className="mx-1.5">/</span>
          <span className="text-slate-500">Pending Activities</span>
        </nav>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Pending Activities
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Review and take action on activities that require your attention.
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:text-slate-900 hover:shadow-md"
      >
        <RefreshCw
          className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
          strokeWidth={1.8}
        />
        Refresh
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Summary cards
// ---------------------------------------------------------------------------

function SummaryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
      <div className="mt-4 h-6 w-12 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-24 animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-32 animate-pulse rounded bg-slate-100" />
    </div>
  );
}

function SummaryCard({ icon: Icon, tint, count, label, sub }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <p className="mt-4 text-2xl font-semibold text-slate-900">{count}</p>
      <p className="mt-1 text-sm font-medium text-slate-700">{label}</p>
      <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function PendingSummaryCards({ loading, counts }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SummaryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        icon={ClipboardList}
        tint="bg-indigo-50 text-indigo-600"
        count={counts.total}
        label="Total Pending"
        sub="Across all categories"
      />
      <SummaryCard
        icon={Flag}
        tint="bg-red-50 text-red-600"
        count={counts.reportedJobs}
        label="Reported Jobs"
        sub="Awaiting moderation"
      />
      <SummaryCard
        icon={Building2}
        tint="bg-blue-50 text-blue-600"
        count={counts.companies}
        label="Company Registrations"
        sub="Awaiting approval"
      />
      <SummaryCard
        icon={ListChecks}
        tint="bg-amber-50 text-amber-600"
        count={counts.other}
        label="Other Requests"
        sub="Misc. moderation tasks"
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tabs + filters
// ---------------------------------------------------------------------------

function PendingTabs({ active, onChange, counts }) {
  const tabs = [
    { key: "all", label: "All", count: counts.total },
    { key: "reportedJob", label: "Reported Jobs", count: counts.reportedJobs },
    { key: "companyRegistration", label: "Company Registrations", count: counts.companies },
    { key: "other", label: "Other", count: counts.other },
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs ${
                isActive ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PendingFilters({ search, onSearch, severity, onSeverity, sort, onSort }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by title, company, or requester..."
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300"
        />
      </div>

      <div className="relative">
        <select
          value={severity}
          onChange={(e) => onSeverity(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 sm:w-44"
        >
          <option value="all">All statuses</option>
          <option value="Low">Severity: Low</option>
          <option value="Medium">Severity: Medium</option>
          <option value="High">Severity: High</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => onSort(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 sm:w-44"
        >
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Activity list + card
// ---------------------------------------------------------------------------

const typeMeta = {
  reportedJob: { icon: Flag, tint: "bg-red-50 text-red-600", kicker: "Job reported" },
  companyRegistration: {
    icon: Building2,
    tint: "bg-blue-50 text-blue-600",
    kicker: "Company registration",
  },
  jobApproval: {
    icon: ClipboardList,
    tint: "bg-amber-50 text-amber-600",
    kicker: "Job approval request",
  },
  suspiciousAccount: {
    icon: ShieldAlert,
    tint: "bg-red-50 text-red-600",
    kicker: "Suspicious account",
  },
  profileVerification: {
    icon: UserCheck,
    tint: "bg-emerald-50 text-emerald-600",
    kicker: "Profile verification",
  },
};

function getRowContent(item) {
  const meta = typeMeta[item.type];

  if (item.type === "reportedJob") {
    return {
      meta,
      primaryLabel: item.title,
      secondaryLine: item.company,
      detailLine: item.reason,
      dateLine: item.date,
      countLine: `${item.reports} report${item.reports > 1 ? "s" : ""}`,
      badge: <Badge className={severityStyles[item.severity]}>{item.severity}</Badge>,
      primaryAction: "Review",
    };
  }

  if (item.type === "companyRegistration") {
    return {
      meta,
      primaryLabel: item.company,
      secondaryLine: item.industry,
      detailLine: item.email,
      dateLine: `Submitted ${item.date}`,
      countLine: null,
      badge: <Badge className={statusStyles[item.status]}>{item.status}</Badge>,
      primaryAction: "Review",
      isRegistration: true,
    };
  }

  const [detailLine, dateLine] = item.meta.split(" · ").reduce(
    (acc, part, idx, arr) => {
      if (idx === arr.length - 1) acc[1] = part;
      else acc[0] = acc[0] ? `${acc[0]} · ${part}` : part;
      return acc;
    },
    ["", ""]
  );

  return {
    meta,
    primaryLabel: item.subtitle,
    secondaryLine: item.title,
    detailLine,
    dateLine,
    countLine: null,
    badge: (
      <Badge className={statusStyles[item.status] || "bg-slate-100 text-slate-600"}>
        {item.status}
      </Badge>
    ),
    primaryAction: "Review",
  };
}

function PendingActivityRow({ item, index }) {
  const {
    meta,
    primaryLabel,
    secondaryLine,
    detailLine,
    dateLine,
    countLine,
    badge,
    primaryAction,
    isRegistration,
  } = getRowContent(item);
  const Icon = meta.icon;

  return (
    <tr
      className={`transition-colors duration-150 hover:bg-slate-50 ${
        index % 2 === 1 ? "bg-slate-50/40" : "bg-white"
      }`}
    >
      <td className="border border-slate-200 px-4 py-3 align-middle">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 shrink-0 ${meta.tint.split(" ")[1]}`} strokeWidth={1.8} />
          <span className="text-sm text-slate-600">{meta.kicker}</span>
        </div>
      </td>

      <td className="border border-slate-200 px-4 py-3 align-middle">
        <p className="text-sm font-semibold text-slate-900">{primaryLabel}</p>
        <p className="text-xs text-slate-500">{secondaryLine}</p>
      </td>

      <td className="border border-slate-200 px-4 py-3 align-middle text-sm text-slate-500">
        {detailLine}
      </td>

      <td className="border border-slate-200 px-4 py-3 align-middle text-sm text-slate-500">
        <div className="flex flex-col">
          <span>{dateLine}</span>
          {countLine && <span className="text-xs text-slate-400">{countLine}</span>}
        </div>
      </td>

      <td className="border border-slate-200 px-4 py-3 align-middle">{badge}</td>

      <td className="border border-slate-200 px-4 py-3 align-middle">
        <div className="flex items-center gap-2">
          {isRegistration ? (
            <button
              type="button"
              aria-label="Approve"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-emerald-600 transition-colors hover:bg-emerald-50"
            >
              <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
            </button>
          ) : null}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            <Eye className="h-3.5 w-3.5" strokeWidth={2} />
            {primaryAction}
          </button>
          <button
            type="button"
            aria-label="More options"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <MoreHorizontal className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function ActivityRowSkeleton() {
  return (
    <tr>
      <td className="border border-slate-200 px-4 py-3">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="border border-slate-200 px-4 py-3">
        <div className="space-y-2">
          <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
        </div>
      </td>
      <td className="border border-slate-200 px-4 py-3">
        <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="border border-slate-200 px-4 py-3">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
      </td>
      <td className="border border-slate-200 px-4 py-3">
        <div className="h-5 w-16 animate-pulse rounded-full bg-slate-100" />
      </td>
      <td className="border border-slate-200 px-4 py-3">
        <div className="flex gap-2">
          <div className="h-8 w-16 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-100" />
        </div>
      </td>
    </tr>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 className="h-7 w-7 text-emerald-500" strokeWidth={1.8} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">All caught up!</h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        There are no pending activities requiring your attention.
      </p>
    </div>
  );
}

function PendingActivityList({ loading, items }) {
  if (!loading && items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[900px] border-collapse text-left">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Type
            </th>
            <th className="border border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Activity
            </th>
            <th className="border border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Details
            </th>
            <th className="border border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Submitted
            </th>
            <th className="border border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="border border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ActivityRowSkeleton key={i} />)
            : items.map((item, i) => (
                <PendingActivityRow key={item.id} item={item} index={i} />
              ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PendingActivitiesPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("all");
  const [sort, setSort] = useState("newest");

  const allItems = useMemo(
    () => [...reportedJobs, ...companyRegistrations, ...otherActivities],
    []
  );

  const counts = {
    total: allItems.length,
    reportedJobs: reportedJobs.length,
    companies: companyRegistrations.length,
    other: otherActivities.length,
  };

  const filteredItems = useMemo(() => {
    let items = allItems;

    if (activeTab === "reportedJob") {
      items = items.filter((i) => i.type === "reportedJob");
    } else if (activeTab === "companyRegistration") {
      items = items.filter((i) => i.type === "companyRegistration");
    } else if (activeTab === "other") {
      items = items.filter(
        (i) => !["reportedJob", "companyRegistration"].includes(i.type)
      );
    }

    if (severity !== "all") {
      items = items.filter((i) => i.severity === severity);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter((i) =>
        [i.title, i.company, i.subtitle, i.email, i.reason]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(q))
      );
    }

    return items;
  }, [allItems, activeTab, severity, search]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 900);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader onRefresh={handleRefresh} refreshing={loading} />

        <div className="mt-6">
          <PendingSummaryCards loading={loading} counts={counts} />
        </div>

        <div className="mt-8 space-y-4">
          <PendingTabs active={activeTab} onChange={setActiveTab} counts={counts} />
          <PendingFilters
            search={search}
            onSearch={setSearch}
            severity={severity}
            onSeverity={setSeverity}
            sort={sort}
            onSort={setSort}
          />
        </div>

        <div className="mt-6">
          <PendingActivityList loading={loading} items={filteredItems} />
        </div>
      </div>
    </div>
  );
}