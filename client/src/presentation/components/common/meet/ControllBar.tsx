import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  ChevronRight,
  MessageSquare,
  Users,
  MoreHorizontal,
  PhoneOff,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
type Props = {
  micOn: boolean;
  toggleMic: () => void;
  camOn: boolean;
  togleCam: () => void;
  toggleSharing: () => void;
  sharingScreen: boolean;
  panel: string;
  onEndCall: () => void;
  setEndForm: () => void;
};
function ControllBar({
  micOn,
  toggleMic,
  camOn,
  togleCam,
  sharingScreen,
  toggleSharing,
  onEndCall,
  setEndForm,
  panel,
}: Props) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-[#17181b]/95 backdrop-blur-md border border-white/10 px-3 py-2.5 shadow-2xl">
      <CtrlButton
        active={!micOn}
        onClick={toggleMic}
        activeClasses="bg-red-500 hover:bg-red-400 text-white"
        label={micOn ? 'Mute' : 'Unmute'}
      >
        {micOn ? (
          <Mic className="w-[18px] h-[18px]" />
        ) : (
          <MicOff className="w-[18px] h-[18px]" />
        )}
      </CtrlButton>

      <CtrlButton
        active={!camOn}
        onClick={togleCam}
        activeClasses="bg-red-500 hover:bg-red-400 text-white"
        label={camOn ? 'Stop video' : 'Start video'}
      >
        {camOn ? (
          <Video className="w-[18px] h-[18px]" />
        ) : (
          <VideoOff className="w-[18px] h-[18px]" />
        )}
      </CtrlButton>

      <CtrlButton
        active={sharingScreen}
        onClick={toggleSharing}
        activeClasses="bg-indigo-500 hover:bg-indigo-400 text-white"
        label="Share screen"
      >
        <MonitorUp className="w-[18px] h-[18px]" />
      </CtrlButton>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <CtrlButton
        active={panel === 'notes'}
        //onClick={() => togglePanel("notes")}
        activeClasses="bg-white text-black hover:bg-white/90"
        label="Questions"
      >
        <ChevronRight className="w-[18px] h-[18px]" />
      </CtrlButton>

      <CtrlButton
        active={panel === 'chat'}
        //  onClick={() => togglePanel("chat")}
        activeClasses="bg-white text-black hover:bg-white/90"
        label="Chat"
      >
        <MessageSquare className="w-[18px] h-[18px]" />
      </CtrlButton>

      <CtrlButton
        active={panel === 'people'}
        // onClick={() => togglePanel("people")}
        activeClasses="bg-white text-black hover:bg-white/90"
        label="People"
      >
        <Users className="w-[18px] h-[18px]" />
      </CtrlButton>

      <CtrlButton
        // onClick={() => {}}
        label="More"
      >
        <MoreHorizontal className="w-[18px] h-[18px]" />
      </CtrlButton>

      <div className="w-px h-6 bg-white/10 mx-1" />

      <button
        onClick={setEndForm}
        className="flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-400 text-white px-4 h-11 transition-colors"
      >
        <PhoneOff className="w-[18px] h-[18px]" />
        <span className="hidden sm:inline text-sm font-medium">End</span>
      </button>
    </div>
  );
}

export default ControllBar;
type CtrlButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  activeClasses?: string;
  label: string;
};

function CtrlButton({
  children,
  onClick,
  active,
  activeClasses = '',
  label,
}: CtrlButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${
        active ? activeClasses : 'text-white/80 hover:bg-white/10'
      }`}
    >
      {children}
    </button>
  );
}
