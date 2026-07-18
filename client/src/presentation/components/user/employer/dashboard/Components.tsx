import {
  ChevronRight,
  Video,
  Building2,CheckCircle2,
  Sparkles,
  MapPin,ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type {
  ActiveJob,
  Application,
  Interview,
  PendingActions,
  QuickAction,
  RecentActivityType,
 
} from './CompanyDashboardContainer';
import type {
  InterviewMode,
 
} from '../../../../../types/dtos/interview.dto';


type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  action?: { label: string,onclick:()=>void };
};

const interviewTypeIcon: Record<InterviewMode, LucideIcon> = {
  online: Video,
  offline: Building2,
};
export function SectionHeading({
  eyebrow,
  title,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase mb-1">
            {eyebrow}
          </p>
        )}
        <h2
          className="text-[17px] font-semibold text-stone-900"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {title}
        </h2>
      </div>
      {action && (
        <button
          onClick={action.onclick}
          className="group flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-emerald-700 transition-colors"
        >
    {action.label}
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </div>
  );
}

type InterviewCardProps = {
  interview: Interview;
};
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export function InterviewCard({ interview }: InterviewCardProps) {
  const TypeIcon = interviewTypeIcon[interview.type];
  return (
    <div className="flex items-center gap-3.5 py-3 group">
      <div className="h-10 w-10 shrink-0 rounded-full bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-600">
        {interview.imageUrl ? (
          <img
            className="rounded-full"
            src={`${baseUrl}${interview.imageUrl}`}
            alt={interview.name}
          />
        ) : (
          <p>{interview.name?.charAt(0).toUpperCase() ?? '?'}</p>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-stone-800 truncate">
          {interview.name}
        </p>
        <p className="text-xs text-stone-400 truncate">{interview.role}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-semibold text-stone-700">{interview.time}</p>
        <div className="flex items-center gap-1 justify-end text-[11px] text-stone-400 mt-0.5">
          <TypeIcon className="h-3 w-3" />
          {interview.date}
        </div>
      </div>
    </div>
  );
}
type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  subtitle,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6">
      <div className="h-12 w-12 rounded-2xl bg-stone-50 flex items-center justify-center mb-3 ring-1 ring-stone-100">
        <Icon className="h-5 w-5 text-stone-400" strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-stone-700">{title}</p>
      {subtitle && (
        <p className="text-xs text-stone-400 mt-1 max-w-[220px]">{subtitle}</p>
      )}
    </div>
  );
}



type ApplicationRowProps = {
  app: Application;
};

export function ApplicationRow({ app }: ApplicationRowProps) {
  const initials = app.name.charAt(0).toUpperCase();
  return (
    <div className="flex items-center gap-3.5 py-3">
      <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-semibold text-emerald-700">
        {app.imageUrl ? (
          <img
            src={`${baseUrl}${app.imageUrl}`}
            className="shrink-0 rounded-full"
          />
        ) : (
          <>{initials}</>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-stone-800 truncate">
          {app.name}
        </p>
        <p className="text-xs text-stone-400 truncate">{app.role}</p>
      </div>
      <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${app.style}`}
        >
          {app.status}
        </span>
        <p className="text-[11px] text-stone-400">{app.appliedAt}</p>
      </div>
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className: string }) {
  return (
    <div
      className={`rounded-3xl bg-white border border-stone-100 shadow-sm p-6 overflow-hidden ${className}`}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-3 w-24 bg-stone-100 rounded-full" />
        <div className="h-7 w-32 bg-stone-100 rounded-full" />
        <div className="h-2 w-16 bg-stone-100 rounded-full" />
      </div>
    </div>
  );
}

type JobSummeryCardProps = {
  job: ActiveJob;
};
export function JobSummaryCard({ job }: JobSummeryCardProps) {
  //const pct = Math.round((job.applicants / job.target) * 100);
  return (
    <div className="rounded-2xl border border-stone-200 p-5 transition-transform duration-300 hover:scale-[1.02] flex flex-col h-full">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-stone-800">{job.title}</p>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
            {job.type==='fullTime'?'Full Time':'Part Time'}
          </span>
        </div>

        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize whitespace-nowrap ${job.style}`}
        >
          {job.status.replace('-', ' ')}
        </span>
      </div>

      <div className="flex items-center gap-1 text-xs text-stone-400">
        <MapPin className="h-3 w-3" />
        {job.location}
      </div>

      {/* Push this section to the bottom */}
      <div className="mt-auto pt-5 flex items-center justify-between text-xs">
        <span className="text-stone-500">{job.applicants} applicants</span>

        <button className="rounded-lg border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 hover:shadow">
          View
        </button>
      </div>
    </div>
  );
}

type RecentActivityProps={
  items:RecentActivityType[]
}
export function RecentActivity({ items }:RecentActivityProps) {
  console.log('items ',items);
  
  return (
    <div className="relative">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 shrink-0 rounded-full bg-stone-50 ring-1 ring-stone-100 flex items-center justify-center text-emerald-600">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </div>
              {i < items.length - 1 && (
                <div className="w-px flex-1 bg-stone-100 my-1" />
              )}
            </div>
            <div className="pb-5 -mt-0.5">
              <p className="text-sm text-stone-700 leading-snug">{item.title}</p>
              <p className="text-[11px] text-stone-700 mt-1">{item.message}</p>
              <p className="text-[11px] text-stone-400 mt-1">{item.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

type PendingActionsListProps={
  items:PendingActions[]
}
export function PendingActionsList({items}:PendingActionsListProps) {
  const navigate=useNavigate()
  if (!items.length) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="All caught up"
        subtitle="No pending Actions right now."
      />
    );
  }
  return (
    <div className="space-y-1">
      {items.map((n,i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0  bg-amber-500 `}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-800">{n.title}</p>
            <p className="text-xs text-stone-400 mt-0.5">{n.desc}</p>
          </div>
          <button
  onClick={() => navigate(n.path)}
  className="rounded-lg border border-green-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 hover:shadow">

  View
</button>
        </div>
      ))}
    </div>
  );
}

export function QuickActionCard({ action }:{action:QuickAction}) {
  const navigate=useNavigate()
  const Icon = action.icon;
  return (
    <button onClick={()=>navigate(action.path)} className="flex items-center gap-3 w-full p-3.5 rounded-2xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all group text-left">
      <div className="h-9 w-9 rounded-xl bg-stone-50 group-hover:bg-white flex items-center justify-center text-stone-500 group-hover:text-emerald-700 transition-colors">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <span className="text-sm font-medium text-stone-700 group-hover:text-emerald-800">
        {action.label}
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 text-stone-300 ml-auto group-hover:text-emerald-500 transition-colors" />
    </button>
  );
}
