import { useState } from 'react';
import { registerSchema } from '../../../libraries/validations/auth/register.validations';

import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../shared/toast/use-toast';
import { authService } from '../../../services/api-services/authServices';

type FormErrors = {
  email?: string;
  password?: string;
  phone?: string;
  confirm_password?: string;
  server?: string;
};
type FormData = {
  email: string;
  password: string;
  confirm_password: string;
  phone: string;
};

export const useRegister = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
  });
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [succesMsg, setMsg] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandle = async (
    //e: React.SyntheticEvent<HTMLButtonElement>
    e:React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      const formattedErrors: FormErrors = {
        email: fieldErrors?.email?.[0],
        password: fieldErrors.password?.[0],
        confirm_password: fieldErrors.confirm_password?.[0],
        phone: fieldErrors.phone?.[0],
      };
      setErrors(formattedErrors);
      return;
    }
    setErrors({});

    try {
      const data = await authService.registerUser(formData);

      setMsg(data.message);

      sessionStorage.setItem('otp_email', formData.email);

      sessionStorage.setItem('otp_expiredAt', data.otp_expiry);
      showToast({ msg: data.message, type: 'success' });
      navigate('/otp');
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
      return;
    }
  };
  return {
    formData,
    succesMsg,
    errors,
    handleChange,
    submitHandle,
    showPassword,
    setShowPassword,
  };
};
