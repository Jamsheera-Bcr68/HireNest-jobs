import React from 'react';
import SectionTitle from './SectionTitle';
import type { JobDetailsDto } from '../../../../../types/dtos/jobDto';
import {
  BriefcaseBusiness,
  MapPin,
  Star,
  Clock,
  CircleDollarSign,
  Users,
} from 'lucide-react';
import { formatSalary } from '../../../../../utils/salaryFormat';

type Props = {
  tab: string;
  job: JobDetailsDto;
};

function OverView({ tab, job }: Props) {
  if (!job || tab !== 'overview') return null;

  const jobDetails = [
    {
      icon: <BriefcaseBusiness size={16} />,
      label: 'Job Type',
      value: job.jobType == 'partTime' ? 'Part Time' : 'Full Time',
    },
    {
      icon: <Clock size={16} />,
      label: 'Experience',
      value: job.experience + ' Years',
    },
    {
      icon: <Star size={16} />,
      label: 'Work Mode',
      value: job.mode,
    },
    {
      icon: <Users size={16} />,
      label: 'Vacancies',
      value: `${job.vacancyCount} Opening${job.vacancyCount > 1 ? 's' : ''}`,
    },
    {
      icon: <MapPin size={16} />,
      label: 'Location',
      value: `${job.location.state}, ${job.location.country}`,
    },
    {
      icon: <CircleDollarSign size={16} />,
      label: 'Salary',
      value: formatSalary(job.min_salary, job.max_salary),
    },
  ];

  return (
    <>
      {/* About Role */}
      <div>
        <SectionTitle>About the role</SectionTitle>
        <p className="text-sm text-gray-600 leading-relaxed">
          {job.description}
        </p>
      </div>

      {/* Skills */}
      <div>
        <SectionTitle>Skills required</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill.id}
              className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold"
            >
              {skill.skillName}
            </span>
          ))}
        </div>
      </div>

      {/* Job Details */}
      <div>
        <SectionTitle>Job details</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {jobDetails.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition"
            >
              {/* Icon container */}
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                {icon}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p className="text-xs text-gray-400">{label}</p>

                <p className="text-sm font-semibold text-gray-800 truncate">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default OverView;
