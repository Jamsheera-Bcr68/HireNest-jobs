import React from 'react';
import type { JobDetailsDto } from '../../../../../types/dtos/jobDto';
import SectionTitle from './SectionTitle';
type Props = {
  job: JobDetailsDto;
  tab: string;
};
function Responsibilities({ job, tab }: Props) {
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
                  className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 border border-blue-100
                          flex items-center justify-center text-blue-600 text-xs font-bold mt-0.5"
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
