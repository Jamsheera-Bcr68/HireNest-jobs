import React from 'react';
import type { JobDetailsDto } from '../../../../../types/dtos/job.dto';
import SectionTitle from './SectionTitle';
import type { UserRole } from '../../../../../constants/types/user';
type Props = {
  job: JobDetailsDto;
  tab: string;
  role: UserRole;
};
function Responsibilities({ job, tab, role }: Props) {
  return (
    <div>
      {/* ─ Responsibilities ─ */}
      {tab === 'responsibilities' && (
        <div>
          <SectionTitle>Key responsibilities</SectionTitle>
          <ul className="space-y-3">
            {job.responsibilities.map((r, i) => (
              <li key={i} className="flex gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full
                          flex items-center justify-center  text-xs font-bold mt-0.5 ${role == 'admin' ? 'text-fuchsia-600  bg-blue-50 border border-blue-100' : ' bg-fuchsia-50 border border-fuchsia-100 text-fuchsia-600'}`}
                >
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{r}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Responsibilities;
