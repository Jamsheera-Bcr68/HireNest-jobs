import HeroSection from '../../components/admin/HeroSection';
import { useState, useEffect } from 'react';

import { useToast } from '../../../shared/toast/useToast';
import { type CompanyProfileType } from '../../../types/dtos/profileTypes/userTypes';
import Table from './Table';
import { companyService } from '../../../services/apiServices/companyService';
const companyStatus = [
  {
    label: 'Total Employers',
    value: '1,284',
    //change: '+8.2%',
    up: true,
    icon: '🏢',
  },
  // {
  //   label: 'Active This Month',
  //   value: '943',
  //  // change: '+5.1%',
  //   up: true,
  //   icon: '✅',
  // },
  {
    label: 'Pending Approval',
    value: '37',
    //change: '+12',
    up: false,
    icon: '⏳',
  },
  { label: 'Suspended', value: '21', change: '-3', up: true, icon: '🚫' },
];

function Companies() {
  const { showToast } = useToast();
  const [companies, setCompanies] = useState<CompanyProfileType[] | []>([]);
  useEffect(() => {
    async function getCompanies() {
      try {
        const data = await companyService.getAllCompanies('all');
        console.log('after getting all companies', data);
        setCompanies(data.companies);
      } catch (error: any) {
        console.log(error);
        showToast({
          msg: error?.response?.data.message || error.message,
          type: 'error',
        });
      }
    }
    getCompanies();
  }, []);
  return (
    <div>
      <div className="min-h-screen w-full bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroSection
            title="Company Management"
            tagline=" Manage all registered employers on the platform"
            buttonText="  Add Employer"
          />

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <Table companies={companies} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Companies;
