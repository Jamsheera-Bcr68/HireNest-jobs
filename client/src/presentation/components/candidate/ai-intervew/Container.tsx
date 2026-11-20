import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInterviews } from '../../../hooks/user/useInterview';
import { type Meeting } from '../../common/meet/MeetContainer';
import { LoadingState } from './Components';
import { MeetHeader } from './Components';
import { AIStage, Controllbar } from './Components';
import EndModal from './EndModal';

import { useVideoCall } from '../../../hooks/useVideoCall';
import { socket } from '../../../../services/socket';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../redux/store';
import { playAIvoice } from '../../../../utils/tts';
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
  const [showEndModal, setShowEndModal] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [question, setQuestion] = useState<Question | null>(null);
  const localAudioStreamRef = useRef<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const mediaRecordRef = useRef<MediaRecorder | null>(null);
  const audioChunkRef = useRef<Blob[]>([]);
  const [interview, setInterview] = useState<AiInterview | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [wecomeMessage, setWelcomeMessage] = useState<string>('');
  const hasStartedInterview = useRef(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  // const [localAudioStream, setLocalAudioStream] = useState<MediaStream | null>(
  //   null
  // );
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioLevelIntervalRef = useRef<number | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);

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
        const greeting = getGreeting();

        const message = `${greeting} ${meeting.candidateName}!,Welcome
         to your interview at ${meeting.candidateName} for the ${meeting.roleTitle} 
         position.I'll be conducting your interview today. I'll ask you a series 
         of questions  and evaluate your responses.Please answer each question clearly 
         and honestly. If you don't understand a question, 
         feel free to ask me to repeat it.Before we begin, are you ready 
         for your interview?`;
        setMessage(message);
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
  const participant =
    role === 'company'
      ? (meeting?.candidateName ?? 'Candidate')
      : (meeting?.companyName ?? 'Company');
  const currentUserName =
    role == 'company' ? meeting?.companyName : meeting?.candidateName;
  const thankNote = `Thank you, ${currentUserName}! You’ve completed your 
interview for the ${meeting?.roleTitle ?? 'For this '} position at 
${meeting?.companyName ?? 'Our Company'}. Your responses have been 
recorded and will be reviewed shortly. We’ll get back to you with 
the next steps. Best of luck!`;

  // useEffect(() => {
  //   if (loading) return;
  //   const interval = setInterval(() => setElapsed((prev) => prev + 1), 1000);
  //   return () => clearInterval(interval);
  // }, [loading]);

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

  useEffect(() => {
    if (
      loading ||
      !meeting ||
      !localAudioStreamRef.current ||
      hasStartedInterview.current
    ) {
      return;
    }
    hasStartedInterview.current = true;
    const candidateName = meeting.candidateName;
    const companyName = meeting.companyName;
    const role = meeting.roleTitle;
    const greetingScript = `Hello ${candidateName}, welcome to your technical interview for the ${role} position at ${companyName}. I will ask you a series of questions today. Feel free to take a moment before answering. Are you ready?}`;

    // Call our TTS helper
    playAIvoice(
      greetingScript,
      () => {
        // 1. Turn on the glowing AI animation & show "Speaking..."
        setIsAiSpeaking(true);
      },
      () => {
        // 2. Turn off AI speaking animation
        setIsAiSpeaking(false);

        // 3. This is where we turn on candidate speech-to-text!
        // startListening();
      }
    );
  }, [loading, meeting]);

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
    setMessage(
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

    setMessage('');
  };

  //   const startRecording = (stream: MediaStream) => {
  //     try {
  //       if (mediaRecordRef.current?.state === 'recording') {
  //         return;
  //       }

  //       const audioTracks = stream.getAudioTracks();

  //       if (!audioTracks.length) {
  //         console.error('No microphone audio track available');
  //         return;
  //       }

  //       const audioStream = new MediaStream(audioTracks);

  //       const mimeType = ['audio/webm;codecs=opus', 'audio/webm'].find((type) =>
  //         MediaRecorder.isTypeSupported(type)
  //       );

  //       const recorder = mimeType
  //         ? new MediaRecorder(audioStream, { mimeType })
  //         : new MediaRecorder(audioStream);

  //       audioChunkRef.current = [];

  //       recorder.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           audioChunkRef.current.push(event.data);
  //           console.log('Audio chunk received:', event.data.size);
  //         }
  //       };

  //       // recorder.onstop1 = async () => {
  //       //   const audioBlob = new Blob(audioChunkRef.current, {
  //       //     type: recorder.mimeType,
  //       //   });
  //       //   setRecordedAudio(audioBlob);
  //       //   const arrayBuffer = await audioBlob.arrayBuffer();
  //       //   const decodeContext = new AudioContext();

  //       //   try {
  //       //     const decodedAudio = await decodeContext.decodeAudioData(arrayBuffer);

  //       //     const samples = decodedAudio.getChannelData(0);

  //       //     let peak = 0;
  //       //     let sumSquares = 0;

  //       //     for (const sample of samples) {
  //       //       peak = Math.max(peak, Math.abs(sample));
  //       //       sumSquares += sample * sample;
  //       //     }

  //       //     console.log('Decoded audio:', {
  //       //       duration: decodedAudio.duration,
  //       //       peak,
  //       //       rms: Math.sqrt(sumSquares / samples.length),
  //       //     });
  //       //   } catch (error) {
  //       //     console.error('Decoding failed:', error);
  //       //   } finally {
  //       //     await decodeContext.close();
  //       //   }

  //       //   console.log('Recorded audio details:', {
  //       //     size: audioBlob.size,
  //       //     type: audioBlob.type,
  //       //   });

  //       //   const audioUrl = URL.createObjectURL(audioBlob);
  //       //   setRecordedAudioUrl(audioUrl);
  //       //   const audio = new Audio(audioUrl);

  //       //   audio.onloadedmetadata = () => {
  //       //     console.log('Audio duration:', audio.duration);
  //       //   };

  //       //   audio.onerror = () => {
  //       //     console.error('Audio playback error:', audio.error);
  //       //   };

  //       //   // Stop microphone level monitoring
  //       //   if (audioLevelIntervalRef.current !== null) {
  //       //     clearInterval(audioLevelIntervalRef.current);
  //       //     audioLevelIntervalRef.current = null;
  //       //   }

  //       //   // Close audio context
  //       //   if (audioContextRef.current) {
  //       //     await audioContextRef.current.close();
  //       //     audioContextRef.current = null;
  //       //   }

  //       //   setIsRecording(false);
  //       // };

  //       recorder.onstop = async () => {
  //   const blob = new Blob(audioChunkRef.current, { type: recorder.mimeType });
  //   setRecordedAudio(blob);
  //   setIsRecording(false);
  //   cleanupAudioMonitor();
  //   await submitAnswer(blob);
  // };
  //       recorder.onerror = (event) => {
  //         console.error('MediaRecorder error:', event);
  //         setIsRecording(false);
  //       };

  //       mediaRecordRef.current = recorder;

  //       // Microphone audio level monitoring
  //       const audioContext = new AudioContext();
  //       audioContextRef.current = audioContext;

  //       const source = audioContext.createMediaStreamSource(audioStream);
  //       const analyser = audioContext.createAnalyser();

  //       source.connect(analyser);

  //       const dataArray = new Uint8Array(analyser.fftSize);

  //       const checkAudioLevel = () => {
  //         analyser.getByteTimeDomainData(dataArray);

  //         const average =
  //           dataArray.reduce((sum, value) => sum + Math.abs(value - 128), 0) /
  //           dataArray.length;

  //         console.log('Microphone audio level:', average);
  //       };

  //       audioLevelIntervalRef.current = window.setInterval(checkAudioLevel, 1000);

  //       recorder.start(1000);

  //       console.log('Recorder state:', recorder.state);

  //       setIsRecording(true);
  //     } catch (error) {
  //       console.error('Error starting recording:', error);
  //       setIsRecording(false);
  //     }
  //   };

  //   const startRecording = (stream: MediaStream) => {
  //     try {
  //       if (mediaRecordRef.current?.state === 'recording') {
  //         return;
  //       }

  //       const audioTracks = stream.getAudioTracks();

  //       if (!audioTracks.length) {
  //         console.error('No microphone audio track available');
  //         return;
  //       }

  //       const audioStream = new MediaStream(audioTracks);

  //       const mimeType = ['audio/webm;codecs=opus', 'audio/webm'].find((type) =>
  //         MediaRecorder.isTypeSupported(type)
  //       );

  //       const recorder = mimeType
  //         ? new MediaRecorder(audioStream, { mimeType })
  //         : new MediaRecorder(audioStream);

  //       audioChunkRef.current = [];

  //       recorder.ondataavailable = (event) => {
  //         if (event.data.size > 0) {
  //           audioChunkRef.current.push(event.data);
  //           console.log('Audio chunk received:', event.data.size, event.data);
  //         }
  //       };

  //       recorder.onstop = async() => {
  //         const audioBlob = new Blob(audioChunkRef.current, {
  //           type: recorder.mimeType,
  //         });

  //         console.log('Recorded audio:', audioBlob);
  //         console.log('Audio size:', audioBlob.size);

  //         const audioUrl = URL.createObjectURL(audioBlob);
  //         setRecordedAudioUrl(audioUrl);

  // clearInterval(audioLevelInterval);
  // await audioContext.close();

  //         setIsRecording(false);
  //       };

  //       recorder.onerror = (event) => {
  //         console.error('MediaRecorder error:', event);
  //         setIsRecording(false);
  //       };

  //       mediaRecordRef.current = recorder;

  //       /////

  //       const audioContext = new AudioContext();
  //       const source = audioContext.createMediaStreamSource(audioStream);
  //       const analyser = audioContext.createAnalyser();

  //       source.connect(analyser);

  //       const dataArray = new Uint8Array(analyser.fftSize);

  //       const checkAudioLevel = () => {
  //         analyser.getByteTimeDomainData(dataArray);

  //         const average =
  //           dataArray.reduce((sum, value) => sum + Math.abs(value - 128), 0) /
  //           dataArray.length;

  //         console.log('Microphone audio level:', average);
  //       };

  //       const audioLevelInterval = window.setInterval(checkAudioLevel, 1000);
  //       /////
  //       recorder.start(1000);

  //       console.log('Recorder state:', recorder.state);

  //       setIsRecording(true);
  //     } catch (error) {
  //       console.error('Error starting recording:', error);
  //       setIsRecording(false);
  //     }
  //   };

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
      setQuestion(q);
      setInterview((prev) => (prev ? { ...prev, stage: q.completed?'completed':'questions' } : prev));
      showToast({ type: 'success', msg: data.message });
      setRecordedAudio(null);
      setRecordedAudioUrl(null);
    } catch (error) {
      console.error('Error submitting answer:', error);
      showToast({ type: 'error', msg: 'Failed to submit your answer.' });
    }
  };

  // const submitAnswer1 = async (blob: Blob) => {
  //   if (!interview) return;

  //   const ext = blob.type.includes('mp4') ? 'mp4' : 'webm';
  //   const formData = new FormData();
  //   formData.append('audio', blob, `answer.${ext}`);

  //   try {
  //     const data = await interviewService.submitAiAnswer(
  //       interview.sessionId,
  //       formData
  //     );
  //     setQuestion(data.data);
  //     setInterview((prev) => (prev ? { ...prev, stage: 'questions' } : prev));
  //     showToast({ type: 'success', msg: data.message });
  //     setRecordedAudio(null);
  //     setRecordedAudioUrl(null);
  //   } catch (error) {
  //     console.error('Error submitting answer:', error);
  //     showToast({ type: 'error', msg: 'Failed to submit your answer.' });
  //   }
  // };

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

        setRecordedAudio(blob);
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

  // const submitAnswer = async (blob:Blob) => {
  //   console.log(recordedAudio, interview);

  //   if (!recordedAudio || !interview) {
  //     showToast({
  //       type: 'error',
  //       msg: 'Please record your answer first.',
  //     });
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('audio', recordedAudio, 'answer.webm');

  //   try {
  //     const data = await interviewService.submitAiAnswer(
  //       interview.sessionId,
  //       formData
  //     );
  //     setQuestion(data.data);

  //     showToast({
  //       type: 'success',
  //       msg: data.message,
  //     });
  //     setRecordedAudio(null);
  //     setRecordedAudioUrl(null);
  //   } catch (error) {
  //     console.error('Error submitting answer:', error);
  //   }
  // };

  // const stopRecording 1= async () => {
  //   console.log('from stop recording');

  //   const recorder = mediaRecordRef.current;

  //   if (recorder && recorder.state === 'recording') {
  //     recorder.stop();
  //   }
  //   await submitAnswer();
  // };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative select-none">
      <MeetHeader
        meeting={meeting}
        elaped={elapsed}
        isFullscreen={isFullscreen}
        setIsFullscreen={setIsFullscreen}
        currentQuestionNumber={question ? question.number : 0}
      />
      <AIStage
        interview={interview}
        message={message}
        question={question}
        isAiSpeaking={isAiSpeaking}
        setAiSpeaking={setIsAiSpeaking}
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
      />
      <Controllbar
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
