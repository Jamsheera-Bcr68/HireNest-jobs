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
import {type CompanyProfileType } from '../../../../../types/dtos/profile-types/user.types';

/* ------------------------------------------------------------------ */
/* Types and constants                                                 */
/* ------------------------------------------------------------------ */

type ViewState = 'verified' | 'pending' | 'rejected' | 'suspended';
type Tone = 'success' | 'warning' | 'danger' | 'muted';
type DotTone = 'success' | 'danger' | 'accent' | 'neutral';
type ReapplyEntry = CompanyProfileType['reapplyDetails'][number];

interface HistoryItem {
  key: string;
  date?: string;
  title: string;
  detail?: string;
  tone: DotTone;
}

interface Props {
  company: CompanyProfileType
  /** Maximum reapplications allowed. Not part of the company type, so it is a prop. */
  maxReapply?: number;
  /** Show the Reapply button (rejected state). Open your reapply form/modal here. */
  onReapply?: () => void;
  /** Show a Contact support button (suspended state, or no reapplications left). */
  onContactSupport?: () => void;
}

const DEFAULT_MAX_REAPPLY = 3;

const REJECTION_CHECKLIST = [
  'is a clear, full-page scan with all four corners visible',
  'shows a company name that matches your profile exactly',
  'has a registration number that matches official records',
];

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
  success: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200',
  muted: 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400',
};

const DOT_TONE: Record<DotTone, string> = {
  success: 'bg-green-500',
  danger: 'bg-red-500',
  accent: 'bg-blue-600 dark:bg-blue-400',
  neutral: 'bg-neutral-400',
};

const MUTED = 'text-neutral-600 dark:text-neutral-400';
const FAINT = 'text-neutral-500';

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
  if (s.includes('suspend') || s.includes('block') || s.includes('inactive')) return 'suspended';
  if (s.includes('reject') || s.includes('declin')) return 'rejected';
  if (s.includes('pend') || s.includes('review') || s.includes('submit') || s.includes('unverif'))
    return 'pending';
  if (s.includes('verif') || s.includes('approv') || s.includes('active')) return 'verified';
  return isVerified ? 'verified' : 'pending';
}

function formatDate(value?: string, style: 'long' | 'short' = 'long'): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).format(d);
}

/** "registration_certificate" -> "Registration certificate" */
function humanize(value?: string): string {
  if (!value) return 'Registration document';
  const text = value.replace(/[_-]+/g, ' ').trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Reads the first non-empty string among several possible keys. */
function pick(obj: unknown, keys: string[]): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  for (const k of keys) {
    const v = (obj as Record<string, unknown>)[k];
    if (typeof v === 'string' && v.trim()) return v;
  }
  return undefined;
}

const toUrl = (site: string) => (/^https?:\/\//i.test(site) ? site : `https://${site}`);
const stripProtocol = (site: string) => site.replace(/^https?:\/\//i, '').replace(/\/$/, '');

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                     */
/* ------------------------------------------------------------------ */

const CARD =
  'rounded-xl border border-neutral-200 bg-white p-5 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100';

const BTN =
  'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-neutral-300 bg-transparent px-3.5 py-[7px] text-[13px] text-neutral-900 hover:bg-black/5 active:scale-[0.98] dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400';

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
        PILL_TONE[tone],
      )}
    >
      <Icon size={14} aria-hidden="true" />
      {children}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className={cx('text-xs', MUTED)}>{label}</dt>
      <dd className="m-0 mt-0.5 text-sm [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}

function ReapplyMeter({ used, max, paused }: { used: number; max: number; paused: boolean }) {
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
                    : 'bg-blue-600 dark:bg-blue-400',
              )}
            />
          ))}
        </span>
      </div>
      <span className="text-[13px] font-medium">{text}</span>
    </div>
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
  const [showDetails, setShowDetails] = useState(false);
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

  /* ----- history (newest first) ----- */
  const history = useMemo<HistoryItem[]>(() => {
    const items: HistoryItem[] = [
      {
        key: 'submitted',
        date: company.createdAt,
        title: 'Application submitted',
        detail: company.document?.type ? `${humanize(company.document.type)} uploaded` : undefined,
        tone: 'neutral',
      },
    ];

    (company.reapplyDetails ?? []).forEach((entry: ReapplyEntry, i: number) => {
      items.push({
        key: `reapply-${i}`,
        date: pick(entry, ['reappliedAt', 'date', 'createdAt', 'submittedAt', 'updatedAt']),
        title: `Reapplication ${i + 1}`,
        detail: pick(entry, ['reason', 'reasonForReject', 'rejectReason', 'remark', 'message', 'note']),
        tone: 'accent',
      });
    });

    if (state === 'verified') {
      items.push({ key: 'final', date: company.joinedAt, title: 'Company verified', tone: 'success' });
    } else if (state === 'rejected') {
      items.push({ key: 'final', title: 'Verification rejected', detail: reason, tone: 'danger' });
    } else if (state === 'suspended') {
      items.push({ key: 'final', title: 'Account suspended', detail: reason, tone: 'danger' });
    }

    return items.reverse();
  }, [company.createdAt, company.joinedAt, company.document, company.reapplyDetails, state, reason]);

  const confirmReapply = () => {
    setConfirming(false);
    onReapply?.();
  };

  const showMeter = used > 0 || state === 'rejected' || state === 'suspended';

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Registration details                                       */}
      {/* ============================================================ */}
      <section className={CARD} aria-labelledby="reg-details-title">
        <h2 id="reg-details-title" className="m-0 mb-4 text-base font-medium">
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
            {[company.address?.state, company.address?.country].filter(Boolean).join(', ') || '-'}
          </Field>
          <Field label="Website">
            {company.website ? (
              <a
                href={toUrl(company.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:underline dark:text-blue-300"
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
              className="text-blue-700 hover:underline dark:text-blue-300"
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
      <section className={CARD} aria-labelledby="verification-title">
        <header className="mb-1 flex flex-wrap items-center justify-between gap-3">
          <h2 id="verification-title" className="m-0 text-base font-medium">
            Company verification
          </h2>
          <Pill tone={ui.tone} Icon={ui.Icon}>
            {ui.label}
          </Pill>
        </header>
        <p className={cx('mb-4 mt-0 text-[13px]', MUTED)}>{ui.blurb}</p>

        {meta.length > 0 && (
          <div className="mb-4 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
            {meta.map(([label, value]) => (
              <div key={label} className="rounded-lg bg-neutral-100 px-3.5 py-3 dark:bg-neutral-800">
                <div className={cx('text-xs', MUTED)}>{label}</div>
                <div className="mt-0.5 text-[15px] font-medium">{value}</div>
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
              {reason || 'The submitted company registration document could not be verified.'}
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={BTN}
                aria-expanded={showDetails}
                onClick={() => setShowDetails((s) => !s)}
              >
                View details
              </button>
              {canReapply && onReapply && (
                <button type="button" className={BTN} onClick={() => setConfirming((c) => !c)}>
                  Reapply
                </button>
              )}
              {!canReapply && onContactSupport && (
                <button type="button" className={BTN} onClick={onContactSupport}>
                  Contact support
                </button>
              )}
            </div>

            {showDetails && (
              <div className={PANEL}>
                <div className="mb-1 text-[13px] font-medium">
                  Before you reapply, check that the file
                </div>
                <ul className={cx('m-0 list-disc pl-[18px] text-[13px] leading-[1.7]', MUTED)}>
                  {REJECTION_CHECKLIST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

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
                <p className={cx('mb-2.5 mt-0 text-[13px]', MUTED)}>
                  You will have {maxReapply - used - 1} left after this one. Upload the corrected
                  document to continue.
                </p>
                <div className="flex gap-2">
                  <button type="button" className={BTN} onClick={confirmReapply}>
                    Continue
                  </button>
                  <button type="button" className={BTN} onClick={() => setConfirming(false)}>
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
              {reason || 'Your account is under review by the HireNest team. Your listings are paused.'}
            </p>
            {onContactSupport && (
              <button type="button" className={BTN} onClick={onContactSupport}>
                Contact support
              </button>
            )}
          </div>
        )}

        {/* ---- document ---- */}
        <h3 className="mb-2 mt-0 text-[13px] font-medium">Submitted document</h3>
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-neutral-200 px-3.5 py-2.5 dark:border-neutral-700">
          <span
            aria-hidden="true"
            className={cx(
              'flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800',
              MUTED,
            )}
          >
            <FileText size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-sm">{humanize(company.document?.type)}</div>
            <div className={cx('text-xs', FAINT)}>
              {company.document?.file ? 'File uploaded' : 'No file uploaded'}
            </div>
          </div>
          {company.document?.file && (
            <a
             href={`${import.meta.env.VITE_BACKEND_URL}${company.document.file}`}
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
        {showMeter && <ReapplyMeter used={used} max={maxReapply} paused={state === 'suspended'} />}

        {/* ---- history ---- */}
        <button
          type="button"
          className={BTN}
          aria-expanded={showHistory}
          aria-controls={historyId}
          onClick={() => setShowHistory((s) => !s)}
        >
          <History size={16} aria-hidden="true" />
          {showHistory ? 'Hide verification history' : 'View verification history'}
          {showHistory ? (
            <ChevronUp size={16} aria-hidden="true" />
          ) : (
            <ChevronDown size={16} aria-hidden="true" />
          )}
        </button>

        {showHistory && (
          <ol
            id={historyId}
            className="mb-0 ml-1 mt-4 list-none border-l border-neutral-300 p-0 pl-[18px] dark:border-neutral-600"
          >
            {history.map((item) => (
              <li key={item.key} className="relative pb-3.5 last:pb-0">
                <span
                  aria-hidden="true"
                  className={cx(
                    'absolute -left-6 top-[5px] h-2.5 w-2.5 rounded-full border-2 border-white dark:border-neutral-900',
                    DOT_TONE[item.tone],
                  )}
                />
                {formatDate(item.date, 'short') && (
                  <div className={cx('text-xs', FAINT)}>{formatDate(item.date, 'short')}</div>
                )}
                <div className="text-sm font-medium">{item.title}</div>
                {item.detail && <div className={cx('text-[13px]', MUTED)}>{item.detail}</div>}
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}