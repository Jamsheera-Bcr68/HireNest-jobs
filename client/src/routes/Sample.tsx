// import React, { useState, useCallback } from "react";
// import {
//   Building2,
//   Globe,
//   Calendar,
//   Briefcase,
//   Users,
//   FileText,
//   FileX,
//   Linkedin,
//   Twitter,
//   Facebook,
//   Instagram,
//   Youtube,
//   Link2,
//   CheckCircle2,
//   XCircle,
//   Clock,
//   AlertTriangle,
//   ShieldCheck,
//   ShieldQuestion,
//   ArrowLeft,
//   ExternalLink,
//   RotateCcw,
//   Search,
//   Eye,
//   MapPin,
//   Inbox,
// } from "lucide-react";

// /* ------------------------------------------------------------------ *
//  *  Helpers
//  * ------------------------------------------------------------------ */

// const hasValue = (value) => {
//   if (value === null || value === undefined) return false;
//   if (typeof value === "string") return value.trim().length > 0;
//   return true;
// };

// const hasItems = (arr) => Array.isArray(arr) && arr.length > 0;

// /** Normalizes a possibly protocol-less URL so it never opens broken. */
// const normalizeUrl = (url) => {
//   if (!hasValue(url)) return null;
//   const trimmed = url.trim();
//   if (/^https?:\/\//i.test(trimmed)) return trimmed;
//   return `https://${trimmed}`;
// };

// /** Safe date formatter — never renders "Invalid Date". */
// const formatDate = (input) => {
//   if (!hasValue(input)) return null;
//   const date = new Date(input);
//   if (Number.isNaN(date.getTime())) return null;
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };

// /** Address composer — never leaves a dangling comma. */
// const formatAddress = (address) => {
//   const country = address?.country;
//   const state = address?.state;
//   if (hasValue(state) && hasValue(country)) return `${state}, ${country}`;
//   if (hasValue(state)) return state;
//   if (hasValue(country)) return country;
//   return null;
// };

// const STATUS_CONFIG = {
//   approved: {
//     label: "Approved",
//     icon: CheckCircle2,
//     className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
//     dot: "bg-emerald-500",
//   },
//   pending: {
//     label: "Pending Review",
//     icon: Clock,
//     className: "bg-amber-50 text-amber-700 ring-amber-600/20",
//     dot: "bg-amber-500",
//   },
//   rejected: {
//     label: "Rejected",
//     icon: XCircle,
//     className: "bg-rose-50 text-rose-700 ring-rose-600/20",
//     dot: "bg-rose-500",
//   },
//   suspended: {
//     label: "Suspended",
//     icon: ShieldQuestion,
//     className: "bg-slate-100 text-slate-600 ring-slate-500/20",
//     dot: "bg-slate-400",
//   },
// };

// const getStatusConfig = (status) =>
//   STATUS_CONFIG[status?.toLowerCase?.()] ?? {
//     label: "Unknown",
//     icon: AlertTriangle,
//     className: "bg-slate-100 text-slate-500 ring-slate-400/20",
//     dot: "bg-slate-400",
//   };

// const SOCIAL_ICON_MAP = {
//   linkedIn: { icon: Linkedin, label: "LinkedIn" },
//   twitter: { icon: Twitter, label: "Twitter" },
//   facebook: { icon: Facebook, label: "Facebook" },
//   instagram: { icon: Instagram, label: "Instagram" },
//   youtube: { icon: Youtube, label: "YouTube" },
// };

// /* ------------------------------------------------------------------ *
//  *  Small shared UI primitives
//  * ------------------------------------------------------------------ */

// function SectionCard({ title, action, children, className = "" }) {
//   return (
//     <section
//       className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 ${className}`}
//     >
//       {title && (
//         <div className="mb-4 flex items-center justify-between">
//           <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
//             {title}
//           </h3>
//           {action}
//         </div>
//       )}
//       {children}
//     </section>
//   );
// }

// function CompactEmptyState({ icon: Icon = Inbox, text }) {
//   return (
//     <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-400">
//       <Icon className="h-4 w-4 shrink-0" />
//       <span>{text}</span>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const { label, icon: Icon, className } = getStatusConfig(status);
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${className}`}
//     >
//       <Icon className="h-3.5 w-3.5" />
//       {label}
//     </span>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Logo with graceful image fallback (no layout shift)
//  * ------------------------------------------------------------------ */

// function CompanyLogo({ logoUrl, companyName, size = 72 }) {
//   const [errored, setErrored] = useState(false);
//   const showFallback = !hasValue(logoUrl) || errored;
//   const altText = hasValue(companyName)
//     ? `${companyName} logo`
//     : "Company logo";

//   return (
//     <div
//       className="flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 to-slate-700 ring-1 ring-black/5"
//       style={{ width: size, height: size }}
//     >
//       {showFallback ? (
//         <Building2 className="h-8 w-8 text-white/90" />
//       ) : (
//         <img
//           src={logoUrl}
//           alt={altText}
//           onError={() => setErrored(true)}
//           className="h-full w-full object-cover"
//         />
//       )}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Website
//  * ------------------------------------------------------------------ */

// function WebsiteField({ website }) {
//   const normalized = normalizeUrl(website);
//   return (
//     <div>
//       <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//         Website
//       </p>
//       {normalized ? (
//         <a
//           href={normalized}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
//         >
//           {website}
//           <ExternalLink className="h-3.5 w-3.5" />
//         </a>
//       ) : (
//         <p className="mt-0.5 text-sm text-slate-400">Not provided</p>
//       )}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Social links
//  * ------------------------------------------------------------------ */

// function SocialLinks({ socialMediaLinks }) {
//   const entries = Object.entries(SOCIAL_ICON_MAP).filter(([key]) =>
//     hasValue(socialMediaLinks?.[key])
//   );

//   if (entries.length === 0) {
//     return (
//       <SectionCard title="Social Links">
//         <CompactEmptyState icon={Link2} text="No social links provided." />
//       </SectionCard>
//     );
//   }

//   return (
//     <SectionCard title="Social Links">
//       <div className="flex flex-wrap gap-2">
//         {entries.map(([key, { icon: Icon, label }]) => {
//           const href = normalizeUrl(socialMediaLinks[key]);
//           return (
//             <a
//               key={key}
//               href={href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
//             >
//               <Icon className="h-4 w-4" />
//               {label}
//             </a>
//           );
//         })}
//       </div>
//     </SectionCard>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Benefits
//  * ------------------------------------------------------------------ */

// function BenefitsSection({ benefits }) {
//   if (!hasItems(benefits)) {
//     return (
//       <SectionCard title="Benefits">
//         <CompactEmptyState text="No benefits have been provided." />
//       </SectionCard>
//     );
//   }
//   return (
//     <SectionCard title="Benefits">
//       <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//         {benefits.filter(hasValue).map((benefit, i) => (
//           <li
//             key={`${benefit}-${i}`}
//             className="flex items-start gap-2 text-sm text-slate-600"
//           >
//             <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
//             {benefit}
//           </li>
//         ))}
//       </ul>
//     </SectionCard>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Document
//  * ------------------------------------------------------------------ */

// function DocumentSection({ document, onViewDocument }) {
//   const hasFile = hasValue(document?.file);
//   const hasType = hasValue(document?.type);

//   if (!document || (!hasFile && !hasType)) {
//     return (
//       <SectionCard title="Company Document">
//         <CompactEmptyState icon={FileX} text="No company document available." />
//       </SectionCard>
//     );
//   }

//   return (
//     <SectionCard title="Company Document">
//       <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
//             <FileText className="h-5 w-5" />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-slate-800">
//               {hasType ? document.type : "Company Document"}
//             </p>
//             {!hasFile && (
//               <p className="text-xs text-slate-400">
//                 Document file is not available.
//               </p>
//             )}
//           </div>
//         </div>
//         {hasFile && (
//           <button
//             type="button"
//             onClick={() => onViewDocument?.(document.file)}
//             className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
//           >
//             <Eye className="h-3.5 w-3.5" />
//             View Document
//           </button>
//         )}
//       </div>
//     </SectionCard>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Reapplication timeline
//  * ------------------------------------------------------------------ */

// function ReapplicationTimeline({ reapplyDetails, reapplyCount }) {
//   const items = Array.isArray(reapplyDetails) ? reapplyDetails : [];

//   return (
//     <SectionCard
//       title="Reapplication History"
//       action={
//         hasValue(reapplyCount) && (
//           <span className="text-xs font-medium text-slate-400">
//             {reapplyCount} attempt{reapplyCount === 1 ? "" : "s"}
//           </span>
//         )
//       }
//     >
//       {items.length === 0 ? (
//         <CompactEmptyState text="No reapplication history available." />
//       ) : (
//         <ol className="space-y-4">
//           {items.map((item, i) => {
//             const { label, icon: Icon, dot } = getStatusConfig(item?.status);
//             const date = formatDate(item?.date);
//             return (
//               <li key={i} className="relative flex gap-3 pl-1">
//                 <div className="flex flex-col items-center">
//                   <span className={`mt-1 h-2.5 w-2.5 rounded-full ${dot}`} />
//                   {i < items.length - 1 && (
//                     <span className="mt-1 w-px flex-1 bg-slate-200" />
//                   )}
//                 </div>
//                 <div className="pb-4">
//                   <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
//                     <Icon className="h-3.5 w-3.5" />
//                     {label}
//                   </div>
//                   <p className="text-xs text-slate-400">
//                     {date ?? "Date unavailable"}
//                   </p>
//                   {hasValue(item?.reason) && (
//                     <p className="mt-1 text-sm text-slate-600">
//                       {item.reason}
//                     </p>
//                   )}
//                 </div>
//               </li>
//             );
//           })}
//         </ol>
//       )}
//     </SectionCard>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Rejection reason (status-aware)
//  * ------------------------------------------------------------------ */

// function RejectionReasonSection({ status, reasonForReject }) {
//   const isRejected = status?.toLowerCase?.() === "rejected";
//   if (!isRejected) return null;

//   return (
//     <SectionCard title="Rejection Reason">
//       {hasValue(reasonForReject) ? (
//         <p className="rounded-xl bg-rose-50 p-3.5 text-sm text-rose-700">
//           {reasonForReject}
//         </p>
//       ) : (
//         <CompactEmptyState text="No rejection reason recorded." />
//       )}
//     </SectionCard>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Statistics
//  * ------------------------------------------------------------------ */

// function StatCard({ icon: Icon, label, value }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-4">
//       <div className="flex items-center gap-2 text-slate-400">
//         <Icon className="h-4 w-4" />
//         <span className="text-xs font-medium uppercase tracking-wide">
//           {label}
//         </span>
//       </div>
//       <p className="mt-2 text-2xl font-semibold text-slate-800">
//         {value !== undefined ? value : "—"}
//       </p>
//     </div>
//   );
// }

// function StatisticsGrid({ totalJobs, totalApps, totalInterviews, hiredCount }) {
//   const stats = [
//     { key: "totalJobs", icon: Briefcase, label: "Total Jobs", value: totalJobs },
//     { key: "totalApps", icon: FileText, label: "Applications", value: totalApps },
//     { key: "totalInterviews", icon: Users, label: "Interviews", value: totalInterviews },
//     { key: "hiredCount", icon: CheckCircle2, label: "Hired", value: hiredCount },
//   ];

//   const anyAvailable = stats.some((s) => s.value !== undefined);
//   if (!anyAvailable) return null;

//   return (
//     <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
//       {stats.map((s) => (
//         <StatCard key={s.key} icon={s.icon} label={s.label} value={s.value} />
//       ))}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Skeleton (loading state) — mirrors real layout, responsive
//  * ------------------------------------------------------------------ */

// function Skeleton({ className = "" }) {
//   return <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} />;
// }

// function CompanyDetailsSkeleton() {
//   return (
//     <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
//       {/* Header skeleton */}
//       <div className="mb-6 flex items-center gap-3">
//         <Skeleton className="h-9 w-9 rounded-full" />
//         <Skeleton className="h-5 w-40" />
//       </div>

//       {/* Hero skeleton */}
//       <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:p-6">
//         <Skeleton className="h-[72px] w-[72px] shrink-0 rounded-2xl" />
//         <div className="flex-1 space-y-2.5">
//           <Skeleton className="h-5 w-56" />
//           <Skeleton className="h-3.5 w-72" />
//           <Skeleton className="h-3.5 w-40" />
//         </div>
//       </div>

//       {/* Statistics skeleton */}
//       <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
//         {[0, 1, 2, 3].map((i) => (
//           <Skeleton key={i} className="h-[86px] w-full rounded-2xl" />
//         ))}
//       </div>

//       {/* Main + review skeleton */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//         <div className="space-y-4 lg:col-span-2">
//           <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-5">
//             <Skeleton className="h-4 w-full" />
//             <Skeleton className="h-4 w-5/6" />
//             <Skeleton className="h-4 w-2/3" />
//           </div>
//           <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-5">
//             <Skeleton className="h-4 w-1/2" />
//             <Skeleton className="h-4 w-3/4" />
//           </div>
//         </div>
//         <div className="space-y-4">
//           <div className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-5">
//             <Skeleton className="h-4 w-full" />
//             <Skeleton className="h-4 w-full" />
//             <Skeleton className="h-4 w-2/3" />
//           </div>
//           <Skeleton className="h-24 w-full rounded-2xl" />
//           <Skeleton className="h-10 w-full rounded-xl" />
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Error & Not found states
//  * ------------------------------------------------------------------ */

// function ErrorState({ onRetry, onBack }) {
//   return (
//     <div className="flex min-h-[60vh] items-center justify-center px-4">
//       <div className="flex max-w-sm flex-col items-center text-center">
//         <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
//           <AlertTriangle className="h-7 w-7" />
//         </div>
//         <h2 className="text-lg font-semibold text-slate-800">
//           Unable to load company details
//         </h2>
//         <p className="mt-1.5 text-sm text-slate-500">
//           We couldn&apos;t retrieve this company&apos;s information. Please try
//           again.
//         </p>
//         <div className="mt-5 flex items-center gap-3">
//           {onRetry && (
//             <button
//               type="button"
//               onClick={onRetry}
//               className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
//             >
//               <RotateCcw className="h-4 w-4" />
//               Try Again
//             </button>
//           )}
//           {onBack && (
//             <button
//               type="button"
//               onClick={onBack}
//               className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
//             >
//               Back to Companies
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function NotFoundState({ onBack }) {
//   return (
//     <div className="flex min-h-[60vh] items-center justify-center px-4">
//       <div className="flex max-w-sm flex-col items-center text-center">
//         <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
//           <Search className="h-7 w-7" />
//         </div>
//         <h2 className="text-lg font-semibold text-slate-800">
//           Company Not Found
//         </h2>
//         <p className="mt-1.5 text-sm text-slate-500">
//           The company you&apos;re looking for doesn&apos;t exist or is no
//           longer available.
//         </p>
//         {onBack && (
//           <button
//             type="button"
//             onClick={onBack}
//             className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Companies
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Main component
//  * ------------------------------------------------------------------ *
//  *
//  * Props:
//  *  - company: object | null | undefined — the company payload (see shape below)
//  *  - isLoading: boolean
//  *  - error: any (truthy => API error state)
//  *  - onRetry(): void — re-fetch handler, wired to the error state's "Try Again"
//  *  - onBack(): void — navigation handler back to the companies list
//  *  - onApprove(companyId): void — optional, shown only if provided and status is pending
//  *  - onReject(companyId): void — optional, shown only if provided and status is pending
//  *  - onViewDocument(fileUrl): void — optional handler for the "View Document" button
//  *
//  * Expected `company` shape (all fields except companyName/status considered
//  * potentially missing/empty and are defensively handled throughout):
//  *
//  * {
//  *   id: string,
//  *   companyName: string,
//  *   status: "approved" | "pending" | "rejected" | "suspended",
//  *   logoUrl?: string,
//  *   about?: string,
//  *   website?: string,
//  *   joinedAt?: string,
//  *   address?: { country?: string, state?: string },
//  *   benefits?: string[],
//  *   socialMediaLinks?: { linkedIn?, twitter?, facebook?, instagram?, youtube? },
//  *   document?: { type?: string, file?: string },
//  *   reasonForReject?: string,
//  *   reapplyCount?: number,
//  *   reapplyDetails?: { status: string, date: string, reason?: string }[],
//  *   totalJobs?: number,
//  *   hiredCount?: number,
//  *   totalApps?: number,
//  *   totalInterviews?: number,
//  * }
//  * ------------------------------------------------------------------ */

// export function CompanyDetailsPage({
//   company,
//   isLoading = false,
//   error = null,
//   onRetry,
//   onBack,
//   onApprove,
//   onReject,
//   onViewDocument,
// }) {
//   const handleRetry = useCallback(() => onRetry?.(), [onRetry]);

//   if (isLoading) return <CompanyDetailsSkeleton />;
//   if (error) return <ErrorState onRetry={handleRetry} onBack={onBack} />;
//   if (!company) return <NotFoundState onBack={onBack} />;

//   const {
//     companyName,
//     status,
//     logoUrl,
//     about,
//     website,
//     joinedAt,
//     address,
//     benefits,
//     socialMediaLinks,
//     document,
//     reasonForReject,
//     reapplyCount,
//     reapplyDetails,
//     totalJobs,
//     hiredCount,
//     totalApps,
//     totalInterviews,
//     id,
//   } = company;

//   const joinedLabel = formatDate(joinedAt);
//   const addressLabel = formatAddress(address);
//   const isPending = status?.toLowerCase?.() === "pending";

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-6 flex items-center gap-3">
//           {onBack && (
//             <button
//               type="button"
//               onClick={onBack}
//               aria-label="Back to companies"
//               className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100"
//             >
//               <ArrowLeft className="h-4 w-4" />
//             </button>
//           )}
//           <h1 className="text-base font-semibold text-slate-800">
//             Company Details
//           </h1>
//         </div>

//         {/* Hero */}
//         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div className="flex items-center gap-4">
//               <CompanyLogo logoUrl={logoUrl} companyName={companyName} />
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
//                   {hasValue(companyName) ? companyName : "Unnamed Company"}
//                 </h2>
//                 <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
//                   {addressLabel && (
//                     <span className="inline-flex items-center gap-1">
//                       <MapPin className="h-3.5 w-3.5" />
//                       {addressLabel}
//                     </span>
//                   )}
//                   {joinedLabel && (
//                     <span className="inline-flex items-center gap-1">
//                       <Calendar className="h-3.5 w-3.5" />
//                       Joined {joinedLabel}
//                     </span>
//                   )}
//                   {!addressLabel && !joinedLabel && <span>Location not provided</span>}
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center gap-2 self-start sm:self-center">
//               <StatusBadge status={status} />
//             </div>
//           </div>
//         </div>

//         {/* Statistics */}
//         <div className="mb-6">
//           <StatisticsGrid
//             totalJobs={totalJobs}
//             totalApps={totalApps}
//             totalInterviews={totalInterviews}
//             hiredCount={hiredCount}
//           />
//         </div>

//         {/* Content grid */}
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {/* Main column */}
//           <div className="space-y-6 lg:col-span-2">
//             <SectionCard title="About Company">
//               {hasValue(about) ? (
//                 <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
//                   {about}
//                 </p>
//               ) : (
//                 <CompactEmptyState text="No company description provided." />
//               )}
//             </SectionCard>

//             <SectionCard title="Company Information">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <WebsiteField website={website} />
//                 <div>
//                   <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                     Location
//                   </p>
//                   <p className="mt-0.5 text-sm text-slate-700">
//                     {addressLabel ?? (
//                       <span className="text-slate-400">Location not provided</span>
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </SectionCard>

//             <BenefitsSection benefits={benefits} />
//             <SocialLinks socialMediaLinks={socialMediaLinks} />
//           </div>

//           {/* Review column */}
//           <div className="space-y-6">
//             <RejectionReasonSection status={status} reasonForReject={reasonForReject} />
//             <ReapplicationTimeline
//               reapplyDetails={reapplyDetails}
//               reapplyCount={reapplyCount}
//             />
//             <DocumentSection document={document} onViewDocument={onViewDocument} />

//             {isPending && (onApprove || onReject) && (
//               <SectionCard>
//                 <div className="flex gap-3">
//                   {onApprove && (
//                     <button
//                       type="button"
//                       onClick={() => onApprove(id)}
//                       className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
//                     >
//                       <ShieldCheck className="h-4 w-4" />
//                       Approve
//                     </button>
//                   )}
//                   {onReject && (
//                     <button
//                       type="button"
//                       onClick={() => onReject(id)}
//                       className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
//                     >
//                       <XCircle className="h-4 w-4" />
//                       Reject
//                     </button>
//                   )}
//                 </div>
//               </SectionCard>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ *
//  *  Sample data covering every state the page needs to handle:
//  *  full data, partial/missing fields, all-optional-fields-empty,
//  *  pending with reapply history, loading, error, and not-found.
//  * ------------------------------------------------------------------ */

// const SCENARIOS = {
//   full: {
//     label: "Full data",
//     company: {
//       id: "c1",
//       companyName: "Northwind Robotics",
//       status: "approved",
//       logoUrl:
//         "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=200&fit=crop",
//       about:
//         "Northwind Robotics builds autonomous warehouse systems for mid-size logistics providers. Founded in 2019, the team has shipped over 300 robotic units across North America.",
//       website: "northwindrobotics.com",
//       joinedAt: "2024-02-11",
//       address: { state: "Kerala", country: "India" },
//       benefits: ["Flexible working", "Health insurance", "Learning budget", "Remote stipend"],
//       socialMediaLinks: {
//         linkedIn: "linkedin.com/company/northwind",
//         twitter: "twitter.com/northwind",
//       },
//       document: { type: "Business Registration", file: "https://example.com/doc.pdf" },
//       reasonForReject: null,
//       reapplyCount: 0,
//       reapplyDetails: [],
//       totalJobs: 24,
//       totalApps: 184,
//       totalInterviews: 32,
//       hiredCount: 8,
//     },
//   },

//   partial: {
//     label: "Partial data (mixed missing fields)",
//     company: {
//       id: "c2",
//       companyName: "Aster & Loom",
//       status: "pending",
//       logoUrl: null,
//       about: "",
//       website: null,
//       joinedAt: "2025-08-01",
//       address: { state: "", country: "India" },
//       benefits: [],
//       socialMediaLinks: { linkedIn: "linkedin.com/company/asterloom" },
//       document: { type: "", file: "" },
//       reasonForReject: null,
//       reapplyCount: 1,
//       reapplyDetails: [
//         { status: "rejected", date: "2026-09-10", reason: "Missing registration document" },
//       ],
//       totalJobs: 3,
//       totalApps: undefined,
//       totalInterviews: 0,
//       hiredCount: undefined,
//     },
//   },

//   emptyEverything: {
//     label: "Rejected, all optional fields empty",
//     company: {
//       id: "c3",
//       companyName: "Fenwick Textiles",
//       status: "rejected",
//       logoUrl: null,
//       about: null,
//       website: null,
//       joinedAt: null,
//       address: {},
//       benefits: [],
//       socialMediaLinks: {},
//       document: null,
//       reasonForReject: "",
//       reapplyCount: 0,
//       reapplyDetails: [],
//       totalJobs: undefined,
//       totalApps: undefined,
//       totalInterviews: undefined,
//       hiredCount: undefined,
//     },
//   },

//   // This is the scenario that shows a populated Reapplication History timeline
//   pendingReview: {
//     label: "Pending, needs admin action (has reapply history)",
//     company: {
//       id: "c4",
//       companyName: "Cobalt Health Systems",
//       status: "pending",
//       logoUrl:
//         "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop",
//       about: "Cobalt builds scheduling software for outpatient clinics.",
//       website: "cobalthealthsystems.io",
//       joinedAt: "2026-09-01",
//       address: { state: "Karnataka", country: "India" },
//       benefits: ["Health insurance"],
//       socialMediaLinks: {},
//       document: { type: "Business License", file: "https://example.com/license.pdf" },
//       reasonForReject: null,
//       reapplyCount: 2,
//       reapplyDetails: [
//         { status: "rejected", date: "2026-07-14", reason: "Invalid license number" },
//         { status: "rejected", date: "2026-08-20", reason: "Document expired" },
//         { status: "pending", date: "2026-09-15" },
//       ],
//       totalJobs: 0,
//       totalApps: 0,
//       totalInterviews: 0,
//       hiredCount: 0,
//     },
//   },

//   loading: { label: "Loading state", company: null, isLoading: true },
//   error: { label: "API error state", company: null, error: true },
//   notFound: { label: "Not found state", company: null },
// };

// /* ------------------------------------------------------------------ *
//  *  Demo wrapper — swap the <select> for your real router/data-fetch
//  *  logic. This just proves out every prop CompanyDetailsPage accepts.
//  * ------------------------------------------------------------------ */

// export default function CompanyDetailsDemo() {
//   const [scenarioKey, setScenarioKey] = useState("pendingReview");
//   const scenario = SCENARIOS[scenarioKey];

//   return (
//     <div>
//       <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
//         <label className="mr-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
//           Scenario
//         </label>
//         <select
//           value={scenarioKey}
//           onChange={(e) => setScenarioKey(e.target.value)}
//           className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700"
//         >
//           {Object.entries(SCENARIOS).map(([key, s]) => (
//             <option key={key} value={key}>
//               {s.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <CompanyDetailsPage
//         company={scenario.company}
//         isLoading={!!scenario.isLoading}
//         error={scenario.error ? "Network error" : null}
//         onRetry={() => console.log("onRetry fired")}
//         onBack={() => console.log("onBack fired")}
//         onApprove={(id) => console.log("onApprove fired for", id)}
//         onReject={(id) => console.log("onReject fired for", id)}
//         onViewDocument={(file) => console.log("onViewDocument fired:", file)}
//       />
//     </div>
//   );
// }

