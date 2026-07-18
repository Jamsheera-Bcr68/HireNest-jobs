import React, { useState, useEffect, useMemo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Briefcase,
  Users,
  CalendarClock,
  Trophy,
  Clock3,
  Search,
  Bell,
  Plus,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ChevronRight,
  Video,
  Building2,
  Phone,
  MessageSquare,
  FileText,
  UserPlus,
  Megaphone,
  CheckCircle2,
  MoreHorizontal,
  MapPin,
  Sparkles,
  Send,
  ClipboardList,
} from 'lucide-react';

/* ============================================================
   MOCK DATA — swap this object for real API responses later
   ============================================================ */
const dashboardData = {
  recruiter: { name: 'Maria Alonzo', role: 'Head of Talent', initials: 'MA' },

  stats: [
    {
      id: 'active-jobs',
      label: 'Active job posts',
      value: '18',
      change: 12.5,
      trend: 'up',
      icon: Briefcase,
      tint: 'emerald',
    },
    {
      id: 'applicants',
      label: 'Total applicants',
      value: '1,284',
      change: 8.2,
      trend: 'up',
      icon: Users,
      tint: 'sky',
    },
    {
      id: 'interviews',
      label: 'Interviews this week',
      value: '34',
      change: -4.1,
      trend: 'down',
      icon: CalendarClock,
      tint: 'amber',
    },
    {
      id: 'offers',
      label: 'Offers extended',
      value: '9',
      change: 20.0,
      trend: 'up',
      icon: Trophy,
      tint: 'violet',
    },
    {
      id: 'time-to-hire',
      label: 'Avg. time to hire',
      value: '16 days',
      change: -6.3,
      trend: 'up',
      icon: Clock3,
      tint: 'rose',
    },
  ],

  applicationTrend: [
    { month: 'Feb', applications: 142, hires: 6 },
    { month: 'Mar', applications: 168, hires: 8 },
    { month: 'Apr', applications: 190, hires: 7 },
    { month: 'May', applications: 221, hires: 11 },
    { month: 'Jun', applications: 265, hires: 13 },
    { month: 'Jul', applications: 298, hires: 15 },
  ],

  topJobs: [
    { title: 'Senior Product Designer', applicants: 214 },
    { title: 'Backend Engineer (Go)', applicants: 187 },
    { title: 'Growth Marketing Lead', applicants: 156 },
    { title: 'Customer Success Mgr', applicants: 121 },
    { title: 'Data Analyst', applicants: 98 },
  ],

  funnel: [
    { stage: 'Applied', count: 1284 },
    { stage: 'Screened', count: 612 },
    { stage: 'Interviewed', count: 248 },
    { stage: 'Offered', count: 41 },
    { stage: 'Hired', count: 22 },
  ],

  interviews: [
    {
      id: 1,
      name: 'Elena Vasquez',
      role: 'Senior Product Designer',
      time: '10:00 AM',
      date: 'Today',
      type: 'video',
      initials: 'EV',
    },
    {
      id: 2,
      name: 'Marcus Chen',
      role: 'Backend Engineer',
      time: '1:30 PM',
      date: 'Today',
      type: 'onsite',
      initials: 'MC',
    },
    {
      id: 3,
      name: 'Priya Nair',
      role: 'Growth Marketing Lead',
      time: '9:00 AM',
      date: 'Tomorrow',
      type: 'phone',
      initials: 'PN',
    },
    {
      id: 4,
      name: 'Jordan Blake',
      role: 'Data Analyst',
      time: '3:00 PM',
      date: 'Tomorrow',
      type: 'video',
      initials: 'JB',
    },
  ],

  latestApplications: [
    {
      id: 1,
      name: 'Sofia Reyes',
      role: 'Backend Engineer (Go)',
      appliedAt: '12 min ago',
      status: 'new',
      initials: 'SR',
    },
    {
      id: 2,
      name: 'Daniel Okafor',
      role: 'Senior Product Designer',
      appliedAt: '48 min ago',
      status: 'reviewing',
      initials: 'DO',
    },
    {
      id: 3,
      name: 'Lena Kowalski',
      role: 'Data Analyst',
      appliedAt: '2 hr ago',
      status: 'shortlisted',
      initials: 'LK',
    },
    {
      id: 4,
      name: 'Tomas Fischer',
      role: 'Customer Success Mgr',
      appliedAt: '5 hr ago',
      status: 'new',
      initials: 'TF',
    },
  ],

  activeJobsSummary: [
    {
      id: 1,
      title: 'Senior Product Designer',
      dept: 'Design',
      location: 'Remote',
      applicants: 214,
      target: 250,
      status: 'active',
    },
    {
      id: 2,
      title: 'Backend Engineer (Go)',
      dept: 'Engineering',
      location: 'Austin, TX',
      applicants: 187,
      target: 200,
      status: 'closing-soon',
    },
    {
      id: 3,
      title: 'Growth Marketing Lead',
      dept: 'Marketing',
      location: 'Remote',
      applicants: 156,
      target: 180,
      status: 'active',
    },
    {
      id: 4,
      title: 'Data Analyst',
      dept: 'Analytics',
      location: 'New York, NY',
      applicants: 98,
      target: 150,
      status: 'active',
    },
  ],

  recentActivity: [
    {
      id: 1,
      icon: CheckCircle2,
      text: 'Priya Nair was moved to Interviewing for Growth Marketing Lead',
      time: '18 min ago',
    },
    {
      id: 2,
      icon: FileText,
      text: 'New job post \u201cStaff Frontend Engineer\u201d was published',
      time: '1 hr ago',
    },
    {
      id: 3,
      icon: Trophy,
      text: 'Offer accepted \u2014 Aiko Tanaka joins as UX Researcher',
      time: '3 hr ago',
    },
    {
      id: 4,
      icon: MessageSquare,
      text: '3 candidates replied to outreach messages',
      time: '5 hr ago',
    },
    {
      id: 5,
      icon: UserPlus,
      text: 'Marcus Chen added to Backend Engineer shortlist',
      time: 'Yesterday',
    },
  ],

  notifications: [
    {
      id: 1,
      title: '2 interviews need confirmation',
      description: 'Candidates awaiting time confirmation',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Job post expiring soon',
      description: 'Customer Success Mgr closes in 2 days',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Feedback overdue',
      description: "3 interviewers haven't submitted scorecards",
      priority: 'high',
    },
  ],

  quickActions: [
    { id: 1, label: 'Post a job', icon: Plus },
    { id: 2, label: 'Schedule interview', icon: CalendarClock },
    { id: 3, label: 'Review applications', icon: ClipboardList },
    { id: 4, label: 'Message candidates', icon: Send },
  ],
};

const tintMap = {
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-100',
  },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-100' },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    ring: 'ring-violet-100',
  },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-100' },
};

const statusStyles = {
  new: 'bg-sky-50 text-sky-700',
  reviewing: 'bg-amber-50 text-amber-700',
  shortlisted: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-stone-100 text-stone-500',
  active: 'bg-emerald-50 text-emerald-700',
  'closing-soon': 'bg-amber-50 text-amber-700',
};

/* ============================================================
   SHARED PRIMITIVES
   ============================================================ */
function SkeletonCard({ className = '' }) {
  return (
    <div
      className={`rounded-3xl bg-white border border-stone-100 shadow-sm p-6 overflow-hidden ${className}`}
    >
      <div className="animate-pulse space-y-4">
        <div className="h-3 w-24 bg-stone-100 rounded-full" />
        <div className="h-7 w-32 bg-stone-100 rounded-full" />
        <div className="h-2 w-16 bg-stone-100 rounded-full" />
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon = Sparkles, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6">
      <div className="h-12 w-12 rounded-2xl bg-stone-50 flex items-center justify-center mb-3 ring-1 ring-stone-100">
        <Icon className="h-5 w-5 text-stone-400" strokeWidth={1.75} />
      </div>
      <p className="text-sm font-medium text-stone-700">{title}</p>
      {subtitle && (
        <p className="text-xs text-stone-400 mt-1 max-w-[220px]">{subtitle}</p>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase mb-1">
            {eyebrow}
          </p>
        )}
        <h2
          className="text-[17px] font-semibold text-stone-900"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {title}
        </h2>
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="group flex items-center gap-1 text-xs font-medium text-stone-500 hover:text-emerald-700 transition-colors"
        >
          {action.label}
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </div>
  );
}

/* ============================================================
   HEADER
   ============================================================ */
function Header({ recruiter }) {
  return (
    <header className="sticky top-0 z-20 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm shadow-emerald-900/10">
            <Sparkles className="h-4.5 w-4.5 text-white" strokeWidth={2} />
          </div>
          <span
            className="text-lg font-semibold text-stone-900 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            HireNest
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search candidates, jobs, or teammates"
            className="w-full h-10 rounded-full bg-white border border-stone-200 pl-10 pr-4 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-1.5 h-10 px-4 rounded-full bg-stone-900 text-white text-sm font-medium hover:bg-stone-800 transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            Post a job
          </button>
          <button className="relative h-10 w-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:border-stone-300 transition-colors">
            <Bell className="h-4.5 w-4.5 text-stone-500" />
            <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
          </button>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-xs font-semibold text-stone-600">
            {recruiter.initials}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   WELCOME BANNER
   ============================================================ */
function WelcomeBanner({ recruiter, data }) {
  const needsAttention = data.notifications.filter(
    (n) => n.priority === 'high'
  ).length;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 px-8 py-9 md:px-10 md:py-10">
      <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -left-10 -bottom-24 h-56 w-56 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="relative flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <p className="text-emerald-100/90 text-sm font-medium mb-2">
            Good afternoon, {recruiter.name.split(' ')[0]} 👋
          </p>
          <h1
            className="text-2xl md:text-[28px] font-semibold text-white max-w-md leading-snug"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Hiring is trending up this month — 3 roles are ahead of schedule.
          </h1>
        </div>
        <div className="flex gap-8 md:gap-10 shrink-0">
          <div>
            <p
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              18
            </p>
            <p className="text-xs text-emerald-100/80 mt-1">Open roles</p>
          </div>
          <div>
            <p
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              47
            </p>
            <p className="text-xs text-emerald-100/80 mt-1">New today</p>
          </div>
          <div>
            <p
              className="text-3xl font-semibold text-white"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {needsAttention}
            </p>
            <p className="text-xs text-emerald-100/80 mt-1">Needs attention</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
   ============================================================ */
function StatCard({ stat }) {
  const Icon = stat.icon;
  const tint = tintMap[stat.tint];
  const isUp = stat.trend === 'up';
  return (
    <div className="group rounded-3xl bg-white border border-stone-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div
          className={`h-10 w-10 rounded-2xl ${tint.bg} ${tint.text} flex items-center justify-center ring-1 ${tint.ring}`}
        >
          <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
        </div>
        <span
          className={`flex items-center gap-0.5 text-[11px] font-semibold px-2 py-1 rounded-full ${isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}
        >
          {isUp ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {Math.abs(stat.change)}%
        </span>
      </div>
      <p
        className="text-2xl font-semibold text-stone-900 mt-4"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {stat.value}
      </p>
      <p className="text-xs text-stone-400 mt-1">{stat.label}</p>
    </div>
  );
}

/* ============================================================
   CHART CARD WRAPPER
   ============================================================ */
function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div
      className={`rounded-3xl bg-white border border-stone-100 shadow-sm p-6 ${className}`}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-stone-800">{title}</h3>
          {subtitle && (
            <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <button className="h-7 w-7 rounded-full hover:bg-stone-50 flex items-center justify-center text-stone-300 hover:text-stone-500 transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      {children}
    </div>
  );
}

const FUNNEL_COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];

function ApplicationTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <AreaChart data={data} margin={{ left: -18, right: 8, top: 4 }}>
        <defs>
          <linearGradient id="appGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#f0ede6" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11, fill: '#a8a29e' }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11, fill: '#a8a29e' }}
          width={30}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 14,
            border: '1px solid #f0ede6',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            fontSize: 12,
          }}
          labelStyle={{ fontWeight: 600, color: '#1c1917' }}
        />
        <Area
          type="monotone"
          dataKey="applications"
          stroke="#059669"
          strokeWidth={2.5}
          fill="url(#appGradient)"
          name="Applications"
        />
        <Area
          type="monotone"
          dataKey="hires"
          stroke="#0ea5e9"
          strokeWidth={2}
          fill="transparent"
          name="Hires"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function TopJobsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 20 }}>
        <CartesianGrid horizontal={false} stroke="#f0ede6" />
        <XAxis type="number" hide />
        <YAxis
          dataKey="title"
          type="category"
          tickLine={false}
          axisLine={false}
          width={140}
          tick={{ fontSize: 11.5, fill: '#57534e' }}
        />
        <Tooltip
          cursor={{ fill: '#f5f4f0' }}
          contentStyle={{
            borderRadius: 14,
            border: '1px solid #f0ede6',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            fontSize: 12,
          }}
        />
        <Bar
          dataKey="applicants"
          radius={[0, 8, 8, 0]}
          fill="#059669"
          barSize={16}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function HiringFunnelChart({ data }) {
  const max = data[0].count;
  return (
    <div className="space-y-3 pt-1">
      {data.map((stage, i) => (
        <div key={stage.stage}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-stone-600">
              {stage.stage}
            </span>
            <span className="text-xs font-semibold text-stone-800">
              {stage.count.toLocaleString()}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-stone-50 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(stage.count / max) * 100}%`,
                backgroundColor: FUNNEL_COLORS[i],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   INTERVIEW CARD
   ============================================================ */
const interviewTypeIcon = { video: Video, onsite: Building2, phone: Phone };

function InterviewCard({ interview }) {
  const TypeIcon = interviewTypeIcon[interview.type];
  return (
    <div className="flex items-center gap-3.5 py-3 group">
      <div className="h-10 w-10 shrink-0 rounded-full bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-600">
        {interview.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-stone-800 truncate">
          {interview.name}
        </p>
        <p className="text-xs text-stone-400 truncate">{interview.role}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs font-semibold text-stone-700">{interview.time}</p>
        <div className="flex items-center gap-1 justify-end text-[11px] text-stone-400 mt-0.5">
          <TypeIcon className="h-3 w-3" />
          {interview.date}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APPLICATION ROW
   ============================================================ */
function ApplicationRow({ app }) {
  return (
    <div className="flex items-center gap-3.5 py-3">
      <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-semibold text-emerald-700">
        {app.initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-stone-800 truncate">
          {app.name}
        </p>
        <p className="text-xs text-stone-400 truncate">{app.role}</p>
      </div>
      <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
        <span
          className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${statusStyles[app.status]}`}
        >
          {app.status}
        </span>
        <p className="text-[11px] text-stone-400">{app.appliedAt}</p>
      </div>
    </div>
  );
}

/* ============================================================
   JOB SUMMARY CARD
   ============================================================ */
function JobSummaryCard({ job }) {
  const pct = Math.round((job.applicants / job.target) * 100);
  return (
    <div className="rounded-2xl border border-stone-100 p-5 hover:border-stone-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-stone-800">{job.title}</p>
          <p className="text-xs text-stone-400 mt-0.5">{job.dept}</p>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize whitespace-nowrap ${statusStyles[job.status]}`}
        >
          {job.status.replace('-', ' ')}
        </span>
      </div>
      <div className="flex items-center gap-1 text-xs text-stone-400 mb-3.5">
        <MapPin className="h-3 w-3" />
        {job.location}
      </div>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="text-stone-500">{job.applicants} applicants</span>
        <span className="font-medium text-stone-600">{pct}% of goal</span>
      </div>
      <div className="h-2 w-full rounded-full bg-stone-50 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   RECENT ACTIVITY
   ============================================================ */
function RecentActivity({ items }) {
  return (
    <div className="relative">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="flex gap-3.5">
            <div className="flex flex-col items-center">
              <div className="h-8 w-8 shrink-0 rounded-full bg-stone-50 ring-1 ring-stone-100 flex items-center justify-center text-emerald-600">
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </div>
              {i < items.length - 1 && (
                <div className="w-px flex-1 bg-stone-100 my-1" />
              )}
            </div>
            <div className="pb-5 -mt-0.5">
              <p className="text-sm text-stone-700 leading-snug">{item.text}</p>
              <p className="text-[11px] text-stone-400 mt-1">{item.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
const priorityDot = {
  high: 'bg-rose-500',
  medium: 'bg-amber-500',
  low: 'bg-stone-300',
};

function NotificationList({ notifications }) {
  if (!notifications.length) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title="All caught up"
        subtitle="No pending notifications right now."
      />
    );
  }
  return (
    <div className="space-y-1">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="flex items-start gap-3 p-3 rounded-2xl hover:bg-stone-50 transition-colors cursor-pointer"
        >
          <span
            className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${priorityDot[n.priority]}`}
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-800">{n.title}</p>
            <p className="text-xs text-stone-400 mt-0.5">{n.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   QUICK ACTIONS
   ============================================================ */
function QuickActionCard({ action }) {
  const Icon = action.icon;
  return (
    <button className="flex items-center gap-3 w-full p-3.5 rounded-2xl border border-stone-100 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all group text-left">
      <div className="h-9 w-9 rounded-xl bg-stone-50 group-hover:bg-white flex items-center justify-center text-stone-500 group-hover:text-emerald-700 transition-colors">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <span className="text-sm font-medium text-stone-700 group-hover:text-emerald-800">
        {action.label}
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 text-stone-300 ml-auto group-hover:text-emerald-500 transition-colors" />
    </button>
  );
}

/* ============================================================
   DASHBOARD LAYOUT / PAGE
   ============================================================ */
export default function HireNestDashboard() {
  const [loading, setLoading] = useState(true);
  const data = useMemo(() => dashboardData, []);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen bg-stone-50"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');`}</style>

      <Header recruiter={data.recruiter} />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 space-y-8">
        <WelcomeBanner recruiter={data.recruiter} data={data} />

        {/* KPI ROW */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
            : data.stats.map((s) => <StatCard key={s.id} stat={s} />)}
        </section>

        {/* CHARTS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartCard
            title="Application trend"
            subtitle="Applications vs. hires, last 6 months"
            className="lg:col-span-1"
          >
            {loading ? (
              <div className="h-[230px] animate-pulse rounded-2xl bg-stone-50" />
            ) : (
              <ApplicationTrendChart data={data.applicationTrend} />
            )}
          </ChartCard>
          <ChartCard
            title="Top performing jobs"
            subtitle="By total applicants"
            className="lg:col-span-1"
          >
            {loading ? (
              <div className="h-[230px] animate-pulse rounded-2xl bg-stone-50" />
            ) : (
              <TopJobsChart data={data.topJobs} />
            )}
          </ChartCard>
          <ChartCard
            title="Hiring funnel"
            subtitle="Candidates by pipeline stage"
            className="lg:col-span-1"
          >
            {loading ? (
              <div className="h-[230px] animate-pulse rounded-2xl bg-stone-50" />
            ) : (
              <HiringFunnelChart data={data.funnel} />
            )}
          </ChartCard>
        </section>

        {/* INTERVIEWS + APPLICATIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
            <SectionHeading
              eyebrow="Calendar"
              title="Upcoming interviews"
              action={{ label: 'View all' }}
            />
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 animate-pulse rounded-2xl bg-stone-50"
                  />
                ))}
              </div>
            ) : data.interviews.length ? (
              <div className="divide-y divide-stone-50">
                {data.interviews.map((iv) => (
                  <InterviewCard key={iv.id} interview={iv} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={CalendarClock}
                title="Nothing scheduled"
                subtitle="Interviews you book will show up here."
              />
            )}
          </div>

          <div className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
            <SectionHeading
              eyebrow="Pipeline"
              title="Latest applications"
              action={{ label: 'View all' }}
            />
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-14 animate-pulse rounded-2xl bg-stone-50"
                  />
                ))}
              </div>
            ) : data.latestApplications.length ? (
              <div className="divide-y divide-stone-50">
                {data.latestApplications.map((app) => (
                  <ApplicationRow key={app.id} app={app} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Users}
                title="No applications yet"
                subtitle="New candidates will appear here as they apply."
              />
            )}
          </div>
        </section>

        {/* ACTIVE JOBS SUMMARY */}
        <section className="rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
          <SectionHeading
            eyebrow="Active postings"
            title="Job performance summary"
            action={{ label: 'Manage jobs' }}
          />
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.activeJobsSummary.map((job) => (
                <JobSummaryCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>

        {/* ACTIVITY + NOTIFICATIONS + QUICK ACTIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
            <SectionHeading eyebrow="Timeline" title="Recent activity" />
            <RecentActivity items={data.recentActivity} />
          </div>

          <div className="lg:col-span-1 rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
            <SectionHeading eyebrow="Attention" title="Notifications" />
            <NotificationList notifications={data.notifications} />
          </div>

          <div className="lg:col-span-1 rounded-3xl bg-white border border-stone-100 shadow-sm p-6">
            <SectionHeading eyebrow="Shortcuts" title="Quick actions" />
            <div className="space-y-2.5">
              {data.quickActions.map((a) => (
                <QuickActionCard key={a.id} action={a} />
              ))}
            </div>
          </div>
        </section>

        <footer className="pt-4 pb-2 text-center">
          <p className="text-xs text-stone-400">
            HireNest \u00b7 Company dashboard overview \u00b7 Data refreshes
            every 15 minutes
          </p>
        </footer>
      </main>
    </div>
  );
}
