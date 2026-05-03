import { useEffect, useState } from 'react';
import HeroSection from '../HeroSection';
import StatusCards from '../StatusCards';
import { type StatusCardType } from '../../../pages/admin/Companies';
import { adminService } from '../../../../services/apiServices/adminService';
import { useToast } from '../../../../shared/toast/useToast';
import ReusableTable from '../Candidates/ReusableTable';
import { type JobCardDto } from '../../../../types/dtos/jobDto';
import { statusStyles } from '../../../pages/admin/Candidates';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash, Ban, ThumbsUp } from 'lucide-react';
import { type ColumnType } from '../Candidates/ReusableTable';
import { Experience_Types } from '../../../../types/dtos/profileTypes/experienceType';
import { type JobFilterType } from '../../candidate/jobListing/ListingContainter';
import Pagination from '../../common/Pagination';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import { type UpdateStatusType } from '../../user/employer/company-joblisting/CompanyJobListingContainer';
import type { StatusType } from '../../../../types/dtos/profileTypes/userTypes';

import AddReasonModal from './AddReasonModal';

const tabs = [
  { label: 'All', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Suspended', value: 'suspended' },
  { label: 'Expired', value: 'expired' },
  { label: 'Closed', value: 'closed' },
  { label: 'Removed', value: 'removed' },
];
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

function JobContainer() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatusCardType[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobCardDto | null>(null);
  const [limit] = useState(5);
  const [jobs, setJobs] = useState<JobCardDto[]>([]);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [filter, setFilter] = useState<JobFilterType>({
    search: { job: '', location: '' },
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [activateModalOpen, setActivateModalOpen] = useState<boolean>(false);
  const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState<boolean>(false);
  const [showSuspendReasonModal, setShowSuspendReasonModal] =
    useState<boolean>(false);

  //getting status cards
  useEffect(() => {
    async function getPostStatusData() {
      try {
        const data = await adminService.getJobstatus();
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
        const reported: StatusCardType = {
          label: 'Reported',
          count: statusData.reported || 0,
          icon: '❌',
        };
        const suspended: StatusCardType = {
          label: 'Suspended Jobs',
          count: statusData.suspended || 0,
          icon: '🚫',
        };
        setStats([total, active, reported, suspended]);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }

    getPostStatusData();
  }, [jobs]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await adminService.getJobs({ ...filter }, '', limit, page);
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
  const postColumns = [
    {
      key: 'title',
      label: 'Job',
      render: (j: JobCardDto) => (
        <>
          {' '}
          <div
            className={`w-9 h-9 flex items-center justify-center font-bold text-xs flex-shrink-0`}
          >
            <span className="font-semibold text-slate-800">{j.title}</span>
          </div>
        </>
      ),
    },
    {
      key: 'companyName',
      label: 'Company',
      render: (j: JobCardDto) => (
        <>
          {' '}
          <div
            className={`w-9 h-9 flex items-center justify-center font-bold text-xs flex-shrink-0`}
          >
            <span className="font-semibold text-slate-800">
              {j.companyName}
            </span>
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
      key: 'location',
      label: 'Location',
      render: (j: JobCardDto) => j.location.state,
    },

    {
      key: 'createdAt',
      label: 'Posted',
      render: (j: JobCardDto) => new Date(j.createdAt).toLocaleDateString(),
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
      key: 'reports',
      label: 'Reports',
      render: (j: JobCardDto) => (
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full`}>
          {j.reportDetails?.length ?? 0}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (j: JobCardDto) => (
        <div className="flex items-center  gap-2">
          <button
            onClick={() => navigate(`/admin/jobs/${j.id}`)}
            className="text-indigo-600 hover:text_indigo-800 "
            title="view"
          >
            <Eye size={18} />
          </button>

          {j.status !== 'removed' && (
            <button
              onClick={() => {
                setSelectedJob(j);
                setDeleteModalOpen(true);
              }}
              className={`font-semibold text-red-700 hover:text-indigo-800`}
              title="Remove"
            >
              <Trash size={16} />
            </button>
          )}
          {j.status == 'active' && (
            <button
              onClick={() => {
                setSelectedJob(j);
                setSuspendModalOpen(true);
              }}
              className={`font-bold text-red-700 hover:text-red-800`}
              title="Suspend"
            >
              <Ban size={16} />
            </button>
          )}
          {j.status == 'suspended' && (
            <button
              onClick={() => {
                setSelectedJob(j);
                setActivateModalOpen(true);
              }}
              className={`font-bold text-green-700 hover:text-green-800`}
              title="Suspend"
            >
              <ThumbsUp size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

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

  const handleUpdateStatus = async (status: StatusType) => {
    if (!selectedJob) return;
    if (status == 'removed') {
      setShowReasonModal(true);
      return;
    }
    if (status == 'suspended') {
      setShowSuspendReasonModal(true);

      return;
    }
    await updateStatus(status);
  };
  const updateStatus = async (status: StatusType, reasonData?: string) => {
    if (!selectedJob) return;
    console.log('from update status', selectedJob, status, reasonData);

    try {
      let payload: UpdateStatusType = { status };
      if (reasonData) {
        payload = { ...payload, reason: reasonData };
      }
      const data = await adminService.updateJobstatus(payload, selectedJob.id);
      showToast({
        msg: data.message,
        type: 'success',
      });
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === selectedJob.id ? { ...job, status } : job
        )
      );
      setSelectedJob(null);
      setShowSuspendReasonModal(false);
      setShowReasonModal(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
      setSelectedJob(null);
    }
  };
  return (
    <>
      <div>
        <div className="min-h-screen w-full bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroSection
              title="Post Management"
              tagline=" Manage all Posts of your Platform"
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
          setDeleteModalOpen(false);
        }}
        item="Job"
        action="Remove"
        type="delete"
        onConfirm={() => handleUpdateStatus('removed')}
      />
      <ConfirmationModal
        isOpen={suspendModalOpen}
        onClose={() => {
          setSuspendModalOpen(false);
        }}
        item="Job"
        action="Suspend"
        type="delete"
        onConfirm={() => handleUpdateStatus('suspended')}
      />
      <ConfirmationModal
        isOpen={activateModalOpen}
        onClose={() => {
          setActivateModalOpen(false);
          setSelectedJob(null);
        }}
        item="Job"
        action="Activate"
        type="info"
        onConfirm={() => handleUpdateStatus('active')}
      />
      <AddReasonModal
        item="Job"
        status="removed"
        action="Remove"
        isOpen={showReasonModal}
        onClose={() => {
          setSelectedJob(null);
          setShowReasonModal(false);
        }}
        onConfirm={updateStatus}
      />
      <AddReasonModal
        item="Job"
        status="suspended"
        isOpen={showSuspendReasonModal}
        onClose={() => {
          setSelectedJob(null);
          setShowSuspendReasonModal(false);
        }}
        onConfirm={updateStatus}
        action="Suspend"
      />
    </>
  );
}

export default JobContainer;
