import { useState } from 'react';
import { loginSchema } from '../../../libraries/validations/auth/loginValidation';
import axios from '../../../libraries/axios';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '../../../constants/types/user';
import { loginSuccess } from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';

import { type typeOfToast } from '../../../types/toastTypes';
type Errors = {
  email?: string;
  password?: string;
  server?: string;
};
export const useLogin = (
  role: UserRole,
  showToast: (toast: typeOfToast) => void
) => {
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('google login success ,login response ', tokenResponse);
      const token = tokenResponse.access_token;
      if (!token) {
        console.log('access token is not found');

        return;
      }
      try {
        let api = role === 'admin' ? '/auth/admin/google' : '/auth/google';
        let response = await axios.post(api, { token, role });
        console.log(response);
        const data = response.data.data;
        console.log('data', data);

        if (role == 'admin') {
          localStorage.setItem('user', data.admin);
          localStorage.setItem('accessToken', data.accessToken);
          dispatch(
            loginSuccess({ user: data.admin, accessToken: data.accessToken })
          );

          navigate('admin');
          showToast({ msg: response.data.message, type: 'success' });
        } else {
          localStorage.setItem('user', data.user);
          localStorage.setItem('accessToken', data.accessToken);
          dispatch(loginSuccess(data));
          showToast({ msg: response.data.message, type: 'success' });
         

          const path = location.state?.from ??'/';
          navigate(path);
        }
      } catch (error: any) {
        console.log(error);
        showToast({
          msg: error?.response?.data?.message || error.message,
          type: 'error',
        });

        return;
      }
    },
    onError: () => {
      console.log('google login failed');
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();

  const submitHandle = async (e: any) => {
    e.preventDefault();

    console.log('login formdata ', formData);
    const result = loginSchema.safeParse(formData);
    console.log('result', result);

    if (!result.success) {
      const error = result.error.flatten().fieldErrors;
      const formattedErrors: Errors = {
        email: error.email?.[0],
        password: error.password?.[0],
      };
      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    console.log('frontend validation success');

    try {
      const api = role === 'admin' ? '/auth/admin/login' : '/auth/login';
      const res = await axios.post(api, { ...formData, role });
      console.log('axios response ', res);

      setErrors({});
      const { access_Token, user, admin } = res.data.data;

      localStorage.setItem('accessToken', access_Token);
      if (user) {
        localStorage.setItem('user', user);
        dispatch(loginSuccess({ user, accessToken: access_Token }));
      } else if (admin) {
        localStorage.setItem('user', admin);
        dispatch(loginSuccess({ user: admin, accessToken: access_Token }));
      }

      showToast({ msg: res.data.message, type: 'success' });
      const redirectPath =
        role === 'admin' ? '/admin' : (location.state?.from ?? '/');
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      console.log('error from backend ', err);

      // console.log('message ',err.response.data.message);
      setFormData({ email: '', password: '' });
      // setErrors({ server: err.response?.data?.message || err.message });
      showToast({
        msg: err.response?.data?.message || err.message,
        type: 'error',
      });
      return;
    }
  };
  const handleForgotPassword = () => {
    console.log('from forgot password');
    navigate(`/forgot-password?role=${role}`);
  };

  return {
    handleChange,
    formData,
    submitHandle,
    errors,
    handleGoogleSignIn,
    handleForgotPassword,
    showPassword,
    setShowPassword,
  };
};
