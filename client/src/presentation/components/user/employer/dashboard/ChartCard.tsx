import { MoreHorizontal } from 'lucide-react';
import { useMemo, type ReactNode } from 'react';
import type { AppStatusData, TopJob } from './CompanyDashboardContainer';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  AreaChart,
  CartesianGrid,
  Tooltip,
  Area,
  BarChart,
  Bar,
} from 'recharts';
import { type CompanyAppChartData } from './CompanyDashboardContainer';

type ChartCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  className: string;
};

export function ChartCard({
  title,
  subtitle,
  children,
  className = '',
}: ChartCardProps) {
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

type ApplicationTrendChartProps = {
  data: CompanyAppChartData[];
};

export function ApplicationTrendChart({ data }: ApplicationTrendChartProps) {
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
          dataKey="applicationCount"
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

type TopJobsChartProps = {
  data: TopJob[];
};
export function TopJobsChart({ data }: TopJobsChartProps) {
  
  return (
    <ResponsiveContainer width="100%" height={230}>
     <BarChart data={data} margin={{ top: 8, left: 8, right: 20 }}>
  <CartesianGrid stroke="#f0ede6" vertical={false} />

  
  <XAxis
  dataKey="title"
  interval={0}
  angle={-35}
  textAnchor="end"
  height={70}
  tickLine={false}
  axisLine={false}
  tick={{ fontSize: 11.5, fill: "#57534e" }}
/>

  <YAxis
    type="number"
    tickLine={false}
    axisLine={false}
    tick={{ fontSize: 11.5, fill: "#57534e" }}
  />

  <Tooltip
    cursor={{ fill: "#f5f4f0" }}
    contentStyle={{
      borderRadius: 14,
      border: "1px solid #f0ede6",
      boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
      fontSize: 12,
    }}
  />

  <Bar
    dataKey="applicants"
    fill="#059669"
    radius={[8, 8, 0, 0]} // top-left, top-right, bottom-right, bottom-left
    barSize={16}
  />
</BarChart>
    </ResponsiveContainer>
  );
}

type HiringFunnelChartProps = {
  data: AppStatusData[];
};

export function HiringFunnelChart({ data }: HiringFunnelChartProps) {
  const max = useMemo(() => data.reduce((acc, d) => acc + d.count, 0), [data]);
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
                backgroundColor: stage.bg,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
