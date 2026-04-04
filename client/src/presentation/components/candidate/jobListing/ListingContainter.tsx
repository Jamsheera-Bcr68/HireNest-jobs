import { useEffect, useState } from 'react';
import Header from '../../common/Header';
import SearchBar from './SearchBar';
import Filter from './Filter';
import ToolBar from './ToolBar';
import { updateUser } from '../../../../redux/authSlice';
import {
  type JobCardDto,
  type JobDetailsDto,
} from '../../../../types/dtos/jobDto';

import { useToast } from '../../../../shared/toast/useToast';
import { jobService } from '../../../../services/apiServices/jobService';
import JobCards from './JobCards';
import JobDetails from './JobDetails';
import { reportFormSchema } from '../../../../libraries/validations/company/jobFormValidation';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { StateType } from '../../../../constants/types/user';

export type ReportFormType = {
  jobId: string;
  reason: string;
  info: string;
};
export type ErrorType = ReportFormType;
export type JobFilterType = {
  search: {
    job: string;
    location: string;
  };

  jobType?: string[];
  experience?: string[];
  industry?: string[];
  salary?: string[];
  mode?: string[];
  companyId?: string;
  status?: string;
};
const limit = 9;
type Props = {
  mode?: 'all' | 'saved';
};
function JobListingContainer({ mode }: Props) {
  console.log('mode is', mode);

  const [searchParams] = useSearchParams();
  const job = searchParams.get('job') || '';
  const location = searchParams.get('location') || '';
  const industryFilter = searchParams.get('industry');

  console.log('job,location,industry', job, location, industryFilter);

  const { showToast } = useToast();
  const [filter, setFilter] = useState<JobFilterType>({
    search: {
      job,
      location,
    },
    industry: industryFilter ? [industryFilter] : [],
  });
  const initialReportForm: ReportFormType = {
    jobId: '',
    reason: '',
    info: '',
  };

  const [jobs, setJobs] = useState<JobCardDto[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('grid');
  const [sortBy, setSortBy] = useState('Newest');
  const [activeJobId, setActiveJobId] = useState<string>('');
  const [activeJob, setActiveJob] = useState<JobDetailsDto | null>(null);
  const [error, setError] = useState<ReportFormType>(initialReportForm);

  const user = useSelector((state: StateType) => state.auth.user);
  const dispatch = useDispatch();

  const [reportForm, setReportForm] =
    useState<ReportFormType>(initialReportForm);

  useEffect(() => {
    async function fetchJobs() {
      try {
        let data;
        if (mode === 'saved') {
          data = await jobService.getSavedJobs(
            { ...filter, status: 'active' },
            sortBy,
            limit,
            page
          );
        } else {
          data = await jobService.getJobs(
            { ...filter, status: 'active' },
            sortBy,
            limit,
            page
          );
        }

        console.log('after fetching jobs', data);
        setJobs(data.jobs);
        setTotalDocs(data.totalDocs);
        if (data.jobs.length > 0 && !activeJobId) {
          setActiveJobId(data.jobs[0].id);
        }
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    fetchJobs();
  }, [filter, page, sortBy, mode]);

  const handleFilterChange = (data: Partial<JobFilterType>) => {
    console.log('data', data);

    setFilter((prev) => ({
      ...prev,
      ...data,
      search: {
        ...prev.search,
        ...data.search,
      },
    }));

    setPage(1);
  };

  useEffect(() => {
    setFilter({
      search: {
        job,
        location,
      },
      industry: industryFilter ? [industryFilter] : [],
    });

    setPage(1);
  }, [job, location, industryFilter]);
  useEffect(() => {
    if (!activeJobId) return;
    try {
      const getJobDetails = async () => {
        const data = await jobService.getDetails(activeJobId);
        console.log('data after job details', data);

        setActiveJob(data.jobDetails);
      };
      getJobDetails();
    } catch (error: any) {
      showToast({
        msg: error?.response.data.message || error.message,
        type: 'error',
      });
    }
  }, [activeJobId]);

  const handleReportFormChange = (data: Partial<ReportFormType>) => {
    console.log('from handle form change', data);

    setReportForm((prev) => ({ ...prev, ...data }));
  };

  const reportHandle = async () => {
    if (!activeJob) return null;
    const payload = { ...reportForm, jobId: activeJob.id };
    setReportForm(payload);
    const result = reportFormSchema.safeParse(payload);
    if (result.success) {
      try {
        const data = await jobService.reportJob(payload);
        console.log('data after submitting report', data);
        setActiveJob((prev) =>
          prev
            ? {
                ...prev,
                isReported: true,
                reportedBy: [...(prev.reportedBy || []), user.id],
              }
            : prev
        );

        showToast({
          msg: data.message,
          type: 'success',
        });
        setReportForm(initialReportForm);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: error,
        });
      }
    } else {
      const error = result.error.format();

      const formattedErrors: ErrorType = {
        jobId: error.jobId?._errors[0] || '',
        reason: error.reason?._errors[0] || '',
        info: error.info?._errors[0] || '',
      };
      setError(formattedErrors);
      return;
    }
  };

  const saveJobHandle = async (jobId: string) => {
    if (!jobId) return;
    if (!user) {
      showToast({
        msg: 'Please login to save Job',
        type: 'error',
      });
      return;
    }
    if (user.role !== 'candidate') {
      showToast({
        msg: 'You are not allowed to Save job',
        type: 'error',
      });
      return;
    }
    try {
      const data = await jobService.saveJob(jobId);
      console.log('after saving', data);
      dispatch(
        updateUser({
          savedJobs: data.savedJobs || [...user.savedJobs, jobId],
        })
      );

      showToast({
        msg: data.message,
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  const unSaveJobHandle = async (jobId: string) => {
    console.log('from unsave fun');

    if (!jobId) return;
    if (!user) {
      showToast({
        msg: 'Please login to save Job',
        type: 'error',
      });
      return;
    }
    try {
      const data = await jobService.unsaveJob(jobId);
      console.log('after unsaving', data);
      dispatch(
        updateUser({
          savedJobs: (user?.savedJobs || []).filter(
            (id: string) => id !== jobId
          ),
        })
      );
      showToast({
        msg: data.message,
        type: 'success',
      });
      if (mode == 'saved') {
        const updated = jobs.filter((job) => job.id !== jobId);
        setJobs(updated);
        if (!updated.length) {
          console.log(updated.length);

          setActiveJob(null);
        }
      }
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {mode === 'all' && <Header />}
      <SearchBar filter={filter} handleFilterChange={handleFilterChange} />
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        {mode == 'all' && (
          <Filter filter={filter} onFilterChange={handleFilterChange} />
        )}

        <div className="flex-1 min-w-0">
          <ToolBar
            sortBy={sortBy}
            search={filter.search.job}
            location={filter.search.location}
            jobs={jobs}
            totalFilters={5}
            viewMode={viewMode}
            changeView={setViewMode}
            setSortBy={setSortBy}
          />
          <div
            className={`flex gap-5 ${viewMode === 'split' ? '' : 'flex-col'}`}
          >
            <JobCards
              handleSave={saveJobHandle}
              handleUnSave={unSaveJobHandle}
              mode={mode!}
              paginationData={{
                totalDocs,
                limit,
                item: 'Jobs',
                currentPage: page,
                setPage: setPage,
                count: jobs.length,
                page: page,
              }}
              setViewMode={setViewMode}
              setActiveJobId={setActiveJobId}
              viewMode={viewMode}
              jobs={jobs}
            />
            <JobDetails
              handleSave={saveJobHandle}
              handleUnSave={unSaveJobHandle}
              error={error}
              handleChange={handleReportFormChange}
              onReportSumbit={reportHandle}
              viewMode={viewMode}
              activeJob={activeJob}
              reportForm={reportForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListingContainer;
