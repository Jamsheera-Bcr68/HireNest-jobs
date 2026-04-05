import type { JobCardDto } from '../../../../types/dtos/jobDto';

type Props = {
  search: string;
  location: string;
  totalFilters: number;
  jobs: JobCardDto[];
  viewMode: 'grid' | 'split';
  changeView: (view: 'grid' | 'split') => void;
  sortBy: string;
  setSortBy: (item: string) => void;
};
function ToolBar({
  search,
  location,
  totalFilters,
  jobs,
  viewMode,
  changeView,
  sortBy,
  setSortBy,
}: Props) {
  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-sm font-bold text-slate-900">
            {jobs.length.toLocaleString()} jobs found
          </span>
          <span className="text-slate-400 text-sm ml-1.5">
            {search || location || totalFilters > 0
              ? 'for your search'
              : 'in all categories'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <span>Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value.toLocaleLowerCase())}
              className="sort-select bg-transparent text-slate-700 font-bold text-xs pr-4 focus:outline-none"
            >
              <option value={'newest'}>Newest</option>
              <option value={'salary-high-low'}>Salary-High-Low</option>
              <option value={'salary-low-high'}>Salary-Low-High</option>
              <option value={'vacancy-high-low'}>Vacancy-high-low</option>
              <option value={'deadline'}>Last Date</option>
            </select>
          </div>
          {/* View toggle */}
          {/* <div
            className="flex hidden lg:flex items-center rounded-xl overflow-hidden"
            style={{ border: '1.5px solid #e2e8f0' }}
          >
            <button
              onClick={() => changeView('split')}
              className="px-3 py-1.5 text-xs font-bold transition-all"
              style={{
                background: viewMode === 'split' ? '#eef2ff' : 'white',
                color: viewMode === 'split' ? '#4f46e5' : '#94a3b8',
              }}
            >
              Split
            </button>
            <button
              onClick={() => changeView('grid')}
              className="px-3 py-1.5 text-xs font-bold transition-all"
              style={{
                background: viewMode === 'grid' ? '#eef2ff' : 'white',
                color: viewMode === 'grid' ? '#4f46e5' : '#94a3b8',
              }}
            >
              Grid
            </button>
          </div> */}
          {jobs.length > 1 && (
            <div
              className="hidden lg:flex items-center rounded-xl overflow-hidden"
              style={{ border: '1.5px solid #e2e8f0' }}
            >
              <button
                onClick={() => changeView('split')}
                className="px-3 py-1.5 text-xs font-bold transition-all"
                style={{
                  background: viewMode === 'split' ? '#eef2ff' : 'white',
                  color: viewMode === 'split' ? '#4f46e5' : '#94a3b8',
                }}
              >
                Split
              </button>

              <button
                onClick={() => changeView('grid')}
                className="px-3 py-1.5 text-xs font-bold transition-all"
                style={{
                  background: viewMode === 'grid' ? '#eef2ff' : 'white',
                  color: viewMode === 'grid' ? '#4f46e5' : '#94a3b8',
                }}
              >
                Grid
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
