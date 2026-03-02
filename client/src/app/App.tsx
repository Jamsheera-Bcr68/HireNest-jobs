import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from '../routes/authRoutes.tsx';
import { CandidateRoutes } from '../routes/userRoutes/candidateRoute.tsx';
import { AppRoutes } from '../routes/index.tsx';

function App() {
  return <AppRoutes />;
}

export default App;
