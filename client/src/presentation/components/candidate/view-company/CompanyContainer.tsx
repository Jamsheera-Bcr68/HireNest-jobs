import { useParams, useSearchParams } from 'react-router-dom';
import { useTheme } from '../../../../contexts/ThemeContext';
import Header from '../../common/home/Header';
import { useEffect, useState } from 'react';
import type { CompanyProfileType } from '../../../../types/dtos/profile-types/user.types';
import { companyService } from '../../../../services/api-services/companyService';
import { candidateService } from '../../../../services/api-services/candidateService';
import { ErrorPlaceHolder, LoadingPlaceHolder } from './StateView';
import { Main } from './Main';
import {type JobCardDto } from '../../../../types/dtos/job.dto';

function CompanyContainer() {
  const { t } = useTheme();
  const { companyId } = useParams();
  console.log('company id frm company contatiner', companyId);
  const [company, setCompany] = useState<CompanyProfileType | null>(null);
  const [view, setView] = useState<'loading' | 'loaded' | 'error'>('loaded');
  const [openPositions, setOpenPositions] = useState<JobCardDto[]>([]);

  useEffect(() => {
    const fetchCompany = async () => {
      setView('loading');
      try {
        if (!companyId) return;
        const data = await candidateService.getCompanyDetails(companyId!);
        console.log('data after fetching company', data);
        setCompany(data.companyData);
        const openPositionsData =
          await companyService.getOpenPositions(companyId);

        setOpenPositions(openPositionsData.jobs);
      } catch (error) {
        setView('error');
        console.log(error);
      } finally {
        setView('loaded');
      }
    };
    fetchCompany();
  }, [companyId]);

  return (
    <div
      className={`min-h-screen ${t.pageBg} ${t.pageText} transition-colors duration-300`}
    >
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {view === 'loading' ? (
          <LoadingPlaceHolder />
        ) : view === 'error' ? (
          <ErrorPlaceHolder />
        ) : (
          <Main company={company} positions={openPositions} />
        )}
      </div>
    </div>
  );
}

export default CompanyContainer;
