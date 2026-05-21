import { CheckCheck } from 'lucide-react';
import { type InterviewDto } from '../../../../types/dtos/interview.dto';
import { to12Hour } from '../../../../utils/date-conversion';

type Props = {
  interviews: InterviewDto[];

  onConfirmClick: (id: string) => void;
  onViewClick: (id: string) => Promise<void>;
};

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export function CandidateInterviewList({
  interviews,
  onConfirmClick,
  onViewClick,
}: Props) {
  return (
    <>
      {interviews.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-sm">
          No interviews scheduled.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start justify-between gap-4">
                {/* LEFT SECTION */}
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  <div className="w-10 h-10 rounded-xl overflow-hidden border bg-gray-50 flex items-center justify-center shrink-0">
                    {interview.companyLogo ? (
                      <img
                        src={`${baseUrl}${interview.companyLogo}`}
                        alt={interview.company}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-semibold text-gray-500">
                        {interview.company?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* DETAILS */}
                  <div className="flex flex-col gap-1">
                    {/* Job Title */}
                    <h3 className="font-semibold text-gray-800 text-base">
                      {interview.jobTitle}
                    </h3>

                    {/* Company */}
                    <p className="text-sm text-gray-500 font-medium">
                      {interview.company}
                    </p>

                    {/* Date */}
                    <p className="text-sm text-gray-600">
                      {interview.scheduledAt.date} at{' '}
                      {to12Hour(interview.scheduledAt.time)}
                    </p>

                    {/* Mode */}
                    <span className="text-xs text-gray-400 capitalize">
                      {interview.mode} Interview
                    </span>
                  </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  {/* Status + Result */}
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        interview.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : interview.status === 'completed'
                            ? 'bg-gray-200 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {interview.status}
                    </span>

                    {interview.result && (
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          interview.result === 'passed'
                            ? 'bg-emerald-100 text-emerald-700'
                            : interview.result === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {interview.result}
                      </span>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewClick(interview.id)}
                      className="text-xs border text-blue-600 border-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                    >
                      View
                    </button>

                    {interview.status === 'scheduled' &&
                      (interview.isConfirmed ? (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg">
                          <CheckCheck size={14} />
                          Confirmed
                        </span>
                      ) : interview.isRescheduleRequested ? (
                        <span className="text-xs bg-amber-600 text-white px-3 py-1.5 rounded-lg">
                          Requested for reschedule
                        </span>
                      ) : (
                        <button
                          onClick={() => onConfirmClick(interview.id)}
                          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                        >
                          Confirm
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
