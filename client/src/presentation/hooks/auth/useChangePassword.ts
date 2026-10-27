import { useState } from 'react';
import { changePasswordSchema } from '../../../libraries/validations/auth/change-password.validator';
import axiosInstance from '../../../libraries/axios';
import { useToast } from '../../../shared/toast/use-toast';
import { authService } from '../../../services/api-services/authServices';

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
export const useChangePassword = (onClose: () => void) => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
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
        setLoading(true);
        const data = await authService.handleChangePassword(formData);

        setLoading(false);
        onClose();
        showToast({ msg: data.message, type: 'success' });
      } catch (error: any) {
        console.log(error);
        setLoading(false);
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
    handleSubmit,loading,
    error,
  };
};
