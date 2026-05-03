import { Routes, Route } from 'react-router-dom';
import CompanyProfile from '../../presentation/pages/user/company/Profile';
import EmployerHome from '../../presentation/pages/user/employer/Home';
import CompanyRegistration from '../../presentation/pages/user/company/CompanyRegisterPage';
import { EmployerLayout } from '../../presentation/Layoutes/EmployerLayout';
import { JobCreate } from '../../presentation/pages/user/employer/JobCreate';
import Dashboard from '../../presentation/pages/admin/Dashboard';
import CompanyJobListing from '../../presentation/pages/user/company/CompanyJobListing';
import JobDetails from '../../presentation/pages/user/company/JobDetails';
import SkillPage from '../../presentation/pages/user/company/Skills';
import ApplicationsPage from '../../presentation/pages/user/company/ApplicationsPage';
import ApplicationDetailsPage from '../../presentation/pages/user/company/ApplicationDetails';
import ApplicationDetails from '../../AppDetails';
import InterviewsPage from '../../presentation/pages/user/company/InterviewsPage';
export const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployerHome />} />

      <Route path="/" element={<EmployerLayout />}>
        <Route path="/register" element={<CompanyRegistration />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<CompanyJobListing />} />
        <Route path="jobs/create" element={<JobCreate />} />
        <Route path="skills" element={<SkillPage />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="applicationss" element={<ApplicationDetails />} />
        <Route path="applications/:id" element={<ApplicationDetailsPage />} />
        <Route path="jobs/:jobId" element={<JobDetails />} />
        <Route path="interviews" element={<InterviewsPage />} />
        <Route path="profile" element={<CompanyProfile />} />
      </Route>
    </Routes>
  );
};
