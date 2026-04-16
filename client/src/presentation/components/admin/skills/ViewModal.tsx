import { type SkillType } from '../../../../types/dtos/skillTypes';
import { type SkillStatusType } from '../../../../types/dtos/skillTypes';
import { useEffect } from 'react';
type Props = {
  isOpen: boolean;
  skill: SkillType | null;
  onClose: () => void;
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded-lg px-4 py-2">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
export default function ViewSkillModal({ isOpen, skill, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !skill) return null;
  return (
    <div className="fixed inset-0 z-50 flex p-3 items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg border border-slate-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Skill Details</h2>
          <DetailRow
            label="Status"
            value={
              <span
                className={`px-2 py-1 ml-2 rounded-md text-xs font-semibold ${
                  skill.status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : skill.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {skill.status ?? 'N/A'}
              </span>
            }
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3 text-sm">
          <DetailRow label="Skill Name" value={skill.skillName} />

          <DetailRow label="Created By" value={skill.createdBy ?? 'System'} />

          <DetailRow label="Status" value={skill.status ?? 'Pending'} />

          <DetailRow
            label="Reviewed At"
            value={
              skill.reviewedAt
                ? new Date(skill.reviewedAt).toLocaleDateString()
                : 'Not reviewed'
            }
          />

          <DetailRow label="Used in Jobs" value={skill.usedCount ?? 0} />

          <DetailRow
            label="Used by Candidates"
            value={skill.usedCandidateCount ?? 0}
          />

          <DetailRow
            label="Created At"
            value={new Date(skill.createdAt).toLocaleDateString()}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
