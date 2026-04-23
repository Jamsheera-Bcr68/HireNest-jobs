import { APP_STATUS_ORDER } from '../../../../../types/dtos/application.dto';
import type {
  ApplicationDetailsDto,
  ApplicationStatusType,
} from '../../../../../types/dtos/application.dto';
import { Section } from './LeftComponent';
import { appStatusStyles } from '../../../candidate/applications/ApplicationCard';

type Props = {
  updateStatus: (status: ApplicationStatusType) => Promise<void>;
  application: ApplicationDetailsDto;
  role: 'admin' | 'company';
};

const STATUS_OPTIONS: { label: string; value: ApplicationStatusType }[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Reviewed', value: 'reviewed' },
  { label: 'Short Listed', value: 'shortListed' },
  { label: 'Interview Scheduled', value: 'interviewSheduled' },
  { label: 'Rejected', value: 'rejected' },
];

function RightComponent({ application, updateStatus, role }: Props) {
  const canUpdateStatus = (
    current: ApplicationStatusType,
    next: ApplicationStatusType
  ) => {
    const currentIndex = APP_STATUS_ORDER.indexOf(current);
    const nextIndex = APP_STATUS_ORDER.indexOf(next);

    return nextIndex >= currentIndex;
  };
  return (
    <div className="lg:col-span-1 flex flex-col gap-5">
      {/* Job details */}
      <Section title="Applied For">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Position</span>
            <span className="font-medium text-gray-800">
              {application.job.title}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Type</span>
            <span className="text-gray-700">{application.job.jobType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Location</span>
            <span className="text-gray-700">{application.job.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Applied on</span>
            <span className="text-gray-700">{application.appliedAt}</span>
          </div>
        </div>
      </Section>

      {/* Update status */}
      <Section title="Status Level">
        {role=='company'?(<><div className="space-y-2">
          {STATUS_OPTIONS.map((s) => (
           <button
              key={s.label}
              disabled={
                !canUpdateStatus(application.status, s.value) 
              }
              onClick={() => updateStatus(s.value)}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition font-medium ${
                application.status === s.value
                  ? `${appStatusStyles[s.value]} border-transparent`
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              } ${
                !canUpdateStatus(application.status, s.value)
                  ? 'opacity-40 cursor-not-allowed'
                  : ''
              }`}
            >
              {s.label}{' '}
            </button>
          ))}
        </div></>):(<><div className="space-y-2">
          {STATUS_OPTIONS.map((s) => (
           <button
              key={s.label}
              disabled={
                !canUpdateStatus(application.status, s.value) || role == 'admin'
              }
             
              className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition font-medium ${
                application.status === s.value
                  ? `${appStatusStyles[s.value]} border-transparent`
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s.label}{' '}
            </button>
          ))}
        </div></>)}
        
      </Section>

      {/* Activity log */}
      {/* <Section title="Activity Log">
            <div className="space-y-3">
              {application.activityLog.map((log, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                    {i < application.activityLog.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1"></div>}
                  </div>
                  <div className="pb-3">
                    <p className="text-sm text-gray-700">{log.event}</p>
                    <p className="text-xs text-gray-400">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section> */}
    </div>
  );
}

export default RightComponent;
