import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Volume2,
  Sparkles,
  RotateCcw,
  Clock,
  ShieldAlert,
  Maximize2,
  Minimize2,
} from 'lucide-react';

export const AiInterviewRoom: React.FC = () => {
  console.log('this is from ai interview room');

  // ── States & Toggles ──
  const [isLoading, setIsLoading] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(128); // dummy seconds (02:08)

  // ── Dummy Interview Data ──
  const interviewInfo = {
    companyName: 'Acme Corporation',
    jobTitle: 'Senior Frontend Engineer',
    roundName: 'Technical Architecture Round',
    totalDurationMins: 30,
    currentQuestionIndex: 2,
    totalQuestions: 5,
  };

  // ── Dummy Live Speech Subtitles ──
  const liveTranscript = {
    speaker: 'AI Agent',
    text: 'Can you explain the differences between useMemo and useCallback, and in what real-world scenario overusing them could actually degrade performance?',
  };

  // Simulate loading state on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Timer increment
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(
      () => setElapsedTime((prev) => prev + 1),
      1000
    );
    return () => clearInterval(interval);
  }, [isLoading]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ── Loading Screen ──
  if (isLoading) {
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
  }

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative select-none">
      {/* ── 1. Top Bar: Header & Session Meta ── */}
      <header className="h-16 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between z-20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 flex items-center justify-center font-black text-sm shadow-md shadow-fuchsia-500/20 flex-shrink-0">
            AI
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate">
              {interviewInfo.roundName}
            </h1>
            <p className="text-[11px] text-slate-400 truncate">
              {interviewInfo.companyName} • {interviewInfo.jobTitle}
            </p>
          </div>
        </div>

        {/* Timer & Question Progress */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <span className="font-semibold text-fuchsia-400">
              Q{interviewInfo.currentQuestionIndex}
            </span>
            <span className="text-slate-500">/</span>
            <span>{interviewInfo.totalQuestions} Questions</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-mono font-medium text-slate-200">
            <Clock size={13} className="text-fuchsia-400" />
            <span>{formatTime(elapsedTime)}</span>
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

      {/* ── 2. Main Stage (AI Avatar & Visualizer) ── */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
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
                <Volume2 size={13} /> Current Question
              </span>
              <button
                type="button"
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                onClick={() => setIsAiSpeaking(!isAiSpeaking)}
              >
                <RotateCcw size={12} />
                <span>Repeat Question</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              "{liveTranscript.text}"
            </p>
          </div>
        </div>

        {/* ── 3. Candidate Webcam Picture-in-Picture (Draggable/Fixed Corner) ── */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-36 h-24 sm:w-56 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl z-20 group">
          {isCameraOn ? (
            /* Webcam Preview Placeholder */
            <div className="w-full h-full relative bg-slate-800 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-semibold text-xs">
                You
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] font-semibold bg-black/60 px-2 py-0.5 rounded-md text-white backdrop-blur-sm">
                Candidate (You)
              </div>
            </div>
          ) : (
            /* Camera Off State */
            <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center text-slate-500 gap-1">
              <VideoOff size={20} />
              <span className="text-[10px]">Camera Paused</span>
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

      {/* ── 4. Control Bar Footer ── */}
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
            onClick={() => setIsMicOn(!isMicOn)}
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
            onClick={() => setIsCameraOn(!isCameraOn)}
            className={`p-3 sm:p-3.5 rounded-2xl border transition-all active:scale-95 ${
              isCameraOn
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
            }`}
            title={isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
          >
            {isCameraOn ? <Video size={20} /> : <VideoOff size={20} />}
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

      {/* ── 5. End Session Confirmation Modal ── */}
      {showEndModal && (
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
      )}
    </div>
  );
};
