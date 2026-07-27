import { useEffect, useRef, useState } from 'react';
import type { UserRole } from '../../../constants/types/user';
import { useInterviews } from '../../hooks/user/useInterview';
import { socket } from '../../../services/socket';
import { useVideoCall } from '../../hooks/useVideoCall';

type Props = {
  meetId?: string;
  role: UserRole;
};
type Meeting = {
  meetingId: string;
  interviewId: string;
  scheduledAt: string;
  companyId: string;
  candidateId: string;
  jobId: string;
};
function MeetContainer({ meetId, role }: Props) {
  console.log('meet id,role', meetId, role);
  const { fetchMeeting } = useInterviews();
  const [loading, setLoading] = useState<boolean>(false);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const { getLocalStream, createPeerConnection } = useVideoCall();

  const handleParticipantJoined = async ({ userId }: { userId: string }) => {
    console.log(`${userId} joined in the meeting as participant`);
    if (!peerConnectionRef.current) return;
    if (role !== 'company') return;

    const offer = await peerConnectionRef.current.createOffer();

    await peerConnectionRef.current.setLocalDescription(offer);
    socket.emit('offer', { meetId, offer });
  };

  const handleOffer = async ({
    offer,
  }: {
    offer: RTCSessionDescriptionInit;
  }) => {
    if (role !== 'candidate') return;
    if (!peerConnectionRef.current) return;
    console.log('offer recieved');
    
    await peerConnectionRef.current.setRemoteDescription(offer);
    const answer = await peerConnectionRef.current.createAnswer();
console.log('createing answrer');


    await peerConnectionRef.current.setLocalDescription(answer);

    socket.emit('answer', { meetId, answer });
  };

  const handleAnswer = async ({
    answer,
  }: {
    answer: RTCSessionDescriptionInit;
  }) => {
    if (role !== 'company') return;
    console.log('anser recieved');
    
    if (!peerConnectionRef.current) return;
    console.log('answer recieved');
    await peerConnectionRef.current.setRemoteDescription(answer);
  };

  useEffect(() => {
    if (!meetId) return;
    const loadMeeting = async () => {
      const meet = await fetchMeeting(meetId, setLoading);
      console.log('meet', meet);
      socket.connect();

      console.log("Emitting join-meeting", meetId);

      socket.emit('join-meeting', {meetId})

      socket.off('participant-joined', handleParticipantJoined);
      socket.on('participant-joined', handleParticipantJoined);
        socket.off('offer',handleOffer);
      socket.on('offer', handleOffer);
      console.log("Creating offer");
      socket.off('answer', handleAnswer);
      socket.on('answer', handleAnswer);
    };
    loadMeeting();
    return () => {
      socket.off('participant-joined',handleParticipantJoined);
      socket.off('offer',handleOffer);
      socket.off('answer',handleAnswer);
      socket.emit('leave-meeting', { meetId });
    };
  }, [meetId]);

  useEffect(() => {
    const init = async () => {
      try {
        const localStream = await getLocalStream();
        // console.log('local Strieam',localStream?.getTracks());

        if (!localStream) return;
        localStreamRef.current = localStream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        const peerCoonection = createPeerConnection();

        peerConnectionRef.current = peerCoonection;

        localStream
          .getTracks()
          .forEach((track) =>
            peerConnectionRef.current?.addTrack(track, localStream)
          );
        console.log(localStream.getTracks());
      } catch {}
    };

    init();
  }, []);
  return (
    <div>
      <video ref={localVideoRef} autoPlay playsInline muted />
    </div>
  );
}

export default MeetContainer;
