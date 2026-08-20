import { useEffect, useState } from 'react';
import BasicPart from './BasicPart';
import { type CompanyProfileType } from '../../../../../types/dtos/profile-types/user.types';
import { companyService } from '../../../../../services/api-services/companyService';
import { useToast } from '../../../../../shared/toast/use-toast';
import { AboutCompany } from './AboutCompany';
import { MissionVision } from './MissionAndVision';
import { CompanyStatistics } from './Statistics';
import { CultureSection } from './Culture';

import { ContactLinks } from './Contact';
type TabType={label:string,value:number}

function ProfileLayout() {
  const { showToast } = useToast();
  const [company, setCompany] = useState<CompanyProfileType | null>(null);
const [stats,setStats]=useState<TabType[]>([])




  useEffect(() => {
    async function getCompany() {
      try {
        const data = await companyService.getCompany();
        console.log('company from profile', data.company);
const fetchedCompany=data.company
        setCompany(fetchedCompany);
        setStats([
          {label:'Jobs',value:fetchedCompany?.totalJobs??0},
          {label:'Applications',value:fetchedCompany?.totalApps??0},
          {label:'Interviews',value:fetchedCompany?.totalInterviews??0},
          {label:'Hired',value:fetchedCompany?.hiredCount??0},
        ])
        console.log('after getting company', data);
        
      } catch (error: any) {
        console.log(error);
        showToast({
          msg: error?.response?.data?.message || error.message,
          type: 'error',
        });
      }
    }
    getCompany();
  }, []);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-4rem)]">
        <div className="h-fit lg:sticky top-0 lg:top-6">
          <BasicPart company={company} onUpdate={setCompany} />
        </div>
        <div className="lg:col-span-2 lg:overflow-y-auto space-y-6 pr-2">
          <CompanyStatistics company={company} stats={stats}  />
          <ContactLinks company={company} onUpdate={setCompany} />
          <AboutCompany company={company} onUpdate={setCompany} />{' '}
          <MissionVision company={company} onUpdate={setCompany} />
          <CultureSection company={company} onUpdate={setCompany} />
          {/* <BenefitsPerks company={company}/> */}
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
