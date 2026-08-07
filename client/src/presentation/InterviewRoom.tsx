import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MonitorUp,
  MessageSquare,
  Users,
  MoreHorizontal,
  Maximize,
  Minimize,
  Circle,
  Wifi,
  ChevronRight,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";

/**
 * InterviewRoom
 * A self-contained online-interview video call interface.
 *
 * Wire up `remoteVideoRef` / `localVideoRef` to your WebRTC streams exactly
 * as before — everything else (controls, panels, timer, states) is handled
 * here. Swap the mock data (candidate, questions, messages) for real props.
 */
export default function InterviewRoom({
  candidateName = "Amara Okafor",
  roleTitle = "Senior Frontend Engineer",
  interviewerName = "You",
  onEndCall,
}) {
  const remoteVideoRef = useRef(null);
  const localVideoRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [panel, setPanel] = useState(null); // null | "chat" | "notes" | "people"
  const [fullscreen, setFullscreen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);

  const [messages, setMessages] = useState([
    { from: "system", text: "Interview room created. Waiting for candidate to join…" },
  ]);
  const [draft, setDraft] = useState("");

  const [questions, setQuestions] = useState([
    { id: 1, text: "Walk me through a project you're proud of.", done: false },
    { id: 2, text: "How do you approach performance optimization?", done: false },
    { id: 3, text: "Describe a disagreement with a teammate and how it resolved.", done: false },
    { id: 4, text: "Any questions for us?", done: false },
  ]);

  // demo: local camera preview via getUserMedia
  useEffect(() => {
    let stream;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      } catch {
        // camera unavailable / denied — local tile falls back to avatar
      }
    })();
    return () => stream?.getTracks().forEach((t) => t.stop());
  }, []);

  // demo: simulate the candidate joining after a moment
  useEffect(() => {
    const t = setTimeout(() => {
      setRemoteConnected(true);
      setMessages((m) => [...m, { from: "system", text: `${candidateName} joined the call.` }]);
    }, 2600);
    return () => clearTimeout(t);
  }, [candidateName]);

  // call timer
  useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!localVideoRef.current?.srcObject) return;
    localVideoRef.current.srcObject.getVideoTracks().forEach((tr) => (tr.enabled = camOn));
  }, [camOn]);

  useEffect(() => {
    if (!localVideoRef.current?.srcObject) return;
    localVideoRef.current.srcObject.getAudioTracks().forEach((tr) => (tr.enabled = micOn));
  }, [micOn]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const initials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  const togglePanel = (name) => setPanel((p) => (p === name ? null : name));

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { from: "me", text: draft.trim() }]);
    setDraft("");
  };

  const toggleQuestion = (id) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, done: !q.done } : q)));

  return (
    <div className="relative w-full h-screen bg-[#0B0C0E] overflow-hidden select-none font-[system-ui]">
      {/* ---------- Top bar ---------- */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-3.5 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5">
            <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
            <span className="text-xs font-medium text-white/80 tracking-wide">
              {formatTime(elapsed)}
            </span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-white">{roleTitle}</span>
            <span className="text-xs text-white/50">Interview with {candidateName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/10 px-3 py-1.5 text-xs text-white/70">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            Good connection
          </div>
          <button
            onClick={() => setFullscreen((f) => !f)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            {fullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ---------- Main stage ---------- */}
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
              {initials(candidateName)}
            </div>
            <p className="text-white/85 font-medium">{candidateName}</p>
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
              <span className="text-sm text-white/90 font-medium">{candidateName}</span>
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
          className={`w-full h-full object-cover ${camOn ? "" : "hidden"}`}
        />
        {!camOn && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold text-white/70">
              {initials(interviewerName)}
            </div>
          </div>
        )}
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1">
          <span className="text-[11px] text-white/85 font-medium">{interviewerName}</span>
          {!micOn && <MicOff className="w-3 h-3 text-red-400" />}
        </div>
      </div>

      {/* ---------- Side panel ---------- */}
      {panel && (
        <div className="absolute top-0 right-0 bottom-0 w-full sm:w-96 bg-[#151619] border-l border-white/10 z-30 flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white capitalize">
              {panel === "notes" ? "Interview questions" : panel}
            </h3>
            <button
              onClick={() => setPanel(null)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {panel === "chat" && (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`text-sm leading-relaxed ${
                      m.from === "system"
                        ? "text-white/40 text-xs text-center"
                        : m.from === "me"
                        ? "ml-auto max-w-[85%] bg-indigo-500/90 text-white rounded-2xl rounded-tr-sm px-3.5 py-2 w-fit"
                        : "max-w-[85%] bg-white/[0.07] text-white/90 rounded-2xl rounded-tl-sm px-3.5 py-2 w-fit"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/10 flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Send a message…"
                  className="flex-1 bg-white/[0.06] border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/35 outline-none focus:border-indigo-400/60 transition-colors"
                />
                <button
                  onClick={sendMessage}
                  className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {panel === "notes" && (
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2">
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => toggleQuestion(q.id)}
                  className="w-full flex items-start gap-3 text-left rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] px-3.5 py-3 transition-colors"
                >
                  <CheckCircle2
                    className={`w-4.5 h-4.5 mt-0.5 shrink-0 ${
                      q.done ? "text-emerald-400" : "text-white/25"
                    }`}
                  />
                  <span
                    className={`text-sm leading-snug ${
                      q.done ? "text-white/40 line-through" : "text-white/85"
                    }`}
                  >
                    {q.text}
                  </span>
                </button>
              ))}
            </div>
          )}

          {panel === "people" && (
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {[
                { name: interviewerName, tag: "Host", mic: micOn },
                { name: candidateName, tag: "Candidate", mic: remoteConnected },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white/80">
                      {initials(p.name)}
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm text-white/90">{p.name}</p>
                      <p className="text-xs text-white/40">{p.tag}</p>
                    </div>
                  </div>
                  {p.mic ? (
                    <Mic className="w-4 h-4 text-white/50" />
                  ) : (
                    <MicOff className="w-4 h-4 text-red-400" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ---------- Control bar ---------- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-[#17181b]/95 backdrop-blur-md border border-white/10 px-3 py-2.5 shadow-2xl">
        <CtrlButton
          active={!micOn}
          onClick={() => setMicOn((v) => !v)}
          activeClasses="bg-red-500 hover:bg-red-400 text-white"
          label={micOn ? "Mute" : "Unmute"}
        >
          {micOn ? <Mic className="w-[18px] h-[18px]" /> : <MicOff className="w-[18px] h-[18px]" />}
        </CtrlButton>

        <CtrlButton
          active={!camOn}
          onClick={() => setCamOn((v) => !v)}
          activeClasses="bg-red-500 hover:bg-red-400 text-white"
          label={camOn ? "Stop video" : "Start video"}
        >
          {camOn ? <Video className="w-[18px] h-[18px]" /> : <VideoOff className="w-[18px] h-[18px]" />}
        </CtrlButton>

        <CtrlButton
          active={sharingScreen}
          onClick={() => setSharingScreen((v) => !v)}
          activeClasses="bg-indigo-500 hover:bg-indigo-400 text-white"
          label="Share screen"
        >
          <MonitorUp className="w-[18px] h-[18px]" />
        </CtrlButton>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <CtrlButton
          active={panel === "notes"}
          onClick={() => togglePanel("notes")}
          activeClasses="bg-white text-black hover:bg-white/90"
          label="Questions"
        >
          <ChevronRight className="w-[18px] h-[18px]" />
        </CtrlButton>

        <CtrlButton
          active={panel === "chat"}
          onClick={() => togglePanel("chat")}
          activeClasses="bg-white text-black hover:bg-white/90"
          label="Chat"
        >
          <MessageSquare className="w-[18px] h-[18px]" />
        </CtrlButton>

        <CtrlButton
          active={panel === "people"}
          onClick={() => togglePanel("people")}
          activeClasses="bg-white text-black hover:bg-white/90"
          label="People"
        >
          <Users className="w-[18px] h-[18px]" />
        </CtrlButton>

        <CtrlButton onClick={() => {}} label="More">
          <MoreHorizontal className="w-[18px] h-[18px]" />
        </CtrlButton>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button
          onClick={() => setShowEndConfirm(true)}
          className="flex items-center gap-2 rounded-full bg-red-500 hover:bg-red-400 text-white px-4 h-11 transition-colors"
        >
          <PhoneOff className="w-[18px] h-[18px]" />
          <span className="hidden sm:inline text-sm font-medium">End</span>
        </button>
      </div>

      {/* ---------- End-call confirm ---------- */}
      {showEndConfirm && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60">
          <div className="w-[320px] rounded-2xl bg-[#1a1b1e] border border-white/10 p-5 text-center shadow-2xl">
            <p className="text-white font-medium mb-1">End the interview?</p>
            <p className="text-white/50 text-sm mb-5">
              This will disconnect {candidateName} from the call.
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
      )}
    </div>
  );
}

function CtrlButton({ children, onClick, active, activeClasses = "", label }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${
        active ? activeClasses : "text-white/80 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}