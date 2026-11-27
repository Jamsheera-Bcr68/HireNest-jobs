import { UserRole } from '../../domain/enums/user.enums';
import { User } from '../../domain/entities/user.entity';
import { Job } from '../../domain/entities/job.entity';
import { Chatroom } from '../../domain/entities/chatroom.entity';
import { Company } from '../../domain/entities/company.entity';
import { FileType } from '../../domain/enums/file-type.enum';

export interface ChatroomFilterDto {
  companyId?: string;
  candidateId?: string;
  isRead?: boolean;
}

export interface ChatroomDto {
  id: string;
  participantName: string;
  jobTitle: string;
  context: string;
  unreadCount: number;
  isOnline: boolean;
  lastMessage?: LastMessage;
  participantRole: UserRole;
  lastMessagedAt?: string;
  time?: string;
}

type Attachment = {
  type?: FileType;
  mimeType?: string;
};

export type LastMessage = { text?: string; attachments?: Attachment[] };
export interface AggregatedChatroomDto {
  id: string;
  lastMessage?: LastMessage;
  lastMessagedAt?: Date;
  jobTitle: string;
  jobId: string;
  participantName: string;
  imageUrl?: string;
  unreadCount: number;
  participantId: string;
}

export interface ChatroomInputDto {
  companyId: string;
  candidateId: string;
  lastMessage?: string;
  lastMessagedAt?: Date;
  jobId: string;
}
export interface sendMessageInputDto {
  userId: string;
  textMessage: string;
  attachements: Express.Multer.File[];
  chatroomId: string;
  role: UserRole;
}
export interface sendMessageOutputDto {
  textMessage: string;
  attachements: string[];
}

export type ChatroomDocType = {
  chatroom: Chatroom;
  job: Job;
  company?: Company;
  candidate?: User;
};
