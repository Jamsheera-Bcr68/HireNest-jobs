import { useState } from 'react';
import {
  X,
  Building2,
  Flag,
  Calendar,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
} from 'lucide-react';

// Fixed set of reason categories used by the report form.
// Each reason gets a distinct accent color, used as a left border + bar,
// so reasons read as a colored line-by-line list rather than mixed inline chips.
const REASON_STYLES = {
  'Misleading job description': {
    bar: 'bg-amber-400',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
  },
  'Looks like a scam': {
    bar: 'bg-red-500',
    text: 'text-red-700',
    bg: 'bg-red-50',
  },
  'Discriminatory content': {
    bar: 'bg-fuchsia-500',
    text: 'text-fuchsia-700',
    bg: 'bg-fuchsia-50',
  },
  'Duplicate listing': {
    bar: 'bg-sky-500',
    text: 'text-sky-700',
    bg: 'bg-sky-50',
  },
  'Position already filled': {
    bar: 'bg-teal-500',
    text: 'text-teal-700',
    bg: 'bg-teal-50',
  },
  'Inappropriate content': {
    bar: 'bg-orange-500',
    text: 'text-orange-700',
    bg: 'bg-orange-50',
  },
  Other: { bar: 'bg-slate-400', text: 'text-slate-600', bg: 'bg-slate-50' },
};

function getReasonStyle(reason) {
  return REASON_STYLES[reason] || REASON_STYLES.Other;
}

// ---- Sample data shaped the way you described ----
// Each job now carries an array of individual reports instead of one reason string.
const ACTIVITIES = [
  {
    id: 'A-1042',
    type: 'reported_job',
    jobRole: 'Senior Backend Engineer',
    companyName: 'Nimbus Cloudworks',
    reports: [
      {
        reasonCategory: 'Looks like a scam',
        details:
          "Asked me to pay a ₹500 'processing fee' before scheduling the interview.",
        reportedAt: '2026-08-19',
      },
      {
        reasonCategory: 'Looks like a scam',
        details: '',
        reportedAt: '2026-08-20',
      },
      {
        reasonCategory: 'Misleading job description',
        details: "Listing says remote but recruiter insists it's on-site only.",
        reportedAt: '2026-08-21',
      },
      {
        reasonCategory: 'Duplicate listing',
        details: '',
        reportedAt: '2026-08-22',
      },
      {
        reasonCategory: 'Other',
        details:
          'Recruiter asked for Aadhaar number over WhatsApp before any interview.',
        reportedAt: '2026-08-23',
      },
      {
        reasonCategory: 'Looks like a scam',
        details: '',
        reportedAt: '2026-08-24',
      },
    ],
    submittedDate: '2026-08-24',
    status: 'reported',
  },
  {
    id: 'A-1041',
    type: 'company_registration',
    companyName: 'Verdant Foods Pvt Ltd',
    industry: 'Food & Beverage Manufacturing',
    reapplyCount: 3,
    rejectionHistory: [
      {
        reason: 'Mismatched GST number and business documents',
        date: '2026-08-10',
      },
      { reason: 'Office address could not be verified', date: '2026-08-15' },
      {
        reason: 'Mismatched GST number and business documents',
        date: '2026-08-19',
      },
    ],
    submittedDate: '2026-08-23',
    status: 'pending',
  },
  {
    id: 'A-1039',
    type: 'reported_job',
    jobRole: 'Data Entry Executive',
    companyName: 'Quicktype Solutions',
    reports: [
      {
        reasonCategory: 'Duplicate listing',
        details:
          'Same listing as job posted two weeks ago, already marked closed then.',
        reportedAt: '2026-08-20',
      },
      {
        reasonCategory: 'Position already filled',
        details: '',
        reportedAt: '2026-08-21',
      },
    ],
    submittedDate: '2026-08-21',
    status: 'reported',
  },
  {
    id: 'A-1036',
    type: 'company_registration',
    companyName: 'Orbit Learning Labs',
    industry: 'EdTech',
    reapplyCount: 5,
    rejectionHistory: [
      { reason: 'Business address unverifiable', date: '2026-07-28' },
      { reason: 'Business address unverifiable', date: '2026-08-02' },
      { reason: 'Incorporation certificate expired', date: '2026-08-07' },
      { reason: 'Business address unverifiable', date: '2026-08-12' },
    ],
    submittedDate: '2026-08-19',
    status: 'pending',
  },
];

function StatusPill({ status }) {
  const isReported = status === 'reported';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        isReported
          ? 'bg-rose-50 text-rose-700 ring-rose-200'
          : 'bg-amber-50 text-amber-700 ring-amber-200'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isReported ? 'bg-rose-500' : 'bg-amber-500'
        }`}
      />
      {isReported ? 'Reported' : 'Pending'}
    </span>
  );
}

function TypeBadge({ type }) {
  const isJob = type === 'reported_job';
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold ${
        isJob ? 'bg-slate-100 text-slate-700' : 'bg-indigo-50 text-indigo-700'
      }`}
    >
      {isJob ? (
        <Flag className="h-3.5 w-3.5" />
      ) : (
        <Building2 className="h-3.5 w-3.5" />
      )}
      {isJob ? 'Reported Job' : 'Company Registration'}
    </span>
  );
}

function ReportBreakdown({ reports }) {
  const [expanded, setExpanded] = useState(false);

  // Group reports by reason so the admin sees the pattern at a glance
  const counts = reports.reduce((acc, r) => {
    acc[r.reasonCategory] = (acc[r.reasonCategory] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Report Breakdown ({reports.length} total)
        </p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          {expanded ? 'Hide individual reports' : 'Show individual reports'}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Summary: one line per reason, with a colored left bar and count */}
      <div className="mb-3 space-y-1.5">
        {Object.entries(counts).map(([reason, count]) => {
          const style = getReasonStyle(reason);
          return (
            <div
              key={reason}
              className={`flex items-center justify-between rounded-md ${style.bg} py-2 pl-3 pr-3`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${style.bar}`}
                />
                <span className={`text-sm font-medium ${style.text}`}>
                  {reason}
                </span>
              </div>
              <span className={`text-xs font-semibold ${style.text}`}>
                ×{count}
              </span>
            </div>
          );
        })}
      </div>

      {/* Individual reports, each with its own optional detail text */}
      {expanded && (
        <div className="max-h-56 space-y-2 overflow-y-auto rounded-lg bg-slate-50 p-2">
          {reports.map((r, i) => {
            const style = getReasonStyle(r.reasonCategory);
            return (
              <div
                key={i}
                className={`rounded-md border-l-4 ${style.bar.replace('bg-', 'border-')} bg-white p-3 shadow-sm`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className={`text-sm font-medium ${style.text}`}>
                    {r.reasonCategory}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(r.reportedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                </div>
                {r.details ? (
                  <p className="text-sm text-slate-600">{r.details}</p>
                ) : (
                  <p className="text-sm italic text-slate-400">
                    No additional details provided
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RejectionHistory({ history }) {
  // Show most recent rejection first
  const sorted = [...history].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
        Previous Rejections ({history.length})
      </p>
      <div className="space-y-2 rounded-lg bg-slate-50 p-2">
        {sorted.map((r, i) => (
          <div
            key={i}
            className="flex items-start justify-between gap-3 rounded-md bg-white px-3 py-2 ring-1 ring-slate-100"
          >
            <p className="text-sm text-slate-700">{r.reason}</p>
            <span className="shrink-0 text-xs text-slate-400">
              {new Date(r.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
type Props = {
  open: boolean;
  onClose: () => void;
  activity: any;
};
export function ActivityModal({ activity, onClose, open }: Props) {
  if (!open) return null;
  const isJob = activity.type === 'reported_job';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div className="space-y-2">
            <TypeBadge type={activity.type} />
            <h2 className="text-lg font-semibold text-slate-900">
              {isJob ? activity.jobRole : activity.companyName}
            </h2>
            <p className="text-sm text-slate-500">Activity ID: {activity.id}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          {isJob ? (
            <>
              <InfoRow label="Job Role" value={activity.jobRole} />
              <InfoRow label="Company Name" value={activity.companyName} />
              <ReportBreakdown reports={activity.reports} />
            </>
          ) : (
            <>
              <InfoRow label="Company Name" value={activity.companyName} />
              <InfoRow label="Industry" value={activity.industry} />
              <InfoRow
                label="Reapplied"
                value={`${activity.reapplyCount} time${activity.reapplyCount > 1 ? 's' : ''}`}
              />
              {activity.rejectionHistory?.length > 0 && (
                <RejectionHistory history={activity.rejectionHistory} />
              )}
            </>
          )}

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Calendar className="h-4 w-4" />
              Submitted{' '}
              {new Date(activity.submittedDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
            <StatusPill status={activity.status} />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Close
          </button>
          {isJob ? (
            <>
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
                Dismiss Report
              </button>
              <button className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500">
                Remove Job
              </button>
            </>
          ) : (
            <>
              <button className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500">
                Reject
              </button>
              <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500">
                Approve Company
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}

// Reference: the user-facing "Report this job" form that produces the
// { reasonCategory, details, reportedAt } objects consumed above.
const REASON_OPTIONS = [
  'Misleading job description',
  'Looks like a scam',
  'Discriminatory content',
  'Duplicate listing',
  'Position already filled',
  'Inappropriate content',
  'Other',
];

export function ReportJobForm({ onSubmit }) {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const requiresDetails = reason === 'Other';

  const canSubmit = reason && (!requiresDetails || details.trim().length > 0);

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Reason for reporting
        </label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          <option value="" disabled>
            Select a reason
          </option>
          {REASON_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Additional details {requiresDetails ? '(required)' : '(optional)'}
        </label>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={3}
          placeholder="Tell us more about the issue..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
        />
      </div>

      <button
        disabled={!canSubmit}
        onClick={() =>
          onSubmit?.({
            reasonCategory: reason,
            details,
            reportedAt: new Date().toISOString(),
          })
        }
        className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit Report
      </button>
    </div>
  );
}

// Demo: two buttons that each open the modal with different sample activities
// (one reported job with multiple reports, one pending company registration).
// export default function ModalDemo() {
//   const [selected, setSelected] = useState(null);
//   const jobActivity = ACTIVITIES.find((a) => a.type === "reported_job");
//   const companyActivity = ACTIVITIES.find((a) => a.type === "company_registration");

//   return (
//     <div className="flex min-h-screen items-center justify-center gap-4 bg-slate-50 p-10">
//       <button
//         onClick={() => setSelected(jobActivity)}
//         className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-900 hover:text-white"
//       >
//         View Activity (Reported Job)
//         <ChevronRight className="h-3.5 w-3.5" />
//       </button>
//       <button
//         onClick={() => setSelected(companyActivity)}
//         className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-900 hover:text-white"
//       >
//         View Activity (Company Registration)
//         <ChevronRight className="h-3.5 w-3.5" />
//       </button>

//       <ActivityModal activity={selected} onClose={() => setSelected(null)} />
//     </div>
//   );
// }
