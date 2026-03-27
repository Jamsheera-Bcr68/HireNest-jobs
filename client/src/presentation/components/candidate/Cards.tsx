import type { JobCardDto } from '../../../types/dtos/jobDto';
import { formatSalary } from '../../../utils/salaryFormat';
import { Users, Calendar, Briefcase, Clock, MapPin, Heart } from 'lucide-react';

type JobCardProps = {
  job: JobCardDto;
};

const JobCard = ({ job }: JobCardProps) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="max-w-sm w-full rounded-3xl bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <>
        {/* Top accent bar */}
        <div className="h-2.5 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-t-3xl" />

        <div className="p-5">
          {/* Header: logo + title + wishlist */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={`${backendUrl}${job.companyLogo}`}
                  alt="company logo"
                />
              </div>
              <div>
                <h2 className="text-[15px] font-medium text-gray-900 leading-tight">
                  {job.title}
                </h2>
                <p className="text-[13px] text-gray-500 mt-0.5">
                  {job.companyName}
                </p>
              </div>
            </div>
            <button className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none mt-0.5">
              <Heart size={18} className="text-red-700" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
              <MapPin size={12} />
              {job.location.state}, {job.location.country}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
              <Briefcase size={12} />
              {job.mode}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
              <Clock size={12} />
              {job.jobType}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[12px] bg-gray-50 text-gray-500 border border-gray-100 rounded-full px-3 py-1">
              <Clock size={12} />
              {job.experience}
            </span>
          </div>

          {/* Salary + Vacancy */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] font-medium text-gray-800">
              {formatSalary(job.min_salary, job.max_salary)}
            </p>
            {job.vacancyCount !== undefined && (
              <span className="inline-flex items-center gap-1.5 text-[12px] bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 font-medium">
                <Users size={12} />
                {job.vacancyCount}{' '}
                {job.vacancyCount === '1' ? 'vacancy' : 'vacancies'}
              </span>
            )}
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="text-[12px] px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Deadline banner */}
          {job.lastDate && (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 mb-4">
              <Calendar size={14} className="text-orange-600 flex-shrink-0" />
              <span className="text-[12px] text-orange-800 font-medium">
                Application deadline
              </span>
              <span className="text-[12px] text-orange-600 font-medium ml-auto">
                {new Date(job.lastDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
            <span className="text-[12px] text-gray-400">
              Posted:{' '}
              {job?.createdAt
                ? new Date(job.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : ''}
            </span>
            <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-medium rounded-lg transition-colors">
              Apply now
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default JobCard;
