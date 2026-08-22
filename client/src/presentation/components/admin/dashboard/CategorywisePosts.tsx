import React from 'react';
import type { IndustryPostCount } from './DashbordContainer';
import type { IndustryType } from '../../../../types/dtos/profile-types/industry.type';

const colorData: Record<IndustryType, string> = {
  'Information Technology': 'bg-blue-500',
  'Finance And Banking': 'bg-green-500',
  Healthcare: 'bg-red-500',
  Manufacturing: 'bg-orange-500',
  'Retail And E-commerce': 'bg-purple-500',
  Education: 'bg-yellow-500',
  'Media And Communication': 'bg-pink-500',
  Logistics: 'bg-cyan-500',
  Other: 'bg-slate-500',
};

type Props = {
  postData: IndustryPostCount[];
};
function CategorywisePosts({ postData }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm duration-300 hover:-translate-y-1 hover:border-slate-300     hover:shadow-lg">
  <h3
    className="font-bold text-slate-900"
    style={{ fontFamily: "'Sora', sans-serif" }}
  >
    Jobs by Category
  </h3>

  <p className="text-sm text-slate-500">Share of active listings</p>

  <div className="mt-5 max-h-[280px] space-y-4 overflow-y-auto pr-2">
    {postData.map((c) => (
      <div key={c.industry}>
        <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
          <span>{c.industry}</span>
          <span>{c.count}%</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${colorData[c.industry]}`}
            style={{ width: `${c.count}%` }}
          />
        </div>
      </div>
    ))}
  </div>
</div>
//     <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//       <h3
//         className="font-bold text-slate-900"
//         style={{ fontFamily: "'Sora', sans-serif" }}
//       >
//         Jobs by Category
//       </h3>
//       <p className="text-sm text-slate-500">Share of active listings</p>
//       {/* <div className="mt-6 space-y-6">
//         {postData.map((c) => (
//           <div key={c.industry}>
//             <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
//               <span>{c.industry}</span>
//               <span>{c.count}%</span>
//             </div>
//             <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
//               <div
//                 className={`h-full ${colorData[c.industry]} rounded-full`}
//                 style={{ width: `${c.count}%` }}
//               />
//             </div>
//           </div>
//         ))}
//       </div> */}
//       <div className="mt-5 space-y-5">
//   {postData.map((c) => (
//     <div key={c.industry}>
//       <div className="mb-2 flex items-center justify-between">
//         <span className="text-sm font-medium text-slate-700">
//           {c.industry}
//         </span>

//         <span className="text-sm font-semibold text-slate-900">
//           {c.count}%
//         </span>
//       </div>

//       <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
//         <div
//           className={`h-full rounded-full ${colorData[c.industry]}`}
//           style={{ width: `${c.count}%` }}
//         />
//       </div>
//     </div>
//   ))}
// </div>
//     </div>
  );
}

export default CategorywisePosts;
