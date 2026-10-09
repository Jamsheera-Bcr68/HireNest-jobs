import { useId, useMemo, useState } from 'react';
import {
  Ban,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  FileText,
  History,
  ShieldAlert,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
// TODO: change this path to wherever CompanyProfileType lives in your project
import {
  type ApplyType,
  type CompanyProfileType,
  type RegistrationStatus,
} from '../../../../../types/dtos/profile-types/user.types';
import { useTheme } from '../../../../../contexts/ThemeContext';

type ViewState = 'verified' | 'pending' | 'rejected' | 'suspended';
type Tone = 'success' | 'warning' | 'danger' | 'muted';

interface Props {
  company: CompanyProfileType;
  /** Maximum reapplications allowed. Not part of the company type, so it is a prop. */
  maxReapply?: number;
  /** Show the Reapply button (rejected state). Open your reapply form/modal here. */
  onReapply?: () => void;
  /** Show a Contact support button (suspended state, or no reapplications left). */
  onContactSupport?: () => void;
}

const DEFAULT_MAX_REAPPLY = 3;

const STATE_UI: Record<
  ViewState,
  { tone: Tone; Icon: LucideIcon; label: string; blurb: string }
> = {
  verified: {
    tone: 'success',
    Icon: BadgeCheck,
    label: 'Verified',
    blurb: 'Candidates see a Verified badge on your company profile.',
  },
  pending: {
    tone: 'warning',
    Icon: Clock,
    label: 'Under review',
    blurb:
      'Our team is reviewing your documents. This page updates when the review is complete.',
  },
  rejected: {
    tone: 'danger',
    Icon: ShieldAlert,
    label: 'Verification rejected',
    blurb: 'Fix the document below and reapply to get your Verified badge.',
  },
  suspended: {
    tone: 'danger',
    Icon: Ban,
    label: 'Suspended',
    blurb: 'Your Verified badge is hidden while the account is suspended.',
  },
};

const PILL_TONE: Record<Tone, string> = {
  success:
    'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  warning:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
  muted:
    'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
};

/** Dot color for a timeline entry, keyed directly by RegistrationStatus. */
const DOT_TONE: Record<RegistrationStatus, string> = {
  approved: 'bg-green-500',
  rejected: 'bg-red-500',
  pending: 'bg-blue-600 dark:bg-blue-400',
};

/** Pill styling for a timeline entry's status badge. */
const HISTORY_STATUS_UI: Record<
  RegistrationStatus,
  { label: string; pill: string }
> = {
  approved: {
    label: 'Approved',
    pill: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  },
  rejected: {
    label: 'Rejected',
    pill: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  },
  pending: {
    label: 'Pending',
    pill: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  },
};

const MUTED = 'text-neutral-600 dark:text-neutral-400';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const cx = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ');

/**
 * Maps your StatusType to one of four UI states. It matches on keywords,
 * so "approved", "VERIFIED", "under_review", "Rejected" all work.
 * Adjust here if your StatusType uses different words.
 */
function resolveState(status: unknown, isVerified: boolean): ViewState {
  const s = String(status ?? '').toLowerCase();
  if (s.includes('suspend') || s.includes('block') || s.includes('inactive'))
    return 'suspended';
  if (s.includes('reject') || s.includes('declin')) return 'rejected';
  if (
    s.includes('pend') ||
    s.includes('review') ||
    s.includes('submit') ||
    s.includes('unverif')
  )
    return 'pending';
  if (s.includes('verif') || s.includes('approv') || s.includes('active'))
    return 'verified';
  return isVerified ? 'verified' : 'pending';
}

function formatDate(
  value?: string | Date,
  style: 'long' | 'short' = 'long'
): string | undefined {
  if (!value) return undefined;
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime()))
    return typeof value === 'string' ? value : undefined;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).format(d);
}

function humanize(value?: string): string {
  if (!value) return 'Registration document';
  const text = value.replace(/[_-]+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const toUrl = (site: string) =>
  /^https?:\/\//i.test(site) ? site : `https://${site}`;
const stripProtocol = (site: string) =>
  site.replace(/^https?:\/\//i, '').replace(/\/$/, '');

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                     */
/* ------------------------------------------------------------------ */

const PANEL =
  'mt-3 rounded-lg border border-neutral-200 bg-white px-3.5 py-3 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100';

function Pill({
  tone,
  Icon,
  children,
}: {
  tone: Tone;
  Icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-[3px] text-xs',
        PILL_TONE[tone]
      )}
    >
      <Icon size={14} aria-hidden="true" />
      {children}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className={cx('text-xs', MUTED)}>{label}</dt>
      <dd className="m-0 mt-0.5 text-sm [overflow-wrap:anywhere]">
        {children}
      </dd>
    </div>
  );
}

function ReapplyMeter({
  used,
  max,
  paused,
}: {
  used: number;
  max: number;
  paused: boolean;
}) {
  const left = Math.max(max - used, 0);
  const text = paused
    ? 'Paused while suspended'
    : `${used} of ${max} used${left > 0 && used > 0 ? ` \u00b7 ${left} left` : ''}`;

  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-neutral-200 px-3.5 py-3 dark:border-neutral-700">
      <div className="flex items-center gap-3">
        <span className={cx('text-[13px]', MUTED)}>Reapplications</span>
        <span className="inline-flex gap-1" aria-hidden="true">
          {Array.from({ length: max }, (_, i) => (
            <span
              key={i}
              className={cx(
                'h-1.5 w-7 rounded-[3px]',
                i >= used
                  ? 'bg-neutral-300 dark:bg-neutral-600'
                  : used >= max
                    ? 'bg-red-400 dark:bg-red-500'
                    : 'bg-blue-600 dark:bg-blue-400'
              )}
            />
          ))}
        </span>
      </div>
      <span className="text-[13px] font-medium">{text}</span>
    </div>
  );
}

/** Single timeline entry for the verification/reapplication history. */
function HistoryEntry({ item }: { item: ApplyType }) {
  const status = HISTORY_STATUS_UI[item.status];
  const { t } = useTheme();

  return (
    <li className="relative pb-5 last:pb-0">
      {/* Timeline dot */}
      <span
        aria-hidden="true"
        className={cx(
          `absolute -left-6 top-[5px] h-2.5 w-2.5 rounded-full border-2 ${t.cardBg}`,
          DOT_TONE[item.status]
        )}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-sm font-medium ${t.cardTitle}`}>
          Application #{item.attempt}
        </span>

        <span
          className={cx(
            'rounded-full px-2 py-0.5 text-[11px] font-medium',
            status.pill
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Details */}
      <div className="mt-1 space-y-1 text-[13px]">
        <div className={t.subheading}>
          Submitted:{' '}
          <span className={`font-medium ${t.inputText}`}>
            {formatDate(item.submittedAt, 'short') ?? '-'}
          </span>
        </div>

        {item.reviewedAt && (
          <div className={t.subheading}>
            Reviewed:{' '}
            <span className={`font-medium ${t.inputText}`}>
              {formatDate(item.reviewedAt, 'short')}
            </span>
          </div>
        )}

        {item.status === 'rejected' && item.rejectedReason && (
          <div
            className={`mt-2 rounded-md border ${t.errorIconBorder} ${t.errorIconBg} px-3 py-2`}
          >
            <div className={`text-xs font-medium ${t.errorIconText}`}>
              Rejection reason
            </div>

            <div className={`mt-0.5 text-[13px] ${t.errorIconText}`}>
              {item.rejectedReason}
            </div>
          </div>
        )}
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export default function CompanyRegistrationDetails({
  company,
  maxReapply = DEFAULT_MAX_REAPPLY,
  onReapply,
  onContactSupport,
}: Props) {
  const [showHistory, setShowHistory] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const historyId = useId();

  const state = resolveState(company.status, company.isVerified);
  const ui = STATE_UI[state];

  const used = company.reapplyCount ?? 0;
  const canReapply = used < maxReapply;
  const reason = company.reasonForReject?.trim();

  /* ----- key dates ----- */

  const submitted = formatDate(company.createdAt);
  const verifiedOn = formatDate(company.joinedAt);
  const meta: Array<[string, string]> = [];
  if (state === 'pending' || state === 'rejected') {
    if (submitted) meta.push(['Submitted', submitted]);
  } else {
    if (submitted) meta.push(['Registered', submitted]);
    if (state === 'verified' && verifiedOn) meta.push(['Verified', verifiedOn]);
  }

  /* ----- document ----- */
  const docStatus =
    state === 'verified'
      ? { tone: 'success' as Tone, Icon: Check, label: 'Verified' }
      : state === 'pending'
        ? { tone: 'warning' as Tone, Icon: Clock, label: 'In review' }
        : state === 'rejected'
          ? { tone: 'danger' as Tone, Icon: X, label: 'Rejected' }
          : null;

  /* ----- history (newest first), normalized to ApplyType ----- */
  const history = useMemo<ApplyType[]>(() => {
    return [...(company.applyDetails ?? [])]
      .map((entry) => ({
        ...entry,

        submittedAt:
          entry.submittedAt instanceof Date
            ? entry.submittedAt
            : new Date(entry.submittedAt),
      }))
      .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  }, [company.applyDetails]);

  const confirmReapply = () => {
    setConfirming(false);
    onReapply?.();
  };

  const showMeter = used > 0 || state === 'rejected' || state === 'suspended';

  // return (
  //   <>

  //     <section className={CARD} aria-labelledby="reg-details-title">
  //       <h2 id="reg-details-title" className="m-0 mb-4 text-base font-medium">
  //         Registration details
  //       </h2>

  //       <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
  //         <Field label="Company name">
  //           <span className="inline-flex items-center gap-1.5">
  //             {company.companyName}
  //             {company.isVerified && (
  //               <BadgeCheck
  //                 size={16}
  //                 className="text-green-600 dark:text-green-400"
  //                 aria-label="Verified company"
  //               />
  //             )}
  //           </span>
  //         </Field>
  //         <Field label="Industry">{company.industry || '-'}</Field>
  //         <Field label="Company size">{company.size || '-'}</Field>
  //         <Field label="Started in">{company.startedIn || '-'}</Field>
  //         <Field label="Location">
  //           {[company.address?.state, company.address?.country]
  //             .filter(Boolean)
  //             .join(', ') || '-'}
  //         </Field>
  //         <Field label="Website">
  //           {company.website ? (
  //             <a
  //               href={toUrl(company.website)}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="inline-flex items-center gap-1 text-blue-700 hover:underline dark:text-blue-300"
  //             >
  //               {stripProtocol(company.website)}
  //               <ExternalLink size={13} aria-hidden="true" />
  //             </a>
  //           ) : (
  //             '-'
  //           )}
  //         </Field>
  //         <Field label="Official email">
  //           <a
  //             href={`mailto:${company.email}`}
  //             className="text-blue-700 hover:underline dark:text-blue-300"
  //           >
  //             {company.email}
  //           </a>
  //         </Field>
  //         <Field label="Phone">{company.phone || '-'}</Field>
  //       </dl>
  //     </section>

  //     {/* ============================================================ */}
  //     {/* 2. Verification / request details                             */}
  //     {/* ============================================================ */}
  //     <section className={CARD} aria-labelledby="verification-title">
  //       <header className="mb-1 flex flex-wrap items-center justify-between gap-3">
  //         <h2 id="verification-title" className="m-0 text-base font-medium">
  //           Company verification
  //         </h2>
  //         <Pill tone={ui.tone} Icon={ui.Icon}>
  //           {ui.label}
  //         </Pill>
  //       </header>
  //       <p className={cx('mb-4 mt-0 text-[13px]', MUTED)}>{ui.blurb}</p>

  //       {meta.length > 0 && (
  //         <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
  //           {meta.map(([label, value]) => (
  //             <div
  //               key={label}
  //               className="rounded-lg bg-neutral-100 px-3.5 py-3 dark:bg-neutral-800"
  //             >
  //               <div className={cx('text-xs', MUTED)}>{label}</div>
  //               <div className="mt-0.5 text-[15px] font-medium">{value}</div>
  //             </div>
  //           ))}
  //         </div>
  //       )}

  //       {/* ---- rejected ---- */}
  //       {state === 'rejected' && (
  //         <div
  //           role="alert"
  //           className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200"
  //         >
  //           <div className="mb-0.5 text-xs font-medium">Reason</div>
  //           <p className="mb-3 mt-0 text-sm">
  //             {reason ||
  //               'The submitted company registration document could not be verified.'}
  //           </p>

  //           <div className="flex flex-wrap gap-2">
  //             {canReapply && onReapply && (
  //               <button
  //                 type="button"
  //                 className={BTN}
  //                 onClick={() => setConfirming((c) => !c)}
  //               >
  //                 Reapply
  //               </button>
  //             )}
  //             {!canReapply && onContactSupport && (
  //               <button
  //                 type="button"
  //                 className={BTN}
  //                 onClick={onContactSupport}
  //               >
  //                 Contact support
  //               </button>
  //             )}
  //           </div>

  //           {!canReapply && (
  //             <p className="mb-0 mt-2.5 text-xs">
  //               You have used all {maxReapply} reapplications
  //               {onContactSupport ? '. Contact support to continue.' : '.'}
  //             </p>
  //           )}

  //           {confirming && canReapply && (
  //             <div className={PANEL}>
  //               <div className="mb-0.5 text-[13px] font-medium">
  //                 Use reapplication {used + 1} of {maxReapply}?
  //               </div>
  //               <p className={cx('mb-2.5 mt-0 text-[13px]', MUTED)}>
  //                 You will have {maxReapply - used - 1} left after this one.
  //                 Upload the corrected document to continue.
  //               </p>
  //               <div className="flex gap-2">
  //                 <button
  //                   type="button"
  //                   className={BTN}
  //                   onClick={confirmReapply}
  //                 >
  //                   Continue
  //                 </button>
  //                 <button
  //                   type="button"
  //                   className={BTN}
  //                   onClick={() => setConfirming(false)}
  //                 >
  //                   Cancel
  //                 </button>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       )}

  //       {/* ---- suspended ---- */}
  //       {state === 'suspended' && (
  //         <div
  //           role="alert"
  //           className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200"
  //         >
  //           <div className="mb-0.5 text-xs font-medium">Reason</div>
  //           <p className="mb-3 mt-0 text-sm">
  //             {reason ||
  //               'Your account is under review by the HireNest team. Your listings are paused.'}
  //           </p>
  //           {onContactSupport && (
  //             <button type="button" className={BTN} onClick={onContactSupport}>
  //               Contact support
  //             </button>
  //           )}
  //         </div>
  //       )}

  //       {/* ---- document ---- */}
  //       <h3 className="mb-2 mt-0 text-[13px] font-medium">
  //         Submitted document
  //       </h3>
  //       <div className="mb-4 flex items-center gap-3 rounded-lg border border-neutral-200 px-3.5 py-2.5 dark:border-neutral-700">
  //         <span
  //           aria-hidden="true"
  //           className={cx(
  //             'flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800',
  //             MUTED
  //           )}
  //         >
  //           <FileText size={18} />
  //         </span>
  //         <div className="min-w-0 flex-1">
  //           <div className="text-sm">{humanize(company.document?.type)}</div>
  //           <div className={cx('text-xs', FAINT)}>
  //             {company.document?.file ? 'File uploaded' : 'No file uploaded'}
  //           </div>
  //         </div>
  //         {company.document?.file && (
  //           <a
  //             href={`${import.meta.env.VITE_BACKEND_URL}${company.document.file}`}
  //             target="_blank"
  //             rel="noopener noreferrer"
  //             className={cx(BTN, 'px-2.5 py-1 text-xs')}
  //           >
  //             View
  //             <ExternalLink size={12} aria-hidden="true" />
  //           </a>
  //         )}
  //         {docStatus && (
  //           <Pill tone={docStatus.tone} Icon={docStatus.Icon}>
  //             {docStatus.label}
  //           </Pill>
  //         )}
  //       </div>

  //       {/* ---- reapplications ---- */}
  //       {showMeter && (
  //         <ReapplyMeter
  //           used={used}
  //           max={maxReapply}
  //           paused={state === 'suspended'}
  //         />
  //       )}

  //       {/* ---- history (single source of truth) ---- */}
  //       <button
  //         type="button"
  //         className={BTN}
  //         aria-expanded={showHistory}
  //         aria-controls={historyId}
  //         onClick={() => setShowHistory((s) => !s)}
  //       >
  //         <History size={16} aria-hidden="true" />
  //         {showHistory
  //           ? 'Hide verification history'
  //           : 'View verification history'}
  //         {showHistory ? (
  //           <ChevronUp size={16} aria-hidden="true" />
  //         ) : (
  //           <ChevronDown size={16} aria-hidden="true" />
  //         )}
  //       </button>

  //       {showHistory && (
  //         <ol
  //           id={historyId}
  //           className="mb-0 ml-1 mt-4 list-none border-l border-neutral-300 p-0 pl-[18px] dark:border-neutral-600"
  //         >
  //           {history.map((item) => (
  //             <HistoryEntry key={item.attempt} item={item} />
  //           ))}
  //         </ol>
  //       )}
  //     </section>
  //   </>
  // );
  const { t } = useTheme();
  const BTN = `inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-[7px] text-[13px] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${t.surfaceBorder} ${t.inputText} ${t.dropdownHover}`;
  return (
    <>
      <section
        className={`${t.cardBg} ${t.cardBorder} border rounded-lg shadow-md p-6`}
        aria-labelledby="reg-details-title"
      >
        <h2
          id="reg-details-title"
          className={`m-0 mb-4 text-base font-medium ${t.cardTitle}`}
        >
          Registration details
        </h2>

        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <Field label="Company name">
            <span className="inline-flex items-center gap-1.5">
              {company.companyName}
              {company.isVerified && (
                <BadgeCheck
                  size={16}
                  className="text-green-600 dark:text-green-400"
                  aria-label="Verified company"
                />
              )}
            </span>
          </Field>

          <Field label="Industry">{company.industry || '-'}</Field>
          <Field label="Company size">{company.size || '-'}</Field>
          <Field label="Started in">{company.startedIn || '-'}</Field>

          <Field label="Location">
            {[company.address?.state, company.address?.country]
              .filter(Boolean)
              .join(', ') || '-'}
          </Field>

          <Field label="Website">
            {company.website ? (
              <a
                href={toUrl(company.website)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${t.filterActiveText} hover:underline`}
              >
                {stripProtocol(company.website)}
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            ) : (
              '-'
            )}
          </Field>

          <Field label="Official email">
            <a
              href={`mailto:${company.email}`}
              className={`${t.filterActiveText} hover:underline`}
            >
              {company.email}
            </a>
          </Field>

          <Field label="Phone">{company.phone || '-'}</Field>
        </dl>
      </section>

      {/* ============================================================ */}
      {/* 2. Verification / request details                             */}
      {/* ============================================================ */}

      <section
        className={`${t.cardBg} ${t.cardBorder} border rounded-lg shadow-md p-6`}
        aria-labelledby="verification-title"
      >
        <header className="mb-1 flex flex-wrap items-center justify-between gap-3">
          <h2
            id="verification-title"
            className={`m-0 text-base font-medium ${t.cardTitle}`}
          >
            Company verification
          </h2>

          <Pill tone={ui.tone} Icon={ui.Icon}>
            {ui.label}
          </Pill>
        </header>

        <p className={cx('mb-4 mt-0 text-[13px]', t.subheading)}>{ui.blurb}</p>

        {meta.length > 0 && (
          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            {meta.map(([label, value]) => (
              <div
                key={label}
                className={`${t.metaBadgeBg} rounded-lg px-3.5 py-3`}
              >
                <div className={cx('text-xs', t.subheading)}>{label}</div>

                <div
                  className={`mt-0.5 text-[15px] font-medium ${t.inputText}`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---- rejected ---- */}
        {state === 'rejected' && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200"
          >
            <div className="mb-0.5 text-xs font-medium">Reason</div>

            <p className="mb-3 mt-0 text-sm">
              {reason ||
                'The submitted company registration document could not be verified.'}
            </p>

            <div className="flex flex-wrap gap-2">
              {canReapply && onReapply && (
                <button
                  type="button"
                  className={BTN}
                  onClick={() => setConfirming((c) => !c)}
                >
                  Reapply
                </button>
              )}

              {!canReapply && onContactSupport && (
                <button
                  type="button"
                  className={BTN}
                  onClick={onContactSupport}
                >
                  Contact support
                </button>
              )}
            </div>

            {!canReapply && (
              <p className="mb-0 mt-2.5 text-xs">
                You have used all {maxReapply} reapplications
                {onContactSupport ? '. Contact support to continue.' : '.'}
              </p>
            )}

            {confirming && canReapply && (
              <div className={PANEL}>
                <div className="mb-0.5 text-[13px] font-medium">
                  Use reapplication {used + 1} of {maxReapply}?
                </div>

                <p className={cx('mb-2.5 mt-0 text-[13px]', t.subheading)}>
                  You will have {maxReapply - used - 1} left after this one.
                  Upload the corrected document to continue.
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className={BTN}
                    onClick={confirmReapply}
                  >
                    Continue
                  </button>

                  <button
                    type="button"
                    className={BTN}
                    onClick={() => setConfirming(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---- suspended ---- */}
        {state === 'suspended' && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200"
          >
            <div className="mb-0.5 text-xs font-medium">Reason</div>

            <p className="mb-3 mt-0 text-sm">
              {reason ||
                'Your account is under review by the HireNest team. Your listings are paused.'}
            </p>

            {onContactSupport && (
              <button type="button" className={BTN} onClick={onContactSupport}>
                Contact support
              </button>
            )}
          </div>
        )}

        {/* ---- document ---- */}

        <h3 className={`mb-2 mt-0 text-[13px] font-medium ${t.cardTitle}`}>
          Submitted document
        </h3>

        <div
          className={`mb-4 flex items-center gap-3 rounded-lg border ${t.cardBorder} px-3.5 py-2.5`}
        >
          <span
            aria-hidden="true"
            className={cx(
              `flex h-8 w-8 flex-none items-center justify-center rounded-lg ${t.metaBadgeBg}`,
              t.subheading
            )}
          >
            <FileText size={18} />
          </span>

          <div className="min-w-0 flex-1">
            <div className={`text-sm ${t.inputText}`}>
              {humanize(company.document?.type)}
            </div>

            <div className={cx('text-xs', t.iconMuted)}>
              {company.document?.file ? 'File uploaded' : 'No file uploaded'}
            </div>
          </div>

          {company.document?.file && (
            <a
              href={`${company.document.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(BTN, 'px-2.5 py-1 text-xs')}
            >
              View
              <ExternalLink size={12} aria-hidden="true" />
            </a>
          )}

          {docStatus && (
            <Pill tone={docStatus.tone} Icon={docStatus.Icon}>
              {docStatus.label}
            </Pill>
          )}
        </div>

        {/* ---- reapplications ---- */}

        {showMeter && (
          <ReapplyMeter
            used={used}
            max={maxReapply}
            paused={state === 'suspended'}
          />
        )}

        {/* ---- history (single source of truth) ---- */}

        <button
          type="button"
          className={BTN}
          aria-expanded={showHistory}
          aria-controls={historyId}
          onClick={() => setShowHistory((s) => !s)}
        >
          <History size={16} aria-hidden="true" />

          {showHistory
            ? 'Hide verification history'
            : 'View verification history'}

          {showHistory ? (
            <ChevronUp size={16} aria-hidden="true" />
          ) : (
            <ChevronDown size={16} aria-hidden="true" />
          )}
        </button>

        {showHistory && (
          <ol
            id={historyId}
            className={`mb-0 ml-1 mt-4 list-none border-l ${t.cardBorder} p-0 pl-[18px]`}
          >
            {history.map((item) => (
              <HistoryEntry key={item.attempt} item={item} />
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
