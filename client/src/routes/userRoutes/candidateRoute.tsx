import { Route, Routes } from 'react-router-dom';
import CandidateProfile from '../../presentation/pages/user/candidate/CandidateProfile';
import { CandidateLayout } from '../../presentation/Layoutes/CandidateLayout';
export const CandidateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CandidateLayout />}>
        <Route path="" element={<CandidateProfile />} />
        <Route path="/dashboard" element={<CandidateProfile />} />
      </Route>
    </Routes>
  );
};
