import { JOB_REPORT_REASONS } from '../../../../constants/types/report-reasons';
import { type ErrorType, type ReportFormType } from './ListingContainter';

export default function ReportJobModal({
  handleChange,
  formData,
  error,
  onSubmit,
  open,
  onClose,
}: {
  handleChange: (data: Partial<ReportFormType>) => void;
  formData: ReportFormType;
  error: ErrorType;
  onSubmit: () => void;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[480px] bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              🚩
            </div>

            <div>
              <h2 className="text-[17px] font-bold text-slate-900">
                Report this job
              </h2>

              <p className="text-[13px] text-slate-500 mt-0.5">
                Help us keep listings accurate and safe
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pt-5 pb-2 overflow-y-auto flex-1">
          <p className="text-[11px] font-semibold text-slate-400 uppercase mb-3">
            Select a reason
          </p>

          <div className="flex flex-col gap-2">
            {JOB_REPORT_REASONS.map((reason, i) => (
              <label
                key={i}
                className={`flex items-start gap-3 px-3.5 py-3 rounded-xl border cursor-pointer transition-all
                ${
                  formData.reason === reason
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="report-reason"
                  value={reason}
                  checked={formData.reason === reason}
                  onChange={() => handleChange({ reason })}
                  className="sr-only"
                />

                {/* Custom radio */}
                <div
                  className={`w-[18px] h-[18px] rounded-full border-2 mt-0.5 flex items-center justify-center transition-colors
                  ${
                    formData.reason === reason
                      ? 'border-indigo-500'
                      : 'border-slate-300'
                  }`}
                >
                  {formData.reason === reason && (
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span
                    className={`text-sm font-semibold ${
                      formData.reason === reason
                        ? 'text-indigo-700'
                        : 'text-slate-800'
                    }`}
                  >
                    {reason}
                  </span>

                  <span className="text-xs text-slate-500">{reason}</span>
                </div>
              </label>
            ))}
          </div>

          {/* reason error */}
          {error.reason && (
            <p className="text-xs text-red-500 mt-2">{error.reason}</p>
          )}

          {/* Additional details */}
          <div className="mt-4">
            <label className="block text-[13px] font-semibold text-slate-600 mb-2">
              Additional details
              <span className="font-normal text-slate-400"> (optional)</span>
            </label>

            <textarea
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-[13.5px]"
              placeholder="Describe the issue in more detail…"
              rows={3}
              value={formData.info}
              onChange={(e) => handleChange({ info: e.target.value })}
            />

            {/* info error */}
            {error.info && (
              <p className="text-xs text-red-500 mt-1">{error.info}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 px-6 py-4 mt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-500 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSubmit();
              onClose();
            }}
            disabled={!formData.reason}
            className={`px-5 py-2 rounded-xl text-sm font-semibold text-white
              ${
                formData.reason
                  ? 'bg-indigo-500 hover:bg-indigo-600'
                  : 'bg-indigo-200 cursor-not-allowed'
              }`}
          >
            Submit report
          </button>
        </div>
      </div>
    </div>
  );
}
