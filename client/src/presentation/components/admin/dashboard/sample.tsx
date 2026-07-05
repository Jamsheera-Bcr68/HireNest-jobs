import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutGrid, Briefcase, Building2, Users, UserCircle2, Settings,
  Search, Bell, ChevronDown, Menu, X, Check, XCircle, Eye,
  MapPin, Clock, TrendingUp, ArrowUpRight, ArrowDownRight,
  FileText, Mail, Star, MoreHorizontal, Filter, LogOut, ShieldCheck,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  DEMO DATA                                                          */
/* ------------------------------------------------------------------ */

const trendData = [
  { month: "Feb", jobs: 142, companies: 12 },
  { month: "Mar", jobs: 168, companies: 15 },
  { month: "Apr", jobs: 190, companies: 14 },
  { month: "May", jobs: 221, companies: 19 },
  { month: "Jun", jobs: 258, companies: 23 },
  { month: "Jul", jobs: 289, companies: 27 },
];

const categoryData = [
  { label: "Engineering", value: 38, color: "bg-amber-400" },
  { label: "Design", value: 18, color: "bg-sky-400" },
  { label: "Sales & Marketing", value: 22, color: "bg-emerald-400" },
  { label: "Operations", value: 14, color: "bg-violet-400" },
  { label: "Other", value: 8, color: "bg-slate-300" },
];

const initialPendingJobs = [
  { id: "JB-2201", title: "Senior Backend Engineer", company: "Nimbus Cloud Systems", location: "Bengaluru, IN", type: "Full-time", category: "Engineering", salary: "₹22L – ₹32L", posted: "2 hours ago", applicants: 0, initials: "NC" },
  { id: "JB-2202", title: "Product Designer (UX)", company: "Fernpath Studio", location: "Remote", type: "Contract", category: "Design", salary: "₹14L – ₹18L", posted: "5 hours ago", applicants: 0, initials: "FS" },
  { id: "JB-2203", title: "Growth Marketing Manager", company: "Halcyon Retail Co.", location: "Kochi, IN", type: "Full-time", category: "Marketing", salary: "₹12L – ₹16L", posted: "Yesterday", applicants: 0, initials: "HR" },
  { id: "JB-2204", title: "DevOps Engineer", company: "Nimbus Cloud Systems", location: "Hyderabad, IN", type: "Full-time", category: "Engineering", salary: "₹18L – ₹26L", posted: "Yesterday", applicants: 0, initials: "NC" },
  { id: "JB-2205", title: "HR Business Partner", company: "Solstice Financial", location: "Mumbai, IN", type: "Full-time", category: "Operations", salary: "₹15L – ₹20L", posted: "2 days ago", applicants: 0, initials: "SF" },
  { id: "JB-2206", title: "Junior Data Analyst", company: "Pebble & Co.", location: "Remote", type: "Internship", category: "Engineering", salary: "₹6L – ₹8L", posted: "2 days ago", applicants: 0, initials: "PC" },
];

const initialPendingCompanies = [
  { id: "CO-3301", name: "Nimbus Cloud Systems", industry: "Cloud Infrastructure", size: "201–500", location: "Bengaluru, IN", submitted: "3 hours ago", docs: 3, email: "hr@nimbuscloud.io", initials: "NC" },
  { id: "CO-3302", name: "Fernpath Studio", industry: "Design Agency", size: "11–50", location: "Remote-first", submitted: "1 day ago", docs: 2, email: "hello@fernpath.co", initials: "FS" },
  { id: "CO-3303", name: "Solstice Financial", industry: "Fintech", size: "501–1000", location: "Mumbai, IN", submitted: "1 day ago", docs: 4, email: "careers@solstice.fi", initials: "SF" },
  { id: "CO-3304", name: "Pebble & Co.", industry: "E-commerce", size: "51–200", location: "Kochi, IN", submitted: "3 days ago", docs: 3, email: "talent@pebbleco.com", initials: "PC" },
];

const initialEmployers = [
  { id: "EM-01", name: "Orbital Tech Pvt Ltd", industry: "SaaS", jobsPosted: 24, activeJobs: 9, joined: "Jan 2025", status: "active", initials: "OT" },
  { id: "EM-02", name: "Meridian Health Group", industry: "Healthcare", jobsPosted: 41, activeJobs: 14, joined: "Nov 2024", status: "active", initials: "MH" },
  { id: "EM-03", name: "Larkspur Logistics", industry: "Supply Chain", jobsPosted: 12, activeJobs: 2, joined: "Mar 2025", status: "active", initials: "LL" },
  { id: "EM-04", name: "Copperline Media", industry: "Advertising", jobsPosted: 7, activeJobs: 0, joined: "Feb 2025", status: "suspended", initials: "CM" },
  { id: "EM-05", name: "Whitestone Realty", industry: "Real Estate", jobsPosted: 18, activeJobs: 6, joined: "Aug 2024", status: "active", initials: "WR" },
];

const initialSeekers = [
  { id: "US-01", name: "Ananya Rao", email: "ananya.rao@mail.com", applied: 14, joined: "Apr 2025", status: "active", initials: "AR" },
  { id: "US-02", name: "Kiran Menon", email: "kiran.menon@mail.com", applied: 6, joined: "May 2025", status: "active", initials: "KM" },
  { id: "US-03", name: "Divya Nair", email: "divya.nair@mail.com", applied: 22, joined: "Jan 2025", status: "active", initials: "DN" },
  { id: "US-04", name: "Rohit Suresh", email: "rohit.s@mail.com", applied: 3, joined: "Jun 2025", status: "suspended", initials: "RS" },
  { id: "US-05", name: "Fathima Beevi", email: "fathima.b@mail.com", applied: 9, joined: "Feb 2025", status: "active", initials: "FB" },
];

/* ------------------------------------------------------------------ */
/*  SMALL UI PRIMITIVES                                                */
/* ------------------------------------------------------------------ */

function Avatar({ initials, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    amber: "bg-amber-100 text-amber-700",
    emerald: "bg-emerald-100 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
  };
  return (
    <div className={`h-9 w-9 shrink-0 rounded-full ${tones[tone]} flex items-center justify-center text-xs font-semibold`}>
      {initials}
    </div>
  );
}

function Badge({ children, tone = "slate" }) {
  const tones = {
    pending: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    active: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
    suspended: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
    slate: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200",
    info: "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, delta, positive, accent }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${positive ? "text-emerald-600" : "text-rose-600"}`}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {delta}
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>{value}</p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-[fadein_0.2s_ease-out]">
      <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${isError ? "bg-rose-50 border-rose-200 text-rose-700" : "bg-emerald-50 border-emerald-200 text-emerald-700"}`}>
        {isError ? <XCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const NAV = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "jobs", label: "Job Approvals", icon: Briefcase },
  { key: "companies", label: "Company Approvals", icon: Building2 },
  { key: "employers", label: "Employers", icon: ShieldCheck },
  { key: "seekers", label: "Job Seekers", icon: Users },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard1() {
  const [active, setActive] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState(null);
  const [detail, setDetail] = useState(null);

  const [pendingJobs, setPendingJobs] = useState(initialPendingJobs);
  const [pendingCompanies, setPendingCompanies] = useState(initialPendingCompanies);
  const [employers, setEmployers] = useState(initialEmployers);
  const [seekers, setSeekers] = useState(initialSeekers);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const fire = (message, type = "success") => setToast({ message, type });

  const approveJob = (id, title) => {
    setPendingJobs((p) => p.filter((j) => j.id !== id));
    fire(`"${title}" approved and published.`);
  };
  const rejectJob = (id, title) => {
    setPendingJobs((p) => p.filter((j) => j.id !== id));
    fire(`"${title}" rejected.`, "error");
  };
  const approveCompany = (id, name) => {
    setPendingCompanies((p) => p.filter((c) => c.id !== id));
    fire(`${name} verified and approved.`);
  };
  const rejectCompany = (id, name) => {
    setPendingCompanies((p) => p.filter((c) => c.id !== id));
    fire(`${name} registration rejected.`, "error");
  };
  const toggleEmployer = (id) => {
    setEmployers((list) =>
      list.map((e) => (e.id === id ? { ...e, status: e.status === "active" ? "suspended" : "active" } : e))
    );
  };
  const toggleSeeker = (id) => {
    setSeekers((list) =>
      list.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "suspended" : "active" } : s))
    );
  };

  const pendingTotal = pendingJobs.length + pendingCompanies.length;

  const filteredJobs = useMemo(
    () => pendingJobs.filter((j) => (j.title + j.company).toLowerCase().includes(query.toLowerCase())),
    [pendingJobs, query]
  );
  const filteredCompanies = useMemo(
    () => pendingCompanies.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())),
    [pendingCompanies, query]
  );
  const filteredEmployers = useMemo(
    () => employers.filter((e) => e.name.toLowerCase().includes(query.toLowerCase())),
    [employers, query]
  );
  const filteredSeekers = useMemo(
    () => seekers.filter((s) => (s.name + s.email).toLowerCase().includes(query.toLowerCase())),
    [seekers, query]
  );

  const pageTitle = NAV.find((n) => n.key === active)?.label ?? "Overview";

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
        @keyframes fadein { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; }
      `}</style>

      <div className="flex">
        {/* ------------------------------------------------------------ SIDEBAR */}
       

        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ------------------------------------------------------------ MAIN */}
        <div className="flex-1 min-w-0">
          {/* Topbar */}
        

          <main className="p-4 lg:p-8">
            {active === "overview" && (
              <OverviewView
                pendingTotal={pendingTotal}
                pendingJobs={pendingJobs}
                pendingCompanies={pendingCompanies}
                employers={employers}
                seekers={seekers}
                goTo={setActive}
              />
            )}

            {active === "jobs" && (
              <JobsView jobs={filteredJobs} onApprove={approveJob} onReject={rejectJob} onView={setDetail} />
            )}

            {active === "companies" && (
              <CompaniesView companies={filteredCompanies} onApprove={approveCompany} onReject={rejectCompany} onView={setDetail} />
            )}

            {active === "employers" && (
              <PeopleView
                title="Employers"
                rows={filteredEmployers}
                columns={["Company", "Industry", "Jobs Posted", "Active", "Joined", "Status"]}
                type="employer"
                onToggle={toggleEmployer}
              />
            )}

            {active === "seekers" && (
              <PeopleView
                title="Job Seekers"
                rows={filteredSeekers}
                columns={["Name", "Email", "Applications", "Joined", "Status"]}
                type="seeker"
                onToggle={toggleSeeker}
              />
            )}

            {active === "settings" && <SettingsView />}
          </main>
        </div>
      </div>

      <Toast toast={toast} />
      {detail && <DetailModal item={detail} onClose={() => setDetail(null)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  OVERVIEW                                                           */
/* ------------------------------------------------------------------ */

function OverviewView({ pendingTotal, pendingJobs, pendingCompanies, employers, seekers, goTo }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Briefcase} label="Total Active Jobs" value="1,248" delta="8.2%" positive accent="bg-amber-50 text-amber-600" />
        <StatCard icon={Clock} label="Pending Approvals" value={pendingTotal} delta="Needs review" positive={false} accent="bg-rose-50 text-rose-600" />
        <StatCard icon={Building2} label="Verified Companies" value={employers.length + "12"} delta="4.1%" positive accent="bg-sky-50 text-sky-600" />
        <StatCard icon={Users} label="Registered Seekers" value="9,532" delta="12.6%" positive accent="bg-emerald-50 text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Postings Trend</h3>
              <p className="text-sm text-slate-500">Jobs & companies onboarded per month</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-amber-400" /> Jobs</span>
              <span className="flex items-center gap-1.5 text-slate-500"><span className="h-2 w-2 rounded-full bg-slate-300" /> Companies</span>
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ left: -20, top: 10 }}>
                <defs>
                  <linearGradient id="jobsFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13 }} />
                <Area type="monotone" dataKey="jobs" stroke="#f59e0b" strokeWidth={2.5} fill="url(#jobsFill)" />
                <Area type="monotone" dataKey="companies" stroke="#cbd5e1" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Jobs by Category</h3>
          <p className="text-sm text-slate-500">Share of active listings</p>
          <div className="mt-5 space-y-4">
            {categoryData.map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
                  <span>{c.label}</span>
                  <span>{c.value}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full ${c.color} rounded-full`} style={{ width: `${c.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Jobs Awaiting Review</h3>
            <button onClick={() => goTo("jobs")} className="text-xs font-semibold text-amber-600 hover:underline">View all</button>
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {pendingJobs.slice(0, 4).map((j) => (
              <li key={j.id} className="flex items-center gap-3 py-3">
                <Avatar initials={j.initials} tone="slate" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{j.title}</p>
                  <p className="truncate text-xs text-slate-500">{j.company} · {j.location}</p>
                </div>
                <Badge tone="pending">Pending</Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>Companies Awaiting Verification</h3>
            <button onClick={() => goTo("companies")} className="text-xs font-semibold text-amber-600 hover:underline">View all</button>
          </div>
          <ul className="mt-4 divide-y divide-slate-100">
            {pendingCompanies.map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-3">
                <Avatar initials={c.initials} tone="sky" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-800">{c.name}</p>
                  <p className="truncate text-xs text-slate-500">{c.industry} · {c.docs} documents</p>
                </div>
                <Badge tone="info">New</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  JOB APPROVALS                                                      */
/* ------------------------------------------------------------------ */

function SectionHeader({ title, subtitle, count }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      {typeof count === "number" && (
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{count} pending</span>
      )}
    </div>
  );
}

function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
        <Check className="h-6 w-6" />
      </div>
      <p className="font-semibold text-slate-700">All caught up</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}

function JobsView({ jobs, onApprove, onReject, onView }) {
  return (
    <div>
      <SectionHeader title="Job Approvals" subtitle="Review job listings submitted by employers before they go live." count={jobs.length} />
      {jobs.length === 0 ? (
        <EmptyState label="No pending job listings right now." />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((j) => (
            <div key={j.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
              <Avatar initials={j.initials} tone="slate" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">{j.title}</p>
                  <Badge tone="pending">Pending review</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">{j.company}</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{j.location}</span>
                  <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{j.type}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{j.posted}</span>
                  <span className="font-medium text-slate-600">{j.salary}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button onClick={() => onView(j)} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  <Eye className="h-4 w-4" /> View
                </button>
                <button onClick={() => onReject(j.id, j.title)} className="flex items-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button onClick={() => onApprove(j.id, j.title)} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700">
                  <Check className="h-4 w-4" /> Approve
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPANY APPROVALS                                                  */
/* ------------------------------------------------------------------ */

function CompaniesView({ companies, onApprove, onReject, onView }) {
  return (
    <div>
      <SectionHeader title="Company Registrations" subtitle="Verify new employer accounts before they can post jobs." count={companies.length} />
      {companies.length === 0 ? (
        <EmptyState label="No pending company registrations." />
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {companies.map((c) => (
            <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <Avatar initials={c.initials} tone="sky" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <p className="text-sm text-slate-500">{c.industry} · {c.size} employees</p>
                </div>
                <Badge tone="pending">New</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{c.location}</span>
                <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{c.email}</span>
                <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" />{c.docs} documents attached</span>
                <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />Submitted {c.submitted}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
                <button onClick={() => onView(c)} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  <Eye className="h-4 w-4" /> Review docs
                </button>
                <button onClick={() => onReject(c.id, c.name)} className="ml-auto flex items-center gap-1.5 rounded-xl border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  <XCircle className="h-4 w-4" /> Reject
                </button>
                <button onClick={() => onApprove(c.id, c.name)} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700">
                  <Check className="h-4 w-4" /> Verify
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  EMPLOYERS / JOB SEEKERS TABLE                                      */
/* ------------------------------------------------------------------ */

function PeopleView({ title, rows, columns, type, onToggle }) {
  return (
    <div>
      <SectionHeader title={title} subtitle={type === "employer" ? "Manage employer accounts and their posting activity." : "Manage registered job seeker accounts."} />
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4">
          <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <span className="text-xs text-slate-400">{rows.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
                {columns.map((c) => (
                  <th key={c} className="px-5 py-3 font-semibold">{c}</th>
                ))}
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70">
                  {type === "employer" ? (
                    <>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar initials={r.initials} tone="slate" />
                          <span className="font-medium text-slate-800">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{r.industry}</td>
                      <td className="px-5 py-3.5 text-slate-500">{r.jobsPosted}</td>
                      <td className="px-5 py-3.5 text-slate-500">{r.activeJobs}</td>
                      <td className="px-5 py-3.5 text-slate-500">{r.joined}</td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar initials={r.initials} tone="emerald" />
                          <span className="font-medium text-slate-800">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">{r.email}</td>
                      <td className="px-5 py-3.5 text-slate-500">{r.applied}</td>
                      <td className="px-5 py-3.5 text-slate-500">{r.joined}</td>
                    </>
                  )}
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <Badge tone={r.status === "active" ? "active" : "suspended"}>
                        {r.status === "active" ? "Active" : "Suspended"}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onToggle(r.id)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                          r.status === "active"
                            ? "border border-rose-200 text-rose-600 hover:bg-rose-50"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {r.status === "active" ? "Suspend" : "Reactivate"}
                      </button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SETTINGS (placeholder)                                             */
/* ------------------------------------------------------------------ */

function SettingsView() {
  return (
    <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Settings className="h-6 w-6" />
      </div>
      <p className="font-semibold text-slate-700">Platform settings</p>
      <p className="mt-1 text-sm text-slate-500">Hook up your admin roles, approval rules, and notification preferences here.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DETAIL MODAL                                                       */
/* ------------------------------------------------------------------ */

function DetailModal({ item, onClose }) {
  const isJob = "title" in item;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start gap-3">
          <Avatar initials={item.initials} tone={isJob ? "slate" : "sky"} />
          <div>
            <h3 className="font-bold text-slate-900" style={{ fontFamily: "'Sora', sans-serif" }}>
              {isJob ? item.title : item.name}
            </h3>
            <p className="text-sm text-slate-500">{isJob ? item.company : item.industry}</p>
          </div>
          <button onClick={onClose} className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-sm">
          {isJob ? (
            <>
              <Row label="Location" value={item.location} />
              <Row label="Employment type" value={item.type} />
              <Row label="Category" value={item.category} />
              <Row label="Salary range" value={item.salary} />
              <Row label="Posted" value={item.posted} />
            </>
          ) : (
            <>
              <Row label="Industry" value={item.industry} />
              <Row label="Company size" value={item.size} />
              <Row label="Location" value={item.location} />
              <Row label="Contact email" value={item.email} />
              <Row label="Documents submitted" value={`${item.docs} files`} />
              <Row label="Submitted" value={item.submitted} />
            </>
          )}
        </div>

        <button onClick={onClose} className="mt-6 w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
          Close
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}