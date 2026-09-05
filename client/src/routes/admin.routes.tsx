import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../presentation/Layoutes/AdminLayout';
import PendingPage from '../presentation/pages/admin/PendingPage.tsx';
import Companies from '../presentation/pages/admin/Companies.tsx';
import Candidates from '../presentation/pages/admin/Candidates.tsx';
import Jobs from '../presentation/pages/admin/Jobs.tsx';
import Pendings from '../presentation/pages/admin/Pendings.tsx';
import CompanyDetails from '../presentation/pages/admin/CompanyDetails.tsx';
import CandidateDetails from '../presentation/pages/admin/CandidateDetails.tsx';
import AdminJobDetails from '../presentation/pages/admin/JobDetails.tsx';
import SkillsPage from '../presentation/pages/admin/Skills.tsx';
import ApplicationsPage from '../presentation/pages/admin/ApplicationsPage.tsx';
import AppDetailsPage from '../presentation/pages/admin/AppDetailsPage.tsx';
import InterviewsPage from '../presentation/pages/admin/InterviewsPage.tsx';
import PendingActivitiesContainer from '../presentation/components/admin/pending/Demo.tsx';

import { ADMIN_ROUTES } from './routes.ts';
import AdminDashboard from '../presentation/pages/admin/AdminDashboard.tsx';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path={ADMIN_ROUTES.COMPANIES} element={<Companies />} />
        <Route
          path={ADMIN_ROUTES.COMPANY_DETAILS}
          element={<CompanyDetails />}
        />
        <Route path={ADMIN_ROUTES.CANDIDATES} element={<Candidates />} />
        <Route path={ADMIN_ROUTES.JOBS} element={<Jobs />} />
       
        <Route
          path={ADMIN_ROUTES.CANDIDATE_DETAILS}
          element={<CandidateDetails />}
        />
        <Route path={ADMIN_ROUTES.JOB_DETAILS} element={<AdminJobDetails />} />
        <Route path={ADMIN_ROUTES.SKILLS} element={<SkillsPage />} />
        <Route path={ADMIN_ROUTES.PENDINGS} element={<PendingPage />} />
        <Route path={'/pend'} element={<PendingActivitiesContainer />} />
        <Route
          path={ADMIN_ROUTES.APPLICATIONS}
          element={<ApplicationsPage />}
        />
        <Route
          path={ADMIN_ROUTES.APPLICATION_DETAILS}
          element={<AppDetailsPage />}
        />
        <Route path={ADMIN_ROUTES.INTERVIEWS} element={<InterviewsPage />} />
      </Route>
    </Routes>
  );
};
