import {
  ArrowLeft,
  ChevronLeft,
  Share2,
  PauseCircle,
  SquarePenIcon,
  Trash,
  LockOpenIcon,
  PlayIcon,
  CheckCheck,
  BanIcon,
} from 'lucide-react';

import AddReasonModal from '../../../admin/jobs/AddReasonModal';
import ConfirmationModal from '../../../../modals/ConfirmationModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { JobDetailsDto } from '../../../../../types/dtos/jobDto';
import { useToast } from '../../../../../shared/toast/useToast';
import type { StatusType } from '../../../../../types/dtos/profileTypes/userTypes';
import type { UserRole } from '../../../../../constants/types/user';

type Props = {
  job: JobDetailsDto | null;
  title: string;
  role: UserRole;
  onBackPath: string;
  handleUpdateStatus: (status: StatusType) => Promise<void>;
  onEditClick?: () => void;
  handleDeactivateAction?: (
    status: StatusType,
    reason: string
  ) => Promise<void>;
};
function NavPart({
  job,
  handleUpdateStatus,
  onEditClick,
  title,
  role,
  onBackPath,
}: Props) {
  if (!job) return null;
  const { showToast } = useToast();
  const [pauseModalOpen, setPauseModalOpen] = useState<boolean>(false);
  const [reopenModalOpen, setReOpenModalOpen] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState<boolean>(false);
  const [activateModalOpen, setActivateModalOpen] = useState<boolean>(false);

  const handleShareClick = async () => {
    try {
      const link = await navigator.clipboard.writeText(window.location.href);
      console.log('link', link);
      await navigator.clipboard.writeText(window.location.href);
      showToast({
        msg: 'Link Copied',
        type: 'success',
      });
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  const navigate = useNavigate();
  return (
    <div className="sticky top-20 bg-red-300">
      <nav className="bg-white border-b border-gray-100 sticky top-16  z-3">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors">
              <ArrowLeft
                onClick={() => navigate(onBackPath)}
                className="text-slate-300"
                size={15}
              />
              <span className="hidden sm:inline">{title}</span>
            </button>
            <ChevronLeft className="text-slate-300" size={13} color="#D1D5DB" />
            <span className="text-sm font-semibold text-gray-800 truncate">
              {job?.title}
            </span>
          </div>

          {/* Actions */}
          {role == 'company' && (
            <div className="flex items-center gap-2">
              {['closed', 'expired'].includes(job.status) && (
                <button
                  onClick={() => setReOpenModalOpen(true)}
                  className="h-8 px-3 gap-1.5 rounded-lg border border-green-200 text-xs font-medium text-green-600 hover:bg-green-50 transition-colors hidden sm:flex items-center"
                >
                  <LockOpenIcon className="text-green-700" size={13} /> ReOpen
                </button>
              )}
              <button
                onClick={handleShareClick}
                disabled={job?.status !== 'active'}
                className={`h-8 px-3 gap-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors hidden sm:flex items-center ${job?.status !== 'active' ? 'text-slate-300 cursor-not-allowed' : ''}`}
              >
                <Share2 className="text-slate-500" size={13} /> Share
              </button>
              {job?.status == 'active' && (
                <button
                  onClick={() => setPauseModalOpen(true)}
                  className="h-8 px-3 gap-1.5 rounded-lg border border-amber-200 text-xs font-medium text-amber-600 hover:bg-amber-50 transition-colors hidden sm:flex items-center"
                >
                  <PauseCircle className="text-red-700" size={13} /> Pause
                </button>
              )}
              {job?.status == 'paused' && (
                <button
                  disabled={job?.status !== 'paused'}
                  onClick={() => setResumeModalOpen(true)}
                  className={`h-8 px-3 gap-1.5 rounded-lg border border-amber-200 text-xs font-medium text-amber-600 hover:bg-amber-50 transition-colors hidden sm:flex items-center `}
                >
                  <PlayIcon className="text-red-700" size={13} /> Resume
                </button>
              )}

              <button
                onClick={onEditClick}
                disabled={!['active', 'paused', 'expired'].includes(job.status)}
                className={`h-8 px-4 gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors flex items-center ${!['active', 'paused', 'expired'].includes(job.status) ? 'bg-slate-300 cursor-not-allowed' : ''}`}
              >
                <SquarePenIcon className="text-white" size={13} color="white" />{' '}
                Edit Job
              </button>
              {job.status !== 'removed' && (
                <button
                  disabled={
                    !['active', 'paused', 'closed'].includes(job?.status)
                  }
                  onClick={() => setDeleteModalOpen(true)}
                  className={`h-8 w-8 rounded-lg border border-red-100 text-red-400 hover:bg-red-50 transition-colors flex items-center justify-center `}
                >
                  <Trash className="text-red-700" size={13} />
                </button>
              )}
            </div>
          )}
          {role == 'admin' && (
            <div className="flex items-center gap-2">
              {' '}
              {job.status !== 'removed' && (
                <button
                  onClick={() => setDeleteModalOpen(true)}
                  className={`h-8 px-3 gap-1.5 rounded-lg border border-red-200 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors hidden sm:flex items-center `}
                >
                  <Trash className="text-red-700" size={13} /> Remove
                </button>
              )}
              {['active', 'paused', 'closed', 'expired'].includes(
                job.status
              ) && (
                <button
                  onClick={() => setSuspendModalOpen(true)}
                  className={`h-8 px-3 gap-1.5 rounded-lg border border-amber-200 text-xs font-medium text-amber-600 hover:bg-amber-50 transition-colors hidden sm:flex items-center `}
                >
                  <BanIcon className="text-amber-700" size={13} /> Suspend
                </button>
              )}
              {job.status == 'suspended' && (
                <button
                  onClick={() => setActivateModalOpen(true)}
                  className={`h-8 px-3 gap-1.5 rounded-lg border border-green-200 text-xs font-medium text-green-600 hover:bg-green-50 transition-colors hidden sm:flex items-center `}
                >
                  <CheckCheck className="text-green-700" size={13} /> Activate
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
      <ConfirmationModal
        isOpen={pauseModalOpen}
        onClose={() => setPauseModalOpen(false)}
        item="Job"
        action="Pause"
        type="delete"
        onConfirm={() => handleUpdateStatus('paused')}
      />
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        item="Job"
        action="Remove"
        type="delete"
        onConfirm={() => handleUpdateStatus('removed')}
      />
      <ConfirmationModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        item="Job"
        action="Resume"
        type="info"
        onConfirm={() => handleUpdateStatus('active')}
      />
      <ConfirmationModal
        isOpen={reopenModalOpen}
        onClose={() => setReOpenModalOpen(false)}
        item="Job"
        action="Re-open"
        type="info"
        onConfirm={() => handleUpdateStatus('active')}
      />
      <ConfirmationModal
        isOpen={suspendModalOpen}
        onClose={() => setSuspendModalOpen(false)}
        item="Job"
        action="Suspend"
        type="delete"
        onConfirm={() => handleUpdateStatus('suspended')}
      />
      <ConfirmationModal
        isOpen={activateModalOpen}
        onClose={() => setActivateModalOpen(false)}
        item="Job"
        action="Activate"
        type="info"
        onConfirm={() => handleUpdateStatus('active')}
      />
    </div>
  );
}

export default NavPart;
