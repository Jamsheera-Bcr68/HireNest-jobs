import { type interviewDetailDto } from '../../../../types/dtos/interview.dto';
import { Video, MapPin, Check, Clock, Calendar } from 'lucide-react';

type Props = {
  interview: interviewDetailDto;
};
function InterviewDetails({ interview }: Props) {
  return (
    <div className="px-6 py-5 space-y-5">
      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Interview Status</span>

        <span className="capitalize text-xs font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {interview.status}
        </span>
      </div>

      {/* Confirmation */}
      {interview.isConfirmed && (
        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
          <Check size={14} />
          Confirmed
        </div>
      )}

      {/* Date */}
      <div className="flex items-center gap-3">
        <Calendar size={18} className="text-gray-500" />

        <div>
          <p className="text-sm font-medium text-gray-700">Interview Date</p>

          <p className="text-sm text-gray-500">{interview.date}</p>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center gap-3">
        <Clock size={18} className="text-gray-500" />

        <div>
          <p className="text-sm font-medium text-gray-700">Interview Time</p>

          <p className="text-sm text-gray-500">
            {interview.time}

            {interview.duration && ` • ${interview.duration} mins`}
          </p>
        </div>
      </div>

      {/* Mode */}
      <div className="border rounded-xl p-4 bg-gray-50">
        <div className="flex items-center gap-2 mb-2">
          {interview.mode === 'online' ? (
            <Video size={18} className="text-blue-600" />
          ) : (
            <MapPin size={18} className="text-red-500" />
          )}

          <span className="font-medium text-sm text-gray-700 capitalize">
            {interview.mode} Interview
          </span>
        </div>

        {/* Online */}
        {interview.mode === 'online' && (
          <>
            {interview.meetLink ? (
              <span className="p-1.5 border text-sm rounded-xl hover:bg-50-blue">
                {' '}
                <a
                  href={interview.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 text-center break-all"
                >
                  Join Meeting
                </a>
              </span>
            ) : (
              <p className="text-sm text-amber-600">
                Meeting link not added yet
              </p>
            )}
          </>
        )}

        {/* Offline */}
        {interview.mode === 'offline' && (
          <p className="text-sm text-gray-600">
            {interview.location || 'Location not added'}
          </p>
        )}
      </div>

      {/* Instructions */}
      {interview.note && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Additional Instructions
          </p>

          <p className="text-sm text-gray-500 leading-relaxed">
            {interview.note}
          </p>
        </div>
      )}

      {/* Reschedule */}
      {interview.isRescheduleRequested && (
        <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Reschedule request has been sent.
        </div>
      )}
    </div>
  );
}

export default InterviewDetails;
