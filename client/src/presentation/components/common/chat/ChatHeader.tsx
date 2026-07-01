import type { ChatroomType } from "../../../../types/chat.types";
import { Avatar } from "./ConversationItem"

export function ChatHeader({ conversation }:{conversation:ChatroomType}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 shrink-0">
      <button
      // onClick={onBack} 
      className="md:hidden text-slate-600 -ml-1 p-1" aria-label="Back to chats">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" /> 
        </svg>
      </button>

      <div className="relative shrink-0">
        <Avatar name={conversation.participantName} size="w-10 h-10" />
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-slate-800 truncate">{conversation.participantName}</p>
        <p className="text-xs text-slate-500 truncate">
          {conversation.isOnline ? "Online" : "Offline"} · {conversation.context}
        </p>
      </div>

      <div className="flex items-center gap-1 text-slate-500">
        <button className="p-2 rounded-full hover:bg-slate-100" aria-label="Search in chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /> */}
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