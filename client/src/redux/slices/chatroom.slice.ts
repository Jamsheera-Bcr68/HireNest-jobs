import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type ChatroomType } from '../../types/chat.types';
import type { MessageType } from '../../types/message.types';

export interface ChatroomStateType {
  chatrooms: ChatroomType[];
  activeChatroomId: string | null;
  messages: MessageType[];
}
const initialState: ChatroomStateType = {
  chatrooms: [],
  activeChatroomId: null,
  messages: [],
};
export const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState: initialState,
  reducers: {
    addChatroom(state, action: PayloadAction<ChatroomType>) {
      const coming = action.payload;
      const exist = state.chatrooms.find((ch) => ch.id === coming.id);

      if (exist) {
        const remaining = state.chatrooms.filter((ch) => ch.id !== coming.id);

        state.chatrooms = [coming, ...remaining];
      } else {
        state.chatrooms = [coming, ...state.chatrooms];
      }

      console.log('after addng new one chatroom,', state.chatrooms);
    },

    setChatrooms(state, action: PayloadAction<ChatroomType[]>) {
      state.chatrooms = action.payload;
      console.log('chatrooms set in redux', state);
    },

    setActiveChatroomId(state, action: PayloadAction<string | null>) {
      state.activeChatroomId = action.payload;
      console.log('active chatId', state.activeChatroomId);
    },

    setMessages(state, action: PayloadAction<MessageType[]>) {
      state.messages = action.payload;
      console.log('messages in the redux', state.messages);
    },

    addMessage(state, action: PayloadAction<MessageType>) {
      state.messages.push(action.payload);
      console.log('after new message, messages in the redux', state.messages);
    },
  },
});

export default chatroomSlice.reducer;

export const {
  addChatroom,
  setChatrooms,
  setActiveChatroomId,
  setMessages,
  addMessage,
} = chatroomSlice.actions;
