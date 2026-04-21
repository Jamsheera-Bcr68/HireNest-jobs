import { useEffect, useState } from 'react';
import {type ReactNode } from 'react';
import type {
  ApplicationFilterType,
  FilterOption,
} from '../../hooks/user/candidate/profile/useApplication';
import type { ApplicationStatusType } from '../../../types/dtos/application.dto';
import { type JobType } from '../../../types/dtos/jobDto';
import type { AppSortType } from './applications/ApplicationContainer';
import { ChevronLeft } from 'lucide-react';

type Props = {
  title: string;
  tag: string;
};
export const Hero = ({ title, tag }: Props) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 font-serif">{title}</h1>
      <p className="text-sm text-gray-500 mt-1">{tag}</p>
    </div>
  );
};
export type StatsCardType = {
  label: string;
  value: number;
};

export const StatusCards = ({ stats }: { stats: StatsCardType[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
        >
          <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
            {stat.label}
          </p>
          <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

type FilterProps = {
  onFilterChange: (data: ApplicationFilterType) => void;
  statusFilter: FilterOption<ApplicationStatusType>;
  typeFilter: FilterOption<JobType>;
  filter: ApplicationFilterType;
  sortOrder: FilterOption<AppSortType>;
};
export const Filters = ({
  onFilterChange,
  statusFilter,
  filter,
  typeFilter,
  sortOrder,
}: FilterProps) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange({ search });
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [search]);
  return (
    <div className="flex flex-wrap gap-3 mb-6 items-center">
      <input
        type="text"
        placeholder="Search by job title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 min-w-[200px] text-sm px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
      <select
        value={filter.status || ''}
        onChange={(e) =>
          onFilterChange({ status: e.target.value as ApplicationStatusType })
        }
        className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option value="">All Status</option>

        {statusFilter.options.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <select
        value={filter.jobType}
        onChange={(e) => onFilterChange({ jobType: e.target.value as JobType })}
        className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        <option value="">All Types</option>
        {typeFilter.options.map((t, i) => (
          <option value={t.value} key={t.value}>
            {t.label}
          </option>
        ))}
      </select>
      <select
        value={filter.sortBy}
        onChange={(e) =>
          onFilterChange({ sortBy: e.target.value as AppSortType })
        }
        className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100"
      >
        {sortOrder.options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export const BackButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
    >
      <ChevronLeft size={16} />
      {text}
    </button>
  );
};

export function Card({
  children,
  className = '',
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ children }:{children:ReactNode}) {
  return (
    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-4">
      {children}
    </p>
  );
}
