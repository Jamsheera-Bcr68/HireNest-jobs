import ReusableTable from '../../../admin/Candidates/ReusableTable';
import JobModal from '../Modal';
import { useToast } from '../../../../../shared/toast/useToast';
import HeroSection from '../../../admin/HeroSection';
import StatusCards from '../../../admin/StatusCards';

import { useEffect, useState } from 'react';
import { jobService } from '../../../../../services/apiServices/jobService';
import { type StatusCardType } from '../../../../pages/admin/Companies';
import { type JobCardDto } from '../../../../../types/dtos/jobDto';
import { statusStyles } from '../../../../pages/admin/Candidates';
import { useNavigate } from 'react-router-dom';
import { Eye, SquarePenIcon, Trash, LockOpen } from 'lucide-react';
import { type ColumnType } from '../../../admin/Candidates/ReusableTable';
import { Experience_Types } from '../../../../../types/dtos/profileTypes/experienceType';
import { formatSalary } from '../../../../../utils/salaryFormat';
import { useSelector } from 'react-redux';
import type { StateType } from '../../../../../constants/types/user';
import Pagination from '../../../common/Pagination';
import { type JobFilterType } from '../../../candidate/jobListing/ListingContainter';
import ConfirmationModal from '../../../../modals/ConfirmationModal';
import { type StatusType } from '../../../../../types/dtos/profileTypes/userTypes';
import UpdateLastDateModal from '../job-details/UpdateLastDateModal';
import JobForm from '../JobForm';

export type UpdateStatusType = {
  status: StatusType;
  lastDate?: string;
  reason?: string;
};

const filterOptions = [
  {
    key: 'experience',
    label: 'Experience',
    options: Experience_Types,
  },
  {
    key: 'mode',
    label: 'Work Mode',
    options: ['onsite', 'remote', 'hybrid'],
  },
];

const tabs = ['All', 'Active', 'Suspended', 'Expired', 'Closed'];

function CompanyJobListingContainer() {
  const user = useSelector((state: StateType) => state.auth.user);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatusCardType[]>([]);
  const [jobs, setJobs] = useState<JobCardDto[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [limit] = useState(10);

  const [filter, setFilter] = useState<JobFilterType>({
    search: { job: '', location: '' },
    companyId: user.companyId,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<JobCardDto | null>(null);
  const [reOpenModal, setReOpenModal] = useState<boolean>(false);
  const [showResetDateModal, setShowResetDateModal] = useState(false);
  const [newLastDate, setNewLastDate] = useState('');

  const handleUpdateStatus = async (status: StatusType) => {
    if (!selectedJob) return;
    if (status == 'active' && new Date(selectedJob.lastDate) < new Date()) {
      setShowResetDateModal(true);
      return;
    }
    await updateStatus(status);
  };

  const updateStatus = async (status: StatusType, lastDate?: string) => {
    console.log(
      'from update status before return',
      selectedJob,
      status,
      lastDate
    );
    if (!selectedJob) return;
    console.log('from update status', selectedJob, status, lastDate);

    try {
      let payload: UpdateStatusType = { status };
      if (lastDate) {
        payload = { ...payload, lastDate: lastDate };
      }
      const data = await jobService.updateJobstatus(payload, selectedJob.id);
      showToast({
        msg: data.message,
        type: 'success',
      });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === selectedJob.id
            ? { ...job, status, ...(lastDate && { lastDate }) }
            : job
        )
      );
      setSelectedJob(null);
      setNewLastDate('');
      setShowResetDateModal(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
      setSelectedJob(null);
      setNewLastDate('');
    }
  };

  const postColumns = [
    {
      key: 'title',
      label: 'Title',
      render: (j: JobCardDto) => (
        <>
          {' '}
          <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm inline-block">
            <span className="font-semibold text-slate-800">{j.title}</span>
          </div>
        </>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (j: JobCardDto) => (
        <>
          {' '}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-800">
              {j.jobType == 'partTime' ? 'Part Time' : 'Full Time'}
            </span>
          </div>
        </>
      ),
    },
    {
      key: 'mode',
      label: 'Mode',
      render: (j: JobCardDto) => j.mode,
    },
    {
      key: 'salary',
      label: 'Salary',
      render: (j: JobCardDto) => {
        return formatSalary(j.min_salary, j.max_salary);
      },
    },
    {
      key: 'createdAt',
      label: 'Posted',
      render: (j: JobCardDto) => new Date(j.createdAt).toLocaleDateString(),
    },
    {
      key: 'lastDate',
      label: 'Expiry',
      render: (j: JobCardDto) =>
        j.lastDate ? new Date(j.lastDate).toLocaleDateString() : '---------',
    },
    {
      key: 'status',
      label: 'Status',
      render: (j: JobCardDto) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full  ${statusStyles[j.status]}`}
        >
          {j.status}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (j: JobCardDto) => (
        <div className="flex items-center  gap-2">
          <button
            onClick={() => navigate(`/company/jobs/${j.id}`)}
            className="text-indigo-600 hover:text_indigo-800 "
            title="view"
          >
            <Eye size={18} />
          </button>
          <button
            disabled={!['active', 'paused'].includes(j.status)}
            onClick={() => {
              setSelectedJob(j);
              setEditModalOpen(true);
            }}
            className={`font-semibold ${
              ['active', 'paused'].includes(j.status)
                ? 'text-yellow-700 hover:text-indigo-800'
                : 'text-slate-300 cursor-not-allowed'
            }`}
            title="Edit"
          >
            <SquarePenIcon size={16} />
          </button>
          <button
            disabled={j.status === 'removed'}
            onClick={() => {
              setSelectedJob(j);
              setDeleteModalOpen(true);
            }}
            className={`font-semibold ${
              ['active', 'paused'].includes(j.status)
                ? 'text-red-700 hover:text-indigo-800'
                : 'text-slate-300 cursor-not-allowed'
            }`}
            title="Remove"
          >
            <Trash size={16} />
          </button>
          {['closed', 'expired'].includes(j.status) && (
            <button
              onClick={() => {
                setSelectedJob(j);
                setReOpenModal(true);
              }}
              className={`font-bold text-green-700 hover:text-green-800`}
              title="ReOpen"
            >
              <LockOpen size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function getPostStatusData() {
      try {
        const data = await jobService.getCompanyJobstatus();
        const statusData = data.statusData;
        console.log(`status data after fetching `, data);

        const total: StatusCardType = {
          label: 'Total Posts',
          count: statusData.total || 0,
          icon: '🏢',
        };
        const active: StatusCardType = {
          label: 'Active Posts',
          count: statusData.active || 0,
          icon: '✅',
        };
        const closed: StatusCardType = {
          label: 'New This Month',
          count: statusData.closed || 0,
          icon: '❌',
        };
        const suspended: StatusCardType = {
          label: 'Suspended Jobs',
          count: statusData.suspended || 0,
          icon: '🚫',
        };
        setStats([total, active, closed, suspended]);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }

    getPostStatusData();
  }, []);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await jobService.getJobs({ ...filter }, '', 10, page);
        console.log('datas after fetching compnay jobs', data);
        setJobs(data.jobs);
        setTotalDocs(data.totalDocs);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getJobs();
  }, [filter, page]);

  const handleFilterChange = (
    incomingFilter: Partial<JobFilterType> & { search?: string }
  ) => {
    const updatedFilter: Partial<JobFilterType> = { ...incomingFilter };

    // convert search string → search object
    if (typeof incomingFilter.search === 'string') {
      updatedFilter.search = {
        job: incomingFilter.search,
        location: '',
      };
    }
    if (updatedFilter.status == 'all') updatedFilter.status = '';

    const normalizedFilter = normalizeFilter(updatedFilter);

    setFilter((prev) => ({
      ...prev,
      ...normalizedFilter,
    }));
  };
  const normalizeFilter = (
    filter: Partial<JobFilterType>
  ): Partial<JobFilterType> => {
    return {
      ...filter,

      ...(filter.experience && {
        experience: [filter.experience].flat(),
      }),

      ...(filter.jobType && {
        jobType: [filter.jobType].flat(),
      }),

      ...(filter.industry && {
        industry: [filter.industry].flat(),
      }),

      ...(filter.salary && {
        salary: [filter.salary].flat(),
      }),

      ...(filter.mode && {
        mode: [filter.mode].flat(),
      }),
    };
  };

  return (
    <>
      <div>
        <div className="min-h-screen w-full bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroSection
              title="Post Management"
              tagline=" Manage all Posts of your Company"
            />
            <StatusCards stats={stats} />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {' '}
              <ReusableTable
                totalDocs={totalDocs}
                columns={postColumns as ColumnType<JobCardDto>[]}
                tabs={tabs}
                updateFilter={handleFilterChange}
                entities={jobs}
                filterOptions={filterOptions}
              />
              <Pagination
                onPageChange={setPage}
                totalPages={Math.ceil(totalDocs / limit)}
                count={jobs.length}
                totalItem={totalDocs}
                item="Jobs"
                currentPage={page}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setSelectedJob(null);
          setDeleteModalOpen(false);
        }}
        item="Job"
        action="Remove"
        type="delete"
        onConfirm={() => handleUpdateStatus('removed')}
      />
      <ConfirmationModal
        isOpen={reOpenModal}
        onClose={() => {
          setReOpenModal(false);
        }}
        item="Job"
        action="Reopen"
        type="info"
        onConfirm={() => handleUpdateStatus('active')}
      />
      <UpdateLastDateModal
        lastDate={newLastDate}
        isOpen={showResetDateModal}
        onClose={() => {
          setSelectedJob(null);
          setShowResetDateModal(false);
        }}
        onSetDate={setNewLastDate}
        onConfirm={() => updateStatus('active', newLastDate)}
      />
      <JobModal
        title="Edit Job"
        desc="Update job details and save changes"
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      >
        <JobForm
          onClose={() => setEditModalOpen(false)}
          mode="edit"
          jobId={selectedJob?.id}
          onUpdate={async (data) => {
            const updated = jobs.map((job) =>
              job.id == selectedJob?.id ? { ...job, ...data } : job
            );
            setJobs(updated as JobCardDto[]);
          }}
        />
      </JobModal>
    </>
  );
}

export default CompanyJobListingContainer;
