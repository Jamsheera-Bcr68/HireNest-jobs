import { Hero, StatusCards, Filters } from '../ReusableComponents';
import ApplicationList from './ApplicationList';
import Pagination from '../../common/Pagination';
import { useEffect, useState } from 'react';
import { useToast } from '../../../../shared/toast/use-toast';

import type { StatsCardType } from '../ReusableComponents';
import { applicationService } from '../../../../services/api-services/application.service';
import { type ApplicationDto } from '../../../../types/dtos/application.dto';
import {
  useApplications,
  type ApplicationFilterType,
  type FilterOption,
} from '../../../hooks/user/candidate/profile/useApplication';

export type AppSortType = 'newest' | 'oldest';
function ApplicationContainer() {
  const { showToast } = useToast();
  const [stats, setStats] = useState<StatsCardType[]>([]);
  const [applications, setApplications] = useState<ApplicationDto[]>();
  const [limit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const { filter, updateFilter } = useApplications((page?: number) => {
    if (page) {
      setPage(page);
    }
  });
  useEffect(() => {
    const getStatus = async () => {
      const data = await applicationService.getApplicationStatus();
      console.log('app status', data.appStatus);
      const total = {
        label: 'Total Applications',
        value: data.appStatus.total,
      };
      const pending = {
        label: 'Pending',
        value: data.appStatus.pending,
      };
      setStats([total, pending]);
      const shortListed = {
        label: 'Short Listed',
        value: data.appStatus.shortListed,
      };
      const interviewSheduled = {
        label: 'Interview',
        value: data.appStatus.interviewScheduled,
      };

      setStats([total, pending, shortListed, interviewSheduled]);
    };

    getStatus();
  }, [applications]);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const data = await applicationService.getApplications(
          filter,
          page,
          limit
        );
        console.log('applications', data.applications);

        setApplications(data.applications);
        setTotalDocs(data.totalDocs);
      } catch (error: any) {
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    };
    getApplications();
  }, [filter, page, limit]);

  const statusFilter: FilterOption<ApplicationFilterType> = {
    key: 'status',
    label: 'All Status',
    options: [
      { label: 'All', value: '' },
      { label: 'Pending', value: 'pending' },
      { label: 'Viewed', value: 'reviewed' },
      { label: 'Short Listed', value: 'shortListed' },
      { label: 'Rejected', value: 'rejected' },
      { label: 'Interview Scheduled', value: 'interviewScheduled' },
    ],
  };

  const typeFilter: FilterOption<ApplicationFilterType> = {
    key: 'jobType',
    label: 'All Types',
    options: [
      { label: 'All Types', value: '' },
      { label: 'Full Time', value: 'fullTime' },
      { label: 'Part Time', value: 'partTime' },
    ],
  };

  const sortOrder: FilterOption<ApplicationFilterType> = {
    key: 'sortBy',
    label: 'All ',
    options: [
      { label: 'Newest', value: 'newest' },
      { label: 'Oldest ', value: 'oldest' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <Hero
          title="Applications"
          tag="  Track and manage all your job applications"
        />
        <StatusCards stats={stats} />
        {/* <Filters
          filter={filter}
          statusFilter={statusFilter}
          onFilterChange={updateFilter}
          typeFilter={typeFilter}
          sortOrder={sortOrder}
        /> */}
        <Filters
          filter={filter}
          filterOptions={[statusFilter, typeFilter]}
          onFilterChange={updateFilter}
          sortOrder={sortOrder}
        />
        <ApplicationList applications={applications ?? []} />
        <Pagination
          item="Applications"
          currentPage={page}
          totalItem={totalDocs}
          onPageChange={setPage}
          count={applications?.length || 0}
          totalPages={Math.ceil(totalDocs / limit)}
        />
      </div>
    </div>
  );
}

export default ApplicationContainer;
