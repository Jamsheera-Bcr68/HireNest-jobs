import React, { useState, useMemo, useCallback, createContext, useContext } from "react";
import {
  Search,
  MapPin,
  Bookmark,
  Briefcase,
  Clock,
  Users,
  CalendarClock,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowRight,
  Building2,
  AlertTriangle,
  FolderSearch,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
  Sun,
  Moon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Theme system — plain color-token map, not Tailwind's dark: variant */
/*  (safe regardless of how the host project's Tailwind is configured) */
/* ------------------------------------------------------------------ */

const THEME_TOKENS = {
  light: {
    pageBg: "bg-slate-50",
    pageText: "text-slate-900",
    navBg: "bg-white",
    navBorder: "border-slate-100",
    navMuted: "text-slate-500",
    navActive: "text-purple-600",
    navIconBg: "hover:bg-slate-100",
    navAvatarBg: "bg-purple-50 border border-purple-100 text-purple-600",
    heroGradient: "bg-gradient-to-b from-purple-50 via-white to-white",
    blobA: "bg-purple-100",
    blobB: "bg-violet-100",
    heading: "text-slate-900",
    subheading: "text-slate-500",
    surface: "bg-white",
    surfaceBorder: "border-slate-200",
    inputFocus: "focus-within:bg-purple-50",
    inputText: "text-slate-700",
    placeholder: "placeholder:text-slate-400",
    dividerV: "bg-slate-200",
    dividerH: "bg-slate-100",
    iconMuted: "text-slate-400",
    cardBg: "bg-white",
    cardBorder: "border-slate-200",
    cardHoverBorder: "hover:border-purple-200",
    cardTitle: "text-slate-900",
    cardTitleHover: "group-hover:text-purple-700",
    companyName: "text-slate-700",
    verifiedText: "text-slate-400",
    metaBadgeBg: "bg-purple-50",
    metaBadgeText: "text-purple-700",
    metaBadgeBorder: "border-purple-100",
    skillChipBg: "bg-slate-50",
    skillChipText: "text-slate-600",
    skillChipBorder: "border-slate-200",
    salaryText: "text-slate-800",
    footerText: "text-slate-500",
    dropdownBg: "bg-white",
    dropdownBorder: "border-slate-200",
    dropdownHover: "hover:bg-purple-50",
    filterBg: "bg-white",
    filterText: "text-slate-600",
    filterBorder: "border-slate-200",
    filterHover: "hover:border-purple-200 hover:text-purple-700",
    filterActiveBg: "bg-purple-50",
    filterActiveText: "text-purple-700",
    filterActiveBorder: "border-purple-200",
    dashedBorder: "border-slate-300",
    chipBg: "bg-purple-50",
    chipText: "text-purple-700",
    chipBorder: "border-purple-100",
    resultsMuted: "text-slate-500",
    resultsStrong: "text-slate-800",
    sortHover: "hover:bg-slate-50",
    skeletonBg: "bg-slate-100",
    emptyIconBg: "bg-purple-50",
    emptyIconBorder: "border-purple-100",
    emptyIconText: "text-purple-500",
    errorIconBg: "bg-rose-50",
    errorIconBorder: "border-rose-100",
    errorIconText: "text-rose-500",
    warnText: "text-amber-600",
    paginationText: "text-slate-500",
    paginationHover: "hover:bg-purple-50",
    toastBg: "bg-slate-900",
    toastText: "text-white",
    overlay: "bg-slate-900",
  },
  dark: {
    pageBg: "bg-slate-950",
    pageText: "text-slate-100",
    navBg: "bg-slate-900",
    navBorder: "border-slate-800",
    navMuted: "text-slate-400",
    navActive: "text-purple-400",
    navIconBg: "hover:bg-slate-800",
    navAvatarBg: "bg-purple-950 border border-purple-800 text-purple-300",
    heroGradient: "bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950",
    blobA: "bg-purple-950",
    blobB: "bg-violet-950",
    heading: "text-white",
    subheading: "text-slate-400",
    surface: "bg-slate-900",
    surfaceBorder: "border-slate-800",
    inputFocus: "focus-within:bg-slate-800",
    inputText: "text-slate-100",
    placeholder: "placeholder:text-slate-500",
    dividerV: "bg-slate-800",
    dividerH: "bg-slate-800",
    iconMuted: "text-slate-500",
    cardBg: "bg-slate-900",
    cardBorder: "border-slate-800",
    cardHoverBorder: "hover:border-purple-700",
    cardTitle: "text-white",
    cardTitleHover: "group-hover:text-purple-400",
    companyName: "text-slate-300",
    verifiedText: "text-slate-500",
    metaBadgeBg: "bg-purple-950",
    metaBadgeText: "text-purple-300",
    metaBadgeBorder: "border-purple-900",
    skillChipBg: "bg-slate-800",
    skillChipText: "text-slate-300",
    skillChipBorder: "border-slate-700",
    salaryText: "text-slate-100",
    footerText: "text-slate-400",
    dropdownBg: "bg-slate-900",
    dropdownBorder: "border-slate-800",
    dropdownHover: "hover:bg-slate-800",
    filterBg: "bg-slate-900",
    filterText: "text-slate-300",
    filterBorder: "border-slate-800",
    filterHover: "hover:border-purple-700 hover:text-purple-300",
    filterActiveBg: "bg-purple-950",
    filterActiveText: "text-purple-300",
    filterActiveBorder: "border-purple-800",
    dashedBorder: "border-slate-700",
    chipBg: "bg-purple-950",
    chipText: "text-purple-300",
    chipBorder: "border-purple-900",
    resultsMuted: "text-slate-400",
    resultsStrong: "text-slate-100",
    sortHover: "hover:bg-slate-800",
    skeletonBg: "bg-slate-800",
    emptyIconBg: "bg-purple-950",
    emptyIconBorder: "border-purple-900",
    emptyIconText: "text-purple-400",
    errorIconBg: "bg-rose-950",
    errorIconBorder: "border-rose-900",
    errorIconText: "text-rose-400",
    warnText: "text-amber-400",
    paginationText: "text-slate-400",
    paginationHover: "hover:bg-slate-800",
    toastBg: "bg-slate-100",
    toastText: "text-slate-900",
    overlay: "bg-black",
  },
};

const ThemeContext = createContext({ mode: "light", t: THEME_TOKENS.light, toggle: () => {} });
const useTheme = () => useContext(ThemeContext);

function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Mock data — shaped exactly like the JobCardDto from the backend    */
/* ------------------------------------------------------------------ */

const MOCK_JOBS = [
  {
    id: "job_1",
    companyLogo: "",
    companyName: "TechNova Solutions",
    location: { city: "Kochi", state: "Kerala" },
    title: "Senior MERN Stack Developer",
    jobType: "Full Time",
    experience: "2-5 Years",
    mode: "Remote",
    min_salary: 600000,
    max_salary: 1000000,
    createdAt: daysAgo(2),
    lastDate: daysFromNow(15),
    skills: ["React", "Node.js", "MongoDB", "TypeScript", "Redux"],
    vacancyCount: "5",
    status: "active",
  },
  {
    id: "job_2",
    companyLogo: "",
    companyName: "Northwind Labs",
    location: { city: "Bengaluru", state: "Karnataka" },
    title: "Frontend Developer",
    jobType: "Full Time",
    experience: "1-3 Years",
    mode: "Hybrid",
    min_salary: 500000,
    max_salary: 800000,
    createdAt: daysAgo(0),
    lastDate: daysFromNow(2),
    skills: ["React", "Tailwind CSS", "JavaScript"],
    vacancyCount: "3",
    status: "active",
  },
  {
    id: "job_3",
    companyLogo: "",
    companyName: "Orbit Systems",
    location: { city: "Pune", state: "Maharashtra" },
    title: "Backend Developer",
    jobType: "Full Time",
    experience: "3-6 Years",
    mode: "On-site",
    min_salary: 700000,
    max_salary: 1200000,
    createdAt: daysAgo(5),
    lastDate: daysFromNow(20),
    skills: ["Node.js", "Express", "MongoDB", "Docker", "AWS", "Redis"],
    vacancyCount: "2",
    status: "active",
  },
  {
    id: "job_4",
    companyLogo: "",
    companyName: "Bluepeak Digital",
    location: { city: "Kochi", state: "Kerala" },
    title: "Full Stack Developer",
    jobType: "Full Time",
    experience: "2-4 Years",
    mode: "Remote",
    min_salary: 650000,
    max_salary: 950000,
    createdAt: daysAgo(1),
    lastDate: daysFromNow(30),
    skills: ["React", "Node.js", "MongoDB", "GraphQL"],
    vacancyCount: "4",
    status: "active",
  },
  {
    id: "job_5",
    companyLogo: "",
    companyName: "Studio Loom",
    location: { city: "Remote", state: "" },
    title: "UI/UX Designer",
    jobType: "Contract",
    experience: "2-5 Years",
    mode: "Remote",
    min_salary: 450000,
    max_salary: 700000,
    createdAt: daysAgo(7),
    lastDate: daysFromNow(10),
    skills: ["Figma", "Design Systems", "Prototyping"],
    vacancyCount: "1",
    status: "active",
  },
  {
    id: "job_6",
    companyLogo: "",
    companyName: "Cirrus Cloud Co.",
    location: { city: "Hyderabad", state: "Telangana" },
    title: "DevOps Engineer",
    jobType: "Full Time",
    experience: "3-7 Years",
    mode: "Hybrid",
    min_salary: 900000,
    max_salary: 1500000,
    createdAt: daysAgo(3),
    lastDate: daysFromNow(1),
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    vacancyCount: "2",
    status: "active",
  },
  {
    id: "job_7",
    companyLogo: "",
    companyName: "Vertex Analytics",
    location: { city: "Chennai", state: "Tamil Nadu" },
    title: "MERN Stack Developer",
    jobType: "Full Time",
    experience: "0-2 Years",
    mode: "On-site",
    min_salary: 400000,
    max_salary: 650000,
    createdAt: daysAgo(10),
    lastDate: daysFromNow(25),
    skills: ["React", "Express", "MongoDB", "Node.js"],
    vacancyCount: "6",
    status: "active",
  },
  {
    id: "job_8",
    companyLogo: "",
    companyName: "Paperplane Ventures",
    location: { city: "Kochi", state: "Kerala" },
    title: "Frontend Engineer",
    jobType: "Part Time",
    experience: "1-3 Years",
    mode: "Remote",
    min_salary: 350000,
    max_salary: 550000,
    createdAt: daysAgo(4),
    lastDate: daysFromNow(12),
    skills: ["React", "TypeScript", "Tailwind CSS"],
    vacancyCount: "2",
    status: "active",
  },
  {
    id: "job_9",
    companyLogo: "",
    companyName: "Ledger & Co",
    location: { city: "Mumbai", state: "Maharashtra" },
    title: "Backend Engineer (Node.js)",
    jobType: "Full Time",
    experience: "4-8 Years",
    mode: "On-site",
    min_salary: 1100000,
    max_salary: 1800000,
    createdAt: daysAgo(14),
    lastDate: daysFromNow(18),
    skills: ["Node.js", "PostgreSQL", "MongoDB", "Microservices"],
    vacancyCount: "1",
    status: "active",
  },
];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}
function daysFromNow(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
}

/* ------------------------------------------------------------------ */
/*  Formatting helpers                                                  */
/* ------------------------------------------------------------------ */

function formatSalary(min, max) {
  const fmt = (n) => {
    if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
    return `₹${n.toLocaleString("en-IN")}`;
  };
  return `${fmt(min)} – ${fmt(max)} / yr`;
}

function formatRelativeDate(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Posted today";
  if (days === 1) return "Posted yesterday";
  if (days < 7) return `Posted ${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "Posted 1 week ago";
  if (weeks < 5) return `Posted ${weeks} weeks ago`;
  return `Posted ${Math.floor(days / 30)} month${days > 60 ? "s" : ""} ago`;
}

function formatDeadline(iso) {
  const diffMs = new Date(iso).getTime() - Date.now();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const label = new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  if (days <= 0) return { text: "Closed", urgent: true };
  if (days <= 3) return { text: `${days} day${days > 1 ? "s" : ""} left`, urgent: true };
  return { text: `Apply before ${label}`, urgent: false };
}

function formatLocation(location) {
  if (!location) return "Location not specified";
  if (location.city === "Remote" && !location.state) return "Remote";
  return [location.city, location.state].filter(Boolean).join(", ");
}

/* ------------------------------------------------------------------ */
/*  Theme toggle                                                        */
/* ------------------------------------------------------------------ */

function ThemeToggle() {
  const { mode, toggle } = useTheme();
  const isDark = mode === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cx(
        "relative h-9 w-16 rounded-full border transition-colors duration-300 flex items-center px-1",
        isDark ? "bg-slate-800 border-slate-700" : "bg-purple-50 border-purple-100"
      )}
    >
      <span
        className={cx(
          "h-7 w-7 rounded-full flex items-center justify-center shadow-md transition-transform duration-300",
          isDark ? "translate-x-7 bg-slate-900 text-purple-300" : "translate-x-0 bg-white text-purple-600"
        )}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Small reusable pieces                                              */
/* ------------------------------------------------------------------ */

function CompanyLogo({ src, name }) {
  const { t } = useTheme();
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (src && !broken) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setBroken(true)}
        className={cx(
          "h-11 w-11 sm:h-12 sm:w-12 rounded-xl object-cover ring-1 shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5",
          t.surface,
          t.surfaceBorder
        )}
      />
    );
  }
  return (
    <div
      className={cx(
        "h-11 w-11 sm:h-12 sm:w-12 shrink-0 rounded-xl flex items-center justify-center font-semibold text-sm shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5",
        t.metaBadgeBg,
        t.metaBadgeText,
        "ring-1",
        t.metaBadgeBorder
      )}
    >
      {initials}
    </div>
  );
}

function SkillChip({ label }) {
  const { t } = useTheme();
  return (
    <span className={cx("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", t.skillChipBg, t.skillChipText, t.skillChipBorder)}>
      {label}
    </span>
  );
}

function JobMetaBadge({ icon: Icon, label }) {
  const { t } = useTheme();
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium border", t.metaBadgeBg, t.metaBadgeText, t.metaBadgeBorder)}>
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </span>
  );
}

function SalaryDisplay({ min, max }) {
  const { t } = useTheme();
  return <p className={cx("text-base font-semibold", t.salaryText)}>{formatSalary(min, max)}</p>;
}

function DeadlineBadge({ lastDate }) {
  const { t } = useTheme();
  const { text, urgent } = formatDeadline(lastDate);
  return <span className={cx("text-xs font-medium", urgent ? t.warnText : t.footerText)}>{text}</span>;
}

function BookmarkButton({ saved, onToggle }) {
  const { t } = useTheme();
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved jobs" : "Save job"}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={cx(
        "h-9 w-9 sm:h-8 sm:w-8 shrink-0 rounded-lg flex items-center justify-center transition-all duration-200",
        saved ? "bg-purple-600 text-white shadow-md" : cx(t.surface, t.iconMuted, "border", t.surfaceBorder, "hover:text-purple-600 hover:border-purple-300")
      )}
    >
      <Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Job card                                                           */
/* ------------------------------------------------------------------ */

const VISIBLE_SKILLS = 3;

function JobCard({ job, saved, onToggleSave, onView }) {
  const { t } = useTheme();
  const extraSkills = Math.max(0, job.skills.length - VISIBLE_SKILLS);
  const isNew = (Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24) < 1;

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => onView(job.id)}
      onKeyDown={(e) => (e.key === "Enter" ? onView(job.id) : null)}
      className={cx(
        "group relative rounded-2xl border p-4 sm:p-5 flex flex-col gap-3.5 sm:gap-4 cursor-pointer min-w-0",
        "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl transform-gpu",
        t.cardBg,
        t.cardBorder,
        t.cardHoverBorder
      )}
    >
      {/* top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <CompanyLogo src={job.companyLogo} name={job.companyName} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className={cx("text-sm font-medium truncate max-w-40 sm:max-w-36", t.companyName)}>{job.companyName}</p>
              {isNew && (
                <span className={cx("text-xs font-semibold tracking-wide rounded-full px-1.5 py-0.5 border", t.metaBadgeText, t.metaBadgeBg, t.metaBadgeBorder)}>
                  New
                </span>
              )}
            </div>
            <p className={cx("text-xs", t.verifiedText)}>Verified company</p>
          </div>
        </div>
        <BookmarkButton saved={saved} onToggle={() => onToggleSave(job.id)} />
      </div>

      {/* title */}
      <div className="min-w-0">
        <h3 className={cx("text-base sm:text-lg font-semibold leading-snug break-words", t.cardTitle, t.cardTitleHover, "transition-colors")}>
          {job.title}
        </h3>
        <p className={cx("mt-1 flex items-center gap-1 text-sm", t.subheading)}>
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{formatLocation(job.location)}</span>
        </p>
      </div>

      {/* meta badges */}
      <div className="flex flex-wrap gap-1.5">
        <JobMetaBadge icon={Briefcase} label={job.jobType} />
        <JobMetaBadge icon={Building2} label={job.mode} />
        <JobMetaBadge icon={Clock} label={job.experience} />
      </div>

      {/* salary */}
      <SalaryDisplay min={job.min_salary} max={job.max_salary} />

      {/* skills */}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, VISIBLE_SKILLS).map((s) => (
          <SkillChip key={s} label={s} />
        ))}
        {extraSkills > 0 && <SkillChip label={`+${extraSkills}`} />}
      </div>

      <div className={cx("h-px", t.dividerH)} />

      {/* footer */}
      <div className={cx("flex items-center justify-between text-xs", t.footerText)}>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {job.vacancyCount} openings
        </span>
        <span>{formatRelativeDate(job.createdAt)}</span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-xs min-w-0">
          <CalendarClock className={cx("h-3.5 w-3.5 shrink-0", t.iconMuted)} />
          <DeadlineBadge lastDate={job.lastDate} />
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-purple-600 group-hover:gap-2 transition-all shrink-0">
          View job <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

function JobCardSkeleton() {
  const { t } = useTheme();
  return (
    <div className={cx("rounded-2xl border p-4 sm:p-5 flex flex-col gap-4 animate-pulse", t.cardBg, t.cardBorder)}>
      <div className="flex items-center gap-3">
        <div className={cx("h-12 w-12 rounded-xl", t.skeletonBg)} />
        <div className="flex-1 space-y-2">
          <div className={cx("h-3 w-28 rounded", t.skeletonBg)} />
          <div className={cx("h-2 w-16 rounded", t.skeletonBg)} />
        </div>
        <div className={cx("h-8 w-8 rounded-lg", t.skeletonBg)} />
      </div>
      <div className="space-y-2">
        <div className={cx("h-4 w-3/4 rounded", t.skeletonBg)} />
        <div className={cx("h-3 w-1/2 rounded", t.skeletonBg)} />
      </div>
      <div className="flex gap-1.5">
        <div className={cx("h-5 w-16 rounded-lg", t.skeletonBg)} />
        <div className={cx("h-5 w-16 rounded-lg", t.skeletonBg)} />
        <div className={cx("h-5 w-16 rounded-lg", t.skeletonBg)} />
      </div>
      <div className={cx("h-4 w-28 rounded", t.skeletonBg)} />
      <div className="flex gap-1.5">
        <div className={cx("h-5 w-14 rounded-full", t.skeletonBg)} />
        <div className={cx("h-5 w-14 rounded-full", t.skeletonBg)} />
        <div className={cx("h-5 w-10 rounded-full", t.skeletonBg)} />
      </div>
      <div className={cx("h-px", t.dividerH)} />
      <div className="flex justify-between">
        <div className={cx("h-3 w-16 rounded", t.skeletonBg)} />
        <div className={cx("h-3 w-16 rounded", t.skeletonBg)} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty / error states                                               */
/* ------------------------------------------------------------------ */

function EmptyJobsState({ onClear }) {
  const { t } = useTheme();
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 sm:py-20 px-6">
      <div className={cx("h-16 w-16 rounded-2xl border flex items-center justify-center mb-5", t.emptyIconBg, t.emptyIconBorder)}>
        <FolderSearch className={cx("h-7 w-7", t.emptyIconText)} />
      </div>
      <h3 className={cx("text-lg font-semibold", t.cardTitle)}>No jobs found</h3>
      <p className={cx("mt-1.5 text-sm max-w-sm", t.subheading)}>Try adjusting your search or removing some filters.</p>
      <button
        onClick={onClear}
        className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 text-white text-sm font-medium px-4 py-2.5 hover:bg-purple-700 transition-colors shadow-md"
      >
        Clear all filters
      </button>
    </div>
  );
}

function JobErrorState({ onRetry }) {
  const { t } = useTheme();
  return (
    <div className="col-span-full flex flex-col items-center justify-center text-center py-16 sm:py-20 px-6">
      <div className={cx("h-16 w-16 rounded-2xl border flex items-center justify-center mb-5", t.errorIconBg, t.errorIconBorder)}>
        <AlertTriangle className={cx("h-7 w-7", t.errorIconText)} />
      </div>
      <h3 className={cx("text-lg font-semibold", t.cardTitle)}>Unable to load jobs</h3>
      <p className={cx("mt-1.5 text-sm max-w-sm", t.subheading)}>Something went wrong while fetching job opportunities.</p>
      <button
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-purple-600 text-white text-sm font-medium px-4 py-2.5 hover:bg-purple-700 transition-colors shadow-md"
      >
        Try again
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                              */
/* ------------------------------------------------------------------ */

function CandidateNavbar() {
  const { t } = useTheme();
  return (
    <header className={cx("sticky top-0 z-30 border-b", t.navBg, t.navBorder)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className={cx("text-lg font-bold", t.cardTitle)}>
            Hire<span className="text-purple-600">Nest</span>
          </span>
          <nav className={cx("hidden md:flex items-center gap-6 text-sm font-medium", t.navMuted)}>
            <a className={t.navActive} href="#">Jobs</a>
            <a className="hover:text-purple-600 transition-colors" href="#">Companies</a>
            <a className="hover:text-purple-600 transition-colors" href="#">My Applications</a>
            <a className="hover:text-purple-600 transition-colors" href="#">Saved Jobs</a>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button className={cx("h-9 w-9 rounded-full hidden sm:flex items-center justify-center transition-colors", t.navMuted, t.navIconBg)}>
            <Bell className="h-5 w-5" />
          </button>
          <button className={cx("h-9 w-9 rounded-full flex items-center justify-center", t.navAvatarBg)}>
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero + search bar                                                   */
/* ------------------------------------------------------------------ */

function JobSearchHero({ keyword, setKeyword, location, setLocation, onSearch }) {
  const { t } = useTheme();
  return (
    <section className={cx("relative overflow-hidden", t.heroGradient)}>
      <div className={cx("pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl", t.blobA)} />
      <div className={cx("pointer-events-none absolute top-10 right-0 h-64 w-64 rounded-full blur-3xl", t.blobB)} />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10 text-center">
        <h1 className={cx("text-2xl sm:text-4xl font-bold tracking-tight", t.heading)}>Find your next opportunity</h1>
        <p className={cx("mt-3 max-w-xl mx-auto text-sm sm:text-base", t.subheading)}>
          Discover jobs that match your skills, experience, and career goals.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch();
          }}
          className={cx("mt-7 sm:mt-8 rounded-2xl border shadow-xl p-2 flex flex-col sm:flex-row gap-2", t.surface, t.surfaceBorder)}
        >
          <div className={cx("flex items-center gap-2 flex-1 px-3 py-3 sm:py-2.5 rounded-xl transition-colors", t.inputFocus)}>
            <Search className={cx("h-4 w-4 shrink-0", t.iconMuted)} />
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Job title, skills, or keywords"
              className={cx("w-full bg-transparent outline-none text-sm min-w-0", t.inputText, t.placeholder)}
            />
          </div>
          <div className={cx("hidden sm:block w-px my-2", t.dividerV)} />
          <div className={cx("flex items-center gap-2 flex-1 px-3 py-3 sm:py-2.5 rounded-xl transition-colors", t.inputFocus)}>
            <MapPin className={cx("h-4 w-4 shrink-0", t.iconMuted)} />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
              className={cx("w-full bg-transparent outline-none text-sm min-w-0", t.inputText, t.placeholder)}
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-purple-600 text-white text-sm font-medium px-6 py-3 sm:py-2.5 hover:bg-purple-700 active:scale-95 transition-all shadow-md"
          >
            Search Jobs
          </button>
        </form>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter controls (desktop row + mobile drawer)                       */
/* ------------------------------------------------------------------ */

const FILTER_DEFS = [
  { key: "jobType", label: "Job Type", options: ["Full Time", "Part Time", "Contract"] },
  { key: "mode", label: "Work Mode", options: ["Remote", "Hybrid", "On-site"] },
  { key: "experience", label: "Experience", options: ["0-2 Years", "1-3 Years", "2-5 Years", "3-7 Years", "4-8 Years"] },
];

function FilterDropdown({ label, options, active, onToggle }) {
  const { t } = useTheme();
  const [open, setOpen] = useState(false);
  const count = active.length;
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cx(
          "inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors",
          count > 0 ? cx(t.filterActiveBorder, t.filterActiveBg, t.filterActiveText) : cx(t.filterBorder, t.filterBg, t.filterText, t.filterHover)
        )}
      >
        {label}
        {count > 0 && <span className="text-purple-500">({count})</span>}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className={cx("absolute z-20 mt-2 w-52 rounded-xl border shadow-lg p-2", t.dropdownBg, t.dropdownBorder)}>
            {options.map((opt) => (
              <label key={opt} className={cx("flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm cursor-pointer", t.filterText, t.dropdownHover)}>
                <input type="checkbox" checked={active.includes(opt)} onChange={() => onToggle(opt)} className="accent-purple-600 h-3.5 w-3.5" />
                {opt}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function JobFilterControls({ filters, onToggleFilter, onOpenMobileFilters }) {
  const { t } = useTheme();
  const activeCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <>
      {/* desktop / tablet row */}
      <div className="hidden sm:flex flex-wrap items-center gap-2">
        {FILTER_DEFS.map((f) => (
          <FilterDropdown key={f.key} label={f.label} options={f.options} active={filters[f.key]} onToggle={(opt) => onToggleFilter(f.key, opt)} />
        ))}
        <button
          className={cx(
            "inline-flex items-center gap-1.5 rounded-xl border border-dashed px-3.5 py-2 text-sm font-medium transition-colors",
            t.dashedBorder,
            t.footerText,
            "hover:border-purple-300 hover:text-purple-600"
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          More Filters
        </button>
      </div>

      {/* mobile: single "Filters" button */}
      <button
        onClick={onOpenMobileFilters}
        className={cx("sm:hidden inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-sm font-medium", t.filterBorder, t.filterBg, t.filterText)}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeCount > 0 && <span className="text-purple-600">({activeCount})</span>}
      </button>
    </>
  );
}

function MobileFilterDrawer({ open, onClose, filters, onToggleFilter, onClearAll }) {
  const { t } = useTheme();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 sm:hidden">
      <div className={cx("absolute inset-0 opacity-40", t.overlay)} onClick={onClose} />
      <div className={cx("absolute bottom-0 left-0 right-0 rounded-t-2xl border-t max-h-screen overflow-y-auto", t.surface, t.surfaceBorder)}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h3 className={cx("text-base font-semibold", t.cardTitle)}>Filters</h3>
          <button onClick={onClose} className={cx("h-8 w-8 rounded-lg flex items-center justify-center", t.footerText, t.dropdownHover)}>
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 pb-6 space-y-5">
          {FILTER_DEFS.map((f) => (
            <div key={f.key}>
              <p className={cx("text-sm font-medium mb-2", t.cardTitle)}>{f.label}</p>
              <div className="flex flex-wrap gap-2">
                {f.options.map((opt) => {
                  const active = filters[f.key].includes(opt);
                  return (
                    <button
                      key={opt}
                      onClick={() => onToggleFilter(f.key, opt)}
                      className={cx(
                        "rounded-full border px-3 py-2 text-sm font-medium transition-colors",
                        active ? cx(t.filterActiveBorder, t.filterActiveBg, t.filterActiveText) : cx(t.filterBorder, t.filterBg, t.filterText)
                      )}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className={cx("sticky bottom-0 flex gap-3 px-5 py-4 border-t", t.surface, t.surfaceBorder)}>
          <button onClick={onClearAll} className={cx("flex-1 rounded-xl border py-3 text-sm font-medium", t.filterBorder, t.filterText)}>
            Clear all
          </button>
          <button onClick={onClose} className="flex-1 rounded-xl bg-purple-600 text-white py-3 text-sm font-medium hover:bg-purple-700 transition-colors">
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}

function ActiveFilterChips({ chips, onRemove, onClearAll }) {
  const { t } = useTheme();
  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={cx("text-xs font-medium", t.footerText)}>Active filters:</span>
      {chips.map((c) => (
        <span key={c} className={cx("inline-flex items-center gap-1 rounded-full border text-xs font-medium pl-2.5 pr-1.5 py-1", t.chipBg, t.chipBorder, t.chipText)}>
          {c}
          <button onClick={() => onRemove(c)} className={cx("rounded-full p-0.5", t.dropdownHover)}>
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <button onClick={onClearAll} className={cx("text-xs font-medium ml-1 hover:text-purple-600", t.footerText)}>
        Clear all
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Results header                                                      */
/* ------------------------------------------------------------------ */

const SORT_OPTIONS = ["Most Relevant", "Newest", "Salary: High to Low", "Salary: Low to High"];

function JobResultsHeader({ count, sort, setSort }) {
  const { t } = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <p className={cx("text-sm", t.resultsMuted)}>
        <span className={cx("font-semibold", t.resultsStrong)}>{count.toLocaleString("en-IN")}</span> jobs found
      </p>
      <div className="relative">
        <button onClick={() => setOpen((o) => !o)} className={cx("inline-flex items-center gap-1.5 text-sm font-medium hover:text-purple-600", t.filterText)}>
          Sort by: <span className={t.resultsStrong}>{sort}</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className={cx("absolute right-0 z-20 mt-2 w-52 rounded-xl border shadow-lg p-1.5", t.dropdownBg, t.dropdownBorder)}>
              {SORT_OPTIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setSort(o);
                    setOpen(false);
                  }}
                  className={cx(
                    "w-full text-left px-2.5 py-2 rounded-lg text-sm transition-colors",
                    o === sort ? cx(t.filterActiveBg, t.filterActiveText, "font-medium") : cx(t.filterText, t.sortHover)
                  )}
                >
                  {o}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination                                                          */
/* ------------------------------------------------------------------ */

function Pagination({ page, totalPages, setPage }) {
  const { t } = useTheme();
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex items-center justify-center flex-wrap gap-1.5 pt-4">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className={cx("inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium disabled:opacity-40", t.paginationText, "hover:text-purple-600")}
      >
        <ChevronLeft className="h-4 w-4" /> <span className="hidden sm:inline">Previous</span>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={cx("h-9 w-9 rounded-lg text-sm font-medium transition-colors", p === page ? "bg-purple-600 text-white shadow-md" : cx(t.paginationText, t.paginationHover))}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={cx("inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium disabled:opacity-40", t.paginationText, "hover:text-purple-600")}
      >
        <span className="hidden sm:inline">Next</span> <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

const PAGE_SIZE = 6;
const emptyFilters = { jobType: [], mode: [], experience: [] };

function JobListingPageInner() {
  const { t } = useTheme();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [saved, setSaved] = useState(() => new Set());
  const [toast, setToast] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // demo-only view state so loading / empty / error states can be inspected
  const [viewState, setViewState] = useState("loaded"); // loaded | loading | empty | error

  const toggleFilter = useCallback((key, opt) => {
    setPage(1);
    setFilters((prev) => {
      const has = prev[key].includes(opt);
      return { ...prev, [key]: has ? prev[key].filter((o) => o !== opt) : [...prev[key], opt] };
    });
  }, []);

  const removeChip = useCallback((chip) => {
    setPage(1);
    setFilters((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) next[k] = next[k].filter((v) => v !== chip);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setFilters(emptyFilters);
    setKeyword("");
    setLocation("");
    setPage(1);
    setViewState("loaded");
  }, []);

  const toggleSave = useCallback((id) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleView = useCallback((id) => {
    setToast(`Navigating to /jobs/${id}`);
    window.clearTimeout(handleView._t);
    handleView._t = window.setTimeout(() => setToast(""), 1800);
  }, []);

  const filteredJobs = useMemo(() => {
    if (viewState === "empty") return [];
    let result = MOCK_JOBS.filter((job) => {
      const kw = keyword.trim().toLowerCase();
      const matchesKeyword =
        !kw || job.title.toLowerCase().includes(kw) || job.companyName.toLowerCase().includes(kw) || job.skills.some((s) => s.toLowerCase().includes(kw));

      const loc = location.trim().toLowerCase();
      const matchesLocation = !loc || formatLocation(job.location).toLowerCase().includes(loc);

      const matchesJobType = filters.jobType.length === 0 || filters.jobType.includes(job.jobType);
      const matchesMode = filters.mode.length === 0 || filters.mode.includes(job.mode);
      const matchesExperience = filters.experience.length === 0 || filters.experience.includes(job.experience);

      return matchesKeyword && matchesLocation && matchesJobType && matchesMode && matchesExperience;
    });

    switch (sort) {
      case "Newest":
        result = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Salary: High to Low":
        result = [...result].sort((a, b) => b.max_salary - a.max_salary);
        break;
      case "Salary: Low to High":
        result = [...result].sort((a, b) => a.min_salary - b.min_salary);
        break;
      default:
        break; // Most Relevant — keep natural order
    }
    return result;
  }, [keyword, location, filters, sort, viewState]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const pagedJobs = filteredJobs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeChips = [...filters.jobType, ...filters.mode, ...filters.experience];

  const simulateLoading = () => {
    setViewState("loading");
    window.setTimeout(() => setViewState("loaded"), 1200);
  };

  return (
    <div className={cx("min-h-screen transition-colors duration-300", t.pageBg, t.pageText)} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <CandidateNavbar />

      <JobSearchHero keyword={keyword} setKeyword={setKeyword} location={location} setLocation={setLocation} onSearch={() => setPage(1)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col gap-4 -mt-1 sm:-mt-2 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <JobFilterControls filters={filters} onToggleFilter={toggleFilter} onOpenMobileFilters={() => setMobileFiltersOpen(true)} />

            {/* demo controls — not part of the real product, just for showcasing states */}
            <div className="hidden md:flex items-center gap-1.5 text-xs">
              <button onClick={simulateLoading} className={cx("px-2.5 py-1.5 rounded-lg border", t.filterBorder, t.footerText, "hover:text-purple-600")}>
                Preview loading
              </button>
              <button onClick={() => setViewState("empty")} className={cx("px-2.5 py-1.5 rounded-lg border", t.filterBorder, t.footerText, "hover:text-purple-600")}>
                Preview empty
              </button>
              <button onClick={() => setViewState("error")} className={cx("px-2.5 py-1.5 rounded-lg border", t.filterBorder, t.footerText, "hover:text-purple-600")}>
                Preview error
              </button>
            </div>
          </div>
          <ActiveFilterChips chips={activeChips} onRemove={removeChip} onClearAll={clearAll} />
        </div>

        <div className="mb-5">
          <JobResultsHeader count={filteredJobs.length} sort={sort} setSort={setSort} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {viewState === "loading" && Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}

          {viewState === "error" && <JobErrorState onRetry={() => setViewState("loaded")} />}

          {viewState === "loaded" && pagedJobs.length === 0 && <EmptyJobsState onClear={clearAll} />}

          {viewState === "loaded" &&
            pagedJobs.map((job) => <JobCard key={job.id} job={job} saved={saved.has(job.id)} onToggleSave={toggleSave} onView={handleView} />)}
        </div>

        {viewState === "loaded" && pagedJobs.length > 0 && (
          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </div>
        )}
      </main>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onToggleFilter={toggleFilter}
        onClearAll={clearAll}
      />

      {toast && (
        <div className={cx("fixed bottom-6 left-1/2 -translate-x-1/2 text-sm px-4 py-2.5 rounded-xl shadow-lg z-50", t.toastBg, t.toastText)}>{toast}</div>
      )}
    </div>
  );
}

export default function JobListingPage() {
  const [mode, setMode] = useState("light");
  const toggle = useCallback(() => setMode((m) => (m === "light" ? "dark" : "light")), []);
  const value = useMemo(() => ({ mode, t: THEME_TOKENS[mode], toggle }), [mode, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      <JobListingPageInner />
    </ThemeContext.Provider>
  );
}