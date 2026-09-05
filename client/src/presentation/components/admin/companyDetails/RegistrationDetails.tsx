import { Calendar } from 'lucide-react';
import {
  type CompanyProfileType,
  type ReApplyType,
} from '../../../../types/dtos/profile-types/user.types';
type RegistrationDetailsProps = {
  company: CompanyProfileType | null;
};
export function RegistrationDetails({ company }: RegistrationDetailsProps) {
  if (!company) return;
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition-shadow duration-300 hover:shadow-md">
      {/* Header */}
      <div className="border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-transparent px-6 py-5">
        <h2 className="text-lg font-semibold tracking-tight text-indigo-700">
          Registration Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Company registration information
        </p>
      </div>

      {/* Details */}
      <div className="space-y-5 px-6 py-5">
        <InfoRow label="Company Name" value={company.companyName} />

        <InfoRow label="Industry" value={company.industry} />

        {company.reapplyCount ? (
          <InfoRow
            label="Reapplied"
            value={`${company.reapplyCount} time${company.reapplyCount > 1 ? 's' : ''}`}
          />
        ) : (
          <InfoRow label="Reg.Type" value={`New`} />
        )}

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar className="h-4 w-4 text-slate-400" />

            <span>
              Submitted{' '}
              {new Date(
                company.joinedAt ? company.joinedAt : company.createdAt
              ).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Rejection history */}
        {company.reapplyDetails.length > 0 && (
          <RejectionHistory
            reason={company.reasonForReject}
            history={company.reapplyDetails}
          />
        )}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

function RejectionHistory({
  history,
  reason,
}: {
  history: ReApplyType[];
  reason: string;
}) {
  console.log('reapply details', history);

  return (
    <div className="border-t border-slate-100 pt-4">
      <h3 className="mb-3 text-sm font-medium text-slate-700">
        Registration History
      </h3>

      <div className="space-y-3">
        {history.map((entry, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-rose-100 bg-rose-50/50 px-4 py-3"
          >
            <div className="flex items-start justify-between gap-3">
              <label htmlFor="">Reason:</label>{' '}
              <p className="text-sm text-slate-700">
                {entry.rejectedReason ?? reason}
              </p>
              <span
                className={`rounded-2xl text-xs py-1 px-1 ${entry.status === 'pending' ? 'text-amber-600 bg-amber-100' : 'text-red-700   bg-red-100'}`}
              >
                {entry.status}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              <span>
                Submitted
                {new Date(entry.date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
