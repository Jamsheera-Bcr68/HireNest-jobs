import { useState } from 'react';
import { resetPasswordSchema } from '../../../libraries/validations/auth/reset-password.validation';

import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../../shared/toast/use-toast';
import { useSearchParams } from 'react-router-dom';
import { authService } from '../../../services/api-services/authServices';

type Errors = {
  password?: string;
  confirm_password?: string;
  server?: string;
  resetToken?: string;
  email?: string;
};
export const useResetPassword = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetToken } = useParams();
  const role = searchParams.get('role');
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

    setError({});
    try {
      if (!resetToken) {
        setError({ server: 'Invalid Link' });
        return;
      }
      formData.resetToken = resetToken;
      formData.email = email;

      const data = await authService.resetPassword(formData);

      showToast({ msg: data.message, type: 'success' });
      setError({});
      navigate('/login');
    } catch (error: any) {
      let msg = error?.response?.data.message || error.message;
      setError({ server: msg });

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
    role,
  };
};
