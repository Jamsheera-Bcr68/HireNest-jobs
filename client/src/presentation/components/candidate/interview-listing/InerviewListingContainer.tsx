import { useEffect, useState } from 'react';
import type { StatsCardType } from '../ReusableComponents';
import { StatusCards } from '../ReusableComponents';
import { Hero } from '../ReusableComponents';
import {
  type interviewDetailDto,
  type InterviewDto,
} from '../../../../types/dtos/interview.dto';
import { interviewService } from '../../../../services/interview.service';
import { CandidateInterviewList } from './InterviewList';
import { useInterviews } from '../../../hooks/user/useInterview';
import { Filters } from '../ReusableComponents';
import Pagination from '../../common/Pagination';
import { type InterviewFilter } from '../../../hooks/user/useInterview';
import ConfirmationModal from '../../../modals/ConfirmationModal';
import { useToast } from '../../../../shared/toast/use-toast';

import InterviewDetailsModal from './InterviewModal';
import AddReasonForRescheduleModal from './ReasonForRescheduleModal';

function InerviewListingContainer() {
  const [stats, setStats] = useState<StatsCardType[]>([]);
  const [interviews, setInterviews] = useState<InterviewDto[]>([]);

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [reshedule, setReschedule] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [selectedId, setSelected] = useState<string | null>(null);
  const [interviewDetails, setInterviewDetils] =
    useState<interviewDetailDto | null>(null);

  const { filter, statusFilter, updateFilter, sortFilter, resultFilter } =
    useInterviews();
  const { showToast } = useToast();

  useEffect(() => {
    async function getStatusData() {
      try {
        const data = await interviewService.getInterviewsStatus();
        console.log(data);

        const statusData = data.statuses;
        console.log(`status data after fetching `, data);

        const total: StatsCardType = {
          label: 'Total Interviews',
          value: statusData.total || 0,
        };
        const upcoming: StatsCardType = {
          label: 'Upcoming',
          value: statusData.upcoming || 0,
        };
        const completed: StatsCardType = {
          label: 'Completed',
          value: statusData.completed || 0,
        };
        const rejected: StatsCardType = {
          label: 'Rejected',
          value: statusData.rejected || 0,
        };
        setStats([total, upcoming, completed, rejected]);
      } catch (error: any) {}
    }

    getStatusData();
  }, [interviews]);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const data = await interviewService.getInterviews(
          { ...filter },
          page,
          limit
        );
        console.log('interviws', data.interviews);

        setInterviews(data.interviews);
        setTotalDocs(data.totalDocs);
      } catch (error: any) {}
    };
    getInterviews();
  }, [filter, page, limit]);

  const updateInterviews = (data: Partial<InterviewDto>) => {
    const updated = interviews.map((int) =>
      int.id === selectedId ? { ...int, ...data } : int
    );
    setInterviews(updated);
    setSelected(null);
    setConfirm(false);
  };

  const handleConfirm = async () => {
    if (!selectedId) return;
    try {
      const data = await interviewService.confirmInterview(
        selectedId,
        true,
        'confirmed'
      );
      updateInterviews({ isConfirmed: true });
      showToast({ msg: data.message, type: 'success' });
      if (confirm) setConfirm(false);
      if (selectedId) setSelected(null);
      if (interviewDetails)
        setInterviewDetils((prev) => {
          if (prev) {
            return { ...prev, isConfirmed: true };
          } else return prev;
        });
    } catch (error) {}
  };

  const handleConirmClick = (id: string) => {
    setSelected(id);
    setConfirm(true);
  };

  const handleView = async (id: string) => {
    console.log('from handle view', id);

    setSelected(id);
    setShow(true);
    const data = await interviewService.getInterview(id);
    setInterviewDetils(data.interview);
  };

  const onRescheduleClick = (id: string) => {
    setSelected(id);
    setReschedule(true);
  };

  const handleReschedule = async (reason: string) => {
    if (!selectedId) return;
    const data = await interviewService.requestForReschdule(selectedId, reason);
    if (!interviewDetails) return;
    const updated = { ...interviewDetails, isRescheduleRequested: true };
    setInterviewDetils(updated);
    showToast({ msg: data.message, type: 'success' });
    setReschedule(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Hero
          title="Interviews"
          tag="  Track and manage all your job interviews"
        />
        <StatusCards stats={stats} />
        <Filters<InterviewFilter>
          filter={filter}
          filterOptions={[statusFilter, resultFilter]}
          onFilterChange={updateFilter}
          sortOrder={sortFilter}
        />
        <CandidateInterviewList
          onConfirmClick={handleConirmClick}
          onViewClick={handleView}
          interviews={interviews ?? []}
        />
        <Pagination
          item="Applications"
          currentPage={page}
          totalItem={totalDocs}
          onPageChange={setPage}
          count={interviews?.length || 0}
          totalPages={Math.ceil(totalDocs / limit)}
        />
      </div>
      <ConfirmationModal
        isOpen={confirm}
        onClose={() => {
          setSelected(null);
          setConfirm(false);
        }}
        item="Interview"
        action="Confirm"
        type="info"
        onConfirm={handleConfirm}
      />
      <InterviewDetailsModal
        isOpen={show}
        onClose={() => setShow(false)}
        interview={interviewDetails}
        onRescheduleClick={onRescheduleClick}
        handleConirmClick={handleConirmClick}
      />
      <AddReasonForRescheduleModal
        isOpen={reshedule}
        onClose={() => {
          setSelected(null);
          setReschedule(false);
        }}
        item="Interview"
        action="Request for reschedule"
        text="Request"
        onConfirm={handleReschedule}
      />
    </div>
  );
}

export default InerviewListingContainer;
