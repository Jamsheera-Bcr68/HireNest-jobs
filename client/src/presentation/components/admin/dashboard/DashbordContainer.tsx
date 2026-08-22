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
  completed: { label: 'Completed', color:  '#10a99c' },
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

      const getPendingCompanies = async () => {
        const data = await adminDashboardService.getPendingCompanies();
        console.log('pending company data', data);
        setPendingCompanies(data.companies);
      };

      getPendingCompanies();

      const getReportedJobs = async () => {
        const data = await adminDashboardService.getReportedJobs();

        const jobs: {
          id: string;
          title: string;
          type: JobType;
          companyName: string;
          count: number;
        }[] = data.jobs;
        setPendingJobs(
          jobs.map((j) => ({
            ...j,
            reportCount: j.count,
            jobTypeLabel: jobTypeConfig[j.type],
          }))
        );
      };

      getReportedJobs();
    } catch (error) {}
  }, []);

  return (
    <div>
      <main className="p-4 lg:p-8">
        <div className="space-y-6">
          {/* status cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statusData.map((card, i) => {
              return <DashboardStatCard card={card} />;
            })}
          </div>
          {pendingCompanies.length || pendingJobs.length ? (
            <ActionPending companies={pendingCompanies} jobs={pendingJobs} />
          ) : null}
          {/* job category+chart */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            {comp_job_chartData.length > 0 && (
              <div
                className={
                  industyJobs.length > 0 ? 'xl:col-span-2' : 'xl:col-span-3'
                }
              >
                <Company_Job_chart chartData={comp_job_chartData} />
              </div>
            )}

            {industyJobs.length > 0 && (
              <div
                className={
                  comp_job_chartData.length > 0
                    ? 'xl:col-span-1'
                    : 'xl:col-span-3'
                }
              >
                <CategorywisePosts postData={industyJobs} />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 mt-10 xl:grid-cols-3 gap-6">
          <UserDistributionChart userData={userData} />
          <ApplicationByIndustry appData={industryApps} />
          <InterviewStatusChart interviewData={interviewData} />
        </div> 
        
        <div className="grid grid-cols-1 mt-10 xl:grid-cols-2 gap-6">
          {/* <PendingCompany companies={pendingCompanies} /> */}
          {/* <ReportedJobs jobs={pendingJobs} /> */}
        </div>
      </main>
    </div>
  );
}

// function OverviewView({ pendingTotal, pendingJobs, pendingCompanies, employers, seekers, goTo }) {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard icon={Briefcase} label="Total Active Jobs" value="1,248" delta="8.2%" positive accent="bg-amber-50 text-amber-600" />
//         <StatCard icon={Clock} label="Pending Approvals" value={pendingTotal} delta="Needs review" positive={false} accent="bg-rose-50 text-rose-600" />
//         <StatCard icon={Building2} label="Verified Companies" value={employers.length + "12"} delta="4.1%" positive accent="bg-sky-50 text-sky-600" />
//         <StatCard icon={Users} label="Registered Seekers" value="9,532" delta="12.6%" positive accent="bg-emerald-50 text-emerald-600" />
//       </div>

//       <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Postings Trend</h3>
//               <p className="text-sm text-slate-500">Jobs & companies onboarded per month</p>
//             </div>
//             <div className="flex items-center gap-4 text-xs">
//               <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-amber-400" /> Jobs</span>
//               <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-slate-300" /> Companies</span>
//             </div>
//           </div>
//           <div className="mt-4 h-64">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={trendData} margin={{ left: -20, top: 10 }}>
//                 <defs>
//                   <linearGradient id="jobsFill" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.35} />
//                     <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                 <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
//                 <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
//                 <Area type="monotone" dataKey="jobs" stroke="#f59e0b" strokeWidth={2.5} fill="url(#jobsFill)" />
//                 <Area type="monotone" dataKey="companies" stroke="#cbd5e1" strokeWidth={2} fill="transparent" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//           <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Jobs by Category</h3>
//           <p className="text-sm text-slate-500">Share of active listings</p>
//           <div className="mt-5 space-y-4">
//             {categoryData.map((c) => (
//               <div key={c.label}>
//                 <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
//                   <span>{c.label}</span>
//                   <span>{c.value}%</span>
//                 </div>
//                 <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
//                   <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.value}%` }} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Jobs Awaiting Review</h3>
//             <button onClick={() => goTo("jobs")} className="text-xs font-semibold text-amber-600 hover:underline">View all</button>
//           </div>
//           <ul className="mt-4 divide-y divide-slate-100">
//             {pendingJobs.slice(0, 4).map((j) => (
//               <li key={j.id} className="flex items-center gap-3 py-3">
//                 <Avatar initials={j.initials} tone="slate" />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-sm font-semibold text-slate-800">{j.title}</p>
//                   <p className="truncate text-xs text-slate-500">{j.company} · {j.location}</p>
//                 </div>
//                 <Badge tone="pending">Pending</Badge>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//           <div className="flex items-center justify-between">
//             <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Companies Awaiting Verification</h3>
//             <button onClick={() => goTo("companies")} className="text-xs font-semibold text-amber-600 hover:underline">View all</button>
//           </div>
//           <ul className="mt-4 divide-y divide-slate-100">
//             {pendingCompanies.map((c) => (
//               <li key={c.id} className="flex items-center gap-3 py-3">
//                 <Avatar initials={c.initials} tone="sky" />
//                 <div className="min-w-0 flex-1">
//                   <p className="truncate text-sm font-semibold text-slate-800">{c.name}</p>
//                   <p className="truncate text-xs text-slate-500">{c.industry} · {c.docs} documents</p>
//                 </div>
//                 <Badge tone="info">New</Badge>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }
