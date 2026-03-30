import { Route, Routes } from 'react-router-dom';
import CandidateProfile from '../../presentation/pages/user/candidate/CandidateProfile';
import { CandidateLayout } from '../../presentation/Layoutes/CandidateLayout';
import SavedJobs from '../../presentation/pages/user/candidate/SavedJobs';
export const CandidateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CandidateLayout />}>
        <Route path="/profile" element={<CandidateProfile />} />
        <Route path="/dashboard" element={<CandidateProfile />} />
        <Route path="/jobs" element={<SavedJobs />} />
      </Route>
    </Routes>
  );
};
