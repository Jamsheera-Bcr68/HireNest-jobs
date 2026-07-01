import type { ChatroomType } from '../../../../types/chat.types';
import { DateDivider } from './Components';
import { ChatHeader } from './ChatHeader';

import { MessageBubble, MessageInput, EmptyState } from './Components';
import { useEffect, useState } from 'react';
import { messageService } from '../../../../services/api-services/message.service';
import { setMessages } from '../../../../redux/slices/chatroom.slice';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../../redux/store';

type Props = {
  activeChatroom: ChatroomType | null;
  selectedId: string | null;
  // setSelectId: (data: string | null) => void;
  updateChatroom: (data: Partial<ChatroomType>) => void;
};
function MessageWindow({
  activeChatroom,
  selectedId,
  // setSelectId,
  updateChatroom,
}: Props) {
  // const [messages, setMessages] = useState<MessageType[]>([]);
  const dispatch = useDispatch();
  const [value, setValue] = useState<string>('');
  console.log(`active chatroom`, activeChatroom);
  const { messages } = useSelector((state: RootState) => state.chatroom);
  const handleSendMsg = async () => {
    console.log('message befor send', value);
    if (!value || !selectedId) return;

    try {
      const data = await messageService.sendMessaage(value, selectedId);
      console.log('afer msging', data);
      dispatch(setMessages([...messages, data.msg]));
      updateChatroom({ lastMessage: value, time: data.msg.sendTime });
    } catch (err) {}
  };

  useEffect(() => {
    async function getMessages() {
      if (!selectedId) return;
      const data = await messageService.getMessages(selectedId);
      console.log('messages', data);
      dispatch(setMessages(data.messages))
    }
    if (selectedId) getMessages();
  }, [selectedId]);

  return (
    <div className="flex flex-col flex-1 h-full w-full">
      {activeChatroom ? (
        <div
          className={`${selectedId ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-w-0 h-full`}
        >
          <ChatHeader
            conversation={activeChatroom}
            // onBack={() => setSelectId(null)}
          />

          <div
            // ref={scrollRef}
            className="flex-1 overflow-y-auto py-4 space-y-3 bg-slate-50"
            style={{
              backgroundImage:
                'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          >
            <DateDivider label="Today" />
            {messages?.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
          </div>

          <MessageInput
            value={value}
            setValue={setValue}
            onSendMsg={handleSendMsg}
          />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default MessageWindow;
