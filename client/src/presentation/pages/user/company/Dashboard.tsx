import { useState } from 'react';

const stats = [
  {
    label: 'Active Jobs',
    value: '12',
    change: '+3 this week',
    icon: '💼',
    color: 'bg-violet-500',
  },
  {
    label: 'Total Applicants',
    value: '348',
    change: '+47 this week',
    icon: '👥',
    color: 'bg-sky-500',
  },
  {
    label: 'Interviews Scheduled',
    value: '24',
    change: '+8 this week',
    icon: '📅',
    color: 'bg-emerald-500',
  },
  {
    label: 'Positions Filled',
    value: '7',
    change: '+2 this month',
    icon: '✅',
    color: 'bg-amber-500',
  },
];

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    dept: 'Engineering',
    location: 'Remote',
    applicants: 82,
    status: 'Active',
    posted: 'Jan 28, 2026',
    deadline: 'Mar 15, 2026',
  },
  {
    id: 2,
    title: 'Product Manager',
    dept: 'Product',
    location: 'New York, NY',
    applicants: 64,
    status: 'Active',
    posted: 'Feb 5, 2026',
    deadline: 'Mar 20, 2026',
  },
  {
    id: 3,
    title: 'UX Designer',
    dept: 'Design',
    location: 'San Francisco, CA',
    applicants: 47,
    status: 'Active',
    posted: 'Feb 10, 2026',
    deadline: 'Mar 25, 2026',
  },
  {
    id: 4,
    title: 'Data Analyst',
    dept: 'Analytics',
    location: 'Chicago, IL',
    applicants: 33,
    status: 'Paused',
    posted: 'Jan 15, 2026',
    deadline: 'Feb 28, 2026',
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    dept: 'Infrastructure',
    location: 'Remote',
    applicants: 55,
    status: 'Active',
    posted: 'Feb 18, 2026',
    deadline: 'Apr 1, 2026',
  },
];

const recentApplicants = [
  {
    name: 'Sophia Carter',
    role: 'Senior Frontend Developer',
    time: '2 hours ago',
    status: 'New',
    avatar: 'SC',
  },
  {
    name: 'Marcus Liu',
    role: 'Product Manager',
    time: '5 hours ago',
    status: 'Reviewed',
    avatar: 'ML',
  },
  {
    name: 'Priya Nair',
    role: 'UX Designer',
    time: 'Yesterday',
    status: 'Interview',
    avatar: 'PN',
  },
  {
    name: 'James Okafor',
    role: 'DevOps Engineer',
    time: 'Yesterday',
    status: 'New',
    avatar: 'JO',
  },
  {
    name: 'Elena Vasquez',
    role: 'Data Analyst',
    time: '2 days ago',
    status: 'Rejected',
    avatar: 'EV',
  },
  {
    name: 'Tom Brennan',
    role: 'Senior Frontend Developer',
    time: '2 days ago',
    status: 'Interview',
    avatar: 'TB',
  },
];

const upcomingInterviews = [
  {
    name: 'Priya Nair',
    role: 'UX Designer',
    date: 'Mar 3, 2026',
    time: '10:00 AM',
    type: 'Video',
    avatar: 'PN',
  },
  {
    name: 'Tom Brennan',
    role: 'Frontend Developer',
    date: 'Mar 4, 2026',
    time: '2:30 PM',
    type: 'On-site',
    avatar: 'TB',
  },
  {
    name: 'Aisha Mohammed',
    role: 'Product Manager',
    date: 'Mar 5, 2026',
    time: '11:00 AM',
    type: 'Video',
    avatar: 'AM',
  },
  {
    name: 'Ryan Choi',
    role: 'DevOps Engineer',
    date: 'Mar 6, 2026',
    time: '3:00 PM',
    type: 'Phone',
    avatar: 'RC',
  },
];

const navItems = [
  'Dashboard',
  'Jobs',
  'Applicants',
  'Interviews',
  'Analytics',
  'Settings',
];

const statusColor = {
  Active: 'bg-emerald-100 text-emerald-700',
  Paused: 'bg-amber-100 text-amber-700',
  Closed: 'bg-red-100 text-red-700',
};

const applicantStatusColor = {
  New: 'bg-sky-100 text-sky-700',
  Reviewed: 'bg-violet-100 text-violet-700',
  Interview: 'bg-emerald-100 text-emerald-700',
  Rejected: 'bg-red-100 text-red-700',
};

const interviewTypeColor = {
  Video: 'bg-sky-100 text-sky-700',
  'On-site': 'bg-violet-100 text-violet-700',
  Phone: 'bg-amber-100 text-amber-700',
};

const avatarColors = [
  'bg-violet-500',
  'bg-sky-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-indigo-500',
];

export default function EmployerDashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
      className="flex h-screen bg-slate-50 overflow-hidden"
    >
      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-slate-900 flex flex-col shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
          <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">H</span>
          </div>
          {sidebarOpen && (
            <span className="text-white font-bold text-lg tracking-tight">
              HireFlow
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item, i) => {
            const icons = ['⊞', '💼', '👥', '📅', '📊', '⚙️'];
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeNav === item
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="text-base">{icons[i]}</span>
                {sidebarOpen && <span>{item}</span>}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">AC</span>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-white text-sm font-medium truncate">
                  Acme Corp
                </p>
                <p className="text-slate-400 text-xs truncate">
                  admin@acmecorp.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-500 hover:text-slate-700 text-xl"
            >
              ☰
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Employer Dashboard
              </h1>
              <p className="text-sm text-slate-500">
                Welcome back, Acme Corp 👋
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">
              + Post a Job
            </button>
            <div className="relative">
              <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                🔔
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                5
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-lg`}
                  >
                    {s.icon}
                  </div>
                  <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">
                    {s.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-slate-800">{s.value}</p>
                <p className="text-sm text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Job Listings */}
            <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800">
                  Active Job Listings
                </h2>
                <button className="text-violet-600 text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">
                        {job.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {job.dept} · {job.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 ml-4 shrink-0">
                      <div className="text-center">
                        <p className="text-sm font-bold text-slate-800">
                          {job.applicants}
                        </p>
                        <p className="text-xs text-slate-400">Applicants</p>
                      </div>
                      <div className="text-center hidden xl:block">
                        <p className="text-xs text-slate-500">{job.deadline}</p>
                        <p className="text-xs text-slate-400">Deadline</p>
                      </div>
                      {/* <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${statusColor[job.status]}`}> */}
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-lg `}
                      >
                        {job.status}
                      </span>
                      <button className="text-slate-400 hover:text-slate-600 text-sm">
                        •••
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-800">
                  Upcoming Interviews
                </h2>
                <button className="text-violet-600 text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-slate-100">
                {upcomingInterviews.map((iv, i) => (
                  <div key={i} className="px-6 py-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                      >
                        {iv.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {iv.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {iv.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-600 font-medium">
                          {iv.date}
                        </p>
                        <p className="text-xs text-slate-400">{iv.time}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-lg `}
                      >
                        {iv.type}
                      </span>
                      {/* <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${interviewTypeColor[iv.type]}`}>{iv.type}</span> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Applicants */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-800">Recent Applicants</h2>
              <div className="flex items-center gap-3">
                <input
                  placeholder="Search applicants..."
                  className="text-sm border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600 placeholder-slate-400 outline-none focus:border-violet-400"
                />
                <button className="text-violet-600 text-sm font-medium hover:underline">
                  View All
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs text-slate-500 uppercase tracking-wide">
                  <th className="px-6 py-3 text-left font-semibold">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Applied For
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">Applied</th>
                  <th className="px-6 py-3 text-left font-semibold">Status</th>
                  <th className="px-6 py-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentApplicants.map((a, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 ${avatarColors[i % avatarColors.length]} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}
                        >
                          {a.avatar}
                        </div>
                        <span className="text-sm font-medium text-slate-800">
                          {a.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-600">
                      {a.role}
                    </td>
                    <td className="px-6 py-3 text-sm text-slate-500">
                      {a.time}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-lg `}
                      >
                        {a.status}
                      </span>
                      {/* <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${applicantStatusColor[a.status]}`}>{a.status}</span> */}
                    </td>
                    <td className="px-6 py-3">
                      <button className="text-xs text-violet-600 font-medium hover:underline">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
