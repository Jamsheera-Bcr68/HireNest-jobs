import { statusStyles } from '../../../../pages/admin/Candidates';
import { formatSalary } from '../../../../../utils/salaryFormat';
import type { JobDetailsDto } from '../../../../../types/dtos/jobDto';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  BriefcaseBusiness,
  Clock,
  Calendar,
  TvMinimal,
  Users,
} from 'lucide-react';
import type { UserRole } from '../../../../../constants/types/user';

function Chip({
  label,
  variant = 'gray',
}: {
  label: string;
  variant: 'gray' | 'blue' | 'green' | 'violet';
}) {
  const styles = {
    gray: 'bg-gray-100 text-gray-600',
    blue: 'bg-blue-50 text-blue-700 border border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    violet: 'bg-violet-50 text-violet-700 border border-violet-100',
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-lg ${styles[variant]}`}
    >
      {label}
    </span>
  );
}
type Props = { job: JobDetailsDto | null; role?: UserRole };

function HeroPart({ job, role }: Props) {
  if (!job) return null;
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-7">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Company logo / initials */}
        <div className="flex-shrink-0">
          {job?.companyLogo ? (
            <img
              src={`${baseUrl}${job.companyLogo}`}
              alt={job.companyName}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl tracking-tight">
                {job.companyName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Core info */}
        <div className="flex-1 min-w-0">
          {/* Company + title */}
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-wide mb-1">
            {job.companyName}
          </p>

          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
            {job.title}
          </h1>
          <span
            className={`text-xs rounded-full p-1 ${statusStyles[job.status]}`}
          >
            {job?.status}
          </span>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin className="text-slate-400" size={16} />
              <span>
                {`${job.location.place ?? ''}, ${job.location.state}, ${job.location.country}`}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <BriefcaseBusiness className="text-slate-400" size={16} />
              <span>
                {job.jobType == 'partTime' ? 'Part Time' : 'Full Time'}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock className="text-slate-400" size={16} />
              <span>{job.experience} years</span>
            </div>

            <div className="flex items-center gap-1">
              <TvMinimal className="text-slate-400" size={16} />
              <span>{job.industry}</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="text-slate-400" size={16} />
              <span>
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          {/* Chips row */}
          <div className="flex flex-wrap gap-2">
            <Chip label={job.mode} variant="blue" />
            <Chip
              label={job.jobType == 'partTime' ? 'Part Time' : 'Full Time'}
              variant="gray"
            />
            <Chip label={job.experience + ' years'} variant="gray" />
            <Chip label={`${job.vacancyCount} Openings`} variant="green" />
          </div>
        </div>

        {/* Salary + CTA block */}
        <div className="flex-shrink-0 flex flex-col items-end gap-3 sm:min-w-[170px]">
          <div className="text-right">
            <p className="text-xs text-gray-400 font-medium mb-0.5">Salary</p>

            <p className="text-xl font-bold text-gray-900">
              ₹{formatSalary(job.min_salary, job.max_salary)}
            </p>
          </div>
          {role !== 'admin' && (
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-blue-700 transition-colors text-sm font-semibold text-white">
              <Users size={15} color="white" />
              Applicants
              <span className="bg-white/25 text-white text-xs font-bold px-1.5 py-0.5 rounded-md">
                {job.totalApplicants}
              </span>
            </button>
          )}
          {role == 'admin' && (
            <>
              {' '}
              <button className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors text-sm font-semibold text-indigo-600">
                View All posts
              </button>
              <button
                onClick={() => navigate(`/admin/companies/${job.companyId}`)}
                className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition-colors text-sm font-semibold text-indigo-600"
              >
                View Compnay
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroPart;
