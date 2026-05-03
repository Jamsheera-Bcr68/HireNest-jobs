import HeroSection from '../../../admin/HeroSection';
import StatusCards from '../../../admin/StatusCards';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import type { StatusCardType } from '../../../../pages/admin/Companies';
import { applicationService } from '../../../../../services/apiServices/application.service';
import { useToast } from '../../../../../shared/toast/useToast';
import { appStatusStyles } from '../../../candidate/applications/ApplicationCard';
import { type ApplicationDto } from '../../../../../types/dtos/application.dto';
import type { ColumnType } from '../../../admin/Candidates/ReusableTable';
import { useApplications } from '../../../../hooks/user/candidate/profile/useApplication';
import ReusableTable from '../../../admin/Candidates/ReusableTable';
import Pagination from '../../../common/Pagination';

const statusFilter = {
  key: 'status',
  label: ' Status',
  options: [
    'pending',
    'viewed',
    'shortListed',
    'rejected',
    'interviewSheduled',
  ],
};

const typeFilter = {
  key: 'Type',
  label: ' Types',
  options: ['fullTime', 'partTime'],
};

const sortOrder = {
  key: 'Sort',
  label: 'Sort ',
  options: ['newest', 'oldest'],
};

const tabs = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Viewed', value: 'viewed' },
  { label: 'Short Listed', value: 'shortListed' },
  { label: 'Interview Scheduled', value: 'interviewScheduled' },
  { label: 'Rejected', value: 'rejected' },
];

const filterOptions = [statusFilter, typeFilter, sortOrder];
function ApplicationListingContainer({ role }: { role: 'company' | 'admin' }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [applications, setApplications] = useState<ApplicationDto[]>([]);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [limit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [stats, setSats] = useState<StatusCardType[]>([]);
  const { filter, updateFilter } = useApplications((page?: number) => {
    if (page) {
      setPage(page);
    }
  });

  const [activeApp, setActiveApp] = useState<ApplicationDto | null>(null);
  const handleUpdate = async (id: string) => {
    try {
      const data = await applicationService.updateAppStatus(id, 'reviewed');
      console.log('after update, application', data);
      setApplications((prev) =>
        prev.map((app) => (app.id == id ? { ...app, status: 'reviewed' } : app))
      );
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  const applicationColumns = [
    {
      key: 'jobTitle',
      label: 'Job Title',
      render: (a: ApplicationDto) => (
        <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm inline-block">
          <span className="font-semibold text-slate-800">{a.jobTitle}</span>
        </div>
      ),
    },

    {
      key: 'location',
      label: 'Location',
      render: (a: ApplicationDto) => (
        <span className="text-slate-700">{a.location}</span>
      ),
    },

    {
      key: 'workMode',
      label: 'Mode',
      render: (a: ApplicationDto) => (
        <span className="text-slate-700">{a.workMode}</span>
      ),
    },

    {
      key: 'jobType',
      label: 'Type',
      render: (a: ApplicationDto) => (
        <span className="font-semibold text-slate-800">
          {a.jobType === 'partTime' ? 'Part Time' : 'Full Time'}
        </span>
      ),
    },

    {
      key: 'appliedDate',
      label: 'Applied On',
      render: (a: ApplicationDto) =>
        new Date(a.appliedDate).toLocaleDateString(),
    },

    {
      key: 'status',
      label: 'Status',
      render: (a: ApplicationDto) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${appStatusStyles[a.status]}`}
        >
          {a.status}
        </span>
      ),
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (a: ApplicationDto) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (a.status == 'pending') handleUpdate(a.id);
              const url =
                role === 'admin'
                  ? `/admin/applications/${a.id}`
                  : `/company/applications/${a.id}`;
              navigate(url);
            }}
            className="text-indigo-600 hover:text-indigo-800"
            title="View"
          >
            <Eye size={18} />
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    async function getStatusData() {
      try {
        const data = await applicationService.getApplicationStatus();
        console.log(data);

        const statusData = data.appStatus;

        const total: StatusCardType = {
          label: 'Total Applications',
          count: statusData.total || 0,
          icon: '🏢',
        };
        const pending: StatusCardType = {
          label: 'Pending Review',
          count: statusData.pending || 0,
          icon: '⏳',
        };
        const shortListed: StatusCardType = {
          label: 'Short Listed',
          count: statusData.shortListed || 0,
          icon: '⭐',
        };
        const interviewShceduled: StatusCardType = {
          label: 'Interview Scheduled',
          count: statusData.interviewSheduled || 0,
          icon: '📅',
        };
        setSats([total, pending, shortListed, interviewShceduled]);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }

    getStatusData();
  }, [applications]);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const data = await applicationService.getApplications(
          filter,
          page,
          limit
        );
        console.log('applications', data.applications);

        setApplications(data.applications);
        setTotalDocs(data.totalDocs);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getApplications();
  }, [filter, page, limit]);

  return (
    <>
      <div>
        <div className="min-h-screen w-full bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroSection
              title="Application Management"
              tagline=" Manage all Applications of your Company"
            />
            <StatusCards stats={stats} />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {' '}
              <ReusableTable
                totalDocs={totalDocs}
                columns={applicationColumns as ColumnType<ApplicationDto>[]}
                tabs={tabs}
                updateFilter={updateFilter}
                entities={applications}
                filterOptions={filterOptions}
              />
              <Pagination
                onPageChange={setPage}
                totalPages={Math.ceil(totalDocs / limit)}
                count={applications.length}
                totalItem={totalDocs}
                item="Jobs"
                currentPage={page}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationListingContainer;
