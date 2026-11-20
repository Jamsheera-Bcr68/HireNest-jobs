import { ShieldAlert } from 'lucide-react';

type Props = { setShowEndModal: React.Dispatch<React.SetStateAction<boolean>> };

function EndModal({ setShowEndModal }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              End Interview Session?
            </h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to finish?
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Your audio transcript up to this point will be submitted to the AI
          evaluation committee for automated grading.
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => setShowEndModal(false)}
            className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
          >
            Continue Interview
          </button>
          <button
            type="button"
            onClick={() => {
              setShowEndModal(false);
              window.close(); // or navigate back
            }}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition"
          >
            Yes, Finish & Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndModal;
