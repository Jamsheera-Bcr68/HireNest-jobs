import type { RootState } from '../../../../redux/store';
import StatusCards from './StatusCards';
import WelcomeSection from '../../common/dashboard/WelcomeSection';
import AppStatusChart from './AppStatusChart';
import RecomentedJobs from './RecomentedJobs';
import { useJobs } from '../../../hooks/user/employer/useJobs';
import InterviewAndProfile from './InterviewAndProfile';
import {
  formatCurrentDate,
  getGreeting,
} from '../../../../utils/date-conversion';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { candidateDashboardService } from '../../../../services/api-services/dashboard/candidate-dashboard.service';
import {
  Bookmark,
  ClipboardList,
  FileText,
  UserCircle2,
  Bell,
  Video,
  type LucideIcon,
} from 'lucide-react';
import type { ApplicationStatusType } from '../../../../types/dtos/application.dto';
import { type JobCardDto } from '../../../../types/dtos/job.dto';
import { useApplications } from '../../../hooks/user/candidate/profile/useApplication';
import SelectResumeModal from '../applications/ResumeModal';

const TONE_MAP = {
  teal: { bg: 'bg-teal-50', text: 'text-teal-700', ring: 'ring-teal-600/10' },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-600/10',
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    ring: 'ring-indigo-600/10',
  },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-600/10' },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-600/10',
  },
  slate: {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    ring: 'ring-slate-500/10',
  },
  blue: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-600/10' },
};

export type CandidateStatusCard = {
  key: string;
  label: string;
  value: number | string;
  trend: string;
  trendUp: boolean | null;
  icon: LucideIcon;
  tone: { bg: string; text: string; ring: string };
};
type AppResponseType = {
  id: string;
  title: string;
  companyName: string;
  appliedAt: string;
  logoUrl: string;
  status: ApplicationStatusType;
};

export type RecentApps = {
  companyName: string;
  title: string;
  appliedAt: string;
  status: ApplicationStatusType;
  statusLabel: string;
  logoUrl: string;
  className: string;
  color: string;
};

const StatusConfig: Record<
  ApplicationStatusType,
  { label: string; color: string }
> = {
  pending: { label: 'Applied', color: '#0d9488' },
  reviewed: { label: 'Reviewed', color: '#d97706' },
  shortListed: { label: 'Shortlisted', color: '#4f46e5' },
  rejected: { label: 'Rejected', color: '#e11d48' },
  interviewScheduled: { label: 'Interview Scheduled', color: '#196407' },
  withdrawn: { label: 'Withdrew', color: '#816e72' },
};

const STATUS_BADGE: Record<
  ApplicationStatusType,
  { color: string; className: string }
> = {
  pending: {
    className: 'bg-teal-100 text-teal-700',
    color: 'bg-blue-100 text-blue-700',
  },
  reviewed: {
    className: 'bg-amber-50 text-amber-700 ring-amber-600/15',
    color: '',
  },
  shortListed: {
    color: 'bg-indigo-100 text-indigo-700',
    className: 'bg-indigo-50 text-indigo-700 ring-indigo-600/15',
  },

  withdrawn: {
    className: 'bg-rose-50 text-rose-700 ring-gray-300/15',
    color: 'bg-blue-100 text-blue-400',
  },
  rejected: {
    className: 'bg-rose-50 text-rose-700 ring-rose-600/15',
    color: 'bg-rose-100 text-rose-700',
  },
  interviewScheduled: {
    color: 'bg-blue-100 text-blue-700',
    className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
  },
};

export type Interview = {
  id: string;
  company: string;
  role: string;
  date: string;
  time: string;
  mode: string;
  link?: string;
};

export type ProfileData = {
  profileMissing: string[];
  completion: number;
};

export type AppStatusData = {
  status: ApplicationStatusType;
  label: string;
  count: number;
  color: string;
};
function CandidateDashboardContainer() {
  const [statusData, setStatusData] = useState<CandidateStatusCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentApps, setRecentApps] = useState<RecentApps[]>([]);
  const [profileData, setProfileData] = useState<ProfileData>({
    completion: 0,
    profileMissing: [],
  });
  const [upcomingInterview, setUpcomingIntercview] = useState<Interview | null>(
    null
  );
  const [appChartData, setAppChartData] = useState<AppStatusData[]>([]);
  const [jobs, setJobs] = useState<JobCardDto[]>([]);

  const { user } = useSelector((state: RootState) => state.auth);
  const today = formatCurrentDate(new Date());
  const greeting = getGreeting();

  const { saveJobHandle, unSaveJobHandle } = useJobs();
  const {
    handleApplyClick,
    showResumeModal,
    setShowResumeModal,
    applyJob,
    resumes,
  } = useApplications();

  useEffect(() => {
    const fetchDashboradData = async () => {
      try {
        setIsLoading(true);
        const [data, appData, interviewData, profileDatares, recomented] =
          await Promise.all([
            candidateDashboardService.getStatusData(),
            candidateDashboardService.getAppData(),
            candidateDashboardService.getUpcomingInterview(),
            candidateDashboardService.getDashboardProfileData(),
            candidateDashboardService.getDashboardRecomendedJoba(),
          ]);
        const profileData = profileDatares.profileData;
        setProfileData(profileData);

        console.log('recomented', recomented.recomented);

        const applications: CandidateStatusCard = {
          key: 'applications',
          label: 'Total Applications',
          value: data.statusData.totalApplications,
          trend: `${data.statusData.applicationsThisMonth} in this month`,
          trendUp: true,
          icon: FileText,
          tone: TONE_MAP.teal,
        };

        const review: CandidateStatusCard = {
          key: 'review',
          label: 'Under Review',
          value: data.statusData.underReview,
          trend: data.statusData.shortListedApps
            ? `${data.statusData.shortListedApps} are short listed`
            : '',
          trendUp: null,
          icon: ClipboardList,
          tone: TONE_MAP.amber,
        };
        const interviews: CandidateStatusCard = {
          key: 'interviews',
          label: 'Interviews Scheduled',
          value: data.statusData.upcomingInterviews,
          trend: data.statusData.nextInterviewDate
            ? `Next: ${formatCurrentDate(new Date(data.statusData.nextInterviewDate))}`
            : 'No interviews',
          trendUp: true,
          icon: Video,
          tone: TONE_MAP.indigo,
        };
        const saved: CandidateStatusCard = {
          key: 'saved',
          label: 'Saved Jobs',
          value: data.statusData.savedJobs,
          trend: data.statusData.savedJobsClosingSoon
            ? `${data.statusData.savedJobsClosingSoon} closing soon`
            : 'No saved jobs',
          trendUp: false,
          icon: Bookmark,
          tone: TONE_MAP.rose,
        };

        const profile: CandidateStatusCard = {
          key: 'profile',
          label: 'Profile Completion',
          value: `${data.statusData.profileCompletion} %`,
          trend: data.statusData.remainingProfileSections
            ? `${data.statusData.remainingProfileSections}  sections left`
            : 'Profile completed',
          trendUp: null,
          icon: UserCircle2,
          tone: TONE_MAP.emerald,
        };
        const notification: CandidateStatusCard = {
          key: 'notifications',
          label: 'Unread Notifications',
          value: `${data.statusData.newNotificationCount}
     `,
          trend: '',
          trendUp: null,
          icon: Bell,
          tone: TONE_MAP.slate,
        };

        setStatusData([
          applications,
          review,
          interviews,
          saved,
          profile,
          notification,
        ]);

        const appStatusData: {
          status: ApplicationStatusType;
          count: number;
        }[] = appData.appData.appStatusData;

        const mappedAppChartData: AppStatusData[] = appStatusData.map((app) => {
          const config = StatusConfig[app.status];

          return {
            ...app,
            label: config.label,
            color: config.color,
          };
        });

        const recentAppsResp: AppResponseType[] = appData.appData.recentApps;
        const updatedRecentApps: RecentApps[] = recentAppsResp.map((app) => ({
          ...app,

          className: STATUS_BADGE[app.status]?.className,
          color: STATUS_BADGE[app.status].color,
          statusLabel: StatusConfig[app.status].label,
        }));
        const recomentedJobs = recomented.recomented;

        setJobs(recomentedJobs);
        setAppChartData(mappedAppChartData);

        setRecentApps(updatedRecentApps);

        setUpcomingIntercview(interviewData.interview);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboradData();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f6f7f5] font-body text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .rise { animation: rise 0.45s cubic-bezier(.16,.84,.44,1) backwards; }
        .card-hover { transition: box-shadow .25s ease, transform .25s ease; }
        .card-hover:hover { box-shadow: 0 8px 24px -8px rgba(15, 23, 42, 0.10); transform: translateY(-2px); }
        *:focus-visible { outline: none; }
      `}</style>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-8">
        <WelcomeSection
          today={today}
          greeting={greeting}
          name={user.name ?? 'User'}
        />
        <StatusCards statusData={statusData} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <AppStatusChart
          appData={appChartData}
          recentApps={recentApps}
          isLoading={isLoading}
        />
        <InterviewAndProfile
          interview={upcomingInterview}
          isLoading={isLoading}
          profileData={profileData}
        />
      </div>
      <RecomentedJobs isLoading={isLoading} jobs={jobs} handleApplyClick={handleApplyClick} saveJobHandle={saveJobHandle} unSaveJobHandle={unSaveJobHandle}  />
     <SelectResumeModal resumes={resumes}
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        onApply={(resumeId: string) => applyJob(resumeId)} />
    </div>
  );
}

export default CandidateDashboardContainer;
