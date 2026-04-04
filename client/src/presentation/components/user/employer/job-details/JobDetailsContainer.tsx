import NavPart from './NavPart';
import HeroPart from './HeroPart';
import OverView from './OverView';
import Benefits from './Benefits';
import Company from './Company';
import Responsibilities from './Responsibilities';
import RightSideBar from './RightSideBar';
import Tabs from './Tabs';
import { type StatusType } from '../../../../../types/dtos/profileTypes/userTypes';
import { type UpdateStatusType } from '../company-joblisting/CompanyJobListingContainer';
import { useToast } from '../../../../../shared/toast/useToast';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type JobDetailsDto } from '../../../../../types/dtos/jobDto';
import { jobService } from '../../../../../services/apiServices/jobService';
import UpdateLastDateModal from './UpdateLastDateModal';
import EditJobModal from '../Modal';
import JobForm from '../JobForm';
const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'company', label: 'Company' },
];
function JobDetailsContainer() {
  const { jobId } = useParams();
  console.log('job id is ', jobId);
  const { showToast } = useToast();
  const [job, setJob] = useState<JobDetailsDto | null>(null);
  const [tab, setTab] = useState<string>('overview');
  const [showResetDateModal, setShowResetDateModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [lastDate, setLastDate] = useState<string>('');

  useEffect(() => {
    if (!jobId) return;
    const getJobDetails = async () => {
      try {
        const data = await jobService.getDetails(jobId);
        console.log('data after fetching jobdetaisl', data);

        setJob(data.jobDetails);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getJobDetails();
  }, []);
  const onEditClick = () => {
    setShowEditModal(true);
  };
  const handleUpdateStatus = async (status: StatusType) => {
    if (!job) return;
    console.log('status', status, job.lastDate);

    if (status == 'active' && new Date(job.lastDate) < new Date()) {
      setShowResetDateModal(true);
      return;
    }
    await updateStatus(status);
  };
  const updateStatus = async (status: StatusType, lastDate?: string) => {
    console.log('from update status before return', job, status, lastDate);
    if (!job) return;
    console.log('from update status', job, status, lastDate);

    try {
      let payload: UpdateStatusType = { status };
      if (lastDate) {
        payload = { ...payload, lastDate: lastDate };
      }
      const data = await jobService.updateJobstatus(payload, job.id);
      showToast({
        msg: data.message,
        type: 'success',
      });
      setJob({ ...job, status, ...(lastDate && { lastdate: lastDate }) });

      setShowResetDateModal(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  if (!job) return null;
  return (
    <div className="min-h-screen bg-[#F7F8FA] font-sans text-gray-900">
      <NavPart
        title="My Jobs"
        onBackPath="/company/jobs"
        role="company"
        job={job}
        handleUpdateStatus={handleUpdateStatus}
        onEditClick={onEditClick}
      />
      <div className="max-w-6xl mx-auto px-6 py-7 space-y-6">
        <HeroPart job={job} />
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
            </div>
          </div>
          <div className="space-y-4">
            <RightSideBar updateStatus={handleUpdateStatus} job={job} />
          </div>
        </div>
      </div>
      <UpdateLastDateModal
        onConfirm={() => updateStatus('active', lastDate)}
        onSetDate={setLastDate}
        isOpen={showResetDateModal}
        onClose={() => setShowResetDateModal(false)}
        lastDate={lastDate}
      />
      <EditJobModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Job"
        desc="Update and save the job"
      >
        <JobForm
          jobId={job.id}
          mode="edit"
          onClose={() => setShowEditModal(false)}
          onUpdate={async (data) =>
            setJob((prev) => ({
              ...prev,
              ...data,
            }))
          }
        />
      </EditJobModal>
    </div>
  );
}

export default JobDetailsContainer;
