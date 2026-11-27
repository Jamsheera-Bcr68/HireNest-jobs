import type { ChatroomType } from '../../../../types/chat.types';
import { DateDivider } from './Components';
import { ChatHeader } from './ChatHeader';

import { MessageBubble, MessageInput, EmptyState } from './Components';
import { useEffect, useRef, useState } from 'react';
import { messageService } from '../../../../services/api-services/message.service';
import { setMessages } from '../../../../redux/slices/chatroom.slice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../../redux/store';

type Props = {
  activeChatroom: ChatroomType | null;
  selectedId: string | null;

  updateChatroom: (data: Partial<ChatroomType>) => void;
};
function MessageWindow({
  activeChatroom,
  selectedId,

  updateChatroom,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch();

  const [msg, setMsg] = useState<string>('');

  const { messages } = useSelector((state: RootState) => state.chatroom);

  const handleSendMsg = async () => {
    if ((!msg && !files.length) || !selectedId) return;

    try {
      const formData = new FormData();
      formData.append('text', msg);
      if (files.length)
        files.forEach((file) => {
          formData.append('attachments', file);
        });

      const data = await messageService.sendMessaage(formData, selectedId);
      console.log('data .message', data.message);

      setFiles([]);
      setMsg('');
      dispatch(setMessages([...messages, data.msg]));
      updateChatroom({ lastMessage: msg, time: data.msg.sendTime });
    } catch (err) {}
  };

  useEffect(() => {
    async function getMessages() {
      if (!selectedId) return;
      const data = await messageService.getMessages(selectedId);
      console.log('messages', data);
      dispatch(setMessages(data.messages));
    }
    if (selectedId) getMessages();
  }, [selectedId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleUpdate = (text: string) => {
    if (!text.trim() || !selectedId) return;
    console.log('from text messages', text);

    setMsg(text);
  };

  const handleFileChanges = (selectedFiles: File[]) => {
    setFiles((prev) => {
      const remainingSlots = 5 - prev.length;

      return [...prev, ...selectedFiles.slice(0, remainingSlots)];
    });
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="flex flex-col flex-1 h-full w-full min-h-0 overflow-hidden">
      {activeChatroom ? (
        <div
          className={`${selectedId ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-w-0 h-full min-h-0 overflow-hidden`}
        >
          <ChatHeader conversation={activeChatroom} />

          <div
            className="flex-1 min-h-0 overflow-y-auto py-4 bg-slate-50"
            style={{
              backgroundImage:
                'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <div className="space-y-3">
              <DateDivider label="Today" />
              {messages?.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <MessageInput
            handleFileChanges={handleFileChanges}
            files={files}
            msg={msg}
            handleUpdate={handleUpdate}
            onSendMsg={handleSendMsg}
            handleRemoveFile={handleRemoveFile}
          />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default MessageWindow;
