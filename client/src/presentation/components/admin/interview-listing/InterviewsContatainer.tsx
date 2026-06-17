import { useState } from 'react';
import { useEffect } from 'react';
import { useInterviews } from '../../../hooks/user/useInterview';
import AddReasonModal from '../jobs/AddReasonModal';
import { Eye, XCircle } from 'lucide-react';
import { interviewStatusStyles } from '../../../hooks/user/useInterview';

import HeroSection from '../HeroSection';
import StatusCards from '../StatusCards';
import ReusableTable from '../Candidates/ReusableTable';
import Pagination from '../../common/Pagination';
import { useToast } from '../../../../shared/toast/use-toast';
import { type TabType } from '../Candidates/ReusableTable';
import { type StatusCardType } from '../../../pages/admin/Companies';
import { type ColumnType } from '../Candidates/ReusableTable';

import type {
  InterviewDto,
  InterviewStatusType,
  interviewDetailDto,
} from '../../../../types/dtos/interview.dto';
import InterviewDetailsModal from './InterviewModal';
import { to12Hour } from '../../../../utils/date-conversion';
import { interviewService } from '../../../../services/api-services/interview.service';

const tabs: TabType[] = [
  { label: 'All', value: '' },
  { label: 'Scheduled', value: 'scheduled' },

  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Not Show', value: 'not_show' },
  { label: 'Reschedule Requested', value: 'isRescheduleRequested' },
];

export type OpenModalType = {
  isOpen: boolean;
  mode: 'edit';
};

function InterviewsContatainer() {
  const { showToast } = useToast();
  const [stats, setSats] = useState<StatusCardType[]>([]);
  const [interviews, setInterviews] = useState<InterviewDto[]>([]);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState(5);
  const [sortby, setSortBy] = useState<string>('newest');
  const [viewModal, setViewModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [interview, setInterview] = useState<interviewDetailDto | null>(null);
 



  const {
    filter,
    updateFilter,
    filterOptions,
    sortFilter,
   
    getInterviewDetails,
  } = useInterviews(setPage);

  useEffect(() => {
    async function getStatusData() {
      try {
        const data = await interviewService.getInterviewsStatus();
        console.log('from admin get interview status', data);

        const statusData = data.statuses;
        console.log(`status data after fetching `, data);

        const total: StatusCardType = {
          label: 'Total Interviews',
          count: statusData.total || 0,
          icon: '🏢',
        };
        const ShortListed: StatusCardType = {
          label: 'ShortListed',
          count: statusData.shortListed || 0,
          icon: '⏳',
        };
        const completed: StatusCardType = {
          label: 'Completed',
          count: statusData.completed || 0,
          icon: '⭐',
        };

        const passed: StatusCardType = {
          label: 'Passed',
          count: statusData.passed || 0,
          icon: '🏆',
        };
        setSats([total, completed, ShortListed, passed]);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }

    getStatusData();
  }, [interviews]);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const data = await interviewService.getInterviews(
          { ...filter, sortby },
          page,
          limit
        );
        console.log('interviws', data.interviews);

        setInterviews(data.interviews);
        setTotalDocs(data.totalDocs);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getInterviews();
  }, [filter, page, limit, sortby]);

  const interviewColumns = [
    {
      key: 'jobTitle',
      label: 'Job Role',
      render: (i: InterviewDto) => (
        <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-sm inline-block whitespace-nowrap max-w-[180px] overflow-hidden text-ellipsis">
          <span title={i.jobTitle}>{i.jobTitle}</span>
        </div>
      ),
    },

    {
      key: 'candidateName',
      label: 'Candidate',
      render: (i: InterviewDto) => (
        <span className="text-slate-700 whitespace-nowrap">{i.name}</span>
      ),
    },
    {
      key: 'companyName',
      label: 'Company',
      render: (i: InterviewDto) => (
        <span className="text-slate-700 whitespace-nowrap">{i.company}</span>
      ),
    },

    {
      key: 'mode',
      label: 'Mode',
      render: (i: InterviewDto) => (
        <span className="text-slate-700 capitalize whitespace-nowrap">
          {i.mode}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Scheduled-date',
      render: (i: InterviewDto) => (
        <span className="text-slate-700 capitalize whitespace-nowrap">
          {i.createdAt}
        </span>
      ),
    },

    {
      key: 'date',
      label: 'Scheculed on',
      render: (i: InterviewDto) => (
        <span className="text-slate-700 whitespace-nowrap">
          {i.scheduledAt.date}
        </span>
      ),
    },

    {
      key: 'time',
      label: 'Time',
      render: (i: InterviewDto) => (
        <span className="text-slate-700 whitespace-nowrap">
          {to12Hour(i.scheduledAt.time)}
        </span>
      ),
    },

    {
      key: 'status',
      label: 'Status',
      render: (i: InterviewDto) => (
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${interviewStatusStyles[i.status]}`}
        >
          {i.status}
        </span>
      ),
    },

    {
      key: 'result',
      label: 'Result',
      render: (i: InterviewDto) => {
        let classes =
          'text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap';

        if (i.status === 'cancelled') {
          classes += ' bg-gray-100 text-gray-400';
        } else if (i.result === 'passed') {
          classes += ' bg-green-50 text-green-600';
        } else if (i.result === 'failed') {
          classes += ' bg-red-50 text-red-600';
        } else {
          classes += ' bg-amber-50 text-amber-600';
        }

        return (
          <span className={classes}>
            {i.status === 'cancelled' ? '------' : (i.result ?? 'pending')}
          </span>
        );
      },
    },

    {
      key: 'actions',
      label: 'Actions',
      render: (i: InterviewDto) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          {/* View */}
          <button
            onClick={() => handleView(i.id)}
            className="text-indigo-600 hover:text-indigo-800"
            title="View"
          >
            <Eye size={18} />
          </button>

          {/* Cancel */}
          {i.status === 'scheduled' && (
            <button
              onClick={() => {
                setSelectedId(i.id);
                setCancelModal(true);
              }}
              className="text-red-600 hover:text-red-800"
              title="Cancel"
            >
              <XCircle size={18} />
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleView = async (id: string) => {
    console.log('id', id);
    setViewModal(true);
    const inter = await getInterviewDetails(id);
    setInterview(inter);
  };

  const handleCancel = async (status: InterviewStatusType, reason: string) => {
    if (!selectedId) return;
    const data = await interviewService.updateStaus(selectedId, status, reason);
    if (interview) {
      setInterview((prev) => {
        if (prev) {
          return { ...prev, status: 'cancelled', cancelledBy: 'admin' };
        } else return prev;
      });
    } else if (selectedId) {
      const updated = interviews.map((i) =>
        i.id === selectedId ? { ...i, status: 'cancelled' } : i
      );
      setInterviews(updated);
    }
    showToast({ msg: data.message, type: 'success' });
    setCancelModal(false);
    if (selectedId) setSelectedId(null);
  };

  const handleCancelClick = (id: string) => {
    setSelectedId(id);
    setCancelModal(true);
  };
  return (
    <>
      <div>
        <div className="min-h-screen w-full bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroSection
              title="Intervew Management"
              tagline=" Manage all Interviews of your Platform"
            />
            <StatusCards stats={stats} />
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {' '}
              <ReusableTable
                totalDocs={totalDocs}
                columns={interviewColumns as ColumnType<InterviewDto>[]}
                tabs={tabs}
                updateFilter={updateFilter}
                entities={interviews}
                filterOptions={filterOptions}
                sortOption={sortFilter}
                setSortBy={setSortBy}
              />
              <Pagination
                onPageChange={setPage}
                totalPages={Math.ceil(totalDocs / limit)}
                count={interviews.length}
                totalItem={totalDocs}
                item="Jobs"
                currentPage={page}
              />
            </div>
          </div>
        </div>

        <InterviewDetailsModal
          interview={interview}
          isOpen={viewModal}
          setCancel={handleCancelClick}
          onClose={() => {
            setSelectedId(null);
            setViewModal(false);
          }}
        />
        <AddReasonModal
          onClose={() => setCancelModal(false)}
          isOpen={cancelModal}
          status="cancelled"
          item="Interview"
          action="Cancel"
          onConfirm={handleCancel}
        />
      </div>
    </>
  );
}

export default InterviewsContatainer;
