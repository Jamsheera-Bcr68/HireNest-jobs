import React, { useEffect, useState, type SetStateAction } from 'react';
import FilterSection from './FilterSection';
import { JOB_TYPES } from '../../../../types/dtos/job.dto';
import { Experience_Types } from '../../../../types/dtos/profile-types/experience.type';
import { Industry_Type } from '../../../../types/dtos/profile-types/industry.type';
import { SalaryType } from '../../../../types/dtos/profile-types/experience.type';
import type { JobFilterType } from '../../../components/candidate/jobListing/ListingContainter';

import { cx } from '../../../components/candidate/jobListing/ListingContainter';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
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
                className="text-xs font-bold text-fuchsia-800 hover:text-fuchsia-600"
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
        </div>
      </aside>
    </div>
  );
}

export default Filter;

export function JobFilterControls({
  onToggleFilter,
  onOpenMobileFilters,
  filters,

  setSelectedModes,
  selectedModes,
  selectedTypes,
  setSelectedTypes,

  selectedLevels,
  setSelectedLevels,
  selectedIndustries,
  setSelectedIndustries,
  selectedSalary,
  setSelectedSalary,
}: {
  filters: JobFilterType;
  onToggleFilter: (data: Partial<JobFilterType>) => void;
  onOpenMobileFilters: () => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<SetStateAction<string[]>>;
  selectedModes: string[];
  setSelectedModes: React.Dispatch<SetStateAction<string[]>>;
  selectedLevels: string[];
  setSelectedLevels: React.Dispatch<SetStateAction<string[]>>;
  selectedIndustries: string[];
  setSelectedIndustries: React.Dispatch<SetStateAction<string[]>>;
  selectedSalary: string[];
  setSelectedSalary: React.Dispatch<SetStateAction<string[]>>;
}) {
  //const [selectedSalary, setSelectedSalary] = useState<string[]>([]);
  const {t}=useTheme()
  const activeCount = Object.values(filters)
    .filter((item) => typeof item === 'string' || Array.isArray(item))
    .reduce((sum, arr) => sum + arr.length, 0);

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    arr: string[],
    val: string
  ) => setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  useEffect(() => {
    onToggleFilter({
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
  return (
    <>
      {/* desktop / tablet row */}
      <div className="hidden sm:flex flex-wrap items-center mt-3 gap-2">
        <FilterDropdown
          key={'jobType'}
          label={'Job Type'}
          options={JOB_TYPES}
          active={selectedTypes}
          onToggle={(v) => toggle(setSelectedTypes, selectedTypes, v)}
        />
        <FilterDropdown
          key={'mode'}
          label={'Job Mode'}
          options={['Remote', 'Hybrid', 'Onsite']}
          active={selectedModes}
          onToggle={(v) => toggle(setSelectedModes, selectedModes, v)}
        />
        <FilterDropdown
          key={'industry'}
          label={'Industry'}
          options={Industry_Type}
          active={selectedIndustries}
          onToggle={(v) => toggle(setSelectedIndustries, selectedIndustries, v)}
        />
        <FilterDropdown
          key={'experience'}
          label={'Experience'}
          options={Experience_Types}
          active={selectedLevels}
          onToggle={(v) => toggle(setSelectedLevels, selectedLevels, v)}
        />
        <FilterDropdown
          key={'salary'}
          label={'Salary Range'}
          options={SalaryType}
          active={selectedSalary}
          onToggle={(v) => toggle(setSelectedSalary, selectedSalary, v)}
        />
      </div>

      {/* mobile: single "Filters" button */}
      <button
        onClick={onOpenMobileFilters}
        className={cx(
          'sm:hidden inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium',
          t.filterBorder,
          t.filterBg,
          t.filterText
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeCount > 0 && (
          <span className="text-purple-600">({activeCount})</span>
        )}
      </button>
    </>
  );
}

function FilterDropdown({
  label,
  options,
  active,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  active?: string[];
  onToggle: (v: string) => void;
}) {
  const {t}=useTheme()
  const [open, setOpen] = useState(false);
  const count = active?.length ?? 0;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cx(
          'inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors',
          count > 0
            ? cx(t.filterActiveBorder, t.filterActiveBg, t.filterActiveText)
            : cx(t.filterBorder, t.filterBg, t.filterText, t.filterHover)
        )}
      >
        {label}
        {count > 0 && <span className="text-purple-500">({count})</span>}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div
            className={cx(
              'absolute z-20 mt-2 w-52 rounded-xl border shadow-lg p-2',
              t.dropdownBg,
              t.dropdownBorder
            )}
          >
            {options.map((opt) => (
              <label
                key={opt}
                className={cx(
                  'flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm cursor-pointer',
                  t.filterText,
                  t.dropdownHover
                )}
              >
                <input
                  type="checkbox"
                  checked={active?.includes(opt)}
                  onChange={() => onToggle(opt)}
                  className="accent-purple-600 h-3.5 w-3.5"
                />
                {opt}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ActiveFilterChips({
  chips,
  onRemove,
  onClearAll,
}: {
  chips: string[];
  onRemove: (value: string) => void;
  onClearAll: () => void;
}) {
  const {t}=useTheme()
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={cx('text-xs font-medium', t.footerText)}>
        Active filters:
      </span>
      {chips.map((c) => (
        <span
          key={c}
          className={cx(
            'inline-flex items-center gap-1 rounded-full border text-xs font-medium pl-2.5 pr-1.5 py-1',
            t.chipBg,
            t.chipBorder,
            t.chipText
          )}
        >
          {c}
          <button
            onClick={() => onRemove(c)}
            className={cx('rounded-full p-0.5', t.dropdownHover)}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className={cx(
          'text-xs font-medium ml-1 hover:text-purple-600',
          t.footerText
        )}
      >
        Clear all
      </button>
    </div>
  );
}

export function JobResultsHeader({
  count,
  sort,
  setSort,
  sortOptions,
}: {
  count: number;
  sort: string;
  sortOptions: { label: string; value: string }[];
  setSort: (item: string) => void;
}) {
  const {t}=useTheme()
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <p className={cx('text-sm', t.resultsMuted)}>
        <span className={cx('font-semibold', t.resultsStrong)}>
          {count.toLocaleString('en-IN')}
        </span>{' '}
        jobs found
      </p>
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className={cx(
            'inline-flex items-center gap-1.5 text-sm font-medium hover:text-purple-600',
            t.filterText
          )}
        >
          Sort by: <span className={t.resultsStrong}>{sort}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <div
              className={cx(
                'absolute right-0 z-20 mt-2 w-52 rounded-xl border shadow-lg p-1.5',
                t.dropdownBg,
                t.dropdownBorder
              )}
            >
              {sortOptions.map((o: { label: string; value: string }) => (
                <button
                  key={o.value}
                  onClick={() => {
                    setSort(o.value);
                    setOpen(false);
                  }}
                  className={cx(
                    'w-full text-left px-2.5 py-2 rounded-lg text-sm transition-colors',
                    o.value === sort
                      ? cx(t.filterActiveBg, t.filterActiveText, 'font-medium')
                      : cx(t.filterText, t.sortHover)
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onToggleFilter,
  onClearAll,

  setSelectedModes,
  selectedModes,
  selectedTypes,
  setSelectedTypes,

  selectedLevels,
  setSelectedLevels,
  selectedIndustries,
  setSelectedIndustries,
  selectedSalary,
  setSelectedSalary,
}: {
  open: boolean;
  onClose: () => void;
  filters: JobFilterType;
  onToggleFilter: (data: Partial<JobFilterType>) => void;
  onClearAll: () => void;
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<SetStateAction<string[]>>;
  selectedModes: string[];
  setSelectedModes: React.Dispatch<SetStateAction<string[]>>;
  selectedLevels: string[];
  setSelectedLevels: React.Dispatch<SetStateAction<string[]>>;
  selectedIndustries: string[];
  setSelectedIndustries: React.Dispatch<SetStateAction<string[]>>;
  selectedSalary: string[];
  setSelectedSalary: React.Dispatch<SetStateAction<string[]>>;
}) {
  const {t}=useTheme()
  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    arr: string[],
    val: string
  ) => setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 sm:hidden">
      <div
        className={cx('absolute inset-0 opacity-40', t.overlay)}
        onClick={onClose}
      />
      <div
        className={cx(
          'absolute bottom-0 left-0 right-0 rounded-t-2xl border-t max-h-screen overflow-y-auto',
          t.surface,
          t.surfaceBorder
        )}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className={cx('text-base font-semibold', t.cardTitle)}>
            Filters
          </h3>
          <button
            onClick={onClose}
            className={cx(
              'h-8 w-8 rounded-lg flex items-center justify-center',
              t.footerText,
              t.dropdownHover
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 pb-6 space-y-5">
          {/* /*filters*/}

          <div key={'jobType'}>
            <p className={cx('text-sm font-medium mb-2', t.cardTitle)}>
              {'Job Type'}
            </p>
            <div className="flex flex-wrap gap-2">
              {JOB_TYPES.map((opt) => {
                const active = selectedTypes.includes(opt);
                return (
                  <button
                    onClick={() => toggle(setSelectedTypes, selectedTypes, opt)}
                    key={opt}
                    className={cx(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? cx(
                            t.filterActiveBorder,
                            t.filterActiveBg,
                            t.filterActiveText
                          )
                        : cx(t.filterBorder, t.filterBg, t.filterText)
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div key={'salary'}>
            <p className={cx('text-sm font-medium mb-2', t.cardTitle)}>
              {'Salary'}
            </p>
            <div className="flex flex-wrap gap-2">
              {SalaryType.map((opt) => {
                const active = selectedSalary.includes(opt);
                return (
                  <button
                    onClick={() =>
                      toggle(setSelectedSalary, selectedSalary, opt)
                    }
                    key={opt}
                    className={cx(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? cx(
                            t.filterActiveBorder,
                            t.filterActiveBg,
                            t.filterActiveText
                          )
                        : cx(t.filterBorder, t.filterBg, t.filterText)
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div key={'mode'}>
            <p className={cx('text-sm font-medium mb-2', t.cardTitle)}>
              {'Mode'}
            </p>
            <div className="flex flex-wrap gap-2">
              {['onsite', 'remote', 'hybrid'].map((opt) => {
                const active = selectedModes.includes(opt);
                return (
                  <button
                    onClick={() => toggle(setSelectedModes, selectedModes, opt)}
                    key={opt}
                    className={cx(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? cx(
                            t.filterActiveBorder,
                            t.filterActiveBg,
                            t.filterActiveText
                          )
                        : cx(t.filterBorder, t.filterBg, t.filterText)
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div key={'experienceLevel'}>
            <p className={cx('text-sm font-medium mb-2', t.cardTitle)}>
              {'Experience'}
            </p>
            <div className="flex flex-wrap gap-2">
              {Experience_Types.map((opt) => {
                const active = selectedLevels.includes(opt);
                return (
                  <button
                    onClick={() =>
                      toggle(setSelectedLevels, selectedLevels, opt)
                    }
                    key={opt}
                    className={cx(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? cx(
                            t.filterActiveBorder,
                            t.filterActiveBg,
                            t.filterActiveText
                          )
                        : cx(t.filterBorder, t.filterBg, t.filterText)
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          <div key={'industry'}>
            <p className={cx('text-sm font-medium mb-2', t.cardTitle)}>
              {'Industry'}
            </p>
            <div className="flex flex-wrap gap-2">
              {Industry_Type.map((opt) => {
                const active = selectedIndustries.includes(opt);
                return (
                  <button
                    onClick={() =>
                      toggle(setSelectedIndustries, selectedIndustries, opt)
                    }
                    key={opt}
                    className={cx(
                      'rounded-full border px-3 py-2 text-sm font-medium transition-colors',
                      active
                        ? cx(
                            t.filterActiveBorder,
                            t.filterActiveBg,
                            t.filterActiveText
                          )
                        : cx(t.filterBorder, t.filterBg, t.filterText)
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
          {/* /*filters*/}
        </div>
        <div
          className={cx(
            'sticky bottom-0 flex gap-3 px-5 py-4 border-t',
            t.surface,
            t.surfaceBorder
          )}
        >
          <button
            onClick={onClearAll}
            className={cx(
              'flex-1 rounded-xl border py-3 text-sm font-medium',
              t.filterBorder,
              t.filterText
            )}
          >
            Clear all
          </button>
          <button
            onClick={onClose}
            className="flex-1 rounded-xl bg-fuchsia-800 text-white py-3 text-sm font-medium hover:bg-fuchsia-600 transition-colors"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
