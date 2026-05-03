import { useState } from 'react';
import { useEffect } from 'react';
import { useInterviews } from '../../../../hooks/user/useInterview';
import AddReasonModal from '../../../admin/jobs/AddReasonModal';
import ConfirmationModal from '../../../../modals/ConfirmationModal';
import { Eye, XCircle, Calendar, CheckCircle } from 'lucide-react';
import { interviewStatusStyles } from '../../../../hooks/user/useInterview';
import HeroSection from '../../../admin/HeroSection';
import StatusCards from '../../../admin/StatusCards';
import ReusableTable from '../../../admin/Candidates/ReusableTable';
import Pagination from '../../../common/Pagination';
import RescheduleModal from './RescheduleModal';
import { useToast } from '../../../../../shared/toast/useToast';
import { type TabType } from '../../../admin/Candidates/ReusableTable';
import { type StatusCardType } from '../../../../pages/admin/Companies';
import { type ColumnType } from '../../../admin/Candidates/ReusableTable';
import InterviewFeedbackModal from './UpdateModal';
import { type InterviewResult } from '../../../../../types/dtos/interview.dto';
import type {
  InterviewDto,
  interviewDetailDto,
  InterviewStatusType,
} from '../../../../../types/dtos/interview.dto';
import { interviewService } from '../../../../../services/interview.service';
import InterviewDetailsModal from './InterviewViewModal';
import { to12Hour } from '../../../../../utils/dateConversion';

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

function InterviewListingContainer() {
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
  const [selected, setSelected] = useState<InterviewDto | null>(null);
  const [rescheduleModal, setRescheduleModal] = useState<boolean>(false);
  const [completedModal, setCompltedModal] = useState<boolean>(false);
  const [resultModal, setResultModal] = useState<boolean>(false);

  const {
    filter,
    updateFilter,
    filterOptions,
    sortFilter,
    upsateStatus,
    getInterviewDetails,
  } = useInterviews(setPage);

  useEffect(() => {
    async function getStatusData() {
      try {
        const data = await interviewService.getInterviewsStatus();
        console.log(data);

        const statusData = data.statuses;
        console.log(`status data after fetching `, data);

        const total: StatusCardType = {
          label: 'Total Interviews',
          count: statusData.total || 0,
          icon: '🏢',
        };
        const upcoming: StatusCardType = {
          label: 'Upcoming',
          count: statusData.upcoming || 0,
          icon: '⏳',
        };
        const completed: StatusCardType = {
          label: 'Completed',
          count: statusData.completed || 0,
          icon: '⭐',
        };
        const action_needed: StatusCardType = {
          label: 'Action Required',
          count: statusData.action_requiered || 0,
          icon: '📅',
        };
        setSats([total, upcoming, completed, action_needed]);
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

  // const interviewColumns = [
  //   {
  //     key: 'jobTitle',
  //     label: 'Job Role',
  //     render: (i: InterviewDto) => (
  //       <div className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800  text-sm inline-block">
  //         <span className="text-sm text-slate-800">{i.jobTitle}</span>
  //       </div>
  //     ),
  //   },

  //   {
  //     key: 'candidateName',
  //     label: 'Candidate',
  //     render: (i: InterviewDto) => (
  //       <span className="text-slate-700">{i.name}</span>
  //     ),
  //   },

  //   {
  //     key: 'mode',
  //     label: 'Mode',
  //     render: (i: InterviewDto) => (
  //       <span className="text-slate-700 capitalize">{i.mode}</span> // online/offline
  //     ),
  //   },

  //   // {
  //   //   key: 'interviewType',
  //   //   label: 'Round',
  //   //   render: (i: InterviewDto) => (
  //   //     <span className="font-semibold text-slate-800">
  //   //       {i.interviewType} {/* HR / Technical / Final */}
  //   //     </span>
  //   //   ),
  //   // },

  //   {
  //     key: 'scheduledAt',
  //     label: 'Date',
  //     render: (i: InterviewDto) => (
  //       <>
  //         {' '}
  //         <span className="text-slate-700 text-center">
  //           {i.scheduledAt.date}
  //         </span>
  //       </>
  //     ),
  //   },
  //   {
  //     key: 'scheduledAt',
  //     label: 'Time',
  //     render: (i: InterviewDto) => (
  //       <>
  //         {' '}
  //         <span className="text-slate-700 text-center">
  //           {to12Hour(i.scheduledAt.time)}
  //         </span>
  //       </>
  //     ),
  //   },

  //   {
  //     key: 'status',
  //     label: 'Status',
  //     render: (i: InterviewDto) => (
  //       <span
  //         className={`text-xs font-semibold px-2.5 py-1 rounded-full ${interviewStatusStyles[i.status]}`}
  //       >
  //         {i.status}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: 'result',
  //     label: 'Result',
  //     render: (i: InterviewDto) => (
  //       <span
  //         className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
  //           i.status=='cancelled'?null:
  //           i?.result === 'passed'
  //             ? 'bg-green-50 text-green-600'
  //             : interview?.result === 'failed'
  //               ? 'bg-red-50 text-red-600'
  //               : 'bg-amber-50 text-amber-600'
  //         }`}
  //       >
  //         {i.status=='cancelled'?'------': i?.result ? i.result : 'pending'}
  //       </span>
  //     ),
  //   },

  //   {
  //     key: 'actions',
  //     label: 'Actions',
  //     render: (i: InterviewDto) => (
  //       <div className="flex items-center gap-2">
  //         {/* View */}
  //         <button
  //           onClick={() => handleView(i.id)}
  //           className="text-indigo-600 hover:text-indigo-800"
  //           title="View"
  //         >
  //           <Eye size={18} />
  //         </button>

  //         {/* Reschedule */}
  //         {i.status === 'scheduled' && (
  //           <button
  //             onClick={() => {
  //               setSelected(i);
  //               setRescheduleModal(true);
  //             }}
  //             className="text-yellow-600 hover:text-yellow-800"
  //             title="Reschedule"
  //           >
  //             <Calendar size={18} />
  //           </button>
  //         )}

  //         {/* Mark Completed */}
  //         {i.status === 'scheduled' && (
  //           <button
  //             onClick={() => {
  //               setSelectedId(i.id);
  //               setCompltedModal(true);
  //             }}
  //             className="text-green-600 hover:text-green-800"
  //             title="Mark Completed"
  //           >
  //             <CheckCircle size={18} />
  //           </button>
  //         )}

  //         {/* Cancel */}
  //         {i.status === 'scheduled' && (
  //           <button
  //             onClick={() => {
  //               setSelectedId(i.id);
  //               setCancelModal(true);
  //             }}
  //             className="text-red-600 hover:text-red-800"
  //             title="Cancel"
  //           >
  //             <XCircle size={18} />
  //           </button>
  //         )}
  //       </div>
  //     ),
  //   },
  // ];

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
      key: 'mode',
      label: 'Mode',
      render: (i: InterviewDto) => (
        <span className="text-slate-700 capitalize whitespace-nowrap">
          {i.mode}
        </span>
      ),
    },

    {
      key: 'date',
      label: 'Date',
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

          {/* Reschedule */}
          {i.status === 'scheduled' && (
            <button
              onClick={() => {
                setSelected(i);
                setRescheduleModal(true);
              }}
              className="text-yellow-600 hover:text-yellow-800"
              title="Reschedule"
            >
              <Calendar size={18} />
            </button>
          )}

          {/* Mark Completed */}
          {i.status === 'scheduled' && (
            <button
              onClick={() => {
                setSelectedId(i.id);
                setCompltedModal(true);
              }}
              className="text-green-600 hover:text-green-800"
              title="Mark Completed"
            >
              <CheckCircle size={18} />
            </button>
          )}

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
  const handleStatusChange = async (
    status: InterviewStatusType,
    reason?: string
  ) => {
    if (!selectedId) return;

    await upsateStatus(selectedId, status, reason);
    setCancelModal(false);
    const updated = interviews.map((i: InterviewDto) =>
      i.id == selectedId ? { ...i, status: status } : i
    );
    setInterviews(updated);
    setSelectedId(null);
  };

  const onUpdate = (data: Partial<InterviewDto>) => {
    const updated = interviews.map((int) =>
      int.id == data.id ? { ...int, ...data } : int
    );
    setInterviews(updated);
  };

  const handleView = async (id: string) => {
    console.log('id', id);
    setViewModal(true);
    const inter = await getInterviewDetails(id);
    setInterview(inter);
  };

  const handleUpdate = async (field: Partial<InterviewDto>) => {
    console.log('filds', field);

    if (!selected) return;
    try {
      const data = await interviewService.updateFiled(selected.id, field);
      onUpdate(data.interview);
      setSelectedId(null);
      setSelected(null);
      showToast({ msg: data.message, type: 'success' });
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  const updateInterveiw = (data: Partial<interviewDetailDto>) => {
    setInterview((prev) => {
      if (!prev) return prev; // 👈 prevent null case

      return {
        ...prev,
        ...data,
      };
    });
  };

  const handleAddResult = async (values: {
    result: InterviewResult;
    feedback?: string;
  }) => {
    if (!interview) return;
    console.log('data is', values);

    try {
      const data = await interviewService.updateResult(interview.id, values);
      console.log('data after adding result', data);
      showToast({
        msg: data.message,
        type: 'success',
      });

      setResultModal(false);
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  return (
    <>
      <div>
        <div className="min-h-screen w-full bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HeroSection
              title="Intervew Management"
              tagline=" Manage all Interviews of your Company"
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
        {/* <ConfirmationModal
          isOpen={cancelModal}
          onClose={() => {
            setSelectedId(null);
            setCancelModal(false);
          }}
          item="Interview"
          type="delete"
          action="Cancel"
          onConfirm={}
        /> */}
        <AddReasonModal
          isOpen={cancelModal}
          onClose={() => {
            setSelectedId(null);
            setCancelModal(false);
          }}
          status={'cancelled'}
          action="Cancel"
          item="Interview"
          onConfirm={handleStatusChange}
        />

        <InterviewDetailsModal
          onUpdate={updateInterveiw}
          interview={interview}
          isOpen={viewModal}
          onClose={() => {
            setSelectedId(null);
            setViewModal(false);
          }}
        />
        <RescheduleModal
          isOpen={rescheduleModal}
          onClose={() => {
            setSelectedId(null);
            setRescheduleModal(false);
          }}
          onConfirm={handleUpdate}
          initialDate={selected?.scheduledAt.date ?? null}
          initialTime={selected?.scheduledAt.time ?? null}
        />
        <ConfirmationModal
          isOpen={completedModal}
          onClose={() => {
            setSelectedId(null);
            setCompltedModal(false);
          }}
          item="Interview"
          action="Mark as Completed"
          type="info"
          onConfirm={() => handleStatusChange('completed')}
        />
        <InterviewFeedbackModal
          isOpen={resultModal}
          onClose={() => {
            setSelectedId(null);
            setResultModal(false);
          }}
          onSubmit={handleAddResult}
        />
      </div>
    </>
  );
}

export default InterviewListingContainer;
