import { ShieldAlert } from 'lucide-react';
import type { JobDetailsDto } from '../../../../types/dtos/jobDto';

type Report = {
  id: number;
  reportedBy: string;
  reason: string;
  info?: string;
  reportedAt: string;
};

type Props = {
  job: JobDetailsDto;
  tab: string;
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
      {children}
    </h3>
  );
}

export function Reports({ job, tab }: Props) {
  if (tab !== 'reports') return null;

  return (
    <div>
      <SectionTitle>Reports ({job.reportDetails.length})</SectionTitle>

      {job.reportDetails.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <ShieldAlert size={20} className="text-gray-300" />
          </div>
          <p className="text-sm text-gray-400">No reports on this job</p>
        </div>
      ) : (
        <div className="space-y-3">
          {job.reportDetails.map((r) => (
            <div
              key={r.reason}
              className="flex gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-100"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {r.reportedBy.charAt(0)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <p className="text-sm font-medium text-gray-800">
                    {r.reportedBy}
                  </p>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {r.reportedDate
                      ? new Date(r.reportedDate).toDateString()
                      : '--'}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100 mb-1.5">
                  {r.reason}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {r.info}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
