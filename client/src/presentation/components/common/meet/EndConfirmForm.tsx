

type Props = {
  setShowEndConfirm: (v: boolean) => void;
  onEndCall: () => void;
};
function EndConfirmForm({ setShowEndConfirm, onEndCall }: Props) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60">
      <div className="w-[320px] rounded-2xl bg-[#1a1b1e] border border-white/10 p-5 text-center shadow-2xl">
        <p className="text-white font-medium mb-1">End the interview?</p>
        <p className="text-white/50 text-sm mb-5">
          This will disconnect {'candidateName'} from the call.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEndConfirm(false)}
            className="flex-1 rounded-full border border-white/15 text-white/80 py-2.5 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowEndConfirm(false);
              onEndCall?.();
            }}
            className="flex-1 rounded-full bg-red-500 text-white py-2.5 text-sm font-medium hover:bg-red-400 transition-colors"
          >
            End call
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndConfirmForm;
