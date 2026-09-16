import {
  ChevronRight,
  Video,
  Building2,
  CheckCircle2,
  Sparkles,
  MapPin,
  ArrowUpRight,
  type LucideIcon,
  CircleAlert,
  BellRing,
  Activity,
  Workflow,
  Clock3,
  BriefcaseBusiness,
  Users,
  UserCheck,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type {
  ActiveJob,
  Application,
  AppStatusData,
  Interview,
  PendingActions,
  QuickAction,
  RecentActivityType,
} from './CompanyDashboardContainer';
import type { InterviewMode } from '../../../../../types/dtos/interview.dto';
import { is } from 'zod/v4/locales';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  action?: { label: string; onclick: () => void };
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

export function AppEmptyState({
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

// export function JobSummaryCard({ job }: JobSummeryCardProps) {
//   //const pct = Math.round((job.applicants / job.target) * 100);
//   return (
//     <div className="rounded-2xl border border-stone-200 p-5 transition-transform duration-300 hover:scale-[1.02] flex flex-col h-full">
//       <div className="flex items-start justify-between mb-3">
//         <div>
//           <p className="text-sm font-semibold text-stone-800">{job.title}</p>
//           <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
//             {job.type === 'fullTime' ? 'Full Time' : 'Part Time'}
//           </span>
//         </div>

//         <span
//           className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize whitespace-nowrap ${job.style}`}
//         >
//           {job.status.replace('-', ' ')}
//         </span>
//       </div>

//       <div className="flex items-center gap-1 text-xs text-stone-400">
//         <MapPin className="h-3 w-3" />
//         {job.location}
//       </div>

//       {/* Push this section to the bottom */}
//       <div className="mt-auto pt-5 flex items-center justify-between text-xs">
//         <span className="text-stone-500">{job.applicants} applicants</span>

//         <button className="rounded-lg border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 hover:shadow">
//           View
//         </button>
//       </div>
//     </div>
//   );
// }

export const JobSummaryCard: React.FC<{ job: ActiveJob }> = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      className="
        group relative overflow-hidden
        rounded-2xl border border-slate-100
        bg-white p-4
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-fuchsia-200
        hover:shadow-lg
        hover:shadow-fuchsia-100/50
      "
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {/* Job icon */}
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl bg-fuchsia-50 text-fuchsia-600
              transition-all duration-300
              group-hover:scale-105
              group-hover:rotate-2
            "
          >
            <BriefcaseBusiness className="h-5 w-5" />
          </div>

          {/* Job information */}
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-slate-800">
              {job.title}
            </h3>

            <p className="mt-1 text-[11px] text-slate-400">
              Active job posting
            </p>
          </div>
        </div>

        {/* Job type */}
        <span
          className="
            shrink-0 rounded-full
            bg-fuchsia-50
            px-2.5 py-1
            text-[10px] font-medium
            capitalize text-fuchsia-600
          "
        >
          {job.type}
        </span>
      </div>

      {/* Job details */}
      <div className="mt-4 rounded-xl bg-slate-50 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness className="h-3.5 w-3.5 text-fuchsia-500" />

            <span className="text-[11px] text-slate-400">Employment type</span>
          </div>

          <span className="text-xs font-semibold capitalize text-slate-700">
            {job.type}
          </span>
        </div>
      </div>

      {/* Bottom information */}
      <div
        className="
          mt-3 flex items-center justify-between
          border-t border-slate-100
          pt-3
        "
      >
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Currently active</span>
        </div>

        <button
          onClick={() => {
            navigate(`/company/jobs/${job.id}`);
          }}
          type="button"
          className="
            inline-flex items-center gap-1
            rounded-lg px-2 py-1
            text-[11px] font-medium
            text-fuchsia-600
            transition-all duration-200
            hover:bg-fuchsia-50
            hover:text-fuchsia-800
            hover:translate-x-0.5
          "
        >
          View
          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
type RecentActivityProps = {
  items: RecentActivityType[];
};
// export function RecentActivity({ items }: RecentActivityProps) {
//   console.log('items ', items);

//   return (
//     <div className="relative">
//       {items.map((item, i) => {
//         const Icon = item.icon;
//         return (
//           <div key={item.id} className="flex gap-3.5">
//             <div className="flex flex-col items-center">
//               <div className="h-8 w-8 shrink-0 rounded-full bg-stone-50 ring-1 ring-stone-100 flex items-center justify-center text-emerald-600">
//                 <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
//               </div>
//               {i < items.length - 1 && (
//                 <div className="w-px flex-1 bg-stone-100 my-1" />
//               )}
//             </div>
//             <div className="pb-5 -mt-0.5">
//               <p className="text-sm text-stone-700 leading-snug">
//                 {item.title}
//               </p>
//               <p className="text-[11px] text-stone-700 mt-1">{item.message}</p>
//               <p className="text-[11px] text-stone-400 mt-1">{item.time}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

interface RecentActivitiesProps {
  activities: RecentActivityType[];
  isLoading: boolean;
}
export const RecentActivities: React.FC<RecentActivitiesProps> = ({
  activities,
  isLoading,
}) => {
  console.log('isloading form recnet ativities', isLoading);

  // Loading state
  if (isLoading) {
  return (
    <section className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50/70 via-white to-purple-50/40 p-4 shadow-sm sm:p-5">
      {/* Header Skeleton */}
      <div className="mb-4 flex items-center gap-2.5">
        <div className="h-8 w-8 animate-pulse rounded-xl bg-fuchsia-100" />

        <div className="space-y-1.5">
          <div className="h-3.5 w-32 animate-pulse rounded-md bg-slate-200" />
          <div className="h-2.5 w-44 animate-pulse rounded-md bg-slate-100" />
        </div>
      </div>

      {/* Activities Skeleton */}
      <div className="space-y-2.5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-fuchsia-100 bg-white/80 p-3.5"
          >
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-fuchsia-100" />

              {/* Content */}
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3.5 w-2/5 animate-pulse rounded-md bg-slate-200" />

                <div className="h-2.5 w-4/5 animate-pulse rounded-md bg-slate-100" />
              </div>

              {/* Time */}
              <div className="h-2.5 w-14 shrink-0 animate-pulse rounded-md bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

  return (
    <section className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50/70 via-white to-purple-50/40 p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-600">
            <Activity className="h-4 w-4" strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Recent Activities
            </h2>

            <p className="text-xs text-slate-500">
              Latest updates and hiring activity
            </p>
          </div>
        </div>

        {/* Activity Count */}
        {activities.length > 0 && (
          <span className="rounded-full bg-fuchsia-100 px-2.5 py-1 text-xs font-semibold text-fuchsia-700">
            {activities.length}
          </span>
        )}
      </div>

      {/* Empty State */}
      {activities.length === 0 ? (
        <div
          className="
            flex min-h-[180px] flex-col items-center justify-center
            rounded-xl border border-dashed border-fuchsia-200
            bg-white/60 px-5 py-8 text-center
          "
        >
          <div
            className="
              mb-3 flex h-12 w-12 items-center justify-center
              rounded-2xl bg-fuchsia-50 text-fuchsia-500
              shadow-sm
            "
          >
            <Activity className="h-5 w-5" strokeWidth={1.8} />
          </div>

          <h3 className="text-sm font-semibold text-slate-700">
            No recent activities
          </h3>

          <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
            Your latest hiring activities and updates will appear here.
          </p>
        </div>
      ) : (
        /* Activity List */
        <div className="space-y-2.5">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="
                  group rounded-xl border border-fuchsia-100
                  bg-white/80 p-3.5
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-fuchsia-200
                  hover:bg-white
                  hover:shadow-[0_8px_24px_rgba(192,38,211,0.10)]
                "
              >
                <div className="flex items-center gap-3">
                  {/* Activity Icon */}
                  <div
                    className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-xl bg-fuchsia-50 text-fuchsia-500
                      transition-all duration-300
                      group-hover:scale-105
                      group-hover:bg-fuchsia-100
                      group-hover:text-fuchsia-600
                    "
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>

                  {/* Activity Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="truncate text-sm font-semibold text-slate-700 transition-colors group-hover:text-fuchsia-700">
                        {activity.title}
                      </h3>

                      <span className="shrink-0 text-[11px] font-medium text-slate-400">
                        {activity.time}
                      </span>
                    </div>

                    <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
                      {activity.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

type PendingActionsListProps = {
  items: PendingActions[];
};
// export function PendingActionsList({items}:PendingActionsListProps) {
//   const navigate=useNavigate()
//   if (!items.length) {
//     return (
//       <EmptyState
//         icon={CheckCircle2}
//         title="All caught up"
//         subtitle="No pending Actions right now."
//       />
//     );
//   }
//   return (
//     <div className="space-y-1">
//       {items.map((n,i) => (
//         <div
//           key={i}
//           className="flex items-start gap-3 p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
//         >
//           <span
//             className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0  bg-amber-500 `}
//           />
//           <div className="min-w-0">
//             <p className="text-sm font-medium text-stone-800">{n.title}</p>
//             <p className="text-xs text-stone-400 mt-0.5">{n.desc}</p>
//           </div>
//           <button
//   onClick={() => navigate(n.path)}
//   className="rounded-lg border border-green-200 bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 hover:shadow">

//   View
// </button>
//         </div>
//       ))}
//     </div>
//   );
// }

export const HiringReminders: React.FC<{
  reminders: PendingActions[];
  isLoading: boolean;
}> = ({ reminders, isLoading }) => {
  const navigate = useNavigate();

  if (reminders.length === 0) return null;

  // Loading state
  if (isLoading) {
    return (
      <section className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50/70 via-white to-purple-50/40 p-4 sm:p-5 shadow-sm">
        {/* Header Skeleton */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 animate-pulse rounded-xl bg-fuchsia-100" />

            <div className="space-y-1.5">
              <div className="h-3.5 w-32 animate-pulse rounded-md bg-slate-200" />
              <div className="h-2.5 w-44 animate-pulse rounded-md bg-slate-100" />
            </div>
          </div>

          <div className="h-6 w-7 animate-pulse rounded-full bg-fuchsia-100" />
        </div>

        {/* Action Skeletons */}
        <div className="space-y-2.5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-fuchsia-100 bg-white/80 p-3.5"
            >
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-fuchsia-100" />

                {/* Text */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3.5 w-2/5 animate-pulse rounded-md bg-slate-200" />
                  <div className="h-2.5 w-4/5 animate-pulse rounded-md bg-slate-100" />
                </div>

                {/* Arrow */}
                <div className="h-7 w-7 shrink-0 animate-pulse rounded-lg bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (reminders.length === 0) return null;

  return (
    <section className="rounded-2xl border border-fuchsia-100 bg-gradient-to-br from-fuchsia-50/70 via-white to-purple-50/40 p-4 sm:p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-600">
            <BellRing className="h-4 w-4" strokeWidth={2} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Hiring Reminders
            </h2>
            <p className="text-xs text-slate-500">
              Actions that may need your attention
            </p>
          </div>
        </div>

        <span className="rounded-full bg-fuchsia-100 px-2.5 py-1 text-xs font-semibold text-fuchsia-700">
          {reminders.length}
        </span>
      </div>

      {/* Pending Actions */}
      <div className="space-y-2.5">
        {reminders.map((reminder) => (
          <button
            key={`${reminder.title}-${reminder.path}`}
            type="button"
            onClick={() => navigate(reminder.path)}
            className="
              group w-full rounded-xl border border-fuchsia-100
              bg-white/80 p-3.5 text-left
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-fuchsia-200
              hover:bg-white
              hover:shadow-[0_8px_24px_rgba(192,38,211,0.10)]
              active:translate-y-0
              focus:outline-none
              focus:ring-2
              focus:ring-fuchsia-300/50
            "
          >
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-9 w-9 shrink-0 items-center justify-center
                  rounded-xl bg-fuchsia-50 text-fuchsia-500
                  transition-all duration-300
                  group-hover:scale-105
                  group-hover:bg-fuchsia-100
                  group-hover:text-fuchsia-600
                "
              >
                <CircleAlert className="h-4 w-4" strokeWidth={2} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-slate-700 transition-colors group-hover:text-fuchsia-700">
                  {reminder.title}
                </h3>

                <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
                  {reminder.desc}
                </p>
              </div>

              <div
                className="
                  flex h-7 w-7 shrink-0 items-center justify-center
                  rounded-lg bg-slate-50 text-slate-400
                  transition-all duration-300
                  group-hover:translate-x-0.5
                  group-hover:bg-fuchsia-50
                  group-hover:text-fuchsia-600
                "
              >
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export function QuickActionCard({ action }: { action: QuickAction }) {
  const navigate = useNavigate();
  const Icon = action.icon;
  return (
    <button
      onClick={() => navigate(action.path)}
      className="flex items-center gap-3 w-full p-3.5 rounded-2xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all group text-left"
    >
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

export const HiringPipeline: React.FC<{
  stages: AppStatusData[];
  isLoading?: boolean;
}> = ({ stages, isLoading }) => {
  console.log('stages', stages);

  const maxCount = Math.max(...stages.map((s) => s.count), 1);

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Workflow className="h-4 w-4 text-fuchsia-500" strokeWidth={2} />
        <h2 className="text-sm font-semibold text-slate-800">
          Hiring Pipeline
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <PipelineStageSkeleton key={i} />
          ))}
        </div>
      ) : stages.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {stages.map((stage) => {
            const barWidth = Math.max((stage.count / maxCount) * 100, 6);

            return (
              <div
                key={stage.stage}
                className="
                  group flex flex-col items-center
                  rounded-xl border border-slate-100
                  bg-white p-3 text-center
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-fuchsia-100
                  hover:shadow-md hover:shadow-fuchsia-100/40
                "
              >
                {/* Count */}
                <p className="text-xl font-semibold text-slate-800">
                  {stage.count}
                </p>

                {/* Label */}
                <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                  {stage.label}
                </p>

                {/* Progress */}
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      background: stage.bg,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-6 text-center text-sm text-slate-400">
          No application data available.
        </div>
      )}
    </section>
  );
};

const PipelineStageSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
    <div className={cn(shimmer, 'mx-auto mb-2 h-6 w-10 rounded-md')} />
    <div className={cn(shimmer, 'mx-auto h-3 w-16 rounded-md')} />
  </div>
);

const shimmer = 'animate-pulse bg-slate-100';
function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
