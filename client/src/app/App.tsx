import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../routes/auth.routes.tsx';
import { CandidateRoutes } from '../routes/user.routes/candidate.route.tsx';
import { AppRoutes } from '../routes/index.tsx';

function App() {
  return <AppRoutes />;
}

export default App;
