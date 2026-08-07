import { useCallback, useEffect, useRef, useState } from 'react';
import type { UserRole } from '../../../../constants/types/user';
import { useInterviews } from '../../../hooks/user/useInterview';
import { socket } from '../../../../services/socket';
import { useVideoCall } from '../../../hooks/useVideoCall';
import { Circle, Mic, MicOff, X } from 'lucide-react';
import ControllBar from './ControllBar';
import EndConfirmForm from './EndConfirmForm';
import SidePanel from './SidePanel';

type Props = {
  meetId?: string;
  role: UserRole;
};
// type Meeting = {
//   meetingId: string;
//   interviewId: string;
//   scheduledAt: string;
//   companyId: string;
//   candidateId: string;
//   jobId: string;
// };
function MeetContainer({ meetId, role }: Props) {
  console.log('meet id,role', meetId, role);
  const { fetchMeeting } = useInterviews();

  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const makingOffer = useRef(false);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [elapsed] = useState(0);
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [camOn, setCamon] = useState(false);
  const [micOn, setMicon] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [endForm, setEndForm] = useState(false);
  const [panel, setPanel] = useState<string | null>(null); // null | "chat" | "notes" | "people"

  const { getLocalStream, createPeerConnection } = useVideoCall();

  // const [messages, setMessages] = useState([
  //   {
  //     from: 'system',
  //     text: 'Interview room created. Waiting for candidate to join…',
  //   },
  // ]);

  const handleParticipantJoined = useCallback(
    async ({ userId }: { userId: string }) => {
      console.log(`${userId} joined in the meeting as participant`);
      if (!peerConnectionRef.current) return;
      if (role !== 'company') return;
      if (makingOffer.current) return;
      makingOffer.current = true;
      try {
        const offer = await peerConnectionRef.current.createOffer();

        console.log('offer created', offer);

        await peerConnectionRef.current.setLocalDescription(offer);
        socket.emit('offer', { meetId, offer });
      } finally {
        makingOffer.current = false;
      }
    },
    [role, meetId]
  );

  const handleOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      if (role !== 'candidate') return;
      if (!peerConnectionRef.current) return;
      console.log('offer recieved');

      await peerConnectionRef.current.setRemoteDescription(offer);
      const answer = await peerConnectionRef.current.createAnswer();
      console.log('createing answrer');

      await peerConnectionRef.current.setLocalDescription(answer);

      socket.emit('answer', { meetId, answer });
    },
    [role, meetId]
  );

  const handleAnswer = useCallback(
    async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
      if (role !== 'company') return;
      console.log('answer recieved');

      if (!peerConnectionRef.current) return;
      console.log('answer recieved');
      await peerConnectionRef.current.setRemoteDescription(answer);
    },
    [role]
  );

  const handleIceCandidate = useCallback(
    async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      if (!peerConnectionRef.current) return;
      console.log('recieved ice candidate');
      console.log('ICE Event:', event);

      await peerConnectionRef.current.addIceCandidate(candidate);
    },
    []
  );

  const onEndCall = () => {
    console.log('from end call');
  };

  const handleDuplicateSession = useCallback(() => {
    alert('This meeting was opened in another tab.');
  }, []);
  useEffect(() => {
    console.log('from useeffect');

    if (!meetId) return;
    const init = async () => {
      try {
        await fetchMeeting(meetId);
        const localStream = await getLocalStream();

        if (!localStream) return;
        localStreamRef.current = localStream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
        setCamon(true);
        setMicon(true);

        const peerConnection = createPeerConnection();

        peerConnectionRef.current = peerConnection;

        //ice candidate
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('sending ICE candidate');
            socket.emit('ice-candidate', {
              meetId,
              candidate: event.candidate,
            });
          }
        };

        peerConnection.ontrack = (event) => {
          console.log('remote track recieved', event.streams);
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
          setRemoteConnected(true);
        };

        localStream.getTracks().forEach((track) => {
          console.log('Adding track:', track.kind);
          peerConnectionRef.current?.addTrack(track, localStream);
        });

        ///connection state
        peerConnection.onconnectionstatechange = () => {
          console.log('connections state', peerConnection.connectionState);
          if (
            peerConnection.connectionState === 'disconnected' ||
            peerConnection.connectionState === 'failed' ||
            peerConnection.connectionState === 'closed'
          ) {
            setRemoteConnected(false);
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = null;
            }
          }
        };
        //

        socket.off('participant-joined', handleParticipantJoined);
        socket.on('participant-joined', handleParticipantJoined);

        console.log('Creating offer');
        socket.off('answer', handleAnswer);
        socket.on('answer', handleAnswer);

        socket.off('ice-candidate', handleIceCandidate);
        socket.on('ice-candidate', handleIceCandidate);
        console.log('Emitting join-meeting', meetId);
        socket.off('offer', handleOffer);
        socket.on('offer', handleOffer);
        socket.emit('join-meeting', { meetId });
        socket.on('duplicate-session', handleDuplicateSession);
        console.log('join eetig emitted');
      } catch (err) {
        console.log(err);
      }
    };

    init();
    return () => {
      socket.off('participant-joined', handleParticipantJoined);
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleIceCandidate);
      socket.off('duplicate-session', handleDuplicateSession);
      socket.emit('leave-meeting', { meetId });

      localStreamRef.current?.getTracks().forEach((track) => track.stop());

      peerConnectionRef.current?.close();
      setRemoteConnected(false);
      setCamon(false);
      setMicon(false);
      peerConnectionRef.current = null;
    };
  }, [
    meetId,
    fetchMeeting,
    getLocalStream,
    createPeerConnection,
    handleParticipantJoined,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
  ]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };
  const roleTitle = 'role title';
  const participant = role === 'company' ? 'candidateName' : 'Company';
  const currentUserName = role == 'company' ? 'Company' : 'Candidate';

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-3.5 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5">
            <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
            <span className="text-xs font-medium text-white/80 tracking-wide">
              {formatTime(elapsed)}
            </span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">
              {roleTitle}
            </span>
            <span className="text-xs text-white/50">
              Interview with {participant}
            </span>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="absolute inset-0">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Fallback / waiting state when no remote stream is attached */}
        {!remoteConnected && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111214]">
            <div className="w-24 h-24 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-2xl font-semibold text-white/70 mb-5">
              {participant.charAt(0).toUpperCase()}
            </div>
            <p className="text-white/85 font-medium">{participant}</p>
            <div className="flex items-center gap-1.5 mt-2 text-white/40 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Waiting to join…
            </div>
          </div>
        )}

        {remoteConnected && (
          <>
            {/* name tag for remote participant */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5">
              <span className="text-sm text-white/90 font-medium">
                {participant}
              </span>
              <Mic className="w-3.5 h-3.5 text-white/60" />
            </div>
          </>
        )}
      </div>

      {/* ---------- Local PIP ---------- */}
      <div className="absolute bottom-24 right-6 w-56 sm:w-72 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1b1e] z-20">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${camOn ? '' : 'hidden'}`}
        />
        {!camOn && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/70">
              {currentUserName.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1">
          <span className="text-[11px] text-white/85 font-medium">
            {currentUserName}
          </span>
          {!micOn && <MicOff className="w-3 h-3 text-red-400" />}
        </div>
      </div>

      {/* ---------- Side panel ---------- */}
      {/* {panel && <SidePanel panel={panel} setPanel={setPanel} />} */}

      {/* ---------- Control bar ---------- */}
      <ControllBar
        camOn={camOn}
        togleCam={() => setCamon((prev) => !prev)}
        micOn={micOn}
        toggleMic={() => setMicon((prev: boolean) => !prev)}
        panel=""
        toggleSharing={() => setSharingScreen((prev) => !prev)}
        sharingScreen={sharingScreen}
        onEndCall={onEndCall}
        setEndForm={() => setEndForm(true)}
      />
      {endForm && (
        <EndConfirmForm onEndCall={onEndCall} setShowEndConfirm={setEndForm} />
      )}
    </div>
  );
}

export default MeetContainer;
