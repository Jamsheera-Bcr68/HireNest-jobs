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

// components/CameraOffTile.tsx
import { Mic, MicOff, VideoOff } from 'lucide-react';

interface CameraOffTileProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  micOn: boolean;
  className?: string;
}

const sizeStyles = {
  sm: {
    avatar: 'w-8 h-8 text-xs',
    icon: 'w-3 h-3',
    label: 'text-[10px] mt-1.5',
    gap: 'gap-1',
  },
  md: {
    avatar: 'w-14 h-14 text-sm',
    icon: 'w-3.5 h-3.5',
    label: 'text-xs mt-2',
    gap: 'gap-1.5',
  },
  lg: {
    avatar: 'w-24 h-24 text-2xl',
    icon: 'w-4 h-4',
    label: 'text-sm mt-2.5',
    gap: 'gap-2',
  },
};

export function CameraOffTile({
  name,
  size = 'md',

  micOn,
  className = '',
}: CameraOffTileProps) {
  const s = sizeStyles[size];
  const initial = name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-[#1a1b1e] ${className}`}
    >
      <div
        className={`${s.avatar} rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-semibold text-white/70`}
      >
        {initial}
      </div>

      <div className={`flex items-center ${s.gap} ${s.label} text-white/40`}>
        <VideoOff className={s.icon} />
        <span>Camera off</span>
        {micOn ? (
          <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/60" />
        ) : (
          <MicOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/60" />
        )}{' '}
      
      </div>
    </div>
  );
}
