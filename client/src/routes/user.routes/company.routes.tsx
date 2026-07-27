import { Routes, Route } from 'react-router-dom';
import CompanyProfile from '../../presentation/pages/user/company/Profile';
import EmployerHome from '../../presentation/pages/user/employer/Home';
import CompanyRegistration from '../../presentation/pages/user/company/CompanyRegisterPage';
import { EmployerLayout } from '../../presentation/Layoutes/EmployerLayout';
import { JobCreate } from '../../presentation/pages/user/employer/JobCreate';
import Dashboard from '../../presentation/pages/admin/Dashboard';
import MeetPage from '../../presentation/pages/user/MeetPage';
import CompanyJobListing from '../../presentation/pages/user/company/CompanyJobListing';
import JobDetails from '../../presentation/pages/user/company/JobDetails';
import SkillPage from '../../presentation/pages/user/company/Skills';
import ApplicationsPage from '../../presentation/pages/user/company/ApplicationsPage';
import ApplicationDetailsPage from '../../presentation/pages/user/company/ApplicationDetails';
import { COMPANY_ROUTES } from '../routes';
import { ChatPage } from '../../presentation/pages/user/Chatpage';
import CompanyDashboardPage from '../../presentation/pages/user/company/CompanyDashboardPage';
import HireNestDashboard from '../../presentation/components/user/employer/dashboard/Sample';

import InterviewsPage from '../../presentation/pages/user/company/InterviewsPage';
export const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path={COMPANY_ROUTES.HOME} element={<EmployerHome />} />

      <Route path="/" element={<EmployerLayout />}>
        <Route path={COMPANY_ROUTES.REGISTER} element={<CompanyRegistration />} />
        <Route path={COMPANY_ROUTES.DASHBOARD}element={<CompanyDashboardPage />} />
        <Route path={'dash'}element={<HireNestDashboard />} />
        <Route path={COMPANY_ROUTES.JOBS}element={<CompanyJobListing />} />
        <Route path={COMPANY_ROUTES.CREATE_JOB} element={<JobCreate />} />
        <Route path={COMPANY_ROUTES.SKILLS}element={<SkillPage />} />
        <Route path={COMPANY_ROUTES.APPLICATIONS} element={<ApplicationsPage />} />

        <Route path={COMPANY_ROUTES.APPLICATION_DETAILS} element={<ApplicationDetailsPage />} />
        <Route path={COMPANY_ROUTES.JOB_DETAILS}element={<JobDetails />} />
        <Route path={COMPANY_ROUTES.INTERVIEWS} element={<InterviewsPage />} />
        <Route path={COMPANY_ROUTES.PROFILE}element={<CompanyProfile />} />
        <Route path={COMPANY_ROUTES.MESSAGES}element={<ChatPage />} />
        <Route path={COMPANY_ROUTES.MEET}element={<MeetPage />} />

      </Route>
    </Routes>
  );
};
