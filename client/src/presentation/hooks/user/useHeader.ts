import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/auth.slice';
import {type RootState } from '../../../redux/store';
import { useToast } from '../../../shared/toast/use-toast';
import { useSelector } from 'react-redux';

import { authService } from '../../../services/api-services/authServices';

export const useHeader = () => {
  const { showToast } = useToast();
  const { user ,accessToken} = useSelector((state: RootState) => state.auth);
  console.log('accesstoken',accessToken);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleLogout = async () => {
    console.log('form logout function');
    try {
      const data = await authService.logout();

      showToast({ msg: data.message, type: 'success' });
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
