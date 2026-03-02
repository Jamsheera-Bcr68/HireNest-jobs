import React, { useEffect, useState } from 'react';
import { profileService } from '../../../../../services/apiServices/candidateService';
import { addExperienceSchema } from '../../../../../libraries/validations/auth/candidate/experienceFormValidation';
import type { UserProfileType } from '../../../../../types/dtos/profileTypes/userTypes';

import type { ExperienceType } from '../../../../../types/dtos/profileTypes/experienceType';
import { useToast } from '../../../../../shared/toast/useToast';
import { type WorkMode } from '../../../../..//types/dtos/profileTypes/experienceType';

type FormError = {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  role?: string;
  discription?: string;
  other?: string;
};
export const useExperience = (
  open: boolean,
  onUserUpdate: (user: UserProfileType) => void,
  onClose: () => void,
  exp: ExperienceType | null,
  user?: UserProfileType
) => {
  const { showToast } = useToast();

  const [error, setError] = useState<FormError>({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',

    discription: '',
    other: '',
  });
  const defaultForm: ExperienceType = {
    title: '',
    company: '',
    mode: 'onsite',
    location: '',
    startDate: '',

    isWorking: false,
    description: '',
  };
  const [formData, setFormData] = useState<ExperienceType>(defaultForm);
  useEffect(() => {
    if (!open) return;

    if (exp) {
      setFormData({
        ...defaultForm,
        ...exp,
        startDate: exp.startDate ? exp.startDate.slice(0, 7) : '',
        endDate: exp.endDate ? exp.endDate.slice(0, 7) : '',
      });
      console.log(exp);
    } else {
      setFormData(defaultForm);
    }
  }, [exp, open]);
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      mode: e.target.value as WorkMode,
    }));
  };
  const handleSubmit = async () => {
    console.log('formdata is', formData);
    const result = addExperienceSchema.safeParse(formData);
    if (!result.success) {
      const formatedError = result.error.flatten().fieldErrors;
      console.log(formatedError);

      const error: FormError = {
        title: formatedError.title?.[0] || '',
        company: formatedError.company?.[0] || '',
        location: formatedError.location?.[0] || '',
        startDate: formatedError.startDate?.[0] || '',
        endDate: formatedError.endDate?.[0] || '',

        discription: formatedError.description?.[0] || '',
      };

      setError(error);
      return;
    }
    console.log('validation success');
    setError({});
    //send to backend
    try {
      if (formData.isWorking) formData.endDate = '';
      const data = await profileService.addExperience(formData);
      console.log('user after adding experience', data);
      showToast({ msg: data.message, type: 'success' });
      onUserUpdate(data.user);
      onClose();
      setFormData({
        title: '',
        company: '',
        mode: 'onsite',
        location: '',
        startDate: '',

        isWorking: false,
        description: '',
      });
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const handleEdit = async () => {
    console.log('edit form data', formData);

    const result = addExperienceSchema.safeParse(formData);
    if (!result.success) {
      const formatedError = result.error.flatten().fieldErrors;
      console.log(formatedError);

      const error: FormError = {
        title: formatedError.title?.[0] || '',
        company: formatedError.company?.[0] || '',
        location: formatedError.location?.[0] || '',
        startDate: formatedError.startDate?.[0] || '',
        endDate: formatedError.endDate?.[0] || '',

        discription: formatedError.description?.[0] || '',
      };

      setError(error);
      return;
    }
    console.log('validation success');
    try {
      if (!exp || !exp.id) {
        showToast({ msg: 'Experience id is not found', type: 'error' });
        return;
      }

      if (formData.isWorking) formData.endDate = '';
      const data = await profileService.editExperience(formData, exp.id);
      console.log('user after adding experience', data);
      showToast({ msg: data.message, type: 'success' });
      onUserUpdate(data.user);
      onClose();
      setFormData({
        title: '',
        company: '',
        mode: 'onsite',
        location: '',
        startDate: '',

        isWorking: false,
        description: '',
      });
    } catch (error: any) {
      console.log(error);
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return {
    error,
    formData,
    handleChange,
    handleTextareaChange,
    handleSubmit,
    handleModeChange,
    handleEdit,
    setFormData,
  };
};
