import { useParams } from 'react-router-dom';
import NavPart from '../../user/employer/job-details/NavPart';
import { useEffect, useState } from 'react';
import { adminService } from '../../../../services/apiServices/adminService';
import { type JobDetailsDto } from '../../../../types/dtos/jobDto';
import { useToast } from '../../../../shared/toast/useToast';
import type { StatusType } from '../../../../types/dtos/profileTypes/userTypes';
import { type UpdateStatusType } from '../../user/employer/company-joblisting/CompanyJobListingContainer';
import AddReasonModal from '../jobs/AddReasonModal';
import HeroPart from '../../user/employer/job-details/HeroPart';
import Tabs from '../../user/employer/job-details/Tabs';
import Responsibilities from '../../user/employer/job-details/Responsibilities';
import OverView from '../../user/employer/job-details/OverView';
import Benefits from '../../user/employer/job-details/Benefits';
import RightSideBar from '../../user/employer/job-details/RightSideBar';
import Company from '../../user/employer/job-details/Company';
import { Reports } from './ReporData';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'company', label: 'Company' },
  { id: 'reports', label: 'Reports' },
];
function AdminJobDetailscontainer() {
  const { showToast } = useToast();
  const { id } = useParams();
  console.log('job id is ', id);

  const [job, setJob] = useState<JobDetailsDto | null>(null);
  const [showReasonModal, setShowReasonModal] = useState<boolean>(false);
  const [showSuspendReasonModal, setShowSuspendReasonModal] =
    useState<boolean>(false);

  const [tab, setTab] = useState<string>('overview');
  useEffect(() => {
    if (!id) return;
    const getJobDetails = async () => {
      try {
        const data = await adminService.getDetails(id);
        console.log('data after fetching jobdetaisl', data);

        setJob(data.jobDetails);
      } catch (error: any) {
        console.log(error);

        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getJobDetails();
  }, []);

  const handleUpdateStatus = async (status: StatusType) => {
    if (!job) return;
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
    if (!job) return;
    console.log('from update status', status, reasonData);

    try {
      let payload: UpdateStatusType = { status };
      if (reasonData) {
        payload = { ...payload, reason: reasonData };
      }
      const data = await adminService.updateJobstatus(payload, job.id);
      console.log('data after updatedo r removed', data);

      showToast({
        msg: data.message,
        type: 'success',
      });
      setJob({ ...job, status });

      setShowSuspendReasonModal(false);
      setShowReasonModal(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  if (!job) return;
  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans text-gray-900">
      <NavPart
        title="Jobs"
        onBackPath="/admin/jobs"
        role="admin"
        job={job}
        handleUpdateStatus={handleUpdateStatus}
        handleDeactivateAction={updateStatus}
      />
      <div className="max-w-6xl mx-auto px-6 py-7 space-y-6">
        <HeroPart job={job} role="admin" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <Tabs tab={tab} tabs={tabs} setTab={setTab} />
            <div className="p-6 lg:p-7 space-y-6">
              {tab == 'overview' && <OverView tab={tab} job={job} />}
              {tab == 'responsibilities' && (
                <Responsibilities job={job} tab={tab} />
              )}

              {tab == 'benefits' && (
                <Benefits benefits={job.benefits} tab={tab} />
              )}
              {tab == 'company' && <Company job={job} />}
              {tab == 'reports' && <Reports tab={tab} job={job} />}
            </div>
          </div>
          <div className="space-y-4">
            <RightSideBar
              updateStatus={handleUpdateStatus}
              job={job}
              role="admin"
            />
          </div>
        </div>
      </div>

      <AddReasonModal
        isOpen={showSuspendReasonModal}
        onClose={() => setShowSuspendReasonModal(false)}
        status="suspended"
        action="Suspend"
        item="Job"
        onConfirm={updateStatus}
      />
      <AddReasonModal
        isOpen={showReasonModal}
        onClose={() => setShowReasonModal(false)}
        status="removed"
        action="Remove"
        item="Job"
        onConfirm={updateStatus}
      />
    </div>
  );
}

export default AdminJobDetailscontainer;
