import { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import SearchBar from '../../components/candidate/jobListing/SearchBar';
import Filter from '../../components/candidate/jobListing/Filter';
import ToolBar from '../../components/candidate/jobListing/ToolBar';
import {
  type JobCardDto,
  type JobDetailsDto,
} from '../../../types/dtos/jobDto';
import { useToast } from '../../../shared/toast/useToast';
import { jobService } from '../../../services/apiServices/jobService';
import JobCards from '../../components/candidate/jobListing/JobCards';
import JobDetails from '../../components/candidate/jobListing/JobDetails';
import Pagination from '../../components/common/Pagination';
import { useSearchParams } from 'react-router-dom';

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
};
const limit = 3;
function JobListing() {
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

  const [jobs, setJobs] = useState<JobCardDto[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'split' | 'grid'>('grid');
  const [sortBy, setSortBy] = useState('Newest');
  const [activeJobId, setActiveJobId] = useState<string>('');
  const [activeJob, setActiveJob] = useState<JobDetailsDto | null>(null);
  useEffect(() => {
    try {
      async function fetchJobs() {
        const data = await jobService.getJobs(filter, sortBy, limit, page);
        console.log('after fetching jobs', data);
        setJobs(data.jobs);
        setTotalDocs(data.totalDocs);
        if (data.jobs.length > 0 && !activeJobId) {
          setActiveJobId(data.jobs[0].id);
        }
      }
      fetchJobs();
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: error,
      });
    }
  }, [filter, page, sortBy]);

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
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header />
      <SearchBar filter={filter} handleFilterChange={handleFilterChange} />
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6">
        <Filter filter={filter} onFilterChange={handleFilterChange} />

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
            <JobDetails viewMode={viewMode} activeJob={activeJob} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
