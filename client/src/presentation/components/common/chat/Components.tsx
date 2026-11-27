import { useEffect, useMemo, useRef } from 'react';
import type { MessageType ,Attachment} from '../../../../types/message.types';

export function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex justify-center my-3">
      <span className="bg-white text-slate-500 text-[11px] font-medium px-3 py-1 rounded-full shadow-sm border border-slate-100">
        {label}
      </span>
    </div>
  );
}

// export function MessageBubble({ message }: { message: MessageType }) {
//   const isMe = message.sender === 'user';
//   return (
//     <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} px-4`}>
//       <div
//         className={`max-w-[75%] md:max-w-[60%] px-3.5 py-1 rounded-xl text-sm leading-relaxed shadow-sm
//           ${
//             isMe
//               ? 'bg-emerald-600 text-white rounded-br-sm'
//               : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
//           }`}
//       >
//         <p className="whitespace-pre-wrap break-words">{message.message}</p>
//         <div
//           className={`flex items-center gap-1 mt-1 justify-end ${isMe ? 'text-emerald-100' : 'text-slate-400'}`}
//         >
//           <span className="text-[10px] ml-5">{message.sendTime}</span>
//           {isMe && (
//             <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="20 6 9 17 4 12" />
//             </svg>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function AttachmentView({ a, isMe }: { a: Attachment; isMe: boolean }) {

  switch (a.kind) {
    case 'image':
      return (
        <a href={a.key} target="_blank" rel="noreferrer">
          <img
            src={a.key}
            alt={a.name}
            loading="lazy"
            className="w-full max-h-72 rounded-lg object-cover"
          />
        </a>
      );

    case 'video':
      return (
        <video
          src={a.key}
          controls
          preload="metadata"
          className="w-full max-h-72 rounded-lg bg-black"
        />
      );

    case 'audio':
      return (
        <audio
          src={a.key}
          controls
          preload="metadata"
          className="w-full min-w-[220px] h-10"
        />
      );

    default:
      return (
        <a
          href={a.key}
          target="_blank"
          rel="noreferrer"
          download={a.name}
          className={`flex items-center gap-3 rounded-lg p-2.5 transition
            ${isMe ? 'bg-fuchsia-200/60 hover:bg-fuchsia-400' : 'bg-slate-50 hover:bg-slate-100'}`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
              ${isMe ? 'bg-white text-fuchsia-700' : 'bg-emerald-100 text-emerald-700'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{a.name}</p>
            <p className={`text-[11px] ${isMe ? 'text-fuchsia-500' : 'text-slate-500'}`}>
              {formatSize(a.size)} · {a.name?.split('.').pop()?.toUpperCase()}
            </p>
          </div>
        </a>
      );
  }
}

export function MessageBubble({ message }: { message: MessageType }) {
  const isMe = message.sender === 'user';
  const attachments = message.attachments ?? [];
  const hasMedia = attachments.length > 0;

  // hide the backend's placeholder text like "1 fles are attached"
  const showText =
    !!message.message?.trim() &&
    !(hasMedia && /attached$/i.test(message.message.trim()));

  const mediaOnly = hasMedia && !showText;

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} px-3 sm:px-4`}>
      <div
        className={`rounded-xl text-sm leading-relaxed shadow-sm overflow-hidden
          ${hasMedia ? 'w-[80%] sm:w-[320px] md:w-[360px] p-1.5' : 'max-w-[80%] md:max-w-[60%] px-3.5 py-1.5'}
          ${
            isMe
              ? 'bg-fuchsia-100 text-slate-800 rounded-br-sm'
              : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
          }`}
      >
        {hasMedia && (
          <div className="flex flex-col gap-1.5">
            {attachments.map((a) => (
              <AttachmentView key={a.key} a={a} isMe={isMe} />
            ))}
          </div>
        )}

        {showText && (
          <p className={`whitespace-pre-wrap break-words ${hasMedia ? 'px-2 pt-1.5' : ''}`}>
            {message.message}
          </p>
        )}

        <div
          className={`flex items-center gap-1 justify-end
            ${mediaOnly ? 'px-2 pt-1 pb-0.5' : hasMedia ? 'px-2 pb-0.5 mt-1' : 'mt-1'}
            ${isMe ? 'text-fuchsia-700' : 'text-slate-400'}`}
        >
          <span className="text-[10px]">{message.sendTime}</span>
          {isMe && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export function MessageInput({
  msg,
  onSendMsg,
  handleUpdate,
  files,
  handleFileChanges,
  handleRemoveFile,
}: {
  files: File[];
  handleFileChanges: (files: File[]) => void;
  msg: string;
  onSendMsg: () => Promise<void>;
  handleUpdate: (value: string) => void;
  handleRemoveFile: (index: number) => void;
}) {
  const handleSendMessage = async () => {
    if (!msg && !files.length) return;
    console.log('from handle send message', msg);

    await onSendMsg();
    handleUpdate('');
  };
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewUrls = useMemo(
    () =>
      files.map((file) =>
        file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      ),
    [files]
  );
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  return (
    <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-slate-200 shrink-0">
      <>
        {files && (
          <div className="flex items-center gap-3 px-4 pt-3">
            {files.map((f, i) => {
              return (
                <div className="relative">
                  {previewUrls[i] ? (
                    <img
                      src={previewUrls[i]}
                      alt={f.name}
                      className="h-20 w-20 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="flex items-center gap-2 rounded-lg border bg-slate-50 px-3 py-2 text-sm">
                      <span>📄</span>
                      <span className="max-w-[180px] truncate">{f.name}</span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(i)}
                    aria-label="Remove attachment"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-slate-700 text-white text-xs"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
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
        </button>
        <input
          ref={fileInputRef}
          accept=".pdf,.doc,.docx,.png,.jpg,jpej"
          onChange={(e) => {
            handleFileChanges(Array.from(e.target.files || []));
            e.target.value = '';
          }}
          multiple
          type="file"
          className="hidden"
        />
      </>
      <div className="flex-1 flex items-center bg-slate-100 rounded-full px-4 py-2">
        <input
          type="text"
          value={msg}
          onChange={(e) => handleUpdate(e.target.value)}
          placeholder="Type a message"
          onKeyDown={(e) => {
            console.log('e', e);
            if (e.key == 'Enter') {
              console.log('key is enter');

              e.preventDefault();
              handleSendMessage();
            }
          }}
          className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
        />
        <button className="text-slate-500 ml-2 shrink-0" aria-label="Emoji">
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
        </button>
      </div>

      <button
        className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shrink-0 transition-colors"
        aria-label="Send message"
        onClick={handleSendMessage}
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
