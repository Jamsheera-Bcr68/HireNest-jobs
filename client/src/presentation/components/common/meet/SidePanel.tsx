import { X } from "lucide-react";

type Props={
    panel:string
    setPanel:(str:string|null)=>void
}
function SidePanel({panel,setPanel}:Props) {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-full sm:w-96 bg-[#151619] border-l border-white/10 z-30 flex flex-col">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <h3 className="text-sm font-semibold text-white capitalize">
          {panel === 'notes' ? 'Interview questions' : panel}
        </h3>
        <button
          onClick={() => setPanel(null)}
          className="w-7 h-7 flex items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* {panel === "chat" && (
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
          )} */}
      {/* 
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
          )} */}

      {/* {panel === "people" && (
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {[
                { name: currentUserName, tag: "Host", mic: micOn },
                { name: , tag: "Candidate", mic: remoteConnected },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-white/80">
                      {p.name.charAt(0).toUpperCase()}
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
          )} */}
    </div>
  );
}
export default SidePanel;
