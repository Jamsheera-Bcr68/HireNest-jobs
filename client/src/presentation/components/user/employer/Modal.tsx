type Props = {
  jobId?: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;

  loading?: boolean;
  title: string;
  desc?: string;
};

export default function EditJobModal({
  desc,
  title,
  open,
  onClose,
  children,

  loading = false,
}: Props) {
  if (!open) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-8 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500 flex-shrink-0" />

        <div className="relative flex items-center justify-center px-8 py-5 border-b border-gray-100">
          {/* Centered Title */}
          <div className="text-center">
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">{children}</div>

        {/* Footer */}
        {/* <div className="flex justify-end gap-3 px-8 py-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button type="submit"
            onClick={onSubmit}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div> */}
      </div>
    </div>
  );
}
