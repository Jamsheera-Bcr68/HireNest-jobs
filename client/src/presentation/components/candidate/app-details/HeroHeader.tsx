import { MapPin, Building2 } from 'lucide-react';

import { appStatusStyles } from '../applications/ApplicationCard';

import { Card } from '../ReusableComponents';
import type { ApplicationDetailsDto } from '../../../../types/dtos/application.dto';
type Props = {
  application: ApplicationDetailsDto | null;
};
function HeroHeader({ application }: Props) {
  if (!application) return null;
  const baseUrl=import.meta.env.VITE_BACKEND_URL
  return (
    <Card className="mb-5 overflow-hidden">
      <div className="relative p-7">
        <div className="absolute top-0 right-0 w-56 h-56 rounded-bl-full bg-gradient-to-br from-emerald-50 to-blue-50 opacity-60 pointer-events-none" />
        <div className="relative flex flex-wrap items-start gap-5">
          {/* Logo */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md">
            <img className='w-12 h-12 rounded-2xl'  src={`${baseUrl}${application.company.logoUrl}`} alt="" />
          </div>

          {/* Title */}
          <div className="flex-1 min-w-[200px]">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {application.job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 mb-3">
              <Building2 size={13} />
              <span>{application.company.companyName}</span>
              <span className="text-gray-300">·</span>
              <MapPin size={13} />
              <span>{application.job.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-violet-50 text-violet-700 font-medium">
                {application.job.jobType=='fullTime'?'Full Time':'Part Time'}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                {application.job.mode=='remote'?'Remote':application.job.mode==='onsite'?'Onsite':'Hybrid'}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-medium">
                {application.job.experience} Exp
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col items-end gap-2">
            <span
              className={`text-xs font-semibold px-4 py-1.5 rounded-full ${appStatusStyles[application.status]} `}
      
            >
          {application.status}
            </span>
            <p className="text-xs text-gray-400">
              Applied {application.appliedAt}
            </p>
            <p className="text-[11px] text-gray-300 font-mono">
              {application.id}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default HeroHeader;
