import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '../../../../constants/types/user';
import { useInterviews } from '../../../hooks/user/useInterview';
import { socket } from '../../../../services/socket';
import { useVideoCall } from '../../../hooks/useVideoCall';
import { Circle, Mic, MicOff, X } from 'lucide-react';
import ControllBar from './ControllBar';
import EndConfirmForm from './EndConfirmForm';
import { CameraOffTile } from './EndConfirmForm';

type Props = {
  meetId?: string;
  role: UserRole;
};
type Meeting = {
  candidateId: string;
  candidateName: string;
  companyId: string;
  companyName: string;
  interviewId: string;
  jobId: string;
  meetingId: string;
  roleTitle: string;
  scheduledAt: string;
};
function MeetContainer({ meetId, role }: Props) {
  console.log('meet id,role', meetId, role);
  const { fetchMeeting } = useInterviews();
  const navigate = useNavigate();

  const [meet, setMeet] = useState<Meeting | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const makingOffer = useRef(false);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [camOn, setCamon] = useState(false);
  const [remoteCamOn, setRemoteCamon] = useState<boolean | null>(null);
  const [remoteMicOn, setRemoteMicon] = useState<boolean | null>(null);
  const [micOn, setMicon] = useState(false);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [endForm, setEndForm] = useState(false);
  // const [panel, setPanel] = useState<string | null>(null); // null | "chat" | "notes" | "people"

  const { getAudioStream, getVideoStream, createPeerConnection } =
    useVideoCall();

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

  const handleRemoteCameraStateChange = useCallback(
    ({ enabled }: { enabled: boolean }) => {
      console.log('from handleRemoteCameraStateChange,stte is ', enabled);

      setRemoteCamon(enabled);
    },
    []
  );
  const handleRemoteMicStateChange = useCallback(
    ({ enabled }: { enabled: boolean }) => {
      console.log('from handleRemoteMicStateChange,stte is ', enabled);

      setRemoteMicon(enabled);
    },
    []
  );
  const handleOffer = useCallback(
    async ({ offer }: { offer: RTCSessionDescriptionInit }) => {
      if (role !== 'candidate') return;
      if (!peerConnectionRef.current) return;
      console.log('offer recieved');

      await peerConnectionRef.current.setRemoteDescription(offer);
      for (const candidate of pendingCandidates.current) {
        await peerConnectionRef.current.addIceCandidate(candidate);
      }

      pendingCandidates.current = [];
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
  const pendingCandidates = useRef<RTCIceCandidateInit[]>([]);

  const handleIceCandidate = useCallback(
    async ({ candidate }: { candidate: RTCIceCandidateInit }) => {
      const pc = peerConnectionRef.current;
      if (!pc) return;
      if (!pc.remoteDescription) {
        pendingCandidates.current.push(candidate);
        return;
      }
      await pc.addIceCandidate(candidate);
    },
    []
  );

  const cleanupCall = useCallback(() => {
    console.log('--- CLEANUP START ---');

    const stream = localStreamRef.current;

    //stoping camera+micro phone
    if (stream)
      stream.getTracks().forEach((track) => {
        console.log(
          'Stopping track:',
          track.kind,
          'readyState:',
          track.readyState
        );

        track.stop();
        console.log('After stop:', track.kind, track.readyState);
      });
    localStreamRef.current = null;
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    //remove local video
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }
    setRemoteConnected(false);
    setCamon(false);
    setMicon(false);
    console.log('--- CLEANUP START ---');
  }, []);

  const toggleCam = () => {
    console.log('from toggle cam');

    const stream = localStreamRef.current;
    if (!stream) return;
    console.log('stream', stream);

    const videoTrack = stream.getVideoTracks()[0];
    if (!videoTrack) return;

    videoTrack.enabled = !videoTrack.enabled;
    setCamon(videoTrack.enabled);
    socket.emit('camera-state', { meetId, enabled: videoTrack.enabled });
    console.log('Camera:', videoTrack.enabled ? 'ON' : 'OFF');
  };
  const toggleMic = () => {
    console.log('from toggle Mic');

    const stream = localStreamRef.current;
    if (!stream) return;
    console.log('stream', stream);

    const audioTrack = stream.getAudioTracks()[0];
    if (!audioTrack) return;

    audioTrack.enabled = !audioTrack.enabled;
    setMicon(audioTrack.enabled);
    socket.emit('mic-state', { meetId, enabled: audioTrack.enabled });
    console.log('Audio :', audioTrack.enabled ? 'ON' : 'OFF');
  };

  const handleCallEnded = useCallback(() => {
    setCallEnded(true);
    cleanupCall();
  }, [cleanupCall]);

  const onEndCall = () => {
    console.log('from end call');
    setCallEnded(true);
    socket.emit('end-call', { meetId });
    console.log('emited end  call');

    cleanupCall();
    navigate(`/${role}/interviews`);
  };


  const handleDuplicateSession = useCallback(() => {
    alert('This meeting was opened in another tab.');
  }, []);

  useEffect(() => {
    const si = setInterval(() => setElapsed((s) => s + 1), 1000);
    return ()=>{
      clearInterval(si)
    }
  }, []);

  useEffect(() => {
    console.log('from useeffect');

    if (!meetId) return;
    let cancelled = false;
    const init = async () => {
      let videoStream: MediaStream | null = null;
      let audioStream: MediaStream | null = null;

      try {
        const meet = await fetchMeeting(meetId);
        setMeet(meet);
        console.log('meeting', meet);

        try {
          videoStream = (await getVideoStream()) ?? null;
          setCamon(true);

          console.log('Camera permission granted');
        } catch (err) {
          setCamon(false);
          console.log('Camera permission granted');
        }

        try {
          audioStream = (await getAudioStream()) ?? null;

          if (audioStream) {
            console.log('Microphone permission granted');
            setMicon(true);
          }
        } catch (error) {
          console.log('Microphone permission denied');
          setMicon(false);
        }
        if (cancelled) {
          videoStream?.getTracks().forEach((t) => t.stop());
          audioStream?.getTracks().forEach((t) => t.stop());
          return;
        }
        const tracks = [
          ...(videoStream?.getVideoTracks() ?? []),
          ...(audioStream?.getAudioTracks() ?? []),
        ];
        const localStream = new MediaStream(tracks);

        if (!localStream) return;
        localStreamRef.current = localStream;
        const videoTrack = localStream.getVideoTracks()[0];
        const audioTrack = localStream.getAudioTracks()[0];
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }
        if (videoTrack) {
          const userWantsCamera = true;
          videoTrack.enabled = userWantsCamera;
          setCamon(userWantsCamera);
          socket.emit('camera-state', { meetId, enabled: true });
        }
        if (audioTrack) {
          const userWantAudio = true;
          audioTrack.enabled = userWantAudio;
          setMicon(userWantAudio);
          socket.emit('mic-state', { meetId, enabled: userWantAudio });
        }

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

        socket.off('camera-state', handleRemoteCameraStateChange);
        socket.on('camera-state', handleRemoteCameraStateChange);
        socket.off('mic-state', handleRemoteMicStateChange);
        socket.on('mic-state', handleRemoteMicStateChange);

        console.log('Creating offer');
        socket.off('answer', handleAnswer);
        socket.on('answer', handleAnswer);

        socket.off('ice-candidate', handleIceCandidate);
        socket.on('ice-candidate', handleIceCandidate);
        console.log('Emitting join-meeting', meetId);
        socket.off('offer', handleOffer);
        socket.on('offer', handleOffer);
        socket.emit('join-meeting', { meetId });
        socket.emit('camera-state', {
          meetId,
          enabled: videoTrack?.enabled ?? false,
        });
        socket.emit('mic-state', {
          meetId,
          enabled: audioTrack?.enabled ?? false,
        });
        socket.on('duplicate-session', handleDuplicateSession);
        console.log('join eetig emitted');
        socket.on('call-ended', handleCallEnded);
      } catch (err) {
        videoStream?.getTracks().forEach((t) => t.stop());
        audioStream?.getTracks().forEach((t) => t.stop());
        console.log(err);
      }
    };

    init();
    return () => {
      cancelled = true;
      socket.off('participant-joined', handleParticipantJoined);
      socket.off('offer', handleOffer);
      socket.off('answer', handleAnswer);
      socket.off('ice-candidate', handleIceCandidate);
      socket.off('duplicate-session', handleDuplicateSession);
      socket.off('camera-state', handleRemoteCameraStateChange);
      socket.off('mic-state', handleRemoteMicStateChange);
      socket.emit('leave-meeting', { meetId });
      socket.off('call-ended', handleCallEnded);
      cleanupCall();
    };
  }, [
    meetId,
    fetchMeeting,
    getAudioStream,
    getVideoStream,
    createPeerConnection,
    handleParticipantJoined,
    handleOffer,
    handleAnswer,
    handleIceCandidate,
    cleanupCall,
    handleDuplicateSession,
    handleCallEnded,
    handleRemoteCameraStateChange,
  ]);

  console.log('remote mic ', remoteMicOn);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };
  const roleTitle = meet?.roleTitle ?? '';
  const participant =
    role === 'company'
      ? (meet?.candidateName ?? 'Candidate')
      : (meet?.companyName ?? 'Company');
  const currentUserName =
    role == 'company' ? meet?.companyName : meet?.candidateName;
  console.log(`curentuser ${currentUserName} participant ${participant}`);

  console.log('remote cam', remoteCamOn);

  if (callEnded)
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Interview Ended</h2>

          <p className="mt-2 text-gray-500">The interview has ended.</p>
        </div>
      </div>
    );
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0b0c0e]">
      {/* ---------- Top bar ---------- */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-3.5 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5">
            <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium text-white/80 tracking-wide">
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

      {/* ---------- Main stage (contained tile, not full screen) ---------- */}
      <div className="flex h-full w-full items-center justify-center px-3 sm:px-6 pb-40 sm:pb-28 pt-20 sm:pt-24">
        <div className="relative w-full max-w-5xl max-h-[60vh] sm:max-h-[70vh] aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#111214] shadow-2xl border border-white/10">
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Waiting for the remote participant/connection */}
          {!remoteConnected && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111214]">
              <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-lg sm:text-2xl font-semibold text-white/70 mb-3 sm:mb-5">
                {participant.charAt(0).toUpperCase()}
              </div>
              <p className="text-white/85 font-medium text-sm sm:text-base">
                {participant}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-white/40 text-xs sm:text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Waiting to join…
              </div>
            </div>
          )}

          {remoteConnected && remoteCamOn !== false && (
            <>
              {/* name tag for remote participant */}
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-2.5 sm:px-3 py-1 sm:py-1.5">
                <span className="text-xs sm:text-sm text-white/90 font-medium">
                  {participant}
                </span>
                {remoteMicOn ? (
                  <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/60" />
                ) : (
                  <MicOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/60" />
                )}
              </div>
            </>
          )}
          {remoteConnected && remoteCamOn === false && (
            <CameraOffTile
              className="relative w-full max-w-5xl max-h-[60vh] sm:max-h-[70vh] aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-[#111214] shadow-2xl border border-white/10"
              name={participant}
              micOn={remoteMicOn ?? false}
            />
          )}
        </div>
      </div>

      {/* ---------- Local PIP (bottom right) ---------- */}
      <div className="absolute bottom-20 right-3 w-24 sm:bottom-24 sm:right-6 sm:w-56 md:w-72 aspect-video rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1b1e] z-20">
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${camOn ? '' : 'hidden'}`}
        />
        {!camOn && (
          <CameraOffTile
            micOn={micOn}
            name={currentUserName??''}
            className="w-full h-full flex items-center bg-gray-700 justify-center"
          />
          // <div className="w-full h-full flex items-center justify-center">
          //   <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center text-xs sm:text-sm font-semibold text-white/70">
          //     {currentUserName.charAt(0).toUpperCase()}
          //   </div>
          // </div>
        )}
        <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 flex items-center gap-1 sm:gap-1.5 rounded-full bg-black/50 px-1.5 sm:px-2.5 py-0.5 sm:py-1">
          <span className="text-[9px] sm:text-[11px] text-white/85 font-medium truncate max-w-[3.5rem] sm:max-w-none">
            {currentUserName}
          </span>
          {!micOn && (
            <MicOff className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400" />
          )}
        </div>
      </div>

      <ControllBar
        camOn={camOn}
        togleCam={toggleCam}
        micOn={micOn}
        toggleMic={toggleMic}
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
  // return (
  //   <div className="relative h-screen w-full overflow-hidden">
  //     <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-3.5 bg-gradient-to-b from-black/70 to-transparent">
  //       <div className="flex items-center gap-3">
  //         <div className="flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5">
  //           <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
  //           <span className="text-xs font-medium text-white/80 tracking-wide">
  //             {formatTime(elapsed)}
  //           </span>
  //         </div>
  //         <div className="hidden sm:flex flex-col leading-tight">
  //           <span className="text-sm font-semibold text-white">
  //             {roleTitle}
  //           </span>
  //           <span className="text-xs text-white/50">
  //             Interview with {participant}
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //     /* main */
  //    <div className="flex min-h-screen items-center justify-center px-6 pb-24 pt-24">
  //       <video
  //         ref={remoteVideoRef}
  //         autoPlay
  //         playsInline
  //         className="absolute inset-0 w-full h-full object-cover"
  //       />

  //       {/* Fallback / waiting state when no remote stream is attached */}
  //       {!remoteConnected && (
  //         <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111214]">
  //           <div className="w-24 h-24 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-2xl font-semibold text-white/70 mb-5">
  //             {participant.charAt(0).toUpperCase()}
  //           </div>
  //           <p className="text-white/85 font-medium">{participant}</p>
  //           <div className="flex items-center gap-1.5 mt-2 text-white/40 text-sm">
  //             <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
  //             Waiting to join…
  //           </div>
  //         </div>
  //       )}

  //       {remoteConnected && (
  //         <>
  //           {/* name tag for remote participant */}
  //           <div className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 px-3 py-1.5">
  //             <span className="text-sm text-white/90 font-medium">
  //               {participant}
  //             </span>
  //             <Mic className="w-3.5 h-3.5 text-white/60" />
  //           </div>
  //         </>
  //       )}
  //     </div>
  //     {/* ---------- Local PIP ---------- */}
  //     <div className="absolute bottom-24 right-6 w-56 sm:w-72 aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1b1e] z-20">
  //       <video
  //         ref={localVideoRef}
  //         autoPlay
  //         playsInline
  //         muted
  //         className={`w-full h-full object-cover ${camOn ? '' : 'hidden'}`}
  //       />
  //       {!camOn && (
  //         <div className="w-full h-full flex items-center justify-center">
  //           <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/70">
  //             {currentUserName.charAt(0).toUpperCase()}
  //           </div>
  //         </div>
  //       )}
  //       <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1">
  //         <span className="text-[11px] text-white/85 font-medium">
  //           {currentUserName}
  //         </span>
  //         {!micOn && <MicOff className="w-3 h-3 text-red-400" />}
  //       </div>
  //     </div>

  //     <ControllBar
  //       camOn={camOn}
  //       togleCam={toggleCam}
  //       micOn={micOn}
  //       toggleMic={toggleMic}
  //       panel=""
  //       toggleSharing={() => setSharingScreen((prev) => !prev)}
  //       sharingScreen={sharingScreen}
  //       onEndCall={onEndCall}
  //       setEndForm={() => setEndForm(true)}
  //     />
  //     {endForm && (
  //       <EndConfirmForm onEndCall={onEndCall} setShowEndConfirm={setEndForm} />
  //     )}
  //   </div>
  // );
}

export default MeetContainer;
