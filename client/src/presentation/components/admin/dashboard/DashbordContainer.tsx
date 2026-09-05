import { useEffect, useState } from 'react';
import { DashboardStatCard } from '../../common/DashboardStatusCards';
import Company_Job_chart, {
  ApplicationByIndustry,
  InterviewStatusChart,
} from './Charts';

import {
  Users,
  Clock,
  Briefcase,
  Building2,
  type LucideIcon,
} from 'lucide-react';
import { adminDashboardService } from '../../../../services/api-services/dashboard/admin_dashboard.service';
import { UserDistributionChart } from './Charts';
import CategorywisePosts from './CategorywisePosts';
import type { IndustryType } from '../../../../types/dtos/profile-types/industry.type';
import type { UserRole } from '../../../../constants/types/user';

import PendingCompany from './PendingCompany';
import ReportedJobs from './ReportedJobs';
import type { JobType } from '../../../../types/dtos/job.dto';
import ActionPending from './ActionPending';
import { adminService } from '../../../../services/api-services/adminService';

type StatusCardType = {
  icon: LucideIcon;
  label: string;
  value: number;
  delta: string;
  positive: boolean;
  classname: string;
};

export type Company_Job_ChartData = {
  month: string;
  jobs: number;
  companies: number;
};

export type DashboardCompany = {
  id: string;
  name: string;
  industry: IndustryType;
  location: string;
  submittedAt: string;
  email: string;

  logoUrl: string;
};
export type IndustryPostCount = {
  industry: IndustryType;
  count: number;
};
export type UserData = {
  label: string;
  color: string;
  role: UserRole;
  value: number;
};
export type Status =
  | 'passed'
  | 'failed'
  | 'scheduled'
  | 'completed'
  | 'not-show';

export type InterviewData = {
  label: string;
  color: string;
  status: Status;
  count: number;
  value: number;
};
export type AppData = {
  industry: IndustryType;
  count: number;
};

const jobTypeConfig: Record<JobType, string> = {
  fullTime: 'Full Time',
  partTime: 'Part Time',
};

export type PendingJobs = {
  id: string;
  title: string;
  type: string;
  companyName: string;
  reportCount: number;
  jobTypeLabel: string;
};

const InterivewConfig: Record<Status, { color: string; label: string }> = {
  completed: { label: 'Completed', color: '#10a99c' },
  scheduled: { label: 'Interview Scheduled', color: '#f59e0b' },
  passed: { label: 'Passed ', color: 'green' },
  failed: { label: 'Failed', color: 'red' },
  'not-show': { label: 'Expired', color: 'gray' },
};

export default function AdminDashbordContainer() {
  const [statusData, setStatusData] = useState<StatusCardType[]>([]);
  const [industyJobs, setIndustryJobs] = useState<IndustryPostCount[]>([]);
  const [industryApps, setIndustryApps] = useState<AppData[]>([]);
  const [interviewData, setInterviewData] = useState<InterviewData[]>([]);
  const [totalPendingCompany, setTotalPendingcompany] = useState<number>(0);
  const [totalReportedJobs, setTotalReportedJobs] = useState<number>(0);

  const [pendingJobs, setPendingJobs] = useState<PendingJobs[]>([]);
  const [comp_job_chartData, setComp_job_chartData] = useState<
    Company_Job_ChartData[]
  >([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [pendingCompanies, setPendingCompanies] = useState<DashboardCompany[]>(
    []
  );

  const UserDistData: Record<UserRole, { color: string; label: string }> = {
    company: { color: '#f59e0b', label: 'Companies' },
    candidate: { color: 'rgb(99, 102, 241)', label: 'Job seekers' },
    admin: { color: '#10a99c', label: 'Admins' },
  };
  useEffect(() => {
    try {
      const getStatusData = async () => {
        const data = await adminDashboardService.getStatusData();

        const activeJobs: StatusCardType = {
          icon: Briefcase,
          label: 'Total Active Jobs',
          value: data.statusData.totalActiveJobs.count,
          delta: data.statusData.totalActiveJobs.changePercentage + ' %',
          positive: data.statusData.totalActiveJobs.isPositive,
          classname: 'bg-amber-50 text-amber-600',
        };
        const pendingApproval: StatusCardType = {
          icon: Clock,
          label: 'Pending Approvals',
          value: data.statusData.pendingApprovals.count,
          delta: 'Needs review',
          positive: data.statusData.pendingApprovals.isPositive,
          classname: 'bg-rose-50 text-rose-600',
        };
        const registeredSeekers: StatusCardType = {
          icon: Users,
          label: 'Registered Seekers',
          value: data.statusData.registeredSeekers.count,
          delta: data.statusData.registeredSeekers.changePercentage + ' %',
          positive: data.statusData.registeredSeekers.isPositive,
          classname: 'bg-emerald-50 text-emerald-600',
        };
        const verifiedCompanies: StatusCardType = {
          icon: Building2,
          label: 'Verified Companies',
          value: data.statusData.verifiedCompanies.count,
          delta: data.statusData.verifiedCompanies.changePercentage + ' %',
          positive: data.statusData.verifiedCompanies.isPositive,
          classname: 'bg-sky-50 text-sky-600',
        };
        setStatusData([
          activeJobs,
          pendingApproval,
          verifiedCompanies,
          registeredSeekers,
        ]);
      };
      getStatusData();

      const company_job_chartData = async () => {
        const data = await adminDashboardService.getCompanyJobChartData();

        setComp_job_chartData(data.chartData);
      };

      company_job_chartData();

      const getIndustryJobCount = async () => {
        const data = await adminDashboardService.getIndustryWiseJobCount();

        setIndustryJobs(data.postData);
      };

      getIndustryJobCount();

      const getUserData = async () => {
        const data = await adminDashboardService.getUserDistributionData();
        let resData: { role: UserRole; value: number }[] = data.userData;
        //  console.log('userdata', data);
        setUserData(
          resData.map((data) => ({
            ...data,
            color: UserDistData[data.role].color,
            label: UserDistData[data.role].label,
          }))
        );
      };

      getUserData();

      const getAppData = async () => {
        const data = await adminDashboardService.getApplivcationData();
        // console.log('appdata', data.appData);

        setIndustryApps(data.appData);
      };
      getAppData();

      const getInterviewData = async () => {
        const data = await adminDashboardService.getInterviewData();
        const intData: { status: Status; count: number; value: number }[] =
          data.interviewData;
        console.log('interview data', intData);
        setInterviewData(
          intData.map((data) => ({
            ...data,
            color: InterivewConfig[data.status].color,
            label: InterivewConfig[data.status].label,
          }))
        );
      };
      getInterviewData();

      const getPendings = async () => {
        const data = await adminDashboardService.getDashboardPendings();
        console.log('pending dashboard data', data);
        const jobs: {
          id: string;
          title: string;
          type: JobType;
          companyName: string;
          count: number;
        }[] = data.pendings.jobs;
        const { companies, jobCount, companyCount } = data.pendings;
        setPendingCompanies(companies);
        setTotalPendingcompany(companyCount);
        setTotalReportedJobs(jobCount);
        setPendingJobs(
          jobs.map((j) => ({
            ...j,
            reportCount: j.count,
            jobTypeLabel: jobTypeConfig[j.type],
          }))
        );
      };

      getPendings();
    } catch (error) {}
  }, []);

  const hasCompanyData = comp_job_chartData.length > 0;
  const hasIndustryData = industyJobs.length > 0;
  const hasBothData = hasCompanyData && hasIndustryData;
  const hasNeitherData = !hasCompanyData && !hasIndustryData;
  return (
    <div>
      <main className="p-4 lg:p-8">
        <div className="space-y-6">
          {/* status cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statusData.map((card, i) => {
              return <DashboardStatCard key={i} card={card} />;
            })}
          </div>

          <ActionPending
            companies={pendingCompanies}
            jobs={pendingJobs}
            totalCompanies={totalPendingCompany}
            totalJobs={totalReportedJobs}
          />

          {/* job category+chart */}

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3"></div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Company */}
            <div
              className={
                hasCompanyData && hasIndustryData
                  ? 'lg:col-span-2'
                  : hasCompanyData
                    ? 'lg:col-span-3'
                    : hasNeitherData
                      ? 'lg:col-span-2'
                      : 'hidden'
              }
            >
              {hasCompanyData ? (
                <Company_Job_chart chartData={comp_job_chartData} />
              ) : hasNeitherData ? (
                <EmptyState
                  title="No company job data"
                  description="Company job statistics will appear here."
                />
              ) : null}
            </div>

            {/* Industry */}
            <div
              className={
                hasCompanyData && hasIndustryData
                  ? 'lg:col-span-1'
                  : hasIndustryData
                    ? 'lg:col-span-3'
                    : hasNeitherData
                      ? 'lg:col-span-1'
                      : 'hidden'
              }
            >
              {hasIndustryData ? (
                <CategorywisePosts postData={industyJobs} />
              ) : hasNeitherData ? (
                <EmptyState
                  title="No industry data"
                  description="Industry statistics will appear here."
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mt-10 xl:grid-cols-3 gap-6">
          {userData.length ? (
            <UserDistributionChart userData={userData} />
          ) : (
            <EmptyState
              title="No users available"
              description="There is no user data to display yet."
            />
          )}
          {industryApps.length ? (
            <ApplicationByIndustry appData={industryApps} />
          ) : (
            <EmptyState
              title="No Applications available"
              description="There is no Applications data to display yet."
            />
          )}
          {interviewData.length ? (
            <InterviewStatusChart interviewData={interviewData} />
          ) : (
            <EmptyState
              title="No Interviews Shceduled"
              description="There is no Interview data to display yet."
            />
          )}
        </div>

        <div className="grid grid-cols-1 mt-10 xl:grid-cols-2 gap-6">
          {/* <PendingCompany companies={pendingCompanies} /> */}
          {/* <ReportedJobs jobs={pendingJobs} /> */}
        </div>
      </main>
    </div>
  );
}

import { Inbox } from 'lucide-react';

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
};

export const EmptyState = ({
  title = 'No data available',
  description = 'There is no data to display yet.',
  icon = <Inbox className="h-8 w-8" />,
  className = '',
}: EmptyStateProps) => {
  return (
    <div
      className={`flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm ${className}`}
    >
      <div className="mb-3 text-slate-400">{icon}</div>

      <h3 className="text-base font-semibold text-slate-700">{title}</h3>

      <p className="mt-1 max-w-sm text-sm text-slate-400">{description}</p>
    </div>
  );
};
