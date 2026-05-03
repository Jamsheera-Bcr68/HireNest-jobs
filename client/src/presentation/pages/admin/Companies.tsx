import HeroSection from '../../components/admin/HeroSection';
import { useState, useEffect } from 'react';
import StatusCards from '../../components/admin/StatusCards';
import { useToast } from '../../../shared/toast/useToast';
import { type CompanyProfileType } from '../../../types/dtos/profileTypes/userTypes';
import Table from '../../components/admin/companyDetails/Table';
import Pagination from '../../components/common/Pagination';
import { adminService } from '../../../services/apiServices/adminService';
import AddReasonModal from '../../components/admin/jobs/AddReasonModal';

export type StatusCardType = {
  label: string;
  count: string;
  icon: string;
};
export type CompanyFilter = {
  status?: string;
  industry?: string;
  search?: string;
};

function Companies() {
  const { showToast } = useToast();
  const [companies, setCompanies] = useState<CompanyProfileType[]>([]);
  const [page, setPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [filter, setFilter] = useState<Partial<CompanyFilter>>({});
  useEffect(() => {
    async function getCompanies() {
      try {
        const data = await adminService.getAllCompanies(
          {
            ...filter,
          },
          page,
          10
        );
        // console.log('after getting all companies', data);
        const { totalDocs, totalPages } = data;
        setTotalDocs(totalDocs);
        setTotalPages(totalPages);
        setCompanies(data.companies);
      } catch (error: any) {
        // console.log(error);
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    getCompanies();
  }, [filter, page]);

  const handleFilterChange = (newFilter: Partial<CompanyFilter>) => {
    setFilter((prev) => ({ ...prev, ...newFilter }));
  };

  const handleCompanyUpdate = (updatedCompany: CompanyProfileType) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === updatedCompany.id ? updatedCompany : company
      )
    );
  };

  const [stats, setStatus] = useState<StatusCardType[]>([]);

  useEffect(() => {
    async function getCompanyStatus() {
      const data = await adminService.getCompanyStatus();
      const statsData = data.companyStatus;

      const total: StatusCardType = {
        label: 'Total Employees',
        count: statsData.totalCompany || 0,
        icon: '🏢',
      };
      const active: StatusCardType = {
        label: 'Active Employees',
        count: statsData.active || 0,
        icon: '✅',
      };
      const pending: StatusCardType = {
        label: 'Pending Approval',
        count: statsData.pending || 0,
        icon: '⏳',
      };
      const suspended: StatusCardType = {
        label: 'Suspended',
        count: statsData.suspended || 0,
        icon: '🚫',
      };
      // console.log('statsData', statsData);
      setStatus([total, active, pending, suspended]);
    }
    getCompanyStatus();
  }, [companies]);

  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroSection
            title="Company Management"
            tagline=" Manage all registered Companies on the platform"
          />
          <StatusCards stats={stats} />
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <Table
              companies={companies}
              onUpdate={handleCompanyUpdate}
              updateFilter={handleFilterChange}
            />
          </div>
          <Pagination
            onPageChange={setPage}
            currentPage={page}
            totalPages={totalPages}
            count={companies.length}
            item={'Companies'}
            totalItem={totalDocs}
          />
        </div>
      </div>
    </div>
  );
}

export default Companies;
