import { useState, useEffect, useRef } from "react";

/**
 * ChatPage — WhatsApp-style chat UI for a job portal (company ⇄ candidate).
 * Pure UI: no API calls, no socket logic. Wire up onSendMessage, data fetching,
 * etc. wherever marked with TODO.
 *
 * Tailwind only. Drop into any React + Tailwind project.
 */

// ── Avatar palette for initials fallback ───────────────────────────────────
const AVATAR_COLORS = [
  "bg-emerald-500", "bg-amber-500", "bg-sky-500",
  "bg-rose-500", "bg-violet-500", "bg-teal-500", "bg-orange-500",
];

function getInitials(name) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getAvatarColor(name) {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function Avatar({ name, size = "w-12 h-12" }) {
  return (
    <div
      className={`${size} ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white font-semibold shrink-0 select-none`}
    >
      <span className="text-sm">{getInitials(name)}</span>
    </div>
  );
}

// ── Dummy data ──────────────────────────────────────────────────────────────
const CONVERSATIONS = [
  {
    id: 1,
    name: "TechCorp Pvt Ltd",
    role: "company",
    context: "Senior React Developer",
    lastMessage: "Great, we'd like to schedule your interview for Thursday.",
    time: "10:42 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Aditya Menon",
    role: "candidate",
    context: "Applied: UI/UX Designer",
    lastMessage: "Sure, sharing my portfolio link shortly.",
    time: "9:58 AM",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Infosys Recruitment",
    role: "company",
    context: "Frontend Engineer",
    lastMessage: "Your profile has been shortlisted for round 2.",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Sneha Pillai",
    role: "candidate",
    context: "Applied: Backend Developer",
    lastMessage: "Thank you, looking forward to it!",
    time: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Zoho Corporation",
    role: "company",
    context: "Product Designer",
    lastMessage: "Could you confirm your availability for a call?",
    time: "Mon",
    unread: 5,
    online: true,
  },
  {
    id: 6,
    name: "Rahul Krishnan",
    role: "candidate",
    context: "Applied: DevOps Engineer",
    lastMessage: "Attached my updated resume.",
    time: "Mon",
    unread: 0,
    online: false,
  },
];

const MESSAGES_BY_CHAT = {
  1: [
    { id: 1, sender: "them", text: "Hi! Thanks for applying to the Senior React Developer role.", time: "10:12 AM" },
    { id: 2, sender: "them", text: "We went through your profile and would love to move forward.", time: "10:13 AM" },
    { id: 3, sender: "me", text: "That's great to hear! I'm available this week for an interview.", time: "10:20 AM", status: "read" },
    { id: 4, sender: "them", text: "Perfect. Does Thursday at 3 PM work for you?", time: "10:35 AM" },
    { id: 5, sender: "me", text: "Yes, Thursday 3 PM works for me.", time: "10:40 AM", status: "read" },
    { id: 6, sender: "them", text: "Great, we'd like to schedule your interview for Thursday.", time: "10:42 AM" },
  ],
  2: [
    { id: 1, sender: "me", text: "Hi Aditya, we loved your design portfolio.", time: "9:40 AM", status: "read" },
    { id: 2, sender: "them", text: "Thank you so much! Really appreciate it.", time: "9:45 AM" },
    { id: 3, sender: "me", text: "Could you share a couple more case studies if you have them?", time: "9:50 AM", status: "read" },
    { id: 4, sender: "them", text: "Sure, sharing my portfolio link shortly.", time: "9:58 AM" },
  ],
  3: [
    { id: 1, sender: "them", text: "Your profile has been shortlisted for round 2.", time: "Yesterday" },
  ],
  4: [
    { id: 1, sender: "me", text: "We'd like to invite you for a technical round next week.", time: "Yesterday", status: "read" },
    { id: 2, sender: "them", text: "Thank you, looking forward to it!", time: "Yesterday" },
  ],
  5: [
    { id: 1, sender: "them", text: "Could you confirm your availability for a call?", time: "Mon" },
  ],
  6: [
    { id: 1, sender: "them", text: "Attached my updated resume.", time: "Mon" },
  ],
};

// ── Conversation list item ─────────────────────────────────────────────────
function ConversationItem({ conversation, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-slate-100
        ${isActive ? "bg-emerald-50" : "hover:bg-slate-50"}`}
    >
      <div className="relative shrink-0">
        <Avatar name={conversation.name} />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm text-slate-800 truncate">
            {conversation.name}
          </span>
          <span className="text-[11px] text-slate-400 shrink-0">{conversation.time}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="text-xs text-slate-500 truncate">{conversation.lastMessage}</span>
          {conversation.unread > 0 && (
            <span className="shrink-0 bg-emerald-500 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {conversation.unread}
            </span>
          )}
        </div>
        <span
          className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full
            ${conversation.role === "company"
              ? "bg-sky-50 text-sky-600"
              : "bg-amber-50 text-amber-600"}`}
        >
          {conversation.role === "company" ? "Company" : "Candidate"} · {conversation.context}
        </span>
      </div>
    </button>
  );
}

// ── Message bubble ──────────────────────────────────────────────────────────
function MessageBubble({ message }) {
  const isMe = message.sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} px-4`}>
      <div
        className={`max-w-[75%] md:max-w-[60%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isMe
            ? "bg-emerald-600 text-white rounded-br-sm"
            : "bg-white text-slate-800 border border-slate-100 rounded-bl-sm"}`}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
        <div className={`flex items-center gap-1 mt-1 justify-end ${isMe ? "text-emerald-100" : "text-slate-400"}`}>
          <span className="text-[10px]">{message.time}</span>
          {isMe && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

function DateDivider({ label }) {
  return (
    <div className="flex justify-center my-3">
      <span className="bg-white text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full shadow-sm border border-slate-100">
        {label}
      </span>
    </div>
  );
}

// ── Chat header ──────────────────────────────────────────────────────────────
function ChatHeader({ conversation, onBack }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shrink-0">
      <button onClick={onBack} className="md:hidden text-slate-600 -ml-1 p-1" aria-label="Back to chats">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="relative shrink-0">
        <Avatar name={conversation.name} size="w-10 h-10" />
        {conversation.online && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-slate-800 truncate">{conversation.name}</p>
        <p className="text-xs text-slate-500 truncate">
          {conversation.online ? "Online" : "Offline"} · {conversation.context}
        </p>
      </div>

      <div className="flex items-center gap-1 text-slate-500">
        <button className="p-2 rounded-full hover:bg-slate-100" aria-label="Search in chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-slate-100" aria-label="More options">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// ── Message input bar ────────────────────────────────────────────────────────
function MessageInput() {
  const [value, setValue] = useState("");
  return (
    <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-slate-200 shrink-0">
      <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full shrink-0" aria-label="Attach file">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button>

      <div className="flex-1 flex items-center bg-slate-100 rounded-full px-4 py-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
          // TODO: hook up onKeyDown / onSend handler
        />
        <button className="text-slate-500 ml-2 shrink-0" aria-label="Emoji">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9" y2="9" /><line x1="15" y1="9" x2="15" y2="9" />
          </svg>
        </button>
      </div>

      <button
        className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shrink-0 transition-colors"
        aria-label="Send message"
        // TODO: onClick={handleSend}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}

// ── Empty state (desktop, no chat selected) ──────────────────────────────────
function EmptyState() {
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 text-center px-8">
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <h3 className="text-slate-700 font-semibold text-lg">Your messages</h3>
      <p className="text-slate-500 text-sm mt-1 max-w-xs">
        Select a conversation with a company or candidate to start chatting.
      </p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Chat() {
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const scrollRef = useRef(null);

  // Default to first conversation on desktop, list view on mobile
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setSelectedId(CONVERSATIONS[0].id);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [selectedId]);

  const activeConversation = CONVERSATIONS.find((c) => c.id === selectedId);
  const activeMessages = selectedId ? MESSAGES_BY_CHAT[selectedId] || [] : [];

  const filteredConversations = CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* ── Conversation list ──────────────────────────────────────────── */}
      <div
        className={`${selectedId ? "hidden md:flex" : "flex"} md:flex flex-col w-full md:w-[380px] border-r border-slate-200 shrink-0`}
      >
        <div className="px-4 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Messages</h2>
          <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations"
              className="bg-transparent outline-none text-sm text-slate-600 placeholder:text-slate-400 flex-1"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              isActive={c.id === selectedId}
              onClick={() => setSelectedId(c.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Chat window ─────────────────────────────────────────────────── */}
      {activeConversation ? (
        <div className={`${selectedId ? "flex" : "hidden"} md:flex flex-col flex-1 min-w-0`}>
          <ChatHeader conversation={activeConversation} onBack={() => setSelectedId(null)} />

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto py-4 space-y-3 bg-slate-50"
            style={{
              backgroundImage:
                "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <DateDivider label="Today" />
            {activeMessages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </div>

          <MessageInput />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}