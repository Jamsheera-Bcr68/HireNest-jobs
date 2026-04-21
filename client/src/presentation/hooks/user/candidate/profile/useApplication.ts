import { useSelector } from 'react-redux';
import type { StateType } from '../../../../../constants/types/user';
import { useToast } from '../../../../../shared/toast/useToast';
import { useNavigate, useLocation } from 'react-router-dom';
import { applicationService } from '../../../../../services/apiServices/application.service';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../../../../redux/authSlice';
import type { ApplicationStatusType } from '../../../../../types/dtos/application.dto';
import { useState } from 'react';
import { candidateService } from '../../../../../services/apiServices/candidateService';

import type { ResumeType } from '../../../../../types/dtos/profileTypes/ResumeType';

export const appStatusConfig = {
  shortListed: {
    label: 'Shortlisted',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  underReview: {
    label: 'Under Review',
    className: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  pending: {
    label: 'Applied',
    className: 'bg-violet-50 text-violet-700 border border-violet-200',
  },
  offered: {
    label: 'Offered',
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
  rejected: {
    label: 'Not Selected',
    className: 'bg-red-50 text-red-600 border border-red-200',
  },
};
export type FilterOption<T> = {
  key: string;
  label: string;
  options: { label: string; value: T }[];
};
export type ApplicationFilterType = {
  search?: string;
  status?: ApplicationStatusType;
  jobType?: string;
  sortBy?: string;
};

export const useApplications = (setPage?: (page?: number) => void) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const location = useLocation();

  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [resumes, setResumes] = useState<ResumeType[]>([]);
  const user = useSelector((state: StateType) => state.auth.user);
  const [jobId, setJobId] = useState<string>('');

  const handleApplyClick = async (applyJobId: string) => {
    if (!user) {
      console.log('location.pathname is', location.pathname);

      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (user.role !== 'candidate') {
      showToast({ msg: 'You are not allowed to apply job', type: 'error' });
      return;
    }
    if (user.isProfileCompleted == false) {
      showToast({ msg: 'Please complete your profile', type: 'error' });
      return;
    }
    if (!applyJobId) {
      showToast({ msg: 'Job id is not found', type: 'error' });
      return;
    }
    setJobId(applyJobId);
    try {
      const datta = await candidateService.getResumes(user.id);
      console.log('resumes', datta);

      setResumes(datta.resumes);
      setShowResumeModal(true);
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const applyJob = async ( resumeId: string) => {
  //  console.log('jobid,resumeid', jobId, resumeId);

    try {
      const data = await applicationService.applyJob(jobId, resumeId);
      showToast({ msg: data.message, type: 'success' });
      console.log('data after jobapply', data);
      const id = data.jobId;
      dispatch(
        updateUser({
          appliedJobs: data.appliedJobs || [...user.appliedJobs, id],
        })
      );
      setShowResumeModal(false)
    } catch (error: any) {
      showToast({
        msg: error.response?.data?.message || error.message,
        type: 'error',
      });
    }
  };
  const [filter, setFilter] = useState<ApplicationFilterType>({});
  const updateFilter = (data: Partial<ApplicationFilterType>) => {
    if (!setPage) return;
    console.log('from update filter', filter);

    setFilter((prev) => ({ ...prev, ...data }));
    setPage(1);
  };
  return {
    handleApplyClick,
    filter,
    updateFilter,
    setShowResumeModal,
    showResumeModal,
    resumes,
    applyJob,
  };
};
