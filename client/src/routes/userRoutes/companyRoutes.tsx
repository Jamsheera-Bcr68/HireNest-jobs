import { Routes, Route } from 'react-router-dom';
import CompanyProfile from '../../presentation/pages/user/company/Profile';
import EmployerHome from '../../presentation/pages/user/employer/Home';
import CompanyRegistration from '../../presentation/pages/user/company/CompanyRegisterPage';
import { EmployerLayout } from '../../presentation/Layoutes/EmployerLayout';
import { JobCreate } from '../../presentation/pages/user/employer/JobCreate';
import Dashboard from '../../presentation/pages/admin/Dashboard';

export const CompanyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployerHome />} />

      <Route path="/" element={<EmployerLayout />}>
        <Route path="/register" element={<CompanyRegistration />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs/create" element={<JobCreate />} />
        <Route path="profile" element={<CompanyProfile />} />
      </Route>
    </Routes>
  );
};
