import { useState } from 'react';
import { resetPasswordSchema } from '../../../libraries/validations/auth/resetPasswordValidation';
import axiosInstance from '../../../libraries/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { type typeOfToast } from '../../../types/toastTypes';

type Errors = {
  password?: string;
  confirm_password?: string;
  server?: string;
  resetToken?: string;
  email?: string;
};
export const useResetPassword = (showToast: (toast: typeOfToast) => void) => {
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
    resetToken: '',
    email: '',
  });
  const [error, setError] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('form data ', formData);

    const email = localStorage.getItem('reset_email');

    if (!email) {
      setError({ email: 'Email is not found ' });

      return;
    }
    const result = resetPasswordSchema.safeParse(formData);
    if (!result.success) {
      const error = result.error.flatten().fieldErrors;
      const formError: Errors = {
        password: error.password?.[0],
        confirm_password: error.confirm_password?.[0],
        server: '',
      };
      setError(formError);
      return;
    }
    console.log('front end validation is success full');

    setError({});
    try {
      if (!resetToken) {
        setError({ server: 'Invalid Link' });
        return;
      }
      formData.resetToken = resetToken;
      formData.email = email;
      const resposnse = await axiosInstance.post(
        '/auth/reset-password',
        formData
      );
      console.log(resposnse);
      showToast({ msg: resposnse.data.message, type: 'success' });
      setError({});
      navigate('/login');
    } catch (error: any) {
      console.log(error);

      let msg = error.response.data.message || error.message;
      setError({ server: msg });
      showToast({ msg: msg, type: 'error' });
      return;
    }
  };
  return {
    formData,
    handleChange,
    error,
    submitHandle,
    showPassword,
    setShowPassword,
  };
};
