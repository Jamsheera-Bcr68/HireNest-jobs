import { useState } from 'react';
import type { JobCardDto } from '../../../../types/dtos/job.dto';
import JobCard from '../Cards';
import Pagination from '../../common/Pagination';
import { useNavigate } from 'react-router-dom';
import { cx } from './ListingContainter';
import { AlertTriangle, FolderSearch } from 'lucide-react';

type Props = {
  onApply: (id: string) => Promise<void>;
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
  onApply,
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
                  isActive && viewMode === 'split' ? '#bf22ce' : '#e8edf5'
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

const THEME_TOKENS = {
  light: {
    pageBg: "bg-slate-50",
    pageText: "text-slate-900",
    navBg: "bg-white",
    navBorder: "border-slate-100",
    navMuted: "text-slate-500",
    navActive: "text-purple-600",
    navIconBg: "hover:bg-slate-100",
    navAvatarBg: "bg-purple-50 border border-purple-100 text-purple-600",
    heroGradient: "bg-gradient-to-b from-purple-50 via-white to-white",
    blobA: "bg-purple-100",
    blobB: "bg-violet-100",
    heading: "text-slate-900",
    subheading: "text-slate-500",
    surface: "bg-white",
    surfaceBorder: "border-slate-200",
    inputFocus: "focus-within:bg-purple-50",
    inputText: "text-slate-700",
    placeholder: "placeholder:text-slate-400",
    dividerV: "bg-slate-200",
    dividerH: "bg-slate-100",
    iconMuted: "text-slate-400",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardHoverBorder: "hover:border-purple-200",
    cardTitle: "text-slate-900",
    cardTitleHover: "group-hover:text-purple-700",
    companyName: "text-slate-700",
    verifiedText: "text-slate-400",
    metaBadgeBg: "bg-purple-50",
    metaBadgeText: "text-purple-700",
    metaBadgeBorder: "border-purple-100",
    skillChipBg: "bg-slate-50",
    skillChipText: "text-slate-600",
    skillChipBorder: "border-slate-200",
    salaryText: "text-slate-800",
    footerText: "text-slate-500",
    dropdownBg: "bg-white",
    dropdownBorder: "border-slate-200",
    dropdownHover: "hover:bg-purple-50",
    filterBg: "bg-white",
    filterText: "text-slate-600",
    filterBorder: "border-slate-200",
    filterHover: "hover:border-purple-200 hover:text-purple-700",
    filterActiveBg: "bg-purple-50",
    filterActiveText: "text-purple-700",
    filterActiveBorder: "border-purple-200",
    dashedBorder: "border-slate-300",
    chipBg: "bg-purple-50",
    chipText: "text-purple-700",
    chipBorder: "border-purple-100",
    resultsMuted: "text-slate-500",
    resultsStrong: "text-slate-800",
    sortHover: "hover:bg-slate-50",
    skeletonBg: "bg-slate-100",
    emptyIconBg: "bg-purple-50",
    emptyIconBorder: "border-purple-100",
    emptyIconText: "text-purple-500",
    errorIconBg: "bg-rose-50",
    errorIconBorder: "border-rose-100",
    errorIconText: "text-rose-500",
    warnText: "text-amber-600",
    paginationText: "text-slate-500",
    paginationHover: "hover:bg-purple-50",
    toastBg: "bg-slate-900",
    toastText: "text-white",
    overlay: "bg-slate-900",
  },
  dark: {
    pageBg: "bg-slate-950",
    pageText: "text-slate-100",
    navBg: "bg-slate-900",
    navBorder: "border-slate-800",
    navMuted: "text-slate-400",
    navActive: "text-purple-400",
    navIconBg: "hover:bg-slate-800",
    navAvatarBg: "bg-purple-950 border border-purple-800 text-purple-300",
    heroGradient: "bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950",
    blobA: "bg-purple-950",
    blobB: "bg-violet-950",
    heading: "text-white",
    subheading: "text-slate-400",
    surface: "bg-slate-900",
    surfaceBorder: "border-slate-800",
    inputFocus: "focus-within:bg-slate-800",
    inputText: "text-slate-100",
    placeholder: "placeholder:text-slate-500",
    dividerV: "bg-slate-800",
    dividerH: "bg-slate-800",
    iconMuted: "text-slate-500",
    cardBg: "bg-slate-900",
    cardBorder: "border-slate-800",
    cardHoverBorder: "hover:border-purple-700",
    cardTitle: "text-white",
    cardTitleHover: "group-hover:text-purple-400",
    companyName: "text-slate-300",
    verifiedText: "text-slate-500",
    metaBadgeBg: "bg-purple-950",
    metaBadgeText: "text-purple-300",
    metaBadgeBorder: "border-purple-900",
    skillChipBg: "bg-slate-800",
    skillChipText: "text-slate-300",
    skillChipBorder: "border-slate-700",
    salaryText: "text-slate-100",
    footerText: "text-slate-400",
    dropdownBg: "bg-slate-900",
    dropdownBorder: "border-slate-800",
    dropdownHover: "hover:bg-slate-800",
    filterBg: "bg-slate-900",
    filterText: "text-slate-300",
    filterBorder: "border-slate-800",
    filterHover: "hover:border-purple-700 hover:text-purple-300",
    filterActiveBg: "bg-purple-950",
    filterActiveText: "text-purple-300",
    filterActiveBorder: "border-purple-800",
    dashedBorder: "border-slate-700",
    chipBg: "bg-purple-950",
    chipText: "text-purple-300",
    chipBorder: "border-purple-900",
    resultsMuted: "text-slate-400",
    resultsStrong: "text-slate-100",
    sortHover: "hover:bg-slate-800",
    skeletonBg: "bg-slate-800",
    emptyIconBg: "bg-purple-950",
    emptyIconBorder: "border-purple-900",
    emptyIconText: "text-purple-400",
    errorIconBg: "bg-rose-950",
    errorIconBorder: "border-rose-900",
    errorIconText: "text-rose-400",
    warnText: "text-amber-400",
    paginationText: "text-slate-400",
    paginationHover: "hover:bg-slate-800",
    toastBg: "bg-slate-100",
    toastText: "text-slate-900",
    overlay: "bg-black",
  },
};


export function JobCardSkeleton() {
 // const { t } = useTheme();
  const  t=THEME_TOKENS.light
  return (
    <div className={cx("rounded-2xl border p-4 sm:p-5 flex flex-col gap-4 animate-pulse", t.cardBg, t.cardBorder)}>
      <div className="flex items-center gap-3">
        <div className={cx("h-12 w-12 rounded-xl", t.skeletonBg)} />
        <div className="flex-1 space-y-2">
          <div className={cx("h-3 w-28 rounded", t.skeletonBg)} />
          <div className={cx("h-2 w-16 rounded", t.skeletonBg)} />
        </div>
        <div className={cx("h-8 w-8 rounded-lg", t.skeletonBg)} />
      </div>
      <div className="space-y-2">
        <div className={cx("h-4 w-3/4 rounded", t.skeletonBg)} />
        <div className={cx("h-3 w-1/2 rounded", t.skeletonBg)} />
      </div>
      <div className="flex gap-1.5">
        <div className={cx("h-5 w-16 rounded-lg", t.skeletonBg)} />
        <div className={cx("h-5 w-16 rounded-lg", t.skeletonBg)} />
        <div className={cx("h-5 w-16 rounded-lg", t.skeletonBg)} />
      </div>
      <div className={cx("h-4 w-28 rounded", t.skeletonBg)} />
      <div className="flex gap-1.5">
        <div className={cx("h-5 w-14 rounded-full", t.skeletonBg)} />
        <div className={cx("h-5 w-14 rounded-full", t.skeletonBg)} />
        <div className={cx("h-5 w-10 rounded-full", t.skeletonBg)} />
      </div>
      <div className={cx("h-px", t.dividerH)} />
      <div className="flex justify-between">
        <div className={cx("h-3 w-16 rounded", t.skeletonBg)} />
        <div className={cx("h-3 w-16 rounded", t.skeletonBg)} />
      </div>
    </div>
  );
}

export function JobErrorState({ onRetry }:{onRetry:()=>void}) {
  const t=THEME_TOKENS.light
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 sm:py-20 px-6">
      <div className={cx("h-16 w-16 rounded-2xl border flex items-center justify-center mb-5", t.errorIconBg, t.errorIconBorder)}>
        <AlertTriangle className={cx("h-7 w-7", t.errorIconText)} />
      </div>
      <h3 className={cx("text-lg font-semibold", t.cardTitle)}>Unable to load jobs</h3>
      <p className={cx("mt-1.5 text-sm max-w-sm", t.subheading)}>Something went wrong while fetching job opportunities.</p>
      <button
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 text-white text-sm font-medium px-4 py-2.5 hover:bg-purple-700 transition-colors shadow-md"
      >
        Try again
      </button>
    </div>
  );
}

export function EmptyJobsState({ onClear }:{onClear:()=>void}) {
  const t=THEME_TOKENS.light
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 sm:py-20 px-6">
      <div className={cx("h-16 w-16 rounded-2xl border flex items-center justify-center mb-5", t.emptyIconBg, t.emptyIconBorder)}>
        <FolderSearch className={cx("h-7 w-7", t.emptyIconText)} />
      </div>
      <h3 className={cx("text-lg font-semibold", t.cardTitle)}>No jobs found</h3>
      <p className={cx("mt-1.5 text-sm max-w-sm", t.subheading)}>Try adjusting your search or removing some filters.</p>
      <button
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 text-white text-sm font-medium px-4 py-2.5 hover:bg-purple-700 transition-colors shadow-md"
      >
        Clear all filters
      </button>
    </div>
  );
}