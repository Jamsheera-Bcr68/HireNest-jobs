import {
  ArrowRight,
  Clock,
  Maximize2,
  Mic,
  MicOff,
  Minimize2,
  PhoneOff,
  RotateCcw,
  ScreenShareOff,
  Share,
  ShieldAlert,
  Sparkles,
  Square,
  Video,
  VideoOff,
  Volume2,
} from 'lucide-react';
import { useDraggable } from '../../../hooks/draggable.hook';
import {
  Rounds,
  type AiInterview,
  type Question,
} from '../../../../types/ai-interview.types';
import type { Meeting } from '../../common/meet/MeetContainer';

import type React from 'react';
import { useRef } from 'react';

const formatTime = (s: number) => {
  const m = Math.floor(s / 60)
    .toString()
    .padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
};

export const LoadingState = () => {
  return (
    <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center text-white px-4">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-fuchsia-600/20 border-t-fuchsia-500 animate-spin" />
        <Sparkles
          size={24}
          className="absolute text-fuchsia-400 animate-pulse"
        />
      </div>
      <h2 className="text-lg font-bold text-slate-100">
        Preparing AI Interview Session...
      </h2>
      <p className="text-xs text-slate-400 mt-1.5 text-center max-w-sm">
        Calibrating neural audio models, checking microphone latency, and
        loading role-specific topics.
      </p>
    </div>
  );
};

type MeetHeaderProps = {
  meeting: Meeting;
  elaped: number;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  currentQuestionNumber: number;
  violationCount: number;
};

export const MeetHeader = ({
  meeting,
  elaped,
  isFullscreen,
  setIsFullscreen,
  currentQuestionNumber,
  violationCount,
}: MeetHeaderProps) => {
  return (
    <header className="h-16 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between z-20">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 flex items-center justify-center font-black text-sm shadow-md shadow-fuchsia-500/20 flex-shrink-0">
          AI
        </div>
        <div className="min-w-0">
          <h1 className="text-xs sm:text-sm font-bold text-white truncate">
            {Rounds[meeting.roundName]}
          </h1>
          <p className="text-[11px] text-slate-400 truncate">
            {meeting.companyName} • {meeting.roleTitle}
          </p>
        </div>
      </div>

      {/* Timer & Question Progress */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
          {currentQuestionNumber > 0 && (
            <span className="font-semibold text-fuchsia-400">
              Q : {currentQuestionNumber}
            </span>
          )}
          {/* <span className="text-slate-500">/</span> */}
          {/* <span>{meeting.totalQuestions} Questions</span> */}
        </div>
        <div
          className={`flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-full border text-[11px] font-medium ${
            violationCount > 0
              ? 'bg-red-500/10 border-red-500/40 text-red-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
          }`}
        >
          <ShieldAlert size={13} />
          <span className="hidden sm:inline">Proctored</span>
          {violationCount > 0 && (
            <span className="font-mono font-bold">{violationCount}</span>
          )}
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono font-medium text-slate-200">
          <Clock size={13} className="text-fuchsia-400" />
          <span>{formatTime(elaped)}</span>
        </div>

        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition hidden md:block"
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </header>
  );
};

type AIStageProps = {
  isAiSpeaking: boolean;

  videoRef: React.RefObject<HTMLVideoElement | null>;
  isCamOn: boolean;
  name: string;
  isMicOn: boolean;
  interview: AiInterview | null;
  text: string;
  isSharing: boolean;
  handleNotReadyClick: () => void;
  handleReadyClick: () => Promise<void>;
  handleStartAnswer: () => void;
  isRecording: boolean;
  recorderUrl: string | null;
  stopRecording: () => void;
  question: Question | null;
  thankNote: string;
  handleRepeatQuestion: () => void;
};
export const AIStage = ({
  isAiSpeaking,

  isCamOn,
  isMicOn,
  videoRef,
  name,
  interview,
  text,
  thankNote,
  handleNotReadyClick,
  handleReadyClick,
  handleStartAnswer,
  isRecording,
  recorderUrl,
  stopRecording,
  question,
  handleRepeatQuestion,
}: AIStageProps) => {
  const mainRef = useRef<HTMLElement>(null);
  const { elRef, pos, onPointerDown, onPointerMove, onPointerUp } =
    useDraggable(mainRef);

  if (!interview) return null;

  return (
    <main
      ref={mainRef}
      className="flex-1 relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-fuchsia-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Central Voice Avatar Orb */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Animated Pulsing Rings (Active when AI speaks) */}
        <div className="relative flex items-center justify-center">
          {isAiSpeaking && (
            <>
              <span className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-fuchsia-500/20 animate-ping opacity-60" />
              <span className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-purple-500/10 animate-pulse duration-1000" />
            </>
          )}

          {/* Core Neural Visualizer Globe */}
          <div
            className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
              isAiSpeaking
                ? 'bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 shadow-fuchsia-500/30 scale-105'
                : 'bg-slate-900 border border-slate-700/80 shadow-slate-950/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              {/* Simulated Audio Frequency Bars */}
              {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7].map((height, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 rounded-full transition-all duration-200 ${
                    isAiSpeaking ? 'bg-white' : 'bg-slate-600'
                  }`}
                  style={{
                    height: isAiSpeaking ? `${height * 36}px` : '6px',
                    animation: isAiSpeaking
                      ? `pulse 1.${idx + 2}s infinite ease-in-out`
                      : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* AI State Badge */}
        <div className="mt-6 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 shadow-sm">
          <span
            className={`w-2 h-2 rounded-full ${
              isAiSpeaking ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
            }`}
          />
          <span>
            {isAiSpeaking
              ? 'AI Interviewer Speaking...'
              : 'AI Listening to your answer...'}
          </span>
        </div>
      </div>

      {/* ── Subtitle / Question Caption Overlay ── */}

      <div className="w-full max-w-2xl mt-8 sm:mt-12 z-10 px-4">
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-fuchsia-400 flex items-center gap-1.5">
              <Volume2 size={13} />
              {interview.stage === 'welcome'
                ? 'Welcome'
                : interview.stage === 'introduction'
                  ? 'Introduction'
                  : interview.stage == 'completed'
                    ? 'Thank Note'
                    : 'Current Question'}
            </span>

            {!['completed', 'welcome'].includes(interview.stage) && (
              <button
                type="button"
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                onClick={handleRepeatQuestion}
              >
                <RotateCcw size={12} />
                <span>Repeat</span>
              </button>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            {interview.stage === 'welcome' && text}
            {interview.stage === 'introduction' &&
              (interview.currentQuestion?.question ?? '')}

            {interview.stage === 'questions' && question && question.question}
            {interview.stage === 'completed' && thankNote}
          </p>

          {interview.stage === 'welcome' && (
            <div className="flex justify-end items-center gap-3 mt-5 pt-3 border-t border-slate-700/60">
              <button
                type="button"
                onClick={handleNotReadyClick}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-300 border border-slate-600/70 hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                Not Yet
              </button>

              <button
                type="button"
                onClick={handleReadyClick}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-500 hover:shadow-lg hover:shadow-fuchsia-500/20 active:scale-[0.97] transition-all duration-200 inline-flex items-center gap-2"
              >
                I'm Ready
                <ArrowRight size={15} />
              </button>
            </div>
          )}

          {['introduction', 'questions'].includes(interview.stage) && (
            <div className="flex justify-end items-center gap-3 mt-5 pt-3 border-t border-slate-700/60">
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStartAnswer}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-fuchsia-600 hover:bg-fuchsia-500 hover:shadow-lg hover:shadow-fuchsia-500/20 active:scale-[0.97] transition-all duration-200 inline-flex items-center gap-2"
                >
                  Start Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:scale-[0.97] transition-all duration-200 inline-flex items-center gap-2"
                >
                  <Square size={13} />
                  Finish Answer
                </button>
              )}
              {recorderUrl && (
                <div className="flex flex-col gap-2">
                  <audio
                    controls
                    src={recorderUrl}
                    className="w-full"
                    onError={(e) =>
                      console.error('Player error:', e.currentTarget.error)
                    }
                    onLoadedData={() => console.log('Audio data loaded')}
                  />
                  <button
                    onClick={() => window.open(recorderUrl, '_blank')}
                    className="text-xs text-blue-400"
                  >
                    Open recording in new tab
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── 3. Candidate Webcam Picture-in-Picture (Draggable/Fixed Corner) ── */}
      <div
        ref={elRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={
          pos
            ? { left: pos.x, top: pos.y, touchAction: 'none' }
            : { touchAction: 'none' }
        }
        className={`absolute w-36 h-24 sm:w-56 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl z-20 group cursor-grab active:cursor-grabbing select-none ${
          pos ? '' : 'top-4 right-4 sm:top-auto sm:bottom-6 sm:right-6'
        }`}
      >
        {isCamOn ? (
          /* Webcam Preview Placeholder */
          <div className="w-full h-full relative bg-slate-800 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted // Essential: prevents candidate hearing their own voice echoing
              className="w-full h-full object-cover -scale-x-100" // Horizontal flip for mirror view
            />
            {/* <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-semibold text-xs">
              You
            </div> */}
            <div className="absolute bottom-2 left-2 text-[10px] font-semibold bg-black/60 px-2 py-0.5 rounded-md text-white backdrop-blur-sm">
              {name ?? 'Candidate'} (You)
            </div>
          </div>
        ) : (
          /* Camera Off State */
          <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-500 gap-1">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400 gap-1.5">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-300">
                {name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="text-[10px]">Camera Paused</span>
            </div>
          </div>
        )}

        {/* Active Audio Detection Indicator on Video */}
        <div className="absolute top-2 right-2">
          {isMicOn ? (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-950 block animate-pulse" />
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-950 block" />
          )}
        </div>
      </div>
    </main>
  );
};

type ControllbarProps = {
  isCamOn: boolean;
  setShowEndModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMicOn: boolean;
  toggleCam: () => void;
  toggleMic: () => void;
  setIsSharing: React.Dispatch<React.SetStateAction<boolean>>;
  isSharing: boolean;
};

export const Controllbar = ({
  isCamOn,
  isMicOn,
  toggleMic,
  toggleCam,
  isSharing,

  setShowEndModal,
}: ControllbarProps) => {
  return (
    <footer className="h-20 px-4 sm:px-8 border-t border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between z-20">
      {/* Device Indicators (Left) */}
      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span>Connection Stable</span>
      </div>

      {/* Main Center Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-4 mx-auto sm:mx-0">
        {/* Mic Toggle */}
        <button
          type="button"
          onClick={toggleMic}
          className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${
            isMicOn
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
              : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
          }`}
          title={isMicOn ? 'Mute Microphone' : 'Unmute Microphone'}
        >
          {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>

        {/* Camera Toggle */}
        <button
          type="button"
          onClick={toggleCam}
          className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${
            isCamOn
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
              : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
          }`}
          title={isCamOn ? 'Turn Camera Off' : 'Turn Camera On'}
        >
          {isCamOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>
        {/* Screenshar toggle */}
        <button
          type="button"
          onClick={toggleCam}
          className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${
            isCamOn
              ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
              : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
          }`}
          title={isCamOn ? 'Turn Camera Off' : 'Turn Camera On'}
        >
          {isSharing ? <ScreenShareOff size={20} /> : <Share size={20} />}
        </button>

        {/* End Call Action */}
        <button
          type="button"
          onClick={() => setShowEndModal(true)}
          className="flex items-center gap-2 px-5 py-3 sm:py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/25 active:scale-95 transition-all"
        >
          <PhoneOff size={18} />
          <span className="hidden sm:inline">End & Submit</span>
        </button>
      </div>

      {/* Info Right */}
      <div className="hidden sm:block text-right">
        <p className="text-[11px] text-slate-400">Microphone Input</p>
        <p className="text-xs font-semibold text-slate-200">Default Device</p>
      </div>
    </footer>
  );
};
