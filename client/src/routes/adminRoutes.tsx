import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../presentation/Layoutes/AdminLayout';
import Dashboard from '../presentation/pages/admin/Dashboard.tsx';
import Companies from '../presentation/pages/admin/Companies.tsx';
import Candidates from '../presentation/pages/admin/Candidates.tsx';
import Jobs from '../presentation/pages/admin/Jobs.tsx';
import Pendings from '../presentation/pages/admin/Pendings.tsx';
import CompanyDetails from '../presentation/pages/admin/CompanyDetails.tsx';
import CandidateDetails from '../presentation/pages/admin/CandidateDetails.tsx';
export const AdminRoutes = () => {
  console.log('from amin route');

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/companies/:companyId" element={<CompanyDetails />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/pendings" element={<Pendings />} />
        <Route path="/candidates/:candidateId" element={<CandidateDetails />} />
      </Route>
    </Routes>
  );
};
