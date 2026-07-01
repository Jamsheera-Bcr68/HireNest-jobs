import { useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import MessageWindow from './MessageWindow';
import { useLocation } from 'react-router-dom';
import { chatService } from '../../../../services/api-services/chat.service';
import type { ChatroomType } from '../../../../types/chat.types';
import {
  setChatrooms,
  setActiveChatroomId,
} from '../../../../redux/slices/chatroom.slice';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../../../../redux/store';

// const filteredConversations = CONVERSATIONS.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   );

function ChatContainer() {
  const location = useLocation();
  const dispatch = useDispatch();
  const chatroomId = location.state?.chatroomId;

  console.log('chatid is from chat', chatroomId);

  const { chatrooms, activeChatroomId } = useSelector(
    (state: RootState) => state.chatroom
  );

  const [activeChatroom, setActiveChatroom] = useState<ChatroomType | null>(
    null
  );
useEffect(() => {
  if (chatroomId) {
    dispatch(setActiveChatroomId(chatroomId));
  }
}, [chatroomId, dispatch]);


useEffect(() => {
  if (!activeChatroomId) {
    setActiveChatroom(null);
    return;
  }

  const chat = chatrooms.find((c) => c.id === activeChatroomId);
  setActiveChatroom(chat ? { ...chat, unreadCount: 0 } : null);
}, [activeChatroomId, chatrooms]);

  useEffect(() => {
    async function getConversations() {
      const data = await chatService.getConversations();
      console.log('data chat', data);

      dispatch(setChatrooms(data.chatrooms));
    }
    getConversations();
  }, []);

  const onChatroomChange = (chatroomId: string) => {
    console.log('form chatroom change,id', chatroomId);
    dispatch(setActiveChatroomId(chatroomId));
    console.log('activeChatroom', activeChatroom);

    const chat = chatrooms.find((chat) => chat.id === chatroomId);
    setActiveChatroom(chat ? { ...chat, unreadCount: 0 } : null);
    if (!chat) return;

    const updated = chatrooms.map((ch) =>
      ch.id == chatroomId ? { ...chat, unreadCount: 0 } : ch
    );
    dispatch(setChatrooms(updated));
  };

  const updateChatroom = (data: Partial<ChatroomType>) => {
    console.log('dataa from update chatroom', data);
    if (!activeChatroom) return;
    const updated = { ...activeChatroom, ...data };
    setActiveChatroom(updated);
    dispatch(
      setChatrooms(chatrooms.map((ch) => (ch.id === updated.id ? updated : ch)))
    );
  };

  return (
    <div className="flex  w-full h-full bg-white">
      <ConversationList
        selectedId={activeChatroomId}
        filteredConversations={chatrooms}
        handleChatroomChange={onChatroomChange}
      />

      <MessageWindow
        selectedId={activeChatroomId}
        updateChatroom={updateChatroom}
        // setSelectId={(setActiveChatroomId)}
        activeChatroom={activeChatroom}
      />
    </div>
  );
}

export default ChatContainer;
