import { useState } from 'react';
import { forgotPasswordSchema } from '../../../libraries/validations/auth/forgot-password.validation';

import type { UserRole } from '../../../constants/types/user';
import { authService } from '../../../services/api-services/authServices';

import { useToast } from '../../../shared/toast/use-toast';

export const useForgotPassword = (role: UserRole) => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('from handle change from password forgot page');
    setEmail(e.target.value);
  };
  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = forgotPasswordSchema.safeParse({ email });

    if (!result.success) {
      const error = result.error.flatten().fieldErrors;

      setError(error.email?.[0] as string);
      setEmail('');
      return;
    }

    setError('');
    localStorage.setItem('reset_email', email);
    try {
      const data = await authService.formgotPasword(email, role);

      showToast({ msg: data.message, type: 'success' });
    } catch (error: any) {
      setError(error.response?.data.message || error.message);
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return { handleChange, email, submitHandle, error };
};
