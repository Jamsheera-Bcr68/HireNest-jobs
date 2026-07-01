import type { ChatroomType } from '../../../../types/chat.types';

type Props = {
  conversation: ChatroomType;
  isActive: boolean;
  onClick: () => void;
};

const AVATAR_COLORS = [
  'bg-emerald-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-rose-500',
  'bg-violet-500',
  'bg-teal-500',
  'bg-orange-500',
];

function getAvatarColor(name: string) {
  const index = name?.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

function getInitials(name: string) {
  return (
    name
      ?.split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || ''
  );
}

export function Avatar({
  name,
  size = 'w-12 h-12',
}: {
  name: string;
  size?: string;
}) {
  return (
    <div
      className={`${size} ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white font-semibold shrink-0 select-none`}
    >
      <span className="text-sm">{getInitials(name)}</span>
    </div>
  );
}
const baseUrl = import.meta.env.VITE_BACKEND_URL;
function ConversationItem({ conversation, isActive, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-slate-100
        ${isActive ? 'bg-emerald-50' : 'hover:bg-slate-50'}`}
    >
      <div className="relative shrink-0">
        {conversation.imageUrl ? (
          <>
            <img
              className=" w-12 h-12 rounded-full  flex items-center justify-center text-white font-semibold shrink-0 select-none"
              src={`${baseUrl}${conversation.imageUrl}`}
              alt=""
            />
          </>
        ) : (
          <Avatar name={conversation.participantName} />
        )}

        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm text-slate-800 truncate">
            {conversation.participantName}
          </span>
          <span className="text-[11px] text-slate-400 shrink-0">
            {conversation.lastMessagedAt}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <span className="text-xs text-slate-500 truncate">
            {conversation.lastMessage}
          </span>
          {conversation.unreadCount > 0 && (
            <span className="shrink-0 bg-emerald-500 text-white text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
        <span
          className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full
            ${
              conversation.participantRole === 'company'
                ? 'bg-sky-50 text-sky-600'
                : 'bg-amber-50 text-amber-600'
            }`}
        >
          {/* {conversation.participantRole === 'company' ? 'Company' : 'Candidate'} ·{' '} */}
          jobRole :{conversation.context}
        </span>
      </div>
    </button>
  );
}

export default ConversationItem;
