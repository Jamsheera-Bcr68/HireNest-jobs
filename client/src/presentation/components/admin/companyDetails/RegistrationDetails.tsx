import { Calendar, FileCheck, FileText, Inbox, XCircle, type LucideIcon } from 'lucide-react';
import {
  type CompanyProfileType,
  type ReApplyType,
} from '../../../../types/dtos/profile-types/user.types';
import type { ReactNode } from 'react';
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

// function RejectionReasonSection({ status, reasonForReject }) {
//   const isRejected = status?.toLowerCase?.() === "rejected";
//   if (!isRejected) return null;

//   return (
//     <SectionCard title="Rejection Reason">
//       {hasValue(reasonForReject) ? (
//         <p className="rounded-xl bg-rose-50 p-3.5 text-sm text-rose-700">
//           {reasonForReject}
//         </p>
//       ) : (
//         <CompactEmptyState text="No rejection reason recorded." />
//       )}
//     </SectionCard>
//   );
// }
// export function RegistrationDetails() {
//   return (
//     <div className="space-y-6">
//       <RejectionReasonSection
//         status={status}
//         reasonForReject={reasonForReject}
//       />
//       <ReapplicationTimeline
//         reapplyDetails={reapplyDetails}
//         reapplyCount={reapplyCount}
//       />
//       <DocumentSection document={document} onViewDocument={onViewDocument} />

//       {isPending && (onApprove || onReject) && (
//         <SectionCard>
//           <div className="flex gap-3">
//             {onApprove && (
//               <button
//                 type="button"
//                 onClick={() => onApprove(id)}
//                 className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
//               >
//                 <ShieldCheck className="h-4 w-4" />
//                 Approve
//               </button>
//             )}
//             {onReject && (
//               <button
//                 type="button"
//                 onClick={() => onReject(id)}
//                 className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
//               >
//                 <XCircle className="h-4 w-4" />
//                 Reject
//               </button>
//             )}
//           </div>
//         </SectionCard>
//       )}
//     </div>
//   );
// }

export function SectionCard({ title, children, className = "" }:{title:string,children:ReactNode,className:string}) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 ${className}`}
    >
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </h3>
         
        </div>
      )}
      {children}
    </section>
  );
}





export function CompactEmptyState({ icon: Icon = Inbox, text }:{icon:LucideIcon,text:string}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-400">
      <Icon className="h-4 w-4 shrink-0" />
      <span>{text}</span>
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






interface DocumentProps {
  document?: {type:string,file:string} | null;
}

export function Document({ document }: DocumentProps) {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <SectionCard className='' title="Registration Document">
      {document ? (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
              <FileText className="h-5 w-5 text-indigo-600" />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800">
                Registration Document
              </p>

              <p className="truncate text-xs text-slate-500">
                Company verification document
              </p>
            </div>
          </div>

          <button
            type="button"
             onClick={() =>
                window.open(`${baseUrl}${document.file}`, '_blank')
              }
            className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            View
          </button>
        </div>
      ) : (
        <CompactEmptyState icon={FileCheck} text="No registration document uploaded." />
      )}
    </SectionCard>
  );
}

