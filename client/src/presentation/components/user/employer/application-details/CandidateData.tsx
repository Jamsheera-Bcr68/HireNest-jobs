import type { Dispatch } from '@reduxjs/toolkit';
import type {
  ApplicationDetailsDto,
  ApplicationStatusType,
} from '../../../../../types/dtos/application.dto';
import { useNavigate } from 'react-router-dom';
import type React from 'react';

type Props = {
  application: ApplicationDetailsDto;
  updateStatus: (status: ApplicationStatusType) => Promise<void>;
  role: 'admin' | 'company';
  onScheduleClick: () => void;
  chatroomId: string | null
onViewClick: React.Dispatch<React.SetStateAction<boolean>>;
};

function CandidateData({
  application,
  updateStatus,
  role,
  onScheduleClick,
  chatroomId,
  onViewClick
}: Props) {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-600 text-sm flex items-center gap-1"
        >
          ← Back to Applications
        </button>
        <span className="text-gray-300">|</span>
        <span className="text-sm text-gray-500">
          {'APP-' + application.id.slice(-4).toUpperCase()}
        </span>
      </div>
      {role == 'company' && (
        <div className="flex items-center gap-2 flex-wrap">
          {application.status === 'interviewScheduled' && (
            <button
              onClick={() => {
                console.log('from chat click',chatroomId);
                
                if (!chatroomId) return;

                navigate('/company/messages', {
                  state: { chatroomId },
                });
              }}
              className="px-4 py-2 text-sm border border-fuchsia-300 rounded-lg hover:bg-fuchsia-50 text-fuchsia-700 font-medium transition"
            >
              Send Message
            </button>
          )}
          <button
            onClick={!['pending','reviewed','shortListed','rejected'].includes(application.status)?()=>onViewClick(true):onScheduleClick}
            className="px-4 py-2 text-sm bg-fuchsia-800 text-white rounded-lg hover:bg-fuchsia-600 font-medium transition"
          >
            {application.status === 'interviewScheduled'
              ? 'View Interview'
              : 'Schedule Interview'}
          </button>
          <button
            disabled={application.status === 'rejected'}
            onClick={() => updateStatus('rejected')}
            className={`px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium transition ${application.status === 'rejected' ? 'cursor-not-allowed' : ''}`}
          >
            {application.status === 'rejected' ? 'Rejected' : ' Reject'}
          </button>
        </div>
      )}
    </div>
  );
}

export default CandidateData;
