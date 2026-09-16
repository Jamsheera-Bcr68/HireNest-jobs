import { useEffect, useState } from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { JobDetailsError, JobDetailsSkeleton } from './JobDetailsViewStates';
import Header from '../../common/home/Header';
import { useToast } from '../../../../shared/toast/use-toast';
import {
  cx,
  type ErrorType,
  type ReportFormType,
} from '../jobListing/ListingContainter';
import { JobDetails } from './JobDetails';
import { useParams } from 'react-router-dom';
import { type JobDetailsDto } from '../../../../types/dtos/job.dto';
import { jobService } from '../../../../services/api-services/jobService';
import { useNavigate } from 'react-router-dom';
import { useApplications } from '../../../hooks/user/candidate/profile/useApplication';
import SelectResumeModal from '../applications/ResumeModal';
import { reportFormSchema } from '../../../../libraries/validations/company/job-form.validation';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';

function JobContainer() {
  const [view, setView] = useState<
    'active' | 'applied' | 'expired' | 'loading' | 'error'
  >('active');
  const { t, mode } = useTheme();
  const [job, setJob] = useState<JobDetailsDto | null>(null);
  const [errMessage, setErrorMessage] = useState<string>('');
  const isDark = mode === 'dark';
  const { jobId } = useParams();
  console.log('job id is ', jobId);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    handleApplyClick,
    applyJob,
    showResumeModal,
    setShowResumeModal,
    resumes,
  } = useApplications();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log('user after submit report', user);

  useEffect(() => {
    if (!jobId) {
      setView('error');
      return;
    }

    const getJobDetails = async () => {
      try {
        setView('loading');
        console.log('after setting view loading');

        const data = await jobService.getDetails(jobId);
        console.log('data after job details', data);

        setJob(data.jobDetails);
        setView('active');
      } catch (error: any) {
        console.log(error);

        setView('error');
        setErrorMessage(
          error?.response?.data?.message ||
            error?.message ||
            'Something went wrong'
        );
      }
    };

    getJobDetails();
  }, [jobId]);

  const initialReportForm: ReportFormType = {
    jobId: '',
    reason: '',
    info: '',
  };
  const [reportForm, setReportForm] =
    useState<ReportFormType>(initialReportForm);
  const [reportError, setReportError] = useState<ErrorType | null>(null);

  const reportHandle = async () => {
    console.log('from report submit handle');

    if (!job) return null;
    const payload = { ...reportForm, jobId: job.id };
    setReportForm(payload);
    const result = reportFormSchema.safeParse(payload);
    if (result.success) {
      try {
        const data = await jobService.reportJob(payload);
        console.log('data after submitting report', data);

        console.log('user after submit report', user);

        setJob((prev) =>
          prev
            ? {
                ...prev,
                isReported: true,
                reportedBy: [...(prev.reportedBy || []), user.id],
              }
            : prev
        );
        showToast({ msg: data.message, type: 'success' });
        setReportForm(initialReportForm);
      } catch (error: any) {
        console.log(error);
      }
    } else {
      const error = result.error.format();

      const formattedErrors: ErrorType = {
        jobId: error.jobId?._errors[0] || '',
        reason: error.reason?._errors[0] || '',
        info: error.info?._errors[0] || '',
      };
      setReportError(formattedErrors);
      return;
    }
  };

  const handleReportFormChange = (data: Partial<ReportFormType>) => {
    console.log('from handle form change', data);

    setReportForm((prev) => ({ ...prev, ...data }));
  };

  return (
    <div
      className={cx(
        'min-h-screen transition-colors duration-300',
        t.pageBg,
        t.pageText
      )}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Header />
      <div className={isDark ? 'dark' : ''}>
        {view === 'loading' && (
          <>
            <JobDetailsSkeleton />
          </>
        )}

        {view === 'error' && (
          <>
            <JobDetailsError
              message="This job may have been removed or the link is incorrect."
              onBack={() => setView('active')}
            />
          </>
        )}

        {(view === 'active' || view === 'applied' || view === 'expired') && (
          <JobDetails
            job={job}
            isDark={isDark}
            onApplyClick={handleApplyClick}
            onReportSubmit={reportHandle}
            onBack={() => navigate(-1)}
            reportForm={reportForm}
            reportError={reportError}
            handleChange={handleReportFormChange}
          />
        )}
      </div>
      <SelectResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        resumes={resumes}
        onApply={(resumeId: string) => applyJob(resumeId)}
      />
    </div>
  );
}

export default JobContainer;
