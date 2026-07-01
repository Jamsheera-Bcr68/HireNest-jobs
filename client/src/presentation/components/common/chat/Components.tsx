import type { MessageType } from '../../../../types/message.types';
import { useState } from 'react';

export function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex justify-center my-3">
      <span className="bg-white text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full shadow-sm border border-slate-100">
        {label}
      </span>
    </div>
  );
}

export function MessageBubble({ message }: { message: MessageType }) {
  const isMe = message.sender === 'user';
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} px-4`}>
      <div
        className={`max-w-[75%] md:max-w-[60%] px-3.5 py-1 rounded-xl text-sm leading-relaxed shadow-sm
          ${
            isMe
              ? 'bg-emerald-600 text-white rounded-br-sm'
              : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
          }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.message}</p>
        <div
          className={`flex items-center gap-1 mt-1 justify-end ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}
        >
          <span className="text-[10px] ml-5">{message.sendTime}</span>
          {isMe && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export function MessageInput({
  value,
  setValue,
  onSendMsg,
}: {
  value: string;
  setValue: (val: string) => void;
  onSendMsg: () => Promise<void>;
}) {
  const handleSendMessage = async () => {
    if (!value) return;
    await onSendMsg();
    setValue('');
  };
  return (
    <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-slate-200 shrink-0">
      {/* <button
        className="p-2 text-slate-500 hover:bg-slate-100 rounded-full shrink-0"
        aria-label="Attach file"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button> */}

      <div className="flex-1 flex items-center bg-slate-100 rounded-full px-4 py-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
        {/* <button className="text-slate-500 ml-2 shrink-0" aria-label="Emoji">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9" y2="9" />
            <line x1="15" y1="9" x2="15" y2="9" />
          </svg>
        </button> */}
      </div>

      <button
        className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shrink-0 transition-colors"
        aria-label="Send message"
        onClick={handleSendMessage}
        // TODO: onClick={handleSend}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 text-center px-8">
      <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
