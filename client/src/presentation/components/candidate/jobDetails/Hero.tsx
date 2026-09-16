import {
  Bookmark,
  Briefcase,
  Calendar,
  Check,
  Clock,
  MapPin,
} from 'lucide-react';
import { useTheme } from '../../../../contexts/ThemeContext';
import type { JobDetailsDto } from '../../../../types/dtos/job.dto';
import { PrimaryButton, CompanyLogo, Badge } from './Common';
import { formatSalary } from '../../../../utils/salary-format';

type Props = {
  job: JobDetailsDto;
  isApplied: boolean;
  isSaved: boolean;
  onToggleSave: () => Promise<void>;
  onApplyClick: (jobId: string) => Promise<void>;
};
function Hero({ job, isApplied, isSaved, onToggleSave, onApplyClick }: Props) {
  const { t } = useTheme();
  const isExpired = job.status === 'expired';
  console.log('from hero section');

  return (
    <>
      <div
        className={`relative rounded-2xl sm:rounded-3xl border ${t.surfaceBorder} overflow-hidden mb-6 lg:mb-8
            shadow-[0_4px_16px_-6px_rgba(0,0,0,0.1)] lg:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.12)] ${t.heroGradient}`}
      >
        <div
          className={`absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 lg:-top-16 lg:-left-16 lg:w-56 lg:h-56
              rounded-full ${t.blobA} blur-2xl lg:blur-3xl opacity-60 lg:opacity-70 lg:animate-[float_8s_ease-in-out_infinite]`}
        />
        <div
          className={`absolute -bottom-12 -right-8 w-36 h-36 sm:w-44 sm:h-44 lg:-bottom-20 lg:-right-10 lg:w-64 lg:h-64
              rounded-full ${t.blobB} blur-2xl lg:blur-3xl opacity-50 lg:opacity-60 lg:animate-[float_10s_ease-in-out_infinite_reverse]`}
        />

        <div className="relative p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl ${t.metaBadgeBg} border ${t.metaBadgeBorder}
                  flex items-center justify-center overflow-hidden flex-shrink-0 mx-auto sm:mx-0
                  shadow-[0_6px_16px_-6px_rgba(147,51,234,0.3)] lg:shadow-[0_8px_20px_-6px_rgba(147,51,234,0.35)]`}
            >
              <CompanyLogo name={job.companyName} src={job.companyLogo} />
            </div>

            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1
                  className={`text-xl sm:text-2xl lg:text-[28px] font-bold leading-tight break-words ${t.heading}`}
                >
                  {job.title}
                </h1>
                {isApplied && (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] ${t.appliedBg} ${t.appliedText} border ${t.appliedBorder} rounded-full px-2.5 py-1 font-medium flex-shrink-0`}
                  >
                    <Check size={12} />
                    Applied
                  </span>
                )}
              </div>
              <p
                className={`text-[14px] sm:text-[15px] mb-3 break-words ${t.subheading}`}
              >
                {job.companyName}
              </p>

              <div
                className={`flex items-center justify-center sm:justify-start gap-1.5 text-[13px] mb-4 ${t.subheading}`}
              >
                <MapPin size={13} className="flex-shrink-0" />
                <span className="break-words">
                  {job.location.state}, {job.location.country}
                </span>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                <Badge icon={Briefcase} size={12} text={job.mode} />
                <Badge icon={Clock} size={12} text={job.jobType} />
                <Badge
                  icon={Clock}
                  size={12}
                  text={`${job.experience} years`}
                />
              </div>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 text-[13px]">
                <span className={`font-semibold ${t.salaryText}`}>
                  {formatSalary(job.min_salary, job.max_salary)}
                </span>
                <span className={t.footerText}>
                  Posted{' '}
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '—'}
                </span>
                {job.lastDate && (
                  <span
                    className={`inline-flex items-center gap-1 ${t.deadlineDate}`}
                  >
                    <Calendar size={12} />
                    Apply before{' '}
                    {new Date(job.lastDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </div>

            {/* Save + Apply inline — laptop and up only, mobile/tablet use the sticky bar */}
            <div className="hidden lg:flex flex-shrink-0 items-center gap-2">
              <button
                type="button"
                aria-label={isSaved ? 'Unsave' : 'Save'}
                onClick={onToggleSave}
                className={`p-2.5 rounded-xl border ${t.surfaceBorder} ${t.surface} ${t.navIconBg} transition-all hover:scale-105 active:scale-95`}
              >
                <Bookmark
                  size={18}
                  className={isSaved ? 'text-fuchsia-500' : t.iconMuted}
                  fill={isSaved ? 'currentColor' : 'none'}
                />
              </button>
              <PrimaryButton
                disabled={isApplied || isExpired}
                onClick={() => onApplyClick(job.id)}
                className="bg-fuchsia-800 "
              >
                {isExpired ? (
                  'Expired'
                ) : isApplied ? (
                  <>
                    <Check size={16} />
                    Applied
                  </>
                ) : (
                  'Apply Now →'
                )}
              </PrimaryButton>
            </div>
          </div>

          {/* Save button for mobile/tablet, sits under the metadata since Apply lives in the sticky bar */}
          <div className="flex lg:hidden justify-center sm:justify-start mt-4">
            <button
              type="button"
              aria-label={isSaved ? 'Unsave' : 'Save'}
              onClick={() => onToggleSave}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[13px] font-medium ${t.surfaceBorder} ${t.surface} ${t.navIconBg} transition-colors`}
            >
              <Bookmark
                size={16}
                className={isSaved ? 'text-fuchsia-500' : t.iconMuted}
                fill={isSaved ? 'currentColor' : 'none'}
              />
              {isSaved ? 'Saved' : 'Save job'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
