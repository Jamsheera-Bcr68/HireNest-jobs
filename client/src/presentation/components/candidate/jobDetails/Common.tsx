import type { ReactNode } from 'react';
import { useTheme } from '../../../../contexts/ThemeContext';
import { Check, type LucideIcon } from 'lucide-react';
import { formatSalary } from '../../../../utils/salary-format';
import type { JobDetailsDto } from '../../../../types/dtos/job.dto';

export const PrimaryButton = ({
  children,
  onClick,
  disabled,
  fullWidth,
  className = '',
}: {
  children: ReactNode;
 onClick: () => void | Promise<void>;
  disabled?: boolean;
  fullWidth?: string;
  className: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`${fullWidth ? 'w-full' : 'px-7'} h-11 flex items-center justify-center gap-1.5 text-[14px] font-semibold rounded-xl
      transition-all duration-200 ease-out
      ${
        disabled
          ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-none'
          : `text-white bg-gradient-to-br from-purple-600 via-purple-600 to-fuchsia-600
             shadow-[0_6px_16px_-4px_rgba(147,51,234,0.5)]
             lg:hover:shadow-[0_10px_24px_-4px_rgba(147,51,234,0.6)]
             lg:hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_3px_8px_-2px_rgba(147,51,234,0.5)]`
      } ${className}`}
  >
    {children}
  </button>
);
type CompanyLogoType = {
  name: string;
  src?: string;
};
const baseUrl=import.meta.env.VITE_BACKEND_URL
export const CompanyLogo = ({ name='', src }: CompanyLogoType) => {
  const { t } = useTheme();
  if (src)
    return <img src={`${baseUrl}${src}`} alt={name} className="w-full h-full object-cover" />;
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span className={`font-bold text-sm ${t.metaBadgeText}`}>{initials}</span>
  );
};

export const Badge = ({
  icon: Icon,
  text,size
}: {
  icon: LucideIcon;
  text: string;
  size:number
}) => {
  const { t } = useTheme();

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[12px] ${t.filterBg} ${t.subheading} border ${t.surfaceBorder} rounded-full px-3 py-1`}
    >
      <Icon size={size} />
      {text}
    </span>
  );
};



export const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  children: ReactNode;
  icon?: LucideIcon;
}) => {
  const { t,mode } = useTheme();
const isDark=mode==='dark'
  return (
  <div
    className={`${t.surface} rounded-2xl border ${t.surfaceBorder} p-5 sm:p-6
      shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)]
      lg:transition-shadow
      lg:hover:shadow-[0_8px_24px_-6px_rgba(147,51,234,0.15)]`}
  >
    <h2
      className={`flex items-center gap-2 text-[15px] sm:text-base font-semibold mb-3 sm:mb-4 ${t.heading}`}
    >
      {Icon && (
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-lg ${
            isDark ? "bg-slate-100" : "bg-fuchsia-100"
          }`}
        >
          <Icon
            className={isDark ? "text-slate-700" : "text-fuchsia-800"}
            size={18}
          />
        </span>
      )}

      {title}
    </h2>

    {children}
  </div>
);
};

 export const CheckList = ({  items }:{items:string[]}) => 
 {
  const {t}=useTheme()
  return (<><ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className={`flex items-start gap-2 text-[14px] ${t.subheading}`}>
        <Check size={15} className="text-fuchsia-500 flex-shrink-0 mt-0.5" />
        <span className="break-words leading-relaxed">{item}</span>
      </li>
    ))}
  </ul></> )

 }

 export const JobOverviewCard = ({ job, glass, isDark }:{job:JobDetailsDto,glass?:boolean,isDark?:boolean}) => {

  const {t}=useTheme()
  return (
  <div
    className={`rounded-2xl border ${t.surfaceBorder} p-5 sm:p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)]
      ${glass ? `backdrop-blur-xl ${isDark ? 'bg-slate-900/70' : 'bg-white/70'}` : t.surface}`}
  >
    <h2 className={`text-[15px] sm:text-base font-semibold mb-4 ${t.heading}`}>Job Overview</h2>
    {/* 2-col on mobile/tablet to save vertical space, 1-col in the narrow desktop sidebar */}
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-3 text-[13px]">
      <OverviewRow  label="Job Type" value={job?.jobType} />
      <OverviewRow  label="Mode" value={job?.mode} />
      <OverviewRow  label="Experience" value={`${job?.experience} years`} />
      <OverviewRow  label="Salary" value={formatSalary(job?.min_salary, job?.max_salary)} />
      {job?.vacancyCount !== undefined && (
        <OverviewRow  label="Vacancies" value={`${job?.vacancyCount} ${Number(job?.vacancyCount) === 1 ? 'position' : 'positions'}`} />
      )}
      {job?.lastDate && (
        <OverviewRow
         
          label="Deadline"
          value={new Date(job.lastDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        />
      )}
    </div>
  </div>
);

 }

 const OverviewRow = ({ label, value }:{label:string,value:string}) => {
  const {t}=useTheme()
  return(
  <div className="min-w-0">
    <span className={`block text-[11px] mb-0.5 opacity-70 ${t.subheading}`}>{label}</span>
    <span className={`font-medium break-words ${t.resultsStrong}`}>{value}</span>
  </div>
);
 }

 

