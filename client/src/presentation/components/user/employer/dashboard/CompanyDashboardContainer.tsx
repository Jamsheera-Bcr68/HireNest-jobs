import { useEffect, useState } from 'react';
import { StatCard } from './Cards';

import { SkeletonBlock } from '../../../candidate/dashboard/StatusCards';

import { useNavigate } from 'react-router-dom';
import { HiringPipeline } from './Components';
import {
  SectionHeading,
  InterviewCard,
  AppEmptyState,
  SkeletonCard,
  ApplicationRow,
  JobSummaryCard,

  QuickActionCard,
  HiringReminders,
  RecentActivities,
} from './Components';

import {
  Briefcase,
  CheckCircle2,
  FileText,
  Plus,
  CalendarClock,
  ClipboardList,
  Send,
  Users,
  type LucideIcon,
  Lightbulb,
  Bell,
  User,
  Eye,
} from 'lucide-react';
import WelcomeSection from '../../../common/dashboard/WelcomeSection';

import {
  formatCurrentDate,
  getGreeting,
} from '../../../../../utils/date-conversion';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../../redux/store';
import { companyDashboardService } from '../../../../../services/api-services/dashboard/company-dashboard.service';
import type { ApplicationStatusType } from '../../../../../types/dtos/application.dto';
import type { InterviewMode } from '../../../../../types/dtos/interview.dto';
import type { StatusType } from '../../../../../types/dtos/profile-types/user.types';
import type { JobType } from '../../../../../types/dtos/job.dto';
type Field =
  | 'profile'
  | 'active-jobs'
  | 'total-apps'
  | 'interviews'
  | 'skills'
  | 'notifications';

const tintMap = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-100',
  },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-100' },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-100',
  },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-100' },
};

const STATUS_CONFIG: Record<
  Field,
  { label: string; class: { bg: string; text: string; ring: string } }
> = {
  profile: { label: 'Profile Completion', class: tintMap['emerald'] },
  'active-jobs': { label: 'Active Jobs', class: tintMap['sky'] },
  'total-apps': { label: 'Total Applications', class: tintMap['emerald'] },
  interviews: { label: 'Upcoming Interviews', class: tintMap['amber'] },
  skills: { label: 'Skill Requests', class: tintMap['violet'] },
  notifications: { label: 'New Notifications', class: tintMap['rose'] },
};
type RecentItemType = 'job' | 'application' | 'interview';
const RECENT_CONFIG: Record<RecentItemType, LucideIcon> = {
  job: Briefcase,
  application: FileText,
  interview: CheckCircle2,
};

const PIPELINE_STAGES: ApplicationStatusType[] = [
  'pending',
  'reviewed',
  'shortListed',
  'interviewScheduled',
  'interviewCompleted',
  'hired',
];
const APP_STATUS_CONFIG: Record<
  ApplicationStatusType,
  { label: string; bg: string; style: string }
> = {
  pending: {
    label: 'Applied',
    bg: '#3B82F6',
    style: 'bg-sky-50 text-sky-700',
  },
  reviewed: {
    label: 'Reviewed',
    bg: '#06B6D4',
    style: 'bg-amber-50 text-amber-700',
  },
  shortListed: {
    label: 'Shortlisted',
    bg: '#8B5CF6',
    style: 'bg-emerald-50 text-emerald-700',
  },
  interviewScheduled: {
    label: 'Interview Scheduled',
    bg: '#F59E0B',
    style: 'bg-emerald-50 text-emerald-700',
  },
  interviewCompleted: {
    label: 'Interview Completed',
    bg: '#F97316',
    style: 'bg-amber-50 text-amber-700',
  },
  hired: {
    label: 'Hired',
    bg: '#10B981',
    style: 'bg-green-50 text-green-700',
  },
  rejected: {
    label: 'Rejected',
    bg: '#EF4444',
    style: 'bg-stone-100 text-stone-500',
  },
  withdrawn: {
    label: 'Withdrawn',
    bg: '#6B7280',
    style: 'bg-gray-50 text-grey-700',
  },
};

export type QuickAction = { label: string; icon: LucideIcon; path: string };
const quickActions: QuickAction[] = [
  { label: 'Post a job', icon: Plus, path: '/company/jobs/create' },
  {
    label: 'Schedule interview',
    icon: CalendarClock,
    path: '/company/interviews',
  },
  { label: 'Review applications', icon: ClipboardList, path: '/' },
  { label: 'Message candidates', icon: Send, path: '/company/messages' },
];

export type StatType = {
  id: Field;
  label: string;
  value: number | string;
  change: number | string;
  trend: string;
  icon: LucideIcon;
  tint: { bg: string; ring: string; text: string };
  note: string;
  desc: string;
};
const PENDING_CONFIG: Record<PendingActionItem, { path: string }> = {
  reschedule: { path: '/company/interviews' },
  'new-apps': { path: '/company/jobs' },
  'closing-jobs': { path: '/company/jobs' },
  shortlisted: { path: '/company/applications' },
  'confirmed-interview': { path: '/company/interviews' },
};
export type PendingActionItem =
  | 'reschedule'
  | 'new-apps'
  | 'closing-jobs'
  | 'shortlisted'
  | 'confirmed-interview';
export interface PendingActions {
  item: PendingActionItem;
  desc: string;
  title: string;
  path: string;
}

export type CompanyAppChartData = {
  month: string;
  applicationCount: number;
  hired: number;
};

export type TopJob = {
  title: string;
  applicants: number;
};
export type AppStatusData = {
  stage: ApplicationStatusType;
  count: number;
  label: string;
  bg: string;
};

const JOB_CONFIG: Record<StatusType, { bg: string }> = {
  active: {
    bg: 'bg-emerald-50 text-emerald-700',
  },
  suspended: {
    bg: 'bg-red-50 text-red-700',
  },
  pending: {
    bg: 'bg-sky-50 text-sky-700',
  },
  rejected: {
    bg: 'bg-rose-50 text-rose-700',
  },
  paused: {
    bg: 'bg-amber-50 text-amber-700',
  },
  expired: {
    bg: 'bg-stone-100 text-stone-600',
  },
  closed: {
    bg: 'bg-slate-100 text-slate-700',
  },
  removed: {
    bg: 'bg-red-100 text-red-800',
  },
};

export type RecentActivityType = {
  id: string | number;
  icon: LucideIcon;
  message: string;
  title: string;
  time: string;
};
export type ActiveJob = {
  id: string;
  title: string;
  type: JobType;
  location: string;
  applicants: number;
  style: string;
  status: StatusType;
};

export type Interview = {
  id: string;
  name: string;
  role: string;
  time: string;
  date: string;
  type: InterviewMode;
  imageUrl?: string;
};

export type Application = {
  id: string | number;
  name: string;
  role: string;
  appliedAt: string;
  status: ApplicationStatusType;
  imageUrl?: string;
  style: string;
};
const baseUrl = import.meta.env.VITE_BACKEND_URL;

function CompanyDashboardContainer() {
  const [statusData, setStatusData] = useState<StatType[]>([]);
  const [pendingActions, setPendingActions] = useState<PendingActions[]>([]);
  const [appChartData, setAppChartData] = useState<CompanyAppChartData[]>([]);
  const [appStatusData, setAppStatusData] = useState<AppStatusData[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [topJobs, setTopJobs] = useState<TopJob[]>([]);
  const [activeJobs, setActiveJobs] = useState<ActiveJob[]>([]);
  const [recentActivities, setRecentActivities] = useState<
    RecentActivityType[]
  >([]);
  const [latestApplications, setLatestApplications] = useState<Application[]>(
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const today = formatCurrentDate(new Date());
  const greeting = getGreeting();
  const user = useSelector((state: RootState) => state.auth.user);
  const name = user.name ?? 'Recruiter';

  useEffect(() => {
    const getDashboardata = async () => {
      try {
        setIsLoading(true);
        const [
          statusData,
          applicationsData,
          jobData,
          interviewData,
          recentActivityData,
          pendingActionData,
        ] = await Promise.all([
          companyDashboardService.getStatusData(),
          companyDashboardService.getApplicationData(),
          companyDashboardService.getTopJobData(),
          companyDashboardService.getInterviewData(),
          companyDashboardService.getRecentActivities(),
          companyDashboardService.getPendingActionsData(),
        ]);

        //console.log('recent activity data', recentActivityData.data);

        const activeJobs = statusData.statusData.activeJobs;
        const applications = statusData.statusData.applications;
        const interviews = statusData.statusData.interviews;
        const notifications = statusData.statusData.notifications;
        const profile = statusData.statusData.profile;
        const skills = statusData.statusData.skills;
        const jobs: StatType = {
          id: 'active-jobs',
          label: STATUS_CONFIG['active-jobs'].label,
          value: activeJobs.value,
          change: activeJobs.change,
          icon: Briefcase,
          tint: tintMap['emerald'],
          trend: activeJobs.isPositive ? 'up' : 'down',
          desc: `${activeJobs.currentMonthJobCount ? 'This month : ' + activeJobs.currentMonthJobCount : ''} 
        `,
          note: `  ${activeJobs.jobExpiringSoon ? activeJobs.jobExpiringSoon + 'Expiring tomorrow' : ''}`,
        };
        const appdata: StatType = {
          id: 'total-apps',
          label: STATUS_CONFIG['total-apps'].label,
          value: applications.value,
          change: applications.change,
          icon: Users,
          tint: tintMap['sky'],
          trend: applications.isPositive ? 'up' : 'down',
          desc: `${applications.newApplications ? 'New ' + applications.newApplications : ''} `,
          note: '',
        };
        const intData: StatType = {
          id: 'interviews',
          label: STATUS_CONFIG['interviews'].label,
          value: interviews.value,
          change: interviews.change,
          icon: CalendarClock,
          tint: tintMap['amber'],
          trend: interviews.isPositive ? 'up' : 'down',
          desc: `${interviews.rescheuleRequested ? 'Requested Reschedule ' + interviews.rescheuleRequested : ''} 
        
           `,
          note: `   ${interviews.nextInterview ? 'Next Interview ' + interviews.nextInterview : ''}`,
        };
        const skillData: StatType = {
          id: 'skills',
          label: STATUS_CONFIG['skills'].label,
          value: skills.total,
          change: 0,
          icon: Lightbulb,
          tint: STATUS_CONFIG['skills'].class,
          trend: interviews.isPositive ? 'up' : 'down',
          desc: `${skills.approved ? skills.approved + 'By Admin' : ''} `,
          note: '',
        };
        const notData: StatType = {
          id: 'notifications',
          label: STATUS_CONFIG['notifications'].label,
          value: notifications.new,
          change: 0,
          icon: Bell,
          tint: STATUS_CONFIG['notifications'].class,
          trend: interviews.isPositive ? 'up' : 'down',
          desc: '',
          note: '',
        };
        const profileData: StatType = {
          id: 'profile',
          label: STATUS_CONFIG['profile'].label,
          value: profile.completion + ' %',
          change: 0,
          icon: User,
          tint: STATUS_CONFIG['profile'].class,
          trend: '',
          note: '',
          desc: `${profile.remainingSections ? 'Missing Fields: ' + profile.remainingSections : 'Profile Completed'} `,
        };

        setStatusData([
          jobs,
          appdata,
          intData,
          skillData,
          notData,
          profileData,
        ]);
        setTopJobs(jobData.jobData.topJobs);
        const activeJobRes: Omit<ActiveJob, 'style'>[] =
          jobData.jobData.activeJobs;
        setActiveJobs(
          activeJobRes.map((j) => ({ ...j, style: JOB_CONFIG[j.status].bg }))
        );

        const pendingsData: Omit<PendingActions, 'path'>[] =
          pendingActionData.data;

        setPendingActions(
          pendingsData.map((data) => ({
            ...data,
            ...PENDING_CONFIG[data.item],
          }))
        );
        setAppChartData(applicationsData.appData.chartData);
        const backendStatusData: {
          stage: ApplicationStatusType;
          count: number;
        }[] = applicationsData.appData.appStatusData;
        console.log('applicationsData.appData.appStatusData;',applicationsData.appData.appStatusData);
        

        const completeStatusData: AppStatusData[] = PIPELINE_STAGES.map(
          (stage) => {
            const status = backendStatusData.find(
              (item) => item.stage === stage
            );

            return {
              stage,
              count: status?.count ?? 0,
              label: APP_STATUS_CONFIG[stage].label,
              bg: APP_STATUS_CONFIG[stage].bg,
            };
          }
        );

        setAppStatusData(completeStatusData);
        setInterviews(interviewData.data);
        const latestApps: Omit<Application, 'style'>[] =
          applicationsData.appData.latestApplications;

        setLatestApplications(
          latestApps.map((app) => ({
            ...app,
            style: APP_STATUS_CONFIG[app.status].style,
          }))
        );
        const recentData: {
          id: string;
          title: string;
          type: string;
          item: RecentItemType;
          message: string;
          time: string;
        }[] = recentActivityData.data;
        setRecentActivities(
          recentData.map((data) => ({
            ...data,
            icon: RECENT_CONFIG[data.item],
          }))
        );
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    getDashboardata();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <WelcomeSection greeting={greeting} today={today} name={name} />
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
                >
                  <SkeletonBlock className="w-8 h-8 rounded-lg mb-3" />
                  <SkeletonBlock className="w-12 h-6 mb-2" />
                  <SkeletonBlock className="w-20 h-3" />
                </div>
              ))
            : statusData.map((card, i) => (
                <StatCard key={i} isLoading={false} stat={card} />
              ))}
        </section>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          <HiringReminders reminders={pendingActions} isLoading={isLoading} />
      

          <RecentActivities
            activities={recentActivities}
            isLoading={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upcoming Interviews */}
          <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
            <SectionHeading
              eyebrow="Calendar"
              title="Upcoming interviews"
              action={{
                label: 'View all',
                onclick: () => navigate('/company/interviews'),
              }}
            />

            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 animate-pulse rounded-2xl bg-stone-50"
                  />
                ))}
              </div>
            ) : interviews.length ? (
              <div className="divide-y divide-stone-50">
                {interviews.map((iv) => (
                  <InterviewCard key={iv.id} interview={iv} />
                ))}
              </div>
            ) : (
              <AppEmptyState
                icon={CalendarClock}
                title="No Interview scheduled"
                subtitle="Interviews you book will show up here."
              />
            )}
          </div>

          {/* Latest Applications */}
          {/* Latest Applications */}
          <div className="rounded-3xl border border-stone-100 bg-white p-6 shadow-sm">
            <SectionHeading
              eyebrow="Pipeline"
              title="Latest applications"
              action={{
                label: '',
                onclick: () => navigate('/company/dashboard'),
              }}
            />

            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 animate-pulse rounded-2xl bg-stone-50"
                  />
                ))}
              </div>
            ) : latestApplications.length ? (
              <div className="divide-y divide-stone-50">
                {latestApplications.map((app) => (
                  <div key={app.id} className="flex items-center gap-2 py-2">
                    <div className="min-w-0 flex-1">
                      <ApplicationRow app={app} />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/company/applications/${app.id}`)
                      }
                      title="View application"
                      aria-label="View application"
                      className="shrink-0 rounded-lg bg-fuchsia-50 p-1.5 text-fuchsia-700 transition-all duration-200 hover:bg-fuchsia-700 hover:text-white hover:shadow-sm active:scale-95"
                    >
                      <Eye size={15} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <AppEmptyState
                icon={Users}
                title="No applications yet"
                subtitle="New candidates will appear here as they apply."
              />
            )}
          </div>
        </div>

        <HiringPipeline stages={appStatusData} isLoading={isLoading} />
 <section className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
            <SectionHeading
              eyebrow="Active postings"
              title="Job performance summary"
              action={{
                label: "Manage jobs",
                onclick: () => navigate("/company/jobs"),
              }}
            />
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard className="" key={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
                  >
                    <JobSummaryCard job={job} />
                  </div>
                ))}
              </div>
            )}
          </section>
        {/* <ActiveJobs jobs={data.activeJobs} isLoading={isLoading} onManage={onManageJob} onCreateJob={onCreateJob} /> */}
      </div>
    </div>
  );
}

export default CompanyDashboardContainer;

export interface PendingActions {
  item: PendingActionItem;
  desc: string;
  title: string;
  path: string;
}
