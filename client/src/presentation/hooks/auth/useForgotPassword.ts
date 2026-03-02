import { useState } from 'react';
import { forgotPasswordSchema } from '../../../libraries/validations/auth/forgotPasswordValidation';
import axiosInstance from '../../../libraries/axios';
import type { UserRole } from '../../../constants/types/user';
import { type typeOfToast } from '../../../types/toastTypes';

export const useForgotPassword = (
  role: UserRole,
  showToast: (toast: typeOfToast) => void
) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('from handle change from password forgot page');
    setEmail(e.target.value);
  };
  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('forgot form submitted');
    console.log('email is ', email);

    const result = forgotPasswordSchema.safeParse({ email });
    console.log('result', result);

    if (!result.success) {
      const error = result.error.flatten().fieldErrors;

      console.log('forrmatted errors ', { error });
      setError(error.email?.[0] as string);
      setEmail('');
      return;
    }
    console.log('front end validation successfule');

    setError('');
    localStorage.setItem('reset_email', email);
    try {
      const response = await axiosInstance.post('/auth/forgot-password', {
        email: email,
        role: role,
      });
      console.log('response from the backend', response);
      showToast({ msg: response.data.message, type: 'success' });
    } catch (error: any) {
      setError(error.response.message || error.message);
      showToast({
        msg: error.response.message || error.message,
        type: 'error',
      });
    }
  };
  return { handleChange, email, submitHandle, error };
};
