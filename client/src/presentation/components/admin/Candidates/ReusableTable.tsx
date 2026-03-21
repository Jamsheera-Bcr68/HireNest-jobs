import { useEffect, useState } from 'react';

export type ColumnType<T> = {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
};

type FilterOption = {
  key: string;
  label: string;
  options: readonly string[];
};
type Props<T extends { id: string }> = {
  tabs: string[];
  updateFilter: (filter: any) => void;
  entities: T[];
  columns: ColumnType<T>[];
  filterOptions: FilterOption[];
};

function ReusableTable<T extends { id: string }>({
  tabs,
  updateFilter,
  entities,
  columns,
  filterOptions,
}: Props<T>) {
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilter({ search: searchInput });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <>
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search ..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              updateFilter({ status: 'all' });
            }}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent bg-slate-50"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {filterOptions.map((option) => {
            return (
              <select
                key={option.key}
                onChange={(e) => updateFilter({ [option.key]: e.target.value })}
                className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50 text-slate-600"
              >
                {option.label}
                <option value={''}>All {option.label} </option>
                {option.options.map((opt) => (
                  <option value={opt} key={opt}>
                    {' '}
                    {opt}{' '}
                  </option>
                ))}
              </select>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1 px-5 pt-4 border-b border-slate-100">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                updateFilter({ status: tab.toLowerCase() });
                setActiveTab(tab);
                updateFilter({ status: tab.toLowerCase() });
              }}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition border-b-2 -mb-px  ${
                activeTab === tab
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              } `}
            >
              {tab}
              {tab == activeTab && (
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}
                >
                  {entities.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {entities.map((entity) => (
              <tr key={entity.id} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4 ">
                    {column.render(entity)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {entities.length === 0 && (
          <div className="text-center py-16 text-slate-400">No data found</div>
        )}
      </div>
    </>
  );
}

export default ReusableTable;
