import type { UserRole } from '../constants/types/user';

type LastMessage = {
  text?: string;
  attachments?: {
    type: 'image' | 'video' | 'audio' | 'file';
    mimeType: string;
  }[];
  senderId?: string;
};
export type ChatroomType = {
  id: string;
  participantName: string;
  participantRole: UserRole;
  context: string;
  unreadCount: number;
  imageUrl?: string;
  isOnline: boolean;
  lastMessage?: LastMessage;
  lastMessagedAt?: string;
  time?: string;
};

export type Attachment = {
  name: string;
  mimeType: string;
  size: number;
  kind: 'image' | 'video' | 'file';
};

export type ChatType = {
  text: string;
  attachments: File | null;
};
