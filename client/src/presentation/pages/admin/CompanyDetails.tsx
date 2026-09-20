import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LogoAndName from '../../components/admin/companyDetails/LogoAndName';
import type { CompanyProfileType } from '../../../types/dtos/profile-types/user.types';
import { Document, RegistrationDetails } from '../../components/admin/companyDetails/RegistrationDetails';
import AboutAndDocuments from '../../components/admin/companyDetails/AboutAndDocuments';
import ContactDetails from '../../components/admin/companyDetails/ContactDetails';
import { adminService } from '../../../services/api-services/adminService';
import Activity from '../../components/admin/companyDetails/Activity';
import { SocialLinks } from './SocialContacts';

export default function CompanyDetails() {
  const { companyId } = useParams();
  if (!companyId) return;
  const [company, setCompany] = useState<CompanyProfileType | null>(null);
  useEffect(() => {
    async function getCompany() {
      try {
        const data = await adminService.getCompany(companyId!!);
        console.log('data after fetching compant', data);

        setCompany(data.company);
      } catch (error) {}
    }
    getCompany();
  }, []);

  console.log('company id is', companyId);
  return (
  <div className="min-h-screen bg-slate-100 p-4 md:p-8">
    <div className="mx-auto max-w-7xl space-y-6">

      {/* Header */}
      <LogoAndName onUpdate={setCompany} company={company} />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          <AboutAndDocuments company={company} />
          
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          <ContactDetails company={company} />
          <SocialLinks socialLinks={company?.socialMediaLinks}/>

          {company?.isVerified && <Activity />}
            {/* {company?.reapplyDetails.length&& <RegistrationDetails company={company} />} */}
            <Document document={company?.document??null} />
        </div>
       
      </div>

      {/* FULL WIDTH REGISTRATION DETAILS */}
    

    </div>
  </div>
);
}
