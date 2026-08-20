import { useState } from 'react';
import { loginSchema } from '../../../libraries/validations/auth/login.validation';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '../../../constants/types/user';
import { loginSuccess } from '../../../redux/slices/auth.slice';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useLocation } from 'react-router-dom';

import { authService } from '../../../services/api-services/authServices';

type Errors = {
  email?: string;
  password?: string;
  server?: string;
};
export const useLogin = (role: UserRole) => {
  // const { showToast } = useToast();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      if (!token) {
        return;
      }
      try {
        let resData = await authService.googleSignIn(token, role);
        const data = resData.data;
      //  console.log('data', data);

        if (role == 'admin') {
          localStorage.setItem('user', data.admin);
          localStorage.setItem('accessToken', data.accessToken);
          dispatch(
            loginSuccess({ user: data.admin, accessToken: data.accessToken })
          );

          navigate('admin');
        } else {
          localStorage.setItem('user', data.user);
          localStorage.setItem('accessToken', data.accessToken);
          dispatch(loginSuccess(data));

          const path = location.state?.from ?? '/';
          navigate(path);
        }
      } catch (error: any) {}
    },
    onError: () => {
    //  console.log('google login failed');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();

  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginSchema.safeParse(formData);

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
  //  console.log('frontend validation success');

    try {
      const data = await authService.googleSingnupSubmit(formData, role);


      setErrors({});
      const { access_Token, user, admin } = data.data;
console.log('login user',user);
      localStorage.setItem('accessToken', access_Token);
      if (user) {
        localStorage.setItem('user', user);
        dispatch(loginSuccess({ user, accessToken: access_Token }));
      } else if (admin) {
        localStorage.setItem('user', admin);
        dispatch(loginSuccess({ user: admin, accessToken: access_Token }));
      }

      const redirectPath =
        role === 'admin' ? '/admin' : (location.state?.from ?? '/');
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setFormData({ email: '', password: '' });

      return;
    }
  };

  const handleForgotPassword = () => {
    //console.log('from forgot password');
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
