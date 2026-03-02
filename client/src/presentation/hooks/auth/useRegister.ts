import { useState } from 'react';
import { registerSchema } from '../../../libraries/validations/auth/registerValidations';
import axios from '../../../libraries/axios';
import { useNavigate } from 'react-router-dom';
import { type typeOfToast } from '../../../types/toastTypes';

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

export const useRegister = (showToast: (toast: typeOfToast) => void) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [succesMsg, setMsg] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandle = async (
    e: React.SyntheticEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log('formData', formData);
    const result = registerSchema.safeParse(formData);
    console.log('result', result);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.log('fieldErrors', fieldErrors);

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
    console.log('validation successful');

    try {
      const response = await axios.post('/auth/register', formData);
      console.log('response', response);
      setMsg(response.data.message);

      sessionStorage.setItem('otp_email', formData.email);
      console.log(
        'expirey from useRegister before setting ',
        response.data.otp_expiry
      );

      sessionStorage.setItem('otp_expiredAt', response.data.otp_expiry);
      showToast({ msg: response.data.message, type: 'success' });
      navigate('/otp');
    } catch (error: any) {
      console.log('error response', error.response);

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
