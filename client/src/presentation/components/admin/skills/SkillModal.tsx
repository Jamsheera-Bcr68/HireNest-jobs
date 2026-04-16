import { useEffect } from 'react';
type AddSkillModalProps = {
  isOpen: boolean;
  skillName: string;
  onClose: () => void;
  onChange: (value: string) => void;
  onSubmit: () => Promise<void>;
  mode: 'add' | 'edit';
  loading?: boolean;
  error?: string;
};

export default function SkillModal({
  isOpen,
  skillName,
  onClose,
  onChange,
  onSubmit,
  loading,
  error,
  mode,
}: AddSkillModalProps) {
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

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-200">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            {mode == 'add' ? ' Add New Skill' : ' Update Skill'}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Skill Name
            </label>

            <input
              type="text"
              value={skillName}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter skill name"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-green-500 outline-none"
            />
            {error && <p className="text-sm text-red-600">* {error}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {mode == 'add'
              ? loading
                ? 'Adding...'
                : 'Add Skill'
              : loading
                ? 'Updating...'
                : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}
