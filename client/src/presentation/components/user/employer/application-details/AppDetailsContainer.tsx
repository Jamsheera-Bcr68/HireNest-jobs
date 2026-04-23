import { useEffect, useState } from 'react';
import CandidateData from './CandidateData';
import LeftComponent from './LeftComponent';
import RightComponent from './RightComponent';
import { useToast } from '../../../../../shared/toast/useToast';
import { useApplications } from '../../../../hooks/user/candidate/profile/useApplication';
import { useParams } from 'react-router-dom';
import { type ApplicationDetailsDto } from '../../../../../types/dtos/application.dto';
import { applicationService } from '../../../../../services/apiServices/application.service';
import { type ApplicationStatusType } from '../../../../../types/dtos/application.dto';
import AddReasonModal from '../../../admin/jobs/AddReasonModal';
import InterviewModal from './InterviewModal';
import { useInterviews } from '../../../../hooks/user/useInterview';

function AppDetailsContainer({ role }: { role: 'admin' | 'company' }) {
  const {} = useApplications();
  const { showToast } = useToast();
  const { id } = useParams();
  if (!id) return;
  console.log('from params', id);
  const [application, setApplication] = useState<ApplicationDetailsDto | null>(
    null
  );
  const [showRejectReason, setShowRejectReason] = useState<boolean>(false);
  const [showInterview, setShowInterview] = useState<boolean>(false);

  useEffect(() => {
    const getApplication = async () => {
      try {
        const data = await applicationService.getApplicationDetails(id);
        setApplication(data.application);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getApplication();
  }, []);

  const updateAppStatus = async (status: ApplicationStatusType) => {
    console.log('id,status', id, status);
    if (status == 'rejected') {
      setShowRejectReason(true);
      return;
    }
    if (status == 'interviewSheduled') {
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
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <CandidateData
        role={role}
        updateStatus={updateAppStatus}
        application={application}
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
        jobTitle={application.job.title}
        appId={application.id}
        isOpen={showInterview}
        onClose={() => setShowInterview(false)}
        candidate={{
          name: application.candidate.candidateName,
          email: application.candidate.email,
          applied: application.appliedAt,
          status: application.status,
          initials: application.candidate.candidateName.charAt(0).toUpperCase(),
        }}
      />
    </div>
  );
}

export default AppDetailsContainer;
