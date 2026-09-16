import type { JobDetailsDto } from '../../../../types/dtos/job.dto';
import SelectResumeModal from '../applications/ResumeModal';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { ArrowLeft } from 'lucide-react';
import Hero from './Hero';
import { jobService } from '../../../../services/api-services/jobService';
import { updateUser } from '../../../../redux/slices/auth.slice';
import ReportJobModal from '../jobListing/JobReportForm';
import { useApplications } from '../../../hooks/user/candidate/profile/useApplication';
import { useState } from 'react';
import { type ResumeType } from '../../../../types/dtos/profile-types/resume.type';
import Main from './Main';
import type { ErrorType, ReportFormType } from '../jobListing/ListingContainter';
import { ReportJobForm } from '../../admin/pending/ActivityModal';

type Props = {
  job: JobDetailsDto | null;
  onReportSubmit: () => void;
  isDark: boolean;
handleChange:(data: Partial<ReportFormType>) => void;
    onApplyClick:(jobId:string)=>Promise<void>
reportError:ErrorType|null
  onBack: () => void;
  reportForm:ReportFormType
};
export const JobDetails = ({
  job,
onReportSubmit,handleChange,
  isDark,reportError,
reportForm,
  onApplyClick,
  // onToggleSave,
  onBack,
}: Props) => {
  const { t } = useTheme();

  const user = useSelector((state: RootState) => state.auth.user);

  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [resumes, setResumes] = useState<ResumeType[]>([]);
  const dispatch = useDispatch();
  const { applyJob } = useApplications();

    if (!job) return null;

  const handleSave = async () => {

    try {
      const data = await jobService.saveJob(job.id);
      console.log('after saving', data);
      dispatch(
        updateUser({
          savedJobs: data.savedJobs || [...user.savedJobs, job.id],
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleUnsave = async () => {
    try {
      const data = await jobService.unsaveJob(job.id);
      console.log('after unsaving', data);
      dispatch(
        updateUser({
          savedJobs: (user?.savedJobs || []).filter(
            (id: string) => id !== job.id
          ),
        })
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  const onToggleSave = async () => {
    console.log('from toggle save', job.id);
    if (isSaved) await handleUnsave();
    else await handleSave();
  };

  
  const isExpired = job.status === 'expired';
  const isSaved: boolean = user.savedJobs.includes(job.id);
  const isApplied: boolean = user.appliedJobs.includes(job.id);
  console.log('from job details');
  
  
  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-28 lg:pb-10">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-1.5 text-[13px] ${t.subheading} hover:text-fuchsia-500 transition-colors mb-4 sm:mb-6`}
        >
          <ArrowLeft size={15} />
          Back to Jobs
        </button>

        {/* HERO — decorative blobs shrink on mobile, grow on desktop */}
        <Hero
        onApplyClick={onApplyClick}
          isApplied={isApplied}
          isSaved={isSaved}
          job={job}
          onToggleSave={onToggleSave}
        />

      <Main reportForm={reportForm} onReportsubmit={onReportSubmit} handleChange={handleChange} job={job} reportError= {reportError} />
    </div>
    </div>
  )
};
