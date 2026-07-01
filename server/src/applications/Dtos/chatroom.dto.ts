import { UserRole } from '../../domain/enums/user.enums';
import { User } from '../../domain/entities/user.entity';
import { Job } from '../../domain/entities/job.entity';
import { Chatroom } from '../../domain/entities/chatroom.entity';
import { Company } from '../../domain/entities/company.entity';

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
  lastMessage?: string;
  participantRole: UserRole;
  lastMessagedAt?: string;
  time?: string;
}

export interface AggregatedChatroomDto {
  id: string;
  lastMessage?: string;
  lastMessagedAt?: Date;
  jobTitle: string;
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
// // export type ChatroomDocType={
//   chatroom:Chatroom,
//   job:Job,
//   company?:Company,
//   candidate?:User
// }

export type ChatroomDocType = {
  chatroom: Chatroom;
  job: Job;
  company?: Company;
  candidate?: User;
};
