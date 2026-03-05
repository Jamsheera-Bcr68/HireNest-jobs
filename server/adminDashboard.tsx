//import { useState } from "react";

const navItems = ["Dashboard", "Users", "Employers", "Candidates", "Job Listings", "Reports", "Transactions", "Settings"];
const navIcons = ["⊞", "👥", "🏢", "🧑‍💼", "💼", "📊", "💳", "⚙️"];

const stats = [
  { label: "Total Users", value: "12,480", change: "+320 this week", icon: "👥", color: "bg-indigo-500" },
  { label: "Active Employers", value: "1,240", change: "+48 this week", icon: "🏢", color: "bg-violet-500" },
  { label: "Active Candidates", value: "11,240", change: "+272 this week", icon: "🧑‍💼", color: "bg-sky-500" },
  { label: "Jobs Posted", value: "3,872", change: "+134 this week", icon: "💼", color: "bg-emerald-500" },
  { label: "Applications", value: "28,540", change: "+1,240 this week", icon: "📋", color: "bg-amber-500" },
  { label: "Revenue (Mar)", value: "$48,200", change: "+12% vs last month", icon: "💰", color: "bg-rose-500" },
];

const recentUsers = [
  { name: "Sophia Carter", email: "sophia@email.com", type: "Candidate", joined: "Mar 1, 2026", status: "Active", avatar: "SC", color: "bg-violet-500" },
  { name: "Acme Corp", email: "hr@acmecorp.com", type: "Employer", joined: "Mar 1, 2026", status: "Active", avatar: "AC", color: "bg-indigo-500" },
  { name: "Marcus Liu", email: "marcus@email.com", type: "Candidate", joined: "Feb 28, 2026", status: "Active", avatar: "ML", color: "bg-sky-500" },
  { name: "TechNova Inc", email: "jobs@technova.io", type: "Employer", joined: "Feb 28, 2026", status: "Pending", avatar: "TN", color: "bg-emerald-500" },
  { name: "Priya Nair", email: "priya@email.com", type: "Candidate", joined: "Feb 27, 2026", status: "Active", avatar: "PN", color: "bg-amber-500" },
  { name: "James Okafor", email: "james@email.com", type: "Candidate", joined: "Feb 27, 2026", status: "Suspended", avatar: "JO", color: "bg-rose-500" },
];

const topEmployers = [
  { name: "Stripe", jobs: 24, applicants: 648, hires: 8, plan: "Enterprise", logo: "S", color: "bg-violet-500" },
  { name: "Vercel", jobs: 18, applicants: 412, hires: 5, plan: "Pro", logo: "V", color: "bg-slate-700" },
  { name: "Notion", jobs: 14, applicants: 387, hires: 6, plan: "Pro", logo: "N", color: "bg-slate-800" },
  { name: "Linear", jobs: 11, applicants: 294, hires: 4, plan: "Enterprise", logo: "L", color: "bg-sky-600" },
  { name: "Figma", jobs: 9, applicants: 251, hires: 3, plan: "Pro", logo: "F", color: "bg-rose-500" },
];

const recentJobs = [
  { title: "Senior Frontend Developer", company: "Stripe", category: "Engineering", posted: "Mar 1, 2026", applicants: 82, status: "Active" },
  { title: "Product Manager", company: "Notion", category: "Product", posted: "Feb 28, 2026", applicants: 64, status: "Active" },
  { title: "UX Designer", company: "Figma", category: "Design", posted: "Feb 27, 2026", applicants: 47, status: "Active" },
  { title: "DevOps Engineer", company: "Vercel", category: "Infrastructure", posted: "Feb 26, 2026", applicants: 33, status: "Flagged" },
  { title: "Data Analyst", company: "Linear", category: "Analytics", posted: "Feb 25, 2026", applicants: 28, status: "Closed" },
];

const transactions = [
  { company: "Stripe", plan: "Enterprise", amount: "$499/mo", date: "Mar 1, 2026", status: "Paid" },
  { company: "Vercel", plan: "Pro", amount: "$199/mo", date: "Mar 1, 2026", status: "Paid" },
  { company: "TechNova Inc", plan: "Pro", amount: "$199/mo", date: "Feb 28, 2026", status: "Pending" },
  { company: "Notion", plan: "Pro", amount: "$199/mo", date: "Feb 28, 2026", status: "Paid" },
  { company: "BrightHire", plan: "Starter", amount: "$49/mo", date: "Feb 27, 2026", status: "Failed" },
];

const reports = [
  { label: "New Registrations", value: "320", trend: "↑ 18%", color: "text-emerald-600" },
  { label: "Job Fill Rate", value: "64%", trend: "↑ 5%", color: "text-emerald-600" },
  { label: "Avg. Time to Hire", value: "18 days", trend: "↓ 2 days", color: "text-emerald-600" },
  { label: "Churn Rate", value: "3.2%", trend: "↑ 0.4%", color: "text-red-500" },
];

const userStatusColor = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Suspended: "bg-red-100 text-red-700",
};
const jobStatusColor = {
  Active: "bg-emerald-100 text-emerald-700",
  Flagged: "bg-amber-100 text-amber-700",
  Closed: "bg-slate-100 text-slate-600",
};
const txStatusColor = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Failed: "bg-red-100 text-red-700",
};
const planColor = {
  Enterprise: "bg-violet-100 text-violet-700",
  Pro: "bg-sky-100 text-sky-700",
  Starter: "bg-slate-100 text-slate-600",
};

export default function AdminDashboard() {
//   const [activeNav, setActiveNav] = useState("Dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} className="flex h-screen bg-slate-50 overflow-hidden">

//       {/* Sidebar */}
//       <aside className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-slate-900 flex flex-col shrink-0`}>
//         <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
//           <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
//             <span className="text-white font-bold text-sm">H</span>
//           </div>
//           {sidebarOpen && (
//             <div>
//               <span className="text-white font-bold text-lg tracking-tight">HireFlow</span>
//               <span className="ml-2 text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full font-semibold">Admin</span>
//             </div>
//           )}
//         </div>

//         <nav className="flex-1 py-6 px-3 space-y-1">
//           {navItems.map((item, i) => (
//             <button
//               key={item}
//               onClick={() => setActiveNav(item)}
//               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
//                 activeNav === item
//                   ? "bg-indigo-600 text-white"
//                   : "text-slate-400 hover:text-white hover:bg-slate-800"
//               }`}
//             >
//               <span className="text-base">{navIcons[i]}</span>
//               {sidebarOpen && <span>{item}</span>}
//             </button>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-slate-700">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shrink-0">
//               <span className="text-white text-xs font-bold">SA</span>
//             </div>
//             {sidebarOpen && (
//               <div className="overflow-hidden">
//                 <p className="text-white text-sm font-medium truncate">Super Admin</p>
//                 <p className="text-slate-400 text-xs truncate">admin@hireflow.io</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col overflow-hidden">

//         {/* Header */}
//         <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
//           <div className="flex items-center gap-4">
//             <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-slate-700 text-xl">☰</button>
//             <div>
//               <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
//               <p className="text-sm text-slate-500">Monday, March 2, 2026 · Platform Overview</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
//               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
//               All Systems Operational
//             </div>
//             <div className="relative">
//               <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">🔔</button>
//               <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">7</span>
//             </div>
//             <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold">SA</div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 overflow-y-auto p-6 space-y-6">

//           {/* Stats */}
//           <div className="grid grid-cols-6 gap-4">
//             {stats.map((s) => (
//               <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
//                 <div className={`w-9 h-9 ${s.color} rounded-xl flex items-center justify-center text-base mb-3`}>{s.icon}</div>
//                 <p className="text-2xl font-bold text-slate-800">{s.value}</p>
//                 <p className="text-xs text-slate-500 mt-0.5 font-medium">{s.label}</p>
//                 <p className="text-xs text-emerald-600 mt-1">{s.change}</p>
//               </div>
//             ))}
//           </div>

//           {/* Quick Reports */}
//           <div className="grid grid-cols-4 gap-4">
//             {reports.map((r) => (
//               <div key={r.label} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-slate-500 font-medium">{r.label}</p>
//                   <p className="text-xl font-bold text-slate-800 mt-0.5">{r.value}</p>
//                 </div>
//                 <span className={`text-sm font-bold ${r.color}`}>{r.trend}</span>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-3 gap-6">

//             {/* Recent Users */}
//             <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
//               <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//                 <h2 className="font-bold text-slate-800">Recent Registrations</h2>
//                 <div className="flex items-center gap-3">
//                   <input placeholder="Search users..." className="text-xs border border-slate-200 rounded-xl px-3 py-1.5 text-slate-600 placeholder-slate-400 outline-none focus:border-indigo-400" />
//                   <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
//                 </div>
//               </div>
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-xs text-slate-400 uppercase tracking-wide bg-slate-50">
//                     <th className="px-6 py-3 text-left font-semibold">User</th>
//                     <th className="px-6 py-3 text-left font-semibold">Type</th>
//                     <th className="px-6 py-3 text-left font-semibold">Joined</th>
//                     <th className="px-6 py-3 text-left font-semibold">Status</th>
//                     <th className="px-6 py-3 text-left font-semibold">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {recentUsers.map((u, i) => (
//                     <tr key={i} className="hover:bg-slate-50 transition-colors">
//                       <td className="px-6 py-3">
//                         <div className="flex items-center gap-3">
//                           <div className={`w-8 h-8 ${u.color} rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0`}>{u.avatar}</div>
//                           <div>
//                             <p className="text-sm font-semibold text-slate-800">{u.name}</p>
//                             <p className="text-xs text-slate-400">{u.email}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-6 py-3">
//                         <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${u.type === "Employer" ? "bg-indigo-100 text-indigo-700" : "bg-sky-100 text-sky-700"}`}>{u.type}</span>
//                       </td>
//                       <td className="px-6 py-3 text-xs text-slate-500">{u.joined}</td>
//                       <td className="px-6 py-3">
//                         <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${userStatusColor[u.status]}`}>{u.status}</span>
//                       </td>
//                       <td className="px-6 py-3">
//                         <div className="flex gap-2">
//                           <button className="text-xs text-indigo-600 font-medium hover:underline">View</button>
//                           <button className="text-xs text-slate-400 font-medium hover:text-red-500 hover:underline">Suspend</button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Top Employers */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
//               <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//                 <h2 className="font-bold text-slate-800">Top Employers</h2>
//                 <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
//               </div>
//               <div className="divide-y divide-slate-100">
//                 {topEmployers.map((emp, i) => (
//                   <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-8 h-8 ${emp.color} rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0`}>{emp.logo}</div>
//                       <div>
//                         <p className="text-sm font-semibold text-slate-800">{emp.name}</p>
//                         <p className="text-xs text-slate-400">{emp.jobs} jobs · {emp.applicants} applicants</p>
//                       </div>
//                     </div>
//                     <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${planColor[emp.plan]}`}>{emp.plan}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6">

//             {/* Job Listings */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
//               <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//                 <h2 className="font-bold text-slate-800">Recent Job Listings</h2>
//                 <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
//               </div>
//               <div className="divide-y divide-slate-100">
//                 {recentJobs.map((job, i) => (
//                   <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
//                     <div className="min-w-0 flex-1">
//                       <p className="text-sm font-semibold text-slate-800 truncate">{job.title}</p>
//                       <p className="text-xs text-slate-500">{job.company} · {job.category} · {job.applicants} applicants</p>
//                     </div>
//                     <div className="flex items-center gap-3 ml-3 shrink-0">
//                       <p className="text-xs text-slate-400 hidden xl:block">{job.posted}</p>
//                       <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${jobStatusColor[job.status]}`}>{job.status}</span>
//                       <button className="text-xs text-indigo-600 font-medium hover:underline">Review</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Transactions */}
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
//               <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
//                 <h2 className="font-bold text-slate-800">Recent Transactions</h2>
//                 <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
//               </div>
//               <div className="divide-y divide-slate-100">
//                 {transactions.map((tx, i) => (
//                   <div key={i} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
//                     <div>
//                       <p className="text-sm font-semibold text-slate-800">{tx.company}</p>
//                       <p className="text-xs text-slate-500">{tx.date}</p>
//                     </div>
//                     <div className="flex items-center gap-3 shrink-0 ml-3">
//                       <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${planColor[tx.plan]}`}>{tx.plan}</span>
//                       <p className="text-sm font-bold text-slate-800">{tx.amount}</p>
//                       <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${txStatusColor[tx.status]}`}>{tx.status}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Revenue Summary */}
//               <div className="px-6 py-4 bg-indigo-50 rounded-b-2xl border-t border-indigo-100 flex items-center justify-between">
//                 <div>
//                   <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wide">Monthly Revenue</p>
//                   <p className="text-xl font-bold text-indigo-700 mt-0.5">$48,200</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-xs text-slate-500">vs last month</p>
//                   <p className="text-sm font-bold text-emerald-600">↑ +12%</p>
//                 </div>
//               </div>
//             </div>

//           </div>

//         </main>
//       </div>
//     </div>
//   );
}