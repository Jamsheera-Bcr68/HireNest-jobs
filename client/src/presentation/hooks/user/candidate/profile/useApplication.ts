import { useSelector } from 'react-redux';
import type { StateType } from '../../../../../constants/types/user';
import { useToast } from '../../../../../shared/toast/useToast';
import { useNavigate, useLocation } from 'react-router-dom';
import { candidateService } from '../../../../../services/apiServices/candidateService';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../../redux/authSlice';

export const useApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();

  const user = useSelector((state: StateType) => state.auth.user);
  const handleApplyClick = async (applyJobId: string) => {
    if (!user) {
      console.log('location.pathname is', location.pathname);

      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (user.role !== 'candidate') {
      showToast({ msg: 'You are not allowed to apply job', type: 'error' });
      return;
    }
    if (user.isProfileCompleted == false) {
      showToast({ msg: 'Please complete your profile', type: 'error' });
      return;
    }
    if (!applyJobId) {
      showToast({ msg: 'Job id is not found', type: 'error' });
      return;
    }
    try {
      const data = await candidateService.applyJob(applyJobId);
      showToast({ msg: data.message, type: 'success' });
      console.log('data after jobapply', data);
      const jobId = data.jobId;
      dispatch(
        updateUser({
          appliedJobs: data.appliedJobs || [...user.appliedJobs, jobId],
        })
      );
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return {
    handleApplyClick,
  };
};
