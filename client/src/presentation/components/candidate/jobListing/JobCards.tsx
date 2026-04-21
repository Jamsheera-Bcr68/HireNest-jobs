import { useState } from 'react';
import type { JobCardDto } from '../../../../types/dtos/jobDto';
import JobCard from '../Cards';
import Pagination from '../../common/Pagination';
import { useNavigate } from 'react-router-dom';

type Props = {
  onApply:(id:string)=>Promise<void>
  viewMode: string;
  setViewMode: (mode: 'grid' | 'split') => void;
  jobs: JobCardDto[];
  setActiveJobId: (id: string) => void;
  paginationData: {
    totalDocs: number;
    limit: number;
    currentPage: number;
    setPage: (num: number) => void;
    item: string;
    count: number;
    page: number;
  };
  mode: 'all' | 'saved';
  handleSave: (id: string) => Promise<void>;
  handleUnSave: (id: string) => Promise<void>;
};
function JobCards({
  mode,
  handleSave,
  handleUnSave,
  viewMode,
  jobs,
  setActiveJobId,
  paginationData,
  setViewMode,
  onApply
}: Props) {
  const [activeJob, setActiveJob] = useState<JobCardDto | null>(null);
  const navigate = useNavigate();

  return (
    <div className="w-full ">
      {/* Cards Grid/Split container */}
      <div
        className={`
          ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full'
              : 'flex flex-col gap-3 w-80 shrink-0'
          }
        `}
      >
        {jobs.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            {mode === 'all' ? (
              <>
                <div className="text-4xl mb-3">🔍</div>
                <p className="font-semibold">No jobs match your filters</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-3">⭐</div>
                <p className="font-semibold">You did not save any jobs yet</p>
              </>
            )}
          </div>
        )}
        {jobs.map((job) => {
          const isActive = activeJob?.id === job.id;
          return (
            <div
              onClickCapture={() => setActiveJobId(job.id)}
              key={job.id}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  navigate(`/jobs/${job.id}`, { state: activeJob });
                } else {
                  if (viewMode !== 'split') setViewMode('split');
                  setActiveJob(job);
                }
              }}
              className={`job-card cursor-pointer rounded-2xl  bg-white ${
                isActive && viewMode === 'split' ? 'active' : ''
              }`}
              style={{
                border: `1.5px solid ${
                  isActive && viewMode === 'split' ? '#818cf8' : '#e8edf5'
                }`,
                background:
                  isActive && viewMode === 'split' ? '#fafbff' : 'white',
              }}
            >
              <JobCard
                handleSave={handleSave}
                handleUnSave={handleUnSave}
                onApply={onApply}
                job={job}
              />
            </div>
          );
        })}
      </div>
      <Pagination
        totalItem={paginationData.totalDocs}
        totalPages={Math.ceil(paginationData.totalDocs / paginationData.limit)}
        item="Jobs"
        currentPage={paginationData.page}
        onPageChange={paginationData.setPage}
        count={jobs.length}
      />
    </div>
  );
}

export default JobCards;
