import { useSelector } from 'react-redux';
import type { StateType } from '../../../../../constants/types/user';
import { useToast } from '../../../../../shared/toast/useToast';
import { useNavigate, useLocation } from 'react-router-dom';

export const useApplications = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();
  const user = useSelector((state: StateType) => state.auth.user);
  const handleApplyClick = () => {
    if (!user || user.role !== 'candidate') {
      console.log('location.pathname is', location.pathname);

      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (user.isProfileCompleted == false) {
      showToast({ msg: 'Please complete your profile', type: 'error' });
      return;
    }
  };
  return {
    handleApplyClick,
  };
};
