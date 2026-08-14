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

  const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);
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

  // return (
  //   <div className="flex flex-col flex-1 h-full w-full min-h-0 overflow-hidden">
  //     {activeChatroom ? (
  //       <div
  //         className={`${selectedId ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-w-0 h-full min-h-0 overflow-hidden`}
  //       >
  //         <ChatHeader
  //           conversation={activeChatroom}
  //           // onBack={() => setSelectId(null)}
  //         />

  //         <div
  //           // ref={scrollRef}
  //           className="flex-1  min-h-0 o overflow-y-auto py-4 space-y-3 bg-slate-50"
  //           style={{
  //             backgroundImage:
  //               'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
  //             backgroundSize: '20px 20px',
  //           }}
  //         >
  //           <div className="flex min-h-full flex-col justify-end gap-3">
  //           <DateDivider label="Today" />
  //           {messages?.map((m) => (
  //             <MessageBubble key={m.id} message={m} />
  //           ))}
  //         </div>
  //         </div>

  //         <MessageInput
  //           value={value}
  //           setValue={setValue}
  //           onSendMsg={handleSendMsg}
  //         />
  //       </div>
  //     ) : (
  //       <EmptyState />
  //     )}
  //   </div>
  // );
}

export default MessageWindow;
