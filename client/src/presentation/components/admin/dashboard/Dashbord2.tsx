import React, { useState, useMemo } from "react";
import {
  LayoutGrid, Building2, Briefcase, Users, UserCog, Settings, Search, Bell,
  ChevronDown, Check, X, Eye, MoreVertical, TrendingUp, Clock, ShieldCheck,
  MapPin, Mail, Phone, Calendar, ArrowUpRight, ArrowDownRight, Menu, LogOut,
  FileText, Ban, CheckCircle2, XCircle, Filter, ExternalLink
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";

/* ---------------------------------- fonts ---------------------------------- */
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-body { font-family: 'Manrope', sans-serif; }
  `}</style>
);

/* ---------------------------------- demo data ---------------------------------- */
const STATS = [
  { label: "Total Job Posts", value: 1284, delta: 8.2, up: true, icon: Briefcase, tint: "bg-indigo-50 text-indigo-600" },
  { label: "Registered Companies", value: 312, delta: 4.6, up: true, icon: Building2, tint: "bg-teal-50 text-teal-600" },
  { label: "Active Job Seekers", value: 9840, delta: 2.1, up: true, icon: Users, tint: "bg-amber-50 text-amber-600" },
  { label: "Pending Approvals", value: 27, delta: 12.5, up: false, icon: Clock, tint: "bg-rose-50 text-rose-600" },
];

const CHART_DATA = [
  { month: "Jan", jobs: 320, companies: 42 },
  { month: "Feb", jobs: 410, companies: 51 },
  { month: "Mar", jobs: 380, companies: 47 },
  { month: "Apr", jobs: 520, companies: 63 },
  { month: "May", jobs: 610, companies: 71 },
  { month: "Jun", jobs: 580, companies: 68 },
  { month: "Jul", jobs: 720, companies: 84 },
];

const USER_MIX = [
  { name: "Job seekers", value: 9840, color: "#6366f1" },
  { name: "Companies", value: 312, color: "#2dd4bf" },
  { name: "Job posters (HR)", value: 486, color: "#f59e0b" },
  { name: "Admins", value: 6, color: "#94a3b8" },
];

const APPLICATIONS_BY_CATEGORY = [
  { category: "Engineering", applications: 1840 },
  { category: "Design", applications: 960 },
  { category: "Sales", applications: 720 },
  { category: "Healthcare", applications: 540 },
  { category: "Legal", applications: 310 },
  { category: "Marketing", applications: 605 },
];

const INTERVIEW_STATUS = [
  { name: "Scheduled", value: 184, color: "#6366f1" },
  { name: "Completed", value: 342, color: "#22c55e" },
  { name: "Rejected", value: 128, color: "#f43f5e" },
  { name: "No-show", value: 41, color: "#f59e0b" },
  { name: "Awaiting feedback", value: 76, color: "#94a3b8" },
];

const initialPendingCompanies = [
  { id: "c1", name: "Northwind Analytics", industry: "Data & AI", location: "Bengaluru, IN", submitted: "2 hours ago", contact: "priya.rao@northwind.io", size: "51-200", logo: "NA" },
  { id: "c2", name: "Solstice Robotics", industry: "Manufacturing", location: "Austin, TX", submitted: "5 hours ago", contact: "hr@solsticerobotics.com", size: "11-50", logo: "SR" },
  { id: "c3", name: "Bluepeak Health", industry: "Healthcare", location: "Toronto, CA", submitted: "1 day ago", contact: "careers@bluepeak.ca", size: "201-500", logo: "BH" },
  { id: "c4", name: "Verdant Foods Co.", industry: "FMCG", location: "Kochi, IN", submitted: "1 day ago", contact: "talent@verdantfoods.in", size: "51-200", logo: "VF" },
  { id: "c5", name: "Ashcroft Legal Partners", industry: "Legal Services", location: "London, UK", submitted: "2 days ago", contact: "recruit@ashcroftlaw.co.uk", size: "11-50", logo: "AL" },
];

const initialPendingJobs = [
  { id: "j1", title: "Senior Product Designer", company: "Northwind Analytics", category: "Design", type: "Full-time", salary: "$95k – $120k", submitted: "3 hours ago", applicants: 0 },
  { id: "j2", title: "Backend Engineer (Node.js)", company: "Solstice Robotics", category: "Engineering", type: "Full-time", salary: "$80k – $110k", submitted: "6 hours ago", applicants: 0 },
  { id: "j3", title: "Clinical Research Associate", company: "Bluepeak Health", category: "Healthcare", type: "Contract", salary: "$60k – $75k", submitted: "9 hours ago", applicants: 0 },
  { id: "j4", title: "Regional Sales Manager", category: "Sales", company: "Verdant Foods Co.", type: "Full-time", salary: "₹12L – ₹18L", submitted: "1 day ago", applicants: 0 },
  { id: "j5", title: "Paralegal, Corporate Law", company: "Ashcroft Legal Partners", category: "Legal", type: "Part-time", salary: "£28k – £34k", submitted: "1 day ago", applicants: 0 },
  { id: "j6", title: "DevOps Engineer", company: "Northwind Analytics", category: "Engineering", type: "Full-time", salary: "$100k – $130k", submitted: "2 days ago", applicants: 0 },
];

const employers = [
  { id: "e1", name: "Meridian Software", contact: "jane.doe@meridian.com", jobsPosted: 24, status: "Active", joined: "Jan 2024" },
  { id: "e2", name: "Coral Bay Hospitality", contact: "recruit@coralbay.com", jobsPosted: 9, status: "Active", joined: "Mar 2024" },
  { id: "e3", name: "Ferrous Industries", contact: "hr@ferrous.co", jobsPosted: 3, status: "Suspended", joined: "Nov 2023" },
  { id: "e4", name: "Lumen Studios", contact: "team@lumenstudios.io", jobsPosted: 17, status: "Active", joined: "Jun 2024" },
  { id: "e5", name: "Pinewood Logistics", contact: "careers@pinewood.com", jobsPosted: 6, status: "Active", joined: "Aug 2024" },
];

const employees = [
  { id: "u1", name: "Ananya Iyer", email: "ananya.iyer@mail.com", applications: 14, status: "Active", joined: "Feb 2024" },
  { id: "u2", name: "Marcus Webb", email: "marcus.webb@mail.com", applications: 6, status: "Active", joined: "Apr 2024" },
  { id: "u3", name: "Sofia Hernandez", email: "sofia.h@mail.com", applications: 21, status: "Active", joined: "Jan 2024" },
  { id: "u4", name: "Tom Aldridge", email: "tom.aldridge@mail.com", applications: 2, status: "Flagged", joined: "Jul 2024" },
  { id: "u5", name: "Grace Chen", email: "grace.chen@mail.com", applications: 9, status: "Active", joined: "May 2024" },
];

const activity = [
  { text: "Approved company registration — Lumen Studios", time: "12 min ago", type: "approve" },
  { text: "Rejected job post — \u201cCrypto Trader (Unverified)\u201d", time: "48 min ago", type: "reject" },
  { text: "Suspended employer account — Ferrous Industries", time: "2 hours ago", type: "suspend" },
  { text: "Approved job post — Senior UX Researcher", time: "3 hours ago", type: "approve" },
];

/* ---------------------------------- small ui bits ---------------------------------- */
const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "companies", label: "Pending Companies", icon: Building2, badgeKey: "companies" },
  { key: "jobs", label: "Pending Jobs", icon: Briefcase, badgeKey: "jobs" },
  { key: "employers", label: "Job Posters", icon: UserCog },
  { key: "employees", label: "Job Seekers", icon: Users },
  { key: "settings", label: "Settings", icon: Settings },
];

function Avatar({ name, className = "" }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className={`flex items-center justify-center rounded-full bg-slate-900 text-white font-body font-semibold ${className}`}>
      {initials}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Suspended: "bg-rose-50 text-rose-700 border-rose-200",
    Flagged: "bg-amber-50 text-amber-700 border-amber-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${map[status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${status === "Active" ? "bg-emerald-500" : status === "Suspended" ? "bg-rose-500" : "bg-amber-500"}`} />
      {status}
    </span>
  );
}

function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <CheckCircle2 className="h-6 w-6 text-slate-400" />
      </div>
      <p className="font-body font-semibold text-slate-700">All caught up</p>
      <p className="font-body text-sm text-slate-400 mt-1">No pending {label} right now.</p>
    </div>
  );
}

/* ---------------------------------- main component ---------------------------------- */
export default function AdminDashboard2() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pendingCompanies, setPendingCompanies] = useState(initialPendingCompanies);
  const [pendingJobs, setPendingJobs] = useState(initialPendingJobs);
  const [employerList, setEmployerList] = useState(employers);
  const [employeeList, setEmployeeList] = useState(employees);
  const [toast, setToast] = useState(null);

  const showToast = (msg, tone = "success") => {
    setToast({ msg, tone });
    setTimeout(() => setToast(null), 2200);
  };

  const approveCompany = (id) => {
    const c = pendingCompanies.find(c => c.id === id);
    setPendingCompanies(prev => prev.filter(c => c.id !== id));
    showToast(`${c.name} approved and onboarded`, "success");
  };
  const rejectCompany = (id) => {
    const c = pendingCompanies.find(c => c.id === id);
    setPendingCompanies(prev => prev.filter(c => c.id !== id));
    showToast(`${c.name} registration rejected`, "danger");
  };
  const approveJob = (id) => {
    const j = pendingJobs.find(j => j.id === id);
    setPendingJobs(prev => prev.filter(j => j.id !== id));
    showToast(`"${j.title}" is now live`, "success");
  };
  const rejectJob = (id) => {
    const j = pendingJobs.find(j => j.id === id);
    setPendingJobs(prev => prev.filter(j => j.id !== id));
    showToast(`"${j.title}" rejected`, "danger");
  };
  const toggleEmployer = (id) => {
    setEmployerList(prev => prev.map(e => e.id === id ? { ...e, status: e.status === "Active" ? "Suspended" : "Active" } : e));
  };
  const toggleEmployee = (id) => {
    setEmployeeList(prev => prev.map(e => e.id === id ? { ...e, status: e.status === "Active" ? "Flagged" : "Active" } : e));
  };

  const badgeCounts = { companies: pendingCompanies.length, jobs: pendingJobs.length };

  return (
    <div className="font-body min-h-screen w-full bg-slate-50 text-slate-900 flex">
      <FontImport />

     
      

      {/* ---------------- Main ---------------- */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        

        <main className="flex-1 p-6 md:p-8 max-w-[1400px] w-full mx-auto">
          {activeTab === "overview" && (
            <OverviewTab
              pendingCompanies={pendingCompanies}
              pendingJobs={pendingJobs}
              onApproveCompany={approveCompany}
              onRejectCompany={rejectCompany}
              onApproveJob={approveJob}
              onRejectJob={rejectJob}
              onSeeAllCompanies={() => setActiveTab("companies")}
              onSeeAllJobs={() => setActiveTab("jobs")}
            />
          )}

          {activeTab === "companies" && (
            <CompaniesTab companies={pendingCompanies} onApprove={approveCompany} onReject={rejectCompany} />
          )}

          {activeTab === "jobs" && (
            <JobsTab jobs={pendingJobs} onApprove={approveJob} onReject={rejectJob} />
          )}

          {activeTab === "employers" && (
            <EmployersTab list={employerList} onToggle={toggleEmployer} />
          )}

          {activeTab === "employees" && (
            <EmployeesTab list={employeeList} onToggle={toggleEmployee} />
          )}

          {activeTab === "settings" && <SettingsTab />}
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 ${
          toast.tone === "success" ? "bg-emerald-600" : "bg-rose-600"
        }`}>
          {toast.tone === "success" ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- Overview ---------------------------------- */
function OverviewTab({ pendingCompanies, pendingJobs, onApproveCompany, onRejectCompany, onApproveJob, onRejectJob, onSeeAllCompanies, onSeeAllJobs }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-slate-900">Good morning, Admin</h1>
        <p className="text-slate-500 mt-1">Here's what's happening across the platform today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.tint}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-bold ${s.up ? "text-emerald-600" : "text-rose-500"}`}>
                  {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {s.delta}%
                </span>
              </div>
              <p className="font-display text-2xl mt-4 text-slate-900">{s.value.toLocaleString()}</p>
              <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-lg text-slate-900">Platform growth</h3>
              <p className="text-sm text-slate-400">Job posts vs. new companies</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-indigo-500" />Jobs</span>
              <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-teal-400" />Companies</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CHART_DATA} margin={{ left: -20, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="jobsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                <Area type="monotone" dataKey="jobs" stroke="#6366f1" strokeWidth={2} fill="url(#jobsGrad)" />
                <Area type="monotone" dataKey="companies" stroke="#2dd4bf" strokeWidth={2} fill="url(#compGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-display text-lg text-slate-900 mb-4">Recent activity</h3>
          <ul className="space-y-4">
            {activity.map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                  a.type === "approve" ? "bg-emerald-50 text-emerald-600" : a.type === "reject" ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"
                }`}>
                  {a.type === "approve" ? <Check className="h-3.5 w-3.5" /> : a.type === "reject" ? <X className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                </div>
                <div>
                  <p className="text-sm text-slate-700 leading-snug">{a.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* User mix / category / interview status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-display text-lg text-slate-900">User distribution</h3>
          <p className="text-sm text-slate-400 mb-2">Companies vs. candidates vs. staff</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={USER_MIX}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {USER_MIX.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
                  formatter={(value) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 mt-1">
            {USER_MIX.map((u) => (
              <li key={u.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: u.color }} />
                  {u.name}
                </span>
                <span className="font-semibold text-slate-700">{u.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-display text-lg text-slate-900">Applications by category</h3>
          <p className="text-sm text-slate-400 mb-2">Sent by candidates, all-time</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={APPLICATIONS_BY_CATEGORY} margin={{ left: -20, right: 10, top: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
                <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                <Bar dataKey="applications" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-display text-lg text-slate-900">Interview status</h3>
          <p className="text-sm text-slate-400 mb-2">Across all active pipelines</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={INTERVIEW_STATUS}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {INTERVIEW_STATUS.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }}
                  formatter={(value) => value.toLocaleString()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="space-y-1.5 mt-1">
            {INTERVIEW_STATUS.map((s) => (
              <li key={s.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-500">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
                <span className="font-semibold text-slate-700">{s.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preview lists */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-slate-900">Pending company registrations</h3>
            <button onClick={onSeeAllCompanies} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all <ExternalLink className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {pendingCompanies.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <Avatar name={c.name} className="h-10 w-10 text-xs shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">{c.name}</p>
                  <p className="text-xs text-slate-400 truncate">{c.industry} · {c.location}</p>
                </div>
                <button onClick={() => onApproveCompany(c.id)} className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={() => onRejectCompany(c.id)} className="h-8 w-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {pendingCompanies.length === 0 && <EmptyState label="companies" />}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg text-slate-900">Pending job posts</h3>
            <button onClick={onSeeAllJobs} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View all <ExternalLink className="h-3 w-3" />
            </button>
          </div>
          <div className="space-y-3">
            {pendingJobs.slice(0, 3).map((j) => (
              <div key={j.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-800 truncate">{j.title}</p>
                  <p className="text-xs text-slate-400 truncate">{j.company} · {j.type}</p>
                </div>
                <button onClick={() => onApproveJob(j.id)} className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center shrink-0">
                  <Check className="h-4 w-4" />
                </button>
                <button onClick={() => onRejectJob(j.id)} className="h-8 w-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center shrink-0">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {pendingJobs.length === 0 && <EmptyState label="jobs" />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Pending Companies ---------------------------------- */
function CompaniesTab({ companies, onApprove, onReject }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Pending company registrations" subtitle={`${companies.length} companies waiting for review`} />
      {companies.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200"><EmptyState label="companies" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {companies.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} className="h-12 w-12" />
                  <div>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.industry} · {c.size} employees</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0"><Clock className="h-3 w-3" />{c.submitted}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-500"><MapPin className="h-3.5 w-3.5" />{c.location}</div>
                <div className="flex items-center gap-2 text-slate-500 truncate"><Mail className="h-3.5 w-3.5 shrink-0" />{c.contact}</div>
              </div>
              <div className="mt-5 flex items-center gap-2">
                <button onClick={() => onApprove(c.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition-colors">
                  <Check className="h-4 w-4" /> Approve
                </button>
                <button onClick={() => onReject(c.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white border border-rose-200 text-rose-600 text-sm font-semibold hover:bg-rose-50 transition-colors">
                  <X className="h-4 w-4" /> Reject
                </button>
                <button className="h-9 w-9 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center shrink-0">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- Pending Jobs ---------------------------------- */
function JobsTab({ jobs, onApprove, onReject }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Pending job posts" subtitle={`${jobs.length} listings waiting for review`} />
      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200"><EmptyState label="jobs" /></div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                <th className="px-5 py-3">Job title</th>
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Salary range</th>
                <th className="px-5 py-3">Submitted</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.map((j) => (
                <tr key={j.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-4 font-semibold text-slate-800">{j.title}</td>
                  <td className="px-5 py-4 text-slate-500">{j.company}</td>
                  <td className="px-5 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold">{j.category}</span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{j.salary}</td>
                  <td className="px-5 py-4 text-slate-400">{j.submitted}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => onApprove(j.id)} className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center">
                        <Check className="h-4 w-4" />
                      </button>
                      <button onClick={() => onReject(j.id)} className="h-8 w-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center">
                        <X className="h-4 w-4" />
                      </button>
                      <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- Job Posters (employers) ---------------------------------- */
function EmployersTab({ list, onToggle }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Job posters" subtitle={`${list.length} employer accounts on the platform`} />
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
              <th className="px-5 py-3">Company</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Jobs posted</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={e.name} className="h-8 w-8 text-[11px]" />
                    <span className="font-semibold text-slate-800">{e.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-500">{e.contact}</td>
                <td className="px-5 py-4 text-slate-500">{e.jobsPosted}</td>
                <td className="px-5 py-4 text-slate-400">{e.joined}</td>
                <td className="px-5 py-4"><StatusPill status={e.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onToggle(e.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        e.status === "Active"
                          ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                          : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {e.status === "Active" ? "Suspend" : "Reactivate"}
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- Employees (job seekers) ---------------------------------- */
function EmployeesTab({ list, onToggle }) {
  return (
    <div className="space-y-6">
      <PageHeader title="Job seekers" subtitle={`${list.length} candidate accounts on the platform`} />
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Applications</th>
              <th className="px-5 py-3">Joined</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {list.map((e) => (
              <tr key={e.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={e.name} className="h-8 w-8 text-[11px]" />
                    <span className="font-semibold text-slate-800">{e.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-500">{e.email}</td>
                <td className="px-5 py-4 text-slate-500">{e.applications}</td>
                <td className="px-5 py-4 text-slate-400">{e.joined}</td>
                <td className="px-5 py-4"><StatusPill status={e.status} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onToggle(e.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        e.status === "Active"
                          ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                          : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                      }`}
                    >
                      {e.status === "Active" ? "Flag" : "Clear flag"}
                    </button>
                    <button className="h-8 w-8 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------- Settings (placeholder) ---------------------------------- */
function SettingsTab() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Platform configuration and admin preferences" />
      <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center text-center">
        <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Settings className="h-6 w-6 text-slate-400" />
        </div>
        <p className="font-semibold text-slate-700">Wire this up to your settings module</p>
        <p className="text-sm text-slate-400 mt-1 max-w-sm">This tab is a placeholder — hook in your own settings form, roles and permissions, or platform config here.</p>
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h1 className="font-display text-2xl text-slate-900">{title}</h1>
        <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
      </div>
      <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
        <Filter className="h-4 w-4" /> Filter
      </button>
    </div>
  );
}