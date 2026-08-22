import SummaryCards from './SummaryCards';
import HeroSection from '../HeroSection';
import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { adminService } from '../../../../services/api-services/adminService';

export type CardType = {
  label: string;
  value: number;
  icon: LucideIcon;
  tint: string;
  desc: string;
};
export default function PendingActivitiesContainer() {
  const [loading, setLoading] = useState(false);
  const [statusCards, setStatusCards] = useState<CardType[]>([]);
  //   const [activeTab, setActiveTab] = useState("all");
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
      const [statusData] = await Promise.all([adminService.getPendingData()]);
      console.log(statusData);
      
    }
    getPendingData();
  }, []);

  return (
    <>
      <div className="mt-6">
        <HeroSection
          title="Pending Activities"
          tagline="Review and take action on activities that require your attention."
        />
        <SummaryCards loading={loading} counts={statusCards} />
      </div>

      {/* <div className="mt-8 space-y-4">
          <PendingTabs active={activeTab} onChange={setActiveTab} counts={counts} />
          <PendingFilters
            search={search}
            onSearch={setSearch}
            severity={severity}
            onSeverity={setSeverity}
            sort={sort}
            onSort={setSort}
          />
        </div> */}

      {/* <div className="mt-6">
          <PendingActivityList loading={loading} items={filteredItems} />
        </div> */}
    </>
  );
}
