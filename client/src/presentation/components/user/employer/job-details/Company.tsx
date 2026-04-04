import React from 'react';
import { Box, Building, MapPin, Users } from 'lucide-react';
import type { JobDetailsDto } from '../../../../../types/dtos/jobDto';
import SectionTitle from './SectionTitle';

type Props = {
  job: JobDetailsDto;
};
const baseUrl = import.meta.env.VITE_BACKEND_URL;
function Company({ job }: Props) {
  if (!job) return null;

  const companyInitials = job.companyName
    ?.split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const companyInfo = [
    {
      icon: <Building size={16} className="text-gray-500" />,
      label: 'Company Size',
      value: job.companySize,
    },
    {
      icon: <Users size={16} className="text-gray-500" />,
      label: 'Employees',
      value: job.companyEmployeeCount,
    },
    {
      icon: <Box size={16} className="text-gray-500" />,
      label: 'Industry',
      value: job.industry,
    },
    {
      icon: <MapPin size={16} className="text-gray-500" />,
      label: 'Headquarters',
      value: `${job.location.state}, ${job.location.country}`,
    },
  ];

  return (
    <div>
      {/* Company header */}
      <div className="flex items-center gap-4">
        {job.companyLogo ? (
          <img
            src={`${baseUrl}${job.companyLogo}`}
            alt={job.companyName}
            className="w-12 h-12 rounded-xl object-cover border border-gray-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
            <span className="text-white font-bold">{companyInitials}</span>
          </div>
        )}

        <div>
          <h3 className="font-bold text-gray-900">{job.companyName}</h3>

          <p className="text-sm text-gray-400">{job.industry}</p>
        </div>
      </div>

      {/* About company */}
      <div>
        <SectionTitle>About the company</SectionTitle>

        <p className="text-sm text-gray-600 leading-relaxed">
          {job.aboutCompany || 'Company description not available'}
        </p>
      </div>

      {/* Company info grid */}
      <div>
        <SectionTitle>Company info</SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {companyInfo.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition"
            >
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>

              <div>
                <p className="text-xs text-gray-400">{label}</p>

                <p className="text-sm font-semibold text-gray-800">
                  {value || 'Not specified'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Company;
