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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3
        className="font-bold text-slate-900"
        style={{ fontFamily: "'Sora', sans-serif" }}
      >
        Jobs by Category
      </h3>
      <p className="text-sm text-slate-500">Share of active listings</p>
      <div className="mt-5 space-y-4">
        {postData.map((c) => (
          <div key={c.industry}>
            <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-600">
              <span>{c.industry}</span>
              <span>{c.count}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full ${colorData[c.industry]} rounded-full`}
                style={{ width: `${c.count}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategorywisePosts;
