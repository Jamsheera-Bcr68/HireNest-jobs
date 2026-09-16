import { Search } from 'lucide-react';
import { useState } from 'react';
import { type JobFilterType } from './ListingContainter';
import { useTheme } from '../../../../contexts/ThemeContext';

type Props = {
  handleFilterChange: (data: Partial<JobFilterType>) => void; 
  filter: { search: { job: string; location: string } };
};
function SearchBar({ handleFilterChange, filter }: Props) {
  const {t}=useTheme()
  const [jobSearch, setJobSearch] = useState<string>(filter.search.job);
  const [location, setLocation] = useState<string>(filter.search.location);
  return (
  <div
    className={`sticky top-16 z-10 ${t.searchBarBg} border-b ${t.navBorder} px-4 sm:px-6 py-4`}
  >
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3">
      {/* Job Search */}
      <div
        className={`
          flex items-center gap-3 flex-1
          px-4 py-3 rounded-xl
          ${t.surface}
          border ${t.surfaceBorder}
          search-bar-shadow
          transition-colors duration-300
        `}
      >
        <Search
          className="text-fuchsia-500 flex-shrink-0"
          size={18}
        />

        <input
          value={jobSearch}
          onChange={(e) => setJobSearch(e.target.value)}
          placeholder="Job title or keyword"
          className={`
            bg-transparent flex-1 min-w-0
            text-sm ${t.inputText}
            ${t.placeholder}
            font-medium
            outline-none focus:outline-none focus:ring-0
          `}
        />

        {jobSearch && (
          <button
            type="button"
            aria-label="Clear job search"
            onClick={() => {
              setJobSearch("");
              handleFilterChange({
                search: {
                  job: "",
                  location: location,
                },
              });
            }}
            className={`
              ${t.iconMuted}
              hover:text-fuchsia-500
              transition-colors
              flex-shrink-0
            `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Location Search */}
      <div
        className={`
          flex items-center gap-3
          w-full md:w-72
          px-4 py-3 rounded-xl
          ${t.surface}
          border ${t.surfaceBorder}
          search-bar-shadow
          transition-colors duration-300
        `}
      >
        <Search
          className="text-fuchsia-500 flex-shrink-0"
          size={18}
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="State, Place or Country"
          className={`
            bg-transparent flex-1 min-w-0
            text-sm ${t.inputText}
            ${t.placeholder}
            font-medium
            outline-none focus:outline-none focus:ring-0
          `}
        />

        {location && (
          <button
            type="button"
            aria-label="Clear location"
            onClick={() => {
              setLocation("");
              handleFilterChange({
                search: {
                  job: jobSearch,
                  location: "",
                },
              });
            }}
            className={`
              ${t.iconMuted}
              hover:text-fuchsia-500
              transition-colors
              flex-shrink-0
            `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search Button */}
      <button
        type="button"
        onClick={() => {
          handleFilterChange({
            search: {
              job: jobSearch,
              location: location,
            },
          });
        }}
        className="
          w-full md:w-auto
          bg-fuchsia-800
          hover:bg-fuchsia-600
          px-8 py-3
          rounded-xl
          text-sm font-bold
          text-white
          whitespace-nowrap
          transition-all duration-200
          hover:-translate-y-0.5
          hover:shadow-lg hover:shadow-fuchsia-200/40
          active:translate-y-0
        "
      >
        Search
      </button>
    </div>

    {/* Active filter chips can go here */}
  </div>
);
  // return (
  //   <div className="bg-fuchsia-100 sticky top-16 z-10  border-b border-slate-100 px-6 py-4">
  //     <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3">
  //       <div
  //         className="flex  items-center gap-3 flex-1 px-4 py-3 rounded-xl bg-slate-50 search-bar-shadow"
  //         style={{ border: '1.5px solid #e2e8f0' }}
  //       >
  //         <Search className="text-fuchsia-500" size={18} />
  //         <input
  //           value={jobSearch}
  //           onChange={(e) => setJobSearch(e.target.value)}
  //           placeholder="Job title or keyword"
  //           className="bg-transparent flex-1 text-sm text-slate-700 font-medium outline-none focus:outline-none focus:ring-0"
  //         />
  //         {jobSearch && (
  //           <button
  //             onClick={() => {
  //               setJobSearch('');
  //               handleFilterChange({ search: { job: '', location: location } });
  //             }}
  //             className="text-slate-400 hover:text-slate-600"
  //           >
  //             <svg
  //               className="w-4 h-4"
  //               fill="none"
  //               stroke="currentColor"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M6 18L18 6M6 6l12 12"
  //               />
  //             </svg>
  //           </button>
  //         )}
  //       </div>
  //       <div
  //         className="flex items-center gap-3 w-full md:w-72 px-4 py-3 rounded-xl bg-slate-50"
  //         style={{ border: '1.5px solid #e2e8f0' }}
  //       >
  //         <Search className="text-fuchsia-500" size={18} />
  //         <input
  //           value={location}
  //           onChange={(e) => setLocation(e.target.value)}
  //           placeholder="State,Place or Country"
  //           className="bg-transparent flex-1 text-sm text-slate-700 font-medium outline-none focus:outline-none focus:ring-0"
  //         />
  //         {location && (
  //           <button
  //             onClick={() => {
  //               setLocation('');
  //               handleFilterChange({
  //                 search: { job: jobSearch, location: '' },
  //               });
  //             }}
  //             className="text-slate-400 hover:text-slate-600"
  //           >
  //             <svg
  //               className="w-4 h-4"
  //               fill="none"
  //               stroke="currentColor"
  //               viewBox="0 0 24 24"
  //             >
  //               <path
  //                 strokeLinecap="round"
  //                 strokeLinejoin="round"
  //                 strokeWidth={2}
  //                 d="M6 18L18 6M6 6l12 12"
  //               />
  //             </svg>
  //           </button>
  //         )}
  //       </div>
  //       <button
  //         onClick={() => {
  //           handleFilterChange({
  //             search: { job: jobSearch, location: location },
  //           });
  //         }}
  //         className="apply-btn bg-fuchsia-800  hover:bg-fuchsia-600  px-8 py-3 rounded-xl text-sm font-bold text-white whitespace-nowrap"
  //        // style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}
  //       >
  //         Search
  //       </button>
  //     </div>

  //     {/* Active filter chips */}
  //     {/* {totalFilters > 0 && (
  //       <div className="max-w-7xl mx-auto flex flex-wrap gap-2 mt-3">
  //         {[
  //           ...selectedTypes,
  //           ...selectedLevels,
  //           ...selectedIndustries,
  //           ...selectedSalary,
  //         ].map((f) => (
  //           <span
  //             key={f}
  //             className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 px-3 py-1 rounded-full"
  //             style={{ background: '#eef2ff', border: '1.5px solid #c7d2fe' }}
  //           >
  //             {f}
  //             <button
  //               onClick={() => {
  //                 if (selectedTypes.includes(f))
  //                   toggle(setSelectedTypes, selectedTypes, f);
  //                 if (selectedLevels.includes(f))
  //                   toggle(setSelectedLevels, selectedLevels, f);
  //                 if (selectedIndustries.includes(f))
  //                   toggle(setSelectedIndustries, selectedIndustries, f);
  //                 if (selectedSalary.includes(f))
  //                   toggle(setSelectedSalary, selectedSalary, f);
  //               }}
  //               className="text-indigo-400 hover:text-indigo-700"
  //             >
  //               ×
  //             </button>
  //           </span>
  //         ))}
  //         <button
  //           onClick={clearAll}
  //           className="text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors px-2"
  //         >
  //           Clear all
  //         </button>
  //       </div>
  //     )} */}
  //   </div>
  // );
}

export default SearchBar;
