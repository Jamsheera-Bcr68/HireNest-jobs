//import { useState } from "react";

const navItems = ["Dashboard", "Job Search", "Applications", "Interviews", "Saved Jobs", "Profile", "Settings"];
const navIcons = ["⊞", "🔍", "📋", "📅", "🔖", "👤", "⚙️"];

const stats = [
  { label: "Jobs Applied", value: "24", change: "+3 this week", icon: "📋", color: "bg-violet-500" },
  { label: "Interviews", value: "6", change: "+2 this month", icon: "📅", color: "bg-sky-500" },
  { label: "Saved Jobs", value: "18", change: "+5 this week", icon: "🔖", color: "bg-amber-500" },
  { label: "Profile Views", value: "142", change: "+31 this week", icon: "👁️", color: "bg-emerald-500" },
];

const applications = [
  { company: "Stripe", role: "Senior Frontend Developer", location: "Remote", salary: "$130k–$160k", applied: "Feb 25, 2026", status: "Interview", logo: "S", color: "bg-violet-500" },
  { company: "Notion", role: "Product Designer", location: "San Francisco, CA", salary: "$110k–$140k", applied: "Feb 20, 2026", status: "Reviewed", logo: "N", color: "bg-slate-700" },
  { company: "Linear", role: "React Engineer", location: "Remote", salary: "$120k–$150k", applied: "Feb 18, 2026", status: "Applied", logo: "L", color: "bg-sky-500" },
  { company: "Vercel", role: "DevOps Engineer", location: "New York, NY", salary: "$125k–$155k", applied: "Feb 14, 2026", status: "Rejected", logo: "V", color: "bg-slate-800" },
  { company: "Figma", role: "UX Researcher", location: "San Francisco, CA", salary: "$105k–$130k", applied: "Feb 10, 2026", status: "Applied", logo: "F", color: "bg-rose-500" },
];

const savedJobs = [
  { company: "Airbnb", role: "Frontend Engineer", location: "Remote", salary: "$135k–$165k", posted: "2 days ago", logo: "A", color: "bg-rose-400" },
  { company: "Shopify", role: "Full Stack Developer", location: "Ottawa, Canada", salary: "$115k–$145k", posted: "3 days ago", logo: "S", color: "bg-emerald-500" },
  { company: "Atlassian", role: "Software Engineer II", location: "Remote", salary: "$120k–$150k", posted: "5 days ago", logo: "A", color: "bg-sky-500" },
];

const interviews = [
  { company: "Stripe", role: "Senior Frontend Developer", date: "Mar 4, 2026", time: "10:00 AM", type: "Video", round: "Technical Round", logo: "S", color: "bg-violet-500" },
  { company: "Notion", role: "Product Designer", date: "Mar 6, 2026", time: "2:00 PM", type: "On-site", round: "Design Review", logo: "N", color: "bg-slate-700" },
];

const recommended = [
  { company: "GitHub", role: "Senior React Developer", location: "Remote", salary: "$140k–$170k", match: "96%", logo: "G", color: "bg-slate-800" },
  { company: "Supabase", role: "Frontend Engineer", location: "Remote", salary: "$115k–$140k", match: "91%", logo: "S", color: "bg-emerald-600" },
  { company: "PlanetScale", role: "UI Engineer", location: "Remote", salary: "$110k–$135k", match: "88%", logo: "P", color: "bg-amber-500" },
];

const statusColor = {
  Applied: "bg-sky-100 text-sky-700",
  Reviewed: "bg-violet-100 text-violet-700",
  Interview: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-red-100 text-red-700",
  Offered: "bg-amber-100 text-amber-700",
};

const interviewTypeColor = {
  Video: "bg-sky-100 text-sky-700",
  "On-site": "bg-violet-100 text-violet-700",
  Phone: "bg-amber-100 text-amber-700",
};

const skills = ["React", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "Next.js", "PostgreSQL"];

export default function CandidateDashboard() {
  // const [activeNav, setActiveNav] = useState("Dashboard");
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  // return (
  //   <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} className="flex h-screen bg-slate-50 overflow-hidden">

  //     {/* Sidebar */}
  //     <aside className={`${sidebarOpen ? "w-64" : "w-16"} transition-all duration-300 bg-slate-900 flex flex-col shrink-0`}>
  //       {/* Logo */}
  //       <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
  //         <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shrink-0">
  //           <span className="text-white font-bold text-sm">H</span>
  //         </div>
  //         {sidebarOpen && <span className="text-white font-bold text-lg tracking-tight">HireFlow</span>}
  //       </div>

  //       {/* Nav */}
  //       <nav className="flex-1 py-6 px-3 space-y-1">
  //         {navItems.map((item, i) => (
  //           <button
  //             key={item}
  //             onClick={() => setActiveNav(item)}
  //             className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
  //               activeNav === item
  //                 ? "bg-sky-600 text-white"
  //                 : "text-slate-400 hover:text-white hover:bg-slate-800"
  //             }`}
  //           >
  //             <span className="text-base">{navIcons[i]}</span>
  //             {sidebarOpen && <span>{item}</span>}
  //           </button>
  //         ))}
  //       </nav>

  //       {/* User */}
  //       <div className="p-4 border-t border-slate-700">
  //         <div className="flex items-center gap-3">
  //           <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center shrink-0">
  //             <span className="text-white text-xs font-bold">AC</span>
  //           </div>
  //           {sidebarOpen && (
  //             <div className="overflow-hidden">
  //               <p className="text-white text-sm font-medium truncate">Alex Carter</p>
  //               <p className="text-slate-400 text-xs truncate">alex@email.com</p>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </aside>

  //     {/* Main */}
  //     <div className="flex-1 flex flex-col overflow-hidden">

  //       {/* Header */}
  //       <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0">
  //         <div className="flex items-center gap-4">
  //           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-slate-700 text-xl">☰</button>
  //           <div>
  //             <h1 className="text-xl font-bold text-slate-800">My Dashboard</h1>
  //             <p className="text-sm text-slate-500">Welcome back, Alex 👋 Your job search is on track!</p>
  //           </div>
  //         </div>
  //         <div className="flex items-center gap-3">
  //           <button className="px-4 py-2 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition-colors">
  //             🔍 Browse Jobs
  //           </button>
  //           <div className="relative">
  //             <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">🔔</button>
  //             <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
  //           </div>
  //           <div className="w-9 h-9 bg-sky-500 rounded-full flex items-center justify-center text-white text-sm font-bold">AC</div>
  //         </div>
  //       </header>

  //       {/* Content */}
  //       <main className="flex-1 overflow-y-auto p-6 space-y-6">

  //         {/* Stats */}
  //         <div className="grid grid-cols-4 gap-4">
  //           {stats.map((s) => (
  //             <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
  //               <div className="flex items-start justify-between mb-3">
  //                 <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-lg`}>{s.icon}</div>
  //                 <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-lg">{s.change}</span>
  //               </div>
  //               <p className="text-3xl font-bold text-slate-800">{s.value}</p>
  //               <p className="text-sm text-slate-500 mt-1">{s.label}</p>
  //             </div>
  //           ))}
  //         </div>

  //         <div className="grid grid-cols-3 gap-6">

  //           {/* Applications */}
  //           <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
  //             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
  //               <h2 className="font-bold text-slate-800">My Applications</h2>
  //               <button className="text-sky-600 text-sm font-medium hover:underline">View All</button>
  //             </div>
  //             <div className="divide-y divide-slate-100">
  //               {applications.map((app, i) => (
  //                 <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
  //                   <div className="flex items-center gap-3">
  //                     <div className={`w-9 h-9 ${app.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
  //                       {app.logo}
  //                     </div>
  //                     <div>
  //                       <p className="text-sm font-semibold text-slate-800">{app.role}</p>
  //                       <p className="text-xs text-slate-500">{app.company} · {app.location}</p>
  //                     </div>
  //                   </div>
  //                   <div className="flex items-center gap-5 shrink-0 ml-4">
  //                     <div className="text-right hidden xl:block">
  //                       <p className="text-xs font-medium text-slate-700">{app.salary}</p>
  //                       <p className="text-xs text-slate-400">{app.applied}</p>
  //                     </div>
  //                     <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${statusColor[app.status]}`}>{app.status}</span>
  //                     <button className="text-slate-400 hover:text-slate-600 text-sm">•••</button>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>

  //           {/* Right column */}
  //           <div className="space-y-5">

  //             {/* Profile Completion */}
  //             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
  //               <div className="flex items-center gap-3 mb-4">
  //                 <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0">AC</div>
  //                 <div>
  //                   <p className="font-bold text-slate-800">Alex Carter</p>
  //                   <p className="text-xs text-slate-500">Frontend Developer · New York</p>
  //                 </div>
  //               </div>
  //               <div className="mb-2 flex justify-between items-center">
  //                 <span className="text-xs text-slate-600 font-medium">Profile Completion</span>
  //                 <span className="text-xs font-bold text-sky-600">78%</span>
  //               </div>
  //               <div className="w-full bg-slate-100 rounded-full h-2 mb-3">
  //                 <div className="bg-sky-500 h-2 rounded-full" style={{ width: "78%" }}></div>
  //               </div>
  //               <p className="text-xs text-slate-500 mb-3">Add a cover photo to complete your profile</p>
  //               <div className="flex flex-wrap gap-1.5">
  //                 {skills.map((s) => (
  //                   <span key={s} className="text-xs bg-sky-50 text-sky-700 font-medium px-2 py-0.5 rounded-lg">{s}</span>
  //                 ))}
  //               </div>
  //             </div>

  //             {/* Upcoming Interviews */}
  //             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
  //               <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
  //                 <h2 className="font-bold text-slate-800">Upcoming Interviews</h2>
  //                 <button className="text-sky-600 text-sm font-medium hover:underline">All</button>
  //               </div>
  //               <div className="divide-y divide-slate-100">
  //                 {interviews.map((iv, i) => (
  //                   <div key={i} className="px-5 py-4">
  //                     <div className="flex items-center gap-2 mb-2">
  //                       <div className={`w-7 h-7 ${iv.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}>{iv.logo}</div>
  //                       <div className="min-w-0">
  //                         <p className="text-sm font-semibold text-slate-800 truncate">{iv.company}</p>
  //                         <p className="text-xs text-slate-500 truncate">{iv.round}</p>
  //                       </div>
  //                     </div>
  //                     <div className="flex items-center justify-between">
  //                       <div>
  //                         <p className="text-xs text-slate-600 font-medium">{iv.date} · {iv.time}</p>
  //                       </div>
  //                       <span className={`text-xs font-medium px-2 py-0.5 rounded-lg ${interviewTypeColor[iv.type]}`}>{iv.type}</span>
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>

  //           </div>
  //         </div>

  //         <div className="grid grid-cols-3 gap-6">

  //           {/* Recommended Jobs */}
  //           <div className="col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm">
  //             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
  //               <h2 className="font-bold text-slate-800">Recommended For You</h2>
  //               <button className="text-sky-600 text-sm font-medium hover:underline">View All</button>
  //             </div>
  //             <div className="divide-y divide-slate-100">
  //               {recommended.map((job, i) => (
  //                 <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
  //                   <div className="flex items-center gap-3">
  //                     <div className={`w-9 h-9 ${job.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>{job.logo}</div>
  //                     <div>
  //                       <p className="text-sm font-semibold text-slate-800">{job.role}</p>
  //                       <p className="text-xs text-slate-500">{job.company} · {job.location}</p>
  //                     </div>
  //                   </div>
  //                   <div className="flex items-center gap-4 shrink-0 ml-4">
  //                     <div className="text-right">
  //                       <p className="text-xs font-semibold text-slate-700">{job.salary}</p>
  //                       <p className="text-xs text-emerald-600 font-medium">{job.match} match</p>
  //                     </div>
  //                     <button className="px-3 py-1.5 bg-sky-600 text-white text-xs font-semibold rounded-lg hover:bg-sky-700 transition-colors">Apply</button>
  //                     <button className="text-slate-400 hover:text-amber-500 text-base transition-colors">🔖</button>
  //                   </div>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>

  //           {/* Saved Jobs */}
  //           <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
  //             <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
  //               <h2 className="font-bold text-slate-800">Saved Jobs</h2>
  //               <button className="text-sky-600 text-sm font-medium hover:underline">View All</button>
  //             </div>
  //             <div className="divide-y divide-slate-100">
  //               {savedJobs.map((job, i) => (
  //                 <div key={i} className="px-6 py-4 hover:bg-slate-50 transition-colors">
  //                   <div className="flex items-center gap-2 mb-2">
  //                     <div className={`w-7 h-7 ${job.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0`}>{job.logo}</div>
  //                     <div className="min-w-0">
  //                       <p className="text-sm font-semibold text-slate-800 truncate">{job.role}</p>
  //                       <p className="text-xs text-slate-500 truncate">{job.company} · {job.location}</p>
  //                     </div>
  //                   </div>
  //                   <div className="flex items-center justify-between">
  //                     <span className="text-xs font-medium text-slate-700">{job.salary}</span>
  //                     <span className="text-xs text-slate-400">{job.posted}</span>
  //                   </div>
  //                   <button className="mt-2 w-full py-1.5 border border-sky-200 text-sky-600 text-xs font-semibold rounded-lg hover:bg-sky-50 transition-colors">
  //                     Quick Apply
  //                   </button>
  //                 </div>
  //               ))}
  //             </div>
  //           </div>

  //         </div>
  //       </main>
  //     </div>
  //   </div>
  // );
}