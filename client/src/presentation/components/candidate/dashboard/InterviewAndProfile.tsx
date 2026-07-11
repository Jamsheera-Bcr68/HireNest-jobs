import {
  ChevronRight,
  Building2,
  Calendar,
  CalendarOff,
  Circle,
  Clock,
  Wifi,
  ArrowUpRight,
} from 'lucide-react';
import type { Interview, ProfileData } from './CandidateDashboardContainer';
import { SectionHeader } from './AppStatusChart';
import { useNavigate } from 'react-router-dom';

type Props = {
  isLoading: boolean;

  profileData: ProfileData;

  interview: Interview | null;
};
function InterviewAndProfile({
  isLoading,
  interview,

  profileData,
}: Props) {
  const navigate = useNavigate();
  console.log('profile data', profileData);

  return (
    <div className="space-y-5">
      {/* Upcoming interview */}
      <div
        className="rise rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05] bg-slate-900 text-white relative overflow-hidden"
        style={{ animationDelay: '120ms' }}
      >
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-teal-500/20 blur-2xl" />
        <div className="relative">
          <SectionHeaderDark
            title="Upcoming Interview"
            actionLabel=""
            onClick={() => navigate('/candidate/interviews')}
          />
          {isLoading ? (
            <div className="space-y-3 mt-2">
              <SkeletonBlock className="h-4 w-2/3 bg-white/10" />
              <SkeletonBlock className="h-3 w-1/2 bg-white/10" />
              <SkeletonBlock className="h-3 w-full bg-white/10" />
            </div>
          ) : !interview ? (
            <div className="py-6 flex flex-col items-center text-center">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                <CalendarOff size={18} className="text-white/60" />
              </div>
              <p className="text-sm font-medium">No interviews scheduled</p>
              <p className="text-xs text-white/50 mt-1 max-w-[200px]">
                Keep applying — your next interview invite will show up here.
              </p>
              <button className="mt-4 text-xs font-semibold bg-white text-slate-900 px-4 py-2 rounded-full hover:bg-slate-100 transition-colors">
                Browse jobs
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2.5">
                {/* <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                </span> */}
                <span className="text-[10.5px] uppercase tracking-wider text-teal-400 font-semibold"></span>
              </div>
              <h4 className="font-display text-lg font-semibold leading-snug">
                {interview.role}
              </h4>
              <p className="text-xs text-white/60 flex items-center gap-1.5 mt-1">
                <Building2 size={13} /> {interview.company}
              </p>
              <div className="mt-4 space-y-2 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar size={13} className="text-teal-400 shrink-0" />
                  {interview.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-teal-400 shrink-0" />
                  {interview.time}
                </div>
                <div className="flex items-center gap-2">
                  <Wifi size={13} className="text-teal-400 shrink-0" />
                  {interview.mode}
                </div>
              </div>
              <button
                onClick={() => navigate('/candidate/interviews')}
                className="mt-5 w-full text-xs font-semibold bg-teal-500 hover:bg-teal-400 transition-colors text-slate-900 py-2.5 rounded-full inline-flex items-center justify-center gap-1.5"
              >
                View All <ArrowUpRight size={13} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Profile completion */}
      <div
        className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05]"
        style={{ animationDelay: '160ms' }}
      >
        <SectionHeader actionLabel={''} title="Profile Completion" />
        {isLoading ? (
          <div className="flex items-center gap-4">
            <SkeletonBlock className="w-20 h-20 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-2/3" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <CircularProgress percent={profileData.completion} />

            <div className="flex-1">
              {profileData.profileMissing?.length ? (
                <>
                  <p className="text-xs text-slate-500 mb-2">
                    Missing sections:
                  </p>
                  <ul className="space-y-1.5">
                    {profileData.profileMissing.map((m) => (
                      <li
                        key={m}
                        className="flex items-center gap-1.5 text-[12px] text-slate-600"
                      >
                        <Circle size={12} className="text-amber-500 shrink-0" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-green-600 font-medium">
                  🎉 No missing sections. Your profile is complete!
                </p>
              )}
            </div>
          </div>
        )}
        {!isLoading &&
          (profileData.profileMissing?.length > 0 ? (
            <button className="mt-4 w-full text-xs font-semibold bg-slate-900 text-white py-2.5 rounded-full hover:bg-slate-800 transition-colors">
              Complete your profile
            </button>
          ) : (
            <button className="mt-4 w-full text-xs font-semibold bg-slate-900 text-white py-2.5 rounded-full hover:bg-slate-800 transition-colors">
              Edit Profile
            </button>
          ))}
      </div>
    </div>
  );
}

type SectionHeaderDarkProps = {
  title: string;
  actionLabel: string;
  onClick: () => void;
};
function SectionHeaderDark({
  title,
  actionLabel,
  onClick,
}: SectionHeaderDarkProps) {
  return (
    <div className="flex items-center justify-between mb-1">
      <h3 className="font-display text-[15px] font-semibold text-white tracking-tight">
        {title}
      </h3>
      {actionLabel && (
        <button className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50 hover:text-white/80 transition-colors">
          {actionLabel}
          <ChevronRight size={12} onClick={onClick} />
        </button>
      )}
    </div>
  );
}

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-slate-200/70 ${className}`} />
  );
}
export default InterviewAndProfile;

function CircularProgress({ percent = 0, size = 80, stroke = 7 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#e2e8f0"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#0d9488"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(90 ${size / 2} ${size / 2})`}
        className="font-display"
        fontSize="16"
        fontWeight="600"
        fill="#0f172a"
      >
        {percent}%
      </text>
    </svg>
  );
}
