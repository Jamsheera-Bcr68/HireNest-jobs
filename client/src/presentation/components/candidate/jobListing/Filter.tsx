import React, { useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import { JOB_TYPES } from '../../../../types/dtos/jobDto';
import { Experience_Types } from '../../../../types/dtos/profileTypes/experienceType';
import { Industry_Type } from '../../../../types/dtos/profileTypes/industryType';
import { SalaryType } from '../../../../types/dtos/profileTypes/experienceType';
import type { JobFilterType } from '../../../pages/user/JobListing';

type Props = {
  filter: JobFilterType;
  onFilterChange: (data: Partial<JobFilterType>) => void;
};
function Filter({ filter, onFilterChange }: Props) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(
    filter.industry || []
  );
  const [selectedSalary, setSelectedSalary] = useState<string[]>([]);

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    arr: string[],
    val: string
  ) => setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  useEffect(() => {
    onFilterChange({
      jobType: selectedTypes,
      experience: selectedLevels,
      industry: selectedIndustries,
      salary: selectedSalary,
      mode: selectedModes,
    });
  }, [
    selectedTypes,
    selectedLevels,
    selectedIndustries,
    selectedSalary,
    selectedModes,
  ]);
  const totalFilters =
    selectedTypes.length +
    selectedLevels.length +
    selectedIndustries.length +
    selectedSalary.length +
    selectedModes.length;

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedIndustries([]);
    setSelectedSalary([]);
    setSelectedModes([]);
  };
  return (
    <div>
      <aside className="hidden sticky top-24  lg:block w-64 shrink-0">
        <div
          className="sticky top-24 bg-white rounded-2xl p-5 sidebar-scroll overflow-y-auto"
          style={{
            border: '1.5px solid #e8edf5',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-extrabold text-slate-900">Filters</h3>
            {totalFilters > 0 && (
              <button
                onClick={clearAll}
                className="text-xs font-bold text-indigo-500 hover:text-indigo-700"
              >
                Clear({totalFilters})
              </button>
            )}
          </div>

          <FilterSection
            title="Job Type"
            items={JOB_TYPES}
            selected={selectedTypes}
            onToggle={(v) => toggle(setSelectedTypes, selectedTypes, v)}
          />
          <FilterSection
            title="Job Mode"
            items={['Remote', 'Hybrid', 'Onsite']}
            selected={selectedModes}
            onToggle={(v) => toggle(setSelectedModes, selectedModes, v)}
          />
          <div className="h-px bg-slate-100 mb-5" />
          <FilterSection
            title="Industry"
            items={Industry_Type}
            selected={selectedIndustries}
            onToggle={(v) =>
              toggle(setSelectedIndustries, selectedIndustries, v)
            }
          />
          <div className="h-px bg-slate-100 mb-5" />
          <FilterSection
            type="exp"
            title="Experience Level"
            items={Experience_Types}
            selected={selectedLevels}
            onToggle={(v) => toggle(setSelectedLevels, selectedLevels, v)}
          />

          <div className="h-px bg-slate-100 mb-5" />
          <FilterSection
            title="Salary Range"
            items={SalaryType}
            selected={selectedSalary}
            onToggle={(v) => toggle(setSelectedSalary, selectedSalary, v)}
          />

          {/* <div
            className="mt-2 p-3 rounded-xl text-xs text-indigo-600 font-semibold text-center"
            style={{ background: '#eef2ff', border: '1px solid #c7d2fe' }}
          >
            🔔 Set up Job Alert
          </div> */}
        </div>
      </aside>
    </div>
  );
}

export default Filter;
