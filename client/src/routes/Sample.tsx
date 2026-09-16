import React, { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  Building2,
  Briefcase,
  Users,
  ClipboardList,
  Star,
  CalendarClock,
  AlertCircle,
  CalendarCheck,
  CalendarPlus,
  Hourglass,
  XCircle,
  ArrowRight,
  Sparkles,
  Eye,
  FileText,
  CalendarDays,
  Video,
  MapPin,
  Phone,
  CalendarX2,
  Workflow,
  MapPinned,
  Sparkle,
  CheckCircle2,
  History,
  BellRing,
} from "lucide-react";

// ============================================================================
// HireNest — Company Dashboard (single-file version)
// ============================================================================
// Everything a recruiter needs at first login, in one file:
//   Header → Overview stats → Needs Your Attention → Recent Applications
//   → Recent Activity → Upcoming Interviews → Hiring Pipeline
//   → Active Job Openings (summary cards, not full management) → Reminders
//
// Deliberately excludes deep management flows (editing a job, running an
// interview, full application review) — those belong on their own pages.
// Buttons here (`onManageJob`, `onViewInterview`, etc.) are hooks to navigate
// into those pages from your router.
//
// Swap `mockDashboardData` for a real API response — types are designed to
// match a typical REST payload shape 1:1.
// ============================================================================

// ---- Types ------------------------------------------------------------------

type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "shortlisted"
  | "interview_scheduled"
  | "interview_completed"
  | "hired"
  | "rejected"
  | "withdrawn";

type JobStatus = "active" | "closing_soon" | "paused" | "closed";
type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";
type WorkMode = "Remote" | "Hybrid" | "On-site";
type InterviewType = "Online" | "Offline" | "Phone Screen";
type InterviewStatus = "upcoming" | "today" | "completed" | "missed" | "cancelled";

interface Candidate {
  id: string;
  name: string;
  avatarInitials: string;
  avatarColor: string; // tailwind gradient classes
}

interface JobOpening {
  id: string;
  title: string;
  vacancies: number;
  totalApplicants: number;
  newApplicants: number;
  deadline: string; // ISO date
  jobType: JobType;
  workMode: WorkMode;
  status: JobStatus;
}

interface Application {
  id: string;
  candidate: Candidate;
  jobTitle: string;
  jobId: string;
  appliedAt: string; // ISO datetime
  status: ApplicationStatus;
}

interface Interview {
  id: string;
  candidate: Candidate;
  jobTitle: string;
  date: string; // ISO date
  time: string;
  type: InterviewType;
  location?: string;
  status: InterviewStatus;
}

type AttentionItemKind =
  | "new_applications"
  | "needs_scheduling"
  | "interview_today"
  | "deadline_approaching"
  | "interview_missed";

interface AttentionItem {
  id: string;
  kind: AttentionItemKind;
  title: string;
  subtitle: string;
  meta?: string;
  actionLabel: string;
  urgent?: boolean;
}

interface PipelineStage {
  key: ApplicationStatus;
  label: string;
  count: number;
}

interface ActivityEvent {
  id: string;
  description: string;
  timestamp: string;
}

interface HiringOverviewStats {
  activeJobs: number;
  totalApplicants: number;
  pendingApplications: number;
  shortlisted: number;
  upcomingInterviews: number;
}

export interface DashboardData {
  companyName: string;
  overview: HiringOverviewStats;
  attentionItems: AttentionItem[];
  recentApplications: Application[];
  upcomingInterviews: Interview[];
  pipeline: PipelineStage[];
  activeJobs: JobOpening[];
  recentActivity: ActivityEvent[];
}

// ---- Mock data (replace with API response) ----------------------------------

export const mockDashboardData: DashboardData = {
  companyName: "Nimbus Technologies",

  overview: {
    activeJobs: 5,
    totalApplicants: 62,
    pendingApplications: 12,
    shortlisted: 8,
    upcomingInterviews: 4,
  },

  attentionItems: [
    {
      id: "att-1",
      kind: "new_applications",
      title: "5 new applications need review",
      subtitle: "React Developer",
      meta: "Received today",
      actionLabel: "Review applications",
      urgent: true,
    },
    {
      id: "att-2",
      kind: "interview_today",
      title: "1 interview is scheduled today",
      subtitle: "Sarah Thomas — React Developer",
      meta: "3:00 PM",
      actionLabel: "View interview",
      urgent: true,
    },
    {
      id: "att-3",
      kind: "needs_scheduling",
      title: "2 shortlisted candidates need interview scheduling",
      subtitle: "Backend Developer",
      actionLabel: "Schedule now",
    },
    {
      id: "att-4",
      kind: "deadline_approaching",
      title: "React Developer applications close in 3 days",
      subtitle: "24 applicants so far",
      meta: "Deadline: Sep 25",
      actionLabel: "View job",
    },
    {
      id: "att-5",
      kind: "interview_missed",
      title: "1 interview was missed",
      subtitle: "Michael Chen — UI Developer",
      meta: "Yesterday, 11:00 AM",
      actionLabel: "Reschedule",
    },
  ],

  recentApplications: [
    { id: "app-1", candidate: { id: "c1", name: "Alex Johnson", avatarInitials: "AJ", avatarColor: "from-fuchsia-500 to-purple-600" }, jobTitle: "React Developer", jobId: "job-1", appliedAt: "2026-09-15T09:50:00", status: "pending" },
    { id: "app-2", candidate: { id: "c2", name: "Rahul Kumar", avatarInitials: "RK", avatarColor: "from-indigo-500 to-blue-600" }, jobTitle: "Backend Developer", jobId: "job-2", appliedAt: "2026-09-15T09:00:00", status: "shortlisted" },
    { id: "app-3", candidate: { id: "c3", name: "Anu Thomas", avatarInitials: "AT", avatarColor: "from-rose-500 to-fuchsia-600" }, jobTitle: "UI Developer", jobId: "job-3", appliedAt: "2026-09-15T07:30:00", status: "reviewed" },
    { id: "app-4", candidate: { id: "c4", name: "Priya Nair", avatarInitials: "PN", avatarColor: "from-amber-500 to-orange-600" }, jobTitle: "React Developer", jobId: "job-1", appliedAt: "2026-09-14T16:10:00", status: "pending" },
    { id: "app-5", candidate: { id: "c5", name: "David Wilson", avatarInitials: "DW", avatarColor: "from-emerald-500 to-teal-600" }, jobTitle: "DevOps Engineer", jobId: "job-4", appliedAt: "2026-09-14T13:45:00", status: "interview_scheduled" },
    { id: "app-6", candidate: { id: "c6", name: "Meera Pillai", avatarInitials: "MP", avatarColor: "from-fuchsia-500 to-purple-600" }, jobTitle: "Backend Developer", jobId: "job-2", appliedAt: "2026-09-14T10:20:00", status: "rejected" },
  ],

  upcomingInterviews: [
    { id: "int-1", candidate: { id: "c7", name: "Sarah Thomas", avatarInitials: "ST", avatarColor: "from-fuchsia-500 to-purple-600" }, jobTitle: "React Developer", date: "2026-09-15", time: "3:00 PM", type: "Online", status: "today" },
    { id: "int-2", candidate: { id: "c8", name: "John Mathew", avatarInitials: "JM", avatarColor: "from-indigo-500 to-blue-600" }, jobTitle: "Backend Developer", date: "2026-09-16", time: "11:30 AM", type: "Online", status: "upcoming" },
    { id: "int-3", candidate: { id: "c9", name: "Fathima Rasheed", avatarInitials: "FR", avatarColor: "from-rose-500 to-fuchsia-600" }, jobTitle: "UI Developer", date: "2026-09-17", time: "2:00 PM", type: "Offline", location: "Nimbus HQ, 4th Floor", status: "upcoming" },
    { id: "int-4", candidate: { id: "c10", name: "Karthik Iyer", avatarInitials: "KI", avatarColor: "from-amber-500 to-orange-600" }, jobTitle: "DevOps Engineer", date: "2026-09-18", time: "10:00 AM", type: "Phone Screen", status: "upcoming" },
  ],

  pipeline: [
    { key: "pending", label: "Pending", count: 24 },
    { key: "reviewed", label: "Reviewed", count: 15 },
    { key: "shortlisted", label: "Shortlisted", count: 8 },
    { key: "interview_scheduled", label: "Interview", count: 4 },
    { key: "hired", label: "Hired", count: 1 },
  ],

  activeJobs: [
    { id: "job-1", title: "React Developer", vacancies: 3, totalApplicants: 24, newApplicants: 5, deadline: "2026-09-25", jobType: "Full-time", workMode: "Hybrid", status: "closing_soon" },
    { id: "job-2", title: "Backend Developer", vacancies: 2, totalApplicants: 15, newApplicants: 3, deadline: "2026-10-02", jobType: "Full-time", workMode: "Remote", status: "active" },
    { id: "job-3", title: "UI Developer", vacancies: 1, totalApplicants: 11, newApplicants: 1, deadline: "2026-10-05", jobType: "Full-time", workMode: "On-site", status: "active" },
  ],

  recentActivity: [
    { id: "act-1", description: "Sarah was shortlisted for React Developer", timestamp: "10 minutes ago" },
    { id: "act-2", description: "Interview scheduled with John Mathew", timestamp: "1 hour ago" },
    { id: "act-3", description: "New application received from Priya Nair", timestamp: "2 hours ago" },
    { id: "act-4", description: "Backend Developer job published", timestamp: "Yesterday" },
  ],
};

// ---- Small shared utils -------------------------------------------------------

function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function timeAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

function formatShortDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysUntil(isoDate: string): number {
  const target = new Date(isoDate).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  return Math.round((target - today) / 86400000);
}

const applicationStatusStyles: Record<ApplicationStatus, { label: string; badgeClass: string; dotClass: string }> = {
  pending: { label: "Pending", badgeClass: "bg-amber-50 text-amber-700 ring-1 ring-amber-200", dotClass: "bg-amber-500" },
  reviewed: { label: "Reviewed", badgeClass: "bg-slate-100 text-slate-700 ring-1 ring-slate-200", dotClass: "bg-slate-500" },
  shortlisted: { label: "Shortlisted", badgeClass: "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-200", dotClass: "bg-fuchsia-500" },
  interview_scheduled: { label: "Interview Scheduled", badgeClass: "bg-purple-50 text-purple-700 ring-1 ring-purple-200", dotClass: "bg-purple-500" },
  interview_completed: { label: "Interview Completed", badgeClass: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200", dotClass: "bg-indigo-500" },
  hired: { label: "Hired", badgeClass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", dotClass: "bg-emerald-500" },
  rejected: { label: "Rejected", badgeClass: "bg-rose-50 text-rose-700 ring-1 ring-rose-200", dotClass: "bg-rose-400" },
  withdrawn: { label: "Withdrawn", badgeClass: "bg-slate-50 text-slate-500 ring-1 ring-slate-200", dotClass: "bg-slate-400" },
};

const jobStatusStyles: Record<JobStatus, { label: string; badgeClass: string }> = {
  active: { label: "Active", badgeClass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
  closing_soon: { label: "Closing Soon", badgeClass: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
  paused: { label: "Paused", badgeClass: "bg-slate-100 text-slate-600 ring-1 ring-slate-200" },
  closed: { label: "Closed", badgeClass: "bg-rose-50 text-rose-600 ring-1 ring-rose-200" },
};

const interviewStatusStyles: Record<InterviewStatus, { label: string; badgeClass: string }> = {
  today: { label: "Today", badgeClass: "bg-fuchsia-50 text-fuchsia-700 ring-1 ring-fuchsia-200" },
  upcoming: { label: "Upcoming", badgeClass: "bg-slate-100 text-slate-600 ring-1 ring-slate-200" },
  completed: { label: "Completed", badgeClass: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
  missed: { label: "Missed", badgeClass: "bg-rose-50 text-rose-600 ring-1 ring-rose-200" },
  cancelled: { label: "Cancelled", badgeClass: "bg-slate-50 text-slate-400 ring-1 ring-slate-200" },
};

// ---- Shared small pieces ------------------------------------------------------

const Avatar: React.FC<{ initials: string; gradientClass: string; size?: "sm" | "md" }> = ({
  initials,
  gradientClass,
  size = "md",
}) => {
  const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white shadow-sm ring-2 ring-white",
        gradientClass,
        sizeClass
      )}
    >
      {initials}
    </div>
  );
};

const EmptyState: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ icon: Icon, title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-50 to-purple-50 ring-1 ring-fuchsia-100">
      <Icon className="h-6 w-6 text-fuchsia-500" strokeWidth={1.75} />
    </div>
    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    <p className="mt-1 max-w-xs text-sm text-slate-500">{description}</p>
    {actionLabel && (
      <button
        onClick={onAction}
        className="mt-4 rounded-xl bg-gradient-to-b from-fuchsia-500 to-fuchsia-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-fuchsia-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-fuchsia-300"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

const shimmer = "animate-pulse bg-slate-100";

const StatCardSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <div className={cn(shimmer, "mb-4 h-10 w-10 rounded-xl")} />
    <div className={cn(shimmer, "mb-2 h-3 w-20 rounded-md")} />
    <div className={cn(shimmer, "mb-2 h-7 w-16 rounded-md")} />
    <div className={cn(shimmer, "h-3 w-24 rounded-md")} />
  </div>
);

const ApplicationRowSkeleton: React.FC = () => (
  <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4">
    <div className={cn(shimmer, "h-10 w-10 rounded-full")} />
    <div className="flex-1 space-y-2">
      <div className={cn(shimmer, "h-3.5 w-32 rounded-md")} />
      <div className={cn(shimmer, "h-3 w-24 rounded-md")} />
    </div>
    <div className={cn(shimmer, "h-6 w-20 rounded-full")} />
  </div>
);

const InterviewCardSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4">
    <div className="mb-3 flex items-center gap-3">
      <div className={cn(shimmer, "h-10 w-10 rounded-full")} />
      <div className="flex-1 space-y-2">
        <div className={cn(shimmer, "h-3.5 w-28 rounded-md")} />
        <div className={cn(shimmer, "h-3 w-20 rounded-md")} />
      </div>
    </div>
    <div className={cn(shimmer, "h-8 w-full rounded-lg")} />
  </div>
);

const JobCardSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-5">
    <div className={cn(shimmer, "mb-3 h-4 w-36 rounded-md")} />
    <div className={cn(shimmer, "mb-2 h-3 w-full rounded-md")} />
    <div className={cn(shimmer, "mb-4 h-3 w-2/3 rounded-md")} />
    <div className={cn(shimmer, "h-8 w-full rounded-lg")} />
  </div>
);

const PipelineStageSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
    <div className={cn(shimmer, "mx-auto mb-2 h-6 w-10 rounded-md")} />
    <div className={cn(shimmer, "mx-auto h-3 w-16 rounded-md")} />
  </div>
);

// ---- Dashboard Header ---------------------------------------------------------

const DashboardHeader: React.FC<{ companyName: string; notificationCount?: number }> = ({
  companyName,
  notificationCount = 0,
}) => (
  <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl">
        {getGreeting()}, <span className="text-fuchsia-600">{companyName}</span>
      </h1>
      <p className="mt-1 text-sm text-slate-500">Here&apos;s an overview of your hiring activity.</p>
    </div>

    <div className="flex items-center gap-3 self-end sm:self-auto">
      <button
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-fuchsia-600 hover:shadow-md"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
        {notificationCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-fuchsia-500 px-1 text-[10px] font-semibold text-white ring-2 ring-white">
            {notificationCount}
          </span>
        )}
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white">
          <Building2 className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <span className="hidden text-sm font-medium text-slate-700 sm:inline">{companyName}</span>
        <ChevronDown className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
      </button>
    </div>
  </header>
);

// ---- Hiring Overview Cards ------------------------------------------------------

interface StatDefinition {
  key: keyof HiringOverviewStats;
  label: string;
  description: string;
  icon: React.ElementType;
}

const STAT_DEFINITIONS: StatDefinition[] = [
  { key: "activeJobs", label: "Active Jobs", description: "Currently hiring", icon: Briefcase },
  { key: "totalApplicants", label: "Total Applicants", description: "Across all openings", icon: Users },
  { key: "pendingApplications", label: "Pending Applications", description: "Needs your review", icon: ClipboardList },
  { key: "shortlisted", label: "Shortlisted", description: "Ready for interview", icon: Star },
  { key: "upcomingInterviews", label: "Upcoming Interviews", description: "Scheduled ahead", icon: CalendarClock },
];

const HiringOverviewCards: React.FC<{ stats: HiringOverviewStats; isLoading?: boolean }> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {STAT_DEFINITIONS.map((s) => (
          <StatCardSkeleton key={s.key} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {STAT_DEFINITIONS.map(({ key, label, description, icon: Icon }) => (
        <div
          key={key}
          className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-fuchsia-50 to-purple-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-50 to-purple-50 ring-1 ring-fuchsia-100">
            <Icon className="h-5 w-5 text-fuchsia-600" strokeWidth={1.75} />
          </div>
          <p className="relative text-[13px] font-medium text-slate-500">{label}</p>
          <p className="relative mt-1 text-2xl font-semibold text-slate-800">{stats[key]}</p>
          <p className="relative mt-0.5 text-xs text-slate-400">{description}</p>
        </div>
      ))}
    </div>
  );
};

// ---- Needs Your Attention -------------------------------------------------------

const KIND_ICON: Record<AttentionItemKind, React.ElementType> = {
  new_applications: AlertCircle,
  needs_scheduling: CalendarPlus,
  interview_today: CalendarCheck,
  deadline_approaching: Hourglass,
  interview_missed: XCircle,
};

const AttentionSection: React.FC<{ items: AttentionItem[] }> = ({ items }) => (
  <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-4 flex items-center gap-2">
      <Sparkles className="h-4 w-4 text-fuchsia-500" strokeWidth={2} />
      <h2 className="text-sm font-semibold text-slate-800">Needs Your Attention</h2>
    </div>

    {items.length === 0 ? (
      <EmptyState icon={Sparkles} title="You're all caught up" description="New hiring tasks will show up here as they come in." />
    ) : (
      <ul className="space-y-3">
        {items.map((item) => {
          const Icon = KIND_ICON[item.kind];
          return (
            <li
              key={item.id}
              className="group flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-fuchsia-100 hover:bg-white hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ring-1",
                    item.urgent ? "bg-fuchsia-50 text-fuchsia-600 ring-fuchsia-100" : "bg-slate-100 text-slate-500 ring-slate-200"
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    {item.subtitle}
                    {item.meta && <span className="text-slate-400"> · {item.meta}</span>}
                  </p>
                </div>
              </div>

              <button className="flex shrink-0 items-center justify-center gap-1.5 self-start rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-fuchsia-600 ring-1 ring-fuchsia-200 transition-all duration-300 hover:bg-fuchsia-50 sm:self-auto">
                {item.actionLabel}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </li>
          );
        })}
      </ul>
    )}
  </section>
);

// ---- Recent Applications ---------------------------------------------------------

const StatusBadge: React.FC<{ status: ApplicationStatus }> = ({ status }) => {
  const style = applicationStatusStyles[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium", style.badgeClass)}>
      <span className={cn("h-1.5 w-1.5 rounded-full", style.dotClass)} />
      {style.label}
    </span>
  );
};

const RecentApplications: React.FC<{
  applications: Application[];
  isLoading?: boolean;
  onView?: (id: string) => void;
}> = ({ applications, isLoading, onView }) => (
  <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-slate-800">Recent Applications</h2>
      <button className="text-xs font-medium text-fuchsia-600 hover:text-fuchsia-700">View all</button>
    </div>

    {isLoading ? (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <ApplicationRowSkeleton key={i} />
        ))}
      </div>
    ) : applications.length === 0 ? (
      <EmptyState icon={FileText} title="No applications yet" description="Applications will appear here when candidates apply to your job openings." />
    ) : (
      <>
        <div className="hidden overflow-hidden rounded-xl border border-slate-100 sm:block">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-medium uppercase tracking-wide text-slate-400">
                <th className="px-4 py-3 font-medium">Candidate</th>
                <th className="px-4 py-3 font-medium">Job Title</th>
                <th className="px-4 py-3 font-medium">Applied</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b border-slate-50 transition-colors duration-200 last:border-0 hover:bg-slate-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar initials={app.candidate.avatarInitials} gradientClass={app.candidate.avatarColor} size="sm" />
                      <span className="font-medium text-slate-800">{app.candidate.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{app.jobTitle}</td>
                  <td className="px-4 py-3 text-slate-500">{timeAgo(app.appliedAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => onView?.(app.id)}
                      aria-label={`View ${app.candidate.name}'s application`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-fuchsia-50 hover:text-fuchsia-600"
                    >
                      <Eye className="h-4 w-4" strokeWidth={1.75} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="space-y-3 sm:hidden">
          {applications.map((app) => (
            <li key={app.id} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition-all duration-200 active:scale-[0.99]">
              <Avatar initials={app.candidate.avatarInitials} gradientClass={app.candidate.avatarColor} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-800">{app.candidate.name}</p>
                <p className="truncate text-xs text-slate-500">{app.jobTitle}</p>
                <p className="mt-1 text-[11px] text-slate-400">{timeAgo(app.appliedAt)}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <StatusBadge status={app.status} />
                <button onClick={() => onView?.(app.id)} className="text-[11px] font-medium text-fuchsia-600">
                  View
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    )}
  </section>
);

// ---- Recent Activity ---------------------------------------------------------

const HiringActivity: React.FC<{ events: ActivityEvent[] }> = ({ events }) => (
  <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-4 flex items-center gap-2">
      <History className="h-4 w-4 text-fuchsia-500" strokeWidth={2} />
      <h2 className="text-sm font-semibold text-slate-800">Recent Activity</h2>
    </div>

    {events.length === 0 ? (
      <EmptyState icon={History} title="No recent activity" description="Hiring updates will show up here as they happen." />
    ) : (
      <ul className="space-y-4">
        {events.map((event, i) => (
          <li key={event.id} className="relative flex gap-3 pl-1">
            <div className="flex flex-col items-center">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fuchsia-50 ring-1 ring-fuchsia-100">
                <CheckCircle2 className="h-3 w-3 text-fuchsia-500" strokeWidth={2} />
              </span>
              {i !== events.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-slate-100" />}
            </div>
            <div className="pb-1">
              <p className="text-sm text-slate-700">{event.description}</p>
              <p className="text-xs text-slate-400">{event.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </section>
);

// ---- Upcoming Interviews ---------------------------------------------------------

const TYPE_ICON: Record<InterviewType, React.ElementType> = {
  Online: Video,
  Offline: MapPin,
  "Phone Screen": Phone,
};

const UpcomingInterviews: React.FC<{
  interviews: Interview[];
  isLoading?: boolean;
  onView?: (id: string) => void;
}> = ({ interviews, isLoading, onView }) => (
  <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-slate-800">Upcoming Interviews</h2>
      <button className="text-xs font-medium text-fuchsia-600 hover:text-fuchsia-700">View all</button>
    </div>

    {isLoading ? (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <InterviewCardSkeleton key={i} />
        ))}
      </div>
    ) : interviews.length === 0 ? (
      <EmptyState icon={CalendarX2} title="No upcoming interviews" description="Scheduled interviews will appear here." />
    ) : (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {interviews.map((interview) => {
          const TypeIcon = TYPE_ICON[interview.type];
          const statusStyle = interviewStatusStyles[interview.status];
          return (
            <div
              key={interview.id}
              className="group flex flex-col rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-100 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <Avatar initials={interview.candidate.avatarInitials} gradientClass={interview.candidate.avatarColor} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{interview.candidate.name}</p>
                    <p className="text-xs text-slate-500">{interview.jobTitle}</p>
                  </div>
                </div>
                <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium", statusStyle.badgeClass)}>
                  {statusStyle.label}
                </span>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
                  {formatShortDate(interview.date)} · {interview.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <TypeIcon className="h-3.5 w-3.5 text-fuchsia-500" strokeWidth={1.75} />
                  {interview.type === "Offline" && interview.location ? interview.location : interview.type}
                </span>
              </div>

              <button
                onClick={() => onView?.(interview.id)}
                className="mt-auto rounded-xl bg-slate-50 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition-all duration-300 group-hover:bg-fuchsia-50 group-hover:text-fuchsia-700 group-hover:ring-fuchsia-200"
              >
                View Interview
              </button>
            </div>
          );
        })}
      </div>
    )}
  </section>
);

// ---- Hiring Pipeline ---------------------------------------------------------

const HiringPipeline: React.FC<{ stages: PipelineStage[]; isLoading?: boolean }> = ({ stages, isLoading }) => {
  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Workflow className="h-4 w-4 text-fuchsia-500" strokeWidth={2} />
        <h2 className="text-sm font-semibold text-slate-800">Hiring Pipeline</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <PipelineStageSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {stages.map((stage, i) => {
            const isLast = i === stages.length - 1;
            const barWidth = Math.max((stage.count / maxCount) * 100, 6);
            return (
              <div
                key={stage.key}
                className="flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
              >
                <p className={cn("text-xl font-semibold", isLast ? "text-fuchsia-600" : "text-slate-800")}>{stage.count}</p>
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">{stage.label}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn("h-full rounded-full", isLast ? "bg-gradient-to-r from-fuchsia-500 to-purple-600" : "bg-fuchsia-300")}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

// ---- Active Job Openings (summary cards) -------------------------------------

const ActiveJobs: React.FC<{
  jobs: JobOpening[];
  isLoading?: boolean;
  onManage?: (id: string) => void;
  onCreateJob?: () => void;
}> = ({ jobs, isLoading, onManage, onCreateJob }) => (
  <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-slate-800">Active Job Openings</h2>
      <button
        onClick={onCreateJob}
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-b from-fuchsia-500 to-fuchsia-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-fuchsia-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
      >
        View All Jobs
      </button>
    </div>

    {isLoading ? (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    ) : jobs.length === 0 ? (
      <EmptyState
        icon={Briefcase}
        title="No active job openings"
        description="Create a job opening to start hiring candidates."
        actionLabel="Create Job"
        onAction={onCreateJob}
      />
    ) : (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => {
          const statusStyle = jobStatusStyles[job.status];
          const remaining = daysUntil(job.deadline);
          return (
            <div
              key={job.id}
              className="flex flex-col rounded-2xl border border-slate-100 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-100 hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-800">{job.title}</h3>
                <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium", statusStyle.badgeClass)}>
                  {statusStyle.label}
                </span>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
                  {job.vacancies} vacanc{job.vacancies === 1 ? "y" : "ies"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPinned className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
                  {job.workMode}
                </span>
                <span>{job.jobType}</span>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50/70 p-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-fuchsia-500" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{job.totalApplicants}</p>
                    <p className="text-[10px] text-slate-400">Applicants</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkle className="h-4 w-4 text-fuchsia-500" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{job.newApplicants}</p>
                    <p className="text-[10px] text-slate-400">New</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
                <CalendarClock className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.75} />
                Deadline: {formatShortDate(job.deadline)}
                {remaining >= 0 && remaining <= 5 && (
                  <span className="font-medium text-amber-600"> · {remaining} day{remaining === 1 ? "" : "s"} left</span>
                )}
              </div>

              <button
                onClick={() => onManage?.(job.id)}
                className="mt-auto rounded-xl bg-slate-50 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition-all duration-300 hover:bg-fuchsia-50 hover:text-fuchsia-700 hover:ring-fuchsia-200"
              >
                Manage Job
              </button>
            </div>
          );
        })}
      </div>
    )}
  </section>
);

// ---- Hiring Reminders ---------------------------------------------------------

interface Reminder {
  id: string;
  text: string;
}

const HiringReminders: React.FC<{ reminders: Reminder[] }> = ({ reminders }) => {
  if (reminders.length === 0) return null;
  return (
    <section className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50/70 to-purple-50/40 p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <BellRing className="h-4 w-4 text-fuchsia-500" strokeWidth={2} />
        <h2 className="text-sm font-semibold text-slate-800">Hiring Reminders</h2>
      </div>
      <ul className="space-y-2">
        {reminders.map((r) => (
          <li key={r.id} className="flex items-start gap-2 text-sm text-slate-600">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia-400" />
            {r.text}
          </li>
        ))}
      </ul>
    </section>
  );
};

function buildReminders(data: DashboardData): Reminder[] {
  const reminders: Reminder[] = [];

  const todayInterview = data.upcomingInterviews.find((i) => i.status === "today");
  if (todayInterview) {
    reminders.push({ id: "r-today", text: `Interview with ${todayInterview.candidate.name} is today at ${todayInterview.time}.` });
  }

  if (data.overview.pendingApplications > 0) {
    reminders.push({
      id: "r-pending",
      text: `${data.overview.pendingApplications} application${data.overview.pendingApplications === 1 ? "" : "s"} require review.`,
    });
  }

  data.activeJobs
    .filter((j) => j.status === "closing_soon")
    .forEach((job) => reminders.push({ id: `r-close-${job.id}`, text: `${job.title} applications are closing soon.` }));

  data.attentionItems
    .filter((a) => a.kind === "needs_scheduling")
    .forEach((item) =>
      reminders.push({ id: `r-sched-${item.id}`, text: item.title.charAt(0).toLowerCase() + item.title.slice(1) + "." })
    );

  return reminders.slice(0, 4);
}

// ---- Top-level Company Dashboard ------------------------------------------------

interface CompanyDashboardProps {
  data: DashboardData;
  isLoading?: boolean;
  onViewApplication?: (id: string) => void;
  onViewInterview?: (id: string) => void;
  onManageJob?: (id: string) => void;
  onCreateJob?: () => void;
}

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  data,
  isLoading = false,
  onViewApplication,
  onViewInterview,
  onManageJob,
  onCreateJob,
}) => {
  const reminders = buildReminders(data);

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <DashboardHeader companyName={data.companyName} notificationCount={data.overview.pendingApplications} />

        <HiringOverviewCards stats={data.overview} isLoading={isLoading} />

        {!isLoading && <HiringReminders reminders={reminders} />}

        <AttentionSection items={data.attentionItems} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentApplications applications={data.recentApplications} isLoading={isLoading} onView={onViewApplication} />
          </div>
          <div className="lg:col-span-1">
            <HiringActivity events={data.recentActivity} />
          </div>
        </div>

        <UpcomingInterviews interviews={data.upcomingInterviews} isLoading={isLoading} onView={onViewInterview} />

        <HiringPipeline stages={data.pipeline} isLoading={isLoading} />

        <ActiveJobs jobs={data.activeJobs} isLoading={isLoading} onManage={onManageJob} onCreateJob={onCreateJob} />
      </div>
    </div>
  );
};

// ---- Demo entry point (remove when integrating into your app) ------------------

export default function App() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setData(mockDashboardData), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <CompanyDashboard
      data={data ?? mockDashboardData}
      isLoading={!data}
      onViewApplication={(id) => console.log("view application", id)}
      onViewInterview={(id) => console.log("view interview", id)}
      onManageJob={(id) => console.log("manage job", id)}
      onCreateJob={() => console.log("create job")}
    />
  );
}