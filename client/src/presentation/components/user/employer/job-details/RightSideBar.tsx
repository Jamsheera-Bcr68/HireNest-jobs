import { useState } from 'react';
import SectionTitle from './SectionTitle';
import {
  Users,
  BriefcaseBusiness,
  Star,
  Clock,
  CircleDollarSign,
  MapPin,
  Calendar,
} from 'lucide-react';
import { formatSalary } from '../../../../../utils/salaryFormat';
import type { JobDetailsDto } from '../../../../../types/dtos/jobDto';
import ConfirmationModal from '../../../../modals/ConfirmationModal';
import type { StatusType } from '../../../../../types/dtos/profileTypes/userTypes';
import type { UserRole } from '../../../../../constants/types/user';

type Props = {
  job: JobDetailsDto;
  updateStatus: (status: StatusType) => Promise<void>;
  role?: UserRole;
};

function RightSideBar({ job, updateStatus, role }: Props) {
  if (!job) return null;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const snapshot = [
    {
      icon: <BriefcaseBusiness size={14} className="text-gray-400" />,
      label: 'Type',
      value: job.jobType,
    },
    {
      icon: <Star size={14} className="text-gray-400" />,
      label: 'Mode',
      value: job.mode,
    },
    {
      icon: <Clock size={14} className="text-gray-400" />,
      label: 'Experience',
      value: job.experience,
    },
    {
      icon: <Users size={14} className="text-gray-400" />,
      label: 'Vacancies',
      value: `${job.vacancyCount} Opening${job.vacancyCount > 1 ? 's' : ''}`,
    },
    {
      icon: <CircleDollarSign size={14} className="text-gray-400" />,
      label: 'Salary',
      value: formatSalary(job.min_salary, job.max_salary),
    },
    {
      icon: <MapPin size={14} className="text-gray-400" />,
      label: 'Location',
      value: `${job.location.state}, ${job.location.country}`,
    },
    {
      icon: <Calendar size={14} className="text-gray-400" />,
      label: 'Expire On',
      value: job.lastDate ? new Date(job.lastDate).toDateString() : '--',
    },
  ];

  return (
    <>
      {/* Applications card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <SectionTitle>Applications</SectionTitle>

        <div className="flex items-end gap-3 mb-5">
          <p className="text-4xl font-extrabold text-indigo-600">
            {job.totalApplicants}
          </p>

          <p className="text-sm text-gray-400 mb-1.5">total applicants</p>
        </div>

        <button
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition
          text-sm font-semibold text-white flex items-center justify-center gap-2"
        >
          <Users size={15} />
          Manage Applicants
        </button>
      </div>

      {/* Job snapshot */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <SectionTitle>Job snapshot</SectionTitle>

        <div className="space-y-3.5">
          {snapshot.map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div
                className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100
                flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                {icon}
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-400">{label}</p>

                <p className="text-sm font-semibold text-gray-800 break-words">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}

      {role !== 'admin' && (
        <div className="bg-white rounded-2xl border border-red-50 p-5">
          {['active', 'pause'].includes(job.status) ? (
            <>
              {' '}
              <p className="text-xs font-bold text-red-300 uppercase tracking-widest mb-2">
                Danger Zone
              </p>
              <p className="text-xs text-gray-400 leading-relaxed mb-3">
                Closing stops new applications. You can reopen it later.
              </p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-2 rounded-xl text-sm font-semibold text-red-600
          bg-red-50 hover:bg-red-100 transition border border-red-100"
              >
                Close This Job
              </button>
            </>
          ) : (
            <p className="text-xs font-bold text-red-300 uppercase tracking-widest mb-2">
              This job post is {job.status}
            </p>
          )}
        </div>
      )}
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item="Job"
        type="delete"
        action="Close"
        onConfirm={() => updateStatus('closed')}
      />
    </>
  );
}

export default RightSideBar;
