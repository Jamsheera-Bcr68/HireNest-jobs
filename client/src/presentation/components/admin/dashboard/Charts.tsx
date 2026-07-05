import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  YAxis,
  Tooltip,
  Area,
} from 'recharts';
import type {
  AppData,
  Company_Job_ChartData,
  InterviewData,
  UserData,
} from './DashbordContainer';

// const CHART_DATA = [
//   { month: 'Jan', jobs: 320, companies: 42 },
//   { month: 'Feb', jobs: 410, companies: 51 },
//   { month: 'Mar', jobs: 380, companies: 47 },
//   { month: 'Apr', jobs: 520, companies: 63 },
//   { month: 'May', jobs: 610, companies: 71 },
//   { month: 'Jun', jobs: 580, companies: 68 },
//   { month: 'Jul', jobs: 720, companies: 84 },
// ];
type Props = {
  chartData: Company_Job_ChartData[];
};

function Company_Job_chart({ chartData }: Props) {
  return (
    <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg text-slate-900">
            Platform growth
          </h3>
          <p className="text-sm text-slate-400">Job posts vs. new companies</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Jobs
          </span>
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            Companies
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ left: -20, right: 10, top: 10 }}
          >
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
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eef0f4"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                fontSize: 13,
              }}
            />
            <Area
              type="monotone"
              dataKey="jobs"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#jobsGrad)"
            />
            <Area
              type="monotone"
              dataKey="companies"
              stroke="#2dd4bf"
              strokeWidth={2}
              fill="url(#compGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
export default Company_Job_chart;

type UserDataProps = {
  userData: UserData[];
};
export function UserDistributionChart({ userData }: UserDataProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="font-display text-lg text-slate-900">User distribution</h3>
      <p className="text-sm text-slate-400 mb-2">Companies vs. candidates</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={userData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {userData.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                fontSize: 13,
              }}
              formatter={(value, name, item) => [
                `${value}%`,
                item.payload.label,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-1.5 mt-1">
        {userData.map((u) => (
          <li
            key={u.label}
            className="flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2 text-slate-500">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: u.color }}
              />
              {u.label}
            </span>
            <span className="font-semibold text-slate-700">{u.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type AppChartProps = {
  appData: AppData[];
};

export function ApplicationByIndustry({ appData }: AppChartProps) {
 // console.log('chart app data', appData);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="font-display text-lg text-slate-900">
        Applications by Industry
      </h3>
      <p className="text-sm text-slate-400 mb-2">
        Sent by candidates, all-time
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={appData} margin={{ left: -20, right: 10, top: 10 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eef0f4"
            />
            <XAxis
              dataKey="industry"
              tickLine={false}
              axisLine={{
                stroke: '#cbd5e1',
                strokeOpacity: 0.4,
              }}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis
              tickLine={false}
              axisLine={{
                stroke: '#cbd5e1',
                strokeOpacity: 0.4,
              }}
              tick={{ fontSize: 12, fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                fontSize: 13,
              }}
            />
            <Bar
              maxBarSize={30}
              dataKey="count"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


const INTERVIEW_STATUS = [
  { name: 'Scheduled', value: 184, color: '#6366f1' },
  { name: 'Completed', value: 342, color: '#22c55e' },
  { name: 'Rejected', value: 128, color: '#f43f5e' },
  { name: 'No-show', value: 41, color: '#f59e0b' },
  { name: 'Awaiting feedback', value: 76, color: '#94a3b8' },
];
type InterviewProps={
  interviewData:InterviewData[]
}
export function InterviewStatusChart({interviewData}:InterviewProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h3 className="font-display text-lg text-slate-900">Interview status</h3>
      <p className="text-sm text-slate-400 mb-2">Across all active pipelines</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={interviewData}
              dataKey="value"
              nameKey="label"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {INTERVIEW_STATUS.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                fontSize: 13,
              }}
              formatter={(value,name,item) => value?.toLocaleString()+'%'}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-1.5 mt-1">
        {interviewData.map((s) => (
          <li
            key={s.label}
            className="flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2 text-slate-500">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </span>
            <span className="font-semibold text-slate-700">
              {s.count}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
