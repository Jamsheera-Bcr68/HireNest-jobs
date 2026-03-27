import type { JobCardDto } from '../../../../types/dtos/jobDto';
import { formatSalary } from '../../../../utils/salaryFormat';
import { LocateIcon } from 'lucide-react';
import JobCard from '../Cards';
const badgeClass = (t: string) => {
  if (t === 'Remote OK' || t === 'Remote')
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (t === 'Hybrid')
    return 'bg-amber-50 text-amber-700 border border-amber-200';
  if (t === 'On-site') return 'bg-red-50 text-red-700 border border-red-200';
  if (t === 'Senior')
    return 'bg-violet-50 text-violet-700 border border-violet-200';
  if (t === 'Mid-level')
    return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
  if (t === 'Lead') return 'bg-pink-50 text-pink-700 border border-pink-200';
  return 'bg-slate-100 text-slate-600';
};
// const featuredJobs = [
//   {
//     title: "Senior Product Designer",
//     company: "Stripe",
//     location: "San Francisco, CA",
//     type: "Full-time",
//     salary: "$120k – $160k",
//     logo: "S",
//     color: "#635BFF",
//     tags: ["Remote OK", "Senior"],
//   },
//   {
//     title: "Backend Engineer",
//     company: "Notion",
//     location: "New York, NY",
//     type: "Full-time",
//     salary: "$140k – $180k",
//     logo: "N",
//     color: "#000000",
//     tags: ["Hybrid", "Lead"],
//   },
//   {
//     title: "Data Analyst",
//     company: "Airbnb",
//     location: "Remote",
//     type: "Contract",
//     salary: "$80k – $110k",
//     logo: "A",
//     color: "#FF5A5F",
//     tags: ["Remote", "Mid-level"],
//   },
//   {
//     title: "DevOps Engineer",
//     company: "Figma",
//     location: "Austin, TX",
//     type: "Full-time",
//     salary: "$130k – $170k",
//     logo: "F",
//     color: "#F24E1E",
//     tags: ["On-site", "Senior"],
//   },
//   {
//     title: "Marketing Manager",
//     company: "Shopify",
//     location: "Toronto, Canada",
//     type: "Full-time",
//     salary: "$90k – $120k",
//     logo: "S",
//     color: "#96BF48",
//     tags: ["Hybrid", "Mid-level"],
//   },
//   {
//     title: "iOS Developer",
//     company: "Linear",
//     location: "Remote",
//     type: "Full-time",
//     salary: "$110k – $150k",
//     logo: "L",
//     color: "#5E6AD2",
//     tags: ["Remote", "Senior"],
//   },
// ];
type Props = {
  featuredJobs: JobCardDto[];
};
function FeaturedJobs({ featuredJobs }: Props) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-indigo-500 text-xs font-bold mb-1.5 tracking-widest uppercase">
              Opportunities
            </p>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Jobs
            </h2>
          </div>
          <a
            href="#"
            className="text-sm text-indigo-500 font-semibold hover:text-indigo-700 transition-colors hidden md:block"
          >
            View all jobs →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredJobs.map((job, i) => (
            <JobCard job={job} key={i} />
            // <div
            //   key={i}
            //   className="card-hover rounded-2xl p-6 cursor-pointer bg-white  transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200"
            //   style={{
            //     border: '1.5px solid #e8edf5',
            //     boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            //   }}
            // >
            //   <div className="flex items-start justify-between mb-4">
            //     <div className="bg-indigo-200 w-full h-1 rounded-2xl"></div>
            //     <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-md">
            //       <img
            //         className=" rounded-xl"
            //         src={`${backendUrl}${job.companyLogo}`}
            //         alt=""
            //       />{' '}
            //     </div>
            //     <button className="text-slate-300 hover:text-indigo-500 transition-colors">
            //       <svg
            //         className="w-5 h-5"
            //         fill="none"
            //         stroke="currentColor"
            //         viewBox="0 0 24 24"
            //       >
            //         <path
            //           strokeLinecap="round"
            //           strokeLinejoin="round"
            //           strokeWidth={2}
            //           d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            //         />
            //       </svg>
            //     </button>
            //   </div>
            //   <h3 className="font-bold text-slate-800 text-base mb-1">
            //     {job.title}
            //   </h3>
            //   <p className="text-slate-400 text-sm font-semibold mb-3">
            //     {job.companyName}
            //   </p>
            //   <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-4">
            //     <svg
            //       className="w-3.5 h-3.5"
            //       fill="none"
            //       stroke="currentColor"
            //       viewBox="0 0 24 24"
            //     >
            //       <path
            //         strokeLinecap="round"
            //         strokeLinejoin="round"
            //         strokeWidth={2}
            //         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            //       />
            //     </svg>
            //     {job?.location?.state} , {job?.location?.country}
            //     <span className="mx-1 text-slate-300">·</span>
            //     {job.mode}
            //   </div>
            //   <div className="flex flex-wrap gap-1.5 mb-4">
            //     {/* {job.tags.map(t => (
            //         <span key={t} className={`text-xs px-2.5 py-1 rounded-full font-semibold ${badgeClass(t)}`}>{t}</span>
            //       ))} */}
            //   </div>
            //   <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            //     <span className="text-indigo-600 text-sm font-bold">
            //       {formatSalary(job.min_salary, job.max_salary)}
            //     </span>
            //     <button
            //       className="text-xs font-bold text-white px-4 py-1.5 rounded-lg shadow-sm"
            //       style={{
            //         background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
            //       }}
            //     >
            //       Apply
            //     </button>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedJobs;
