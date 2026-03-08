import { Routes, Route } from 'react-router-dom';
import CompanyProfile from '../../presentation/pages/user/company/Profile';
import EmployerHome from '../../presentation/pages/user/employer/Home';
import { DashBoard } from '../../presentation/pages/user/employer/Dashboard';
import { EmployerLayout } from '../../presentation/Layoutes/EmployerLayout';
import { JobCreate } from '../../presentation/pages/user/employer/JobCreate';

export const EmployerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployerHome />} />

      <Route path="/" element={<EmployerLayout />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="jobs/create" element={<JobCreate />} />
        <Route path="profile" element={<CompanyProfile />} />
      </Route>
    </Routes>
  );
};
