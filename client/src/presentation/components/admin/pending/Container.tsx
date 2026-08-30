import SummaryCards from './SummaryCards';
import HeroSection from '../HeroSection';
import { useEffect, useState } from 'react';
import {
  type LucideIcon,
  Building2,
  ClipboardList,
  Eye,
  Flag,
  MoreHorizontal,
} from 'lucide-react';
import { adminService } from '../../../../services/api-services/adminService';
import ReusableTable from '../Candidates/ReusableTable';

export type CardType = {
  label: string;
  value: number;
  icon: LucideIcon;
  tint: string;
  desc: string;
};

const tabs = [
  { label: 'All', value: '' },
  { label: 'Jobs', value: 'jobs' },
  { label: 'Companies', value: 'companies' },
];
 export type Filter = {
  status?: 'jobs' | 'companies'|'';
};

interface PendingActivityDto {
  id: string;
  title: string;
  subTitle: string;
  type: 'Company Registration' | 'Reported Job';
  details: string[];
  submitted: string;
  tag: string;
  createdAt: string;
  status: 'pending' | 'reported';
}

export default function PendingActivitiesContainer() {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Filter>({});
  const [activities, setActivities] = useState<PendingActivityDto[]>([]);
  const [statusCards, setStatusCards] = useState<CardType[]>([]);
  const [activeTab, setActiveTab] = useState('companies');
  const [totalDocs, setTotalDocs] = useState<number>(0);
  //   const [search, setSearch] = useState("");
  //   const [severity, setSeverity] = useState("all");
  //   const [sort, setSort] = useState("newest");

  //   const allItems = useMemo(
  //     () => [...reportedJobs, ...companyRegistrations, ...otherActivities],
  //     []
  //   );

  //   const counts = {
  //     total: allItems.length,
  //     reportedJobs: reportedJobs.length,
  //     companies: companyRegistrations.length,
  //     other: otherActivities.length,
  //   };

  //   const filteredItems = useMemo(() => {
  //     let items = allItems;

  //     if (activeTab === "reportedJob") {
  //       items = items.filter((i) => i.type === "reportedJob");
  //     } else if (activeTab === "companyRegistration") {
  //       items = items.filter((i) => i.type === "companyRegistration");
  //     } else if (activeTab === "other") {
  //       items = items.filter(
  //         (i) => !["reportedJob", "companyRegistration"].includes(i.type)
  //       );
  //     }

  //     if (severity !== "all") {
  //       items = items.filter((i) => i.severity === severity);
  //     }

  //     if (search.trim()) {
  //       const q = search.trim().toLowerCase();
  //       items = items.filter((i) =>
  //         [i.title, i.company, i.subtitle, i.email, i.reason]
  //           .filter(Boolean)
  //           .some((field) => field.toLowerCase().includes(q))
  //       );
  //     }

  //     return items;
  //   }, [allItems, activeTab, severity, search]);

  //   const handleRefresh = () => {
  //     setLoading(true);
  //     setTimeout(() => setLoading(false), 900);
  //   };
  useEffect(() => {
    async function getPendingData() {
      const [statusData, activityData] = await Promise.all([
        adminService.getPendingData(),
        adminService.getAllPendings(filter),
      ]);
      console.log('activities', activityData);
      const total: CardType = {
        label: 'Total Pendings',
        value:
          (statusData.statusData.jobs ?? 0) +
          (statusData.statusData.companies ?? 0),
        icon: ClipboardList,
        tint: 'bg-indigo-50 text-indigo-600',
        desc: 'Across all categories',
      };
      const companies: CardType = {
        label: 'Company Registrations',
        value: statusData.statusData.companies,
        icon: Building2,
        tint: 'bg-blue-50 text-blue-600',
        desc: 'Awaiting approval',
      };
      const jobs: CardType = {
        label: 'Reported Jobs',
        value: statusData.statusData.jobs,
        icon: Flag,
        tint: 'bg-red-50 text-red-600',
        desc: 'Awaiting moderation',
      };
      setStatusCards([total, companies, jobs]);
      const pendings: PendingActivityDto[] = activityData.pendings;
      setTotalDocs(activityData.totalDocs);
      setActivities(pendings);
    }
    getPendingData();
  }, [filter]);

  const updateFilter = (data: Partial<Filter>) => {
    console.log('from update filter',data);
    
    setFilter({ ...filter, ...data });
  };
  const onResetfilter = () => {
    setFilter({});
  };
  const pendingActivityColumns = [
    {
      key: 'type',
      label: 'Type',

      headerClassName: 'w-[16%]',

      cellClassName: 'align-middle',

      render: (row: PendingActivityDto) => {
        const isReport = row.type === 'Reported Job';

        return (
          <div className="flex items-center gap-3">
            {isReport ? (
              <Flag className="h-5 w-5 shrink-0 text-red-500" />
            ) : (
              <Building2 className="h-5 w-5 shrink-0 text-blue-500" />
            )}

            <span className="text-sm text-slate-600">{row.type}</span>
          </div>
        );
      },
    },

    {
      key: 'title',
      label: 'Activity',

      headerClassName: 'w-[17%]',

      cellClassName: 'align-middle',

      render: (row: PendingActivityDto) => (
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{row.title}</p>

          <p className="mt-0.5 text-xs text-slate-500">{row.subTitle}</p>
        </div>
      ),
    },

    {
      key: 'details',
      label: 'Details',

      headerClassName: 'w-[21%]',

      cellClassName: 'align-middle',

      render: (row: PendingActivityDto) => (
        <span className="break-words text-sm text-slate-800">
          {row.details}
        </span>
      ),
    },

    {
      key: 'submitted',
      label: 'Submitted',

      headerClassName: 'w-[14%]',

      cellClassName: 'align-middle',

      render: (row: PendingActivityDto) => (
        <div>
          <p className="text-sm text-slate-800">
            {new Date(row.submitted).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>

          <p className="mt-0.5 text-xs text-slate-700">{row.tag}</p>
        </div>
      ),
    },

    {
      key: 'status',
      label: 'Status',

      headerClassName: 'w-[13%]',

      cellClassName: `align-middle`,

      render: (row: PendingActivityDto) => {
        const statusConfig: Record<
          string,
          {
            label: string;
            className: string;
          }
        > = {
          pending: {
            label: 'Pending',
            className: `  ${row.status == 'pending' ? 'bg-amber-100  text-amber-700' : 'bg-red-100  text-red-700'}`,
          },
          reported: {
            label: 'Reported',
            className: `  ${row.status == 'pending' ? 'bg-amber-100  text-amber-700' : 'bg-red-100  text-red-700'}`,
          },
        };

        const config = statusConfig[row.status.toLowerCase()] ?? {
          label: row.status,
          className: 'bg-slate-100 text-slate-600',
        };

        return (
          <span
            className={`
            inline-flex
            items-center
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            whitespace-nowrap
            ${config.className}
          `}
          >
            {config.label}
          </span>
        );
      },
    },

    {
      key: 'actions',
      label: 'Actions',

      headerClassName: 'w-[15%]',

      cellClassName: 'align-middle',

      render: (row: PendingActivityDto) => (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => console.log('Review', row.id)}
            className="
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-indigo-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition-colors
            hover:bg-indigo-700
          "
          >
            <Eye className="h-4 w-4" />
            Review
          </button>

          <button
            type="button"
            className="
            rounded-lg
            p-2
            text-slate-400
            transition-colors
            hover:bg-slate-100
            hover:text-slate-600
          "
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];
 return (
    <>
      <div className="mt-6">
        <HeroSection
          title="Pending Activities"
          tagline="Review and take action on activities that require your attention."
        />
        <SummaryCards loading={loading} counts={statusCards} />
      </div>

      <div className="mt-8 space-y-4">
        <ReusableTable
          tabs={tabs}
          item="Pending Activities"
          updateFilter={updateFilter}
          entities={activities}
          columns={pendingActivityColumns}
          filterOptions={[]}
          totalDocs={totalDocs}
          //  sortOption?: SortOption;
          //  setSortBy?: (option: string) => void;
          onResetfilter={onResetfilter}
          // counts={counts}
        />
        {/* <PendingFilters
          search={search}
          onSearch={setSearch}
          severity={severity}
          onSeverity={setSeverity}
          sort={sort}
          onSort={setSort}
        /> */}
      </div>

      {/* <div className="mt-6">
          <PendingActivityList loading={loading} items={filteredItems} />
        </div> */}
    </>
  );
}
