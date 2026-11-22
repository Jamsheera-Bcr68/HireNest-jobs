import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInterviews } from '../../../hooks/user/useInterview';
import { type Meeting } from '../../common/meet/MeetContainer';
import { LoadingState } from './Components';
import { MeetHeader } from './Components';
import { AIStage, Controllbar } from './Components';
import EndModal from './EndModal';
import {
  useProctoring,
  type ProctorEvent,
} from '../../../hooks/tab-switch.hook';
import { useVideoCall } from '../../../hooks/useVideoCall';
import { socket } from '../../../../services/socket';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { speakText } from '../../../../utils/tts';
import { getGreeting } from '../../../../utils/date-conversion';
import { interviewService } from '../../../../services/api-services/interview.service';
import { useToast } from '../../../../shared/toast/use-toast';
import {
  type AiInterview,
  type Question,
} from '../../../../types/ai-interview.types';

function Container() {
  const [loading, setLoading] = useState<boolean>(false);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCamOn, setCamOn] = useState(false);
  const [isMicon, setMicon] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const localAudioStreamRef = useRef<MediaStream | null>(null);

  const mediaRecordRef = useRef<MediaRecorder | null>(null);
  const audioChunkRef = useRef<Blob[]>([]);
  const [interview, setInterview] = useState<AiInterview | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioLevelIntervalRef = useRef<number | null>(null);

  const { showToast } = useToast();

  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const { meetId } = useParams();

  const { getVideoStream, getAudioStream } = useVideoCall();

  const { startAiInterview } = useInterviews();

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      if (!meetId) return;

      let videoStream: MediaStream | null = null;
      let audioStream: MediaStream | null = null;

      try {
        setLoading(true);
        let { meeting, aiInterview } = await startAiInterview(meetId);
        setInterview(aiInterview);
        if (aiInterview.stage === 'questions') {
          let q = aiInterview.currentQuestion;
          setQuestion({
            id: q.questionId ? q.questionId : '',
            sessionId: aiInterview.sessionId,
            question: q.question,
            number: q.questionNumber,
            stage: aiInterview.stage,
            completed: q.questionNumber >= aiInterview.totalQuestions,
          });
        }

        setMeeting(meeting);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

      try {
        videoStream = (await getVideoStream()) ?? null;
        setCamOn(true);
      } catch (error) {
        console.log('error', error);
        setCamOn(false);
      }
      try {
        audioStream = (await getAudioStream()) ?? null;
        setMicon(true);
        // setLocalAudioStream(audioStream);
      } catch (error) {
        setMicon(false);
        console.log('error', error);
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
      localAudioStreamRef.current = localStream;

      const videoTrack = localStream.getVideoTracks()[0];
      const audioTrack = localStream.getAudioTracks()[0];
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      if (videoTrack) {
        const userWantsCamera = true;
        videoTrack.enabled = userWantsCamera;
        setCamOn(userWantsCamera);
        socket.emit('camera-state', { meetId, enabled: true });
      }
      if (audioTrack) {
        const userWantAudio = true;
        audioTrack.enabled = userWantAudio;
        setMicon(userWantAudio);
        socket.emit('mic-state', { meetId, enabled: userWantAudio });
      }
    };
    init();

    return () => {
      cancelled = true;
      if (localAudioStreamRef.current) {
        localAudioStreamRef.current.getTracks().forEach((t) => t.stop());
        localAudioStreamRef.current = null;
      }
    };
  }, [meetId]);

  const role = useSelector((state: RootState) => state.auth.user)?.role;

  const currentUserName =
    role == 'company' ? meeting?.companyName : meeting?.candidateName;
  const thankNote = `Thank you, ${currentUserName}! You’ve completed your 
interview for the ${meeting?.roleTitle ?? 'For this '} position at 
${meeting?.companyName ?? 'Our Company'}. Your responses have been 
recorded and will be reviewed shortly. We’ll get back to you with 
the next steps. Best of luck!`;

  useEffect(() => {
    if (!interview || !meeting) return;

    if (interview.stage === 'welcome') {
      const greeting = getGreeting();
      setText(
        `${greeting} ${meeting.candidateName}!
       Welcome to your interview at ${meeting.companyName}
        for the ${meeting.roleTitle} position. I'll be conducting 
        your interview today. I'll ask you a series of questions 
        and evaluate your responses. Please answer each question clearly 
        and honestly. If you don't understand a question, feel free to ask 
        me to repeat it. Please note that this interview is proctored: switching tabs 
        or leaving fullscreen will be recorded. Before we begin, are you ready for your interview?`
      );
    } else if (
      interview.stage === 'introduction' ||
      interview.stage === 'questions'
    ) {
      setText(interview.currentQuestion.question);
    } else if (interview.stage === 'completed') {
      setText(thankNote);
    }
  }, [interview, meeting]);
  useEffect(() => {
    if (!interview) return;
    if (interview.stage === 'completed') return;

    const id = setInterval(() => setElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(id);
  }, [loading, interview]);
  useEffect(() => {
    if (!text) return;

    speakText(text, setIsAiSpeaking);
  }, [text]);

  useEffect(() => {
    if (loading || !meeting) return;

    if (
      !loading &&
      meeting &&
      localVideoRef.current &&
      localAudioStreamRef.current
    ) {
      if (localVideoRef.current.srcObject !== localAudioStreamRef.current) {
        localVideoRef.current.srcObject = localAudioStreamRef.current;
      }
    }
  }, [loading, meeting, isCamOn]);

  const handleViolation = async (e: ProctorEvent) => {
    if (!interview) return;
    try {
      await interviewService.reportViloations(interview.sessionId, {
        ...e,
        questionId: question?.id,
      });
      setInterview((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          violationCount: prev.violationCount + 1,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };
  const interviewActive = interview
    ? ['introduction', 'questions'].includes(interview.stage)
    : false;

  useProctoring(interviewActive, handleViolation);

  if (loading) return <LoadingState />;
  if (!meeting) return;

  const toggleCam = async () => {
    const stream = localAudioStreamRef.current;

    if (isCamOn) {
      const videoTrack = stream?.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.stop(); // Cuts power to camera -> LED light turns off
        stream?.removeTrack(videoTrack);
      }
      setCamOn(false);
      socket.emit('camera-state', { meetId, enabled: false });
    } else {
      try {
        const newVideoStream = await getVideoStream();
        if (!newVideoStream) return;

        const newTrack = newVideoStream.getVideoTracks()[0];
        if (newTrack && stream) {
          stream.addTrack(newTrack);

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }

        setCamOn(true);
        socket.emit('camera-state', { meetId, enabled: true });
      } catch (err) {
        console.error('Failed to restart camera:', err);
        setCamOn(false);
      }
    }
  };

  const toggleMic = () => {
    const stream = localAudioStreamRef.current;
    if (!stream) return;

    const audioTracks = stream.getAudioTracks();
    if (audioTracks.length === 0) {
      console.warn('No audio tracks found on local stream');
      return;
    }

    const nextState = !isMicon;

    audioTracks.forEach((track) => {
      if (track.readyState !== 'ended') {
        track.enabled = nextState;
      }
    });

    setMicon(nextState);

    socket.emit('mic-state', { meetId, enabled: nextState });
  };

  const handleNotReadyClick = () => {
    setText(
      'No problem! Take your time. Click I am Ready whenever you want to begin'
    );
  };

  const handleReadyClick = async () => {
    if (!interview) return;

    if (interview.stage === 'welcome') {
      await interviewService.updateAiSession(interview.sessionId, {
        status: 'in-progress',
        stage: 'introduction',
      });
      setInterview((prev) => {
        if (!prev) return prev;
        return { ...prev, stage: 'introduction', status: 'in-progress' };
      });
    }
  };

  const handleStartAnswer = () => {
    const localAudioStream = localAudioStreamRef.current;
    console.log('Local stream:', localAudioStream);

    if (!localAudioStream) {
      console.error('Media stream is not available');
      showToast({
        type: 'error',
        msg: 'Please enable your microphone before answering2.',
      });
      return;
    }
    console.log('Local stream:', localAudioStream);
    const audioTrack = localAudioStream
      .getAudioTracks()
      .find((track) => track.enabled && track.readyState === 'live');
    console.log('audioTrack', audioTrack);

    if (!audioTrack) {
      showToast({
        type: 'error',
        msg: 'Please enable your microphone before answering1.',
      });
      return;
    }

    startRecording(localAudioStream);
  };

  const cleanupAudioMonitor = () => {
    if (audioLevelIntervalRef.current !== null) {
      clearInterval(audioLevelIntervalRef.current);
      audioLevelIntervalRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const submitAnswer = async (blob: Blob) => {
    if (!interview) return;

    if (interview.stage === 'questions' && !question) return;

    const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
    const formData = new FormData();
    formData.append('audio', blob, `answer.${ext}`);
    if (interview.stage === 'questions' && question) {
      formData.append('questionId', question.id);
    }
    formData.append('stage', interview.stage);
    try {
      const data = await interviewService.submitAiAnswer(
        interview.sessionId,
        formData
      );
      const q: Question = data.data;
      if (q.question) {
        speakText(q.question, setIsAiSpeaking);
      }
      setQuestion(q);
      setInterview((prev) =>
        prev
          ? { ...prev, stage: q.completed ? 'completed' : 'questions' }
          : prev
      );

      showToast({ type: 'success', msg: data.message });

      setRecordedAudioUrl(null);
    } catch (error) {
      console.error('Error submitting answer:', error);
      showToast({ type: 'error', msg: 'Failed to submit your answer.' });
    }
  };

  const startRecording = (stream: MediaStream) => {
    try {
      if (mediaRecordRef.current?.state === 'recording') return;

      const audioTracks = stream.getAudioTracks();
      if (!audioTracks.length) {
        console.error('No microphone audio track available');
        return;
      }

      const audioStream = new MediaStream(audioTracks);

      const mimeType = ['audio/webm;codecs=opus', 'audio/webm'].find((type) =>
        MediaRecorder.isTypeSupported(type)
      );

      const recorder = mimeType
        ? new MediaRecorder(audioStream, { mimeType })
        : new MediaRecorder(audioStream);

      audioChunkRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunkRef.current.push(event.data);
        }
      };

      // Runs AFTER recorder.stop(), once the final chunk has arrived
      recorder.onstop = async () => {
        const blob = new Blob(audioChunkRef.current, {
          type: recorder.mimeType,
        });

        setIsRecording(false);
        cleanupAudioMonitor();

        await submitAnswer(blob); // pass the blob directly, not state
      };

      recorder.onerror = (event) => {
        console.error('MediaRecorder error:', event);
        setIsRecording(false);
        cleanupAudioMonitor();
      };

      mediaRecordRef.current = recorder;
      recorder.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecordRef.current;
    if (recorder && recorder.state === 'recording') {
      recorder.stop(); // onstop above handles the rest
    }
  };

  const handleRepeatQuestion = () => {
    speakText(text, setIsAiSpeaking);
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative select-none">
      <MeetHeader
        meeting={meeting}
        elaped={elapsed}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        currentQuestionNumber={question ? question.number : 0}
        violationCount={interview ? interview.violationCount : 0}
      />
      <AIStage
        isSharing={isSharing}
        interview={interview}
        text={text}
        question={question}
        isAiSpeaking={isAiSpeaking}
        isMicOn={isMicon}
        isCamOn={isCamOn}
        videoRef={localVideoRef}
        name={meeting.candidateName}
        handleReadyClick={handleReadyClick}
        handleNotReadyClick={handleNotReadyClick}
        handleStartAnswer={handleStartAnswer}
        isRecording={isRecording}
        stopRecording={stopRecording}
        recorderUrl={recordedAudioUrl}
        thankNote={thankNote}
        handleRepeatQuestion={handleRepeatQuestion}
      />
      <Controllbar
        isSharing={isSharing}
        setIsSharing={setIsSharing}
        isCamOn={isCamOn}
        isMicOn={isMicon}
        toggleCam={toggleCam}
        toggleMic={toggleMic}
        setShowEndModal={setShowEndModal}
      />
      {showEndModal && <EndModal setShowEndModal={setShowEndModal} />}
    </div>
  );
}

export default Container;
