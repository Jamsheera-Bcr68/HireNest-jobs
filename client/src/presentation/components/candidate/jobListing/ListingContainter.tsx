import { useEffect, useState } from 'react';

import {
  ActiveFilterChips,
  JobFilterControls,
  JobResultsHeader,
  MobileFilterDrawer,
} from './Filter';

import Pagination from '../../common/Pagination';
import { useApplications } from '../../../hooks/user/candidate/profile/useApplication';
import Header from '../../common/home/Header';
import SearchBar from './SearchBar';

import { EmptyJobsState, JobCardSkeleton, JobErrorState } from './JobCards';
import { updateUser } from '../../../../redux/slices/auth.slice';
import {
  type JobCardDto,
  type JobDetailsDto,
} from '../../../../types/dtos/job.dto';

import { useToast } from '../../../../shared/toast/use-toast';
import { jobService } from '../../../../services/api-services/jobService';

import { reportFormSchema } from '../../../../libraries/validations/company/job-form.validation';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { StateType } from '../../../../constants/types/user';
import JobCard from '../Cards';
import { useTheme } from '../../../../contexts/ThemeContext';

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
const limit = 12;
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
    status:'active'
  });
  const initialReportForm: ReportFormType = {
    jobId: '',
    reason: '',
    info: '',
  };

  const removeChip = (value: string) => {
    setFilter((prev) => ({
      ...prev,
      jobType: prev.jobType?.filter((item) => item !== value) ?? [],
      mode: prev.mode?.filter((item) => item !== value) ?? [],
      experience: prev.experience?.filter((item) => item !== value) ?? [],
      industry: prev.industry?.filter((item) => item !== value) ?? [],
      salary: prev.salary?.filter((item) => item !== value) ?? [],
    }));
    setSelectedLevels([]);
    setSelectedTypes((prev) => prev.filter((item) => item !== value));
    setSelectedModes((prev) => prev.filter((item) => item !== value));
    setSelectedLevels((prev) => prev.filter((item) => item !== value));
    setSelectedIndustries((prev) => prev.filter((item) => item !== value));
    setSelectedSalary((prev) => prev.filter((item) => item !== value));

    setPage(1);
  };

  const [jobs, setJobs] = useState<JobCardDto[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [page, setPage] = useState(1);

  const [sortBy, setSortBy] = useState('Newest');
  const [activeJobId, setActiveJobId] = useState<string>('');
  const [activeJob, setActiveJob] = useState<JobDetailsDto | null>(null);
  const [error, setError] = useState<ReportFormType>(initialReportForm);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [viewState, setViewState] = useState<
    'loading' | 'loaded' | 'empty' | 'error'
  >('loaded');

  const user = useSelector((state: StateType) => state.auth.user);
  const dispatch = useDispatch();

  const [reportForm, setReportForm] =
    useState<ReportFormType>(initialReportForm);

  useEffect(() => {
    async function fetchJobs() {
      setViewState('loading');
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
            { ...filter},
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
      } finally {
        setViewState('loaded');
      }
    }
    fetchJobs();
  }, [filter, page, sortBy, mode]);

  const handleFilterChange = (data: Partial<JobFilterType>) => {
    console.log('from filter change');

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

  const { t } = useTheme();
  let activeChips: string[] = [];
  if (filter.jobType) {
    activeChips = [...activeChips, ...filter.jobType];
  }
  if (filter.mode) {
    activeChips = [...activeChips, ...filter.mode];
  }
  if (filter.experience) {
    activeChips = [...activeChips, ...filter.experience];
  }
  if (filter.salary) {
    activeChips = [...activeChips, ...filter.salary];
  }
  if (filter.industry) {
    activeChips = [...activeChips, ...filter.industry];
  }

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    filter.industry || []
  );
  const [selectedSalary, setSelectedSalary] = useState<string[]>([]);

  const SORT_OPTIONS = [
    { label: 'Newest', value: 'newest' },
    { label: 'Salary: High to Low', value: 'salary-high-low' },
    { label: 'Salary: Low to High', value: 'salary-low-high' },
    { label: 'Vacancy:high-low', value: 'vacancy-high-low' },
    { label: 'Last Date', value: 'deadline' },
  ];

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedIndustries([]);
    setSelectedSalary([]);
    setSelectedModes([]);
  }
  
  return (
    <div
      className={cx(
        'min-h-screen transition-colors duration-300',
        t.pageBg,
        t.pageText
      )}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* <CandidateNavbar /> */}
      {mode === 'all' && <Header />}
      <SearchBar filter={filter} handleFilterChange={handleFilterChange} />
      {/* <JobSearchHero keyword={keyword} setKeyword={setKeyword} location={location} setLocation={setLocation} onSearch={() => setPage(1)} /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col gap-4 -mt-1 sm:-mt-2 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <JobFilterControls
              selectedTypes={selectedTypes}
              filters={filter}
              onToggleFilter={handleFilterChange}
              onOpenMobileFilters={() => setMobileFiltersOpen(true)}
              selectedSalary={selectedSalary}
              setSelectedSalary={setSelectedSalary}
              selectedIndustries={selectedIndustries}
              setSelectedIndustries={setSelectedIndustries}
              selectedModes={selectedModes}
              setSelectedModes={setSelectedModes}
              selectedLevels={selectedLevels}
              setSelectedLevels={setSelectedLevels}
              setSelectedTypes={setSelectedTypes}
            />

            {/* demo controls — not part of the real product, just for showcasing states */}
            {/* <div className="hidden md:flex items-center gap-1.5 text-xs">
              <button
                onClick={simulateLoading}
                className={cx(
                  'px-2.5 py-1.5 rounded-lg border',
                  t.filterBorder,
                  t.footerText,
                  'hover:text-purple-600'
                )}
              >
                Preview loading
              </button>
              <button
                onClick={() => setViewState('empty')}
                className={cx(
                  'px-2.5 py-1.5 rounded-lg border',
                  t.filterBorder,
                  t.footerText,
                  'hover:text-purple-600'
                )}
              >
                Preview empty
              </button>
              <button
                onClick={() => setViewState('error')}
                className={cx(
                  'px-2.5 py-1.5 rounded-lg border',
                  t.filterBorder,
                  t.footerText,
                  'hover:text-purple-600'
                )}
              >
                Preview error
              </button>
            </div> */}
          </div>
          <ActiveFilterChips
            chips={activeChips}
            onRemove={removeChip}
            onClearAll={clearAll}
          />
        </div>

        <div className="mb-5">
          <JobResultsHeader
            count={jobs.length}
            sort={sortBy}
            setSort={setSortBy}
            sortOptions={SORT_OPTIONS}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {viewState === 'loading' &&
            Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}

          {viewState === 'error' && (
            <JobErrorState onRetry={() => setViewState('loaded')} />
          )}

          {viewState === 'loaded' && jobs.length === 0 && (
            <EmptyJobsState onClear={clearAll} />
          )}

          {viewState === 'loaded' &&
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                handleSave={saveJobHandle}
                handleUnSave={unSaveJobHandle}
               
                // saved={saved.has(job.id)}
                // onToggleSave={toggleSave}
                // onView={handleView}
              />
            ))}
        </div>

        {viewState === 'loaded' && jobs.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(totalDocs / limit)}
              item="Jobs"
              count={jobs.length}
              totalItem={totalDocs}
              onPageChange={setPage}
            />
          </div>
        )}
      </main>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filter}
        onToggleFilter={handleFilterChange}
        onClearAll={clearAll}
        selectedSalary={selectedSalary}
        setSelectedSalary={setSelectedSalary}
        selectedIndustries={selectedIndustries}
        setSelectedIndustries={setSelectedIndustries}
        selectedModes={selectedModes}
        setSelectedModes={setSelectedModes}
        selectedLevels={selectedLevels}
        setSelectedLevels={setSelectedLevels}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
      />

      {/* {toast && (
        <div
          className={cx(
            'fixed bottom-6 left-1/2 -translate-x-1/2 text-sm px-4 py-2.5 rounded-xl shadow-lg z-50',
            t.toastBg,
            t.toastText
          )}
        >
          {toast}
        </div>
      )} */}
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-slate-50 text-slate-800">
  //     {mode === 'all' && <Header />}
  //     <SearchBar filter={filter} handleFilterChange={handleFilterChange} />
  //     <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
  //       {mode == 'all' && (
  //         <Filter filter={filter} onFilterChange={handleFilterChange} />
  //       )}

  //       <div className="flex-1 min-w-0">
  //         <ToolBar
  //           sortBy={sortBy}
  //           search={filter.search.job}
  //           location={filter.search.location}
  //           jobs={jobs}
  //           totalFilters={5}
  //           viewMode={viewMode}
  //           changeView={setViewMode}
  //           setSortBy={setSortBy}
  //         />
  //         <div
  //           className={`flex gap-5 ${
  //             viewMode === 'split' ? 'flex-col lg:flex-row' : 'flex-col'
  //           }`}
  //         >
  //           <JobCards
  //             onApply={handleApplyClick}
  //             handleSave={saveJobHandle}
  //             handleUnSave={unSaveJobHandle}
  //             mode={mode!}
  //             paginationData={{
  //               totalDocs,
  //               limit,
  //               item: 'Jobs',
  //               currentPage: page,
  //               setPage: setPage,
  //               count: jobs.length,
  //               page: page,
  //             }}
  //             setViewMode={setViewMode}
  //             setActiveJobId={setActiveJobId}
  //             viewMode={viewMode}
  //             jobs={jobs}
  //           />
  //           <JobDetails
  //             handleSave={saveJobHandle}
  //             handleUnSave={unSaveJobHandle}
  //             error={error}
  //             onApply={handleApplyClick}
  //             handleChange={handleReportFormChange}
  //             onReportSumbit={reportHandle}
  //             viewMode={viewMode}
  //             activeJob={activeJob}
  //             reportForm={reportForm}
  //           />
  //         </div>
  //       </div>
  //     </div>

  //     <SelectResumeContent
  //       resumes={resumes}
  //       isOpen={showResumeModal}
  //       onClose={() => setShowResumeModal(false)}
  //       onApply={(resumeId: string) => applyJob(resumeId)}
  //     />
  //   </div>
  // );
}

export default JobListingContainer;

export function cx(...parts: string[]) {
  return parts.filter(Boolean).join(' ');
}
