import {
  type EducationStatus,
  type EducationLevel,
  EDUCATION_STATUS,
  type EducationType,
} from '../../../../../types/dtos/profileTypes/educationTypes';
import { educationSchema } from '../../../../../libraries/validations/auth/candidate/educationFormValidation';
import React, { useEffect, useState } from 'react';
import { useToast } from '../../../../../shared/toast/useToast';
import { profileService } from '../../../../../services/apiServices/candidateService';
import type { UserProfileType } from '../../../../../types/dtos/profileTypes/userTypes';

type FormData = {
  level: EducationLevel | '';
  institution: string;
  status: EducationStatus | '';
  startYear: string | '';
  completedYear?: string | '';
  university: string;
  location: string;
  cgpa: string | '';
};
type FormError = {
  level: string;
  institution: string;
  status: string;
  startYear: string;
  completedYear: string;
  university: string;
  location: string;
  cgpa: string;
};
const initialData: FormData = {
  level: '',
  institution: '',
  status: '',
  startYear: '',
  completedYear: '',
  university: '',
  location: '',
  cgpa: '',
};
const initialError: FormError = {
  level: '',
  institution: '',
  status: '',
  startYear: '',
  completedYear: '',
  university: '',
  location: '',
  cgpa: '',
};
export const useEducation = (
  onUpdateUser: (updated: UserProfileType) => void,
  onClose: () => void,
  editEdu: EducationType | null
) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialData);
  const [error, setError] = useState<FormError>(initialError);
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { value, name } = e.currentTarget;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (editEdu) {
      setFormData(mapToFormdata(editEdu));
    }
  }, [editEdu]);
  const mapToFormdata = (edu: EducationType): FormData => {
    return {
      level: editEdu?.level || '',
      institution: edu.institution || '',
      status: edu.status || '',
      startYear: edu.startYear.toString() || '',
      completedYear:
        edu.status === 'Ongoing' ? '' : edu.completedYear.toString() || '',
      university: edu.university || '',
      location: edu.location || '',
      cgpa: edu.cgpa.toString() || '',
    };
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('fom data is ', formData);

    const result = educationSchema.safeParse(formData);
    if (!result.success) {
      const formatedError = result.error.flatten().fieldErrors;
      const err: FormError = {
        level: formatedError.level?.[0] || '',
        institution: formatedError.institution?.[0] || '',
        status: formatedError.status?.[0] || '',
        startYear: formatedError.startYear?.[0] || '',
        completedYear: formatedError.completedYear?.[0] || '',
        university: formatedError.university?.[0] || '',
        location: formatedError.location?.[0] || '',
        cgpa: formatedError.cgpa?.[0] || '',
      };
      console.log('result.data ', result.data);

      setError(err);
      return;
    }
    setError(initialError);
    console.log('validation success');
    try {
      const data = editEdu
        ? await profileService.editEducation(result.data, editEdu.id)
        : await profileService.addEducation(result.data);
      if (editEdu) console.log('after editing, result', data);
      else console.log('after adding, result', data);

      onUpdateUser(data.user);
      showToast({ msg: data?.message, type: 'success' });
      setFormData(initialData);
      onClose();
    } catch (error: any) {
      console.log(error);

      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  return {
    error,
    handleChange,
    formData,
    handleSubmit,
  };
};
