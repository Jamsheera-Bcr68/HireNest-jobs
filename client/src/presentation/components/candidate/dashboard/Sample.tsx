import React, { useState, useEffect, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
    Tooltip as ReTooltip,
} from "recharts";
import {
  FileText,
  Eye,
  Video,
  Bookmark,
  UserCircle2,
  Bell,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Wifi,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  Circle,
  Upload,
  Search,
  ClipboardList,
  Building2,
  Inbox,
  CalendarOff,
  BellOff,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  MessageSquare,
  ThumbsUp,
  XCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static demo data — swap for real API data                          */
/* ------------------------------------------------------------------ */

const SUMMARY_CARDS = [
  {
    key: "applications",
    label: "Total Applications",
    value: 24,
    trend: "+3 this week",
    trendUp: true,
    icon: FileText,
    tone: "teal",
  },
  {
    key: "review",
    label: "Under Review",
    value: 8,
    trend: "5 awaiting reply",
    trendUp: null,
    icon: ClipboardList,
    tone: "amber",
  },
  {
    key: "interviews",
    label: "Interviews Scheduled",
    value: 2,
    trend: "Next: tomorrow",
    trendUp: true,
    icon: Video,
    tone: "indigo",
  },
  {
    key: "saved",
    label: "Saved Jobs",
    value: 12,
    trend: "2 closing soon",
    trendUp: false,
    icon: Bookmark,
    tone: "rose",
  },
  {
    key: "profile",
    label: "Profile Completion",
    value: "78%",
    trend: "3 sections left",
    trendUp: null,
    icon: UserCircle2,
    tone: "emerald",
  },
  {
    key: "notifications",
    label: "Unread Notifications",
    value: 4,
    trend: "1 from recruiter",
    trendUp: null,
    icon: Bell,
    tone: "slate",
  },
];


const STATUS_DATA = [
  { name: "Applied", value: 24, color: "#0d9488" },
  { name: "Under review", value: 8, color: "#d97706" },
  { name: "Shortlisted", value: 6, color: "#4f46e5" },
  { name: "Interview", value: 5, color: "#2563eb" },
  { name: "Rejected", value: 4, color: "#e11d48" },
  { name: "Hired", value: 1, color: "#059669" },
];

const RECENT_APPLICATIONS = [
  {
    company: "Northwind Studio",
    role: "Senior Product Designer",
    date: "Jul 3, 2026",
    status: "Interview",
    initials: "NW",
    color: "bg-blue-100 text-blue-700",
  },
  {
    company: "Vantage Health",
    role: "UX Researcher",
    date: "Jul 1, 2026",
    status: "Shortlisted",
    initials: "VH",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    company: "Ferra Robotics",
    role: "Frontend Engineer",
    date: "Jun 29, 2026",
    status: "Applied",
    initials: "FR",
    color: "bg-teal-100 text-teal-700",
  },
  {
    company: "Loomis & Co",
    role: "Product Designer",
    date: "Jun 27, 2026",
    status: "Rejected",
    initials: "LC",
    color: "bg-rose-100 text-rose-700",
  },
];

const NOTIFICATIONS = [
  {
    text: "Vantage Health moved your application to Shortlisted",
    time: "2h ago",
    icon: ThumbsUp,
    tone: "emerald",
  },
  {
    text: "Recruiter Anna sent you a message",
    time: "5h ago",
    icon: MessageSquare,
    tone: "indigo",
  },
  {
    text: "Interview confirmed with Northwind Studio",
    time: "1d ago",
    icon: CheckCircle2,
    tone: "teal",
  },
  {
    text: "Your application to Loomis & Co was not selected",
    time: "3d ago",
    icon: XCircle,
    tone: "rose",
  },
];

const UPCOMING_INTERVIEW = {
  company: "Northwind Studio",
  role: "Senior Product Designer",
  date: "Mon, Jul 6, 2026",
  time: "10:30 AM – 11:15 AM",
  mode: "Online",
  round: "Round 2 of 3",
};

const PROFILE_MISSING = ["Portfolio link", "Certifications", "Work references"];

const TONE_MAP = {
  teal: { bg: "bg-teal-50", text: "text-teal-700", ring: "ring-teal-600/10" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-600/10" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", ring: "ring-indigo-600/10" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-600/10" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-600/10" },
  slate: { bg: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-500/10" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", ring: "ring-blue-600/10" },
};

const STATUS_BADGE = {
  Applied: "bg-slate-100 text-slate-700 ring-slate-500/15",
  "Under review": "bg-amber-50 text-amber-700 ring-amber-600/15",
  Shortlisted: "bg-indigo-50 text-indigo-700 ring-indigo-600/15",
  Interview: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/15",
  Hired: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
};

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-display text-[15px] font-semibold text-slate-900 tracking-tight">
        {title}
      </h3>
      {actionLabel && (
        <button
          onClick={onAction}
          className="group inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-teal-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40 rounded-full px-2 py-1 -mr-2"
        >
          {actionLabel}
          <ChevronRight
            size={13}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>
      )}
    </div>
  );
}

function SkeletonBlock({ className }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200/70 ${className}`}
    />
  );
}

function EmptyState({ icon: Icon, title, subtitle, cta, onCta }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
        <Icon size={20} className="text-slate-400" strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <p className="text-xs text-slate-400 mt-1 max-w-[220px]">{subtitle}</p>
      {cta && (
        <button
          onClick={onCta}
          className="mt-4 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors px-4 py-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40"
        >
          {cta}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                       */
/* ------------------------------------------------------------------ */

export default function CandidateDashboard1() {
  const [isLoading, setIsLoading] = useState(true);
  const [demoEmpty, setDemoEmpty] = useState(false);
  const [greeting, setGreeting] = useState("Good afternoon");
  const [activeSlice, setActiveSlice] = useState(null);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening");
    const t = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  const totalStatus = useMemo(
    () => STATUS_DATA.reduce((sum, d) => sum + d.value, 0),
    []
  );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const notifications = demoEmpty ? [] : NOTIFICATIONS;
  const applications = demoEmpty ? [] : RECENT_APPLICATIONS;
  const hasInterview = !demoEmpty;

  return (
    <div className="min-h-screen w-full bg-[#f6f7f5] font-body text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
        @keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .rise { animation: rise 0.45s cubic-bezier(.16,.84,.44,1) backwards; }
        .card-hover { transition: box-shadow .25s ease, transform .25s ease; }
        .card-hover:hover { box-shadow: 0 8px 24px -8px rgba(15, 23, 42, 0.10); transform: translateY(-2px); }
        *:focus-visible { outline: none; }
      `}</style>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-8">
        {/* ---------------- Top bar: demo toggle (remove in production) ---------------- */}
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setDemoEmpty((v) => !v)}
            className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-600 transition-colors"
            title="Toggle to preview empty states"
          >
            {demoEmpty ? <ToggleRight size={15} className="text-teal-600" /> : <ToggleLeft size={15} />}
            Preview empty states
          </button>
        </div>

        {/* ---------------- Welcome section ---------------- */}
        <div className="rise flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-medium text-teal-700 mb-1.5">{today}</p>
            <h1 className="font-display text-[28px] sm:text-[32px] font-semibold tracking-tight text-slate-900">
              {greeting}, Maya
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-500" />
              You're 78% closer to a great match — one more interview to go this week.
            </p>
          </div>
        </div>

        {/* ---------------- Summary cards ---------------- */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5 mb-6">
          {SUMMARY_CARDS.map((c, i) => {
            const tone = TONE_MAP[c.tone];
            return (
              <div
                key={c.key}
                className="rise card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05]"
                style={{ animationDelay: `${60 + i * 40}ms` }}
              >
                {isLoading ? (
                  <>
                    <SkeletonBlock className="w-8 h-8 rounded-lg mb-3" />
                    <SkeletonBlock className="w-12 h-6 mb-2" />
                    <SkeletonBlock className="w-20 h-3" />
                  </>
                ) : (
                  <>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${tone.bg}`}>
                      <c.icon size={16} className={tone.text} strokeWidth={1.9} />
                    </div>
                    <div className="font-display text-2xl font-semibold text-slate-900 leading-none">
                      {c.value}
                    </div>
                    <div className="text-[11.5px] text-slate-500 mt-1.5">{c.label}</div>
                    <div
                      className={`text-[10.5px] mt-1 font-medium ${
                        c.trendUp === true
                          ? "text-emerald-600"
                          : c.trendUp === false
                          ? "text-rose-500"
                          : "text-slate-400"
                      }`}
                    >
                      {c.trend}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ---------------- Main two-column grid ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Application status chart */}
            <div
              className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05]"
              style={{ animationDelay: "120ms" }}
            >
              <SectionHeader title="Application Status" actionLabel="View all applications" />
              {isLoading ? (
                <div className="flex items-center gap-8 py-4">
                  <SkeletonBlock className="w-40 h-40 rounded-full" />
                  <div className="flex-1 space-y-2.5">
                    {[1, 2, 3, 4].map((i) => (
                      <SkeletonBlock key={i} className="h-3 w-full" />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-[170px] h-[170px] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={STATUS_DATA}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={54}
                          outerRadius={78}
                          paddingAngle={2}
                          stroke="none"
                          onMouseEnter={(_, idx) => setActiveSlice(idx)}
                          onMouseLeave={() => setActiveSlice(null)}
                        >
                          {STATUS_DATA.map((d, i) => (
                            <Cell
                              key={d.name}
                              fill={d.color}
                              opacity={activeSlice === null || activeSlice === i ? 1 : 0.35}
                            />
                          ))}
                        </Pie>
                        <ReTooltip
                          formatter={(value, name) => [`${value} applications`, name]}
                          contentStyle={{
                            borderRadius: 10,
                            border: "1px solid #e2e8f0",
                            fontSize: 12,
                            fontFamily: "IBM Plex Sans",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="font-display text-xl font-semibold">{totalStatus}</span>
                      <span className="text-[10px] text-slate-400">Total</span>
                    </div>
                  </div>

                  <div className="flex-1 w-full">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {STATUS_DATA.map((d) => (
                        <div key={d.name} className="flex items-center gap-2 text-xs">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: d.color }}
                          />
                          <span className="text-slate-600 truncate">{d.name}</span>
                          <span className="ml-auto font-medium text-slate-800">{d.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2">
                      <TrendingUp size={14} className="text-teal-600 mt-0.5 shrink-0" />
                      <p className="text-[11.5px] text-slate-500 leading-relaxed">
                        Most of your applications are in{" "}
                        <span className="font-medium text-slate-700">Under review</span> — expect
                        responses within the next few days.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Recent applications */}
            <div
              className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05]"
              style={{ animationDelay: "160ms" }}
            >
              <SectionHeader title="Recent Applications" actionLabel="View all applications" />
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <SkeletonBlock className="w-10 h-10 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-2">
                        <SkeletonBlock className="h-3 w-1/2" />
                        <SkeletonBlock className="h-2.5 w-1/3" />
                      </div>
                      <SkeletonBlock className="w-16 h-5 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : applications.length === 0 ? (
                <EmptyState
                  icon={Inbox}
                  title="No applications yet"
                  subtitle="Jobs you apply to will show up here so you can track their progress."
                  cta="Browse jobs"
                />
              ) : (
                <div className="divide-y divide-slate-100">
                  {applications.map((a, i) => (
                    <div
                      key={i}
                      className="py-3 flex items-center gap-3 group cursor-pointer -mx-2 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-semibold shrink-0 ${a.color}`}
                      >
                        {a.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-medium text-slate-800 truncate">{a.role}</p>
                        <p className="text-[11.5px] text-slate-400 truncate">
                          {a.company} · Applied {a.date}
                        </p>
                      </div>
                      <span
                        className={`text-[10.5px] font-medium px-2.5 py-1 rounded-full ring-1 whitespace-nowrap ${STATUS_BADGE[a.status]}`}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent notifications (moved into left column on wide screens via order utility) */}
            <div
              className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05] lg:hidden"
              style={{ animationDelay: "200ms" }}
            >
              <SectionHeader title="Recent Notifications" actionLabel="View all" />
              <NotificationList notifications={notifications} isLoading={isLoading} />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Upcoming interview */}
            <div
              className="rise rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05] bg-slate-900 text-white relative overflow-hidden"
              style={{ animationDelay: "120ms" }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-teal-500/20 blur-2xl" />
              <div className="relative">
                <SectionHeaderDark title="Upcoming Interview" actionLabel="View all" />
                {isLoading ? (
                  <div className="space-y-3 mt-2">
                    <SkeletonBlock className="h-4 w-2/3 bg-white/10" />
                    <SkeletonBlock className="h-3 w-1/2 bg-white/10" />
                    <SkeletonBlock className="h-3 w-full bg-white/10" />
                  </div>
                ) : !hasInterview ? (
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
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75 animate-ping" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
                      </span>
                      <span className="text-[10.5px] uppercase tracking-wider text-teal-400 font-semibold">
                        {UPCOMING_INTERVIEW.round}
                      </span>
                    </div>
                    <h4 className="font-display text-lg font-semibold leading-snug">
                      {UPCOMING_INTERVIEW.role}
                    </h4>
                    <p className="text-xs text-white/60 flex items-center gap-1.5 mt-1">
                      <Building2 size={13} /> {UPCOMING_INTERVIEW.company}
                    </p>
                    <div className="mt-4 space-y-2 text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-teal-400 shrink-0" />
                        {UPCOMING_INTERVIEW.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="text-teal-400 shrink-0" />
                        {UPCOMING_INTERVIEW.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Wifi size={13} className="text-teal-400 shrink-0" />
                        {UPCOMING_INTERVIEW.mode}
                      </div>
                    </div>
                    <button className="mt-5 w-full text-xs font-semibold bg-teal-500 hover:bg-teal-400 transition-colors text-slate-900 py-2.5 rounded-full inline-flex items-center justify-center gap-1.5">
                      View interview details <ArrowUpRight size={13} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile completion */}
            <div
              className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05]"
              style={{ animationDelay: "160ms" }}
            >
              <SectionHeader title="Profile Completion" />
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
                  <CircularProgress percent={78} />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-2">Missing sections:</p>
                    <ul className="space-y-1.5">
                      {PROFILE_MISSING.map((m) => (
                        <li key={m} className="flex items-center gap-1.5 text-[12px] text-slate-600">
                          <Circle size={12} className="text-amber-500 shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {!isLoading && (
                <button className="mt-4 w-full text-xs font-semibold bg-slate-900 text-white py-2.5 rounded-full hover:bg-slate-800 transition-colors">
                  Complete your profile
                </button>
              )}
            </div>

            {/* Recent notifications — desktop position */}
            <div
              className="hidden lg:block rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05]"
              style={{ animationDelay: "200ms" }}
            >
              <SectionHeader title="Recent Notifications" actionLabel="View all" />
              <NotificationList notifications={notifications} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {/* ---------------- Quick actions ---------------- */}
        <div className="rise mt-6" style={{ animationDelay: "240ms" }}>
          <h3 className="font-display text-[15px] font-semibold text-slate-900 mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {[
              { label: "Browse Jobs", icon: Search, tone: "teal" },
              { label: "Edit Profile", icon: UserCircle2, tone: "indigo" },
              { label: "Upload Resume", icon: Upload, tone: "amber" },
              { label: "View Applications", icon: FileText, tone: "blue" },
              { label: "Saved Jobs", icon: Bookmark, tone: "rose" },
            ].map((a) => {
              const tone = TONE_MAP[a.tone];
              return (
                <button
                  key={a.label}
                  className="card-hover bg-white rounded-2xl p-4 ring-1 ring-slate-900/[0.05] flex flex-col items-start gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/40"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${tone.bg}`}>
                    <a.icon size={16} className={tone.text} strokeWidth={1.9} />
                  </div>
                  <span className="text-[12.5px] font-medium text-slate-700">{a.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helper subcomponents                                                 */
/* ------------------------------------------------------------------ */

function SectionHeaderDark({ title, actionLabel }) {
  return (
    <div className="flex items-center justify-between mb-1">
      <h3 className="font-display text-[15px] font-semibold text-white tracking-tight">{title}</h3>
      {actionLabel && (
        <button className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50 hover:text-white/80 transition-colors">
          {actionLabel}
          <ChevronRight size={12} />
        </button>
      )}
    </div>
  );
}

function NotificationList({ notifications, isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <SkeletonBlock className="w-7 h-7 rounded-lg shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-2.5 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (notifications.length === 0) {
    return (
      <EmptyState
        icon={BellOff}
        title="You're all caught up"
        subtitle="New updates about your applications and interviews will appear here."
      />
    );
  }
  return (
    <div className="space-y-4">
      {notifications.map((n, i) => {
        const tone = TONE_MAP[n.tone] || TONE_MAP.slate;
        return (
          <div key={i} className="flex gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${tone.bg}`}>
              <n.icon size={13} className={tone.text} />
            </div>
            <div className="min-w-0">
              <p className="text-[12.5px] text-slate-700 leading-snug">{n.text}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">{n.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
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