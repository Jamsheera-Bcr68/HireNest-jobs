import { useState } from 'react';
import ConversationItem from './ConversationItem';
import type { ChatroomType } from '../../../../types/chat.types';
type Props = {
  selectedId: string | null;
  filteredConversations: ChatroomType[]
  handleChatroomChange: (id: string) => void;
 
};
function ConversationList({
  selectedId,
  filteredConversations,
  handleChatroomChange,
}: Props) {
  const [search, setSearch] = useState<string>('');
 

  return (
    <div
      className={`${selectedId ? 'hidden md:flex' : 'flex'} md:flex flex-col w-full md:w-[380px] border-r border-slate-200 h-full shrink-0`}
    >
      <div className="px-4 py-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-3">Messages</h2>
        <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
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
      {filteredConversations.length && (
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((c) => (
            <ConversationItem
              key={c.id}
              conversation={c}
              isActive={c.id === selectedId}
              onClick={() => handleChatroomChange(c.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ConversationList;
