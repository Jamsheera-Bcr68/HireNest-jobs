import React, { useState } from 'react';
import { type SkillType } from '../../../../types/dtos/skillTypes';
import { jobPostSchema } from '../../../../libraries/validations/company/jobFormValidation';
import { useToast } from '../../../../shared/toast/useToast';
import { jobService } from '../../../../services/apiServices/jobService';
import { useNavigate } from 'react-router-dom';

type FormType = {
  title: string;
  mode: string;
  jobType: string;
  vacancyCount: number;
  experience: string;
  state: string;
  country: string;
  min_salary: string;
  max_salary: string;
  lastDate: string;
  languages?: string;
  education: string;
  responsibilities: string[] | [];
  skills: SkillType[] | [];
  description: string;
};
type ErrorType = {
  title: string;

  mode: string;
  jobType: string;
  vacancyCount: string;
  experience: string;
  state: string;
  country: string;
  min_salary: string;
  max_salary: string;
  lastDate: string;
  languages: string;
  education: string;
  responsibilities?: string;
  skills: string;
  description: string;
};
const initalError: ErrorType = {
  title: '',

  mode: '',
  jobType: '',
  vacancyCount: '',
  experience: '',
  state: '',
  country: '',
  min_salary: '',
  max_salary: '',
  lastDate: '',
  languages: '',
  education: '',
  responsibilities: '',
  skills: '',
  description: '',
};
const initialData: FormType = {
  title: '',

  mode: '',
  jobType: '',
  vacancyCount: 0,
  experience: '',
  state: '',
  country: '',
  min_salary: '',
  max_salary: '',
  lastDate: '',
  languages: '',
  education: '',
  responsibilities: [],
  skills: [],
  description: '',
};
export const useJobs = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormType>(initialData);
  const [error, setError] = useState<ErrorType>(initalError);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.currentTarget;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('fromdata ', formData);

    const result = jobPostSchema.safeParse(formData);
    if (!result.success) {
      const error = result.error.flatten().fieldErrors;
      const formattedError: ErrorType = {
        title: error.title?.[0] || '',

        mode: error.mode?.[0] || '',
        jobType: error.jobType?.[0] || '',
        vacancyCount: error.vacancyCount?.[0] || '',
        experience: error.experience?.[0] || '',
        state: error.state?.[0] || '',
        country: error.country?.[0] || '',
        min_salary: error.min_salary?.[0] || '',
        max_salary: error.max_salary?.[0] || '',
        lastDate: error.lastDate?.[0] || '',
        languages: error.languages?.[0] || '',
        education: error.education?.[0] || '',
        responsibilities: error.responsibilities?.[0] || '',
        skills: error.skills?.[0] || '',
        description: error.description?.[0] || '',
      };
      setError(formattedError);
      return;
    }
    setError(initalError);
    console.log('front end validation success');
    try {
      const data = await jobService.createPost(result.data);
      console.log('created job', data.job);

      showToast({ msg: data.message, type: 'success' });
      navigate('/employer');
    } catch (error: any) {
      showToast({
        msg: error?.response?.data?.message || error.message,
        type: 'error',
      });
      return;
    }
  };
  return {
    formData,
    handleSubmit,
    handleChange,
    setFormData,
    error,
    setError,
  };
};
