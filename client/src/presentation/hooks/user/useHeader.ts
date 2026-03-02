import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/authSlice';
import axiosInstance from '../../../libraries/axios';
import { useToast } from '../../../shared/toast/useToast';
import { useSelector } from 'react-redux';
import type { StateType } from '../../../constants/types/user';

export const useHeader = () => {
  const { showToast } = useToast();
  const { user } = useSelector((state: StateType) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleLogout = async () => {
    console.log('form logout function');
    try {
      const response = await axiosInstance.post(
        '/auth/logout',
        {},
        { withCredentials: true }
      );
      console.log(response);

      showToast({ msg: response.data.message, type: 'success' });
      dispatch(logout());
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return {
    isMenuOpen,
    setIsMenuOpen,
    HandleLogout,
    user,
  };
};
