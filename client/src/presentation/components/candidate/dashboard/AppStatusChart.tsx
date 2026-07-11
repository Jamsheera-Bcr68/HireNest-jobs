import { ChevronRight, TrendingUp, Inbox } from 'lucide-react';
import { SkeletonBlock } from './StatusCards';
import { EmptyState } from './Common';
import { useMemo } from 'react';
import { type AppStatusData, type RecentApps } from './CandidateDashboardContainer';
import { useNavigate } from 'react-router-dom';

import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  Tooltip as ReTooltip,
} from 'recharts';
import { formatCurrentDate } from '../../../../utils/date-conversion';
type Props = {
  appData: AppStatusData[];
  isLoading: boolean;
  recentApps:RecentApps[]
};



const baseUrl=import.meta.env.VITE_BACKEND_URL
function AppStatusChart({ appData, isLoading ,recentApps}: Props) {

  const max=appData.reduce((a,c)=>Math.max(a,c.count),0)
  const ap=appData.find(a=>a.count==max)
  
  console.log('app data',isLoading,appData);
  console.log('recent app data',recentApps);
  const totalStatus = useMemo(
    () => appData.reduce((sum, d) => sum + d.count, 0),[isLoading,appData]
    
  );
const naviage=useNavigate()

const onViewAllClick=()=>{
  naviage('/candidate/applications')
}
  
  return (
    <div className="lg:col-span-2 space-y-5">
      {/* Application status chart */}
      <div
        className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05]"
        style={{ animationDelay: '120ms' }}
      >
        <SectionHeader
          title="Application Status"
          actionLabel="View all applications"
          onClick={onViewAllClick}
        />
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
                    data={appData}
                    dataKey="count"
                    nameKey="label"
                    innerRadius={54}
                    outerRadius={78}
                    paddingAngle={2}
                    stroke="none"
                    //  onMouseEnter={(_, idx) => setActiveSlice(idx)}
                    // onMouseLeave={() => setActiveSlice(null)}
                  >
                    {appData?.map((d, i) => (
                      <Cell
                        key={d.label}
                        fill={d.color}
                        //opacity={activeSlice === null || activeSlice === i ? 1 : 0.35}
                      />
                    ))}
                  </Pie>
                  <ReTooltip
                    formatter={(value, name) => [`${value} applications`, name]}
                    contentStyle={{
                      borderRadius: 10,
                      border: '1px solid #e2e8f0',
                      fontSize: 12,
                      fontFamily: 'IBM Plex Sans',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-xl font-semibold">
                  {totalStatus}
                </span>
                <span className="text-[10px] text-slate-400">Total</span>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {appData?.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: d.color }}
                    />
                    <span className="text-slate-600 truncate">{d.label}</span>
                    <span className="ml-auto font-medium text-slate-800">
                      {d.count}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2">
                <TrendingUp
                  size={14}
                  className="text-teal-600 mt-0.5 shrink-0"
                />
                <p className="text-[11.5px] text-slate-500 leading-relaxed">
                  Most of your applications are  {' '}
                  <span className="font-medium text-slate-700">
                    {`${ap?.label}`}
                  </span>{' '}
                 
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recent applications */}
      <div
        className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05]"
        style={{ animationDelay: '160ms' }}
      >
        <SectionHeader
          title="Recent Applications"
          actionLabel="View all applications"
          onClick={onViewAllClick}
        />
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
        ) : recentApps.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No applications yet"
            subtitle="Jobs you apply to will show up here so you can track their progress."
           cta='cta'
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {recentApps.map((a, i) => (
              <div
                key={i}
                className="py-3 flex items-center gap-3 group cursor-pointer -mx-2 px-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-[11px] font-semibold shrink-0 ${a.color}`}
                >
                  {a.logoUrl?<img className='rounded-xl' src={`${baseUrl}${a.logoUrl}`} alt="" />:a.companyName.slice(-1)}
                 
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13.5px] font-medium text-slate-800 truncate">
                    {a.title}
                  </p>
                  <p className="text-[11.5px] text-slate-400 truncate">
                    {a.companyName}  · Applied  {formatCurrentDate(new Date(a.appliedAt))}
                  </p>
                </div>
                <span
                  className={`text-[10.5px] font-medium px-2.5 py-1 rounded-full ring-1 whitespace-nowrap `}
                >
                  {a.statusLabel}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

     
      <div
        className="rise bg-white rounded-2xl p-5 sm:p-6 ring-1 ring-slate-900/[0.05] lg:hidden"
        style={{ animationDelay: '200ms' }}
      >
        <SectionHeader title="Recent Notifications" actionLabel="View all" onClick={onViewAllClick}/>
        {/* <NotificationList notifications={notifications} isLoading={isLoading} /> */}
      </div>
    </div>
  );
}

export function SectionHeader({ title, actionLabel ,onClick}:{title:string,actionLabel:string,onClick?:()=>void}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-display text-[15px] font-semibold text-slate-900 tracking-tight">
        {title}
      </h3>
      {actionLabel && (
        <button
          onClick={onClick}
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
export default AppStatusChart;
