import { useEffect, useState } from 'react';
import CandidateData from './CandidateData';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
import { useToast } from '../../../../../shared/toast/use-toast';

import { useParams } from 'react-router-dom';
import { type ApplicationDetailsDto } from '../../../../../types/dtos/application.dto';
import { applicationService } from '../../../../../services/api-services/application.service';
import { type ApplicationStatusType } from '../../../../../types/dtos/application.dto';
import AddReasonModal from '../../../admin/jobs/AddReasonModal';
import InterviewModal from './InterviewModal';

function AppDetailsContainer({ role }: { role: 'admin' | 'company' }) {
  const { showToast } = useToast();
  const { id } = useParams();
  if (!id) return;
  console.log('from params', id);
  const [application, setApplication] = useState<ApplicationDetailsDto | null>(
    null
  );
  const [showRejectReason, setShowRejectReason] = useState<boolean>(false);
  const [showInterview, setShowInterview] = useState<boolean>(false);
  const [chatroomId, setChatroomId] = useState<string | null>(null);

  useEffect(() => {
    const getApplication = async () => {
      try {
        const data = await applicationService.getApplicationDetails(id);
        setApplication(data.application);
        setChatroomId(data.application?.chatroomId ?? null);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getApplication();
  }, []);

  const onSchedule = (status: ApplicationStatusType) => {
    setApplication((prev) => {
      if (prev) {
        return { ...prev, status: status };
      }
      return prev;
    });

    setShowInterview(false);
  };

  const updateAppStatus = async (status: ApplicationStatusType) => {
    console.log('id,status', id, status);
    if (status == 'rejected') {
      setShowRejectReason(true);
      return;
    }
    if (status == 'interviewScheduled') {
      setShowInterview(true);
      return;
    }
    await handleUpdate(status);
  };

  const handleUpdate = async (
    status: ApplicationStatusType,
    reason?: string
  ) => {
    try {
      const data = await applicationService.updateAppStatus(id, status, reason);
      console.log('after update, application', data);
      setApplication((prev) => {
        if (prev) {
          return { ...prev, status: status };
        }
        return prev;
      });
      setShowRejectReason(false);
      showToast({
        msg: data.message,
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  if (!application) return null;
  console.log('application', application);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CandidateData
        onScheduleClick={() => setShowInterview(true)}
        role={role}
        updateStatus={updateAppStatus}
        application={application}
        chatroomId={chatroomId}
        onViewClick={setShowInterview}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <LeftComponent application={application} />
        <RightComponent
          role={role}
          application={application}
          updateStatus={updateAppStatus}
        />
      </div>
      <AddReasonModal
        isOpen={showRejectReason}
        onClose={() => setShowRejectReason(false)}
        onConfirm={handleUpdate}
        action="Reject"
        status={'rejected'}
        item="Application"
      />
      <InterviewModal
        setChatroomId={setChatroomId}
        jobTitle={application.job.title}
        appId={application.id}
        isOpen={showInterview}
        onClose={() => setShowInterview(false)}
        onSchedule={onSchedule}

        candidate={{
          name: application.candidate.candidateName,
          email: application.candidate.email,
          applied: application.appliedAt,
          status: application.status,
          profileImg: application.candidate.profileImg,
          initials: application.candidate.candidateName.charAt(0).toUpperCase(),
        }}
      />
    </div>
  );
}

export default AppDetailsContainer;
