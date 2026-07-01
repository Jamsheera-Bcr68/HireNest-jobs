import { Route, Routes } from 'react-router-dom';
import CandidateProfile from '../../presentation/pages/user/candidate/CandidateProfile';
import { CandidateLayout } from '../../presentation/Layoutes/CandidateLayout';
import SavedJobs from '../../presentation/pages/user/candidate/SavedJobs';
import ApplicationsPage from '../../presentation/pages/user/candidate/ApplicationsPage';
import ApplicationDetailsPage from '../../presentation/pages/user/candidate/ApplicationDetailsPage';
import InterviewsPage from '../../presentation/pages/user/candidate/InterviewsPage';
import { ChatPage } from '../../presentation/pages/user/Chatpage';
import { CANDIDATE_ROUTES } from '../routes';
import Chat from '../../presentation/pages/user/Chat';

export const CandidateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CandidateLayout />}>
        <Route path={CANDIDATE_ROUTES.PROFILE} element={<CandidateProfile />} />
        <Route
          path={CANDIDATE_ROUTES.DASHBOARD}
          element={<CandidateProfile />}
        />
        <Route path={CANDIDATE_ROUTES.JOBS} element={<SavedJobs />} />
        <Route
          path={CANDIDATE_ROUTES.INTERVIEWS}
          element={<InterviewsPage />}
        />
        <Route
          path={CANDIDATE_ROUTES.APPLICATION_DETAILS}
          element={<ApplicationDetailsPage />}
        />
        <Route
          path={CANDIDATE_ROUTES.APPLICATIONS}
          element={<ApplicationsPage />}
        />
        <Route path={CANDIDATE_ROUTES.MESSAGES} element={<ChatPage />} />
        <Route path={'/messagess'} element={<Chat />} />
      </Route>
    </Routes>
  );
};
