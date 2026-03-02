import { useState } from 'react';
import { changePasswordSchema } from '../../../libraries/validations/auth/changePasswordValidator';
import axiosInstance from '../../../libraries/axios';
import type { typeOfToast } from '../../../types/toastTypes';

type FormDataType = {
  current_password: string;
  password: string;
  confirm_password: string;
};

type Errors = {
  current_password: string | undefined;
  password: string | undefined;
  confirm_password: string | undefined;
};
export const useChangePassword = (
  showToast: (toast: typeOfToast) => void,
  onClose: () => void
) => {
  const [show, setShow] = useState(false);
  const [error, setErrors] = useState<Errors>({
    password: '',
    confirm_password: '',
    current_password: '',
  });
  const [formData, setFormData] = useState<FormDataType>({
    current_password: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const { name, value } = e.currentTarget;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    console.log('on handle submit');
    let result = changePasswordSchema.safeParse(formData);
    console.log('form data is ', formData);

    if (result.success) {
      setErrors({ confirm_password: '', current_password: '', password: '' });

      try {
        const response = await axiosInstance.post(
          '/auth/changePassword',
          formData
        );
        console.log('response', response);
        showToast({ msg: response.data.message, type: 'success' });
        onClose();
      } catch (error: any) {
        console.log(error);

        showToast({
          msg: error?.response?.data?.message || error.message,
          type: 'error',
        });
        return;
      }
    } else {
      const errors = result.error.flatten().fieldErrors;
      const formattedErrors: Errors = {
        current_password: errors.current_password?.[0],
        confirm_password: errors.confirm_password?.[0],
        password: errors.password?.[0],
      };
      setErrors(formattedErrors);
      return;
    }
  };
  return {
    formData,
    handleChange,
    show,
    setShow,
    handleSubmit,
    error,
  };
};
