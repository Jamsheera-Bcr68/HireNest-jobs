import {
  type ApplicationDto,
  type ApplicationStatusType,
} from '../../../../types/dtos/application.dto';
import { useNavigate } from 'react-router-dom';

export const appStatusStyles: Record<ApplicationStatusType, string> = {
  pending: 'bg-amber-100 text-amber-700',
  shortListed: 'bg-green-100 text-green-700',
  interviewScheduled: 'bg-purple-100 text-purple-700',
  // offered: "bg-green-100 text-green-700",
  reviewed: 'bg-yellow-100 text-yellow-700',
  rejected: 'bg-red-100 text-red-700',
  withdrawn: 'bg-red-100 text-red-600',
};

type Props = {
  app?: ApplicationDto;
};

export function ApplicationCard({ app }: Props) {
  const navigate = useNavigate();
  if (!app) return null;
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-gray-300 transition-colors">
      <div className="flex gap-4 items-start">
        {/* Company Logo */}
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-semibold flex-shrink-0 `}
        >
          <img
            className="rounded-full"
            src={`${baseUrl}${app.logo}`}
            alt={`${app.company?.charAt(0).toUpperCase()}`}
          />
        </div>

        {/* Main Info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-gray-900 truncate">
            {app.jobTitle}
          </h2>
          <p className="text-sm text-gray-500 mb-3">
            {app.company} — {app.location} ({app.workMode})
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              app.jobType == 'partTime'
                ? 'Part Time'
                : app.jobType == 'fullTime'
                  ? 'Full Time'
                  : '',
              app.workMode,
              app.category,
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <span
            className={`text-xs font-medium px-3 py-1  rounded-full ${
              appStatusStyles[app.status] || 'bg-gray-100 text-gray-600'
            }`}
          >
            {app.status}
          </span>
          <p className="text-xs text-gray-700">Applied on: {app.appliedDate}</p>
          <button
            onClick={() => navigate(`/candidate/applications/${app.id}`)}
            className="text-xs px-3 py-1.5 border border-green-400 rounded-lg text-green-500 hover:bg-green-50 transition-colors"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
