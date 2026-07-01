import type { UserRole } from "../constants/types/user";


export type ChatroomType = {
  id: string;
  participantName: string;
  participantRole: UserRole;
  context: string;
  unreadCount: number;
  imageUrl?:string
  isOnline: boolean;
  lastMessage?: string;
  lastMessagedAt?: string;
  time?:string
};
