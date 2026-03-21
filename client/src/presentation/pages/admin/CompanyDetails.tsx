import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LogoAndName from '../../components/admin/companyDetails/LogoAndName';
import type { CompanyProfileType } from '../../../types/dtos/profileTypes/userTypes';

import AboutAndDocuments from '../../components/admin/companyDetails/AboutAndDocuments';
import ContactDetails from '../../components/admin/companyDetails/ContactDetails';
import { adminService } from '../../../services/apiServices/adminService';
import Activity from '../../components/admin/companyDetails/Activity';

export default function CompanyDetails() {
  const { companyId } = useParams();
  if (!companyId) return;
  const [company, setCompany] = useState<CompanyProfileType | null>(null);
  useEffect(() => {
    async function getCompany() {
      const data = await adminService.getCompany(companyId!!);
      console.log('data after fetching compant', data);

      setCompany(data.company);
    }
    getCompany();
  }, []);

  console.log('company id is', companyId);
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <LogoAndName onUpdate={setCompany} company={company} />

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SECTION */}
          <AboutAndDocuments company={company} />

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            {/* Contact Info */}
            <ContactDetails company={company} />
            {/* Admin Insights */}
            {company?.isVerified && <Activity />}
          </div>
        </div>
      </div>
    </div>
  );
}
