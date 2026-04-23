import { useState } from 'react';
import type { InterviewMode } from '../../../types/dtos/interview.dto';
import { interviewSchema } from '../../../libraries/validations/company/interview.form.validation';
import { useToast } from '../../../shared/toast/useToast';
import { interviewService } from '../../../services/interview.service';

type FormType = {
  mode: InterviewMode;
  date: string;
  time: string;
  isAddlinkLater: boolean;
  meetlink?: string;
  notes?: string;
  duration: string;
  location: string;
};
const initialData: FormType = {
  mode: 'online',
  date: '',
  time: '',
  isAddlinkLater: false,
  meetlink: '',
  notes: '',
  duration: '',
  location: '',
};
type ErrorType = {
  mode: string;
  date: string;
  time: string;
  isAddlinkLater?: string;
  meetlink?: string;
  notes?: string;
  duration: string;
  location: string;
};
export const useInterviews = (applicationId?: string) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormType>(initialData);
  const [error, setError] = useState<ErrorType | null>(null);
  const updateFormdata = (data: Partial<FormType>) => {
    console.log('data', data);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const scheduleInterview = async () => {
    console.log('from shedule interview', formData);
    const result = interviewSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const error: ErrorType = {
        mode: formattedErrors.mode?._errors[0] ?? '',
        date: formattedErrors.date?._errors[0] ?? '',
        time: formattedErrors.time?._errors[0] ?? '',
        duration: formattedErrors.duration?._errors[0] ?? '',
        meetlink: formattedErrors.meetlink?._errors[0] ?? '',
        location: formattedErrors.location?._errors[0] ?? '',
        notes: formattedErrors.notes?._errors[0] ?? '',
      };
      setError(error);
      console.log(error);
      return;
    }
    setError(null);

    try {
      if (!applicationId) {
        showToast({
          msg: 'Application id is not found',
          type: 'error',
        });
        return
      }
      const data = await interviewService.scheduleInterview(result.data,applicationId);
      console.log('after shedule interview', data);

      showToast({
        msg: data.message,
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  return {
    updateFormdata,
    formData,
    scheduleInterview,
    error,
  };
};
