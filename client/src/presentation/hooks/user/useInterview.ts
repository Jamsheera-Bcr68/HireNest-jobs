import { useState } from 'react';
import type {
  InterviewMode,
  InterviewStatusType,
} from '../../../types/dtos/interview.dto';
import { interviewSchema } from '../../../libraries/validations/company/interview.form.validation';
import { useToast } from '../../../shared/toast/useToast';
import { interviewService } from '../../../services/interview.service';
import { type InterviewResult } from '../../../types/dtos/interview.dto';
import type {
  FilterOption,
  SortOption,
} from '../../components/admin/Candidates/ReusableTable';

export type InterviewFilter = {
  status?: InterviewStatusType;
  search?: string;
  mode?: InterviewMode;
  sortby?: string;
  result?: InterviewResult;
  isRescheduleRequested?: boolean;
  dateRange?: { startDate: string; endDate: string };
};

export const interviewStatusStyles: Record<string, string> = {
  scheduled: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  no_show: 'bg-gray-200 text-gray-700',
};
export const interviewResultStyles: Record<string, string> = {
  failed: 'text-blue-700',
  passed: 'text-green-700',
};
type FormType = {
  mode: InterviewMode;
  date: string;
  time: string;
  isAddlinkLater: boolean;
  meetLink?: string;
  notes?: string;
  duration: string;
  location: string;
  feedback?: string;
  result?: InterviewResult;
};
export const initialData: FormType = {
  mode: 'online',
  date: '',
  time: '',
  isAddlinkLater: false,
  meetLink: '',
  notes: '',
  duration: '',
  location: '',
};
type ErrorType = {
  mode: string;
  date: string;
  time: string;
  isAddlinkLater?: string;
  meetLink?: string;
  notes?: string;
  duration: string;
  location: string;
  feedback?: string;
  result?: string;
};
export const useInterviews = (setPage?: (page: number) => void) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormType>(initialData);
  const [error, setError] = useState<ErrorType | null>(null);
  const [filter, setFilter] = useState<InterviewFilter>({});

  const updateFormdata = (data: Partial<FormType>) => {
    console.log('data', data);
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const submitInterviewForm = async (
    mode: 'add' | 'edit',
    ids: { applicationId?: string; interviewId?: string }
  ) => {
    setError(null);
    console.log('from submit interview', mode, ids.interviewId, formData);

    const result = interviewSchema.safeParse(formData);

    if (!result.success) {
      const formatted = result.error.format();

      setError({
        mode: formatted.mode?._errors[0] ?? '',
        date: formatted.date?._errors[0] ?? '',
        time: formatted.time?._errors[0] ?? '',
        duration: formatted.duration?._errors[0] ?? '',
        meetLink: formatted.meetLink?._errors[0] ?? '',
        location: formatted.location?._errors[0] ?? '',
        notes: formatted.notes?._errors[0] ?? '',
      });

      return;
    }

    try {
      if (mode === 'add') {
        if (!ids.applicationId) {
          showToast({ msg: 'Application id is not found', type: 'error' });
          return;
        }

        const data = await interviewService.scheduleInterview(
          result.data,
          ids.applicationId
        );

        showToast({ msg: data.message, type: 'success' });
        return data.interview;
      }

      if (mode === 'edit') {
        if (!ids.interviewId) {
          showToast({ msg: 'Interview id is not found', type: 'error' });
          return;
        }

        const data = await interviewService.updateInterview(
          result.data,
          ids.interviewId
        );

        showToast({ msg: data.message, type: 'success' });
        console.log(data.interview);

        return data.interview;
      }
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };

  const modeFilter: FilterOption = {
    key: 'mode',
    label: 'Mode',
    options: ['online', 'offline'],
  };
  const resultFilter: FilterOption = {
    key: 'result',
    label: 'Result',
    options: ['passed', 'failed'],
  };

  const sortFilter: SortOption = {
    key: 'sortBy',
    label: 'Sort',
    options: [
      { label: 'Upcoming', value: 'newest' },
      { label: 'Newest', value: 'newest' },
      { label: 'Role A-Z', value: 'a-z' },
    ],
  };
  const filterOptions = [modeFilter, resultFilter];

  const updateFilter = (data: Partial<InterviewFilter>) => {
    console.log('from update filter', data);
    const { status } = data;
    if (status === 'isRescheduleRequested') {
      data.isRescheduleRequested = true;
      data.status = 'scheduled';
    }
    setFilter((prev) => ({ ...prev, ...data }));
    if (!setPage) return;
    setPage(1);
  };

  const upsateStatus = async (
    id: string,
    status: InterviewStatusType,
    resson?: string
  ) => {
    console.log('status fom update,reason', status, resson);

    if (!id) return;

    try {
      const data = await interviewService.updateStaus(id, status, resson);
      console.log('data after updateing status', data);
      showToast({
        msg: data.message,
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  const getInterviewDetails = async (id: string) => {
    try {
      const data = await interviewService.getInterview(id);
      console.log('data after getting  interview details', data);
      return data.interview;
    } catch (error: any) {
      showToast({
        msg: error.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  return {
    updateFormdata,
    formData,
    submitInterviewForm,
    error,
    initialData,
    filter,
    updateFilter,
    filterOptions,
    sortFilter,
    upsateStatus,
    getInterviewDetails,
  };
};
