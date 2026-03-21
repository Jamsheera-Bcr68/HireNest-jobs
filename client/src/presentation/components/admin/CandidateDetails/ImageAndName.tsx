import ConfirmationModal from '../../../modals/ConfirmationModal';
import { useState } from 'react';
import { type UserProfileType } from '../../../../types/dtos/profileTypes/userTypes';
import { adminService } from '../../../../services/apiServices/adminService';
import { useToast } from '../../../../shared/toast/useToast';
type Props = {
  candidate: UserProfileType;
  updateCandidate: (candidate: UserProfileType) => void;
};
function ImageAndName({ candidate, updateCandidate }: Props) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [id, setId] = useState('');
  const { showToast } = useToast();

  const handleSuspend = async () => {
    console.log('id', id);

    if (!id) return;
    console.log('from handle suspend,suspend id', id);
    try {
      const data = await adminService.updateCandidate(id, { isBlocked: true });
      const updated = data.candidate;
      updateCandidate(updated);
      setId('');
      showToast({ msg: data.message, type: 'success' });
      setRejectModalOpen(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };

  const handleActivate = async () => {
    if (!id) return;
    console.log('from handle activate, id', id);
    try {
      const data = await adminService.updateCandidate(id, { isBlocked: false });
      const updated = data.candidate;
      updateCandidate(updated);
      setId('');
      showToast({ msg: data.message, type: 'success' });
      setApproveModalOpen(false);
    } catch (error: any) {
      showToast({
        msg: error?.response?.data.message || error.message,
        type: 'error',
      });
    }
  };
  return (
    <div className="bg-white rounded-xl">
      <div className="bg-white rounded-xl mt-5 shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div
            className={`w-16 h-16 border rounded-full flex items-center justify-center  ${candidate.imageUrl ? '' : 'bg-gray-400'}`}
          >
            {candidate.imageUrl ? (
              <img
                className="w-full h-full border rounded-full object-contain"
                src={`${baseUrl}${candidate.imageUrl}`}
                alt="Logo"
              />
            ) : (
              <h1 className="text-bold 2xl text-white">
                {candidate?.name?.slice(0, 1) || 'image'}
              </h1>
            )}
          </div>

          <div>
            <h1 className="text-xl md:text-xl font-bold text-slate-800">
              {candidate.name}
            </h1>
            <p className="text-sm text-bold text-slate-800">
              ooooooo{candidate.title}
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-medium  rounded-full ${candidate.isBlocked ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}
            >
              {candidate?.isBlocked ? 'suspended' : ' active'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}

        <div className="flex gap-2 flex-wrap">
          {candidate.isBlocked ? (
            <button
              onClick={() => {
                setId(candidate.id);
                setApproveModalOpen(true);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              Activate
            </button>
          ) : (
            <button
              onClick={() => {
                setId(candidate.id);
                setRejectModalOpen(true);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
            >
              Reject
            </button>
          )}
        </div>

        <ConfirmationModal
          action="Suspend"
          type="delete"
          onClose={() => setRejectModalOpen(false)}
          isOpen={rejectModalOpen}
          item="Candidate"
          onConfirm={handleSuspend}
        />
        <ConfirmationModal
          action="Activate"
          type="info"
          onClose={() => setApproveModalOpen(false)}
          isOpen={approveModalOpen}
          item="Candidate"
          onConfirm={handleActivate}
        />
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-slate-500 mt-2 ml-4">
        {[
          { icon: '✉️', value: candidate.email },
          { icon: '📞', value: candidate.phone },
          { icon: '📍', value: candidate.address?.state },
          { icon: '🔗', value: candidate.socialLinks?.linkedIn },
          { icon: '🌐', value: candidate.socialLinks?.portfolio },
        ].map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span>{item.icon}</span>
            <span className="text-slate-600">{item.value}</span>
          </span>
        ))}
        <span className="flex items-center gap-1.5 ml-auto text-xs text-slate-400">
          Joined {new Date(candidate.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default ImageAndName;
